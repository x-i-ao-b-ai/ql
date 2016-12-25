package controllers

import (
	"WEB/WebCore/app/models"

	"github.com/revel/revel"
	"labix.org/v2/mgo/bson"
)

type Index struct {
	*revel.Controller
}

func (c Index) Index() revel.Result {

	f := make([]bson.M, 0)

	models.List_Flash("webflash", nil, &f, nil, 3)
	c.RenderArgs["flash"] = f

	link := make([]bson.M, 0)
	models.List_Limit("weblink", nil, &link, nil, 8)
	c.RenderArgs["link"] = link

	news := make([]bson.M, 0)
	models.List_Limit("doc", bson.M{"Tid": "news"}, &news, nil, 2)
	c.RenderArgs["news"] = news

	notic := make([]bson.M, 0)
	models.List_Limit("doc", bson.M{"Tag": "通知通告"}, &notic, nil, 6)
	c.RenderArgs["notice"] = notic

	/*server := make([]bson.M, 0)
	models.Doc_List("doc", bson.M{"Tid": "servers"}, &server, nil)
	c.RenderArgs["server"] = server

	eduAdm := make([]bson.M, 0)
	models.List_Limit("doc", bson.M{"Tid": "jiaowudongtai"}, &eduAdm, nil, 8)
	c.RenderArgs["eduAdm"] = eduAdm*/

	scien := make([]bson.M, 0)
	models.List_Limit("doc", bson.M{"Tid": bson.M{"$in": []string{"xskytz", "kygk", "kygk", "hjcg", "zlyl", "xslw"}}}, &scien, nil, 6)
	c.RenderArgs["scien"] = scien

	worStu := make([]bson.M, 0)
	models.List_Limit("doc", bson.M{"Tid": "xgdt"}, &worStu, nil, 6)
	c.RenderArgs["worStu1"] = worStu[0]
	c.RenderArgs["worStu"] = worStu[1:]

	return c.RenderTemplate(models.Theme + "/Index.html")
}

func (c Index) Index2() revel.Result {

	f := make([]bson.M, 0)

	models.List_Flash("webflash", nil, &f, nil, 4)
	c.RenderArgs["flash"] = f

	link := make([]bson.M, 0)
	models.List_Limit("weblink", nil, &link, nil, 8)
	c.RenderArgs["link"] = link

	news := make([]bson.M, 0)
	models.List_Limit("doc", bson.M{"Tid": "news"}, &news, nil, 6)
	c.RenderArgs["news"] = news

	notic := make([]bson.M, 0)
	models.List_Limit("doc", bson.M{"Tag": "通知通告"}, &notic, nil, 6)
	c.RenderArgs["notice"] = notic

	scien := make([]bson.M, 0)
	models.List_Limit("doc", bson.M{"Tid": bson.M{"$in": []string{"xskytz", "kygk", "kygk", "hjcg", "zlyl", "xslw"}}}, &scien, nil, 6)
	c.RenderArgs["scien"] = scien

	worStu := make([]bson.M, 0)
	models.List_Limit("doc", bson.M{"Tid": "xsgzbs"}, &worStu, nil, 6)

	return c.RenderTemplate(models.Theme + "/Index2.html")
}
