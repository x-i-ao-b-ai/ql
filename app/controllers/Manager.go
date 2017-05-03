package controllers

import (
	"WEB/WebCore/app/models"

	"github.com/revel/revel"
	"labix.org/v2/mgo/bson"
)

type Manager struct {
	*revel.Controller
}

func (c Manager) Declare(tid string, p int, l int) revel.Result {

	if p == 0 {
		p = 1
	}
	if l == 0 {
		l = 12
	}

	tree := bson.M{}
	models.One("webtree", bson.M{"_id": tid}, &tree, nil)
	c.RenderArgs["tree"] = tree

	list := make([]bson.M, 0)
	req := bson.M{"Tid": tid}
	models.List_Sort("doc", &req, &list, &bson.M{"Name": 1, "Tid": 1, "Img": 1, "Desc": 1, "_id": 1, "time": 1}, p, l, "-Sort", "-time")
	c.RenderArgs["list"] = list
	c.RenderArgs["p"] = p
	c.RenderArgs["Total"] = models.Count("doc", &req)
	c.RenderArgs["Limit"] = l

	return c.RenderTemplate(models.Theme + "/manager/declare.html")
}

func (c Manager) Check(tid string, id string) revel.Result {
	tree := bson.M{}
	models.One("webtree", bson.M{"_id": tid}, &tree, nil)
	cout := bson.M{}
	models.One("doc", bson.M{"_id": id}, &cout, nil)
	models.Update("doc", bson.M{"_id": id}, bson.M{"$inc": bson.M{"Click": 1}})

	c.RenderArgs["tree"] = tree
	c.RenderArgs["cout"] = cout

	return c.RenderTemplate(models.Theme + "/manager/check.html")
}

func (c Manager) Done(tid string, id string) revel.Result {
	tree := bson.M{}
	models.One("webtree", bson.M{"_id": tid}, &tree, nil)
	cout := bson.M{}
	models.One("doc", bson.M{"_id": id}, &cout, nil)
	models.Update("doc", bson.M{"_id": id}, bson.M{"$inc": bson.M{"Click": 1}})

	c.RenderArgs["tree"] = tree
	c.RenderArgs["cout"] = cout

	return c.RenderTemplate(models.Theme + "/manager/done.html")
}

func (c Manager) List(tid string, id string) revel.Result {
	tree := bson.M{}
	models.One("webtree", bson.M{"_id": tid}, &tree, nil)
	cout := bson.M{}
	models.One("doc", bson.M{"_id": id}, &cout, nil)
	models.Update("doc", bson.M{"_id": id}, bson.M{"$inc": bson.M{"Click": 1}})

	c.RenderArgs["tree"] = tree
	c.RenderArgs["cout"] = cout

	return c.RenderTemplate(models.Theme + "/manager/list.html")
}

func (c Manager) DownLoad(tid string, id string) revel.Result {
	tree := bson.M{}
	models.One("webtree", bson.M{"_id": tid}, &tree, nil)
	cout := bson.M{}
	models.One("doc", bson.M{"_id": id}, &cout, nil)
	models.Update("doc", bson.M{"_id": id}, bson.M{"$inc": bson.M{"Click": 1}})

	c.RenderArgs["tree"] = tree
	c.RenderArgs["cout"] = cout

	return c.RenderTemplate(models.Theme + "/manager/download.html")
}
