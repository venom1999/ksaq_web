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
            $("#comlon" + temp + "2").val("ddlKeys" + temp + "1"); //设置值选中,就是下面的输入框是显示的那种

            $("#DropDownList" + temp + "2").hide(); //大于类
            $("#DropDownList" + temp + "3").show(); //包含

            $("#ddlKeys" + temp + "1").show();
            $("#TextBox" + temp + "1").hide(); //文本框
            $("#TextBox" + temp + "2").hide(); //日历文本框
        }

        else if (str == "Observor") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "3");
            $("#comlon" + temp + "2").val("TextBox" + temp + "1");

            $("#DropDownList" + temp + "2").hide();
            $("#DropDownList" + temp + "3").show();

            $("#ddlKeys" + temp + "1").hide();
            $("#TextBox" + temp + "1").show();
            $("#TextBox" + temp + "2").hide();
        }
        // add
        else if (str == "ObserveTime") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "2");
            $("#comlon" + temp + "2").val("TextBox" + temp + "2");

            $("#DropDownList" + temp + "2").show();
            $("#DropDownList" + temp + "3").hide();

            $("#ddlKeys" + temp + "1").hide();
            $("#TextBox" + temp + "1").hide();
            $("#TextBox" + temp + "2").show();
        }
        else if (str == "AreaOrDept") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "3");
            $("#comlon" + temp + "2").val("TextBox" + temp + "1");

            $("#DropDownList" + temp + "2").hide();
            $("#DropDownList" + temp + "3").show();

            $("#ddlKeys" + temp + "1").hide();
            $("#TextBox" + temp + "1").show();
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

    /*详细信息显示*/
    $('#detail').click(function () {
        var ItemsManID = $("input[.radio][checked]").val();
        if (ItemsManID != undefined && ItemsManID != "") {
            return qBox.iFLoad({ title: '任务观察行为干预记录卡详细信息', src: 'observeBehaviorDetail.aspx?ItemsManID=' + ItemsManID + '&rdom=' + Math.random(), w: 350, h: 554 });
        }
        else {
            alert("请选择您要查看的记录！");
            return false;
        }
    });
    /*详细的加载保存数据*/
    var hiddenValue = $('#txt_value').val();
    var count = $('#txt_count').val();
    if (hiddenValue != undefined && hiddenValue != "") {
        var arr = hiddenValue.split('-');
        for (i = 0; i < count; i++) {
            var str = arr[i].split(';');
            $("#first" + str[0]).attr('checked', true);
            $("#second" + str[0]).attr('checked', true);
        }

    }



    /*添加层的显示*/
    $("#popAdd").click(function () {
        return qBox.iFLoad({ title: '添加任务观察行为干预记录卡信息', src: 'observeBehaviorAdd.aspx?rdom=' + Math.random(), w: 350, h: 554 });
    });

    /*删除事件*/
    $('#delete').click(function () {
        var ItemsManID = $("input[.radio][checked]").val();
        if (ItemsManID != undefined && ItemsManID != "") {
            if (confirm("您确定要删除吗？")) {
                $.post("dataProcess.ashx", { op: "observeBahaviorItemsDel", ItemsManID: ItemsManID, rdom: Math.random() }, function (data) {
                    if (data == "") {
                        $("#tr_" + ItemsManID).remove();
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
        $("input[id^=second]").each(function () {
            $(this).attr('checked', false);
        });
        $("input[id^=first]").each(function () {
            $(this).attr('checked', false);
        });
        $('.context').each(function () {
            $(this).val('');
        });
        $('#txt_executor').val('');
        $('#txt_observeTime').val('');
        $('#txt_fillPer').val('');
    });



    ///添加时，以树形结构显示
    $("input[id^=first]").click(function () {
        var num = $(this).attr("id");
        var index = num.substring(num.length - 2, num.length);
        if ($(this).attr('checked') == true) {
            $("[class='second" + index + "']:checkbox").attr('checked', true);
        }
        else {
            $("[class='second" + index + "']:checkbox").attr('checked', false);
        }
    });
    $("input[class^=second]").click(function () {
        var num = $(this).attr("id");
        var index = num.substring(num.length - 4, num.length - 2);
        //alert(index);
        var flag = true;
        $("input[class^='second" + index + "']").each(function () {
            if ($(this).attr('checked') != true) {
                flag = false;
            }
            else {

            }
        });
        if (flag == true) {
            $("#first" + index).attr('checked', true);
        }
        else {
            $("#first" + index).attr('checked', false);
        }

    });

    $('#submitAdd').click(function () {
        var subFlag = $('#submitflag').val();
        var tempTwo = "";
        var tempOne = "";
        $("input[id^=second]").each(function () {
            if ($(this).attr('checked') == true) {
                tempTwo += $(this).val() + ";";
            }
            else {

            }
        });
        $("input[id^=first]").each(function () {
            if ($(this).attr('checked') == true) {
                tempOne += $(this).val() + ";";
            }
            else {

            }
        });
        var tempThree = "";
        $('.context').each(function () {
            tempThree += $(this).val() + ";";
        });
        var tempThreeID = "";
        $('.itemContext').each(function () {
            tempThreeID += $(this).val() + ";";
        });
        var executor = $('#txt_executor').val();
        var observetime = $('#txt_observeTime').val();
        var areaOrDept = $('#txt_fillPer').val();
        var empNum = $('#txt_employeeNum').val();
        if (observetime != "" && executor != "" && areaOrDept != "" && empNum != "") {
            if (subFlag == "0") {
                $.post("dataProcess.ashx", { op: "observeSubScore", itemOne: tempOne, itemTwo: tempTwo, itemThree: tempThree, executor: executor, observetime: observetime, areaOrDept: areaOrDept, empNum: empNum, tempThreeID: tempThreeID, rdom: Math.random() }, function (data) {
                    if (data == "") {
                        alert("提交成功");
                        $('#submitflag').val('1');
                        return;
                    }
                    else {
                        alert("提交失败！");
                        return false;
                    }
                });
            } else {
                alert("您已经提交成功，不可以重复提交！");
                return;
            }
        }
        else {
            alert("请填写完整再添加！");
        }
    });

})