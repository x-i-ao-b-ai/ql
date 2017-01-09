package app

import (
	"WEB/WebCore/app/models"
	"html/template"
	"time"

	"github.com/revel/revel"
	"labix.org/v2/mgo/bson"
)

func init() {
	//runtime.GOMAXPROCS(runtime.NumCPU())
	//过滤器
	revel.Filters = []revel.Filter{
		revel.PanicFilter,             // 错误过滤器
		revel.RouterFilter,            // 路由过滤器
		revel.FilterConfiguringFilter, //自定义路由器
		revel.ParamsFilter,            // 参数解析
		revel.SessionFilterNew,        //自定义session
		revel.ValidationFilter,        // 数据过滤
		revel.InterceptorFilter,       // 自定义方法
		revel.ActionInvoker,           // 添加方法
	}
	//添加模板标签
	revel.TemplateFuncs["nav"] = func(top string) template.HTML {
		list := make([]bson.M, 0)
		models.Doc_List("webtree", bson.M{"Top": top, "Status": 1}, &list, nil)
		data := ""
		for _, v := range list {
			data = data + "<li class='nav-li'><a href='/" + v["Ty"].(string) + "/List?tid=" + v["_id"].(string) +
				"'>" + v["Name"].(string) + "</a></li>"
		}
		return template.HTML(data)
	}

	revel.TemplateFuncs["nav2"] = func(top string) template.HTML {
		list := make([]bson.M, 0)
		models.Doc_List("webtree", bson.M{"Top": top, "Status": 1}, &list, nil)
		data := ""
		for _, v := range list {
			data = data + "<li><a href='/" + v["Ty"].(string) + "/List?tid=" + v["_id"].(string) +
				"'><p>" + v["Name"].(string) + "</p></a></li>"
		}
		return template.HTML(data)
	}

	revel.TemplateFuncs["left_same_level"] = func(top string) template.HTML {
		list := make([]bson.M, 0)
		models.Doc_List("webtree", bson.M{"Top": top}, &list, nil)
		data := ""
		for _, v := range list {
			data = data + `<li><a href="/` + v["Ty"].(string) + `/List?tid=` + v["_id"].(string) + `"><i class="fa fa-volume-up" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;` + v["Name"].(string) + `</a></li>`
		}
		return template.HTML(data)
	}
	//时间转化
	revel.TemplateFuncs["time2014"] = func(t int64) template.HTML {
		return template.HTML(time.Unix(t, 0).Format("2006-01-02"))
	}

	//时间转化
	revel.TemplateFuncs["time20_14"] = func(t int64) template.HTML {
		return template.HTML(time.Unix(t, 0).Format("01-02"))
	}

	revel.TemplateFuncs["right_news"] = func() template.HTML {
		list := make([]bson.M, 0)
		models.List_Limit("doc", bson.M{"Tid": "news"}, &list, nil, 6)
		data := ""
		for _, v := range list {
			data = data + "<a  target='_blank' href='/Nor/Cout?id=" + v["_id"].(string) + "' title=" + v["Name"].(string) + ">" + v["Name"].(string) + "</a><br/>"
		}
		return template.HTML(data)
	}

	revel.TemplateFuncs["right_notic"] = func() template.HTML {
		list := make([]bson.M, 0)
		models.List_Limit("doc", bson.M{"Tag": "通知通告"}, &list, nil, 6)
		data := ""
		for _, v := range list {
			data = data + "<a  target='_blank' href='/Nor/Cout?id=" + v["_id"].(string) + "' title=" + v["Name"].(string) + ">" + v["Name"].(string) + "</a><br/>"
		}
		return template.HTML(data)
	}

	revel.TemplateFuncs["right_eduAdm"] = func() template.HTML {
		list := make([]bson.M, 0)
		models.List_Limit("doc", bson.M{"Tid": "jwtz"}, &list, nil, 6)
		data := ""
		for _, v := range list {
			data = data + "<a  target='_blank'  href='/Nor/Cout?id=" + v["_id"].(string) + "' title=" + v["Name"].(string) + ">" + v["Name"].(string) + "</a><br/>"
		}
		return template.HTML(data)
	}

	revel.TemplateFuncs["foot_link"] = func() template.HTML {
		list := make([]bson.M, 0)
		models.Doc_List("weblink", nil, &list, nil)
		data := ""
		for _, v := range list {
			data = data + "<a href='" + v["Url"].(string) + "'" + "target='_blank' style='padding-right: 5px;' class='flink'>" + v["Name"].(string) + "</a>"
		}
		return template.HTML(data)
	}

	revel.TemplateFuncs["left_nave_name"] = func(top string) template.HTML {
		list := bson.M{}
		models.One("webtree", bson.M{"_id": top}, &list, &bson.M{"Name": 1})

		data := list["Name"].(string)
		return template.HTML(data)
	}

	revel.TemplateFuncs["icon"] = func(img interface{}) template.HTML {
		if img == nil || img.(string) == "" {
			return template.HTML("/static/images/icon.jpg")
		} else {
			return template.HTML(img.(string))
		}
	}

	revel.TemplateFuncs["sybt"] = func(tid string) template.HTML {
		list := bson.M{}
		models.One("webtree", bson.M{"_id": tid}, &list, &bson.M{"Name": 1})

		data := list["Name"].(string)
		return template.HTML(data)
	}

	revel.TemplateFuncs["sybt"] = func(tid string) template.HTML {
		list := bson.M{}
		models.One("webtree", bson.M{"_id": tid}, &list, &bson.M{"Name": 1})

		data := list["Name"].(string)
		return template.HTML(data)
	}

	revel.TemplateFuncs["custom_nav"] = func(tid string) template.HTML {
		return template.HTML("")
	}
}
