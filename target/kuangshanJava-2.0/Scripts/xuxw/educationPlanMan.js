$(function () { /**安全教育培训计划管理*/

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
        if (str == "EducationPlanNum") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "3"); //设置条件选中，2对应大于小于等于，3对应like或=
            $("#comlon" + temp + "2").val("TextBox" + temp + "1"); //设置值选中,就是下面的输入框是显示的那种

            $("#DropDownList" + temp + "2").hide(); //大于类
            $("#DropDownList" + temp + "3").show(); //包含

            $("#ddlKeys" + temp + "1").hide(); //下拉框
            $("#ddlKeys" + temp + "2").hide();
            $("#ddlKeys" + temp + "3").hide();
            $("#ddlKeys" + temp + "4").hide();
            $("#TextBox" + temp + "1").show(); //文本框
            $("#TextBox" + temp + "2").hide(); //日历文本框
            $("#TextBox" + temp + "3").hide(); //年度文本框
        }

        else if (str == "EducationName") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "3");
            $("#comlon" + temp + "2").val("TextBox" + temp + "1");

            $("#DropDownList" + temp + "2").hide();
            $("#DropDownList" + temp + "3").show();

            $("#ddlKeys" + temp + "1").hide();
            $("#ddlKeys" + temp + "2").hide();
            $("#ddlKeys" + temp + "3").hide();
            $("#ddlKeys" + temp + "4").hide();
            $("#TextBox" + temp + "1").show();
            $("#TextBox" + temp + "2").hide();
            $("#TextBox" + temp + "3").hide(); //年度文本框
        }
        else if (str == "InstitutionNum") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "3");
            $("#comlon" + temp + "2").val("ddlKeys" + temp + "1");

            $("#DropDownList" + temp + "2").hide();
            $("#DropDownList" + temp + "3").show();

            $("#ddlKeys" + temp + "1").show();
            $("#ddlKeys" + temp + "2").hide();
            $("#ddlKeys" + temp + "3").hide();
            $("#ddlKeys" + temp + "4").hide();
            $("#TextBox" + temp + "1").hide();
            $("#TextBox" + temp + "2").hide();
            $("#TextBox" + temp + "3").hide(); //年度文本框
        }
        else if (str == "PlanCategoryNum") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "3");
            $("#comlon" + temp + "2").val("ddlKeys" + temp + "2");

            $("#DropDownList" + temp + "2").hide();
            $("#DropDownList" + temp + "3").show();

            $("#ddlKeys" + temp + "1").hide();
            $("#ddlKeys" + temp + "2").show();
            $("#ddlKeys" + temp + "3").hide();
            $("#ddlKeys" + temp + "4").hide();
            $("#TextBox" + temp + "1").hide();
            $("#TextBox" + temp + "2").hide();
            $("#TextBox" + temp + "3").hide(); //年度文本框
        }
        else if (str == "EducationType") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "3");
            $("#comlon" + temp + "2").val("ddlKeys" + temp + "3");

            $("#DropDownList" + temp + "2").hide();
            $("#DropDownList" + temp + "3").show();

            $("#ddlKeys" + temp + "1").hide();
            $("#ddlKeys" + temp + "2").hide();
            $("#ddlKeys" + temp + "3").show();
            $("#ddlKeys" + temp + "4").hide();
            $("#TextBox" + temp + "1").hide();
            $("#TextBox" + temp + "2").hide();
            $("#TextBox" + temp + "3").hide(); //年度文本框
        }
        else if (str == "EducationBudget") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "2");
            $("#comlon" + temp + "2").val("TextBox" + temp + "1");

            $("#DropDownList" + temp + "2").show();
            $("#DropDownList" + temp + "3").hide();

            $("#ddlKeys" + temp + "1").hide();
            $("#ddlKeys" + temp + "2").hide();
            $("#ddlKeys" + temp + "3").hide();
            $("#ddlKeys" + temp + "4").hide();
            $("#TextBox" + temp + "1").show();
            $("#TextBox" + temp + "2").hide();
            $("#TextBox" + temp + "3").hide(); //年度文本框
        }

        else if (str == "EducationAddress") {

            $("#comlon" + temp + "1").val("DropDownList" + temp + "3");
            $("#comlon" + temp + "2").val("TextBox" + temp + "1");

            $("#DropDownList" + temp + "2").hide();
            $("#DropDownList" + temp + "3").show();

            $("#ddlKeys" + temp + "1").hide();
            $("#ddlKeys" + temp + "2").hide();
            $("#ddlKeys" + temp + "3").hide();
            $("#ddlKeys" + temp + "4").hide();
            $("#TextBox" + temp + "1").show();
            $("#TextBox" + temp + "2").hide();
            $("#TextBox" + temp + "3").hide(); //年度文本框
        }

        else if (str == "StartTime") {

            $("#comlon" + temp + "1").val("DropDownList" + temp + "2");
            $("#comlon" + temp + "2").val("TextBox" + temp + "2");

            $("#DropDownList" + temp + "2").show();
            $("#DropDownList" + temp + "3").hide();

            $("#ddlKeys" + temp + "1").hide();
            $("#ddlKeys" + temp + "2").hide();
            $("#ddlKeys" + temp + "3").hide();
            $("#ddlKeys" + temp + "4").hide();
            $("#TextBox" + temp + "1").hide();
            $("#TextBox" + temp + "2").show();
            $("#TextBox" + temp + "3").hide(); //年度文本框
        }
        else if (str == "EndTime") {

            $("#comlon" + temp + "1").val("DropDownList" + temp + "2");
            $("#comlon" + temp + "2").val("TextBox" + temp + "2");

            $("#DropDownList" + temp + "2").show();
            $("#DropDownList" + temp + "3").hide();

            $("#ddlKeys" + temp + "1").hide();
            $("#ddlKeys" + temp + "2").hide();
            $("#ddlKeys" + temp + "3").hide();
            $("#ddlKeys" + temp + "4").hide();
            $("#TextBox" + temp + "1").hide();
            $("#TextBox" + temp + "2").show();
            $("#TextBox" + temp + "3").hide(); //年度文本框
        }
        else if (str == "EducationPeriod") {

            $("#comlon" + temp + "1").val("DropDownList" + temp + "2");
            $("#comlon" + temp + "2").val("TextBox" + temp + "1");

            $("#DropDownList" + temp + "2").show();
            $("#DropDownList" + temp + "3").hide();

            $("#ddlKeys" + temp + "1").hide();
            $("#ddlKeys" + temp + "2").hide();
            $("#ddlKeys" + temp + "3").hide();
            $("#ddlKeys" + temp + "4").hide();
            $("#TextBox" + temp + "1").show();
            $("#TextBox" + temp + "2").hide();
            $("#TextBox" + temp + "3").hide(); //年度文本框
        }
        else if (str == "EducationContent") {

            $("#comlon" + temp + "1").val("DropDownList" + temp + "3");
            $("#comlon" + temp + "2").val("TextBox" + temp + "1");

            $("#DropDownList" + temp + "2").hide();
            $("#DropDownList" + temp + "3").show();

            $("#ddlKeys" + temp + "1").hide();
            $("#ddlKeys" + temp + "2").hide();
            $("#ddlKeys" + temp + "3").hide();
            $("#ddlKeys" + temp + "4").hide();
            $("#TextBox" + temp + "1").show();
            $("#TextBox" + temp + "2").hide();
            $("#TextBox" + temp + "3").hide(); //年度文本框
        }
        else if (str == "educationPlanNum") {

            $("#comlon" + temp + "1").val("DropDownList" + temp + "2");
            $("#comlon" + temp + "2").val("TextBox" + temp + "3");

            $("#DropDownList" + temp + "2").show();
            $("#DropDownList" + temp + "3").hide();

            $("#ddlKeys" + temp + "1").hide();
            $("#ddlKeys" + temp + "2").hide();
            $("#ddlKeys" + temp + "3").hide();
            $("#ddlKeys" + temp + "4").hide();
            $("#TextBox" + temp + "1").hide();
            $("#TextBox" + temp + "2").hide();
            $("#TextBox" + temp + "3").show(); //年度文本框
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
            $("#TextBox" + temp + "1").show();
            $("#TextBox" + temp + "2").hide();
            $("#TextBox" + temp + "1").attr("value", "");
            $("#TextBox" + temp + "3").hide(); //年度文本框
        }

    }

    /*查询的Js结束*/

    /**/


    //为选中行添加高亮
    $('.radio').click(function () {
        $(this).parent().parent().addClass('selected');
        $(this).parent().parent().siblings().removeClass('selected');
    });

    /*添加事件*/
    $('#iframePopAdd').click(function () {
        var educationPlanNum = $("input[.radio][checked]").val(); //获取单选按钮
        if (educationPlanNum == undefined) {
            return qBox.iFLoad({ title: '添加年度培训计划', src: 'educationPlanAdd.aspx', w: 700, h: 405 });
        }
        else {
            return qBox.iFLoad({ title: '添加年度培训计划', src: 'educationPlanAdd.aspx?educationNum=' + educationPlanNum, w: 700, h: 405 });
        }
    });

    /*详细事件*/
    $('#iframePopDetail').click(function () {
        var educationPlanNum = $("input[.radio][checked]").val(); //获取单选按钮
        if (educationPlanNum != undefined) {
            return qBox.iFLoad({ title: '年度培训计划详细信息', src: 'educationPlanDetail.aspx?educationPlanNum=' + educationPlanNum + '&fatherCookie=' + getHtmlDocName(), w: 700, h: 405 });
        }
        else {
            alert("请选择您要查看的记录，点击单选按钮选中！");
            return false;
        }
    });

    /*修改事件*/
    $('#iframePopEdit').click(function () {
        var educationPlanNum = $("input[.radio][checked]").val(); //获取单选按钮
        if (educationPlanNum != undefined) {
            //查看是否有明细计划，有不允许修改
            $.post("dataProcess.ashx", { op: "checkEducationPlan", educationPlanNum: educationPlanNum, rdom: Math.random() }, function (data) {
                if (data == "") {
                    return qBox.iFLoad({ title: '修改年度培训计划', src: 'educationPlanEdit.aspx?educationPlanNum=' + educationPlanNum, w:700, h: 405 });
                }
                else {
                    alert("存在培训计划明细，不可以修改！");
                    return false;
                }
            });

        }
        else {
            alert("请选择您要修改的记录，点击单选按钮选中！");
            return false;
        }
    });

    /*删除事件*/
    $('#delete').click(function () {
        var educationPlanNum = $("input[.radio][checked]").val(); //获取单选按钮
        if (educationPlanNum != undefined) {
            //查看是否有明细计划，有不允许删除
            $.post("dataProcess.ashx", { op: "checkEducationPlan", educationPlanNum: educationPlanNum, rdom: Math.random() }, function (data) {
                if (data == "") {
                    if (confirm("您确定要删除培训计划吗？")) {
                        $.post("dataProcess.ashx", { op: "educationPlanDel", educationPlanNum: educationPlanNum, rdom: Math.random() }, function (data) {
                            if (data == "删除成功！") {
                                $('#tr_' + educationPlanNum).remove();
                                return false;
                            }
                            else {
                                alert(data);
                                return false;
                            }

                        });
                    } else {
                        return false;
                    }
                }
                else {
                    alert("存在培训计划明细，不可以删除！");
                    return false;
                }
            });


        }
        else {
            alert("请选择您要删除的记录，点击单选按钮选中！");
            return false;
        }
    });

    /*重置事件*/
    $('#resetEdu').click(function () {
        $('#txt_EducationAddress').attr("value", "");
        $('#txt_EducationBudget').attr("value", "");
        $('#txt_EducationContent').attr("value", "");
        $('#txt_EducationMaterial').attr("value", "");
        $('#txt_educationName').attr("value", "新员工三级安全教育");
        $('#txt_EducationNumber').attr("value", "");
        $('#txt_EducationPeriod').attr("value", "");
        $('#txt_EducationTutor').attr("value", "");
        $('#txt_EducationType').val('内部培训');
        $('#txt_EndTime').attr("value", "");
        $('#txt_ExamineType').attr("value", "");
        $('#txt_StartTime').attr("value", "");
        $('#txt_InstitutionNum').val('');
        $('#txt_StartTime').attr("value", "");
        $('#txt_EndTime').attr("value", "");
        $('#txt_PlanCategoryNum').val('');
    });

    /*验证培训编号是否重复 txt_educationName*/

    var educationNum = $('#txt_educationNumAdd').val();
    var success = $('#success').val();
    if (educationNum != undefined && educationNum != "" && success == "0") {
        /*进行验证*/
        $.post("dataProcess.ashx", { op: "txt_educationPlanNum", educationNum: educationNum, rdom: Math.random() }, function (data) {
            if (data == "") {
                //alert("培训编号不存在，可以添加！");
            }
            else {
                alert("培训编号" + educationNum + "已存在！");
                $('#txt_educationNumAdd').attr("value", "");
                $('#txt_educationNumAdd').focus();
                return false;
            }
        });
    }

    $('#txt_educationNumAdd').change(function () {
        var educationNum = $(this).val();
        if (educationNum != undefined && educationNum != "") {
            /*进行验证*/
            $.post("dataProcess.ashx", { op: "txt_educationPlanNum", educationNum: educationNum, rdom: Math.random() }, function (data) {
                if (data == "") {
                    //alert("培训编号不存在，可以添加！");
                }
                else {
                    alert("培训编号" + educationNum + "已存在！");
                    $('#txt_educationNumAdd').attr("value", "");
                    $('#txt_educationNumAdd').focus();
                    return false;
                }
            });
        }
        else {

            return false;
        }
    });

    /*管理页面带参数palnMan**/
    $('#palnMan').click(function () {
        var educationPlanNum = $("input[.radio][checked]").val(); //获取单选按钮
        if (educationPlanNum != undefined) {
            window.location.href = "educationTrainMan.aspx?educationPlanNum=" + educationPlanNum + "&rdom=" + Math.random();
        }
        else {
            window.location.href = "educationTrainMan.aspx?educationPlanNum=null&rdom=" + Math.random();
        }
    });
})