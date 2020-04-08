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
        if (str == "PunisherNum") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "3"); //设置条件选中
            $("#comlon" + temp + "2").val("TextBox" + temp + "1"); //设置值选中

            $("#DropDownList" + temp + "2").hide(); //大于类
            $("#DropDownList" + temp + "3").show(); //包含

            $("#ddlKeys" + temp + "1").hide(); //下拉框
            $("#ddlKeys" + temp + "2").hide();
            $("#TextBox" + temp + "1").show(); //文本框
            $("#TextBox" + temp + "2").hide(); //日历文本框
        }
        else if (str == "PunisherName") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "3");
            $("#comlon" + temp + "2").val("TextBox" + temp + "1");

            $("#DropDownList" + temp + "2").hide();
            $("#DropDownList" + temp + "3").show();

            $("#ddlKeys" + temp + "1").hide();
            $("#ddlKeys" + temp + "2").hide();
            $("#TextBox" + temp + "1").show();
            $("#TextBox" + temp + "2").hide();
        }
        else if (str == "InstitutionNum") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "3");
            $("#comlon" + temp + "2").val("ddlKeys" + temp + "1");

            $("#DropDownList" + temp + "2").hide();
            $("#DropDownList" + temp + "3").show();

            $("#ddlKeys" + temp + "1").show();
            $("#ddlKeys" + temp + "2").hide();
            $("#TextBox" + temp + "1").hide();
            $("#TextBox" + temp + "2").hide(); //日历文本框
        }
        else if (str == "PeccancyTime") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "2");
            $("#comlon" + temp + "2").val("TextBox" + temp + "2");

            $("#DropDownList" + temp + "2").show();
            $("#DropDownList" + temp + "3").hide();

            $("#ddlKeys" + temp + "1").hide();
            $("#ddlKeys" + temp + "2").hide();
            $("#TextBox" + temp + "1").hide();
            $("#TextBox" + temp + "2").show();
        }
        else if (str == "PeccancyAddress") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "3");
            $("#comlon" + temp + "2").val("TextBox" + temp + "1");

            $("#DropDownList" + temp + "2").hide();
            $("#DropDownList" + temp + "3").show();

            $("#ddlKeys" + temp + "1").hide();
            $("#ddlKeys" + temp + "2").hide();
            $("#TextBox" + temp + "1").show();
            $("#TextBox" + temp + "2").hide();
        }
        else if (str == "PeccancyContent") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "3");
            $("#comlon" + temp + "2").val("TextBox" + temp + "1");

            $("#DropDownList" + temp + "2").hide();
            $("#DropDownList" + temp + "3").show();

            $("#ddlKeys" + temp + "1").hide();
            $("#ddlKeys" + temp + "2").hide();
            $("#TextBox" + temp + "1").show();
            $("#TextBox" + temp + "2").hide();

        }
        else if (str == "PeccancyCategoryNum") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "3");
            $("#comlon" + temp + "2").val("ddlKeys" + temp + "2");

            $("#DropDownList" + temp + "2").hide();
            $("#DropDownList" + temp + "3").show();

            $("#ddlKeys" + temp + "1").hide();
            $("#ddlKeys" + temp + "2").show();
            $("#TextBox" + temp + "1").hide();
            $("#TextBox" + temp + "2").hide();

        }
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
    /**以上为查询sj*/

    //为选中行添加高亮
    $('.radio').click(function () {
        $(this).parent().parent().addClass('selected');
        $(this).parent().parent().siblings().removeClass('selected');
    });


    /*添加事件*/
    $("#addBtn").click(function () {
        return qBox.iFLoad({ title: '添加违规及处罚信息', src: 'peccancyAdd.aspx?rdom=' + Math.random(), w: 350, h: 350 });

    });

    /*详细查看事件*/
    $("#searchDetail").click(function () {
        var PeccancyID = $("input[.radio][checked]").val(); //获取单选按钮 //获取隐藏的法律法规编号的值
        //alert(PeccancyID);
        if (PeccancyID != undefined) {
            return qBox.iFLoad({ title: '违规及处罚详细信息', src: 'peccancyDetail.aspx?PeccancyID=' + PeccancyID + '&rdom=' + Math.random(), w: 350, h: 330 });
        }
        else {
            alert("请选择您要修改的记录，点击单选按钮选中！");
            return false;
        }

    });
    /*修改事件*/
    $("#update").click(function () {
        var PeccancyID = $("input[.radio][checked]").val(); //获取单选按钮 //获取隐藏的法律法规编号的值
        //alert(PeccancyID);
        if (PeccancyID != undefined) {

            return qBox.iFLoad({ title: '修改违规及处罚信息', src: 'peccancyEdit.aspx?PeccancyID=' + PeccancyID + '&rdom=' + Math.random(), w: 350, h: 350 });
        }
        else {
            alert("请选择您要修改的记录，点击单选按钮选中！");
            return false;
        }

    });


    /*删除点击提交的事件*/
    $("#delete").click(function () {
        var PeccancyID = $("input[.radio][checked]").val(); //获取单选按钮
        if (PeccancyID != undefined) {
            //执行删除操作
            if (confirm("您确定要删除吗?")) {
                $.post("dataProcess.ashx", { op: "peccancy_t", PeccancyID: PeccancyID, rdom: Math.random() }, function (data) {
                    if (data == "") {
                        $("#tr_" + PeccancyID).remove();
                    }

                });
            }
        }
        else {
            alert("请选择您要查看的记录，点击单选按钮选中！");
            return false;
        }
    });

    /*重置按钮*/
    $('#btnReset').click(function () {

        $('#txt_InstitutionNum').val('');
        $('#txt_PeccancyAddress').attr("value", "");
        $('#txt_PeccancyCategory').val("");
        $('#txt_PeccancyContent').attr("value", "");
        $('#txt_PeccancyPunish').attr("value", "");
        $('#txt_PeccancyTime').attr("value", "");
        $('#txt_PunishContent').attr("value", "");
        $('#txt_PunisherNum').attr("value", "");
        $('#rbpn').attr("checked", true);
        $('#rbin').attr("checked", false);
        $('#lab_p').show();
        $('#txt_p').show();
        $('#lab_i').hide();
        $('#txt_i').hide();
        $('#lab_flag').val('0');

    });

    //单击个人事件
    $('#rbpn').click(function () {
        //alert(1);
        $('#rbpn').attr("checked", true);
        $('#rbin').attr("checked", false);
        $('#txt_InstitutionNum').val('');
        $('#lab_p').show();
        $('#txt_p').show();
        $('#lab_i').hide();
        $('#txt_i').hide();
        $('#lab_flag').val('0');
    });
    //单击机构事件
    $('#rbin').click(function () {
        //alert(2);
        $('#rbpn').attr("checked", false);
        $('#rbin').attr("checked", true);
        $('#lab_p').hide();
        $('#txt_p').hide();
        $('#lab_i').show();
        $('#txt_i').show();
        $('#lab_flag').val('1');
    });

    //修改中的时候进行显示
    var lab_flag = $('#lab_flag').val();
    if (lab_flag != undefined && lab_flag == "1") {//显示机构的下拉列表
        $('#rbpn').attr("checked", false);
        $('#rbin').attr("checked", true);
        $('#txt_i').show();
        $('#txt_p').hide();
    }
    if (lab_flag != undefined && lab_flag == "0") {//显示人员的下拉列表
        $('#rbpn').attr("checked", true);
        $('#rbin').attr("checked", false);
        $('#txt_i').hide();
        $('#txt_p').show();
    }
    else {

    }

})