$(function () {

    /*查询的Js开始*/
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
        if (str == "EmployeeNum") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "3"); //设置条件选中，2对应大于小于等于，3对应like或=
            $("#comlon" + temp + "2").val("TextBox" + temp + "1"); //设置值选中,就是下面的输入框是显示的那种

            $("#DropDownList" + temp + "2").hide(); //大于类
            $("#DropDownList" + temp + "3").show(); //包含

            $("#TextBox" + temp + "1").show(); //文本框
            $("#TextBox" + temp + "2").hide(); //日历文本框
        }

        else if (str == "EmployeeName") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "3");
            $("#comlon" + temp + "2").val("TextBox" + temp + "1");

            $("#DropDownList" + temp + "2").hide();
            $("#DropDownList" + temp + "3").show();

            $("#TextBox" + temp + "1").show();
            $("#TextBox" + temp + "2").hide();
        }
        else if (str == "CertificateNum") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "3");
            $("#comlon" + temp + "2").val("TextBox" + temp + "1");

            $("#DropDownList" + temp + "2").hide();
            $("#DropDownList" + temp + "3").show();

            $("#TextBox" + temp + "1").show();
            $("#TextBox" + temp + "2").hide();
        }
        else if (str == "CertificateName") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "3");
            $("#comlon" + temp + "2").val("TextBox" + temp + "1");

            $("#DropDownList" + temp + "2").hide();
            $("#DropDownList" + temp + "3").show();

            $("#TextBox" + temp + "1").show();
            $("#TextBox" + temp + "2").hide();
        }
        else if (str == "IssueInstitute") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "3");
            $("#comlon" + temp + "2").val("TextBox" + temp + "1");

            $("#DropDownList" + temp + "2").hide();
            $("#DropDownList" + temp + "3").show();

            $("#TextBox" + temp + "1").show();
            $("#TextBox" + temp + "2").hide();
        }
        else if (str == "IssueDate") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "2");
            $("#comlon" + temp + "2").val("TextBox" + temp + "2");

            $("#DropDownList" + temp + "2").show();
            $("#DropDownList" + temp + "3").hide();

            $("#TextBox" + temp + "1").hide();
            $("#TextBox" + temp + "2").show();
        }

        else if (str == "Validity") {

            $("#comlon" + temp + "1").val("DropDownList" + temp + "2");
            $("#comlon" + temp + "2").val("TextBox" + temp + "2");

            $("#DropDownList" + temp + "2").show();
            $("#DropDownList" + temp + "3").hide();

            $("#TextBox" + temp + "1").hide();
            $("#TextBox" + temp + "2").show();
        }
        else if (str == "FirstDate") {

            $("#comlon" + temp + "1").val("DropDownList" + temp + "2");
            $("#comlon" + temp + "2").val("TextBox" + temp + "2");

            $("#DropDownList" + temp + "2").show();
            $("#DropDownList" + temp + "3").hide();

            $("#TextBox" + temp + "1").hide();
            $("#TextBox" + temp + "2").show();
        }
        /*请选择，清空其他*/
        else if (str == "请选择") {

            $("#comlon" + temp + "1").val("DropDownList" + temp + "3");
            $("#comlon" + temp + "2").val("TextBox" + temp + "1");

            $("#DropDownList" + temp + "2").hide();
            $("#DropDownList" + temp + "3").show();

            
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


    /*添加事件*/
    $('#iframePopAdd').click(function () {
        return qBox.iFLoad({ title: '添加证书信息管理', src: 'securityAdd.aspx', w: 745, h: 485});
    });

    /*查看详细信息事件*/
    $('#iframePopDetail').click(function () {
        var id = $("input[.radio][checked]").val(); //获取单选按钮
        //var certificateNum = $("input[.radio][checked]").siblings('.certificateNum').val(); //获取隐藏的员工证书编号的值
        //alert(employeeNum);
        if (id != undefined) {
            return qBox.iFLoad({ title: '证书信息管理详细信息', src: 'securityDetail.aspx?id=' + id + '&rdom=' + Math.random() + '&fatherCookie=' + getHtmlDocName(), w: 700, h: 440 });
        }
        else {
            alert("请选择您要查看的记录，点击单选按钮选中！");
            return false;
        }
    });

    /*修改事件*/
    $('#iframePopEdit').click(function () {
        var id = $("input[.radio][checked]").val(); //获取员工编号
      //  alert(id);
        //var certificateNum = $("input[.radio][checked]").siblings('.certificateNum').val(); //获取隐藏的员工证书编号的值
        if (id != undefined && id != "") {    //传递两个主键的值，员工编号和员工证书编号
            return qBox.iFLoad({ title: '修改证书信息管理', src: 'securityEdit.aspx?id=' + id + '&rdom=' + Math.random(), w: 740, h: 475 });

        }
        else {
            alert("请选择您要修改的记录，点击单选按钮选中！");
            return false;
        }

    });


    /*删除点击提交的事件*/
    $('#delete').click(function () {
        var id = $("input[.radio][checked]").val(); //获取单选按钮
        //var certificateNum = $("input[.radio][checked]").siblings('.certificateNum').val(); //获取隐藏的员工证书编号的值
        if (id != undefined) {
            //执行删除操作
            if (confirm("您确定要删除吗?")) {
                $.post("dataProcess.ashx", { op: "securityManager_T", id: id, rdom: Math.random() }, function (data) {
                  //  alert(data);
                    if (data == "") {
                        $("#tr_" + id).remove();
                    } else {
                        alert("删除失败");
                    }
                    
                });
            }
        }
        else {
            alert("请选择您要删除的记录，点击单选按钮选中！");
            return false;
        }
    });

    /*批量修改的事件*/
    $('#iframeBatch').click(function () {
        //alert("弹出层");
        return qBox.iFLoad({ title: '批量修改证书信息管理', src: 'securityBatch.aspx', w: 400, h: 215 });
    });

    /*重置事件*/
    $('#btnReset').click(function () {
        $('#txt_certificateName').attr("value", "安全管理资格证");
        $('#txt_certificateNum').attr("value", "");
        $('#txt_firstDate').attr("value","");
        $('#txt_issueDate').attr("value", "");
        $('#txt_issueInstitute').attr("value", "");
        $('#txt_Validity').attr("value", "");
        $('#finishedTips').attr("value", "");
    });

})