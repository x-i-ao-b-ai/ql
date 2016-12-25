/* 
 * 专门为golang设计的数据分页
 */
Jxpage = function (str, page) {
    var urls = location.search;
    urls = urls.replace(/p[^&]*/, "");
    urls = urls.replace(/\?&/, "?");
    urls = urls.replace(/&&/, "&");
    if ((urls.match(/\?/) || []).length == 0) {
        urls += "?"
    }
    url = location.pathname + urls;

    var total = page[0]; //all number
    var page_curr = page[1];//当前的页面
    var page_num = page[2];//每个页面多少内容

    if (total == 0) {
        return
    }
    if (total % page_num == 0) {
        var page_all = (total - total % page_num) / page_num
    } else {
        var page_all = (total - total % page_num) / page_num + 1;//总页面数
    }
    //段长度
    var slice_num = 8;
    //起始页面
    var start = page_curr - page_curr % slice_num;
    //在一个段的第几个
    if (page_curr % slice_num != 0) {
        var curr = page_curr % slice_num;
    } else {
        var curr = 8;
        start = start - slice_num
    }

    //执行代码
    var len = slice_num;

    if (page_curr > (page_all - page_all % slice_num)) {
        len = page_all % slice_num;
    }
    var list_str = "";
    if (page_curr > 1) {
        list_str += "<li class='prev'><a href='" + url + "&p=" + (page_curr-1) + "'>上一页</a></li>";
    }
    for (var i = 1; i <= len; i++) {
        list_str = list_str + "<li ";
        if (i == curr) {
            list_str += "class='active' ><a href='javascript:void(0)'>" + (start + i) + "</a></li>";
        } else {
            list_str += "><a href='" + url + "&p=" + (start + i) + "'>" + (start + i) + "</a></li>";
        }

    }
    if (page_curr < page_all) {
        list_str = list_str + "<li class='next'><a href='" + url + "&p=" + (page_curr + 1) + "'>下一页</a></li>";
    }
    $("#" + str).html(list_str);
}