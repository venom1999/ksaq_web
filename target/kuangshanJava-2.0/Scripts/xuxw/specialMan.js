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
        if (str == "EmployeeName") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "3"); //设置条件选中，2对应大于小于等于，3对应like或=
            $("#comlon" + temp + "2").val("TextBox" + temp + "1"); //设置值选中,就是下面的输入框是显示的那种

            $("#DropDownList" + temp + "2").hide(); //大于类
            $("#DropDownList" + temp + "3").show(); //包含

            $("#ddlKeys" + temp + "1").hide(); //下拉框
            $("#ddlKeys" + temp + "2").hide();
            $("#TextBox" + temp + "1").show(); //文本框
            $("#TextBox" + temp + "2").hide(); //日历文本框
        }

        else if (str == "OpCategoryNum") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "3");
            $("#comlon" + temp + "2").val("ddlKeys" + temp + "1");

            $("#DropDownList" + temp + "2").hide();
            $("#DropDownList" + temp + "3").show();

            $("#ddlKeys" + temp + "1").show();
            $("#ddlKeys" + temp + "2").hide();
            $("#TextBox" + temp + "1").hide();
            $("#TextBox" + temp + "2").hide();
        }
        else if (str == "OpItemNum") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "3");
            $("#comlon" + temp + "2").val("ddlKeys" + temp + "2");

            $("#DropDownList" + temp + "2").hide();
            $("#DropDownList" + temp + "3").show();

            $("#ddlKeys" + temp + "1").hide();
            $("#ddlKeys" + temp + "2").show();
            $("#TextBox" + temp + "1").hide();
            $("#TextBox" + temp + "2").hide();
        }
        else if (str == "CertificateNum") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "3");
            $("#comlon" + temp + "2").val("TextBox" + temp + "1");

            $("#DropDownList" + temp + "2").hide();
            $("#DropDownList" + temp + "3").show();

            $("#ddlKeys" + temp + "1").hide();
            $("#ddlKeys" + temp + "2").hide();
            $("#TextBox" + temp + "1").show();
            $("#TextBox" + temp + "2").hide();
        }
        else if (str == "IssueInstitute") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "3");
            $("#comlon" + temp + "2").val("TextBox" + temp + "1");

            $("#DropDownList" + temp + "2").hide();
            $("#DropDownList" + temp + "3").show();

            $("#ddlKeys" + temp + "1").hide();
            $("#ddlKeys" + temp + "2").hide();
            $("#TextBox" + temp + "1").show();
            $("#TextBox" + temp + "2").hide();
        }
        else if (str == "FirstDate") {

            $("#comlon" + temp + "1").val("DropDownList" + temp + "2");
            $("#comlon" + temp + "2").val("TextBox" + temp + "2");

            $("#DropDownList" + temp + "2").show();
            $("#DropDownList" + temp + "3").hide();

            $("#ddlKeys" + temp + "1").hide();
            $("#ddlKeys" + temp + "2").hide();
            $("#TextBox" + temp + "1").hide();
            $("#TextBox" + temp + "2").show();
        }
        else if (str == "GetTime") {

            $("#comlon" + temp + "1").val("DropDownList" + temp + "2");
            $("#comlon" + temp + "2").val("TextBox" + temp + "2");

            $("#DropDownList" + temp + "2").show();
            $("#DropDownList" + temp + "3").hide();

            $("#ddlKeys" + temp + "1").hide();
            $("#ddlKeys" + temp + "2").hide();
            $("#TextBox" + temp + "1").hide();
            $("#TextBox" + temp + "2").show();
        }

        else if (str == "ReexamineTime") {

            $("#comlon" + temp + "1").val("DropDownList" + temp + "2");
            $("#comlon" + temp + "2").val("TextBox" + temp + "2");

            $("#DropDownList" + temp + "2").show();
            $("#DropDownList" + temp + "3").hide();

            $("#ddlKeys" + temp + "1").hide();
            $("#ddlKeys" + temp + "2").hide();
            $("#TextBox" + temp + "1").hide();
            $("#TextBox" + temp + "2").show();
        }
        else if (str == "Validity") {

            $("#comlon" + temp + "1").val("DropDownList" + temp + "2");
            $("#comlon" + temp + "2").val("TextBox" + temp + "2");

            $("#DropDownList" + temp + "2").show();
            $("#DropDownList" + temp + "3").hide();

            $("#ddlKeys" + temp + "1").hide();
            $("#ddlKeys" + temp + "2").hide();
            $("#TextBox" + temp + "1").hide();
            $("#TextBox" + temp + "2").show();
        }
        else if (str == "SpeciExperience") {

            $("#comlon" + temp + "1").val("DropDownList" + temp + "3");
            $("#comlon" + temp + "2").val("TextBox" + temp + "1");

            $("#DropDownList" + temp + "2").hide();
            $("#DropDownList" + temp + "3").show();

            $("#ddlKeys" + temp + "1").hide();
            $("#ddlKeys" + temp + "2").hide();
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
            $("#ddlKeys" + temp + "2").hide();
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

    /*添加特种人员信息*/
    $("#iframePopAdd").click(function () {
        return qBox.iFLoad({ title: '添加证书信息管理', src: 'specialAdd.aspx', w: 758, h: 555 });
    });
   
    /*查看详细信息事件*/
    $('#iframePopDetail').click(function () {
        var specialID = $("input[.radio][checked]").val(); //获取单选按钮
        //alert(employeeNum);
        if (specialID != undefined && specialID != "") {
            return qBox.iFLoad({ title: '证书信息管理详细信息', src: 'specialDetail.aspx?specialID=' + specialID + '&rdom=' + Math.random() + '&fatherCookie=' + getHtmlDocName(), w: 740, h: 595 });
        }
        else {
            alert("请选择您要查看的记录，点击单选按钮选中！");
            return false;
        }
    });

    /*修改事件*/
    $('#iframePopEdit').click(function () {
        var specialID = $("input[.radio][checked]").val(); //获取单选按钮
        if (specialID != undefined && specialID != "") {
            return qBox.iFLoad({ title: '修改证书信息管理', src: 'specialEdit.aspx?specialID=' + specialID + '&rdom=' + Math.random(), w: 740, h: 570 });
        }
        else {
            alert("请选择您要修改的记录，点击单选按钮选中！");
            return false;
        }

    });


    /*删除点击提交的事件*/
    $('#delete').click(function () {
        var specialID = $("input[.radio][checked]").val(); //获取单选按钮
        //alert(specialID);
        //执行删除操作
        if (specialID != undefined && specialID != "") {
            if (confirm("您确定要删除吗?")) {
                $.post("dataProcess.ashx", { op: "SpecialEmployee_T", specialID: specialID, rdom: Math.random() }, function (data) {
                    if (data == "") {
                        $("#tr_" + specialID).remove();
                    }

                });
            }
        }
        else {
            alert("请选择您要删除的记录，点击单选按钮选中！");
            return false;
        }
    });
    /*复审点击提交的事件*/
    $('#review').click(function () {
        var specialID = $("input[.radio][checked]").val(); //获取单选按钮
        //执行删除操作
        if (specialID != undefined && specialID != "") {
           // if (confirm("您确定要删除吗?")) {
            $.post("dataProcess.ashx", { op: "SpecialEmployeereview", specialID: specialID, rdom: Math.random() }, function (data) {
                if (data == "") {
                    alert("复审成功！");
                    //$("#tr_" + specialID).remove();
                }
            });
           // }
        }
        else {
            alert("请选择您要复审的记录，点击单选按钮选中！");
            return false;
        }
    });


    /*批量修改的事件*/
    $('#iframeBatch').click(function () {
        //alert("弹出层");
        return qBox.iFLoad({ title: '批量修改证书信息管理', src: 'specialBatch.aspx', w: 375, h: 260 });
    });

    /*部门进行打印名单*/
    $('#printSpeRoll').click(function () {
        //alert("打印特种作业人员名单");
        return qBox.iFLoad({ title: '打印特种作业人员名单', src: 'specialWordOper.aspx', w: 360, h: 95 });
        //window.location.href = "specialWordOper.aspx";
    });

  
    /**重置按钮 **/
    $('#btnReset').click(function () {
        $('#txt_certificateName').attr("value", "特种作业操作证");
        $('#txt_certificateNum').attr("value", "");
        $('#txt_employeeName').attr("value", "");
        $('#txt_GetTime').attr("value", "");
        $('#txt_FirstDate').attr("value", "");
        $('#txt_ReexamineTime').attr("value", "");
        $('#txt_issueInstitute').attr("value", "");
        $('#txt_SpeciExperience').attr("value", "");
        $('#txt_Validity').attr("value", "");
        $('#txt_opCategory').attr("value", "li");
        $('#txt_opItem').attr("value", "li");
        $('#txt_employeeSex').val("");
        $('#txt_institutionName').attr("value", "");
        $('#txt_SpeciExperience').attr("value", "");
    });


})