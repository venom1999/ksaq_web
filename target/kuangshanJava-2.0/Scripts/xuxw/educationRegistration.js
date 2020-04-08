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
            $("#ddlKeys" + temp + "6").hide();
            $("#ddlKeys" + temp + "7").hide();
            $("#ddlKeys" + temp + "8").hide();
            $("#ddlKeys" + temp + "9").hide();
            $("#ddlKeys" + temp + "10").hide();
            $("#ddlKeys" + temp + "11").hide();
            $("#ddlKeys" + temp + "12").hide();

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
        }
        // add
        else if (str == "EmployeeNative") {
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
        }
        else if (str == "Speciality") {
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
        }
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
            $("#ddlKeys" + temp + "6").hide();
            $("#ddlKeys" + temp + "7").hide();
            $("#ddlKeys" + temp + "8").hide();
            $("#ddlKeys" + temp + "9").hide();
            $("#ddlKeys" + temp + "10").hide();
            $("#ddlKeys" + temp + "11").hide();
            $("#ddlKeys" + temp + "12").show();
            $("#TextBox" + temp + "1").hide();
            $("#TextBox" + temp + "2").hide();
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
            $("#ddlKeys" + temp + "6").hide();
            $("#ddlKeys" + temp + "7").hide();
            $("#ddlKeys" + temp + "8").hide();
            $("#ddlKeys" + temp + "9").show(); ////
            $("#ddlKeys" + temp + "10").hide();
            $("#ddlKeys" + temp + "11").hide();
            $("#ddlKeys" + temp + "12").hide();
            $("#TextBox" + temp + "1").hide();
            $("#TextBox" + temp + "2").hide();
        }
        else if (str == "Category") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "3");
            $("#comlon" + temp + "2").val("ddlKeys" + temp + "10");

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
            $("#ddlKeys" + temp + "10").show(); ///
            $("#ddlKeys" + temp + "11").hide();
            $("#ddlKeys" + temp + "12").hide();
            $("#TextBox" + temp + "1").hide();
            $("#TextBox" + temp + "2").hide();
        }
        else if (str == "OccupationTitleNum") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "3");
            $("#comlon" + temp + "2").val("ddlKeys" + temp + "11");

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
            $("#ddlKeys" + temp + "11").show(); ////
            $("#TextBox" + temp + "1").hide();
            $("#TextBox" + temp + "2").hide();
        }
        else if (str == "OutComanyDate") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "2");
            $("#comlon" + temp + "2").val("TextBox" + temp + "2");

            $("#DropDownList" + temp + "2").show();
            $("#DropDownList" + temp + "3").hide();

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
            $("#TextBox" + temp + "1").hide();
            $("#TextBox" + temp + "2").show();
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
            $("#ddlKeys" + temp + "6").hide();
            $("#ddlKeys" + temp + "7").hide();
            $("#ddlKeys" + temp + "8").hide();
            $("#ddlKeys" + temp + "9").hide();
            $("#ddlKeys" + temp + "10").hide();
            $("#ddlKeys" + temp + "11").hide();
            $("#ddlKeys" + temp + "12").hide();
            $("#TextBox" + temp + "1").hide();
            $("#TextBox" + temp + "2").hide();
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
            $("#ddlKeys" + temp + "6").hide();
            $("#ddlKeys" + temp + "7").hide();
            $("#ddlKeys" + temp + "8").hide();
            $("#ddlKeys" + temp + "9").hide();
            $("#ddlKeys" + temp + "10").hide();
            $("#ddlKeys" + temp + "11").hide();
            $("#ddlKeys" + temp + "12").hide();
            $("#TextBox" + temp + "1").hide();
            $("#TextBox" + temp + "2").show();
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
            $("#ddlKeys" + temp + "6").hide();
            $("#ddlKeys" + temp + "7").hide();
            $("#ddlKeys" + temp + "8").hide();
            $("#ddlKeys" + temp + "9").hide();
            $("#ddlKeys" + temp + "10").hide();
            $("#ddlKeys" + temp + "11").hide();
            $("#ddlKeys" + temp + "12").hide();
            $("#TextBox" + temp + "1").show();
            $("#TextBox" + temp + "2").hide();
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
            $("#ddlKeys" + temp + "6").hide();
            $("#ddlKeys" + temp + "7").hide();
            $("#ddlKeys" + temp + "8").hide();
            $("#ddlKeys" + temp + "9").hide();
            $("#ddlKeys" + temp + "10").hide();
            $("#ddlKeys" + temp + "11").hide();
            $("#ddlKeys" + temp + "12").hide();
            $("#TextBox" + temp + "1").hide();
            $("#TextBox" + temp + "2").hide();
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
            $("#ddlKeys" + temp + "6").hide();
            $("#ddlKeys" + temp + "7").hide();
            $("#ddlKeys" + temp + "8").hide();
            $("#ddlKeys" + temp + "9").hide();
            $("#ddlKeys" + temp + "10").hide();
            $("#ddlKeys" + temp + "11").hide();
            $("#ddlKeys" + temp + "12").hide();
            $("#TextBox" + temp + "1").hide();
            $("#TextBox" + temp + "2").hide();
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
            $("#ddlKeys" + temp + "6").hide();
            $("#ddlKeys" + temp + "7").hide();
            $("#ddlKeys" + temp + "8").hide();
            $("#ddlKeys" + temp + "9").hide();
            $("#ddlKeys" + temp + "10").hide();
            $("#ddlKeys" + temp + "11").hide();
            $("#ddlKeys" + temp + "12").hide();
            $("#TextBox" + temp + "1").hide();
            $("#TextBox" + temp + "2").hide();
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
            $("#ddlKeys" + temp + "6").hide();
            $("#ddlKeys" + temp + "7").hide();
            $("#ddlKeys" + temp + "8").hide();
            $("#ddlKeys" + temp + "9").hide();
            $("#ddlKeys" + temp + "10").hide();
            $("#ddlKeys" + temp + "11").hide();
            $("#ddlKeys" + temp + "12").hide();
            $("#TextBox" + temp + "1").hide();
            $("#TextBox" + temp + "2").hide();
        }
        else if (str == "TechnicalTitleNum") {

            $("#comlon" + temp + "1").val("DropDownList" + temp + "3");
            $("#comlon" + temp + "2").val("ddlKeys" + temp + "6");

            $("#DropDownList" + temp + "2").hide();
            $("#DropDownList" + temp + "3").show();

            $("#ddlKeys" + temp + "1").hide();
            $("#ddlKeys" + temp + "2").hide();
            $("#ddlKeys" + temp + "3").hide();
            $("#ddlKeys" + temp + "4").hide();
            $("#ddlKeys" + temp + "5").hide();
            $("#ddlKeys" + temp + "6").show();
            $("#ddlKeys" + temp + "7").hide();
            $("#ddlKeys" + temp + "8").hide();
            $("#ddlKeys" + temp + "9").hide();
            $("#ddlKeys" + temp + "10").hide();
            $("#ddlKeys" + temp + "11").hide();
            $("#ddlKeys" + temp + "12").hide();
            $("#TextBox" + temp + "1").hide();
            $("#TextBox" + temp + "2").hide();
        }
        else if (str == "StudyExperienceNum") {

            $("#comlon" + temp + "1").val("DropDownList" + temp + "3");
            $("#comlon" + temp + "2").val("ddlKeys" + temp + "7");

            $("#DropDownList" + temp + "2").hide();
            $("#DropDownList" + temp + "3").show();

            $("#ddlKeys" + temp + "1").hide();
            $("#ddlKeys" + temp + "2").hide();
            $("#ddlKeys" + temp + "3").hide();
            $("#ddlKeys" + temp + "4").hide();
            $("#ddlKeys" + temp + "5").hide();
            $("#ddlKeys" + temp + "6").hide();
            $("#ddlKeys" + temp + "7").show();
            $("#ddlKeys" + temp + "8").hide();
            $("#ddlKeys" + temp + "9").hide();
            $("#ddlKeys" + temp + "10").hide();
            $("#ddlKeys" + temp + "11").hide();
            $("#ddlKeys" + temp + "12").hide();
            $("#TextBox" + temp + "1").hide();
            $("#TextBox" + temp + "2").hide();
        }
        else if (str == "DegreeNum") {

            $("#comlon" + temp + "1").val("DropDownList" + temp + "3");
            $("#comlon" + temp + "2").val("ddlKeys" + temp + "8");

            $("#DropDownList" + temp + "2").hide();
            $("#DropDownList" + temp + "3").show();

            $("#ddlKeys" + temp + "1").hide();
            $("#ddlKeys" + temp + "2").hide();
            $("#ddlKeys" + temp + "3").hide();
            $("#ddlKeys" + temp + "4").hide();
            $("#ddlKeys" + temp + "5").hide();
            $("#ddlKeys" + temp + "6").hide();
            $("#ddlKeys" + temp + "7").hide();
            $("#ddlKeys" + temp + "8").show();
            $("#ddlKeys" + temp + "9").hide();
            $("#ddlKeys" + temp + "10").hide();
            $("#ddlKeys" + temp + "11").hide();
            $("#ddlKeys" + temp + "12").hide();
            $("#TextBox" + temp + "1").hide();
            $("#TextBox" + temp + "2").hide();
        }
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
            $("#ddlKeys" + temp + "6").hide();
            $("#ddlKeys" + temp + "7").hide();
            $("#ddlKeys" + temp + "8").hide();
            $("#ddlKeys" + temp + "9").hide();
            $("#ddlKeys" + temp + "10").hide();
            $("#ddlKeys" + temp + "11").hide();
            $("#ddlKeys" + temp + "12").hide();
            $("#TextBox" + temp + "1").hide();
            $("#TextBox" + temp + "2").show();
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



    /*复选框默认添加选中的颜色*/
    $('tbody > tr:has(:checked)').addClass('selected');
    //逐个选中或不选中时为选中或不选中的行添加或移除高亮
    $('[name=checkbox]:checkbox').click(function () {
        //alert("check");
        var hasSelected = $(this).parent().parent().hasClass('selected');
        $(this).parent().parent()[hasSelected ? "removeClass" : "addClass"]('selected');
    });


    /*全选事件*/
    $('#selectAll').click(function () {
        //alert(1);
        $('[name=checkbox]:checkbox').attr('checked', true);
        $('.list_txt tbody > tr').addClass('selected'); //全选添加选中颜色
    });
    /*全不选*/
    $('#selectNo').click(function () {
        $('[disabled=false]:checkbox ').attr("checked", false);
        //$('.noSelected').attr("checked", false);
        $('.list_txt tbody > tr').removeClass('selected'); //全不选移除选中颜色
    });

    /*添加事件，添加已选定的到数据库中*/
    $('#sure').click(function () {
        var str = "";
        var educationNum = $('#eduNum').val(); //获得培训编号
        // alert(educationNum);
        $('[disabled=false]:checkbox:checked').each(function () {
            str += $(this).val() + ";";
        });
        if (str == "") {
            alert("请选择您要添加的员工！")
            return false;
        }
        if (str != undefined) {
            $.post("dataProcess.ashx", { op: "EducationRegistration_T", educationNum: educationNum, str: str, rdom: Math.random() }, function (data) {
                if (data == "") {
                    alert("报名成功！");
                    var strArr = str.split(';')
                    console.log(str)
                    for (var i = 0; i < strArr.length - 1; i++) {
                        $('#cb_' + strArr[i]).children().attr("disabled", true);
                    }
                    return true;
                }
                else {
                    if (data == "操作失败") {
                        alert("报名失败！");
                        return false;
                    }
                    else {
                        alert(data + "已经报名！");
                        return false;
                    }
                }
            });
        }
        else {
            alert("请选择要报名的人员！");
            return false;
        }
    });
    /*查看名单事件*/
    $('#roll').click(function () {
        var educationNum = $('#eduNum').val(); //获得培训编号
        //alert(educationNum);
        if (educationNum != undefined) {
            return qBox.iFLoad({ title: '查看安全培训名单', src: 'educationRegistrationRoll.aspx?educationNum=' + educationNum + '&rdom=' + Math.random(), w: 604, h: 385 });
        }
    });

    /*名单的删除事件*/
    $('#delRoll').click(function () {
        var str = "";
        var i = 0;
        $('[name=checkbox]:checkbox:checked').each(function () {
            str += $(this).val() + ";";
            i++;
        }); //获取单选按钮
        var educationNum = $('#educationNum').val(); //$("input[.radio][checked]").siblings('.eduNum').val(); //获得培训编号
        var labsum = $('#labsum').html();
        //alert(str);
        //alert(educationNum);
        if (educationNum != undefined && str != "") {
            //执行删除操作
            if (confirm("您确定要删除吗?")) {
                $.post("dataProcess.ashx", { op: "RollOfEducation_T", str: str, educationNum: educationNum, rdom: Math.random() }, function (data) {
                    if (data == "") {
                        $('[name=checkbox]:checkbox:checked').each(function () {
                            var emp = $(this).val();
                            ////console.log($("#tr_" + $.trim(emp)).html)
                            console.log($("#tr_" + $.trim(emp)))
                            $("#tr_" + emp).remove();
                        });
                        
                        if (labsum != undefined) {
                            $('#labsum').html(parseInt(labsum) - parseInt(i));
                        }
                    }

                });
            }
        }
        else {
            alert("请选择您要修改的记录，点击多选框选中！");
            return false;
        }
    });


})