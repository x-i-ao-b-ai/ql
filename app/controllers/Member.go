package controllers

import (
	"github.com/revel/revel"
	"labix.org/v2/mgo/bson"
	"WEB/WebCore/app/models"
	"encoding/hex"
	"crypto/md5"
)

type Member struct {
	*revel.Controller
}

//会员页面
func (c Member) Index() revel.Result {

	return c.Render()
}

//Keyword装着购物车（Cart）等的关键字
func (c Member) List(id , Keyword string) revel.Result {
	memb := bson.M{}
	models.One("member", bson.M{"_id":id}, &memb, nil)

	goods := &[]bson.M{}
	models.List("goods", bson.M{"_id":bson.M{"$in":memb[Keyword]}}, goods, nil)

	c.RenderArgs["goods"] = goods
	return c.RenderTemplate("Member" + "/" + Keyword + ".html")
}

//设置个人资料
func (c Member) Seting(id  string) revel.Result {
	memb := bson.M{}
	models.One("member", bson.M{"_id":id}, &memb, nil)

	return c.Render(memb)
}


func (c Member) Edit_name(id string) revel.Result {
	memb := bson.M{}
	models.One("member", bson.M{"_id":id}, &memb, nil)

	return c.Render(memb)
}

func (c Member) Update(id , name string) revel.Result {
	c.Validation.Required(name).Message("用户名不能为空")
	rels := map[string]string{}
	if c.Validation.HasErrors() {
		errs := c.Validation.ErrorMap()
		rels["Data"] = "["
		for key, value := range errs {
			rels["Data"] = rels["Data"]+"{'key':'"+key+"','mag':'"+value.Message+"'},"
		}
		rels["Data"] += "]"
		rels["Status"] = "0"
	}else {
		err := models.Update("member", bson.M{"_id":id}, bson.M{"$set":bson.M{"Name":name}})
		if err != nil {
			rels["Status"] = "1"
		}else {
			rels["Status"] = "0"
			rels["Data"] = "[{'key':'error','mag':'插入错误或信息没有修改'}]"
		}
	}
	return c.RenderJson(rels)
}

func (c Member) Edit_pass(id , password_N , password_O string) revel.Result {
	rels := map[string]string{}

	m := md5.New()
	m.Write([]byte(password_O))
	password_O = hex.EncodeToString(m.Sum(nil))

	memb := bson.M{}
	models.One("member", bson.M{"_id":id}, &memb, nil)

	if password_O == memb["Password"] {
		if password_N != "" {
			c.Validation.MinSize(password_N, 6).Message("密码是长度需要大于6")
			c.Validation.MaxSize(password_N, 16).Message("密码长度需要小于16")
		}
		if c.Validation.HasErrors() {
			errs := c.Validation.ErrorMap()
			rels["Data"] = "["
			for key, value := range errs {
				rels["Data"] = rels["Data"]+"{'key':'"+key+"','mag':'"+value.Message+"'},"
			}
			rels["Data"] += "]"
			rels["Status"] = "0"
		}else {
			if password_N != "" {
				m := md5.New()
				m.Write([]byte(password_N))
				password_N = hex.EncodeToString(m.Sum(nil))
			}
			err := models.Update("member", bson.M{"_id":id}, bson.M{"$set":bson.M{"Password":password_N}})
			if err != nil {
				rels["Status"] = "1"
			}else {
				rels["Status"] = "0"
				rels["Data"] = "[{'key':'error','mag':'插入错误或信息没有修改'}]"
			}
		}
	}else {
		rels["Status"] = "0"
		rels["Data"] = "账户和密码有误"

	}
	return c.RenderJson(rels)
}
