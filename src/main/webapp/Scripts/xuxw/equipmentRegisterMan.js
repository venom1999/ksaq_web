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
        if (str == "PROVIDER") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "3"); //设置条件选中，2对应大于小于等于，3对应like或=
            $("#comlon" + temp + "2").val("TextBox" + temp + "1"); //设置值选中,就是下面的输入框是显示的那种

            $("#DropDownList" + temp + "2").hide(); //大于类
            $("#DropDownList" + temp + "3").show(); //包含

            $("#ddlKeys" + temp + "1").hide(); //下拉框

            $("#TextBox" + temp + "1").show(); //文本框
            $("#TextBox" + temp + "2").hide(); //日历文本框
        }

        else if (str == "GETTER") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "3");
            $("#comlon" + temp + "2").val("TextBox" + temp + "1");

            $("#DropDownList" + temp + "2").hide();
            $("#DropDownList" + temp + "3").show();

            $("#ddlKeys" + temp + "1").hide();

            $("#TextBox" + temp + "1").show();
            $("#TextBox" + temp + "2").hide();
        }
        // add
        else if (str == "BACKER") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "3");
            $("#comlon" + temp + "2").val("TextBox" + temp + "1");

            $("#DropDownList" + temp + "2").hide();
            $("#DropDownList" + temp + "3").show();

            $("#ddlKeys" + temp + "1").hide();

            $("#TextBox" + temp + "1").show();
            $("#TextBox" + temp + "2").hide();
        }
        else if (str == "RECIVER") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "3");
            $("#comlon" + temp + "2").val("TextBox" + temp + "1");

            $("#DropDownList" + temp + "2").hide();
            $("#DropDownList" + temp + "3").show();

            $("#ddlKeys" + temp + "1").hide();

            $("#TextBox" + temp + "1").show();
            $("#TextBox" + temp + "2").hide();
        }

        else if (str == "FillTIME") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "2");
            $("#comlon" + temp + "2").val("TextBox" + temp + "2");

            $("#DropDownList" + temp + "2").show();
            $("#DropDownList" + temp + "3").hide();

            $("#ddlKeys" + temp + "1").hide();

            $("#TextBox" + temp + "1").hide();
            $("#TextBox" + temp + "2").show();
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
    $("#iframePopAdd").click(function () {
        return qBox.iFLoad({ title: '添加爆破器材信息', src: 'equipmentRegisterAdd.aspx?rdom=' + Math.random(), w: 820, h: 980 });
    });

    /*详细层的显示*/
    $("#iframePopDetail").click(function () {
        var recordID = $("input[.radio][checked]").val(); //获取单选按钮
        if (recordID != undefined) {
            return qBox.iFLoad({ title: '爆破器材详细信息', src: 'equipmentRegisterDetail.aspx?recordID=' + recordID + '&rdom=' + Math.random() + '&fatherCookie=' + getHtmlDocName(), w: 820, h: 980 });
        }
        else {
            alert("请选择您要查看的记录，点击单选按钮选中！");
            return false;
        }
    });

    /*修改层的显示*/
    $("#iframePopEdit").click(function () {
        var recordID = $("input[.radio][checked]").val(); //获取单选按钮
        if (recordID != undefined) {
            return qBox.iFLoad({ title: '修改爆破器材信息', src: 'equipmentRegisterEdit.aspx?recordID=' + recordID + '&rdom=' + Math.random(), w: 820, h: 980 });
        }
        else {
            alert("请选择您要查看的记录，点击单选按钮选中！");
            return false;
        }
    });

    /*删除点击提交的事件*/
    $('#delete').click(function () {
        var recordID = $("input[.radio][checked]").val(); //获取单选按钮
        if (recordID != undefined) {
            //执行删除操作
            /*获取变量，并进行删除处理，异步进行，先删除数据库，然后回调函数删除页面上的一行*/
            if (confirm("您确定要删除吗?")) {
                $.post("dataProcess.ashx", { op: "equipmentRegisterDel_T", recordID: recordID, rdom: Math.random() }, function (data) {
                    if (data == "") {
                        $("#tr_" + recordID).remove();
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
        $('#txt_FillTIME').attr("value", "");
        $('#txt_PROVIDER').attr("value", "");
        $('#txt_GETTER').attr("value", "");
        $('#txt_BACKER').attr("value", "");
        $('#txt_RECIVER').attr("value", "");
        $('#txt_GET_EXPLOSIVE').attr("value", "");
        $('#txt_GET_ELECTRIC_PIPE').attr("value", "");
        $('#txt_GET_PIPE_ONE').attr("value", "");
        $('#txt_GET_PIPE_TWO').attr("value", "");
        $('#txt_GET_PIPE_THREE').attr("value", "");
        $('#txt_GET_PIPE_FOUR').attr("value", "");
        $('#txt_GET_PIPE_FIVE').attr("value", "");
        $('#txt_GET_PIPE_SIX').attr("value", "");
        $('#txt_GET_PIPE_SEVEN').attr("value", "");
        $('#txt_GET_PIPE_EIGHT').attr("value", "");
        $('#txt_GET_PIPE_NINE').attr("value", "");
        $('#txt_GET_PIPE_TEN').attr("value", "");
        $('#txt_GET_DETONATE_CORD').attr("value", "");
        $('#txt_USE_EXPLOSIVE').attr("value", "");
        $('#txt_USE_ELECTRIC_PIPE').attr("value", "");
        $('#txt_USE_PIPE_ONE').attr("value", "");
        $('#txt_USE_PIPE_TWO').attr("value", "");
        $('#txt_USE_PIPE_THREE').attr("value", "");
        $('#txt_USE_PIPE_FOUR').attr("value", "");
        $('#txt_USE_PIPE_FIVE').attr("value", "");
        $('#txt_USE_PIPE_SIX').attr("value", "");
        $('#txt_USE_PIPE_SEVEN').attr("value", "");
        $('#txt_USE_PIPE_EIGHT').attr("value", "");
        $('#txt_USE_PIPE_NINE').attr("value", "");
        $('#txt_USE_PIPE_TEN').attr("value", "");
        $('#txt_USE_ELECTRIC_CORD').attr("value", "");
        $('#txt_CHECK_BACK_EXPLOSIVE').attr("value", "");
        $('#txt_CHECK_BACK_ELECTRIC_PIPE').attr("value", "");
        $('#txt_BACK_PIPE_ONE').attr("value", "");
        $('#txt_BACK_PIPE_TWO').attr("value", "");
        $('#txt_BACK_PIPE_THREE').attr("value", "");
        $('#txt_BACK_PIPE_FOUR').attr("value", "");
        $('#txt_BACK_PIPE_FIVE').attr("value", "");
        $('#txt_BACK_PIPE_SIX').attr("value", "");
        $('#txt_BACK_PIPE_SEVEN').attr("value", "");
        $('#txt_BACK_PIPE_EIGHT').attr("value", "");
        $('#txt_BACK_PIPE_NINE').attr("value", "");
        $('#txt_BACK_PIPE_TEN').attr("value", "");
        $('#txt_CHECK_BACK_ELECTRIC_CORD').attr("value", "");

        $('#txt_institutionNum').val('');


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

    //验证折旧值小于原资产值
    $('#txt_DEPRECIATIONVALUE').change(function () {
        var depValue = $('#txt_DEPRECIATIONVALUE').val();
        var originValue = $('#txt_ORIGINALVALUE').val();
        if (depValue != "" && originValue != "") {
            if (parseFloat(depValue) >= parseFloat(originValue)) {
                alert("折旧值不能大于或等于原值，请重新填写！");
                $('#txt_DEPRECIATIONVALUE').val('');
            }
            else { }
        }
    });
    //验证可回收残值小于原资产值
    $('#txt_RECYCLEVALUE').change(function () {
        var recycleValue = $('#txt_RECYCLEVALUE').val();
        var originValue = $('#txt_ORIGINALVALUE').val();
        if (recycleValue != "" && originValue != "") {
            if (parseFloat(recycleValue) >= parseFloat(originValue)) {
                alert("可回收残值不能大于或等于原值，请重新填写！");
                $('#txt_RECYCLEVALUE').val('');
            }
            else { }
        }
    });
})