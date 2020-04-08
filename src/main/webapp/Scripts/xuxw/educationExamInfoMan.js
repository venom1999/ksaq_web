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
        if (str == "TestName") {
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

        else if (str == "TestAddress") {
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
        else if (str == "TestType") {
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
        else if (str == "OnLine") {
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

        else if (str == "Finished") {
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

        else if (str == "TestTime1") {

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

        else if (str == "TestTime2") {

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

    //选项卡制作
    //    var $div_menu = $('div.tab_menu ul li');
    //    $div_menu.click(function () {
    //        //alert(123);
    //        $(this).addClass('current')
    //				.siblings().removeClass('current');
    //        var index = $div_menu.index(this);
    //        $('div.tab_box > div')
    //			.eq(index).show()
    //			.siblings().hide();

    //    });

    /*添加考试事件*/
    $('#addExam').click(function () {
        //alert("重新修改页面");

        return qBox.iFLoad({ title: '添加考试信息', src: 'educationExamInfoAdd.aspx?rdom=' + Math.random(), w: 430, h: 380 });
    });

    /*添加补考的事件*/
    $('#addResit').click(function () {

        var eduNum = $("input[.radio][checked]").siblings('#eduNum').val(); //获取培训编号
        var testType = $("input[.radio][checked]").siblings('#testType').val(); //获取考试类型
        var finish = $("input[.radio][checked]").siblings('#finished').val(); //成绩已经被成功提交一次
        //alert(testType);

        if (eduNum == undefined || testType == undefined || finish == undefined) {
            alert("请选择需要添加补考的考试！");
            return false;
        }
        else if (testType == 2) {
            alert("该考试已经是补考信息，不能再添加补考！");
            return false;
        }
        else if (finish == "1" && eduNum.length > 0 && testType == 1) {
            $.post("dataProcess.ashx", { op: "checkResit", eduNum: eduNum, rdom: Math.random() }, function (data) { //检测该考试有没有补考信息
                if (data == "") { //表示没有添加补考信息，可以添加补考信息
                    return qBox.iFLoad({ title: '添加补考信息', src: 'educationExamResitAdd.aspx?eduNum=' + eduNum + '&rdom=' + Math.random(), w: 400, h: 340 });
                }
                else {
                    alert("该考试已经存在补考信息，不能再添加补考！");
                    return false;
                }
            });
        }
        else if (finish == "2") {
            alert("补考成绩已提交，不能添加补考考试！");
            return false;
        }
        else if (finish == "3") {
            alert("该考试成绩已提交，没有补考考试！");
            return false;
        }
        else { /*在这里加上是补考的参数*/
            alert("该考试还没有成功提交成绩，不能添加补考！");
            return false;
        }
    });

    /*修改事件*/
    $('#iframePopEdit').click(function () {
        var testid = $("input[.radio][checked]").val(); //获取单选按钮
        var finished = $("input[.radio][checked]").siblings('#finished').val();
        //alert(finished);
        if (testid != undefined && finished == 0) {
            return qBox.iFLoad({ title: '修改考试信息', src: 'educationExamInfoEdit.aspx?testid=' + testid + '&rdom=' + Math.random(), w: 450, h: 500 });
        }
        else {
            if (finished == 1 || finished == 3 || finished == 2) {
                alert("该考试成绩已提交，不允许修改！");
                return false;
            }
            else {
                alert("请选择您要修改的记录，点击单选按钮选中！");
                return false;
            }
        }
    });
    /*查看详细的事件*/
    $('#iframePopDetail').click(function () {
        var testid = $("input[.radio][checked]").val(); //获取单选按钮
        //alert(testid);
        if (testid != undefined) {
            return qBox.iFLoad({ title: '查看考试详细信息', src: 'educationExamInfoDetail.aspx?testid=' + testid + '&rdom=' + Math.random() + '&fatherCookie=' + getHtmlDocName(), w: 400, h: 500 });
        }
        else {
            alert("请选择您要查看的记录，点击单选按钮选中！");
            return false;
        }
    });

    /*删除点击提交的事件*/
    $('#delete').click(function () {
        //alert("delete");
        var testid = $("input[.radio][checked]").val(); //获取单选按钮
        var eduNum = $("input[.radio][checked]").siblings('#eduNum').val(); //获取培训编号
        var finished = $("input[.radio][checked]").siblings('#finished').val(); //成绩是否提交
        var online = $("input[.radio][checked]").siblings('#online').val(); //考试类型
        var curTime = $("input[.radio][checked]").siblings('#curTime').val();
        var testType = $("input[.radio][checked]").siblings('#testType').val();
        if (testid != undefined) {
            if (testType == "1") {
                if (online == 0) {//非机考
                    if (confirm("您确定要删除吗?")) {
                        $.post("dataProcess.ashx", { op: "test_infoDel", testid: testid, eduNum: eduNum, rdom: Math.random() }, function (data) {
                            if (data == "") {
                                $("#tr_" + testid).remove();
                                //alert("删除成功！");
                            }
                            else {
                                alert("删除失败！");
                                return false;
                            }
                        });
                    }
                    else {
                        return false;
                    }
                }
                else {  //机考
                    if (curTime == "1") { //表示当前时间小于考试开始时间
                        if (confirm("您已组卷，会删除试卷，确定要删除吗?")) {
                            $.post("dataProcess.ashx", { op: "test_infoDel", testid: testid, eduNum: eduNum, rdom: Math.random() }, function (data) {
                                if (data == "") {
                                    $("#tr_" + testid).remove();
                                    //alert("删除成功！");
                                }
                                else {
                                    alert("删除失败！");
                                    return false;
                                }
                            });
                        }
                        else {
                            return false;
                        }
                    }
                    else if (curTime == "2") {
                        alert("考试进行中，不允许删除！");
                        return false;
                    }
                    else {
                        if (finished == 0) {
                            alert("考试成绩没有提交，不能删除考试信息！");
                            return false;
                        }
                        else if (finished == 1) {
                            if (confirm("如果删除该考试，则不能添加相应的补考，确定删除吗？")) {
                                $.post("dataProcess.ashx", { op: "test_infoDel", testid: testid, eduNum: eduNum, rdom: Math.random() }, function (data) {
                                    if (data == "") {
                                        $("#tr_" + testid).remove();
                                        //alert("删除成功！");
                                    }
                                    else {
                                        alert("删除失败！");
                                        return false;
                                    }
                                });
                            }
                            else {
                                //不删除
                                return false;
                            }
                        }
                        else {
                            if (confirm("您确定要删除吗?")) {
                                $.post("dataProcess.ashx", { op: "test_infoDel", testid: testid, eduNum: eduNum, rdom: Math.random() }, function (data) {
                                    if (data == "") {
                                        $("#tr_" + testid).remove();
                                        //alert("删除成功！");
                                    }
                                    else {
                                        alert("删除失败！");
                                        return false;
                                    }
                                });
                            }
                            else {
                                return false;
                            }
                        } //finished else over
                    } //curtime else over
                } // online else
            } //testtype if over 
            else {//补考信息删除
                if (finished == 0 || finished == 1) {
                    alert("成绩没有提交，不能删除考试信息！");
                    return false;
                }
                else {
                    if (confirm("您确定要删除吗?")) {
                        $.post("dataProcess.ashx", { op: "test_infoDel", testid: testid, eduNum: eduNum, rdom: Math.random() }, function (data) {
                            if (data == "") {
                                $("#tr_" + testid).remove();
                                //alert("删除成功！");
                            }
                            else {
                                alert("删除失败！");
                                return false;
                            }
                        });
                    }
                    else {
                        return false;
                    }
                }
            } //testtype else over 
        }
        else {
            alert("请选择您要修改的记录，点击单选按钮选中！");
            return false;
        }
    });

    /*考生管理事件*/
    $('#stuMan').click(function () {
        var eduNum = $("input[.radio][checked]").siblings('#eduNum').val(); //获取培训计划编号，来得到考试方式
        var online = $("input[.radio][checked]").siblings('#online').val();
        var testType = $("input[.radio][checked]").siblings('#testType').val(); //获取考试类型,是正常考试还是补考
        //alert(eduNum);
        //alert(online);
        //alert(testType);
        if (eduNum != undefined) { //表示选中了某个考试的考生管理
            if (online == "1" || online == "2") {  //显示机考的名单
                return qBox.iFLoad({ title: '机考考生名单详细信息', src: 'educationExamInfoShowOnlineRoll.aspx?eduNum=' + eduNum + '&testType=' + testType + '&rdom=' + Math.random(), w: 680, h: 590 });
            }
            else if (online == "0") {  //显示非机考的名单
                return qBox.iFLoad({ title: '非机考考生名单详细信息', src: 'educationExamInfoShowRoll.aspx?eduNum=' + eduNum + '&testType=' + testType + '&rdom=' + Math.random(), w: 680, h: 590 });
            }
            else {
                alert("考试类型错误！");
                return false;
            }

        }
        else { //没有选中
            alert("请选择相应的考试！");
            return false;
        }
    });


    /*添加补考的重置*/
    $('#reSetResit').click(function () {
        $('#txt_testAddress').attr("value", "");
        $('#txt_testTime1').attr("value", "");
        $('#txt_testTime2').attr("value", "");
    });

    /*添加考试信息的重置*/
    $('#resetTest').click(function () {
        $('#txt_educationNum').val('');
        $('#txt_testName').attr("value", "");
        $('#txt_testAddress').attr("value", "");
        $('#txt_testTime1').attr("value", "");
        $('#txt_testTime2').attr("value", "");
        $('#txt_online').val('0');
        $('#txt_TestTime').attr("value", "");
    });

})