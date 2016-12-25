/**
 * Created by xiaobai on 14-6-27.
 */

$(".header").mouseover(function () {
    $(this).addClass("big");
});
$(".header").mouseout(function () {
    $(this).removeClass("big");
});

/*主页高度跳转*/

var window_h = $(window).height();
function gotoatart() {
    $("html,body").animate({scrollTop: window_h - 50}, 500);
}


function resize_f() {
    window_h = $(window).height();
    if (window_h > 590) {
        $("#start").css("height", window_h + "px");
    }
    $(".void-content").css("height", window_h + "px");
    $("#logo-bg").css("marginTop", (window_h * 0.2) + "px");
}

$(window).resize(function () {
    resize_f()
});

$(window).scroll(function () {
    if ($(window).scrollTop() >= 30) {
        $("#nextOnly").hide();
    } else {
        $("#nextOnly").show();
    }
});

function contact() {
    $(".contact-container").addClass("show");
}
$('.contact-container').click(function (event) {
    if (event.target == this) {
        $(".contact-container").removeClass("show");
    }
});

if ( typeof(currTree)=="undefined") {
    currTree = location.pathname
}


$(".menu>ul>li").each(function () {
    if ($(this).find('a').attr("href") == currTree) {
        $(this).addClass("active");
    }
});

resize_f()

