package controllers

import (
	"WEB/WebCore/app/models"
	"github.com/revel/revel"
	"labix.org/v2/mgo/bson"
)

type Tag struct {
	*revel.Controller
}

func (c Tag) List(tag string, p int, l int) revel.Result {

	if p == 0 {
		p = 1
	}

	if l == 0 {
		l = 15
	}

	c.RenderArgs["tree"] = bson.M{"Name": tag}

	list := make([]bson.M, 0)
	req := bson.M{"Tag": tag}
	models.List_Sort("doc", &req, &list, &bson.M{"Name": 1, "Tid": 1, "Img": 1, "Desc": 1, "_id": 1, "time": 1}, p, l, "-time")
	c.RenderArgs["list"] = list
	c.RenderArgs["p"] = p
	c.RenderArgs["Total"] = models.Count("doc", &req)
	c.RenderArgs["Limit"] = l

	return c.RenderTemplate(models.Theme + "/xinwen.html")
}
