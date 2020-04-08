$(function () {

    /*为输入框添加样式，获取焦点也失去焦点的样式*/
    $(':input').focus(function () {
        $(this).addClass("focus");

    }).blur(function () {

        $(this).removeClass("focus");

    });
    //给输入框后面添加红色星号
    $(':input.required').each(function () {
        var $required = $("<strong class='high'><font color='red'>*</font></strong>");
        $(this).parent().append($required);
    });

    $('#autoMakeTestPaper').click(function () {
        var result = false;
        var testid = $("input[.radio][checked]").val(); //获取单选按钮
        if (testid > 0) {
            //if (confirm("自动组卷，考试编号：" + testid)) {
                $(this).attr("href", 'autoProductTestPaper.aspx?TestID=' + testid);
           // }
           // else return;
        }
        else {
            alert("请选择要组卷的考试！")
        }
    })


    /*失去焦点的时候进行验证*/
    $(':input').blur(function () {
        var $parent = $(this).parent();
        $parent.find(".formtips").remove();
        //验证用户名
        if ($(this).is('#username')) {
            if (this.value == "" || this.value.length < 6) {
                var errorMsg = '请输入至少6位的用户名.';
                $parent.append('<span class="formtips onError">' + errorMsg + '</span>');
            } else {
                var okMsg = 'input ok.';
                $parent.append('<span class="formtips onSuccess">' + okMsg + '</span>');
            }
        }

        //验证其他的输入内容

    });
    /*添加层的显示*/
    $('.add').click(function () {
        var result = false;
        var eduinfo = $('#exercise').val();
        if (eduinfo == "请选择") {
            alert("还未选择！");
            return;
        }
        $.post("addProcess.ashx", { op: "test_info_t", TestID: eduinfo, rdom: Math.random() }, function (data) {
            if (data != "") {
                if (data == "1") {
                    alert("已有该考试信息！");
                }
                else {
                    result = window.showModalDialog('AddExamInfo.aspx?eduinfo=' + eduinfo, null, "resizable:no;scroll:no;status:no;dialogWidth=600px;dialogHeight=500px;center=yes;help=no;location=no;directories=no");
                    window.location.href = location.href;
                }
            }
        });
    });

    $('.resit').click(function () {
        var result = false;
        var eduinfo = $('#DropDownList_Resit').val();
        if (eduinfo == "请选择") {
            alert("还未选择！");
            return;
        }
        result = window.showModalDialog('examAddResit.aspx?eduinfo=' + eduinfo, null, "resizable:no;scroll:no;status:no;dialogWidth=600px;dialogHeight=500px;center=yes;help=no;location=no;directories=no");
        window.location.href = location.href;
    });


    /*修改的层的显示*/
    $('.update').click(function () {

        var result = false;
        var testid = $("input[.radio][checked]").val(); //获取单选按钮
        //        alert("更新：" + testid);
        if (testid > 0) {
            result = window.showModalDialog('examInfoUpdate.aspx?testid=' + testid, null, "resizable:no;scroll:no;status:no;dialogWidth=713px;dialogHeight=500px;center=yes;help=no");
            window.location.href = location.href;
        }
        else {
            alert("请选择您要修改的记录，点击单选按钮选中！");
            return false;
        }
    });

    /*查看详细信息事件*/
    $('.searchDetail').click(function () {
        //        var result = false;
        //        result = window.showModalDialog('AddExamInfo.aspx', null, "resizable:no;scroll:no;status:no;dialogWidth=600px;dialogHeight=500px;center=yes;help=no");
        //        window.location.href = location.href;
    });

    /*查找事件*/
    $('.exercisePlan').click(function () {
        /*获取droplist的值，然后进行添加*/
        alert('exercisePlan');
        $('.add').show();
    });

    /*删除点击提交的事件*/
    $('.delete').click(function () {
        //        alert("delete");

        var testid = $("input[.radio][checked]").val(); //获取单选按钮
        alert("删除：" + testid);

        if (testid > 0) {
            if (confirm("您确定要删除吗?")) {

                $.post("delProcess.ashx", { op: "test_info_t", TestID: testid, rdom: Math.random() }, function (data) {
                    if (data == "") {
                        $("#tr_" + testid).remove();
                    }
                });
            }
            else
                return false;
        }
    });
})