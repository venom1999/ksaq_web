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
        if (str == "ItemName") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "3"); //设置条件选中，2对应大于小于等于，3对应like或=
            $("#comlon" + temp + "2").val("TextBox" + temp + "1"); //设置值选中,就是下面的输入框是显示的那种

            $("#DropDownList" + temp + "2").hide(); //大于类
            $("#DropDownList" + temp + "3").show(); //包含

            $("#ddlKeys" + temp + "1").hide();
            $("#TextBox" + temp + "1").show(); //文本框
            $("#TextBox" + temp + "2").hide(); //日历文本框
        }

        else if (str == "ItemMeasure") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "3");
            $("#comlon" + temp + "2").val("TextBox" + temp + "1");

            $("#DropDownList" + temp + "2").hide();
            $("#DropDownList" + temp + "3").show();

            $("#ddlKeys" + temp + "1").hide();
            $("#TextBox" + temp + "1").show();
            $("#TextBox" + temp + "2").hide();
        }

        else if (str == "YearNum") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "2");
            $("#comlon" + temp + "2").val("ddlKeys" + temp + "1");

            $("#DropDownList" + temp + "2").show();
            $("#DropDownList" + temp + "3").hide();

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
        return qBox.iFLoad({ title: '添加安全目标指标信息', src: 'safetyPlanAdd.aspx?rdom=' + Math.random(), w: 450, h: 540 });
    });

    /*修改层的显示*/
    $("#popEdit").click(function () { //state 为 1 表示审查开始之前，为2表示审查结束，为3表示在审查之中
        var itemID = $("input[.radio][checked]").val();
        var yearNum = $("input[.radio][checked]").siblings('.yearNum').val();
        if (itemID != undefined && itemID != "") {
            return qBox.iFLoad({ title: '修改安全目标指标信息', src: 'safetyPlanEdit.aspx?yearNum=' + yearNum + '&itemID=' + itemID + '&rdom=' + Math.random(), w: 350, h: 170 });
        }
        else {
            alert("请选择您要修改的记录！");
            return false;
        }
    });

    /*删除事件*/
    $('#delete').click(function () {
        var itemID = $("input[.radio][checked]").val();
        var yearNum = $("input[.radio][checked]").siblings('.yearNum').val();
        if (itemID != undefined && itemID != "") {
            if (confirm("您确定要删除吗？")) {
                $.post("dataProcess.ashx", { op: "safetyPlanDel", itemID: itemID, yearNum: yearNum, rdom: Math.random() }, function (data) {
                    if (data == "") {
                        $("#tr_" + yearNum + itemID).remove();
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
        $('#txt_year').attr("value", "");
        $('input[class^=_txtValue]').each(function () {
            $(this).attr("value", "");
        });

    });
    //验证输入框输入字符的长度
    $('input[class^=_txtValue]').blur(function () {
        var temp = $(this).val();
        if (temp.length > 9) {
            alert("输入数据长度大于0小于10！");
            $(this).focus();
        }
    });

    //添加的提交事件
    $('#submitPlan').click(function () {
        var yearNum = $('#txt_year').val();
        var txtValue = "";
        var itemIDStr = "";
        var flag = 0;
        var subFlag = $('#txt_flag').val();
        if (subFlag == "0") {
            $('input[class^=_txtValue]').each(function () {
                if ($(this).val() != "") {
                    flag++;
                }
                txtValue += $(this).val() + ";";
                itemIDStr += $(this).siblings('._itemID').val() + ";";
            });
           //alert(txtValue); alert(itemIDStr);
            if (parseInt(flag) == parseInt($('#txt_count').val()) && yearNum != "") {
                $.post("dataProcess.ashx", { op: "submitPlan", yearNum: yearNum, txtValue: txtValue, itemIDStr: itemIDStr, rdom: Math.random() }, function (data) {
                    if (data == "") {
                        alert("添加成功！");
                        $('#txt_flag').val('1');
                    }
                    else {
                        alert("添加失败！");
                        return false;
                    }
                });
            }
            else {
                alert("请填写完整后再添加！");
                return;
            }
        }
        else {
            alert("已经添加成功，不可以重复添加！");
            return;
        }


    });
})