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
        if (str == "institutionNum") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "3"); //设置条件选中，2对应大于小于等于，3对应like或=
            $("#comlon" + temp + "2").val("ddlKeys" + temp + "1"); //设置值选中,就是下面的输入框是显示的那种

            $("#DropDownList" + temp + "2").hide(); //大于类
            $("#DropDownList" + temp + "3").show(); //包含

            $("#ddlKeys" + temp + "1").show();
            $("#TextBox" + temp + "1").hide(); //文本框
            $("#TextBox" + temp + "2").hide(); //日历文本框
        }

        else if (str == "safetyItem") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "3");
            $("#comlon" + temp + "2").val("TextBox" + temp + "1");

            $("#DropDownList" + temp + "2").hide();
            $("#DropDownList" + temp + "3").show();

            $("#ddlKeys" + temp + "1").hide();
            $("#TextBox" + temp + "1").show();
            $("#TextBox" + temp + "2").hide();
        }

        else if (str == "safetyRequirement") {
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
            $("#TextBox" + temp + "2").attr("value", "");
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
        var safetyID = $("input[.radio][checked]").val();
        if (safetyID != undefined && safetyID != "") {
            return qBox.iFLoad({ title: '安全生产目标责任状细信息', src: 'safetyProdItemRespDetail.aspx?safetyID=' + safetyID + '&rdom=' + Math.random(), w: 690, h: 380 });
        }
        else {
            alert("请选择您要查看的记录！");
            return false;
        }
    });

    /*添加层的显示*/
    $("#popAdd").click(function () {
        return qBox.iFLoad({ title: '添加安全生产目标责任状信息', src: 'safetyProdItemRespAdd.aspx?rdom=' + Math.random(), w: 680, h: 380 });
    });

    /*修改层的显示*/
    $("#popEdit").click(function () {
        var safetyID = $("input[.radio][checked]").val();
        if (safetyID != undefined && safetyID != "") {
            return qBox.iFLoad({ title: '修改安全生产目标责任状信息', src: 'safetyProdItemRespEdit.aspx?safetyID=' + safetyID + '&rdom=' + Math.random(), w: 680, h: 380 });
        }
        else {
            alert("请选择您要修改的记录！");
            return false;
        }
    });

    /*删除事件*/
    $('#delete').click(function () {
        var safetyID = $("input[.radio][checked]").val();
        if (safetyID != undefined && safetyID != "") {
            if (confirm("您确定要删除吗？")) {
                $.post("dataProcess.ashx", { op: "safetyProdItemDel", safetyID: safetyID, rdom: Math.random() }, function (data) {
                    if (data == "") {
                        $("#tr_" + safetyID).remove();
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
    //打印事件
    $('#print').click(function () {
        var safetyID = $("input[.radio][checked]").val();
        if (safetyID != undefined && safetyID != "") {
            return qBox.iFLoad({ title: '打印安全生产目标责任状', src: 'safetyProdItemRespPrint.aspx?safetyID=' + safetyID + '&rdom=' + Math.random(), w: 500, h: 90 });
        }
        else {
            alert("请选择您要打印的记录！");
            return false;
        }
    });

    //重置按钮事件
    $('#btnReset').click(function () {
        $('#txt_institution').val('');
        $('#txt_safetyItem').attr("value", "");
        $('#txt_safetyRequirement').attr("value", "");
        $('#txt_respPerson').attr("value", "");
        $('#txt_respTime').attr("value", "");
        $('#txt_companyrespPerson').attr("value", "");
        $('#txt_companyrespTime').attr("value", "");
    });
})