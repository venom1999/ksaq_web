$(function () {
    $('.radio').click(function () {
        $(this).parent().parent().addClass('selected');
        $(this).parent().parent().siblings().removeClass('selected');
    });

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
        if (str == "ExamineID") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "3"); //设置条件选中，2对应大于小于等于，3对应like或=
            $("#comlon" + temp + "2").val("TextBox" + temp + "1"); //设置值选中,就是下面的输入框是显示的那种

            $("#DropDownList" + temp + "2").hide(); //大于类
            $("#DropDownList" + temp + "3").show(); //包含

            $("#ddlKeys" + temp + "1").hide(); //下拉框
            $("#ddlKeys" + temp + "2").hide();
            $("#ddlKeys" + temp + "3").hide();
            $("#ddlKeys" + temp + "4").hide();
            $("#ddlKeys" + temp + "5").hide();

            $("#TextBox" + temp + "1").show(); //文本框
            $("#TextBox" + temp + "2").hide(); //日历文本框
        }
        else if (str == "specialexamination_t.EmployeeNum") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "3");
            $("#comlon" + temp + "2").val("TextBox" + temp + "1");

            $("#DropDownList" + temp + "2").hide();
            $("#DropDownList" + temp + "3").show();

            $("#ddlKeys" + temp + "1").hide(); //下拉框
            $("#ddlKeys" + temp + "2").hide();
            $("#ddlKeys" + temp + "3").hide();
            $("#ddlKeys" + temp + "4").hide();
            $("#ddlKeys" + temp + "5").hide();

            $("#TextBox" + temp + "1").show();
            $("#TextBox" + temp + "2").hide();
        }
        else if (str == "EmployeeName") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "3");
            $("#comlon" + temp + "2").val("TextBox" + temp + "1");

            $("#DropDownList" + temp + "2").hide();
            $("#DropDownList" + temp + "3").show();

            $("#ddlKeys" + temp + "1").hide(); //下拉框
            $("#ddlKeys" + temp + "2").hide();
            $("#ddlKeys" + temp + "3").hide();
            $("#ddlKeys" + temp + "4").hide();
            $("#ddlKeys" + temp + "5").hide();

            $("#TextBox" + temp + "1").show();
            $("#TextBox" + temp + "2").hide();
        }
        else if (str == "[Time]") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "2");
            $("#comlon" + temp + "2").val("TextBox" + temp + "2");

            $("#DropDownList" + temp + "2").show();
            $("#DropDownList" + temp + "3").hide();

            $("#ddlKeys" + temp + "1").hide(); //下拉框
            $("#ddlKeys" + temp + "2").hide();
            $("#ddlKeys" + temp + "3").hide();
            $("#ddlKeys" + temp + "4").hide();
            $("#ddlKeys" + temp + "5").hide();

            $("#TextBox" + temp + "1").hide();
            $("#TextBox" + temp + "2").show();
        }
        else if (str == "HospitalName") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "3");
            $("#comlon" + temp + "2").val("TextBox" + temp + "1");

            $("#DropDownList" + temp + "2").hide();
            $("#DropDownList" + temp + "3").show();
            $("#ddlKeys" + temp + "1").hide(); //下拉框
            $("#ddlKeys" + temp + "2").hide();
            $("#ddlKeys" + temp + "3").hide();
            $("#ddlKeys" + temp + "4").hide();
            $("#ddlKeys" + temp + "5").hide();

            $("#TextBox" + temp + "1").show();
            $("#TextBox" + temp + "2").hide();
        }

        /*请选择，清空其他*/
        else if (str == "请选择") {

            $("#comlon" + temp + "1").val("DropDownList" + temp + "3");
            $("#comlon" + temp + "2").val("TextBox" + temp + "1");

            $("#DropDownList" + temp + "2").hide();
            $("#DropDownList" + temp + "3").show();

            $("#ddlKeys" + temp + "1").hide(); //下拉框
            $("#ddlKeys" + temp + "2").hide();
            $("#ddlKeys" + temp + "3").hide();
            $("#ddlKeys" + temp + "4").hide();
            $("#ddlKeys" + temp + "5").hide();

            $("#TextBox" + temp + "1").show();
            $("#TextBox" + temp + "2").hide();
            $("#TextBox" + temp + "1").attr("value", "");
        }
    }


    /*查询的Js结束*/

    /*详细的显示*/
    $("#iframePopDetail").click(function () {
        //        alert(1);
        var examineID = $("input[.radio][checked]").val(); //获取单选按钮
        var timeID = $("input[.radio][checked]").siblings().val();
        //        alert(timeID);
        if (examineID > 0) {
            return qBox.iFLoad({ title: '查看员工特检详细信息', src: 'DetailSpecialHealth.aspx?examineID=' + examineID + '&time=' + timeID, w: 630, h: 320 });
        }
        else {
            alert("请选择您要查看的记录，点击单选按钮选中！");
            return false;
        }
    });
    /*添加层的显示*/
    $("#iframePopAdd").click(function () {
        return qBox.iFLoad({ title: '添加员工特检信息', src: 'AddSpecialCheck.aspx', w: 630, h: 320 });
    });
    /*修改层的显示*/
    $("#iframePopEdit").click(function () {

        var examineID = $("input[.radio][checked]").val(); //获取单选按钮
        var timeID = $("input[.radio][checked]").siblings().val();
//        alert(timeID);
        if (examineID > 0) {
            return qBox.iFLoad({ title: '修改员工特检信息', src: 'EditSpecialHealth.aspx?examineID=' + examineID + '&time=' + timeID, w: 630, h: 320 });
            //            self.location = 'EditNormalHealth.aspx?examineID=' + examineID;
        }
        else {
            alert("请选择您要查看的记录，点击单选按钮选中！");
            return false;
        }
    });
    /*删除培训信息提交的事件*/
    $('#delete').click(function () {
        //        alert("delete");

        var examineID = $("input[.radio][checked]").val(); //获取单选按钮
        var timeID = $("input[.radio][checked]").siblings().val();
        //        alert(dangerId);
        if (examineID > 0) {
            //执行删除操作
            if (confirm("您确定要删除吗?")) {
                $.post("DeleteSpecialHealthInfo.ashx", { op: "specialexamination_t", examineID: examineID, timeID: timeID, rdom: Math.random() }, function (data) {
                    if (data == "") {
                        alert("#tr_" + examineID + timeID);
                        $("#tr_" + examineID + timeID).remove();
                    }

                });
            }
        }
        else {
            alert("请选择您要修改的记录，点击单选按钮选中！");
            return false;
        }
    });
    $('#btnreset').click(function () {
        $('#ExamineID').attr("value", "");
        $('#txt_EmployeeNum').attr("value", "");
        $('#txt_Time').attr("value", "");
        $('#txt_HospitalName').attr("value", "");

        //        $('#txt_HealthLevel').attr("value", "");
        //        alert($('#txt_countItemId').val());
        var count = $('#txt_countItemId').val();
        //        alert(count);
        for (var i = 0; i < count; i++) {
            var resultstr = "specialHealthRepeater_txt_Result_" + i;
            //            alert(resultstr);
            $('#' + resultstr).attr("value", "");
        }
        $('#txt_Conclusion').attr("value", "");
    });
})