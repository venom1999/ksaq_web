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
        if (str == "EducationNum") {
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
            $("#TextBox" + temp + "3").hide();
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
            $("#TextBox" + temp + "3").hide();
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
            $("#TextBox" + temp + "3").hide();
        }
        else if (str == "EducationCategoryNum") {
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
            $("#TextBox" + temp + "3").hide();
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
            $("#TextBox" + temp + "3").hide();
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
            $("#TextBox" + temp + "3").hide();
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
            $("#TextBox" + temp + "3").hide();
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
            $("#TextBox" + temp + "3").hide();
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
            $("#TextBox" + temp + "3").hide();
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
            $("#TextBox" + temp + "3").hide();
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
            $("#TextBox" + temp + "3").hide();
        }
        else if (str == "educationNum") {

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
            $("#TextBox" + temp + "3").show();
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
            $("#TextBox" + temp + "3").hide();
            $("#TextBox" + temp + "1").attr("value", "");
        }

    }


    /*查询的Js结束*/


    //为选中行添加高亮
    $('.radio').click(function () {
        $(this).parent().parent().addClass('selected');
        $(this).parent().parent().siblings().removeClass('selected');
    });

    /*添加事件*/
    $('#iframePopAdd').click(function () {
        var planNum = $('#planNumStr').val();
        return qBox.iFLoad({ title: '添加培训计划明细', src: 'educationTrainAdd.aspx?planNum=' + planNum + '&rdom=' + Math.random(), w:720, h: 443 });

    });

    /*修改事件*/
    $('#iframePopEdit').click(function () {
        var educationNum = $("input[.radio][checked]").val(); //获取单选按钮
        var Finished = $("input[.radio][checked]").siblings('#Finished').val(); //是否提交考试成绩或补考成绩，如果为1，表示考试成绩已提交，为2表示补考成绩已提交。0为未提交，才可以修改，否则不允许修改
        //alert(testOrNot);
        if (educationNum == undefined) {
            alert("请选择您要修改的记录，点击单选按钮选中！");
            return false;
        }
        if (educationNum != undefined && Finished == 0) {
            return qBox.iFLoad({ title: '修改培训计划明细', src: 'educationTrainEdit.aspx?educationNum=' + educationNum + '&rdom=' + Math.random(), w: 720, h: 443 });
        }
        else {
            if (Finished == 1 || Finished == 3) {
                alert("考试成绩已提交，不允许修改！");
                return false;
            }
            else {
                alert("补考成绩已提交，不允许修改！");
                return false;
            }
        }

    });

    /*查看详细信息事件*/
    $('#iframePopDetail').click(function () {
        var educationNum = $("input[.radio][checked]").val(); //获取单选按钮
        //alert(employeeNum);
        if (educationNum != undefined) {
            return qBox.iFLoad({ title: '培训计划明细详细信息', src: 'educationTrainDetail.aspx?educationNum=' + educationNum + '&rdom=' + Math.random() + '&fatherCookie=' + getHtmlDocName(), w: 720, h: 444 });
        }
        else {
            alert("请选择您要查看的记录，点击单选按钮选中！");
            return false;
        }
    });

    /*删除培训信息提交的事件*/
    $('#delete').click(function () {
        //alert("delete");
        var educationNum = $("input[.radio][checked]").val(); //获取单选按钮
        var testOrNot = $("input[.radio][checked]").siblings('#testOrNot').val();
        var eduCategory = $("input[.radio][checked]").siblings('#eduCategory').val();
        var finished = $("input[.radio][checked]").siblings('#Finished').val();
        if (educationNum == undefined) {
            alert("请选择您要删除的记录，点击单选按钮选中！");
            return false;
        }
        if (educationNum != undefined && educationNum != "") {
            if (eduCategory == "三级安全教育(车间级)*" || eduCategory == "三级安全教育(班组级)*") {
                alert("请选定相应的厂级培训明细，然后一起删除！");
                return false;
            }
            else if (eduCategory == "三级安全教育(厂、矿级)*") {
                //三级安全教育中有一个有考试信息，不允许删除，否则，判断厂矿级的finished是否为0，若为0，可以删除，询问；否则，查看班组级finished是否为2或者3，是的可以删除，否则，不允许删除
                if (testOrNot != 0) { //厂矿级存在考试信息，不允许删除
                    alert("存在考试信息，不允许删除！");
                    return false;
                }
                else { //查看车间级或者班组级是否有考试信息
                    if (finished == 0) {
                        if (confirm("删除该培训明细，可能会删除已保存但未提交的培训成绩，是否继续？")) {
                            $.post("dataProcess.ashx", { op: "DelThreeEdu", educationNum: educationNum, rdom: Math.random() }, function (data) {
                                if (data == "") {
                                    window.location.href = "educationTrainMan.aspx?educationPlanNum=null&rdom=" + Math.random();

                                } else { return false; }
                            });
                        }
                        else {
                        }
                    }
                    else {//查看车间级，班组级
                        $.post("dataProcess.ashx", { op: "checkThreeEdu", educationNum: educationNum, rdom: Math.random() }, function (data) {
                            if (data == "0") {
                                //没有考试信息，并且班组级finished为2或者3 ，进行删除
                                $.post("dataProcess.ashx", { op: "DelThreeEdu", educationNum: educationNum, rdom: Math.random() }, function (data) {
                                    if (data == "") {
                                        
                                        window.location.href = "educationTrainMan.aspx?educationPlanNum=null&rdom=" + Math.random();
                                    }
                                    else {
                                        return false;
                                    }
                                });
                            }
                            else {//存在考试信息，或者班组级，车间级成绩还没有提交
                                alert("存在考试信息或者培训正在进行中，不允许删除！");
                                return false;
                            }
                        });
                    }
                }
            }
            else {//非三级安全教育的删除
                if (testOrNot != 0) {//存在考试信息，不删除
                    alert("存在考试信息，请先删除考试信息！");
                    return false;
                }
                else {
                    if (finished == 0) {//存在报名或者保存的成绩。
                        if (confirm("删除该培训明细，可能会删除已保存但未提交的培训成绩，是否继续？")) {
                            $.post("dataProcess.ashx", { op: "EducationInfo_T", educationNum: educationNum, rdom: Math.random() }, function (data) {
                                if (data == "") {
                                    $("#tr_" + educationNum).remove();

                                }
                                else { return false; }
                            });
                        }
                        else {
                        }
                    }
                    else if (finished == 2 || finished == 3) {//没有报名或者成绩已经提交，直接删除
                        if (confirm("您确定要删除吗?")) {
                            $.post("dataProcess.ashx", { op: "EducationInfo_T", educationNum: educationNum, rdom: Math.random() }, function (data) {
                                if (data == "") {
                                    $("#tr_" + educationNum).remove();

                                }
                                else { return false; }
                            });
                        }
                        else {
                        }
                    }
                    else {//有考试，finished为1，已经保存了成绩，还有补考
                        alert("存在考试信息，不允许删除！");
                        return false;
                    }
                }
            }
        } else {
            alert("请选择您要删除的记录！");
            return false;
        }
    });



    /*报名事件*/
    $('#registrate').click(function () {
        var educationNum = $("input[.radio][checked]").val(); //获取单选按钮 
        var finished = $("input[.radio][checked]").siblings('#Finished').val(); //是否提交成绩，如果为1，表示考试成绩已提交，则不允许再报名，若为2，表示补考成绩已提交，不允许报名，否则为0，可以报名
        var eduCategory = $("input[.radio][checked]").siblings('#eduCategory').val();
        //alert(eduCategory);
        //alert(educationNum);
        if (educationNum != undefined) {
            if (eduCategory != "三级安全教育(车间级)*" && eduCategory != "三级安全教育(班组级)*") {
                if (finished == "0") {
                    return qBox.iFLoad({ title: '培训计划明细报名管理', src: 'educationRegistration.aspx?educationNum=' + educationNum + '&rdom=' + Math.random(), w: 1200, h: 530 });
                } else {
                    alert("该培训计划已提交成绩，不可以再报名！");
                    return false;
                }
            } else {
                alert("车间或班组级三级安全教育不需要报名，请确认厂矿级已报名！");
                return false;
            }
        } else {
            alert("请选择您要报名的计划，点击单选按钮选中！");
            return false;
        }
    });


    //对于不依赖考试的培训计划的成绩提交，首先判断是否有考试信息，如果没有，则提交成绩，否则在考试信息管理中提交成绩//
    $('#inputScore').click(function () {
        var educationNum = $("input[.radio][checked]").val(); //获取单选按钮 
        if (educationNum == undefined) {
            alert("请选择您要录入成绩的计划，点击单选按钮选中！");
            return false;
        }
        var finished = $("input[.radio][checked]").siblings('#Finished').val(); //是否生成考试信息，如果为1，表示生成考试信息，则不允许再报名，否则为0，可以报名
        var planNum = $("input[.radio][checked]").siblings('#planNum').val(); //得到培训计划编号
        var categoryValue = $("input[.radio][checked]").siblings('#eduCategory').val();
        var testOrNot = $("input[.radio][checked]").siblings('#testOrNot').val();
        //alert(testOrNot);
        console.log(finished)
        if (testOrNot == 1 || testOrNot == 0) {//添加的考试要么是非机考，要么没有添加考试，可以培训计划这里提交成绩
            if (finished == "0" || finished == "1") {
                //finished为0--未提交成绩；finished为1--考试成绩已提交；finished为2--补考成绩已提交；finished位3--表示考试成绩已提交，且没有补考
                //if (finished == "1" && categoryValue != "三级安全教育(车间级)*" && categoryValue != "三级安全教育(班组级)*")
                //{
                //    alert("成绩已经提交，不能再录入!");
                //    return false;
                //}                
                $.post("dataProcess.ashx", { op: "checkRegistrate", educationNum: educationNum, rdom: Math.random() }, function (data) {
                    if (data == "") {
                        if (categoryValue == "三级安全教育(车间级)*") { //要厂矿级成绩是否提交，补考成绩的提交情况

                            //Education_institution_datadictionaryView
                            if (finished == "0") {
                                $.post("dataProcess.ashx", { op: "eduRoom", planNum: planNum, rdom: Math.random() }, function (data) {
                                    if (data == "") {
                                        return qBox.iFLoad({ title: '录入正常考试成绩', src: 'educationTrainInputScore.aspx?eduNum=' + educationNum + '&finished=0&rdom=' + Math.random(), w: 560, h: 356 });
                                    }
                                    else {
                                        alert("三级安全教育(厂、矿级)成绩未提交，不能录入车间级成绩！");
                                        return false;
                                    }
                                });
                            }
                            else {
                                return qBox.iFLoad({ title: '录入补考考试成绩', src: 'educationTrainInputScore.aspx?eduNum=' + educationNum + '&finished=1&rdom=' + Math.random(), w: 560, h: 356 });
                            }
                        }
                        else if (categoryValue == "三级安全教育(班组级)*") {//要车间级成绩是否提交，补考成绩的提交情况

                            //Education_institution_datadictionaryView
                            if (finished == "0") {
                                $.post("dataProcess.ashx", { op: "eduRoom", planNum: planNum, rdom: Math.random() }, function (data) {
                                    if (data == "") {
                                        return qBox.iFLoad({ title: '录入正常考试成绩', src: 'educationTrainInputScore.aspx?eduNum=' + educationNum + '&finished=0&rdom=' + Math.random(), w: 560, h: 356 });
                                    }
                                    else {
                                        alert("三级安全教育(车间级)成绩未提交，不能提交录入班组级成绩！");
                                        return false;
                                    }
                                });
                            } else {
                                return qBox.iFLoad({ title: '录入补考考试成绩', src: 'educationTrainInputScore.aspx?eduNum=' + educationNum + '&finished=1&rdom=' + Math.random(), w: 560, h: 356 });

                            }
                        } else {//如果是非三级安全教育，直接录入成绩
                            if (educationNum != undefined) {
                                if (finished == "0") {  //flag参数，标记是录入正常考试成绩还是录入补考成绩，1为录入正常考试成绩，2为录入补考成绩
                                    return qBox.iFLoad({ title: '录入正常考试成绩', src: 'educationTrainInputScore.aspx?eduNum=' + educationNum + '&finished=0&rdom=' + Math.random(), w: 560, h: 356 });
                                }
                                else {
                                    return qBox.iFLoad({ title: '录入补考考试成绩', src: 'educationTrainInputScore.aspx?eduNum=' + educationNum + '&finished=1&rdom=' + Math.random(), w: 560, h: 356 });
                                }
                            } else {
                                alert("请选择您要录入成绩的培训计划！");
                                return false;
                            }
                        }
                    } else {
                        alert("还没有录入名单，不能录入成绩！");
                        return false;
                    }
                });
            } else {
                alert("成绩已经提交，不能再录入!");
                return false;
            }
        } else {
            alert("机考考试，不需要录入成绩！");
            return false;
        }
    });


    /*加载已保存的成绩*/
    var saveValue = $('#showValue').val();
    if (saveValue != undefined) { //有这样的值存在，表示进入了提交成绩的页面
        var count = $('#count').val();
        //var scoreMode = $('#txt_scoreMode').val();
        var scoreMode = $('#scoreMode').val();
        //alert(scoreMode);
        //alert(saveValue);
        var arr = saveValue.split(',');
        //alert(arr);
        if (scoreMode == 1) {
            //alert("二分制");
            for (i = 0; i < count; i++) {
                //if (arr[i] != -1) {   //选中的值
                $("#RollRepeater_txt_score_" + i).val(arr[i]);
                //}
            }
        }
        if (scoreMode == 2) {
            //alert("五分制");
            for (i = 0; i < count; i++) {
                //if (arr[i] != -1) {  //设置选中的值
                $('#RollRepeater_txt_score2_' + i).val(arr[i]);
                //}
            }
        }
        else {
            //alert("百分制");
            for (i = 0; i < count; i++) {
                if (arr[i] != -1) {  //设置文本框的值
                    $('#RollRepeater_txt_score1_' + i).attr("value", arr[i]);
                }
            }
        }
    }
    /*验证输入的百分制成绩是否合格*/
    $('.txt_score').blur(function () {
        var temp = $(this).val();
        //alert(temp);
        if (temp != "") {
            if (!isNaN(temp)) {
                if (parseFloat(temp) < parseFloat(0.0) || parseFloat(temp) > parseFloat(100.0)) {
                    alert("请输入合格的百分制成绩！");
                    $(this).val('');
                }
            }
            else {
                alert("请输入合格的百分制成绩！");
                $(this).val('');
            }
        }
        else {
        }
    });

    /*将保存的成绩，发送到后台处理*/
    $('#submitAdd').click(function () {
        var count = $('#count').val();
        var eduNum = $('#eduNum').val();
        var finished = $('#finished').val();
        var scoreMode = $('#scoreMode').val();
        //alert(testType);
        var i = 0; //用来选择文本控件的值
        //var j = 0; //用来标识数组的下标
        //var myarray = new Array(count * 2);
        var myarray = "";
        if (scoreMode == 1) {
            //alert("二分制");
            for (i = 0; i < count; i++) {
                if ($('#RollRepeater_txt_score_' + i).val() == "") {
                    myarray += $('#RollRepeater_txt_eduNum_' + i).html() + ",-1:";
                }
                else {
                    myarray += $('#RollRepeater_txt_eduNum_' + i).html() + "," + $('#RollRepeater_txt_score_' + i).val() + ":";
                }
            }
        }
        else if (scoreMode == 2) {
            //alert("五分制");
            for (i = 0; i < count; i++) {

                // myarray[j] = $('#RollRepeater_txt_eduNum_' + i).val();
                // myarray[j + 1] = $('#RollRepeater_txt_score_' + i).val();
                //j = j + 2;
                if ($('#RollRepeater_txt_score2_' + i).val() == "") {
                    myarray += $('#RollRepeater_txt_eduNum_' + i).html() + ",-1:";
                }
                else {
                    myarray += $('#RollRepeater_txt_eduNum_' + i).html() + "," + $('#RollRepeater_txt_score2_' + i).val() + ":";
                }
            }
        }
        else {
            // alert("百分制");
            for (i = 0; i < count; i++) {
                if ($('#RollRepeater_txt_score1_' + i).val() == "") {
                    myarray += $('#RollRepeater_txt_eduNum_' + i).html() + ",-1:";
                }
                else {
                    myarray += $('#RollRepeater_txt_eduNum_' + i).html() + "," + $('#RollRepeater_txt_score1_' + i).val() + ":";
                }
            }
        }
        //alert(myarray);
        if (count != undefined && finished == 0) {
            $.post("dataProcess.ashx", { op: "inputScore", count: count, eduNum: eduNum, scoreMode: scoreMode, myArray: myarray, rdom: Math.random() }, function (data) {
                if (data == "") {
                    alert("成绩保存成功！");

                }
                else {
                    alert("成绩保存失败！");
                }
            });
        }
        else if (count != undefined && finished == 1) {
            //alert("保存补考成绩");
            $.post("dataProcess.ashx", { op: "saveReistScore", count: count, eduNum: eduNum, myArray: myarray, rdom: Math.random() }, function (data) {
                if (data == "") {
                    alert("成绩保存成功！");

                }
                else {
                    alert("成绩保存失败！");
                }
            });
        }
        else {
            alert("没有成绩，不能保存！");
            return false;
        }


    });

    /*提交成绩事件*/
    $('#submitScore').click(function () {
        var eduNum = $('#eduNum').val();
        var finished = $('#finished').val();
        //alert(finished);
        var ff = "";
        if (eduNum != undefined && eduNum != "" && finished == "0") {//提交正常考试成绩
            $.post("dataProcess.ashx", { op: "selectSaveScore", eduNum: eduNum, flag: "1", rdom: Math.random() }, function (data) { //查看成绩是否保存
                if (data == "") { //成绩已保存，能提交
                    if (confirm("成绩提交后，将无法修改，确定提交吗？")) {
                        /*如果没有缺考，则不提示提交缺考成绩*/
                        $.post("dataProcess.ashx", { op: "checkSaveScoreQK", eduNum: eduNum, flag: "1", rdom: Math.random() }, function (data) {
                            if (data == "") {
                                if (confirm("确定提交缺考成绩吗？")) {
                                    ff = "yes";
                                } else {
                                    ff = "no";
                                }
                            } else {  //没有缺考
                                ff = "no";
                            }
                            if (ff != "") {
                                $.post("dataProcess.ashx", { op: "submitScore", eduNum: eduNum, ff: ff, rdom: Math.random() }, function (data) {
                                    if (data == "") {
                                        $('#finished').attr("value", "2"); //提交成功后，提交成功按钮不可用，保存按钮不可用
                                        /**如果没有不合格，不要问是否安培不考*/
                                        $.post("dataProcess.ashx", { op: "checkScoreHG", eduNum: eduNum, rdom: Math.random() }, function (data) {
                                            if (data == "") {//有不合格人员
                                                if (confirm("成绩提交成功！本次培训将安排补考吗？")) {
                                                    //生成补考考试---确定为安排补考，否则不安排补考

                                                } else {
                                                    //不生成补考考试，修改educationInfo_t 的finished 为3，不准考试中生成补考信息
                                                    $.post("dataProcess.ashx", { op: "updateFinished", eduNum: eduNum, rdom: Math.random() }, function (data) {
                                                        if (data == "") {
                                                            return;
                                                        } else { return false; }
                                                    });
                                                }
                                            } else {
                                                alert("成绩提交成功！");
                                                //不生成补考考试，修改educationInfo_t 的finished 为3，不准考试中生成补考信息
                                                $.post("dataProcess.ashx", { op: "updateFinished", eduNum: eduNum, rdom: Math.random() }, function (data) {
                                                    if (data == "") {
                                                        return;
                                                    } else { return false; }
                                                });
                                            }
                                        });
                                        return false;
                                    } else {
                                        alert("成绩提交失败！");
                                        return false;
                                    }
                                });
                            } else {
                                return false;
                            }
                        });
                    } else {
                        return false;
                    }

                } else { //成绩未保存，不能提交
                    alert("没有保存成绩，不能提交，请先保存成绩！");
                    return false;
                }
            });
        }
        else if (eduNum != undefined && finished == "1") {
            //alert("提交补考成绩！");
            $.post("dataProcess.ashx", { op: "selectSaveScore", eduNum: eduNum, flag: "2", rdom: Math.random() }, function (data) { //查看成绩是否保存
                if (data == "") {//成绩已经保存，否则
                    if (confirm("成绩提交后，将无法修改，确定提交吗？")) {
                        /*如果没有缺考，则不提示提交缺考成绩*/
                        $.post("dataProcess.ashx", { op: "checkSaveScoreQK", eduNum: eduNum, flag: "2", rdom: Math.random() }, function (data) {
                            if (data == "") {
                                if (confirm("确定提交补考的缺考成绩吗？")) {
                                    ff = "yes";
                                }
                                else {
                                    ff = "no";
                                }
                            }
                            else {//没有缺考
                                ff = "no";
                            }
                            if (ff != "") {
                                $.post("dataProcess.ashx", { op: "submitMakeupGrade", eduNum: eduNum, ff: ff, rdom: Math.random() }, function (data) {
                                    if (data == "") {
                                        alert("成绩提交成功！");
                                        $('#finished').attr("value", "2"); //提交成功后，提交成功按钮不可用，保存按钮不可用
                                        return;
                                    }
                                    else {
                                        alert("成绩提交失败！");
                                        return false;
                                    }
                                });
                            }
                            else { return false; }
                        });
                    }
                    else {
                        return false;
                    }
                }
                else {//成绩没有保存
                    //alert(data);
                    alert("没有保存成绩，不能提交，请先保存成绩！");
                    return false;
                }
            });

        }
        else {
            if (finished == "2") {
                alert("成绩已提交，不可重复提交！");
                return false;
            }
            else {
                alert("请选择您要提交成绩的培训计划！");
                return false;
            }

        }
    });
    /**员工教育培训的重置*/
    $('#resetEdu').click(function () {
        $('#txt_EducationAddress').attr("value", "");
        $('#txt_EducationBudget').attr("value", "");
        $('#txt_EducationContent').attr("value", "");
        $('#txt_EducationMaterial').attr("value", "");
        $('#txt_educationName').attr("value", "");
        $('#txt_EducationNumber').attr("value", "");
        $('#txt_EducationPeriod').attr("value", "");
        $('#txt_EducationTutor').attr("value", "");
        $('#txt_EducationType').val('内部培训');
        $('#txt_EndTime').attr("value", "");
        $('#txt_ExamineType').attr("value", "");
        $('#txt_StartTime').attr("value", "");
        $('#txt_InstitutionNum').val('');
        $('#txt_Finished').val('0');
        $('#txt_StartTime').attr("value", "");
        $('#txt_EndTime').attr("value", "");
        $('#txt_PlanCategoryNum').val('');
        $('#txt_planNum').val('null');
    });

    /*验证培训编号是否重复*/
    var educationNum = $('#txt_educationNumAdd').val(); /*加载后验证培训编号是否重复*/
    var success = $('#success').val();
    if (educationNum != undefined && educationNum != "" && success == "0") {
        /*进行验证*/
        $.post("dataProcess.ashx", { op: "txt_educationNum", educationNum: educationNum, rdom: Math.random() }, function (data) {
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
            $.post("dataProcess.ashx", { op: "txt_educationNum", educationNum: educationNum, rdom: Math.random() }, function (data) {
                if (data == "") {
                    //alert("培训编号不存在，可以添加！");
                    return;
                }
                else {
                    alert("培训编号" + educationNum + "已存在！");
                    $('#txt_educationNumAdd').attr("value", "");
                    $('#txt_educationNumAdd').attr("value", "");
                    return false;
                }
            });
        }
        else {

            return false;
        }
    });

    /*打印名单事件*/
    $('#printRoll').click(function () {
        //alert("printRoll");
        var educationNum = $("input[.radio][checked]").val(); //获取单选按钮 
        var finished = $("input[.radio][checked]").siblings('#Finished').val(); //finished为0才可以进行打印报名名单，否则不允许打印
        $("#selectID").val(educationNum);
        if (educationNum != undefined && educationNum != null) {
            if (finished == "0" || finished == "1") {
                /*先发送到后台查看有没有名单，如果报名了，则提示打印，否则，不大允许打印*/
                //window.location.href = "printRegistrationRoll.aspx?educationNum=" + educationNum + "&rdom=" + Math.random();      //水晶报表打印，现在不用水晶报表了
                return;
            }
            else {
                alert("成绩已经提交,如果需要，到员工教育培训信息里打印！");
                return false;
            }
        }
        else {
            alert("请选择您要打印名单的培训计划，点击单选按钮选中！");
            return false;
        }

    });
})