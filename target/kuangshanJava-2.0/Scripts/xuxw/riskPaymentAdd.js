$(function () {
    //季度发生变化时，对应的每个月出勤天数的输入名称
    var labsum = $('#labsum').val();
    if (labsum != "0") {
        var season = $('#txt_season').val();
        if (season == "1") {
            $('#first').html('1');
            $('#second').html('2');
            $('#third').html('3');
        }
        else if (season == "2") {
            $('#first').html('4');
            $('#second').html('5');
            $('#third').html('6');
        }
        else if (season == "3") {
            $('#first').html('7');
            $('#second').html('8');
            $('#third').html('9');
        }
        else if (season == "4") {
            $('#first').html('10');
            $('#second').html('11');
            $('#third').html('12');
        }
        else {
            $('#first').html('');
            $('#second').html('');
            $('#third').html('');
        }
    } else {
        return false;
    }
    //风险抵押金的添加js文件
    $('input[class^=dfa]').change(function () {
        var temp = $(this).val();
        var patrn = /^\d+$/;
        //alert(patrn.test(temp));
        if (patrn.test(temp) == false) {
            alert("出勤天数必须是正整数！");
            $(this).attr("value", "");
            //$(this).focus();
            return false;
        }
        else if (parseInt(temp) < 0 || parseInt(temp) > 31) {
            alert("出勤天数必须大于等于0，小于等于" + 31);
            $(this).attr("value", "");
            //$(this).focus();
            return false;
        }
        else {
            return false;
        }
    });
    //填写本季度总的出勤天数
    $('input[class^=dfa]').blur(function () {
        var season = $('#txt_season').val();
        var temp1 = $(this).parent().parent().find('.dfa3_1').val();
        var temp2 = $(this).parent().parent().find('.dfa2_1').val();
        var temp3 = $(this).parent().parent().find('.dfa1_1').val();
        var notAllow = $(this).parent().parent().find('.notAllowed').val();
        var StandardStr = $(this).parent().parent().find('.Standard').html();
        var ScoreStr = $(this).parent().parent().find('.Score').html();
        if (temp1 != "" && temp2 != "" && temp3 != "") {
            $(this).parent().parent().find('.sumdfa4_1').val(parseInt(temp1) + parseInt(temp2) + parseInt(temp3));
            if (season == "1") {  //第一季度
                if ((parseInt(temp1) + parseInt(temp2) + parseInt(temp3) >= 64) && notAllow == "0") {//总天数大于或等于64天，才可以进行计算风险抵押金
                    if (parseInt(temp1) >= 22 && parseInt(temp2) >= 20 && parseInt(temp3) >= 22) {
                        $(this).parent().parent().find('.actualMoney').val((parseFloat(StandardStr) * parseFloat(ScoreStr)) / 100);
                        return false;
                    }
                    else if ((parseInt(temp1) >= 22 && parseInt(temp2) >= 20 && parseInt(temp3) < 20) || (parseInt(temp1) >= 22 && parseInt(temp3) >= 22 && parseInt(temp2) < 20) || (parseInt(temp2) >= 20 && parseInt(temp3) >= 22 && parseInt(temp1) < 20)) {
                        $(this).parent().parent().find('.actualMoney').val((parseFloat(StandardStr) * parseFloat(ScoreStr) * 2) / 300); //有一个月不满足
                        return false;
                    }
                    else {
                        $(this).parent().parent().find('.actualMoney').val((parseFloat(StandardStr) * parseFloat(ScoreStr)) / 300); //有一个月不满足
                        return false;
                    }
                }
                else { //小于季度应
                    $(this).parent().parent().find('.actualMoney').val('0');
                    return false;
                }
            }
            else { //其他季度
                if ((parseInt(temp1) + parseInt(temp2) + parseInt(temp3) >= 66) && notAllow == "0") {//总天数大于或等于64天，才可以进行计算风险抵押金
                    if (parseInt(temp1) >= 22 && parseInt(temp2) >= 22 && parseInt(temp3) >= 22) {
                        $(this).parent().parent().find('.actualMoney').val((parseFloat(StandardStr) * parseFloat(ScoreStr)) / 100);
                        return false;
                    }
                    else if ((parseInt(temp1) >= 22 && parseInt(temp2) >= 22 && parseInt(temp3) <= 22) || (parseInt(temp1) >= 22 && parseInt(temp2) <= 22 && parseInt(temp3) >= 22) || (parseInt(temp2) >= 22 && parseInt(temp3) >= 22 && parseInt(temp1) <= 22)) {
                        $(this).parent().parent().find('.actualMoney').val((parseFloat(StandardStr) * parseFloat(ScoreStr) * 2) / 300); //有一个月不满足
                        return false;
                    }
                    else {
                        $(this).parent().parent().find('.actualMoney').val((parseFloat(StandardStr) * parseFloat(ScoreStr)) / 300); //有一个月不满足
                        return false;
                    }
                }
                else { //小于季度应
                    $(this).parent().parent().find('.actualMoney').val('0');
                    return false;
                }
            }
        }
        else {
            if (temp2 == "") {
                $(this).parent().parent().find('.dfa2_1').focus();
                return false;
            }
            else if (temp3 == "") {
                $(this).parent().parent().find('.dfa1_1').focus();
                return false;
            }
            else {
                $(this).parent().parent().find('.dfa3_1').focus();
                return false;
            }
            alert("请将本季度三个月出勤天数填写完整！");
            return false;
        }
    });

    //否决条件事件
    $('input[class^=notAllowed]').click(function () {
        var temp = $(this).val();
        //alert(temp);
        if (parseInt(temp) == 0) {
            $(this).val('1');
            $(this).parent().parent().find('.actualMoney').val('0');
        }
        else {
            $(this).attr("checked", false);
            $(this).val('0');
        }
    });

    //填写实发金额
    //    $('input[class^=sumdfa4_]').change(function () {
    //        $(this).parent().parent().find('.actualMoney').val(1111);

    //    });
    //验证实发金额填写是否正确，必须为实数
    //    $('input[class^=actualMone]').change(function () {
    //        var temp = $(this).val();
    //        if (isNaN(temp)) {
    //            alert("考核得分必须是实数！");
    //            $(this).attr("value", "");
    //            $(this).focus();
    //            return false;
    //        }
    //        else {
    //            return false;
    //        }

    //    });

    //提交到数据库
    $('#submitAdd').click(function () {
        var subFlag = $('#subFlag').val();
        var yearNum = $('#txt_year').val();
        var seasonNum = $('#txt_season').val();
        var empNumStr = "";
        var PaymentsStr = "";
        var RatioStr = "";
        var StandardStr = "";
        var ScoreStr = "";
        var dfa1_1Str = "";
        var dfa2_1Str = "";
        var dfa3_1Str = "";
        var notAllow = "";
        //var sumdfa4_1Str = ""; // 在数据库端进行求总天数和实发金额
        var remarkStr = "";

        if (subFlag == "1") {
            alert("已经添加，不可以重复添加本季度风险抵押金！");
            return false;
        }
        else {
            //可以提交
            // alert('submit');
            $('input[class^=dfa1_]').each(function () {
                empNumStr += $(this).parent().parent().find('.empNum').val() + ";";
                PaymentsStr += $(this).parent().parent().find('.Payments').html() + ";";
                RatioStr += $(this).parent().parent().find('.Ratio').html() + ";";
                StandardStr += $(this).parent().parent().find('.Standard').html() + ";";
                ScoreStr += $(this).parent().parent().find('.Score').html() + ";";
                remarkStr += $(this).parent().parent().find('.remark').val() + ";";
                notAllow += $(this).parent().parent().find('.notAllowed').val() + ";";
                if ($(this).val() == "") {
                    dfa1_1Str += "0;";
                }
                else {
                    dfa1_1Str += $(this).val() + ";";
                }
                if ($(this).parent().parent().find('.dfa2_1').val() == "") {
                    dfa2_1Str += "0;";
                } else {
                    dfa2_1Str += $(this).parent().parent().find('.dfa2_1').val() + ";";
                }
                if ($(this).parent().parent().find('.dfa3_1').val() == "") {
                    dfa3_1Str += "0;";
                }
                else {
                    dfa3_1Str += $(this).parent().parent().find('.dfa3_1').val() + ";";
                }

            });
            // alert(dfa1_1Str); alert(dfa2_1Str); alert(dfa3_1Str); alert(empNumStr); alert(PaymentsStr); alert(RatioStr); alert(StandardStr); alert(ScoreStr); alert(remarkStr); alert(notAllow);
            if (empNumStr != "" && dfa1_1Str != "" && dfa2_1Str != "" && dfa3_1Str != "" && seasonNum != "" && yearNum != "") {
                //进行提交数据库
                $.post("dataProcess.ashx", { op: "gpRiskPaymentAdd", yearNum: yearNum, seasonNum: seasonNum, dfa1_1Str: dfa1_1Str, dfa2_1Str: dfa2_1Str, dfa3_1Str: dfa3_1Str, empNumStr: empNumStr, PaymentsStr: PaymentsStr, RatioStr: RatioStr, StandardStr: StandardStr, ScoreStr: ScoreStr, remarkStr: remarkStr, notAllow: notAllow, rdom: Math.random() }, function (data) {
                    if (data == "") {
                        alert("添加成功！");
                        $("#subFlag").val('1');
                        return;
                    }
                    else {
                        alert("添加失败！");
                        return;
                    }
                });
            } else {
                alert("请先填写员工风险抵押金发放金额后再提交！");
            }
        }
    });


    //修改时的提交数据
    $('#submitEdd').click(function () {
        var subFlag = $('#subFlag').val();
        var yearNum = $('#txt_year').val();
        var seasonNum = $('#txt_season').val();
        var institution = $('#txt_institution').val();
        var empNumStr = "";

        var dfa1_1Str = "";
        var dfa2_1Str = "";
        var dfa3_1Str = "";
        var remarkStr = "";

        if (subFlag == "1") {
            alert("已经添加，不可以重复添加本季度风险抵押金！");
            return false;
        }
        else {
            //可以提交
            // alert('submit');
            $('input[class^=dfa1_]').each(function () {
                empNumStr += $(this).parent().parent().find('.empNum').val() + ";";
                remarkStr += $(this).parent().parent().find('.remark').val() + ";";
                if ($(this).val() == "") {
                    dfa1_1Str += "0;";
                }
                else {
                    dfa1_1Str += $(this).val() + ";";
                }
                if ($(this).parent().parent().find('.dfa2_1').val() == "") {
                    dfa2_1Str += "0;";
                } else {
                    dfa2_1Str += $(this).parent().parent().find('.dfa2_1').val() + ";";
                }
                if ($(this).parent().parent().find('.dfa3_1').val() == "") {
                    dfa3_1Str += "0;";
                }
                else {
                    dfa3_1Str += $(this).parent().parent().find('.dfa3_1').val() + ";";
                }

            });
            // alert(dfa1_1Str); alert(dfa2_1Str); alert(dfa3_1Str); alert(empNumStr); alert(remarkStr);
            if (empNumStr != "" && dfa1_1Str != "" && dfa2_1Str != "" && dfa3_1Str != "" && seasonNum != "" && yearNum != "") {
                //进行提交数据库{
                $.post("dataProcess.ashx", { op: "gpRiskPaymentEdit", yearNum: yearNum, seasonNum: seasonNum, dfa1_1Str: dfa1_1Str, dfa2_1Str: dfa2_1Str, dfa3_1Str: dfa3_1Str, empNumStr: empNumStr, institution: institution, remarkStr: remarkStr, rdom: Math.random() }, function (data) {
                    if (data == "") {
                        alert("修改成功！");
                        $("#subFlag").val('1');
                        return;
                    }
                    else {
                        alert("修改失败！");
                        return;
                    }
                });
            } else {
                alert("请先填写员工风险抵押金法法规金额后再提交！");
            }
        }
    });

    //添加时候的重置按钮
    $('#btnReset').click(function () {
        $('#txt_Payments').attr("value", "");
        $('#txt_Ratio').attr("value", "");
        $('#txt_Remark').attr("value", "");
    });
})
 