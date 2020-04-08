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

        if (str == "Year") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "2");
            $("#comlon" + temp + "2").val("TextBox" + temp + "2");

            $("#DropDownList" + temp + "2").show();
            $("#DropDownList" + temp + "3").hide();

            $("#ddlKeys" + temp + "1").hide();

            $("#TextBox" + temp + "1").hide();
            $("#TextBox" + temp + "2").hide();
            $("#TextBox" + temp + "3").show();

        }
        else if (str == "InstitutionNum") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "3"); //设置条件选中
            $("#comlon" + temp + "2").val("ddlKeys" + temp + "1"); //设置值选中

            $("#DropDownList" + temp + "2").hide(); //大于类
            $("#DropDownList" + temp + "3").show(); //包含

            $("#ddlKeys" + temp + "1").show(); //下拉框

            $("#TextBox" + temp + "1").hide(); //文本框
            $("#TextBox" + temp + "2").hide(); //日历文本框
            $("#TextBox" + temp + "3").hide();
        }
        else if (str == "ResponsiblePerson") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "3");
            $("#comlon" + temp + "2").val("TextBox" + temp + "1"); //设置值选中

            $("#DropDownList" + temp + "2").hide();
            $("#DropDownList" + temp + "3").show();

            $("#ddlKeys" + temp + "1").hide();

            $("#TextBox" + temp + "1").show();
            $("#TextBox" + temp + "2").hide(); //日历文本框
            $("#TextBox" + temp + "3").hide();
        }
        else if (str == "PersonInCharge") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "3");
            $("#comlon" + temp + "2").val("TextBox" + temp + "1");

            $("#DropDownList" + temp + "2").hide();
            $("#DropDownList" + temp + "3").show();

            $("#ddlKeys" + temp + "1").hide();

            $("#TextBox" + temp + "1").show();
            $("#TextBox" + temp + "2").hide();
            $("#TextBox" + temp + "3").hide();
        }
        else if (str == "UploadPerson") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "3");
            $("#comlon" + temp + "2").val("TextBox" + temp + "1");

            $("#DropDownList" + temp + "2").hide();     //普通文本的选择条件为包含和精确等于
            $("#DropDownList" + temp + "3").show();

            $("#ddlKeys" + temp + "1").hide();          //检索项通过选择项检索
            $("#TextBox" + temp + "1").show();          //检索项通过输入检索
            $("#TextBox" + temp + "2").hide();          //检索项是日期检索
            $("#TextBox" + temp + "3").hide();
        }
        else if (str == "UploadTime") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "2");
            $("#comlon" + temp + "2").val("TextBox" + temp + "2");

            $("#DropDownList" + temp + "2").show();     //日期的选择条件为大于、小于等
            $("#DropDownList" + temp + "3").hide();

            $("#ddlKeys" + temp + "1").hide();          //检索项通过选择项检索
            $("#TextBox" + temp + "1").hide();          //检索项通过输入检索
            $("#TextBox" + temp + "2").show();          //检索项是日期检索
            $("#TextBox" + temp + "3").hide();
        }
        else if (str == "请选择") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "3");
            $("#comlon" + temp + "2").val("TextBox" + temp + "1");

            $("#DropDownList" + temp + "2").hide();
            $("#DropDownList" + temp + "3").show();

            $("#ddlKeys" + temp + "1").hide();
            $("#TextBox" + temp + "1").show();
            $("#TextBox" + temp + "1").val('');
            $("#TextBox" + temp + "2").hide();
            $("#TextBox" + temp + "3").hide();

        }
    }
})

$(function () {

    //为选中行添加高亮
    $('.radio').click(function () {
        $(this).parent().parent().addClass('selected');
        $(this).parent().parent().siblings().removeClass('selected');
    });

    /*添加事件*/
    $("#addBtn").click(function () {
        var result = false;
        return qBox.iFLoad({ title: '添加年度安全生产责任状', src: 'safetyProdRespAdd.aspx', w: 865, h: 350 });
    });

   

    /*详细查看事件*/
    $("#searchDetail").click(function () {
        var result = false;
        var AnnualProductionResponsibilityID = $("input[.radio][checked]").val(); //获取单选按钮 //获取隐藏的法律法规编号的值
        //alert(LawAndRuleID)
        if (AnnualProductionResponsibilityID != undefined) {

            return qBox.iFLoad({ title: '年度安全生产责任状详细信息', src: 'safetyProdRespDetail.aspx?AnnualProductionResponsibilityID=' + AnnualProductionResponsibilityID + '&rdom=' + Math.random() + '&fatherCookie=' + getHtmlDocName(), w: 800, h: 335 });
        }
        else {
            alert("请选择您要查看的记录，点击单选按钮选中！");
            return false;
        }

    });
    /*修改事件*/
    $("#update").click(function () {
        var result = false;
        var AnnualProductionResponsibilityID = $("input[.radio][checked]").val(); //获取单选按钮 //获取隐藏的法律法规编号的值
        if (AnnualProductionResponsibilityID != undefined) {

            return qBox.iFLoad({ title: '修改年度安全生产责任状', src: 'safetyProdRespEdit.aspx?AnnualProductionResponsibilityID=' + AnnualProductionResponsibilityID + '&rdom=' + Math.random(), w: 865, h: 358 });
        }
        else {
            alert("请选择您要修改的记录，点击单选按钮选中！");
            return false;
        }

    });


    /*删除点击提交的事件*/
    $("#delete").click(function () {
        var AnnualProductionResponsibilityID = $("input[.radio][checked]").val(); //获取单选按钮
        //        alert(LawAndRuleID);
        if (AnnualProductionResponsibilityID >= 0) {
            //执行删除操作
            if (confirm("您确定要删除吗?")) {
                $.post("dataProcess.ashx", { op: "AnnualProductionResponsibility_T", AnnualProductionResponsibilityID: AnnualProductionResponsibilityID, rdom: Math.random() }, function (data) {
                    if (data == "") {
                        $("#tr_" + AnnualProductionResponsibilityID).remove();
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

        $('#txt_lawAndRuleNum').attr("value", "");
        $('#txt_legalStandard').attr("value", "");
        $('#txt_Evaluation').attr("value", "");
        $('#txt_implementTime').attr("value", "");
        $('#txt_IssueDepartment').attr("value", "");
        $('#txt_issueTime').attr("value", "");
        $('#txt_Item').attr("value", "");
        $('#txt_lawAndRuleCategoryNum').attr("value", "");
        $('#txt_PracticalDepartment').attr("value", "");

    });
})