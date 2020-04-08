$(function () {
    $('.radio').click(function () {
        $(this).parent().parent().addClass('selected');
        $(this).parent().parent().siblings().removeClass('selected');
    });

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
        var temp = ids.substring(13, 12); ;
        show_div(str, temp);

    });

    function show_div(str, temp) {
        if (str == "DangerType") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "3"); //设置条件选中，2对应大于小于等于，3对应like或=
            $("#comlon" + temp + "2").val("ddlKeys" + temp + "1"); //设置值选中,就是下面的输入框是显示的那种

            $("#DropDownList" + temp + "2").hide(); //大于类
            $("#DropDownList" + temp + "3").show(); //包含

            $("#ddlKeys" + temp + "1").show(); //下拉框
            $("#ddlKeys" + temp + "2").hide();
            $("#ddlKeys" + temp + "3").hide();
            $("#ddlKeys" + temp + "4").hide();
            $("#ddlKeys" + temp + "5").hide();

            $("#TextBox" + temp + "1").hide(); //文本框
            $("#TextBox" + temp + "2").hide(); //日历文本框
        }

        else if (str == "DangerName") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "3");
            $("#comlon" + temp + "2").val("TextBox" + temp + "1");

            $("#DropDownList" + temp + "2").hide();
            $("#DropDownList" + temp + "3").show();

            $("#ddlKeys" + temp + "1").hide();
            $("#ddlKeys" + temp + "2").hide();
            $("#ddlKeys" + temp + "3").hide();
            $("#ddlKeys" + temp + "4").hide();
            $("#ddlKeys" + temp + "5").hide();

            $("#TextBox" + temp + "1").show();
            $("#TextBox" + temp + "2").hide();
        }
        // add
        else if (str == "DangerDiscerninfo_t.InstitutionName") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "3");
            $("#comlon" + temp + "2").val("ddlKeys" + temp + "2");

            $("#DropDownList" + temp + "2").hide();
            $("#DropDownList" + temp + "3").show();

            $("#ddlKeys" + temp + "1").hide();
            $("#ddlKeys" + temp + "2").show();
            $("#ddlKeys" + temp + "3").hide();
            $("#ddlKeys" + temp + "4").hide();
            $("#ddlKeys" + temp + "5").hide();

            $("#TextBox" + temp + "1").hide();
            $("#TextBox" + temp + "2").hide();
        }
        else if (str == "ModifiedTime") {

            $("#comlon" + temp + "1").val("DropDownList" + temp + "2");
            $("#comlon" + temp + "2").val("TextBox" + temp + "2");

            $("#DropDownList" + temp + "2").show();
            $("#DropDownList" + temp + "3").hide();

            $("#ddlKeys" + temp + "1").hide();
            $("#ddlKeys" + temp + "2").hide();
            $("#ddlKeys" + temp + "3").hide();
            $("#ddlKeys" + temp + "4").hide();
            $("#ddlKeys" + temp + "5").hide();

            $("#TextBox" + temp + "1").hide();
            $("#TextBox" + temp + "2").show();
        }
        else if (str == "FillingPerson") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "3");
            $("#comlon" + temp + "2").val("TextBox" + temp + "1");

            $("#DropDownList" + temp + "2").hide();
            $("#DropDownList" + temp + "3").show();

            $("#ddlKeys" + temp + "1").hide();
            $("#ddlKeys" + temp + "2").hide();
            $("#ddlKeys" + temp + "3").hide();
            $("#ddlKeys" + temp + "4").hide();
            $("#ddlKeys" + temp + "5").hide();

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
            $("#ddlKeys" + temp + "3").hide();
            $("#ddlKeys" + temp + "4").hide();
            $("#ddlKeys" + temp + "5").hide();
            $("#ddlKeys" + temp + "6").hide();
            $("#ddlKeys" + temp + "7").hide();
            $("#ddlKeys" + temp + "8").hide();
            $("#ddlKeys" + temp + "9").hide();
            $("#ddlKeys" + temp + "10").hide();
            $("#ddlKeys" + temp + "11").hide();
            $("#ddlKeys" + temp + "12").hide();
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


    /*详细的显示*/
    $("#iframePopDetail").click(function () {
        //        alert(1);
        var dangerId = $("input[.radio][checked]").val(); //获取单选按钮
        if (dangerId > 0) {
            return qBox.iFLoad({ title: '危险源辨识详细信息', src: 'DetailEquipmentDanger.aspx?id=' + dangerId + '&rdom=' + Math.random(), w: 900, h: 580 });
            //            self.location = 'DetailEquipmentDanger.aspx?id=' + dangerId;
        }
        else {
            alert("请选择您要查看的记录，点击单选按钮选中！");
            return false;
        }
    });
    /*添加层的显示*/
    $("#iframePopAdd").click(function () {
        return qBox.iFLoad({ title: '添加危险源辨识信息', src: 'AddEquipmentDanger.aspx', w: 900, h: 580 });
        //        self.location = 'AddEquipmentDanger.aspx';
    });
    /*详细层的显示*/
    $("#iframePopEdit").click(function () {

        var dangerId = $("input[.radio][checked]").val(); //获取单选按钮

        if (dangerId > 0) {
            return qBox.iFLoad({ title: '修改危险源辨识信息', src: 'EditEquipmentDanger.aspx?id=' + dangerId + '&rdom=' + Math.random(), w: 900, h: 580 });
            //            self.location = 'EditEquipmentDanger.aspx?id=' + dangerId;
        }
        else {
            alert("请选择您要查看的记录，点击单选按钮选中！");
            return false;
        }
    });
    /*删除培训信息提交的事件*/
    $('#delete').click(function () {
        //        alert("delete");

        var dangerId = $("input[.radio][checked]").val(); //获取单选按钮
        //        alert(dangerId);
        if (dangerId > 0) {
            //执行删除操作
            if (confirm("您确定要删除吗?")) {
                $.post("EquipmentDangerDel.ashx", { op: "DangerDiscerninfo_t", id: dangerId, rdom: Math.random() }, function (data) {
                    if (data == "") {
                        $("#tr_" + dangerId).remove();
                    }

                });
            }
        }
        else {
            alert("请选择您要修改的记录，点击单选按钮选中！");
            return false;
        }
    });
    $('#txt_PossibleAccidentName').click(function () {
        var state = $("#hidePossibleAccidentName").css('display');
        if (state == "none") {
            $("#hidePossibleAccidentName").show();
        }
    });
    $('#hidePossibleAccidentName').hover(
         function () {
             $("#hidePossibleAccidentName").show();
         },
        function () {
            $("#hidePossibleAccidentName").hide();
            var sumstr = "";
            var num = "";
            $('input[class^=checkbox_P]').each(function () {
                if ($(this).attr("checked") == true) {
                    var n = $(this).siblings(".accidentNum").html();
                    var s = $(this).siblings(".accidentNum").html() + "、" + $(this).siblings(".accident").html();
                    num += n + ",";
                    sumstr += s + ";";
                }
            });
            if (num.length > 0) {
                num = num.substring(0, num.length - 1);
            }
            $('#hidePoAcName').attr("value", sumstr);
            $('#txt_PossibleAccidentName').attr("value", sumstr);
            $('#hidePossibleAccident').val(num);
        }
   );

    //危害类型赋值
    $('#txt_DangerTypeNum').click(function () {
        var state = $("#hideDangerTypeNum").css('display');
        if (state == "none") {
            $("#hideDangerTypeNum").show();
        }
        //        else {
        //            $("#hideDangerTypeNum").hide();
        //        }
    });
    //    $('#hideDangerTypeNum').mousemove(function () {
    //        $("#hideDangerTypeNum").show();
    //    });
    $('#hideDangerTypeNum').hover(
        function () {
            $("#hideDangerTypeNum").show();
        },
       function () {
           $("#hideDangerTypeNum").hide();
           var sumstr = "";
           var num = "";
           $('.checkbox_DangerTypeNum').each(function () {
               if ($(this).attr("checked") == true) {
                   var n = $(this).siblings(".dangerNum").html();
                   var s = $(this).siblings(".dangerNum").html() + "、" + $(this).siblings(".danger").html();
                   num += n + ",";
                   sumstr += s + ";";
               }
           });
           $('#hideDangerTypeName').attr("value", sumstr);
           $('#txt_DangerTypeNum').attr("value", sumstr);
           if (num.length > 0) {
               num = num.substring(0, num.length - 1);
           }
           $('#hideDangerType').val(num);
       }
    );

    $("#txt_DangerType").change(function () {
        var ids = $(this).attr("id");
        var str = $(this).val();
        if (str == "") {
            $("#txt_DiscernItem").show();
            $("#txt_DiscernItem1").hide();
            $("#txt_DiscernItem2").hide();
            $("#txt_DiscernItem3").hide();
        }
        else if (str == "1") {
            $("#txt_DiscernItem").hide();
            $("#txt_DiscernItem1").show();
            $("#txt_DiscernItem2").hide();
            $("#txt_DiscernItem3").hide();
        }
        else if (str == "2") {
            $("#txt_DiscernItem").hide();
            $("#txt_DiscernItem1").hide();
            $("#txt_DiscernItem2").show();
            $("#txt_DiscernItem3").hide();
        }
        else if (str == "3") {
            $("#txt_DiscernItem").hide();
            $("#txt_DiscernItem1").hide();
            $("#txt_DiscernItem2").hide();
            $("#txt_DiscernItem3").show();
        }
        $("#hideDiscernItemIDNum").val("txt_DiscernItem" + str);
    });
    //判断LEC
    $("#txt_Value_L").mouseout(function () {
        setLECD();
    });
    $("#txt_Value_E").mouseout(function () {
        setLECD();
    });
    $("#txt_Value_C").mouseout(function () {
        setLECD();
    });
    $("#txt_Value_D").click(function () {
        setLECD();
    });
    function setLECD() {
        var l = $("#txt_Value_L").val();
        var e = $("#txt_Value_E").val();
        var c = $("#txt_Value_C").val();
        if (l != "" && e != "" && c != "") {
            var l = parseFloat(l);
            var e = parseFloat(e);
            var c = parseFloat(c);
            var d = multiply(l, e);
            d = multiply(d, c);
            $("#txt_Value_D").val(d);
        }
        else {
            $("#txt_Value_D").val("");
        }
    }

    function multiply(arg1, arg2) {
        arg1 = String(arg1); var i = arg1.length - arg1.indexOf(".") - 1; i = (i >= arg1.length) ? 0 : i;
        arg2 = String(arg2); var j = arg2.length - arg2.indexOf(".") - 1; j = (j >= arg2.length) ? 0 : j;
        return arg1.replace(".", "") * arg2.replace(".", "") / Math.pow(10, i + j);
    }

    $("#submitadd").click(function () {
        if ($("#txt_Value_L").val() == "" && $("#txt_Value_E").val() == "" && $("#txt_Value_C").val() == "" && $("#txt_Value_D").val() == "") {
        }
        else if ($("#txt_Value_L").val() != "" && $("#txt_Value_E").val() != "" && $("#txt_Value_C").val() != "" && $("#txt_Value_D").val() != "") {
        }
        else {
            alert("L、E、C值或者全填，或者不填！请重新填写！");
            return false;
        }
    });
})