package controllers

import (
	"github.com/revel/revel"
	"WEB/WebCore/app/models"
	"labix.org/v2/mgo/bson"
)

type M struct {
	*revel.Controller
}

func (c M) Index() revel.Result {
	f := make([]bson.M, 0)
	models.List("webflash", nil, &f, nil)
	c.RenderArgs["flash"] = f
	return c.RenderTemplate("WcNor" + "/Index.html")
}
