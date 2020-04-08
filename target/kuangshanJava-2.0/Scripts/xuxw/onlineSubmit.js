$(function () {

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


    //在线考试的批量正常提交
    $('#many').click(function () {
        var testID = $("input[.radio][checked]").val(); //获取单选按钮
        var eduNum = $("input[.radio][checked]").siblings('.eduNum').val();
        var testType = $("input[.radio][checked]").siblings('.testType').val();
        var finished = $("input[.radio][checked]").siblings('.finished').val();
        //alert(testID + "," + eduNum + "," + testType);
        if (finished == "0" && finished != undefined) {
            $.post("dataProcess.ashx", { op: "selectSaveScore", eduNum: eduNum, testID: testID, rdom: Math.random() }, function (data) { //查看成绩是否保存
                if (data == "") {
                    if (testID != undefined && eduNum != undefined && testType == 1) {  //提交正常考试的成绩
                        if (confirm("确认提交成绩，提交后法编辑！")) {
                            $.post("dataProcess.ashx", { op: "submitOnlineScore", eduNum: eduNum, testID: testID, rdom: Math.random() }, function (data) {
                                if (data == "") {
                                    alert("成绩提交成功！");
                                    window.location.href = location.href;
                                }
                                else {
                                    alert("成绩提交失败！");
                                }
                            });
                        }
                        else {
                            return false;
                        }
                    }
                    else if (testID != undefined && eduNum != undefined && testType == 2) {  //提交补考的成绩
                        if (confirm("确认提交成绩，提交后法编辑！")) {
                            $.post("dataProcess.ashx", { op: "submitOnlineMakeupScore", eduNum: eduNum, testID: testID, rdom: Math.random() }, function (data) {
                                if (data == "") {
                                    alert("成绩提交成功！");
                                    window.location.href = location.href;
                                }
                                else {
                                    alert("成绩提交失败！");
                                }
                            });
                        }
                        else {
                            return false;
                        }
                    }
                    else {
                        alert('请选择要提交成绩的考试！');
                        return false;
                    }
                } else {
                    alert("没有保存成绩，请先保存成绩，再提交！");
                    return false;
                }
            });
        }
        else {
            alert("已经批量提交，不可以重复提交！");
            return false;
        }

    });
    /*跳转到提交单个成绩的页面*/
    $('#one').click(function () {
        var testID = $("input[.radio][checked]").val(); //获取单选按钮
        var eduNum = $("input[.radio][checked]").siblings('.eduNum').val();
        var testType = $("input[.radio][checked]").siblings('.testType').val();
        /*由于提交一个人以后就会修改提交完成字段，所以在这里没有进行验证是否提交后能否再次提交的可能**/
        //alert(testID + "," + eduNum + "," + testType);
        if (testID != undefined && eduNum != undefined && testType != "") {  //提交正常考试,补考的成绩
            return qBox.iFLoad({ title: '提交考生成绩', src: 'onlineScoreSubmitOne.aspx?eduNum=' + eduNum + "&testID=" + testID + "&testType=" + testType + '&rdom=' + Math.random(), w: 624, h: 493 });
        }
        else {
            alert('请选择要提交成绩的考试！');
            return false;
        }
    });
    /*在线考试的单个成绩的提交处理*/
    $('#oneSubmit').click(function () {
        var eduNum = $('.eduNum').val(); //eduNum  testID testType  empNum
        var testID = $('.testID').val();
        var testType = $('.testType').val();
        var empNumStr = "";
        $('[name=checkbox]:checkbox:checked').each(function () {
            empNumStr += "'" + $(this).val() + "',";
        });
        //alert("提交" + eduNum + "-" + testID + "-" + testType + "-" + empNumStr);
        $.post("dataProcess.ashx", { op: "selectSaveScore", eduNum: eduNum, testID: testID, rdom: Math.random() }, function (data) { //查看成绩是否保存
            if (data == "") {
                if (testID != undefined && eduNum != undefined && testType == 1 && empNumStr != "") {  //提交正常考试的成绩
                    if (confirm("确认提交成绩，提交后法编辑！")) {
                        $.post("dataProcess.ashx", { op: "submitOnlineScoreByOne", eduNum: eduNum, testID: testID, empNumStr: empNumStr, rdom: Math.random() }, function (data) {
                            if (data == "") {
                                alert("成绩提交成功！");
                                window.location.href = location.href;
                            }
                            else {
                                alert("成绩提交失败！");
                            }
                        });
                    }
                    else {
                        return false;
                    }
                }
                else if (testID != undefined && eduNum != undefined && testType == 2 && empNumStr != "") {  //提交补考的成绩
                    if (confirm("确认提交成绩，提交后法编辑！")) {
                        $.post("dataProcess.ashx", { op: "submitOnlineMakeupScoreByOne", eduNum: eduNum, testID: testID, empNumStr: empNumStr, rdom: Math.random() }, function (data) {
                            if (data == "") {
                                alert("成绩提交成功！");
                                window.location.href = location.href;
                            }
                            else {
                                alert("成绩提交失败！");
                            }
                        });
                    }
                    else {
                        return false;
                    }
                }
                else {
                    alert('请选择要提交成绩的考试！');
                    return false;
                }
            } else {
                alert("没有保存成绩，请先保存成绩，再提交！");
                return false;
            }
        });
    });


    /*全选事件*/
    $('#selectAll').click(function () {
        //alert(1);
        $('[name=checkbox]:checkbox').attr('checked', true);
        $('tbody > tr').addClass('selected'); //全选添加选中颜色
    });
    /*全不选*/
    $('#selectNo').click(function () {
        //alert(2);
        $('[name=checkbox]:checkbox').attr("checked", false);
        $('tbody > tr').removeClass('selected'); //全不选移除选中颜色
    });
})