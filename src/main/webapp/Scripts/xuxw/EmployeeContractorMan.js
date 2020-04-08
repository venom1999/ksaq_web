//获取url中的参数
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return r[2]; return '';
}

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
        if (str == "EmployeeNum") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "3"); //设置条件选中，2对应大于小于等于，3对应like或=
            $("#comlon" + temp + "2").val("TextBox" + temp + "1"); //设置值选中,就是下面的输入框是显示的那种

            $("#DropDownList" + temp + "2").hide(); //大于类
            $("#DropDownList" + temp + "3").show(); //包含

            $("#ddlKeys" + temp + "1").hide(); //下拉框
            $("#ddlKeys" + temp + "2").hide();
            $("#ddlKeys" + temp + "3").hide();
            $("#ddlKeys" + temp + "4").hide();
            $("#ddlKeys" + temp + "5").hide();
            //$("#ddlKeys" + temp + "6").hide();
            //$("#ddlKeys" + temp + "7").hide();
            //$("#ddlKeys" + temp + "8").hide();
            $("#ddlKeys" + temp + "9").hide();
            $("#ddlKeys" + temp + "10").hide();
            //$("#ddlKeys" + temp + "11").hide();
            $("#ddlKeys" + temp + "12").hide();
            $("#ddlKeys" + temp + "13").hide();

            $("#TextBox" + temp + "1").show(); //文本框
            $("#TextBox" + temp + "2").hide(); //日历文本框

            $("#DropDownList" + temp + "3").val('%');
            $("#DropDownList" + temp + "3").attr('disabled', false);
        }

        else if (str == "EmployeeName") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "3");
            $("#comlon" + temp + "2").val("TextBox" + temp + "1");

            $("#DropDownList" + temp + "2").hide();
            $("#DropDownList" + temp + "3").show();

            $("#ddlKeys" + temp + "1").hide();
            $("#ddlKeys" + temp + "2").hide();
            $("#ddlKeys" + temp + "3").hide();
            $("#ddlKeys" + temp + "4").hide();
            $("#ddlKeys" + temp + "5").hide();
            //$("#ddlKeys" + temp + "6").hide();
            //$("#ddlKeys" + temp + "7").hide();
            //$("#ddlKeys" + temp + "8").hide();
            $("#ddlKeys" + temp + "9").hide();
            $("#ddlKeys" + temp + "10").hide();
            //$("#ddlKeys" + temp + "11").hide();
            $("#ddlKeys" + temp + "12").hide();
            $("#ddlKeys" + temp + "13").hide();
            $("#TextBox" + temp + "1").show();
            $("#TextBox" + temp + "2").hide();

            $("#DropDownList" + temp + "3").val('%');
            $("#DropDownList" + temp + "3").attr('disabled', false);
        }
            // add
            //else if (str == "EmployeeNative") {
            //    $("#comlon" + temp + "1").val("DropDownList" + temp + "3");
            //    $("#comlon" + temp + "2").val("TextBox" + temp + "1");

            //    $("#DropDownList" + temp + "2").hide();
            //    $("#DropDownList" + temp + "3").show();

            //    $("#ddlKeys" + temp + "1").hide();
            //    $("#ddlKeys" + temp + "2").hide();
            //    $("#ddlKeys" + temp + "3").hide();
            //    $("#ddlKeys" + temp + "4").hide();
            //    $("#ddlKeys" + temp + "5").hide();
            //    $("#ddlKeys" + temp + "6").hide();
            //    $("#ddlKeys" + temp + "7").hide();
            //    $("#ddlKeys" + temp + "8").hide();
            //    $("#ddlKeys" + temp + "9").hide();
            //    $("#ddlKeys" + temp + "10").hide();
            //    $("#ddlKeys" + temp + "11").hide();
            //    $("#ddlKeys" + temp + "12").hide();
            //    $("#TextBox" + temp + "1").show();
            //    $("#TextBox" + temp + "2").hide();
            //}
            //else if (str == "Speciality") {
            //    $("#comlon" + temp + "1").val("DropDownList" + temp + "3");
            //    $("#comlon" + temp + "2").val("TextBox" + temp + "1");

            //    $("#DropDownList" + temp + "2").hide();
            //    $("#DropDownList" + temp + "3").show();

            //    $("#ddlKeys" + temp + "1").hide();
            //    $("#ddlKeys" + temp + "2").hide();
            //    $("#ddlKeys" + temp + "3").hide();
            //    $("#ddlKeys" + temp + "4").hide();
            //    $("#ddlKeys" + temp + "5").hide();
            //    $("#ddlKeys" + temp + "6").hide();
            //    $("#ddlKeys" + temp + "7").hide();
            //    $("#ddlKeys" + temp + "8").hide();
            //    $("#ddlKeys" + temp + "9").hide();
            //    $("#ddlKeys" + temp + "10").hide();
            //    $("#ddlKeys" + temp + "11").hide();
            //    $("#ddlKeys" + temp + "12").hide();
            //    $("#TextBox" + temp + "1").show();
            //    $("#TextBox" + temp + "2").hide();
            //}
        else if (str == "WorkType") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "3");
            $("#comlon" + temp + "2").val("ddlKeys" + temp + "12");

            $("#DropDownList" + temp + "2").hide();
            $("#DropDownList" + temp + "3").show();

            $("#ddlKeys" + temp + "1").hide();
            $("#ddlKeys" + temp + "2").hide();
            $("#ddlKeys" + temp + "3").hide();
            $("#ddlKeys" + temp + "4").hide();
            $("#ddlKeys" + temp + "5").hide();
            //$("#ddlKeys" + temp + "6").hide();
            //$("#ddlKeys" + temp + "7").hide();
            //$("#ddlKeys" + temp + "8").hide();
            $("#ddlKeys" + temp + "9").hide();
            $("#ddlKeys" + temp + "10").hide();
            //$("#ddlKeys" + temp + "11").hide();
            $("#ddlKeys" + temp + "12").show();
            $("#ddlKeys" + temp + "13").hide();
            $("#TextBox" + temp + "1").hide();
            $("#TextBox" + temp + "2").hide();

            $("#DropDownList" + temp + "3").val('=');
            $("#DropDownList" + temp + "3").attr('disabled', true);
        }
        else if (str == "OnState") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "3");
            $("#comlon" + temp + "2").val("ddlKeys" + temp + "9");

            $("#DropDownList" + temp + "2").hide();
            $("#DropDownList" + temp + "3").show();

            $("#ddlKeys" + temp + "1").hide();
            $("#ddlKeys" + temp + "2").hide();
            $("#ddlKeys" + temp + "3").hide();
            $("#ddlKeys" + temp + "4").hide();
            $("#ddlKeys" + temp + "5").hide();
            //$("#ddlKeys" + temp + "6").hide();
            //$("#ddlKeys" + temp + "7").hide();
            //$("#ddlKeys" + temp + "8").hide();
            $("#ddlKeys" + temp + "9").show(); ////
            $("#ddlKeys" + temp + "10").hide();
            //$("#ddlKeys" + temp + "11").hide();
            $("#ddlKeys" + temp + "12").hide();
            $("#ddlKeys" + temp + "13").hide();
            $("#TextBox" + temp + "1").hide();
            $("#TextBox" + temp + "2").hide();

            $("#DropDownList" + temp + "3").val('%');
            $("#DropDownList" + temp + "3").attr('disabled', false);
        }
            //else if (str == "Category") {
            //    $("#comlon" + temp + "1").val("DropDownList" + temp + "3");
            //    $("#comlon" + temp + "2").val("ddlKeys" + temp + "10");

            //    $("#DropDownList" + temp + "2").hide();
            //    $("#DropDownList" + temp + "3").show();

            //    $("#ddlKeys" + temp + "1").hide();
            //    $("#ddlKeys" + temp + "2").hide();
            //    $("#ddlKeys" + temp + "3").hide();
            //    $("#ddlKeys" + temp + "4").hide();
            //    $("#ddlKeys" + temp + "5").hide();
            //    $("#ddlKeys" + temp + "6").hide();
            //    $("#ddlKeys" + temp + "7").hide();
            //    $("#ddlKeys" + temp + "8").hide();
            //    $("#ddlKeys" + temp + "9").hide();
            //    $("#ddlKeys" + temp + "10").show(); ///
            //    $("#ddlKeys" + temp + "11").hide();
            //    $("#ddlKeys" + temp + "12").hide();
            //    $("#TextBox" + temp + "1").hide();
            //    $("#TextBox" + temp + "2").hide();
            //}
            //else if (str == "OccupationTitleNum") {
            //    $("#comlon" + temp + "1").val("DropDownList" + temp + "3");
            //    $("#comlon" + temp + "2").val("ddlKeys" + temp + "11");

            //    $("#DropDownList" + temp + "2").hide();
            //    $("#DropDownList" + temp + "3").show();

            //    $("#ddlKeys" + temp + "1").hide();
            //    $("#ddlKeys" + temp + "2").hide();
            //    $("#ddlKeys" + temp + "3").hide();
            //    $("#ddlKeys" + temp + "4").hide();
            //    $("#ddlKeys" + temp + "5").hide();
            //    $("#ddlKeys" + temp + "6").hide();
            //    $("#ddlKeys" + temp + "7").hide();
            //    $("#ddlKeys" + temp + "8").hide();
            //    $("#ddlKeys" + temp + "9").hide();
            //    $("#ddlKeys" + temp + "10").hide();
            //    $("#ddlKeys" + temp + "11").show(); ////
            //    $("#TextBox" + temp + "1").hide();
            //    $("#TextBox" + temp + "2").hide();
            //}
        else if (str == "OutCompanyDate") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "2");
            $("#comlon" + temp + "2").val("TextBox" + temp + "2");

            $("#DropDownList" + temp + "2").show();
            $("#DropDownList" + temp + "3").hide();

            $("#ddlKeys" + temp + "1").hide();
            $("#ddlKeys" + temp + "2").hide();
            $("#ddlKeys" + temp + "3").hide();
            $("#ddlKeys" + temp + "4").hide();
            $("#ddlKeys" + temp + "5").hide();
            //$("#ddlKeys" + temp + "6").hide();
            //$("#ddlKeys" + temp + "7").hide();
            //$("#ddlKeys" + temp + "8").hide();
            $("#ddlKeys" + temp + "9").hide();
            $("#ddlKeys" + temp + "10").hide();
            //$("#ddlKeys" + temp + "11").hide();
            $("#ddlKeys" + temp + "12").hide();
            $("#ddlKeys" + temp + "13").hide();
            $("#TextBox" + temp + "1").hide();
            $("#TextBox" + temp + "2").show();

            $("#DropDownList" + temp + "3").val('%');
            $("#DropDownList" + temp + "3").attr('disabled', false);
        }

            //
        else if (str == "EmployeeSex") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "3");
            $("#comlon" + temp + "2").val("ddlKeys" + temp + "1");

            $("#DropDownList" + temp + "2").hide();
            $("#DropDownList" + temp + "3").show();

            $("#ddlKeys" + temp + "1").show();
            $("#ddlKeys" + temp + "2").hide();
            $("#ddlKeys" + temp + "3").hide();
            $("#ddlKeys" + temp + "4").hide();
            $("#ddlKeys" + temp + "5").hide();
            //$("#ddlKeys" + temp + "6").hide();
            //$("#ddlKeys" + temp + "7").hide();
            //$("#ddlKeys" + temp + "8").hide();
            $("#ddlKeys" + temp + "9").hide();
            $("#ddlKeys" + temp + "10").hide();
            //$("#ddlKeys" + temp + "11").hide();
            $("#ddlKeys" + temp + "12").hide();
            $("#ddlKeys" + temp + "13").hide();
            $("#TextBox" + temp + "1").hide();
            $("#TextBox" + temp + "2").hide();

            $("#DropDownList" + temp + "3").val('%');
            $("#DropDownList" + temp + "3").attr('disabled', false);
        }
        else if (str == "EmployeeBirth") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "2");
            $("#comlon" + temp + "2").val("TextBox" + temp + "2");

            $("#DropDownList" + temp + "2").show();
            $("#DropDownList" + temp + "3").hide();

            $("#ddlKeys" + temp + "1").hide();
            $("#ddlKeys" + temp + "2").hide();
            $("#ddlKeys" + temp + "3").hide();
            $("#ddlKeys" + temp + "4").hide();
            $("#ddlKeys" + temp + "5").hide();
            //$("#ddlKeys" + temp + "6").hide();
            //$("#ddlKeys" + temp + "7").hide();
            //$("#ddlKeys" + temp + "8").hide();
            $("#ddlKeys" + temp + "9").hide();
            $("#ddlKeys" + temp + "10").hide();
            //$("#ddlKeys" + temp + "11").hide();
            $("#ddlKeys" + temp + "12").hide();
            $("#ddlKeys" + temp + "13").hide();
            $("#TextBox" + temp + "1").hide();
            $("#TextBox" + temp + "2").show();

            $("#DropDownList" + temp + "3").val('%');
            $("#DropDownList" + temp + "3").attr('disabled', false);
        }
        else if (str == "GraduateSchool") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "3");
            $("#comlon" + temp + "2").val("TextBox" + temp + "1");

            $("#DropDownList" + temp + "2").hide();
            $("#DropDownList" + temp + "3").show();

            $("#ddlKeys" + temp + "1").hide();
            $("#ddlKeys" + temp + "2").hide();
            $("#ddlKeys" + temp + "3").hide();
            $("#ddlKeys" + temp + "4").hide();
            $("#ddlKeys" + temp + "5").hide();
            //$("#ddlKeys" + temp + "6").hide();
            //$("#ddlKeys" + temp + "7").hide();
            //$("#ddlKeys" + temp + "8").hide();
            $("#ddlKeys" + temp + "9").hide();
            $("#ddlKeys" + temp + "10").hide();
            //$("#ddlKeys" + temp + "11").hide();
            $("#ddlKeys" + temp + "12").hide();
            $("#ddlKeys" + temp + "13").hide();
            $("#TextBox" + temp + "1").show();
            $("#TextBox" + temp + "2").hide();

            $("#DropDownList" + temp + "3").val('%');
            $("#DropDownList" + temp + "3").attr('disabled', false);
        }
        else if (str == "InstitutionNum") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "3");
            $("#comlon" + temp + "2").val("ddlKeys" + temp + "2");

            $("#DropDownList" + temp + "2").hide();
            $("#DropDownList" + temp + "3").show();

            $("#ddlKeys" + temp + "1").hide();
            $("#ddlKeys" + temp + "2").show();
            $("#ddlKeys" + temp + "3").hide();
            $("#ddlKeys" + temp + "4").hide();
            $("#ddlKeys" + temp + "5").hide();
            //$("#ddlKeys" + temp + "6").hide();
            //$("#ddlKeys" + temp + "7").hide();
            //$("#ddlKeys" + temp + "8").hide();
            $("#ddlKeys" + temp + "9").hide();
            $("#ddlKeys" + temp + "10").hide();
            //$("#ddlKeys" + temp + "11").hide();
            $("#ddlKeys" + temp + "12").hide();
            $("#ddlKeys" + temp + "13").hide();
            $("#TextBox" + temp + "1").hide();
            $("#TextBox" + temp + "2").hide();

            $("#DropDownList" + temp + "3").val('%');
            $("#DropDownList" + temp + "3").attr('disabled', false);
        }

        else if (str == "CurrentWorkNum") {

            $("#comlon" + temp + "1").val("DropDownList" + temp + "3");
            $("#comlon" + temp + "2").val("ddlKeys" + temp + "3");

            $("#DropDownList" + temp + "2").hide();
            $("#DropDownList" + temp + "3").show();

            $("#ddlKeys" + temp + "1").hide();
            $("#ddlKeys" + temp + "2").hide();
            $("#ddlKeys" + temp + "3").show();
            $("#ddlKeys" + temp + "4").hide();
            $("#ddlKeys" + temp + "5").hide();
            //$("#ddlKeys" + temp + "6").hide();
            //$("#ddlKeys" + temp + "7").hide();
            //$("#ddlKeys" + temp + "8").hide();
            $("#ddlKeys" + temp + "9").hide();
            $("#ddlKeys" + temp + "10").hide();
            //$("#ddlKeys" + temp + "11").hide();
            $("#ddlKeys" + temp + "12").hide();
            $("#ddlKeys" + temp + "13").hide();
            $("#TextBox" + temp + "1").hide();
            $("#TextBox" + temp + "2").hide();

            $("#DropDownList" + temp + "3").val('=');
            $("#DropDownList" + temp + "3").attr('disabled', true);
        }
        else if (str == "WorkStyleNum") {

            $("#comlon" + temp + "1").val("DropDownList" + temp + "3");
            $("#comlon" + temp + "2").val("ddlKeys" + temp + "4");

            $("#DropDownList" + temp + "2").hide();
            $("#DropDownList" + temp + "3").show();

            $("#ddlKeys" + temp + "1").hide();
            $("#ddlKeys" + temp + "2").hide();
            $("#ddlKeys" + temp + "3").hide();
            $("#ddlKeys" + temp + "4").show();
            $("#ddlKeys" + temp + "5").hide();
            //$("#ddlKeys" + temp + "6").hide();
            //$("#ddlKeys" + temp + "7").hide();
            //$("#ddlKeys" + temp + "8").hide();
            $("#ddlKeys" + temp + "9").hide();
            $("#ddlKeys" + temp + "10").hide();
            //$("#ddlKeys" + temp + "11").hide();
            $("#ddlKeys" + temp + "12").hide();
            $("#ddlKeys" + temp + "13").hide();
            $("#TextBox" + temp + "1").hide();
            $("#TextBox" + temp + "2").hide();

            $("#DropDownList" + temp + "3").val('=');
            $("#DropDownList" + temp + "3").attr('disabled', true);
        }
        else if (str == "WorkPositionNum") {

            $("#comlon" + temp + "1").val("DropDownList" + temp + "3");
            $("#comlon" + temp + "2").val("ddlKeys" + temp + "5");

            $("#DropDownList" + temp + "2").hide();
            $("#DropDownList" + temp + "3").show();

            $("#ddlKeys" + temp + "1").hide();
            $("#ddlKeys" + temp + "2").hide();
            $("#ddlKeys" + temp + "3").hide();
            $("#ddlKeys" + temp + "4").hide();
            $("#ddlKeys" + temp + "5").show();
            //$("#ddlKeys" + temp + "6").hide();
            //$("#ddlKeys" + temp + "7").hide();
            //$("#ddlKeys" + temp + "8").hide();
            $("#ddlKeys" + temp + "9").hide();
            $("#ddlKeys" + temp + "10").hide();
            //$("#ddlKeys" + temp + "11").hide();
            $("#ddlKeys" + temp + "12").hide();
            $("#ddlKeys" + temp + "13").hide();
            $("#TextBox" + temp + "1").hide();
            $("#TextBox" + temp + "2").hide();

            $("#DropDownList" + temp + "3").val('=');
            $("#DropDownList" + temp + "3").attr('disabled', true);
        }
            //else if (str == "TechnicalTitleNum") {

            //    $("#comlon" + temp + "1").val("DropDownList" + temp + "3");
            //    $("#comlon" + temp + "2").val("ddlKeys" + temp + "6");

            //    $("#DropDownList" + temp + "2").hide();
            //    $("#DropDownList" + temp + "3").show();

            //    $("#ddlKeys" + temp + "1").hide();
            //    $("#ddlKeys" + temp + "2").hide();
            //    $("#ddlKeys" + temp + "3").hide();
            //    $("#ddlKeys" + temp + "4").hide();
            //    $("#ddlKeys" + temp + "5").hide();
            //    $("#ddlKeys" + temp + "6").show();
            //    $("#ddlKeys" + temp + "7").hide();
            //    $("#ddlKeys" + temp + "8").hide();
            //    $("#ddlKeys" + temp + "9").hide();
            //    $("#ddlKeys" + temp + "10").hide();
            //    $("#ddlKeys" + temp + "11").hide();
            //    $("#ddlKeys" + temp + "12").hide();
            //    $("#TextBox" + temp + "1").hide();
            //    $("#TextBox" + temp + "2").hide();
            //}
            //else if (str == "StudyExperienceNum") {

            //    $("#comlon" + temp + "1").val("DropDownList" + temp + "3");
            //    $("#comlon" + temp + "2").val("ddlKeys" + temp + "7");

            //    $("#DropDownList" + temp + "2").hide();
            //    $("#DropDownList" + temp + "3").show();

            //    $("#ddlKeys" + temp + "1").hide();
            //    $("#ddlKeys" + temp + "2").hide();
            //    $("#ddlKeys" + temp + "3").hide();
            //    $("#ddlKeys" + temp + "4").hide();
            //    $("#ddlKeys" + temp + "5").hide();
            //    $("#ddlKeys" + temp + "6").hide();
            //    $("#ddlKeys" + temp + "7").show();
            //    $("#ddlKeys" + temp + "8").hide();
            //    $("#ddlKeys" + temp + "9").hide();
            //    $("#ddlKeys" + temp + "10").hide();
            //    $("#ddlKeys" + temp + "11").hide();
            //    $("#ddlKeys" + temp + "12").hide();
            //    $("#TextBox" + temp + "1").hide();
            //    $("#TextBox" + temp + "2").hide();
            //}
            //else if (str == "DegreeNum") {

            //    $("#comlon" + temp + "1").val("DropDownList" + temp + "3");
            //    $("#comlon" + temp + "2").val("ddlKeys" + temp + "8");

            //    $("#DropDownList" + temp + "2").hide();
            //    $("#DropDownList" + temp + "3").show();

            //    $("#ddlKeys" + temp + "1").hide();
            //    $("#ddlKeys" + temp + "2").hide();
            //    $("#ddlKeys" + temp + "3").hide();
            //    $("#ddlKeys" + temp + "4").hide();
            //    $("#ddlKeys" + temp + "5").hide();
            //    $("#ddlKeys" + temp + "6").hide();
            //    $("#ddlKeys" + temp + "7").hide();
            //    $("#ddlKeys" + temp + "8").show();
            //    $("#ddlKeys" + temp + "9").hide();
            //    $("#ddlKeys" + temp + "10").hide();
            //    $("#ddlKeys" + temp + "11").hide();
            //    $("#ddlKeys" + temp + "12").hide();
            //    $("#TextBox" + temp + "1").hide();
            //    $("#TextBox" + temp + "2").hide();
            //}
        else if (str == "JoinCompanyDate") {

            $("#comlon" + temp + "1").val("DropDownList" + temp + "2");
            $("#comlon" + temp + "2").val("TextBox" + temp + "2");

            $("#DropDownList" + temp + "2").show();
            $("#DropDownList" + temp + "3").hide();

            $("#ddlKeys" + temp + "1").hide();
            $("#ddlKeys" + temp + "2").hide();
            $("#ddlKeys" + temp + "3").hide();
            $("#ddlKeys" + temp + "4").hide();
            $("#ddlKeys" + temp + "5").hide();
            //$("#ddlKeys" + temp + "6").hide();
            //$("#ddlKeys" + temp + "7").hide();
            //$("#ddlKeys" + temp + "8").hide();
            $("#ddlKeys" + temp + "9").hide();
            $("#ddlKeys" + temp + "10").hide();
            //$("#ddlKeys" + temp + "11").hide();
            $("#ddlKeys" + temp + "12").hide();
            $("#ddlKeys" + temp + "13").hide();
            $("#TextBox" + temp + "1").hide();
            $("#TextBox" + temp + "2").show();

            $("#DropDownList" + temp + "3").val('%');
            $("#DropDownList" + temp + "3").attr('disabled', false);
        }
        else if (str == "InStationDate") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "2"); //设置条件选中，2对应大于小于等于，3对应like或=
            $("#comlon" + temp + "2").val("TextBox" + temp + "2"); //设置值选中,就是下面的输入框是显示的那种 1为普通输入框 2为日期输入框

            $("#DropDownList" + temp + "2").show(); //大于类
            $("#DropDownList" + temp + "3").hide(); //包含

            $("#ddlKeys" + temp + "1").hide(); //下拉框
            $("#ddlKeys" + temp + "2").hide();
            $("#ddlKeys" + temp + "3").hide();
            $("#ddlKeys" + temp + "4").hide();
            $("#ddlKeys" + temp + "5").hide();
            //$("#ddlKeys" + temp + "6").hide();
            //$("#ddlKeys" + temp + "7").hide();
            //$("#ddlKeys" + temp + "8").hide();
            $("#ddlKeys" + temp + "9").hide();
            $("#ddlKeys" + temp + "10").hide();
            //$("#ddlKeys" + temp + "11").hide();
            $("#ddlKeys" + temp + "12").hide();
            $("#ddlKeys" + temp + "13").hide();

            $("#TextBox" + temp + "1").hide(); //文本框
            $("#TextBox" + temp + "2").show(); //日历文本框

            $("#DropDownList" + temp + "3").val('%');
            $("#DropDownList" + temp + "3").attr('disabled', false);
        }
        else if (str == "OutStationDate") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "2"); //设置条件选中，2对应大于小于等于，3对应like或=
            $("#comlon" + temp + "2").val("TextBox" + temp + "2"); //设置值选中,就是下面的输入框是显示的那种 1为普通输入框 2为日期输入框

            $("#DropDownList" + temp + "2").show(); //大于类
            $("#DropDownList" + temp + "3").hide(); //包含

            $("#ddlKeys" + temp + "1").hide(); //下拉框
            $("#ddlKeys" + temp + "2").hide();
            $("#ddlKeys" + temp + "3").hide();
            $("#ddlKeys" + temp + "4").hide();
            $("#ddlKeys" + temp + "5").hide();
            //$("#ddlKeys" + temp + "6").hide();
            //$("#ddlKeys" + temp + "7").hide();
            //$("#ddlKeys" + temp + "8").hide();
            $("#ddlKeys" + temp + "9").hide();
            $("#ddlKeys" + temp + "10").hide();
            //$("#ddlKeys" + temp + "11").hide();
            $("#ddlKeys" + temp + "12").hide();
            $("#ddlKeys" + temp + "13").hide();

            $("#TextBox" + temp + "1").hide(); //文本框
            $("#TextBox" + temp + "2").show(); //日历文本框

            $("#DropDownList" + temp + "3").val('%');
            $("#DropDownList" + temp + "3").attr('disabled', false);
        }
        else if (str == "OutCompanyOrNot") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "3"); //设置条件选中，2对应大于小于等于，3对应like或=
            $("#comlon" + temp + "2").val("ddlKeys" + temp + "13"); //设置值选中,就是下面的输入框是显示的那种 1为普通输入框 2为日期输入框

            $("#DropDownList" + temp + "2").hide(); //大于类
            $("#DropDownList" + temp + "3").show(); //包含

            $("#ddlKeys" + temp + "1").hide(); //下拉框
            $("#ddlKeys" + temp + "2").hide();
            $("#ddlKeys" + temp + "3").hide();
            $("#ddlKeys" + temp + "4").hide();
            $("#ddlKeys" + temp + "5").hide();
            //$("#ddlKeys" + temp + "6").hide();
            //$("#ddlKeys" + temp + "7").hide();
            //$("#ddlKeys" + temp + "8").hide();
            $("#ddlKeys" + temp + "9").hide();
            $("#ddlKeys" + temp + "10").hide();
            //$("#ddlKeys" + temp + "11").hide();
            $("#ddlKeys" + temp + "12").hide();
            $("#ddlKeys" + temp + "13").show();

            $("#TextBox" + temp + "1").hide(); //文本框
            $("#TextBox" + temp + "2").hide(); //日历文本框

            $("#DropDownList" + temp + "3").val('%');
            $("#DropDownList" + temp + "3").attr('disabled', false);
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
            //$("#ddlKeys" + temp + "6").hide();
            //$("#ddlKeys" + temp + "7").hide();
            //$("#ddlKeys" + temp + "8").hide();
            $("#ddlKeys" + temp + "9").hide();
            $("#ddlKeys" + temp + "10").hide();
            //$("#ddlKeys" + temp + "11").hide();
            $("#ddlKeys" + temp + "12").hide();
            $("#ddlKeys" + temp + "13").hide();
            $("#TextBox" + temp + "1").show();
            $("#TextBox" + temp + "2").hide();
            $("#TextBox" + temp + "1").attr("value", "");

            $("#DropDownList" + temp + "3").val('%');
            $("#DropDownList" + temp + "3").attr('disabled', false);
        }
    }


    /*查询的Js结束*/

    //为选中行添加高亮
    $('.radio').click(function () {
        $(this).parent().parent().addClass('selected');
        $(this).parent().parent().siblings().removeClass('selected');
    });

    var speAndSecRight = getQueryString("SpeAndSecRight")   //如果从员工关联信息页面跳过来，获取特种和安全证书的权限，用于specialandsecurity页面

    $("#first").click(function () {
        txt_show == "1"
        $('#txt_show').val("1")
        //设置第二个不选中，第以个选中

        $('#second').removeClass('current');
        $('#first').addClass('current');

        $('#FirstMenu').hide();
        $('#secondMenu').hide();
        $('#none').hide();

        if ($("#specialSumID").val() != 0) {
            $('#FirstMenu').show();
        }
        else {
            $('#none').show();
        }

        if (speAndSecRight.search("special") == -1 && speAndSecRight != "") {       //从员工关联信息页面跳转过来，用来限制是否有权限查看对应信息
            $('#FirstMenu').hide();
            $('#secondMenu').hide();
            $('#noRight').show();
        }
        else
            $('#noRight').hide();
    })
    $("#second").click(function () {
        txt_show == "2"
        $('#txt_show').val("2")
        $('#first').removeClass('current');
        $('#second').addClass('current');

        $('#FirstMenu').hide();
        $('#secondMenu').hide();
        $('#none').hide();
        if ($("#securitySumID").val() != 0)
            $('#secondMenu').show();
        else {
            $('#none').show();
        }

        if (speAndSecRight.search("security") == -1 && speAndSecRight != "") {       //从员工关联信息页面跳转过来，用来限制是否有权限查看对应信息
            $('#FirstMenu').hide();
            $('#secondMenu').hide();
            $('#noRight').show();
        }
        else
            $('#noRight').hide();
    })

    //选项卡制作
    var $div_menu = $('div.tab_menu ul li');
    var txt_show = $('#txt_show').val();
    $div_menu.click(function () {
        //alert(123);
        $(this).addClass('current')
				.siblings().removeClass('current');
        //var index = $div_menu.index(this);
        //$('div.tab_box > div')
		//	.eq(index).show()
		//	.siblings().hide();

    });
    var txt_show = $('#txt_show').val();
    //alert(txt_show);
    if (txt_show == "2") {
        //设置第一个不选中，第二个选中
        $('#txt_show').val("2")
        $('#first').removeClass('current');
        $('#second').addClass('current');

        $('#FirstMenu').hide();
        $('#secondMenu').hide();
        $('#none').hide();

        if ($("#securitySumID").val() != 0)
            $('#secondMenu').show();
        else
            $('#none').show();

        if (speAndSecRight.search("security") == -1 && speAndSecRight != "") {       //从员工关联信息页面跳转过来，用来限制是否有权限查看对应信息
            $('#FirstMenu').hide();
            $('#secondMenu').hide();
            $('#noRight').show();
        }
        else
            $('#noRight').hide();
    }
    if (txt_show == "1") {
        //设置第二个不选中，第以个选中
        $('#txt_show').val("1")

        $('#second').removeClass('current');
        $('#first').addClass('current');

        console.log($("#specialSumID").val() + " dwwsdfse")

        $('#FirstMenu').hide();
        $('#secondMenu').hide();
        $('#none').hide();
        if ($("#specialSumID").val() != 0) {
            $('#FirstMenu').show();
        }
        else
            $('#none').show();

        if (speAndSecRight.search("special") == -1 && speAndSecRight != "") {       //从员工关联信息页面跳转过来，用来限制是否有权限查看对应信息
            $('#FirstMenu').hide();
            $('#secondMenu').hide();
            $('#noRight').show();
        }
        else
            $('#noRight').hide();
    }

    /*添加层的显示*/
    $("#iframePopAdd").click(function () {
        return qBox.iFLoad({ title: '添加承包单位员工信息', src: 'ContractorEmployeeAdd.aspx', w: 740, h: 620 });
    });

    /*详细层的显示*/
    $("#iframePopDetail").click(function () {
        var employeeNum = $("input[.radio][checked]").val(); //获取单选按钮
        if (employeeNum != undefined) {
            return qBox.iFLoad({ title: '承包单位员工详细信息', src: 'ContractorEmployeeDetail.aspx?employeeNum=' + employeeNum + '&rdom=' + Math.random() + '&fatherCookie=' + getHtmlDocName(), w: 740, h: 620 });
        }
        else {
            alert("请选择您要查看的记录，点击单选按钮选中！");
            return false;
        }
    });

    /*修改层的显示*/
    $("#iframePopEdit").click(function () {
        var employeeNum = $("input[.radio][checked]").val(); //获取单选按钮
        if (employeeNum != undefined) {
            return qBox.iFLoad({ title: '修改承包单位员工信息', src: 'ContractorEmployeeEdit.aspx?employeeNum=' + employeeNum + '&rdom=' + Math.random(), w: 740, h: 620 });
        }
        else {
            alert("请选择您要修改的记录，点击单选按钮选中！");
            return false;
        }
    });

    ///*删除点击提交的事件*/
    //$('#delete').click(function () {
    //    var employeeNum = $("input[.radio][checked]").val(); //获取单选按钮
    //    if (employeeNum != undefined) {
    //        //执行删除操作
    //        /*获取变量，并进行删除处理，异步进行，先删除数据库，然后回调函数删除页面上的一行*/
    //        if (confirm("您确定要删除吗?")) {
    //            $.post("dataProcess.ashx", { op: "Employee_T", employeeNum: employeeNum, rdom: Math.random() }, function (data) {
    //                if (data == "") {
    //                    $("#tr_" + employeeNum).remove();
    //                }
    //            });
    //        }

    //    }
    //    else {
    //        alert("请选择您要删除的记录，点击单选按钮选中！");
    //        return false;
    //    }
    //});

    /*显示特种人员信息和安全人员信息的显示*/
    $("#iframePopSpeSec").click(function () {
        var employeeNum = $("input[.radio][checked]").val(); //获取单选按钮
        var employeeName = $("input[.radio][checked]").siblings('.employeeName').val();
        if (employeeNum != undefined) {
            return qBox.iFLoad({ title: '承包单位员工证书信息', src: 'specialAndSecurityConEmployee.aspx?employeeNum=' + employeeNum + '&employeeName=' + employeeName + '&rdom=' + Math.random(), w: 740, h: 580 });
        }
        else {
            alert("请选择您要查看的记录，点击单选按钮选中！");
            return false;
        }
    });

    /*培训信息的显示*/
    $("#iframePopEdu").click(function () {
        var employeeNum = $("input[.radio][checked]").val(); //获取单选按钮
        var employeeName = $("input[.radio][checked]").siblings('.employeeName').val();
        if (employeeNum != undefined) {
            return qBox.iFLoad({ title: '承包单位员工教育培训经历', src: 'employeeEducationInfo.aspx?employeeNum=' + employeeNum + '&employeeName=' + employeeName + '&rdom=' + Math.random(), w: 963, h: 280 });
        }
        else {
            alert("请选择您要查看的记录，点击单选按钮选中！");
            return false;
        }
    });

    /*重置按钮*/
    $('#btnResetEmp').click(function () {
        $('#txt_employeeBirth').attr("value", "");
        $('#txt_employeeIDNum').attr("value", "");
        $('#txt_employeeName').attr("value", "");
        $('#txt_employeeNative').attr("value", "");
        $('#txt_employeeNumAdd').attr("value", "");
        $('#txt_employeeTel').attr("value", "");
        $('#txt_Encouragement').attr("value", "");
        $('#txt_GraduateSchool').attr("value", "");
        $('#txt_HomeAddress').attr("value", "");
        $('#txt_InStationDate').attr("value", "");
        $('#txt_JoinCompanyDate1').attr("value", "");
        $('#txt_OutComanyDate').attr("value", "");
        $('#txt_OutStationDate').attr("value", "");
        $('#txt_Speciality').attr("value", "");
        $('#txt_UrgentLinkman').attr("value", "");
        $('#txt_UrgentLinkmanTel').attr("value", "");
        $('#txt_WorkType').val("");
        $('#txt_WoundRecord').attr("value", "");
        $('#txt_onstate').val('0');
        $('#txt_employeeSex').val('男');
        $('#txt_InstitutionNum').val('');
        $('#txt_WorkStyleNum').val('');
        $('#txt_WorkPositionNum').val('');
        $('#txt_CurrentWorkNum').val('');
        $('#txt_Category').val('');
        $('#txt_OccupationTitleNum').val('');
        $('#txt_TechnicalTitleNum').val('');
        $('#txt_DegreeNum').val('');
        $('#txt_StudyExperienceNum').val('');
        $('#userImage').attr('ImageUrl', '');
        $('#finishedTips').text(''); //清除提示条
        $('#txt_IdentityID').attr("value", "");

        $('#ThreeFlag').attr("value", "2");
        $('#finishedTips').attr("value", "");

    });

    /**从身份证号中提取出生日期*/
    $('#txt_employeeIDNum').change(function () {
        var idNum = $(this).val();
        if (idNum != undefined) {
            if (idNum.length == "18")//18位身份证号码
            {
                var iddate = idNum.substring(6, 14);
                //alert(iddate);
                var birth = iddate.substring(0, 4) + '-' + iddate.substring(4, 6) + '-' + iddate.substring(6, 8);
                //alert(birth);
                $('#txt_employeeBirth').attr("value", birth);
            }
            else if (idNum.length == "15")//15位身份证号码
            {
                var iddate = idNum.substring(6, 12);
                //alert(iddate);
                var birth = '19' + iddate.substring(0, 2) + '-' + iddate.substring(2, 4) + '-' + iddate.substring(4, 6);
                //alert(birth);
                $('#txt_employeeBirth').attr("value", birth);
            }
            else {
            }

        }
        else {

        }
    });


    /*验证员工编号*/
    $('#txt_employeeNumAdd').change(function () {
        var employeeNum = $(this).val();
        if (employeeNum != undefined && employeeNum != "") {//员工编号已填写
            $.post("dataProcess.ashx", { op: "txt_employeeConNum", employeeNum: employeeNum, rdom: Math.random() }, function (data) {
                if (data == "") {
                    //alert("员工编号不存在，可以添加！");
                }
                else {
                    alert("公司或承包单位员工编号" + employeeNum + "已存在！");
                    $('#txt_employeeNumAdd').attr("value", "");
                    return false;
                }
            });
        }
        else {

        }
    });


    /**在添加一个新员工的时候，进公司日期弹出提示，是否添加三级安全教育*/
    $('#txt_JoinCompanyDate1').focus(function () {
        var joindate = $(this).val();
        var employeeNum = $('#txt_employeeNumAdd').val();
        if (joindate != undefined && joindate != "") {
            if (employeeNum != undefined && employeeNum != "") {
                if (confirm("确定添加三级安全教育培训？")) {
                    $('#ThreeFlag').attr("value", "2");  // 2 表示添加三级安全教育培训
                    $('#txt_onstate').focus();
                    return false;
                } else {
                    alert('不添加培训');
                    $('#ThreeFlag').attr("value", "1"); // 1 表示不添加三级安全教育培训
                    $('#txt_onstate').focus();
                    return false;
                }
            }
            else {

                alert("请先填写员工编号！");
                $(this).attr("value", "");
                $('#txt_employeeNumAdd').focus();
                return false;
            }
        }
        else {

        }
    });



    /*当前岗位变化的时候，添加调岗记录 txt_WorkPositionNum**/
    $('#txt_WorkPositionNum1').change(function () {
        var currentWork = $('#currentWork').val();
        var changeWork = $('#txt_WorkPositionNum1').val();
        var employeeNum = $('#txt_employeeNum').val();
        if (currentWork != "" && currentWork != changeWork && changeWork != "") {
            //调换岗位，添加调岗记录
            //alert("调换岗位，添加调岗记录");
            //当前岗位和改变岗位不同，添加调岗记录//if (currentWork != changeWork) {

            if (confirm("确定添加调换岗位教育培训？")) {
                //添加调岗记录
                $('#changePosition').attr("value", "1"); //表示添加调岗信息
            }
            else {
                $('#changePosition').attr("value", "0"); //表示不添加调岗信息
                return false;
            }

        }
        else {

        }
    });


    /**是否添加复工培训，这个是调入日期的填写*/
    $('#txt_InStationDateE').focus(function () {
        var inStation = $(this).val();
        var employeeNum = $('#txt_employeeNum').val();
        if (inStation != undefined && inStation != "") {
            if (confirm("确定添加复工教育培训？")) {
                $('#txt_onstate').val('0'); //添加了复工培训的，应该为离岗状态，他的复工培训合格后，在修改为在岗状态
                //进入添加复工教育培训
                $('#reWork').attr("value", "1"); //添加复工培训
            }
            else {
                //不添加复工培训计划，岗位状态为在岗，但是在后台将调入，调离日期清空
                $('#reWork').attr("value", "0"); //不添加复工培训
                $('#txt_onstate').val('1'); //不添加复工培训,则岗位状态为在岗
                $('#txt_Encouragement').focus();
            }
        }
        else {
            //空
        }
    });
    /**这个是调离日期的填写*/
    $('#txt_OutStationDateE').focus(function () {
        var outStation = $(this).val();
        if (outStation != undefined && outStation != "") {
            $('#txt_onstate').val('0');
        }
        else {
            //空
        }
    });

    /*验证下井的员工编号*/
    $('#txt_IdentityID').change(function () {
        var identityID = $(this).val();
        if (identityID != undefined && identityID != "") {//员工编号已填写
            $.post("dataProcess.ashx", { op: "txt_identityID", identityID: identityID, rdom: Math.random() }, function (data) {
                if (data == "") {
                    //alert("员工编号不存在，可以添加！");
                }
                else {
                    alert("下井员工编号" + identityID + "已存在！");
                    $('#txt_IdentityID').attr("value", "");
                    return false;
                }
            });
        }
        else {

        }
    });


})

