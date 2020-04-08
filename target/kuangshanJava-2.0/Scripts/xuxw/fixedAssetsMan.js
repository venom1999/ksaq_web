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
        if (str == "PROPERTY_ID") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "3"); //设置条件选中，2对应大于小于等于，3对应like或=
            $("#comlon" + temp + "2").val("TextBox" + temp + "1"); //设置值选中,就是下面的输入框是显示的那种

            $("#DropDownList" + temp + "2").hide(); //大于类
            $("#DropDownList" + temp + "3").show(); //包含

            $("#ddlKeys" + temp + "1").hide(); //下拉框
            $("#ddlKeys" + temp + "2").hide();

            $("#TextBox" + temp + "1").show(); //文本框
            $("#TextBox" + temp + "2").hide(); //日历文本框
        }

        else if (str == "DEVICE_NAME") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "3");
            $("#comlon" + temp + "2").val("TextBox" + temp + "1");

            $("#DropDownList" + temp + "2").hide();
            $("#DropDownList" + temp + "3").show();

            $("#ddlKeys" + temp + "1").hide();
            $("#ddlKeys" + temp + "2").hide();

            $("#TextBox" + temp + "1").show();
            $("#TextBox" + temp + "2").hide();
        }
        // add
        else if (str == "DETAIL") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "3");
            $("#comlon" + temp + "2").val("TextBox" + temp + "1");

            $("#DropDownList" + temp + "2").hide();
            $("#DropDownList" + temp + "3").show();

            $("#ddlKeys" + temp + "1").hide();
            $("#ddlKeys" + temp + "2").hide();

            $("#TextBox" + temp + "1").show();
            $("#TextBox" + temp + "2").hide();
        }
        else if (str == "SPECIFICATION_SIZE") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "3");
            $("#comlon" + temp + "2").val("TextBox" + temp + "1");

            $("#DropDownList" + temp + "2").hide();
            $("#DropDownList" + temp + "3").show();

            $("#ddlKeys" + temp + "1").hide();
            $("#ddlKeys" + temp + "2").hide();

            $("#TextBox" + temp + "1").show();
            $("#TextBox" + temp + "2").hide();
        }

        else if (str == "PRODUCATION_DATE") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "2");
            $("#comlon" + temp + "2").val("TextBox" + temp + "2");

            $("#DropDownList" + temp + "2").show();
            $("#DropDownList" + temp + "3").hide();

            $("#ddlKeys" + temp + "1").hide();
            $("#ddlKeys" + temp + "2").hide();

            $("#TextBox" + temp + "1").hide();
            $("#TextBox" + temp + "2").show();
        }
        else if (str == "START_USE_DATE") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "2");
            $("#comlon" + temp + "2").val("TextBox" + temp + "2");

            $("#DropDownList" + temp + "2").show();
            $("#DropDownList" + temp + "3").hide();

            $("#ddlKeys" + temp + "1").hide();
            $("#ddlKeys" + temp + "2").hide();

            $("#TextBox" + temp + "1").hide();
            $("#TextBox" + temp + "2").show();
        }

        else if (str == "B_SORT") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "3");
            $("#comlon" + temp + "2").val("ddlKeys" + temp + "1");

            $("#DropDownList" + temp + "2").hide();
            $("#DropDownList" + temp + "3").show();

            $("#ddlKeys" + temp + "1").show();
            $("#ddlKeys" + temp + "2").hide();

            $("#TextBox" + temp + "1").hide();
            $("#TextBox" + temp + "2").hide();
        }

        else if (str == "S_SORT") {

            $("#comlon" + temp + "1").val("DropDownList" + temp + "3");
            $("#comlon" + temp + "2").val("ddlKeys" + temp + "2");

            $("#DropDownList" + temp + "2").hide();
            $("#DropDownList" + temp + "3").show();

            $("#ddlKeys" + temp + "1").hide();
            $("#ddlKeys" + temp + "2").show();

            $("#TextBox" + temp + "1").hide();
            $("#TextBox" + temp + "2").hide();
        }

        else if (str == "USE_INFO") {

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



    /*添加层的显示*/
    $("#iframePopAdd").click(function () {
        return qBox.iFLoad({ title: '添加固定资产清查台帐信息', src: 'FixedAssetsAdd.aspx?rdom=' + Math.random(), w: 664, h: 354 });
    });

    /*详细层的显示*/
    $("#iframePopDetail").click(function () {
        var fixedAssetsID = $("input[.radio][checked]").val(); //获取单选按钮
        var pageIndex = $('#pageIndex').val();
        if (fixedAssetsID != undefined) {
            return qBox.iFLoad({ title: '固定资产清查台帐详细信息', src: 'FixedAssetsDetail.aspx?fixedAssetsID=' + fixedAssetsID + '&rdom=' + Math.random(), w: 664, h: 351 });
        }
        else {
            alert("请选择您要查看的记录，点击单选按钮选中！");
            return false;
        }
    });

    /*修改层的显示*/
    $("#iframePopEdit").click(function () {
        var fixedAssetsID = $("input[.radio][checked]").val(); //获取单选按钮
        if (fixedAssetsID != undefined) {
            return qBox.iFLoad({ title: '修改固定资产清查台帐信息', src: 'FixedAssetsEdit.aspx?fixedAssetsID=' + fixedAssetsID + '&rdom=' + Math.random(), w: 664, h: 353 });
        }
        else {
            alert("请选择您要查看的记录，点击单选按钮选中！");
            return false;
        }
    });

    /*删除点击提交的事件*/
    $('#delete').click(function () {
        var fixedAssetsID = $("input[.radio][checked]").val(); //获取单选按钮
        if (fixedAssetsID != undefined) {
            //执行删除操作
            /*获取变量，并进行删除处理，异步进行，先删除数据库，然后回调函数删除页面上的一行*/
            if (confirm("您确定要删除吗?")) {
                $.post("dataProcess.ashx", { op: "FixedAssetsDel_T", FixedAssetsID: fixedAssetsID, rdom: Math.random() }, function (data) {
                    if (data == "") {
                        $("#tr_" + fixedAssetsID).remove();
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
    $('#btnResetEmp').click(function () {
        $('#txt_PROPERTYID').attr("value", "");
        $('#txt_DEVICENAME').attr("value", "");
        $('#txt_DETAIL').attr("value", "");
        $('#txt_size').attr("value", "");
        $('#txt_WEIGHT').attr("value", "");
        $('#txt_CAPACITY').attr("value", "");
        $('#txt_ORIGINALVALUE').attr("value", "");
        $('#txt_NETVALUE').attr("value", "");
        $('#txt_PRODUCATIONDATE').attr("value", "");
        $('#txt_STARTUSEDATE').attr("value", "");
        $('#txt_MANUFACTURER').attr("value", "");
        $('#txt_INSTALLPLACE').attr("value", "");
        $('#txt_USEINFO').attr("value", "");
        $('#txt_REMARK').attr("value", "");
        $('#txt_BSort').val('');
        $('#txt_SSort').val('');


    });




    /*验证资产编号是否存在*/
    $('#txt_PROPERTYID').change(function () {
        var proID = $(this).val();
        if (proID != undefined && proID != "") {//员工编号已填写
            $.post("dataProcess.ashx", { op: "CheckID", proID: proID, rdom: Math.random() }, function (data) {
                if (data == "") {
                    //alert("员工编号不存在，可以添加！");
                }
                else {
                    alert("资产编号" + proID + "已存在！");
                    $('#txt_PROPERTYID').attr("value", "");
                    return false;
                }
            });
        }
        else {

        }
    });

    //验证净值小于原资产值
    $('#txt_NETVALUE').change(function () {
        var netValue = $('#txt_NETVALUE').val();
        var originValue = $('#txt_ORIGINALVALUE').val();
        if (netValue != "" && originValue != "") {
            if (parseFloat(netValue) >= parseFloat(originValue)) {
                alert("净值不能大于或等于原值，请重新填写！");
                $('#txt_NETVALUE').val('');
            }
            else { }
        }
    });


})