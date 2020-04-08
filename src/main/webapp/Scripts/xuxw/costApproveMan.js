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

    //历史批复事件
    $('#history').click(function () {
        var costID = $("input[.radio][checked]").val();
        //alert(costID);
        if (costID != undefined) {
            return qBox.iFLoad({ title: '安全生产费用历史批复情况', src: 'safetyCostsHistory.aspx?costID=' + costID + '&rdom=' + Math.random(), w: 700, h: 180 });
        }
        else {
            alert("请选择您要查看的信息！");
            return false;
        }
    });

    //历史批复事件，在审批窗口中的历史批复
    $('#history1').click(function () {
        var costID = $('#txt_CostID').val();
        //alert(costID);
        if (costID != undefined) {
            return qBox.iFLoad({ title: '作业历史批复情况', src: 'safetyCostsHistory.aspx?costID=' + costID + '&rdom=' + Math.random(), w: 680, h: 180 });
        }
        else {
            alert("请选择您要查看的信息！");
            return false;
        }
    });

    //审批事件
    $('#approve').click(function () {
        var costID = $("input[.radio][checked]").val();
        var finish = $("input[.radio][checked]").siblings(".Finished").val();
        //alert(costID);
        if (costID != undefined) {
            if (finish == "0") {
                return qBox.iFLoad({ title: '安全生产费用审批', src: 'safetyCostsApprove.aspx?costID=' + costID + '&rdom=' + Math.random(), w: 700, h: 275 });
            }
            else if (finish == "1") {//重新审批
                return qBox.iFLoad({ title: '安全生产费用重新审批', src: 'safetyCostsRepeatApprove.aspx?costID=' + costID + '&rdom=' + Math.random(), w: 700, h: 300 });
            }
            else {
                return false;
            }
        }
        else {
            alert("请选择您要编辑的信息！");
            return false;
        }
    });

    //回退事件 
    $('#rollback').click(function () {
        var costID = $("input[.radio][checked]").val();
        //alert(costID);
        if (costID != undefined) {
           return qBox.iFLoad({ title: '安全生产费用回退', src: 'safetyCostsCallBack.aspx?costID=' + costID + '&rdom=' + Math.random(), w: 360, h: 140 });
        }
        else {
            alert("请选择您要编辑的信息！");
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