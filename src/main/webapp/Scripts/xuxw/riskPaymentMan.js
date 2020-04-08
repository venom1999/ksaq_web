$(function () {

    /*查询的Js开始*/
    var t;
    var m = $("#Label0").val();
    for (var i = 1; i <= 5; i++) {
        if (i <= m)
            $("#div" + i).show();
        else
            $("#div" + i).hide();
        var dr_str = $("#DropDownList" + i + "1").val();
        show_div(dr_str, i);
    }
    $("#deleteRows").click(function () {
        if (m > 1) {
            t = "div" + m;
            $("#" + t).hide();
            $("#Label" + m).val("");
            m--;
        }
        else {
            return null;
        }
    })
    $("#addRows").click(function () {
        if (m < 6) {
            m++;
            if (m == 6)
                m--
            t = "div" + m;
            $("#" + t).show()
            $("#Label" + m).val("inline");
        }
    })

    $(".select_category").change(function () {
        var ids = $(this).attr("id");
        var str = $(this).val();
        var temp = ids.substring(13, 12);
        show_div(str, temp);

    });

    function show_div(str, temp) {
        if (str == "FileName") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "3");
            $("#comlon" + temp + "2").val("TextBox" + temp + "1");

            $("#DropDownList" + temp + "2").hide();
            $("#DropDownList" + temp + "3").show();

            //$("#ddlKeys" + temp + "1").hide();
            $("#ddlKeys" + temp + "2").hide();
            $("#TextBox" + temp + "1").show();
            $("#TextBox" + temp + "2").hide();
        }
        else if (str == "Year") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "2");
            $("#comlon" + temp + "2").val("TextBox" + temp + "2");

            $("#DropDownList" + temp + "2").show();
            $("#DropDownList" + temp + "3").hide();

            //$("#ddlKeys" + temp + "1").show();
            $("#ddlKeys" + temp + "2").hide();
            $("#TextBox" + temp + "1").hide();
            $("#TextBox" + temp + "2").show();
        }
        else if (str == "QuarterNum") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "3");
            $("#comlon" + temp + "2").val("ddlKeys" + temp + "2");

            $("#DropDownList" + temp + "2").hide();
            $("#DropDownList" + temp + "3").show();

            //$("#ddlKeys" + temp + "1").hide();
            $("#ddlKeys" + temp + "2").show();
            $("#TextBox" + temp + "1").hide();
            $("#TextBox" + temp + "2").hide();
        }

        /*请选择，清空其他*/
        else if (str == "请选择") {

            $("#comlon" + temp + "1").val("DropDownList" + temp + "3");
            $("#comlon" + temp + "2").val("TextBox" + temp + "1");

            $("#DropDownList" + temp + "2").hide();
            $("#DropDownList" + temp + "3").show();

            //$("#ddlKeys" + temp + "1").hide();
            $("#ddlKeys" + temp + "2").hide();
            $("#TextBox" + temp + "1").show();
            $("#TextBox" + temp + "2").hide();
            $("#TextBox" + temp + "1").attr("value", "");
        }
    }


    /*查询的Js结束*/

    //为选中行添加高亮
    $('.radio').click(function () {
        $(this).parent().parent().addClass('selected');
        $(this).parent().parent().siblings().removeClass('selected');
    });

    //详细事件
    $('#detail').click(function () {
        var MortgageID = $("input[.radio][checked]").val();
        if (MortgageID != undefined) {
            return qBox.iFLoad({ title: '抵押金发放详细信息', src: 'riskPaymentDetail1.aspx?MortgageID=' + MortgageID + '&rdom=' + Math.random() + '&fatherCookie=' + getHtmlDocName(), w: 800, h: 380 });
        }
        else {
            alert("请选择您要查看的记录，再点击详细！");
            return false;
        }
    });


    /*添加层的显示*/
    $("#popAdd").click(function () {
        return qBox.iFLoad({ title: '添加抵押金发放信息', src: 'riskPaymentAdd1.aspx?rdom=' + Math.random(), w: 800, h: 380 });
    });

    /*修改层的显示*/
    $("#popEdit").click(function () {
        var MortgageID = $("input[.radio][checked]").val();
        if (MortgageID != undefined) {
            return qBox.iFLoad({ title: '修改抵押金发放信息', src: 'riskPaymentEdit1.aspx?MortgageID=' + MortgageID + '&rdom=' + Math.random(), w: 800, h: 380 });
        }
        else {
            alert("请选择您要修改记录，再点击修改！");
            return false;
        }
    });
    
    /*删除点击提交的事件*/
    $('#delete').click(function () {
        var MortgageID = $("input[.radio][checked]").val(); //获取单选按钮
        if (MortgageID != undefined) {
            //执行删除操作
            /*获取变量，并进行删除处理，异步进行，先删除数据库，然后回调函数删除页面上的一行*/
            if (confirm("您确定要删除吗?")) {
                $.post("dataProcess.ashx", { op: "GrantingForMortgagePayments_T1", MortgageID: MortgageID, rdom: Math.random() }, function (data) {
                    if (data == "") {
                        $("#tr_" + MortgageID).remove();
                    }
                });
            }

        }
        else {
            alert("请选择您要删除的记录，点击单选按钮选中！");
            return false;
        }
    });
})