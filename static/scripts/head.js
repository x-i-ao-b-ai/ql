/*导航背景变换*/
function bgon(diva){
diva.className="nav_on";
}
function bgoff(diva)
{
diva.className="nav";
}
function bgon1(diva){
diva.className="nav1_on";
}
function bgoff1(diva)
{
diva.className="nav1";
}
function bgat()
{
    var url = location.href;
    var temp = url.split(".");
    var pname = temp[temp.length-2];
    var at = pname.lastIndexOf("/");
    var cobj = pname.substring(at+1,pname.length).toLowerCase();
    if(document.getElementById(cobj))
    {
        if(cobj=="undergraduate" || cobj=="graduate")
            document.getElementById(cobj).className="nav1_on";
        else
            document.getElementById(cobj).className="nav_on";
        document.getElementById(cobj).onmouseover=null;
        document.getElementById(cobj).onmouseout=null;
    }
    else if(cobj=="union")
        document.getElementById("student").className = "nav_on";
    else if(cobj=="construction" || cobj=="leader")
        document.getElementById("introduce").className = "nav_on";

}
/*设为首页*/
function hpage(x) {
  
  document.getElementById("hp").style.behavior= 'url(#default#homepage)';
  document.getElementById("hp").setHomePage ('http://seee.hust.edu.cn');
}




/*加入收藏*/
function addfav() {
  window.external.AddFavorite('http://seee.hust.edu.cn','华中科技大学电气与电子工程学院')
}


