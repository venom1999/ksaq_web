$(function () {

    /*查询开始*/
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

        if (str == "BuildingName") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "3");
            $("#comlon" + temp + "2").val("TextBox" + temp + "1"); //设置值选中

            $("#DropDownList" + temp + "2").hide();
            $("#DropDownList" + temp + "3").show();

            $("#ddlKeys" + temp + "1").hide();

            $("#TextBox" + temp + "1").show();
            $("#TextBox" + temp + "2").hide(); //日历文本框
        }
        else if (str == "BuildingAddress") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "3");
            $("#comlon" + temp + "2").val("TextBox" + temp + "1"); //设置值选中

            $("#DropDownList" + temp + "2").hide();
            $("#DropDownList" + temp + "3").show();

            $("#ddlKeys" + temp + "1").hide();

            $("#TextBox" + temp + "1").show();
            $("#TextBox" + temp + "2").hide(); //日历文本框
        }
        else if (str == "employeeName") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "3");
            $("#comlon" + temp + "2").val("TextBox" + temp + "1");

            $("#DropDownList" + temp + "2").hide();
            $("#DropDownList" + temp + "3").show();

            $("#ddlKeys" + temp + "1").hide();

            $("#TextBox" + temp + "1").show();
            $("#TextBox" + temp + "2").hide();
        }
        else if (str == "Status") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "3");
            $("#comlon" + temp + "2").val("TextBox" + temp + "1");

            $("#DropDownList" + temp + "2").hide();
            $("#DropDownList" + temp + "3").show();

            $("#ddlKeys" + temp + "1").hide();

            $("#TextBox" + temp + "1").show();
            $("#TextBox" + temp + "2").hide();
        }
        else if (str == "AjustMeasures") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "3");
            $("#comlon" + temp + "2").val("TextBox" + temp + "1");

            $("#DropDownList" + temp + "2").hide();
            $("#DropDownList" + temp + "3").show();

            $("#ddlKeys" + temp + "1").hide();

            $("#TextBox" + temp + "1").show();
            $("#TextBox" + temp + "2").hide();

        }
        else if (str == "ImplementEffect") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "3");
            $("#comlon" + temp + "2").val("TextBox" + temp + "1");

            $("#DropDownList" + temp + "2").hide();
            $("#DropDownList" + temp + "3").show();

            $("#ddlKeys" + temp + "1").hide();
            $("#TextBox" + temp + "1").show();
            $("#TextBox" + temp + "2").hide();

        }
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

    /*查询结束*/

    //为选中行添加高亮
    $('.radio').click(function () {
        $(this).parent().parent().addClass('selected');
        $(this).parent().parent().siblings().removeClass('selected');
    });

    /*添加事件*/
    $("#addBtn").click(function () {
        return qBox.iFLoad({ title: '添加通风构筑物信息', src: 'areabuildingAdd.aspx?rdom=' + Math.random(), w: 410, h: 355 });
    });

    /*详细查看事件*/
    $("#searchDetail").click(function () {
        var BuildingID = $("input[.radio][checked]").val(); //获取单选按钮 //获取隐藏的法律法规编号的值
        //alert(BuildingID);
        if (BuildingID != undefined) {

            return qBox.iFLoad({ title: '通风构筑物详细信息', src: 'buildingDetail.aspx?BuildingID=' + BuildingID + '&rdom=' + Math.random() + '&fatherCookie=' + getHtmlDocName(), w: 340, h: 340 });
        }
        else {
            alert("请选择您要查看的记录，点击单选按钮选中！");
            return false;
        }

    });
    /*修改事件*/
    $("#update").click(function () {
        var BuildingID = $("input[.radio][checked]").val(); //获取单选按钮 //获取隐藏的法律法规编号的值
        if (BuildingID != undefined) {

            return qBox.iFLoad({ title: '修改通风构筑物信息', src: 'aerabuildingEdit.aspx?BuildingID=' + BuildingID + '&rdom=' + Math.random(), w: 375, h: 355 });
        }
        else {
            alert("请选择您要修改的记录，点击单选按钮选中！");
            return false;
        }

    });


    /*删除点击提交的事件*/
    $("#delete").click(function () {
        var BuildingID = $("input[.radio][checked]").val(); //获取单选按钮
        //        alert(LawAndRuleID);
        if (BuildingID >= 0) {
            //执行删除操作
            if (confirm("您确定要删除吗?")) {
                $.post("dataProcess.ashx", { op: "aerationbuilding_t", BuildingID: BuildingID, rdom: Math.random() }, function (data) {
                    if (data == "") {
                        $("#tr_" + BuildingID).remove();
                    }

                });
            }
        }
        else {
            alert("请选择您要删除的记录，点击单选按钮选中！");
            return false;
        }
    });


    /*重置按钮*/
    $('#btnReset').click(function () {
 
        $('#txt_BuildingName').attr("value", "");
        $('#txt_BuildingAddress').attr("value", "");
        $('#txt_Status').attr("value", "");
        $('#txt_ImplementEffect').attr("value", "");
        $('#txt_AjustMeasures').attr("value", "");
    });
})