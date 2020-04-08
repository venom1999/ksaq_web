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
            $("#Label" + m).val("block");
        }
    })

    $(".select_category").change(function () {
        var ids = $(this).attr("id");
        var str = $(this).val();
        var temp = ids.substring(13, 12);
        show_div(str, temp);
    })
    function show_div(str, temp) {
        if (str == "EquipName") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "3"); //设置条件选中
            $("#comlon" + temp + "2").val("TextBox" + temp + "1"); //设置值选中

            $("#DropDownList" + temp + "2").hide(); //大于类
            $("#DropDownList" + temp + "3").show(); //包含

            $("#ddlKeys" + temp + "1").hide(); //下拉框
            $("#TextBox" + temp + "1").show(); //文本框
            $("#TextBox" + temp + "2").hide(); //日历文本框
        }
        else if (str == "EquipModel") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "3");
            $("#comlon" + temp + "2").val("TextBox" + temp + "1");

            $("#DropDownList" + temp + "2").hide();
            $("#DropDownList" + temp + "3").show();

            $("#ddlKeys" + temp + "1").hide();
            $("#TextBox" + temp + "1").show();
            $("#TextBox" + temp + "2").hide(); //日历文本框
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
        else if (str == "PeopleInCharge") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "3");
            $("#comlon" + temp + "2").val("TextBox" + temp + "1");

            $("#DropDownList" + temp + "2").hide();
            $("#DropDownList" + temp + "3").show();

            $("#ddlKeys" + temp + "1").hide();
            $("#TextBox" + temp + "1").show();
            $("#TextBox" + temp + "2").hide();

        }
        else if (str == "EquipNumber") {

            $("#comlon" + temp + "1").val("DropDownList" + temp + "2");
            $("#comlon" + temp + "2").val("TextBox" + temp + "1");

            $("#DropDownList" + temp + "2").show();
            $("#DropDownList" + temp + "3").hide();

            $("#ddlKeys" + temp + "1").hide();
            $("#TextBox" + temp + "2").hide();
            $("#TextBox" + temp + "1").show();
        }
        else if (str == "EquipUseYears") {

            $("#comlon" + temp + "1").val("DropDownList" + temp + "2");
            $("#comlon" + temp + "2").val("TextBox" + temp + "1");

            $("#DropDownList" + temp + "2").show();
            $("#DropDownList" + temp + "3").hide();

            $("#ddlKeys" + temp + "1").hide();
            $("#TextBox" + temp + "2").hide();
            $("#TextBox" + temp + "1").show();
        }
        else if (str == "EquipReplDate") {

            $("#comlon" + temp + "1").val("DropDownList" + temp + "2");
            $("#comlon" + temp + "2").val("TextBox" + temp + "2");

            $("#DropDownList" + temp + "2").show();
            $("#DropDownList" + temp + "3").hide();

            $("#ddlKeys" + temp + "1").hide();
            $("#TextBox" + temp + "1").hide();
            $("#TextBox" + temp + "2").show();
        }
        else if (str == "InstSite") {

            $("#comlon" + temp + "1").val("DropDownList" + temp + "3");
            $("#comlon" + temp + "2").val("TextBox" + temp + "1");

            $("#DropDownList" + temp + "3").show();
            $("#DropDownList" + temp + "2").hide();

            $("#ddlKeys" + temp + "1").hide();
            $("#TextBox" + temp + "2").hide();
            $("#TextBox" + temp + "1").show();
        }
        else if (str == "请选择") {

            $("#comlon" + temp + "1").val("DropDownList" + temp + "3");
            $("#comlon" + temp + "2").val("TextBox" + temp + "1");

            $("#DropDownList" + temp + "3").show();
            $("#DropDownList" + temp + "2").hide();

            $("#ddlKeys" + temp + "1").hide();
            $("#TextBox" + temp + "2").hide();
            $("#TextBox" + temp + "1").show();
            $("#TextBox" + temp + "1").val('');
            $("#TextBox" + temp + "2").val('');
            $("#DropDownList" + temp + "3").val('包含');
            $("#DropDownList" + temp + "2").val('大于');
            $("id^='ddlKeys'").val('请选择');
        }
    }

    //为选中行添加高亮
    $('.radio').click(function () {
        $(this).parent().parent().addClass('selected');
        $(this).parent().parent().siblings().removeClass('selected');
    });

    /*添加事件*/
    $("#addBtn").click(function () {
        return qBox.iFLoad({ title: '添加消防设备信息', src: 'FireEquipmentAdd.aspx', w: 720, h: 260});

    });

    /*查看详细信息事件*/
    $("#searchDetail").click(function () {

        var RecordID = $("input[.radio][checked]").val(); //获取单选按钮

        if (RecordID != undefined) {
            return qBox.iFLoad({ title: '消防设备详细信息', src: 'FireEquipmentDetail.aspx?RecordID=' + RecordID + '&rdom=' + Math.random() + '&fatherCookie=' + getHtmlDocName(), w: 720, h: 260 });
        }
        else {
            alert("请选择您要查看的记录，点击单选按钮选中！");
            return false;
        }
    });

    /*修改事件*/
    $("#update").click(function () {
        var result = false;
        var RecordID = $("input[.radio][checked]").val(); //获取单选按钮

        if (RecordID != undefined) {
            return qBox.iFLoad({ title: '修改消防设备信息', src: 'FireEquipmentEdit.aspx?RecordID=' + RecordID + '&rdom=' + Math.random(), w: 720, h: 260 });
        }
        else {
            alert("请选择您要查看的记录，点击单选按钮选中！");
            return false;
        }

    });


    /*删除点击提交的事件*/
    $("#delete").click(function () {
        var RecordID = $("input[.radio][checked]").val(); //获取单选按钮

        //执行删除操作
        if (RecordID != undefined) {
            if (confirm("您确定要删除吗?")) {


                $.post("dataProcess.ashx", { op: "DelFireEquipment", RecordID: RecordID, rdom: Math.random() }, function (data) {
                    if (data == "") {
                        $("#tr_" + RecordID).remove();
                    }

                });
            }
        }
        else {
            alert("请选择您要查看的记录，点击单选按钮选中！");
            return false;
        }
    });
})