$(function () {
    /*为一级菜单添加选中样式，并去除上一次选中的样式*/
    $('div .left_title a').click(function () {
        //alert("left");
        $(this).addClass("link_on");
        $(this).parent().siblings().find('a').removeClass("link_on");
    });

    /*为二级菜单添加选中样式，并去除上一次选中的样式*/
    $('div.left_shu2 ul li').click(function () {
        //alert("li");
        $(this).addClass("shu_hover");
        $(this).siblings().removeClass("shu_hover");
    });
})