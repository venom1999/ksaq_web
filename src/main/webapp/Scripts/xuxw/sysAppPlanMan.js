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
        if (m > 2) {
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
        if (str == "InstitutionNum") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "3"); //设置条件选中，2对应大于小于等于，3对应like或=
            $("#comlon" + temp + "2").val("TextBox" + temp + "1"); //设置值选中,就是下面的输入框是显示的那种

            $("#DropDownList" + temp + "2").hide(); //大于类
            $("#DropDownList" + temp + "3").show(); //包含

            $("#TextBox" + temp + "1").show(); //文本框
            $("#TextBox" + temp + "2").hide(); //日历文本框
        }

        else if (str == "Arrangement") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "3");
            $("#comlon" + temp + "2").val("TextBox" + temp + "1");

            $("#DropDownList" + temp + "2").hide();
            $("#DropDownList" + temp + "3").show();

            $("#TextBox" + temp + "1").show();
            $("#TextBox" + temp + "2").hide();
        }
        // add
        else if (str == "PlanDate") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "2");
            $("#comlon" + temp + "2").val("TextBox" + temp + "2");

            $("#DropDownList" + temp + "2").show();
            $("#DropDownList" + temp + "3").hide();


            $("#TextBox" + temp + "1").hide();
            $("#TextBox" + temp + "2").show();
        }
        else if (str == "PlanTarget") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "3");
            $("#comlon" + temp + "2").val("TextBox" + temp + "1");

            $("#DropDownList" + temp + "2").hide();
            $("#DropDownList" + temp + "3").show();

            $("#TextBox" + temp + "1").show();
            $("#TextBox" + temp + "2").hide();
        }
        else if (str == "PlanContent") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "3");
            $("#comlon" + temp + "2").val("TextBox" + temp + "1");

            $("#DropDownList" + temp + "2").hide();
            $("#DropDownList" + temp + "3").show();

            $("#TextBox" + temp + "1").show();
            $("#TextBox" + temp + "2").hide();
        }
        else if (str == "FillPerson") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "3");
            $("#comlon" + temp + "2").val("TextBox" + temp + "1");

            $("#DropDownList" + temp + "2").hide();
            $("#DropDownList" + temp + "3").show();

            $("#TextBox" + temp + "1").show();
            $("#TextBox" + temp + "2").hide();
        }
        else if (str == "FillTime") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "2");
            $("#comlon" + temp + "2").val("TextBox" + temp + "2");

            $("#DropDownList" + temp + "2").show();
            $("#DropDownList" + temp + "3").hide();

            $("#TextBox" + temp + "1").hide();
            $("#TextBox" + temp + "2").show();
        }
        else if (str == "CheckPerson") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "3");
            $("#comlon" + temp + "2").val("TextBox" + temp + "1");

            $("#DropDownList" + temp + "2").hide();
            $("#DropDownList" + temp + "3").show();

            $("#TextBox" + temp + "1").show();
            $("#TextBox" + temp + "2").hide();
        }
        else if (str == "CheckTime") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "2");
            $("#comlon" + temp + "2").val("TextBox" + temp + "2");

            $("#DropDownList" + temp + "2").show();
            $("#DropDownList" + temp + "3").hide();

            $("#TextBox" + temp + "1").hide();
            $("#TextBox" + temp + "2").show();
        }
        /*请选择，清空其他*/
        else if (str == "请选择") {

            $("#comlon" + temp + "1").val("DropDownList" + temp + "3");
            $("#comlon" + temp + "2").val("TextBox" + temp + "1");

            $("#DropDownList" + temp + "2").hide();
            $("#DropDownList" + temp + "3").show();

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

    /*详细信息显示*/
    $('#detail').click(function () {
        var planID = $("input[.radio][checked]").val();
        if (planID != undefined && planID != "") {
            return qBox.iFLoad({ title: '系统管理评审计划详细信息', src: 'sysAppPlanDetail.aspx?planID=' + planID + '&rdom=' + Math.random(), w: 664, h: 385 });
        }
        else {
            alert("请选择您要查看的记录！");
            return false;
        }
    });

    /*添加层的显示*/
    $("#popAdd").click(function () {
        return qBox.iFLoad({ title: '添加系统管理评审计划信息', src: 'sysAppPlanAdd.aspx?rdom=' + Math.random(), w: 664, h: 385 });
    });

    /*修改层的显示*/
    $("#popEdit").click(function () { //state 为 1 表示审查开始之前，为2表示审查结束，为3表示在审查之中
        var planID = $("input[.radio][checked]").val();
        if (planID != undefined && planID != "") {
            return qBox.iFLoad({ title: '修改系统管理评审计划信息', src: 'sysAppPlanEdit.aspx?planID=' + planID + '&rdom=' + Math.random(), w: 664, h: 385 });
        }
        else {
            alert("请选择您要修改的记录！");
            return false;
        }
    });

    /*删除事件*/
    $('#delete').click(function () {
        var planID = $("input[.radio][checked]").val();
        if (planID != undefined && planID != "") {
            if (confirm("您确定要删除吗？")) {
                $.post("dataProcess.ashx", { op: "sysAppPlanDel", planID: planID, rdom: Math.random() }, function (data) {
                    if (data == "") {
                        $("#tr_" + planID).remove();
                    }
                    else {
                        alert("删除失败！");
                        return false;
                    }
                });
            } else {
                return false;
            }

        }
        else {
            alert("请选择您要删除的记录！");
            return false;
        }
    });

    //重置按钮事件
    $('#btnReset').click(function () {
        $('#txt_Arrangement').attr("value", "");
        $('#txt_PlanBased').attr("value", "");
        $('#txt_PlanTarget').attr("value", "");
        $('#txt_PlanContent').attr("value", "");
        $('#txt_PlanArea').attr("value", "");
        $('#txt_institution').attr("value", "");
        $('#txt_input').attr("value", "");
        $('#txt_output').attr("value", "");
        $('#txt_PlanDate').attr("value","");
        $('#txt_fillPer').attr("value", "");
        $('#txt_fillTime').attr("value", "");
        $('#txt_checkPer').attr("value", "");
        $('#txt_checkTime').attr("value", "");
    });

})