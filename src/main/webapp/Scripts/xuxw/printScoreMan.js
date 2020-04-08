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
            $("#TextBox" + temp + "1").show(); //文本框
            $("#TextBox" + temp + "2").hide(); //日历文本框
        }

        else if (str == "EmployeeName") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "3");
            $("#comlon" + temp + "2").val("TextBox" + temp + "1");

            $("#DropDownList" + temp + "2").hide();
            $("#DropDownList" + temp + "3").show();

            $("#ddlKeys" + temp + "1").hide();
            $("#ddlKeys" + temp + "2").hide();
            $("#ddlKeys" + temp + "3").hide();
            $("#TextBox" + temp + "1").show();
            $("#TextBox" + temp + "2").hide();
        }
        else if (str == "EducationNum") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "3");
            $("#comlon" + temp + "2").val("TextBox" + temp + "1");

            $("#DropDownList" + temp + "2").hide();
            $("#DropDownList" + temp + "3").show();

            $("#ddlKeys" + temp + "1").hide();
            $("#ddlKeys" + temp + "2").hide();
            $("#ddlKeys" + temp + "3").hide();
            $("#TextBox" + temp + "1").show();
            $("#TextBox" + temp + "2").hide();
        }
        else if (str == "EducationName") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "3");
            $("#comlon" + temp + "2").val("TextBox" + temp + "1");

            $("#DropDownList" + temp + "2").hide();
            $("#DropDownList" + temp + "3").show();

            $("#ddlKeys" + temp + "1").hide();
            $("#ddlKeys" + temp + "2").hide();
            $("#ddlKeys" + temp + "3").hide();
            $("#TextBox" + temp + "1").show();
            $("#TextBox" + temp + "2").hide();
        }

        else if (str == "EducationCategoryNum") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "3");
            $("#comlon" + temp + "2").val("ddlKeys" + temp + "1");

            $("#DropDownList" + temp + "2").hide();
            $("#DropDownList" + temp + "3").show();

            $("#ddlKeys" + temp + "1").show();
            $("#ddlKeys" + temp + "2").hide();
            $("#ddlKeys" + temp + "3").hide();
            $("#TextBox" + temp + "1").hide();
            $("#TextBox" + temp + "2").hide();
        }

        else if (str == "ScoreMode") {

            $("#comlon" + temp + "1").val("DropDownList" + temp + "3");
            $("#comlon" + temp + "2").val("ddlKeys" + temp + "2");

            $("#DropDownList" + temp + "2").hide();
            $("#DropDownList" + temp + "3").show();

            $("#ddlKeys" + temp + "1").hide();
            $("#ddlKeys" + temp + "2").show();
            $("#ddlKeys" + temp + "3").hide();
            $("#TextBox" + temp + "1").hide();
            $("#TextBox" + temp + "2").hide();
        }
        else if (str == "EducationStartTime") {

            $("#comlon" + temp + "1").val("DropDownList" + temp + "2");
            $("#comlon" + temp + "2").val("TextBox" + temp + "2");

            $("#DropDownList" + temp + "2").show();
            $("#DropDownList" + temp + "3").hide();

            $("#ddlKeys" + temp + "1").hide();
            $("#ddlKeys" + temp + "2").hide();
            $("#ddlKeys" + temp + "3").hide();
            $("#TextBox" + temp + "1").hide();
            $("#TextBox" + temp + "2").show();
        }
        else if (str == "EducationEndTime") {

            $("#comlon" + temp + "1").val("DropDownList" + temp + "2");
            $("#comlon" + temp + "2").val("TextBox" + temp + "2");

            $("#DropDownList" + temp + "2").show();
            $("#DropDownList" + temp + "3").hide();

            $("#ddlKeys" + temp + "1").hide();
            $("#ddlKeys" + temp + "2").hide();
            $("#ddlKeys" + temp + "3").hide();
            $("#TextBox" + temp + "1").hide();
            $("#TextBox" + temp + "2").show();
        }
        else if (str == "EducationPeriod") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "2");
            $("#comlon" + temp + "2").val("TextBox" + temp + "1");

            $("#DropDownList" + temp + "2").show();
            $("#DropDownList" + temp + "3").hide();

            $("#ddlKeys" + temp + "1").hide();
            $("#ddlKeys" + temp + "2").hide();
            $("#ddlKeys" + temp + "3").hide();
            $("#TextBox" + temp + "1").show();
            $("#TextBox" + temp + "2").hide();
        }
        else if (str == "EducationType") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "3");
            $("#comlon" + temp + "2").val("ddlKeys" + temp + "3");

            $("#DropDownList" + temp + "2").hide();
            $("#DropDownList" + temp + "3").show();

            $("#ddlKeys" + temp + "1").hide();
            $("#ddlKeys" + temp + "2").hide();
            $("#ddlKeys" + temp + "3").show();
            $("#TextBox" + temp + "1").hide();
            $("#TextBox" + temp + "2").hide();
        }
        else if (str == "Grade") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "2");
            $("#comlon" + temp + "2").val("TextBox" + temp + "1");

            $("#DropDownList" + temp + "2").show();
            $("#DropDownList" + temp + "3").hide();

            $("#ddlKeys" + temp + "1").hide();
            $("#ddlKeys" + temp + "2").hide();
            $("#ddlKeys" + temp + "3").hide();
            $("#TextBox" + temp + "1").show();
            $("#TextBox" + temp + "2").hide();
        }
        else if (str == "MakeupGrade") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "2");
            $("#comlon" + temp + "2").val("TextBox" + temp + "1");

            $("#DropDownList" + temp + "2").show();
            $("#DropDownList" + temp + "3").hide();

            $("#ddlKeys" + temp + "1").hide();
            $("#ddlKeys" + temp + "2").hide();
            $("#ddlKeys" + temp + "3").hide();
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

    /**打印三级安全教育成绩**/
    $('#printThreeEdu').click(function () {
        var educationNum = $("input[.radio][checked]").val(); //获取单选按钮
        var employeeNum = $("input[.radio][checked]").siblings('#EmployeeNum').val();
        var CategoryValue = $("input[.radio][checked]").siblings('#CategoryValue').val();
        //alert(educationNum + '-' + employeeNum);
        if (educationNum != undefined && educationNum != "") {
            if (CategoryValue == "三级安全教育(厂、矿级)*") {
                return qBox.iFLoad({ title: '打印培训成绩', src: 'eduThreeWordOper.aspx?educationNum=' + educationNum + "&employeeNum=" + employeeNum + '&rdom=' + Math.random(), w: 700, h: 415 });
            } else {
                alert("请选择三级安全教育(厂、矿级)*进行打印！");
                return false;
            }
        }
        else {
            alert("请选择您要打印的员工！");
            return false;
        }
    });
})