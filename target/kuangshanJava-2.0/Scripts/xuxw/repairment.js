$(function () {
    //添加事件
    $('#addApply').click(function () {
        var RepairID = $("input[.radio][checked]").val(); //获取单选按钮
        var state = $("input[.radio][checked]").siblings('.state').val();
        if (state == "") {
            if (RepairID != "" && RepairID != undefined) {
                return qBox.iFLoad({ title: '添加检修作业许可申请', src: 'License.aspx?RepairID=' + RepairID + '&rdom=' + Math.random(), w: 664, h: 615 });
            }
            else {
                alert("请选择您添加许可信息的记录，点击单选按钮选中！");
                return false;
            }
        }
        else {
            alert("许可作业已经添加，不可以重复添加！");
            return false;
        }
    });
    //修改事件
    $('#update').click(function () {
        var repairID = $("input[.radio][checked]").val();
        var state = $("input[.radio][checked]").siblings('.state').val();
        var archivedState = $("input[.radio][checked]").siblings('.archivedState').val();
        var userName = $("#UserName").val();
        $.post("Judge.ashx", { op: "repair", userName: userName, taskID: repairID }, function (data) {
            if (repairID != undefined) {
                if (data == "true") {
                    if (archivedState == "0") {
                        if (state == "4" || state == "" || state == "5") {
                            return qBox.iFLoad({ title: '修改检修作业许可申请', src: 'repairmentApplyEdit.aspx?repairID=' + repairID + '&rdom=' + Math.random(), w: 664, h: 330 });
                        }
                        else {
                            alert("该记录不允许修改！");
                            return false;
                        }
                    }
                    else {
                        alert("该申请已经归档，不可以修改！");
                        return false;
                    }
                }
                else {
                    alert("不是检修负责人，故不能修改！");
                }
            }
            else {
                alert("请选择您要修改的记录！点击单选按钮选中！");
            }
        });
    });


    //加载的时候，让其为关闭状态,点击可以打开
    $('tr.parent').toggleClass("selected").siblings('.child_row_01').toggle();
    //审批时候，申请信息的显示和隐藏
    $('tr.parent').click(function () {
        $(this).toggleClass("selected").siblings('.child_row_01').toggle();
        if ($(this).find('#openImg').attr("src") == "../images/down03-1.png") {
            document.all("openImg").src = "../images/up03-2.png";
        }
        else {
            document.all("openImg").src = "../images/down03-1.png";
        }
    });


    //提交事件 
    $('#submit').click(function () {
        var repairID = $("input[.radio][checked]").val();
        var state = $("input[.radio][checked]").siblings('.state').val();
        var archivedState = $("input[.radio][checked]").siblings('.archivedState').val();
        var userName = $("#UserName").val();
        $.post("../compulsoryLicenseMan/Judge.ashx", { op: "repair", userName: userName, taskID: repairID }, function (data) {
            if (repairID != undefined) {
                if (data == "true") {
                    if (archivedState == "0") {
                        if (state != "1" && state != "2" && state != "3") {
                            return qBox.iFLoad({ title: '提交检修作业许可申请', src: 'repairmentApplySubmit.aspx?repairID=' + repairID + '&rdom=' + Math.random(), w: 800, h: 600 });
                        }
                        else {
                            alert("该记录已经提交，不允许重复提交！");
                            return false;
                        }
                    }
                    else {
                        alert("该申请已经归档，不可以修改！");
                        return false;
                    }
                }
                else {
                    alert("不是检修负责人，故不能提交！");
                }
            }
            else {
                alert("请选择您要提交的记录，点击单选按钮选中！");
                return false;
            }
        });
    });
    //撤回事件 
    $('#callback').click(function () {
        var repairID = $("input[.radio][checked]").val();
        var state = $("input[.radio][checked]").siblings('.state').val();
        var archivedState = $("input[.radio][checked]").siblings('.archivedState').val();
        var userName = $("#UserName").val();
        $.post("../compulsoryLicenseMan/Judge.ashx", { op: "repair", userName: userName, taskID: repairID }, function (data) {
            if (repairID != undefined) {
                if(data == "true"){
                    if (archivedState == "0") {
                        if (state == "1") {
                            if (confirm("确定要撤回该申请吗？")) {
                                $.post("DataProcess.ashx", { Operation: "callbackRepairTask_T", repairID: repairID, userName: userName, rdom: Math.random() }, function (data) {
                                    if (data == "") {
                                        alert("撤回成功！");
                                        $("input[.radio][checked]").parent().parent().find('.appState').html("撤回");
                                        location.reload();
                                        return false;
                                    }
                                    else {
                                        alert(data);
                                        return false;
                                    }
                                });
                            }
                            else {
                                //不撤回
                                return false;
                            }
                        }
                        else if (state == "5") {
                            alert("已经退回，不能再撤回！");
                            return false;
                        }
                        else if (state == "") {
                            alert("该记录处于编辑状态，不允许撤回！");
                            return false;
                        }
                        else if (state == "2" || state == "3") {
                            alert("该记录许可审批完成，不允许撤回！");
                            return false;
                        }
                        else {
                            alert("该记录不允许撤回！");
                            return false;
                        }
                    }
                    else {
                        alert("该申请已经归档，不允许撤回！");
                        return false;
                    }
                }
                else {
                    alert("不是检修负责人，故不能撤回！");
                }
            }
            else {
                alert("请选择您要撤回的记录，点击单选按钮选中！");
                return false;
            }
        });
    });
    //归档事件 
    $('#archive').click(function () {
        var repairID = $("input[.radio][checked]").val();
        var state = $("input[.radio][checked]").siblings('.CheckInstitutionInInCharge').val();
        var archivedState = $("input[.radio][checked]").siblings('.archivedState').val();
        var userName = $("#UserName").val();
        $.post("../compulsoryLicenseMan/Judge.ashx", { op: "repair", userName: userName, taskID: repairID }, function (data) {
            if (repairID != undefined) {
                if (data == "true") {
                    if (archivedState == "0") {
                        if (state != "") {
                            if (confirm("您确定要归档吗？")) {
                                $.post("DataProcess.ashx", { Operation: "archiveRepairTask_T", repairID: repairID, userName: userName, rdom: Math.random() }, function (data) {
                                    if (data == "") {
                                        alert("归档成功！");
                                        $("#tr_" + repairID).remove();
                                        return;
                                    }
                                    else {
                                        alert(data);
                                        return false;
                                    }
                                });
                            } else {
                                return;
                            }
                        } else {
                            alert("该申请验收未完成，不可以归档！");
                            return;
                        }
                    }
                    else {
                        alert("该申请已经归档，不需要归档！");
                        return false;
                    }
                } else {
                    alert("不是检修负责人，故不能归档！");
                }
            }
            else {
                alert("请选择您要归档的记录，点击单选按钮选中！");
                return false;
            }
        });
    });
    //打印事件
    $('#print').click(function () {
        var taskID = $("input[.radio][checked]").val();
        var state = $("input[.radio][checked]").siblings('.state').val();
        var categoryNum = $("input[name='radio']:checked").siblings(".categoryNum").val();
        var userName = $("#UserName").val();
        $.post("../compulsoryLicenseMan/Judge.ashx", { op: "repair", userName: userName, taskID: taskID }, function (data) {
            if (taskID != undefined) {
                if (data == "true") {
                    if (state == "2" || state == "3") {
                        window.open('../compulsoryLicenseMan/ApprovepPrint1.aspx?taskID=' + taskID + '&TaskCategoryNum=' + categoryNum + '', '_blank');
                    } else if (state == "") {
                        alert("检修作业审批未开始，不可以打印！");
                    } else if (state == "1") {
                        alert("检修作业正在审批中，不可以打印！");
                    } else if (state == "4") {
                        alert("检修作业已撤回，不可以打印！");
                    } else if (state == "5") {
                        alert("检修作业已退回，不可以打印！");
                    }
                } else {
                    alert("不是检修负责人，不能打印！");
                }
            } else {
                alert("请选择您要打印的记录，点击单选按钮选中！");
            }
        });
    });
    //批复记录事件 
    $('#history').click(function () {
        var repairID = $("input[.radio][checked]").val();
        //alert(repairID);
        if (repairID != undefined) {
            return qBox.iFLoad({ title: '检修作业许可批复记录', src: '../compulsoryLicenseMan/taskHistoryApproveMan.aspx?categoryNum=249&taskID=' + repairID + '&rdom=' + Math.random(), w: 900, h: 250 });
        }
        else {
            alert("请选择您要查看的记录，点击单选按钮选中！");
            return false;
        }
    });

    //批复记录事件，在审批窗口中的批复记录
    $('#history1').click(function () {
        var repairID = $('#txt_TaskID').val();
        var categoryNum = $('#txt_TaskCategoryNum').val();
        //alert(repairID);
        if (repairID != undefined) {
            return qBox.iFLoad({ title: '检修作业许可批复记录', src: '../compulsoryLicenseMan/taskHistoryApproveMan.aspx?categoryNum=' + categoryNum + '&taskID=' + repairID + '&rdom=' + Math.random(), w: 900, h: 250 });
        }
        else {
            alert("请选择您要查看的信息！");
            return false;
        }
    });

    //点击审批是否结束事件，如果结束，则下一部门不可以选择，否则可以选择
    $('#txt_Finished').change(function () {
        var finish = $(this).val();
        if (finish == "3") {
            $('#txt_NextInstitution').val('');
            $('#txt_NextInstitution').hide();
        }
        else {
            $('#txt_NextInstitution').show();
        }
    });
})