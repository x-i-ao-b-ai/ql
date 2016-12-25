<?php

/* *
 * 抢红包 PORTAL控制器
 * @author Pan Feng
 */

class RedpackController extends CommonController
{
    private $param ;
    private static $error = null;
    /**
     * 返回结果(JSON)
     * @param int $code
     * @param string $msg
     */
    private static function result($code, $msg = '', $end = true)
    {
        if($end)
        {
            echo json_encode(array('success'=> $code, 'message'=> $msg));
            exit;
        }else
        {
            if(self::$error !== null && isset(self::$error['success']) && !empty(self::$error['success']))
                self::$error = array('success'=> $code, 'message'=> $msg);
        }
    }
    
    public function init()
    {
        parent::init();
		
        $this->param = $this->get();

        $this->assign('url',$this->site->url);
    }
    
    /**
     * 首页展示
     */
    public function IndexAction()
    {
        $id = $this->param['id'];
        
        $activity = $this->db->table('redpack_activity_list')->where(array('site_id'=>$this->site->id, 'id'=>$id))->get(1);
        
        $this->assign('activity', $activity);
        
        $this->show('redpack/index', array('id'=>$id));
    }
    
    /**
     * 领取群红包成功页面
     */
    public function ShareAction()
    {
        $activity_id = $this->param['id'];
        $pack_id = $this->param['pack_id'];
        $this->assign('pack_id',$pack_id);
        
        
        $time = time();
        $activity = $this->db->table('redpack_activity_list')->where(array('site_id'=>$this->site->id, 'id'=>$activity_id))->get(1);
        if(empty($activity))
            $this->callback( array( 'ret' => '1002', 'msg' =>'活动不存在'));

        if($time < $activity->start_time)
            $this->callback( array( 'ret' => '1003', 'msg' =>'活动未开始'));
        if($time > $activity->end_time)
            $this->callback( array( 'ret' => '1004', 'msg' =>'活动已结束'));
        if($activity->status == 0)
            $this->callback( array( 'ret' => '1005', 'msg' =>'活动已关闭'));

        $packet = $this->db->table('redpack_packets')->where(array('id'=>$pack_id, 'site_id'=>$this->site->id, 'activity_id'=>$activity_id, 'type'=>1))->get(1);
        if(!empty($packet) && $packet->status == 1)
        {
            $fetch_record = $this->db->table('redpack_record')->where(array('site_id'=>$this->site->id, 'activity_id'=>$activity_id, 'packet_id'=>$pack_id))->field('id, mobile, amount, dateline')->order('dateline','DESC')->get();

            $this->show('redpack/fetch', array('id'=>$activity_id, 'pack_id'=>$pack_id,  'activity'=>$activity, 'fetch_record'=>$fetch_record));
        }else
            var_dump($packet);
            $this->show('redpack/share', array('id'=>$activity_id,  'activity'=>$activity));
    }
    
    /**
     * 领取个人红包
     */
    public function FetchAction()
    {
        $time = time();
        $post = $this->post();
        if(!isset($post['mobile']) || !isset($post['activity_id']) || !isset($post['pack_id']))
            $this->callback( array( 'ret' => '1000', 'msg' =>'参数错误'));
        
        if(empty($post['mobile']) || strlen($post['mobile']) != 11)
            $this->callback( array( 'ret' => '1001', 'msg' =>'请输入有效手机号'));
        
        $activity_id = $post['activity_id'];
        $pack_id = $post['pack_id'];
        
        $activity = $this->db->table('redpack_activity_list')->where(array('site_id'=>$this->site->id, 'id'=>$post['activity_id']))->get(1);
        if(empty($activity))
            $this->callback( array( 'ret' => '1002', 'msg' =>'活动不存在'));

        if($time < $activity->start_time)
            $this->callback( array( 'ret' => '1003', 'msg' =>'活动未开始，敬请期待！'));
        if($time > $activity->end_time)
            $this->callback( array( 'ret' => '1004', 'msg' =>'你来的太晚了，红包已经过期了，等下次活动信号吧!'));
        if($activity->status == 0)
            $this->callback( array( 'ret' => '1005', 'msg' =>'活动目前已关闭，请向主办方咨询'));
        
        $packet = $this->db->table('redpack_packets')->where(array('id'=>$pack_id, 'site_id'=>$this->site->id, 'activity_id'=>$activity_id, 'type'=>1))->get(1);
        if(!empty($packet) && $packet->status == 1)
        {
            if($packet->balance > 0)
            {
                //判断以前有无领取红包记录
                $check_record = $this->db->table('redpack_record')->where(array('site_id'=>$this->site->id, 'activity_id'=>$activity_id, 'mobile'=>$post['mobile']))->get(1);
                if(!empty($check_record))
                    $this->callback( array( 'ret' => '1008', 'msg' =>'每位顾客只能领取一次，您已领取过红包了'));
                
                $activity->rules = !empty($activity->rules)? unserialize($activity->rules) : array();
                $min = isset($activity->rules['range']['start'])? $activity->rules['range']['start'] : 1;
                $max = isset($activity->rules['range']['end'])? $activity->rules['range']['end'] : $packet->balance;
               
                if($packet->balance < $max && $packet->balance >= $min)
                    $max = $packet->balance;
                if($packet->balance < $min)
                    $min = $max = $packet->balance;
                    
                $pack_val = mt_rand($min, $max);
                
                $record = array('site_id'=>$this->site->id);
                $record['activity_id'] = $post['activity_id'];
                $record['packet_id'] = $post['pack_id'];
                $record['amount'] = $pack_val;
                $record['mobile'] = $post['mobile'];
                $record['status'] = 0;
                $record['dateline'] = time();
                $record['ip'] = Tool::getIP();
                $r = $this->db->table('redpack_record')->insert($record);
                if($r !== false)
                {
                    $this->db->table('redpack_packets')->where(array('id'=>$pack_id, 'site_id'=>$this->site->id, 'activity_id'=>$activity_id, 'type'=>1))->updateField('balance', $pack_val, false);
                    $this->callback( array( 'ret' => '0000', 'data' =>array('amount'=>$pack_val)));
                }else
                    $this->callback( array( 'ret' => '1007', 'msg' =>'领取失败'));
            }else
                $this->callback( array( 'ret' => '1009', 'msg' =>'对不起，该红包金额已领完'));
        }else
            $this->callback( array( 'ret' => '1006', 'msg' =>'参数错误'));
    }
    
    /**
     * 获取用户ID
     * @return array
     */
    private function getCert()
    {
        //通过微信号检查用户是否存在
        $uid = $this->post('uid');
        $cert = $this->authcrypt( $uid, 'decode' );
        if(!isset($cert['uid']) || empty($cert['uid']))
            $this->callback( array( 'ret' => '1101', 'msg' => '用户ID为空' ) );
        else
            return $cert;
    }

    /**
     * AJAX 请求处理接口
     */
    public function DataAction()
    {
        //禁用视图
        $this->disable();
	
        $time = time();
        //提交参数
        $param = $this->param;
        $method = $param['method'];
            
        if(!isset($param['id']) || empty($param['id']))
            $this->callback( array( 'ret' => '1001', 'msg' =>'ID不存在'));

        $activity = $this->db->table('redpack_activity_list')->where(array('site_id'=>$this->site->id, 'id'=>$param['id']))->get(1);
        if(empty($activity))
            $this->callback( array( 'ret' => '1002', 'msg' =>'活动不存在'));

        if($time < $activity->start_time)
            $this->callback( array( 'ret' => '1003', 'msg' =>'活动未开始，敬请期待！'));
        if($time > $activity->end_time)
            $this->callback( array( 'ret' => '1004', 'msg' =>'你来的太晚了，红包已经过期了，等下次活动信号吧!'));
        if($activity->status == 0)
            $this->callback( array( 'ret' => '1005', 'msg' =>'活动目前已关闭，请向主办方咨询'));

        switch( $method )
        {
            //读取活动信息
            case 'info':
                $activity->intro = strip_tags($activity->intro);
                $this->callback( array( 'ret' => '0000', 'data' =>$activity));
                break;

            case 'fetchgrouppack': //领取群红包                
                $packet = array('site_id'=>$this->site->id, 'activity_id'=>$param['id'], 'type'=>1);
                $packet['amount'] = $activity->amount;
                $packet['balance'] = $activity->amount;
                $packet['uid'] = 0;
                $packet['status'] = 0;
                $packet['dateline'] = $time;
                $packet['ip'] = Tool::getIP();
                $r = $this->db->table('redpack_packets')->insert($packet);
                if($r !== false)
                    $this->callback( array( 'ret' => '0000', 'data' =>array('id'=>$param['id'],'pack_id'=>$r, 'host'=>$this->site->url)));
                else
                    $this->callback( array( 'ret' => '1007', 'msg' =>'领取红包失败'));

                break;
        }
    }

}
