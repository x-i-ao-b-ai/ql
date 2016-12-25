package controllers

import (
	"WEB/WebCore/app/models"
	"github.com/revel/revel"
	"labix.org/v2/mgo/bson"
)

type Img struct {
	*revel.Controller
}

func (c Img) List(tid string) revel.Result {
	tree := bson.M{}
	models.One("webtree", bson.M{"_id": tid}, &tree, nil)
	c.RenderArgs["tree"] = tree

	server := make([]bson.M, 0)
	models.Doc_List("doc", bson.M{"Tid": "servers"}, &server, nil)
	c.RenderArgs["server"] = server

	list := make([]bson.M, 0)
	models.Doc_List("doc", bson.M{"Tid": tid}, &list, nil)
	c.RenderArgs["list"] = list

	return c.RenderTemplate(models.Theme + "/" + tree["Tmp"].(string) + ".html")
}

func (c Img) Cout(tid string, id string) revel.Result {
	tree := bson.M{}
	models.One("webtree", bson.M{"_id": tid}, &tree, nil)
	cout := bson.M{}
	models.One("doc", bson.M{"_id": id}, &cout, nil)
	models.Update("doc", bson.M{"_id": id}, bson.M{"$inc": bson.M{"Click": 1}})

	c.RenderArgs["tree"] = tree
	c.RenderArgs["cout"] = cout

	return c.RenderTemplate(models.Theme + "/" + tree["Tmp"].(string) + "_cout.html")
}
