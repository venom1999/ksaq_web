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
        if (str == "DangerTaskName") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "3"); //设置条件选中，2对应大于小于等于，3对应like或=
            $("#comlon" + temp + "2").val("TextBox" + temp + "1"); //设置值选中,就是下面的输入框是显示的那种

            $("#DropDownList" + temp + "2").hide(); //大于类
            $("#DropDownList" + temp + "3").show(); //包含

            $("#ddlKeys" + temp + "1").hide(); //机构
            $("#ddlKeys" + temp + "2").hide(); //状态
            $("#ddlKeys" + temp + "3").hide(); //是否归档

            $("#TextBox" + temp + "1").show(); //文本框

            //$("#queryArchived").val("0");
        }
        else if (str == "TaskInstitution") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "3");
            $("#comlon" + temp + "2").val("ddlKeys" + temp + "1");

            $("#DropDownList" + temp + "2").hide();
            $("#DropDownList" + temp + "3").show();

            $("#ddlKeys" + temp + "1").show(); //机构
            $("#ddlKeys" + temp + "2").hide(); //状态
            $("#ddlKeys" + temp + "3").hide(); //是否归档

            $("#TextBox" + temp + "1").hide(); //文本框

            //$("#queryArchived").val("0");
        }
        else if (str == "State") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "3");
            $("#comlon" + temp + "2").val("ddlKeys" + temp + "2");

            $("#DropDownList" + temp + "2").hide();
            $("#DropDownList" + temp + "3").show();

            $("#ddlKeys" + temp + "1").hide(); //机构
            $("#ddlKeys" + temp + "2").show(); //状态
            $("#ddlKeys" + temp + "3").hide(); //是否归档

            $("#TextBox" + temp + "1").hide(); //文本框

            //$("#queryArchived").val("0");
        }
        else if (str == "Archived") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "3");
            $("#comlon" + temp + "2").val("ddlKeys" + temp + "3");

            $("#DropDownList" + temp + "2").hide();
            $("#DropDownList" + temp + "3").show();

            $("#ddlKeys" + temp + "1").hide(); //机构
            $("#ddlKeys" + temp + "2").hide(); //状态
            $("#ddlKeys" + temp + "3").show(); //是否归档

            $("#TextBox" + temp + "1").hide(); //文本框

            //$("#queryArchived").val($("#ddlKeys" + temp + "3").val());
        }
         else if (str == "请选择") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "3");
            $("#comlon" + temp + "2").val("TextBox" + temp + "1");

            $("#DropDownList" + temp + "2").hide();
            $("#DropDownList" + temp + "3").show();

            $("#ddlKeys" + temp + "1").hide(); //机构
            $("#ddlKeys" + temp + "2").hide(); //状态
            $("#ddlKeys" + temp + "3").hide(); //是否归档

            $("#TextBox" + temp + "1").show(); //文本框
            $("#TextBox" + temp + "1").attr("value", "");

            //$("#queryArchived").val("0");
        }
    }

    //为选中行添加高亮
    $('.radio').click(function () {
        $(this).parent().parent().addClass('selected');
        $(this).parent().parent().siblings().removeClass('selected');
    });


    //添加申请事件
    $('#addApply').click(function () {
        return qBox.iFLoad({ title: '添加危险作业申请', src: 'dangerTaskAdd.aspx?rdom=' + Math.random(), w: 800, h: 615 });
    });

    //详细事件
    $('#detail').click(function () {
        var taskID = $("input[.radio][checked]").val();
        var archivedState = $("input[.radio][checked]").siblings('.archivedState').val();
        if (taskID != undefined) {
            return qBox.iFLoad({ title: '查看危险作业申请详细', src: 'dangerTaskDetail.aspx?taskID=' + taskID + '&archive=' + archivedState + '&rdom=' + Math.random() + '&fatherCookie=' + getHtmlDocName(), w: 800, h: 460 });
        }
        else {
            alert("请选择您要查看的信息！");
            return false;
        }
    });


    //修改事件
    $('#update').click(function () {
        var taskID = $("input[.radio][checked]").val();
        var state = $("input[.radio][checked]").siblings('.state').val();
        var archivedState = $("input[.radio][checked]").siblings('.archivedState').val();
        var userName = $("#UserName").val();
        var judge = "";
        $.post("Judge.ashx", { op: "danger", taskID:taskID, userName: userName }, function (data) {
            judge = data;
            if (taskID != undefined) {
                if (judge == "true") {
                    if (archivedState == "0") {

                        if (state == "4" || state == "" || state == "5") {
                            return qBox.iFLoad({ title: '修改危险作业申请', src: 'dangerTaskEdit.aspx?taskID=' + taskID + '&rdom=' + Math.random(), w: 800, h: 585 });
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
                } else {
                    alert("不是申请人，不能修改！");
                }
            }
            else {
                alert("请选择您要修改的信息！");
                return false;
            }
        });
    });

    //删除事件
    $('#delete').click(function () {  //Task_T
        var taskID = $("input[.radio][checked]").val(); //获取单选按钮
        var state = $("input[.radio][checked]").siblings('.state').val();
        var archivedState = $("input[.radio][checked]").siblings('.archivedState').val();
        var userName = $("#UserName").val();
        var judge = "";
        $.post("Judge.ashx", { op: "danger", taskID: taskID, userName: userName }, function (data) {
            judge = data;
            if (taskID != undefined) {
                if (judge == "true") {
                    if (archivedState == "0") {

                        //执行删除操作
                        if (state == "4" || state == "5" || state == "" || state == "3") {
                            /*获取变量，并进行删除处理，异步进行，先删除数据库，然后回调函数删除页面上的一行*/
                            if (confirm("您确定要删除吗?")) {
                                $.post("dataProcess.ashx", { op: "Task_T", taskID: taskID, userName: userName, rdom: Math.random() }, function (data) {
                                    if (data == "") {
                                        $("#tr_" + taskID).remove();
                                    }
                                    else {
                                        alert(data);
                                        return false;
                                    }
                                });
                            }
                            else {
                                return false;
                            }
                        }
                        else {
                            alert("该作业已提交，故不允许删除");
                            return false;
                        }


                    }
                    else {
                        alert("该申请已经归档，不可以删除！");
                        return false;
                    }
                } else {
                    alert("不是申请人，不能删除！");
                }
            }
            else {
                alert("请选择您要删除的记录，点击单选按钮选中！");
                return false;
            }
        });
        
    });

    //撤回事件
    $('#callback').click(function () {
        var taskID = $("input[.radio][checked]").val();
        var state = $("input[.radio][checked]").siblings('.state').val();
        var archivedState = $("input[.radio][checked]").siblings('.archivedState').val();
        var userName = $("#UserName").val();
        var judge = "";
        $.post("Judge.ashx", { op: "danger", taskID: taskID, userName: userName }, function (data) {
            judge = data;
            if (taskID != undefined) {
                if (judge == "true") {
                    if (archivedState == "0") {
                        if (state == "1") {
                            if (confirm("确定要撤回该申请吗？")) {
                                $.post("dataProcess.ashx", { op: "callbackDangerTask_T", taskID: taskID, userName: userName, rdom: Math.random() }, function (data) {
                                    if (data == "success") {
                                        alert("撤回成功！");
                                        $("input[.radio][checked]").parent().parent().find('.appState').html("撤回");
                                        location.reload();
                                        return false;
                                    }
                                    else {
                                        alert("撤回失败！");
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
                        alert("该申请已经归档，不可以删除！");
                        return false;
                    }
                } else {
                    alert("不是申请人，不能撤回！");
                }
            }
            else {
                alert("请选择您要撤回的记录，点击单选按钮选中！");
                return false;
            }
        });
        //if (taskID != undefined) {
        //    if (archivedState == "0") {
        //        if (state == "1") {
        //            if (confirm("确定要撤回该申请码？")) {
        //                $.post("dataProcess.ashx", { op: "callbackDangerTask_T", taskID: taskID, userName: userNaeme, rdom: Math.random() }, function (data) {
        //                    if (data == "") {
        //                        alert("撤回成功！");
        //                        $("input[.radio][checked]").parent().parent().find('.appState').html("撤回");
        //                        return false;
        //                    }
        //                    else {
        //                        alert(data);
        //                        return false;
        //                    }
        //                });
        //            }
        //            else {
        //                //不撤回
        //                return false;
        //            }
        //        }
        //        else {
        //            alert("该记录不允许撤回！");
        //            return false;
        //        }

        //    }
        //    else {
        //        alert("该申请已经归档，不可以撤回！");
        //        return false;
        //    }
        //}
        //else {
        //    alert("请选择您要撤回的记录，点击单选按钮选中！");
        //    return false;
        //}
    });

    //提交事件
    $('#submit').click(function () {
        var taskID = $("input[.radio][checked]").val();
        var state = $("input[.radio][checked]").siblings('.state').val();
        var archivedState = $("input[.radio][checked]").siblings('.archivedState').val();
        var userName = $("#UserName").val();
        var judge = "";
        $.post("Judge.ashx", { op: "danger", taskID: taskID, userName: userName }, function (data) {
            judge = data;
            if (taskID != undefined) {
                if (judge == "true") {
                    if (archivedState == "0") {
                        if (state != "1" && state != "2" && state != "3") {
                            return qBox.iFLoad({ title: '提交危险作业申请', src: 'dangerTaskSubmit.aspx?taskID=' + taskID + '&rdom=' + Math.random(), w: 800, h: 479 });
                        }
                        else {
                            alert("该记录已经提交，不允许重复提交！");
                            return false;
                        }

                    }
                    else {
                        alert("该申请已经归档，不可以提交！");
                        return false;
                    }
                } else {
                    alert("不是申请人，不能提交！");
                }
            }
            else {
                alert("请选择您要提交的记录，点击单选按钮选中！");
                return false;
            }
        });
        
    });

    //归档事件
    $('#archive').click(function () {
        var taskID = $("input[.radio][checked]").val();
        var state = $("input[.radio][checked]").siblings('.state').val();
        var archivedState = $("input[.radio][checked]").siblings('.archivedState').val();
        var userName = $("#UserName").val();
        var judge = "";
        $.post("Judge.ashx", { op: "danger", taskID: taskID, userName: userName }, function (data) {
            judge = data;
            if (taskID != undefined) {
                if (judge == "true") {
                    if (archivedState == "0") {
                        if (state == "2" || state == "3") {
                            if (confirm("您确定要归档吗？")) {
                                $.post("dataProcess.ashx", { op: "archiveDangerTask_T", taskID: taskID, userName: userName, rdom: Math.random() }, function (data) {
                                    if (data == "") {
                                        alert("归档成功！");
                                        $("#tr_" + taskID).remove();
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
                            alert("危险作业审批未完成，不可以归档！");
                            return;
                        }
                    }
                    else {
                        alert("该申请已经归档，不需要归档！");
                        return false;
                    }
                } else {
                    alert("不是申请人，不能归档！");
                }
            }
            else {
                alert("请选择您要归档的记录，点击单选按钮选中！");
                return false;
            }
        });
    });

    ////打印事件
    //$('#print').click(function () {
    //    var taskID = $("input[.radio][checked]").val();
    //    var state = $("input[.radio][checked]").siblings('.state').val();
    //    if (taskID != undefined) {
    //        if (state == "2" || state == "3") {
    //            return qBox.iFLoad({ title: '打印危险作业信息', src: 'dangerTaskPrint.aspx?taskID=' + taskID + '&rdom=' + Math.random(), w: 350, h: 87 });
    //        }
    //        else {
    //            alert("危险作业审批未开始或未结束，不可以打印！");
    //            return false;
    //        }
    //    }
    //    else {
    //        alert("请选择您要打印的记录，点击单选按钮选中！");
    //        return false;
    //    }
    //});
    
    //打印事件
    $('#print').click(function () {
        var taskID = $("input[.radio][checked]").val();
        var state = $("input[.radio][checked]").siblings('.state').val();
        var categoryNum = $("input[name='radio']:checked").siblings(".categoryNum").val();
        var userName = $("#UserName").val();
        $.post("Judge.ashx", { op: "danger", userName: userName, taskID: taskID }, function (data) {
            if (taskID != undefined) {
                if (data == "true") {
                    if (state == "2" || state == "3") {
                        window.open('ApprovepPrint1.aspx?taskID=' + taskID + '&TaskCategoryNum=' + categoryNum + '', '_blank');
                    } else if (state == "") {
                        alert("危险作业审批未开始，不可以打印！");
                    } else if (state == "1") {
                        alert("危险作业正在审批中，不可以打印！");
                    } else if (state == "4") {
                        alert("危险作业已撤回，不可以打印！");
                    } else if (state == "5") {
                        alert("危险作业已退回，不可以打印！");
                    }
                } else {
                    alert("不是申请人，不能打印！");
                }
            } else {
                alert("请选择您要打印的记录，点击单选按钮选中！");
            }
        });
    });

    //加载的时候，让其为关闭状态,点击可以打开
    $('tr.parent').toggleClass("selected").siblings('.child_row_01').toggle();
    //审批时候，申请信息的显示和隐藏
    $('tr.parent').click(function () {
        console.log($(this).toggleClass("selected").siblings('.child_row_01'))
        $(this).toggleClass("selected").siblings('.child_row_01').toggle(); //'.child' + this.id
        if ($(this).find('#openImg').attr("src") == "../images/down03-1.png") {
            document.all("openImg").src = "../images/up03-2.png";
        }
        else {
            document.all("openImg").src = "../images/down03-1.png";
        }
    });

    //批复记录事件
    $('#history').click(function () {
        var taskID = $("input[.radio][checked]").val();
        //alert(taskID);
        if (taskID != undefined) {
            return qBox.iFLoad({ title: '危险作业批复记录', src: 'taskHistoryApproveMan.aspx?categoryNum=248&taskID=' + taskID + '&rdom=' + Math.random(), w: 900, h: 250 });
        }
        else {
            alert("请选择您要查看的信息，点击单选按钮选中！");
            return false;
        }
    });

    //批复记录事件，在审批窗口中的历史批复
    $('#history1').click(function () {
        var taskID = $('#txt_TaskID').val();
        var categoryNum = $('#txt_TaskCategoryNum').val();
        //alert(taskID);
        if (taskID != undefined) {
            return qBox.iFLoad({ title: '作业批复记录', src: 'taskHistoryApproveMan.aspx?categoryNum=' + categoryNum + '&taskID=' + taskID + '&rdom=' + Math.random(), w: 900, h: 250 });
        }
        else {
            alert("请选择您要查看的信息！");
            return false;
        }
    });

    //重置申请事件
    $('#btn_resetAdd').click(function () {
        $('#txt_ApplyingTime').attr("value", "");
        $('#txt_DangerFactor').attr("value", "");
        $('#txt_DangerTaskName').attr("value", "");
        $('#txt_EndTime').attr("value", "");
        $('#txt_NumberOfYear').attr("value", "10");
        $('#txt_Principal').attr("value", "");
        $('#txt_SafeMeasure').attr("value", "");
        $('#txt_StartTime').attr("value", "");
        $('#txt_Task').attr("value", "");
        $('#txt_TaskAddress').attr("value", "");
        $('#txt_TaskInstitution').val('');
        $('#txt_Archived').val('0');
        $('#txt_Principal').val('');
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