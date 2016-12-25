/*function getbnxs(){   
	var gethtml=$(".scm-content-hide td");
	if(gethtml==undefined||gethtml==null){return false;}
	var len=$(".scm-content-hide td").length;
	var html="";
	for(var i=0;i<len;i++)
	{
		if(i%2==0){
			html+="<div class='scm-content-box'>";
			html+="   <div class='title2'>";
			html+=      gethtml.eq(i).find("a").eq(0).parent().html()||$.trim(gethtml.eq(i).text());
			html+="     <div class='sz "+(i==0?'title2_data_show':'title2_data_hide')+"' no="+i+"></div>";
			html+="   </div>";
		}else{
			html+="   <div class='"+(i==1?'dis_tr':'dis_no')+" no_"+(i-1)+"'>"
			html+=		gethtml.eq(i).html();
			//html+="		<div class='clear30'></div>";
			html+="    </div>";
			html+="</div>"
		}
	}
	html="<div id='contents'>"+html+"</div>";
	$(".scm-content-show").eq(0).html(html);
	$(".scm-content-hide").html('');
	isshoworhide();
}*/

function getbnxs(){   
	var gethtml=$(".scm-content-hide td");
	if(gethtml==undefined||gethtml==null){return false;}
	var len=$(".scm-content-hide td").length;
	var html="";
	for(var i=0;i<len;i++)
	{
		if(i%2==0){
			html+="<div class='scm-content-box'>";
			html+="   <div class='sz title2' no="+i+">";
			html+=      gethtml.eq(i).find("a").eq(0).parent().html()||$.trim(gethtml.eq(i).text());
			html+="     <div class='"+(i==0?'title2_data_show':'title2_data_hide')+"'></div>";
			html+="   </div>";
		}else{
			html+="   <div class='"+(i==1?'dis_tr':'dis_no')+" no_"+(i-1)+"'>"
			html+=		gethtml.eq(i).html();
			html+="    </div>";
			html+="</div>"
		}
	}
	html="<div id='contents'>"+html+"</div>";
	$(".scm-content-show").eq(0).html(html);
	$(".scm-content-hide").html('');
	isshoworhide3();
}


function getjcxy(istitle){
	var gethtml=$(".scm-content-hide td");
	if(gethtml==undefined||gethtml==null){return false;}
	var len=$(".scm-content-hide td").length;
	var html="";

	var xyArray1=new Array();
	var xyArray2=new Array();
	var i1=0;
	var i2=0;
	var wx='';
	gethtml.each(function(i){
		if(i%2==0){
			xyArray1[i1]=$(this).text();
			i1++;
		}else{
			xyArray2[i2]=this;
			i2++;
		}
	});
	
	len=xyArray1.length;
	for(i=0;i<len;i++)
	{
		html+="<div class='scm-content-box'>";
		if(istitle)
		{
			html+="  <div class='title2 sz' no='"+i+"'>";
			html+=       xyArray1[i];
			html+="      <div class='"+(i==0?'title2_data_show':'title2_data_hide')+"'></div>";
			html+="  </div>";
		}
		html+="		 <ul class='item3 "+(i==0?'dis_tr':'dis_no')+" no_"+i+"'>";
		$(xyArray2[i]).find("a").each(function(){
			wx=$.trim($(this).text());
			if(wx=='官方微信'){				
				html+="<li style='overflow:none'>"+this.outerHTML+"</li>";	
			}
			else
			{
				html+="	    <li>"+this.outerHTML+"</li>";
			}
		});
		html+="		 </ul>";
		html+="	   </div>";
	}
	
	$(".scm-content-show").eq(0).html(html);
	unhref("scm-content-show");
	$(".scm-content-hide").html('');
	isshoworhide3();
}



function getznbm(istitle){
	var gethtml=$(".scm-content-hide td");
	if(gethtml==undefined||gethtml==null){return false;}
	var len=$(".scm-content-hide td").length;
	var html="";

	var xyArray1=new Array();
	var xyArray2=new Array();
	var i1=0;
	var i2=0;
	var wx='';
	gethtml.each(function(i){
		if(i%2==0){
			xyArray1[i1]=$(this).text();
			i1++;
		}else{
			xyArray2[i2]=this;
			i2++;
		}
	});
	
	len=xyArray1.length;
	for(i=0;i<len;i++)
	{
		html+="<div class='scm-content-box'>";
		if(istitle)
		{
			html+="  <div class='sz title2' no='"+i+"'>";
			html+=       xyArray1[i];
			html+="      <div class='"+(i==0?'title2_data_show':'title2_data_hide')+"'></div>";
			html+="  </div>";
		}
		html+="		 <ul class='item3 dis_tr' no_"+i+"'>";
		$(xyArray2[i]).find("a").each(function(){
			wx=$.trim($(this).text());
			if(wx=='官方微信'){				
				html+="<li style='overflow:none'>"+this.outerHTML+"</li>";	
			}
			else
			{
				html+="	    <li>"+this.outerHTML+"</li>";
			}
		});
		html+="		 </ul>";
		html+="	   </div>";
	}
	
	$(".scm-content-show").eq(0).html(html);
	unhref("scm-content-show");
	$(".scm-content-hide").html('');
	isshoworhide3();
}


function getjcxy2(istitle,isopen){
	var gethtml=$(".scm-content-hide td");
	if(gethtml==undefined||gethtml==null){return false;}
	var len=$(".scm-content-hide td").length;
	var html="";

	var xyArray1=new Array();
	var xyArray2=new Array();
	var i1=0;
	var i2=0;
	var wx='';
	gethtml.each(function(i){
		if(i%2==0){
			xyArray1[i1]=$(this).text();
			i1++;
		}else{
			xyArray2[i2]=this;
			i2++;
		}
	});
	
	len=xyArray1.length;
	for(i=0;i<len;i++)
	{		
		var zk="";
		var jt="";
		if(isopen){
			zk="dis_tr";
			jt="title2_data_show";
		}else
		{
			zk=(i==0?'dis_tr':'dis_no');
			jt=(i==0?'title2_data_show':'title2_data_hide');
		}

		html+="<div class='scm-content-box'>";
		if(istitle)
		{
			html+="  <div class='title2 sz' no='"+i+"'>";
			html+=       xyArray1[i];
			html+="      <div class='"+jt+"'></div>";
			html+="  </div>";
		}
		html+="		 <ul class='item3 "+zk+" no_"+i+"'>";
		$(xyArray2[i]).find("a").each(function(){
			//html+="			<li>"+this.outerHTML+"</li>";
			wx=$.trim($(this).text());
			if(wx=='官方微信'){				
				html+="<li style='overflow:none'>"+this.outerHTML+"</li>";	
			}
			else
			{
				html+="<li>"+this.outerHTML+"</li>";
			}
		});
		html+="		 </ul>";
		html+="	   </div>";
	}
	
	$(".scm-content-show").eq(0).html(html);
	unhref("scm-content-show");
	$(".scm-content-hide").html('');
	isshoworhide3();
}

function getdlm(istitle){
	var wx='';
	var gettable=$(".scm-content-hide table");
	var tablelen=gettable.length;
	if(tablelen<=0){return false;}
	var spans="<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>";

	var html="";
	gettable.each(function(i){
	    html+="<div class='scm-content-box'>";
		html+=" <div class='sz title2' no='"+i+"'>";
		html+=      $(this).find("td").eq(0).text();
		html+="      <div class='"+(i==0?'title2_data_show':'title2_data_hide')+"'></div>";
		html+=" </div>";
		html+=" <div class='"+(i==0?'dis_tr':'dis_no')+" no_"+i+"'>";
		$(this).find("td").each(function(j){		
			if(j!=0){
				if(j%2!=0){
					var test=$.trim($(this).text());
					if(test!=''){
						html+="<div class='scm-content-botx-title ejsz' no='"+i+""+j+"'>"+spans+"&nbsp;&nbsp;"+test+"&nbsp;&nbsp;"+spans+"</div>";
						//html+="<div class='no_"+i+""+j+" "+(i==0&&j==1?'dis_tr':'dis_no')+"'>";暂时注销，只展示第一个table中的第一个分类信息
						html+="<div class='no_"+i+""+j+"'>";//临时展示所有信息
					}
				}else{
					html+="		  <ul class='item3'>";
					$(this).parent().find("a").each(function(){
						//html+="			<li>"+this.outerHTML+"</li>";
						wx=$.trim($(this).text());
						if(wx=='官方微信'){				
							html+="<li style='overflow:none'>"+this.outerHTML+"</li>";	
						}
						else
						{
							html+="<li>"+this.outerHTML+"</li>";
						}
					});
					html+="		  </ul>";
					html+="	      <div class='clear20'></div>";
					html+="	    </div>";
				}
			}
		});
		html+="		</div>";
		html+="	   </div>";
	});
 


	$(".scm-content-show").eq(0).html(html);
	unhref("scm-content-show");
	$(".scm-content-hide").html('');
	isshoworhide3();
	isshoworhide2();
}



function getcjxz(){   
	var gettable=$(".scm-content-hide>table");
	var len=gettable.length;
	if(len==0){return false;}
	var html="";
	var wx='';
	var upclass="";
	var spans="<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>";
	//循环二级栏目table
	gettable.each(function(i){
		var upclass=$(this).find("td").eq(0).text();//获取二级栏目名	    
		html+="<div class='scm-content-box'>";
		html+=" <div class='sz title2' no='"+i+"'>";
		html+=      upclass;
		html+="      <div class='"+(i==0?'title2_data_show':'title2_data_hide')+"'></div>";
		html+=" </div>";
		
		html+=" <div class='"+(i==0?'dis_tr':'dis_no')+" no_"+i+"'>";
		
		//循环三级栏目table
		$(this).find("td").eq(1).find("td").each(function(j){
				if(j%2==0){
					var text=$.trim($(this).text());
					if(text!=''){
						//html+="<div class='scm-content-botx-title ejsz' no='"+i+""+j+"'>"+spans+"&nbsp;&nbsp;"+text+"&nbsp;&nbsp;"+spans+"</div>";
						html+="<div class='scm-content-botx-title ejsz cj' no='"+i+""+j+"'>"+"&nbsp;&nbsp;"+text+"&nbsp;&nbsp;"+"</div>";
						//html+="<div class='no_"+i+""+j+" "+(i==0&&j==1?'dis_tr':'dis_no')+"'>";暂时注销，只展示第一个table中的第一个分类信息
						html+="<div class='no_"+i+""+j+"'>";//临时展示所有信息
					}
				}else{
					html+="		  <ul class='item3 cjxz'>";
					$(this).parent().find("a").each(function(){
						//html+="			<li>"+this.outerHTML+"</li>";
						wx=$.trim($(this).text());
						if(wx=='官方微信'){				
							html+="<li style='overflow:none'>"+this.outerHTML+"</li>";	
						}
						else
						{
							html+="<li>"+this.outerHTML+"</li>";
						}
					});
					html+="		  </ul>";
					html+="	      <div class='clear'></div>";
					html+="	    </div>";
				}
		});
		html+="	 </div>";
		html+="</div>";
	});

	$(".scm-content-show").eq(0).html(html);
	unhref("scm-content-show");
	$(".scm-content-hide").html('');
	isshoworhide3();
	isshoworhide2();
}

function getwww(){
	var gethtml=$(".scm-content-hide tr");
	if(gethtml==undefined||gethtml==null){return false;}
	var len=$(".scm-content-hide tr").length;
	var html="";
	var wx='';

	var xyArray1=new Array();
	var xyArray2=new Array();

	gethtml.each(function(i){
		xyArray1[i]=$(this).find("td").eq(0);
		xyArray2[i]=$(this).find("td").eq(1);
	});
	
	len=xyArray1.length;
	for(i=0;i<len;i++)
	{
		html+="<div class='scm-content-box'>";
		html+="		 <div class='sz title2' no='"+i+"'>";
		html+="			<span id='_"+$(xyArray1[i]).text()+"'>"+$(xyArray1[i]).text()+"</span>";
		html+="      <div class='"+(i==0?'title2_data_show':'title2_data_hide')+"'></div>";
		html+="		 </div>";
		html+="		 <ul class='item3 "+(i==0?'dis_tr':'dis_no')+" no_"+i+"'>";
		$(xyArray2[i]).find("a").each(function(){
    		//html+="			<li>"+this.outerHTML+"</li>";
 			html+="			<li><a href='"+$(this).attr('href')+"' title='"+$(this).text()+"'>"+$(this).text()+"</a></li>";
		});
		html+="		 </ul>";
		html+="	   </div>";
	}
	
	$(".scm-content-show").eq(0).html(html);
	unhref("scm-content-show");
	$(".scm-content-hide").html('');
	isshoworhide3();
}

function isshoworhide(){
	$(".sz").bind("click",function(){
		var sz=$(".no_"+$(this).attr("no"));
		if(sz.css("display")=="none"){
			$(this).removeClass("title2_data_hide").addClass("title2_data_show");
			sz.removeClass("dis_no").addClass("dis_tr");
		}else{
			$(this).removeClass("title2_data_show").addClass("title2_data_hide");
			sz.removeClass("dis_tr").addClass("dis_no");
		}
	});
}

function isshoworhide2(){
	$(".ejsz").bind("click",function(){
		var sz=$(".no_"+$(this).attr("no"));
		if(sz.css("display")=="none"){
			sz.removeClass("dis_no").addClass("dis_tr");
		}else{
			sz.removeClass("dis_tr").addClass("dis_no");
		}
	});
}

function unhref(obj){	
	$("."+obj+" a").bind("click",function(event){
		if($(this).attr("href").indexOf("#")>=0){
			event.stopPropagation();
			return false;
		}
	});
}

//////////////////// 4.9号修改  ////////////////////////////
function isshoworhide3(){
	$(".sz").bind("click",function(){
		var ul=$(".no_"+$(this).attr("no"));
		if(ul.css("display")=="none"){
			$(this).find("div").removeClass("title2_data_hide").addClass("title2_data_show");
			ul.removeClass("dis_no").addClass("dis_tr");
		}else{
			$(this).find("div").removeClass("title2_data_show").addClass("title2_data_hide");
			ul.removeClass("dis_tr").addClass("dis_no");
		}		

	});
}
