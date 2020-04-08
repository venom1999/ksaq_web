$(function () {
    //为选中行添加高亮
    $('.radio').click(function () {
        $(this).parent().parent().addClass('selected');
        $(this).parent().parent().siblings().removeClass('selected');
    });


    //添加申请事件
    $('#addApply').click(function () {
        var costID = $("input[.radio][checked]").val();
        if (costID == undefined) {
            return qBox.iFLoad({ title: '添加安全生产费用申请', src: 'safetyCostsAdd.aspx?rdom=' + Math.random(), w: 690, h: 370 });
        }
        else { //复制式的添加
            return qBox.iFLoad({ title: '添加安全生产费用申请', src: 'safetyCostsAdd.aspx?costID=' + costID + '&rdom=' + Math.random(), w: 690, h: 370 });
        }
    });

    //详细事件
    $('#detail').click(function () {
        var costID = $("input[.radio][checked]").val();
        //alert(costID);
        if (costID != undefined) {
            return qBox.iFLoad({ title: '查看安全生产费用申请详细', src: 'safetyCostsDetail.aspx?costID=' + costID + '&rdom=' + Math.random(), w: 690, h: 300 });
        }
        else {
            alert("请选择您要查看的信息！");
            return false;
        }
    });


    //修改事件
    $('#update').click(function () {
        var costID = $("input[.radio][checked]").val();
        var state = $("input[.radio][checked]").siblings('.state').val();
        //alert(costID);
        if (costID != undefined) {
            if (state == "4" || state == "") {
                return qBox.iFLoad({ title: '修改安全生产费用申请', src: 'safetyCostsEdit.aspx?costID=' + costID + '&rdom=' + Math.random(), w: 690, h: 330 });
            }
            else {
                alert("该记录不允许修改！");
                return false;
            }
        }
        else {
            alert("请选择您要修改的信息！");
            return false;
        }
    });

    //删除事件
    $('#delete').click(function () {  //Task_T
        var costID = $("input[.radio][checked]").val(); //获取单选按钮
        var state = $("input[.radio][checked]").siblings('.state').val();
        if (costID != undefined) {
            //执行删除操作
            if (state == "4" || state == "5" || state == "" || state == "3") {
                /*获取变量，并进行删除处理，异步进行，先删除数据库，然后回调函数删除页面上的一行*/
                if (confirm("您确定要删除吗?")) {
                    $.post("dataProcess.ashx", { op: "SafetyCostsDel_T", costID: costID, rdom: Math.random() }, function (data) {
                        if (data == "") {
                            $("#tr_" + costID).remove();
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
            else {
                alert("该记录不允许删除！");
                return false;
            }

        }
        else {
            alert("请选择您要删除的记录，点击单选按钮选中！");
            return false;
        }
    });

    //撤回事件
    $('#callback').click(function () {
        var costID = $("input[.radio][checked]").val();
        var state = $("input[.radio][checked]").siblings('.state').val();
        //alert(costID);
        if (costID != undefined) {
            if (confirm("确定要撤回该申请码？")) {
                if (state == "1") {
                    $.post("dataProcess.ashx", { op: "callbackCostTask_T", costID: costID, rdom: Math.random() }, function (data) {
                        if (data == "") {
                            alert("撤回成功！");
                            $("input[.radio][checked]").parent().parent().find('.appState').html("撤回");
                            return false;
                        }
                        else {
                            alert("撤回失败！");
                            return false;
                        }
                    });
                }
                else {
                    alert("该记录不允许撤回！");
                    return false;
                }
            }
            else {
                //不撤回
                return false;
            }
        }
        else {
            alert("请选择您要撤回的记录，点击单选按钮选中！");
            return false;
        }
    });

    //提交事件
    $('#submit').click(function () {
        var costID = $("input[.radio][checked]").val();
        var state = $("input[.radio][checked]").siblings('.state').val();
        //alert(costID);
        if (costID != undefined) {
            if (state != "1" && state != "2" && state != "3") {
                return qBox.iFLoad({ title: '提交安全生产费用申请', src: 'safetyCostsSubmit.aspx?costID=' + costID + '&rdom=' + Math.random(), w: 690, h: 330 });
            }
            else {
                alert("该记录已经提交，不允许重复提交！");
                return false;
            }
        }
        else {
            alert("请选择您要提交的记录，点击单选按钮选中！");
            return false;
        }
    });

    

    //打印事件
    $('#print').click(function () {
        var taskID = $("input[.radio][checked]").val();
        var state = $("input[.radio][checked]").siblings('.state').val();
        if (taskID != undefined) {
            if (state == "2" || state == "3") {
                return qBox.iFLoad({ title: '打印安全生产费用申请', src: 'safetyCostsPrint.aspx?taskID=' + taskID + '&rdom=' + Math.random(), w: 390, h: 87 });
            }
            else {
                alert("安全生产费用审批未开始或未结束，不可以打印！");
                return false;
            }
        }
        else {
            alert("请选择您要打印的记录，点击单选按钮选中！");
            return false;
        }
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

    //历史批复事件
    $('#history').click(function () {
        var costID = $("input[.radio][checked]").val();
        //alert(costID);
        if (costID != undefined) {
            return qBox.iFLoad({ title: '安全生产费用历史批复情况', src: 'safetyCostsHistory.aspx?costID=' + costID + '&rdom=' + Math.random(), w: 680, h: 180 });
        }
        else {
            alert("请选择您要查看的信息！");
            return false;
        }
    });

    
    //重置申请事件
    $('#btn_resetAdd').click(function () {
        $('#txt_CostName').attr("value", "");
        $('#txt_BidCost').attr("value", "");
        $('#txt_BidTime').attr("value", "");
        $('#txt_ActualCost').attr("value", "");
        $('#txt_UseContent').attr("value", "");
        $('#txt_UploadAddress').attr("value", "");
        $('#txt_ManuCostCategory1').val('');
        $('#txt_ManuCostCategory2').val('');
        $('#txt_ManuCostCategory3').val('');
        $('#txt_BidInstitutionNum').val('');

        $('#txt_FirstInstitution').val('');
    });
})