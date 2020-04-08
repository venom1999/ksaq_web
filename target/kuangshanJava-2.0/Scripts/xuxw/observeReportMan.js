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
        var temp = ids.substring(13, 12); ;
        show_div(str, temp);

    });

    function show_div(str, temp) {
        if (str == "InstitutionNum") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "3"); //设置条件选中，2对应大于小于等于，3对应like或=
            $("#comlon" + temp + "2").val("ddlKeys" + temp + "1"); //设置值选中,就是下面的输入框是显示的那种

            $("#DropDownList" + temp + "2").hide(); //大于类
            $("#DropDownList" + temp + "3").show(); //包含

            $("#ddlKeys" + temp + "1").show();
            $("#TextBox" + temp + "1").hide(); //文本框
            $("#TextBox" + temp + "2").hide(); //日历文本框
        }

        else if (str == "TaskMan") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "3");
            $("#comlon" + temp + "2").val("TextBox" + temp + "1");

            $("#DropDownList" + temp + "2").hide();
            $("#DropDownList" + temp + "3").show();

            $("#ddlKeys" + temp + "1").hide();
            $("#TextBox" + temp + "1").show();
            $("#TextBox" + temp + "2").hide();
        }
        // add
        else if (str == "TaskTimes") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "3");
            $("#comlon" + temp + "2").val("TextBox" + temp + "1");

            $("#DropDownList" + temp + "2").hide();
            $("#DropDownList" + temp + "3").show();

            $("#ddlKeys" + temp + "1").hide();
            $("#TextBox" + temp + "1").show();
            $("#TextBox" + temp + "2").hide();
        }
        else if (str == "TaskArea") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "3");
            $("#comlon" + temp + "2").val("TextBox" + temp + "1");

            $("#DropDownList" + temp + "2").hide();
            $("#DropDownList" + temp + "3").show();

            $("#ddlKeys" + temp + "1").hide();
            $("#TextBox" + temp + "1").show();
            $("#TextBox" + temp + "2").hide();
        }
        else if (str == "TaskType") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "3");
            $("#comlon" + temp + "2").val("TextBox" + temp + "1");

            $("#DropDownList" + temp + "2").hide();
            $("#DropDownList" + temp + "3").show();

            $("#ddlKeys" + temp + "1").hide();
            $("#TextBox" + temp + "1").show();
            $("#TextBox" + temp + "2").hide();
        }
        else if (str == "TaskResult") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "3");
            $("#comlon" + temp + "2").val("TextBox" + temp + "1");

            $("#DropDownList" + temp + "2").hide();
            $("#DropDownList" + temp + "3").show();

            $("#ddlKeys" + temp + "1").hide();
            $("#TextBox" + temp + "1").show();
            $("#TextBox" + temp + "2").hide();
        }
        else if (str == "FillPerson") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "3");
            $("#comlon" + temp + "2").val("TextBox" + temp + "1");

            $("#DropDownList" + temp + "2").hide();
            $("#DropDownList" + temp + "3").show();

            $("#ddlKeys" + temp + "1").hide();
            $("#TextBox" + temp + "1").show();
            $("#TextBox" + temp + "2").hide();
        }
        else if (str == "FillTime") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "2");
            $("#comlon" + temp + "2").val("TextBox" + temp + "2");

            $("#DropDownList" + temp + "2").show();
            $("#DropDownList" + temp + "3").hide();

            $("#ddlKeys" + temp + "1").hide();
            $("#TextBox" + temp + "1").hide();
            $("#TextBox" + temp + "2").show();
        }
        else if (str == "CheckUpPerson") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "3");
            $("#comlon" + temp + "2").val("TextBox" + temp + "1");

            $("#DropDownList" + temp + "2").hide();
            $("#DropDownList" + temp + "3").show();

            $("#ddlKeys" + temp + "1").hide();
            $("#TextBox" + temp + "1").show();
            $("#TextBox" + temp + "2").hide();
        }
        else if (str == "CheckTime") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "2");
            $("#comlon" + temp + "2").val("TextBox" + temp + "2");

            $("#DropDownList" + temp + "2").show();
            $("#DropDownList" + temp + "3").hide();

            $("#ddlKeys" + temp + "1").hide();
            $("#TextBox" + temp + "1").hide();
            $("#TextBox" + temp + "2").show();
        }
        /*请选择，清空其他*/
        else if (str == "请选择") {

            $("#comlon" + temp + "1").val("DropDownList" + temp + "3");
            $("#comlon" + temp + "2").val("TextBox" + temp + "1");

            $("#DropDownList" + temp + "2").hide();
            $("#DropDownList" + temp + "3").show();

            $("#ddlKeys" + temp + "1").hide();
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
        var recordID = $("input[.radio][checked]").val();
        if (recordID != undefined && recordID != "") {
            return qBox.iFLoad({ title: '任务观察总结报告详细信息', src: 'observeReportDetail.aspx?recordID=' + recordID + '&rdom=' + Math.random(), w: 664, h: 295 });
        }
        else {
            alert("请选择您要查看的记录！");
            return false;
        }
    });

    /*添加层的显示*/
    $("#popAdd").click(function () {
        return qBox.iFLoad({ title: '添加任务观察总结报告信息', src: 'observeReportAdd.aspx?rdom=' + Math.random(), w: 664, h: 295 });
    });

    /*修改层的显示*/
    $("#popEdit").click(function () {
        var recordID = $("input[.radio][checked]").val();
        if (recordID != undefined && recordID != "") {
            return qBox.iFLoad({ title: '修改任务观察总结报告信息', src: 'observeReportEdit.aspx?recordID=' + recordID + '&rdom=' + Math.random(), w: 664, h: 295 });
        }
        else {
            alert("请选择您要修改的记录！");
            return false;
        }
    });

    /*删除事件*/
    $('#delete').click(function () {
        var recordID = $("input[.radio][checked]").val();
        if (recordID != undefined && recordID != "") {
            if (confirm("您确定要删除吗？")) {
                $.post("dataProcess.ashx", { op: "observeReportDel", recordID: recordID, rdom: Math.random() }, function (data) {
                    if (data == "") {
                        $("#tr_" + recordID).remove();
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
        $('#txt_institution').val('');
        $('#txt_TaskTimes').attr("value", "");
        $('#txt_TaskMan').attr("value", "");
        $('#txt_TaskArea').attr("value", "");
        $('#txt_TaskType').attr("value", "");
        $('#txt_ProcessContent').attr("value", "");
        $('#txt_TaskResult').attr("value", "");
        $('#txt_fillPer').attr("value", "");
        $('#txt_fillTime').attr("value", "");
        $('#txt_checkPer').attr("value", "");
        $('#txt_checkTime').attr("value", "");
    });

})