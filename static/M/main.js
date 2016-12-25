/**
 * Created by jxteam on 14-8-7.
 */
var navlist = $("#navlist");

$("#menu").click(function () {
    if (navlist.css("display") == "block") {
        menu_close()
    } else {
        menu_open()
    }
});

function menu_open() {
    navlist.css("display", "block");
    $("#menu").css("backgroundColor", "rgb(2, 17, 46)");
    $("#full_wall").css("display", "block");
    navlist.animate({
        opacity: 1
    }, 300);
}

function menu_close() {
    navlist.css("display", "none");
    $("#menu").css("backgroundColor", "#04043D")
    $("#full_wall").css("display", "none");
    navlist.css("opacity", 0);
}

$("#back").click(function () {
    history.go(-1)
});

$("#next").click(function () {
    history.go(+1)
});

$("#refresh").click(function () {
    location.reload();
});


//if ($(".container").height() + 40 < $(document.body).height()) {
//    $(".container").height($(document.body).height() - 40)
//}

if ($(".list ul").children().length == 0) {
    $(".no-data").css("display", "block")
}

$(".footer").css("display", "block")

$(document.body).append("<div id='full_wall' style='display:none;position: fixed;width: 100%;height: 100%;top: 0;left: 0;background-color: rgba(0, 0, 0, 0.2);'></div>");
$("#full_wall").click(function () {
    menu_close()
});