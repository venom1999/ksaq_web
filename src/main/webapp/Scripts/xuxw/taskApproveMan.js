$(function () {

    //为选中行添加高亮
    $('.radio').click(function () {
        $(this).parent().parent().addClass('selected');
        $(this).parent().parent().siblings().removeClass('selected');
    });
    //加载的时候，让其为关闭状态,点击可以打开
    $('tr.parent').toggleClass("selected").siblings('.child_row_01').toggle();
    //审批时候，申请信息的显示和隐藏
    $('tr.parent').click(function () {
        $(this).toggleClass("selected").siblings('.child_row_01').toggle();
        if ($(this).find('#openImg').attr("src") == "../images/11.gif") {
            document.all("openImg").src = "../images/22.gif";
        }
        else {
            document.all("openImg").src = "../images/11.gif";
        }
    });

    //批复记录事件
    $('#history').click(function () {
        var taskID = $("input[.radio][checked]").val();
        var categoryNum = $("input[.radio][checked]").siblings('.categoryNum').val();
        //alert(taskID);
        if (taskID != undefined) {
            return qBox.iFLoad({ title: '作业批复记录', src: 'taskHistoryApproveMan.aspx?categoryNum=' + categoryNum + '&taskID=' + taskID + '&rdom=' + Math.random(), w: 900, h: 250 });
        }
        else {
            alert("请选择您要查看的信息！");
            return false;
        }
    });

    //审批事件
    $('#approve').click(function () {
       
        var taskID = $("input[.radio][checked]").val();
        var finish = $("input[.radio][checked]").siblings(".Finished").val();
        var categoryNum = $("input[.radio][checked]").siblings('.categoryNum').val();
       
       
        if (taskID != undefined) {
            if (categoryNum == "248") {
                if (finish == "0") {                                                                                                                 //275
                    return qBox.iFLoad({ title: '危险作业审批', src: 'dangerTaskApprove.aspx?taskID=' + taskID + '&rdom=' + Math.random(), w: 800, h: 479 });
                }
                else if (finish == "1") {//重新审批
                    return qBox.iFLoad({ title: '危险作业重新审批', src: 'dangerTaskRepeatApprove.aspx?taskID=' + taskID + '&rdom=' + Math.random(), w: 800, h: 479 });
                }
                else {
                    return false;
                }
            }
            else if (categoryNum == "247") {
                if (finish == "0") {
                    return qBox.iFLoad({ title: '动火作业审批', src: 'fireTaskApprove.aspx?taskID=' + taskID + '&rdom=' + Math.random(), w: 800, h: 479 });
                }
                else if (finish == "1") {//重新审批
                    return qBox.iFLoad({ title: '动火作业重新审批', src: 'fireTaskRepeatApprove.aspx?taskID=' + taskID + '&rdom=' + Math.random(), w: 800, h: 479 });
                }
                else {
                    return false;
                }
            }
            else if (categoryNum == "250") {
                if (finish == "0") {
                    return qBox.iFLoad({ title: '电器工作票审批', src: 'newOperApprove.aspx?taskID=' + taskID + '&rdom=' + Math.random(), w: 800, h: 479 });
                }
                else if (finish == "1") {//重新审批
                    return qBox.iFLoad({ title: '电器工作票重新审批', src: 'newOperRepeatApprove.aspx?taskID=' + taskID + '&rdom=' + Math.random(), w: 800, h:479 });
                }
                else {
                    return false;
                }
            }
            else if (categoryNum == "249") {
                if (finish == "0") {
                    return qBox.iFLoad({ title: '检修作业许可审批', src: 'repairmentApprove.aspx?taskID=' + taskID + '&rdom=' + Math.random(), w: 800, h: 600 });
                }
                else if (finish == "1") {//重新审批
                    return qBox.iFLoad({ title: '检修作业许可重新审批', src: 'repairmentRepeatApprove.aspx?taskID=' + taskID + '&rdom=' + Math.random(), w: 800, h: 600 });
                }
                else {
                    return false;
                }
            }
            else {
            }
        }
        else {
            alert("请选择您要编辑的信息！");
            return false;
        }
    });

    //回退事件 
    $('#rollback').click(function () {
        var taskID = $("input[.radio][checked]").val();
        var categoryNum = $("input[.radio][checked]").siblings(".categoryNum").val();
        //alert(taskID);
        if (taskID != undefined) {
            if (categoryNum == "248") {
                return qBox.iFLoad({ title: '危险作业回退', src: 'dangerTaskCallBack.aspx?taskID=' + taskID + '&categoryNum=' + categoryNum + '&rdom=' + Math.random(), w: 400, h: 205 });
            }
            else if (categoryNum == "247") {
                return qBox.iFLoad({ title: '动火作业回退', src: 'fireTaskCallBack.aspx?taskID=' + taskID + '&categoryNum=' + categoryNum + '&rdom=' + Math.random(), w: 400, h: 200 });
            }
            else if (categoryNum == "250") {
                return qBox.iFLoad({ title: '新操作票回退', src: 'newOperCallBack.aspx?taskID=' + taskID + '&categoryNum=' + categoryNum + '&rdom=' + Math.random(), w: 400, h: 200 });
            }
            else if (categoryNum == "249") {
                return qBox.iFLoad({ title: '检修作业许可回退', src: 'repairmentCallBack.aspx?taskID=' + taskID + '&categoryNum=' + categoryNum + '&rdom=' + Math.random(), w: 400, h: 205 });
            }
            else {

            }
        }
        else {
            alert("请选择您要编辑的信息！");
            return false;
        }
    });
})