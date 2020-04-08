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
        if (str == "EmployeeNum") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "3"); //设置条件选中，2对应大于小于等于，3对应like或=
            $("#comlon" + temp + "2").val("TextBox" + temp + "1"); //设置值选中,就是下面的输入框是显示的那种

            $("#DropDownList" + temp + "2").hide(); //大于类
            $("#DropDownList" + temp + "3").show(); //包含

            $("#ddlKeys" + temp + "1").hide();
            $("#TextBox" + temp + "1").show(); //文本框
            $("#TextBox" + temp + "2").hide(); //日历文本框
        }

        else if (str == "EmployeeName") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "3");
            $("#comlon" + temp + "2").val("TextBox" + temp + "1");

            $("#DropDownList" + temp + "2").hide();
            $("#DropDownList" + temp + "3").show();

            $("#ddlKeys" + temp + "1").hide();
            $("#TextBox" + temp + "1").show();
            $("#TextBox" + temp + "2").hide();
        }
        else if (str == "Payments") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "2");
            $("#comlon" + temp + "2").val("TextBox" + temp + "1");

            $("#DropDownList" + temp + "2").show();
            $("#DropDownList" + temp + "3").hide();

            $("#ddlKeys" + temp + "1").hide();
            $("#TextBox" + temp + "1").show();
            $("#TextBox" + temp + "2").hide();
        }
        else if (str == "Ratio") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "2");
            $("#comlon" + temp + "2").val("TextBox" + temp + "1");

            $("#DropDownList" + temp + "2").show();
            $("#DropDownList" + temp + "3").hide();

            $("#ddlKeys" + temp + "1").hide();
            $("#TextBox" + temp + "1").show();
            $("#TextBox" + temp + "2").hide();
        }

        else if (str == "InstitutionNum") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "3");
            $("#comlon" + temp + "2").val("ddlKeys" + temp + "1");

            $("#DropDownList" + temp + "2").hide();
            $("#DropDownList" + temp + "3").show();

            $("#ddlKeys" + temp + "1").show();
            $("#TextBox" + temp + "1").hide();
            $("#TextBox" + temp + "2").hide();
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

    /*添加层的显示*/
    $("#popAdd").click(function () {
        return qBox.iFLoad({ title: '添加参与人员信息', src: 'RPEmployeeAdd.aspx?rdom=' + Math.random(), w: 380, h: 220 });
    });

    /*修改层的显示*/
    $("#popEdit").click(function () { //state 为 1 表示审查开始之前，为2表示审查结束，为3表示在审查之中
        var empNum = $("input[.radio][checked]").val();
        if (empNum != undefined && empNum != "") {
            return qBox.iFLoad({ title: '修改参与人员信息', src: 'RPEmployeeEdit.aspx?empNum=' + empNum + '&rdom=' + Math.random(), w: 370, h: 300 });
        }
        else {
            alert("请选择您要修改的记录！");
            return false;
        }
    });

    /*删除事件*/
    $('#delete').click(function () {
        var empNum = $("input[.radio][checked]").val();
        if (empNum != undefined && empNum != "") {

            if (confirm("您确定要删除吗？")) {
                $.post("dataProcess.ashx", { op: "rpEmpDel", empNum: empNum, rdom: Math.random() }, function (data) {
                    if (data == "") {
                        $("#tr_" + empNum).remove();
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
        $('#txt_Payments').attr("value", "");
        $('#txt_Ratio').attr("value", "");
        $('#txt_Remark').attr("value", "");
    });

    //批量修改的事件
    $('#batchEdit').click(function () {
        //alert("batch");
        return qBox.iFLoad({ title: '批量修改风险抵押金人员信息', src: 'RPEmployeeBatchEdit.aspx?rdom=' + Math.random(), w: 350, h: 174 });
    });

})