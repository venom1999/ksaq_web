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
        if (str == "Suggesstion") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "3"); //设置条件选中，2对应大于小于等于，3对应like或=
            $("#comlon" + temp + "2").val("TextBox" + temp + "1"); //设置值选中,就是下面的输入框是显示的那种

            $("#DropDownList" + temp + "2").hide(); //大于类
            $("#DropDownList" + temp + "3").show(); //包含

            $("#TextBox" + temp + "1").show(); //文本框
            $("#TextBox" + temp + "2").hide(); //日历文本框
        }

        else if (str == "EducationName") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "3");
            $("#comlon" + temp + "2").val("TextBox" + temp + "1");

            $("#DropDownList" + temp + "2").hide();
            $("#DropDownList" + temp + "3").show();

            $("#ddlKeys" + temp + "1").hide();
            $("#ddlKeys" + temp + "2").hide();
            $("#ddlKeys" + temp + "3").hide();
            $("#ddlKeys" + temp + "4").hide();
            $("#TextBox" + temp + "1").show();
            $("#TextBox" + temp + "2").hide();
        }
        else if (str == "EducationTutor") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "3");
            $("#comlon" + temp + "2").val("TextBox" + temp + "1");

            $("#DropDownList" + temp + "2").hide();
            $("#DropDownList" + temp + "3").show();

            $("#TextBox" + temp + "1").show();
            $("#TextBox" + temp + "2").hide();
        }

        else if (str == "EvaluateTime") {

            $("#comlon" + temp + "1").val("DropDownList" + temp + "2");
            $("#comlon" + temp + "2").val("TextBox" + temp + "2");

            $("#DropDownList" + temp + "2").show();
            $("#DropDownList" + temp + "3").hide();

            $("#TextBox" + temp + "1").hide();
            $("#TextBox" + temp + "2").show();
        }

        else if (str == "EducationContent") {

            $("#comlon" + temp + "1").val("DropDownList" + temp + "3");
            $("#comlon" + temp + "2").val("TextBox" + temp + "1");

            $("#DropDownList" + temp + "2").hide();
            $("#DropDownList" + temp + "3").show();

            
            $("#TextBox" + temp + "1").show();
            $("#TextBox" + temp + "2").hide();
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

    /*添加事件*/
    $('#popAdd').click(function () {
        return qBox.iFLoad({ title: '添加安全教育培训评估信息', src: 'educationEvaluateAdd.aspx?rdom=' + Math.random(), w: 750, h: 588 });

    });


    /*查看详细信息事件*/
    $('#detail').click(function () {
        var educationNum = $("input[.radio][checked]").val(); //获取单选按钮
        var institution = $("input[.radio][checked]").siblings('.institution').val();
        //alert(employeeNum);
        if (educationNum != undefined) {
            return qBox.iFLoad({ title: '安全教育培训评估详细信息', src: 'educationEvaluateDetail.aspx?educationNum=' + educationNum + '&institution=' + institution + '&rdom=' + Math.random() + '&fatherCookie=' + getHtmlDocName(), w: 700, h: 675 });
        }
        else {
            alert("请选择您要查看的记录，点击单选按钮选中！");
            return false;
        }
    });

    /*删除培训信息提交的事件*/
    $('#delete').click(function () {
        //alert("delete");
        var educationNum = $("input[.radio][checked]").val();
        var institution = $("input[.radio][checked]").siblings('.institution').val();
        if (educationNum != undefined && educationNum != "") {
            if (confirm("您确定要删除该信息吗？")) {
                $.post("dataProcess.ashx", { op: "EducationEvaluate_T", eduNum: educationNum, institution: institution, rdom: Math.random() }, function (data) {
                    if (data == "") {
                        $("#tr_" + educationNum + institution).remove();
                    }
                    else {//存在考试信息，或者班组级，车间级成绩还没有提交
                        alert("删除失败！");
                        return false;
                    }
                });
            }
            else {

            }
        }
        else {
            alert("请选择您要删除的记录，点击单选按钮选中！！");
            return false;
        }
    });

    //单选按钮的点击事件  445
    $('input[class^=radioSe]').click(function () {
        var temp = $(this).val();
        var itemID = $(this).parent().parent().find('.itemID').val();
        var i = parseInt(itemID) - 445;
        //alert(i);
        if (temp == "1") {  //点击是
            $('#radioValue' + i).val('1');
        }
        else {  //点击否
            $('#radioValue' + i).val('0');
        }
    });


    //重置按钮事件
    $('#btnReset').click(function () {
        $('input[class^=radioSel]').each(function () {
            $(this).attr("checked", false);
        });
        $('#txt_evaluateTime').attr("value", "");
        $('#txt_educationNumber').attr("value", "");
        $('#txt_teacher').attr("value", "");
        $('#txt_reallyNumber').attr("value", "");
        $('#txt_startTime').attr("value", "");
        $('#txt_endTime').attr("value", "");
        $('#txt_educationContent').attr("value", "");
        $('#txt_NotReachedCause').attr("value", "");
        $('#txt_suggesstion').attr("value", "");
        $('#txt_MainDeptEvaluate').attr("value", "");
        $('#txt_checkPer').attr("value", "");
        $('#txt_checkTime').attr("value", "");
        $('#txt_educationNum').val("");
        $('#txt_educationName').attr("value", "");
        $('#radioValue1').attr("value", "");
        $('#radioValue2').attr("value", "");
        $('#radioValue3').attr("value", "");
        $('#radioValue4').attr("value", "");
        $('#radioValue5').attr("value", "");
        $('#radioValue6').attr("value", "");
        $('#radioValue7').attr("value", "");
        $('#radioValue8').attr("value", "");
        $('#radioValue9').attr("value", "");
        $('#radioValue10').attr("value", "");
    });
})
