package controllers

import (
	"WEB/WebCore/app/models"
	"github.com/revel/revel"
	"labix.org/v2/mgo/bson"
)

type Cout struct {
	*revel.Controller
}

func (c Cout) List(tid string) revel.Result {
	tree := bson.M{}
	models.One("webtree", bson.M{"_id": tid}, &tree, nil)
	if tree["Cout"] == nil {
		tree["Cout"] = ""
	}
	c.RenderArgs["tree"] = tree

	return c.RenderTemplate(models.Theme + "/" + tree["Tmp"].(string) + ".html")
}
