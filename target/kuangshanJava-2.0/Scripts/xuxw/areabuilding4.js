$(function () {
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
            console.log(m);
            t = "div" + m;
            $("#" + t).hide();
            $("#Label" + m).val("");
            m--;
        }
        else {
            return null;
        }
    })
    /*详细查看事件*/
    $("#searchDetail").click(function () {
        var result = false;
        var OccupationHazardID = $("input[.radio][checked]").val(); //获取单选按钮 //获取隐藏的法律法规编号的值
        //alert(LawAndRuleID)
        if (OccupationHazardID != undefined) {

            return qBox.iFLoad({ title: '职业危害信息清单详细信息', src: 'areabuilding4Detail.aspx?OccupationHazardID=' + OccupationHazardID + '&rdom=' + Math.random() + '&fatherCookie=' + getHtmlDocName(), w: 435, h: 565 });
        }
        else {
            alert("请选择您要查看的记录，点击单选按钮选中！");
            return false;
        }

    });
    /*修改事件*/
    $("#update").click(function () {
        var result = false;
        var OccupationHazardID = $("input[.radio][checked]").val(); //获取单选按钮 //获取隐藏的法律法规编号的值
        if (OccupationHazardID != undefined) {

            return qBox.iFLoad({ title: '修改职业危害信息清单信息', src: 'areabuilding4Edit.aspx?OccupationHazardID=' + OccupationHazardID + '&rdom=' + Math.random(), w: 445, h: 565 });
        }
        else {
            alert("请选择您要修改的记录，点击单选按钮选中！");
            return false;
        }
    });
    $("#addRows").click(function () {
        if (m < 6) {
            m++;
            if (m == 5)
                m--
            t = "div" + m;
            $("#" + t).show()
            $("#Label" + m).val("block");
        }
    })
    $(".select_category").change(function () {
        var ids = $(this).attr("id");
        var str = $(this).val();
        var temp = ids.substring(13, 12);
        show_div(str, temp);
    });
    function show_div(str, temp) {
        if (str == "请选择") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "2"); //设置条件选中
            $("#comlon" + temp + "2").val("TextBox" + temp + "1"); //设置值选中
            
            $("#DropDownList" + temp + "2").show(); //包含

            $("#ddlKeys" + temp + "1").hide(); //下拉框

            $("#TextBox" + temp + "1").show(); //文本框
        }
        else if (str == "CurrentWorkNum") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "2"); //设置条件选中
            $("#comlon" + temp + "2").val("ddlKeys" + temp + "1"); //设置值选中

            $("#DropDownList" + temp + "2").show(); //包含

            $("#ddlKeys" + temp + "1").show(); //下拉框

            $("#TextBox" + temp + "1").hide(); //文本框
        }
        else if (str == "OccupationHazardFactor") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "2"); //设置条件选中
            $("#comlon" + temp + "2").val("TextBox" + temp + "1"); //设置值选中

            $("#DropDownList" + temp + "2").show(); //包含

            $("#ddlKeys" + temp + "1").hide(); //下拉框

            $("#TextBox" + temp + "1").show(); //文本框
        }
        else if (str == "OccupationContraindication") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "2"); //设置条件选中
            $("#comlon" + temp + "2").val("TextBox" + temp + "1"); //设置值选中

            $("#DropDownList" + temp + "2").show(); //包含

            $("#ddlKeys" + temp + "1").hide(); //下拉框

            $("#TextBox" + temp + "1").show(); //文本框
        }
        else if (str == "OccupationDiease") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "2"); //设置条件选中
            $("#comlon" + temp + "2").val("TextBox" + temp + "1"); //设置值选中

            $("#DropDownList" + temp + "2").show(); //包含

            $("#ddlKeys" + temp + "1").hide(); //下拉框

            $("#TextBox" + temp + "1").show(); //文本框
        }
    }
    //为选中行添加高亮
    $('.radio').click(function () {
        $(this).parent().parent().addClass('selected');
        $(this).parent().parent().siblings().removeClass('selected');
    });
    $("#addBtn").click(function () {
        var result = false;
        return qBox.iFLoad({ title: '添加职业危害信息清单信息', src: 'areabuilding4Add.aspx', w: 465, h: 565 });
    });

    /*删除点击提交的事件*/
    $("#delete").click(function () {
        var OccupationHazardID = $("input[.radio][checked]").val(); //获取单选按钮
        if (OccupationHazardID >= 0) {
            //执行删除操作
            if (confirm("您确定要删除吗?")) {
                $.post("dataProcess.ashx", { op: "OccupationHazardList_T", OccupationHazardID: OccupationHazardID, rdom: Math.random() }, function (data) {
                    if (data == "") {
                        $("#tr_" + OccupationHazardID).remove();
                    }

                });
            }
        }
        else {
            alert("请选择您要删除的记录，点击单选按钮选中！");
            return false;
        }
        location.reload();
    })

    /*重置按钮*/
    $('#btnReset').click(function () {

        $('#txt_CurrentWorkNum').attr("value", "");
        $('#txt_OccupationHazardFactor').attr("value", "");
        $('#txt_OccupationContraindication').attr("value", "");
        $('#txt_OccupationDiease').attr("value", "");
        $('#txt_PreventionMeasuresme').attr("value", "");

    });
})