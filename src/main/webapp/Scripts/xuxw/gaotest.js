$(function () {
    //alert("123");
    $("tr[class^=show]").hide();
    $("td[id^=row]").click(function () {
        var num = $(this).attr("id");
        var index = num.substring(3, num.length);
        //alert(index);
        $("td[id^=row]").css("background", "#ffffff");
        $(this).css("background", "#DFEEFF");
        $("tr[class^=show_row]").hide();
        $("tr[class='show_row" + index + "']").show();

    });
    //弹出人员定位信息
    $('#gaotest').click(function () {
        return qBox.iFLoad({ title: '人员定位信息', src: 'gaotest.aspx?rdom=' + Math.random(), w: 500, h: 305 });
    });
})