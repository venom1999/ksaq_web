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
        if (str == "EmployeeNum") {
            $("#comlon" + temp + "2").val("TextBox" + temp + "1"); //设置值选中,就是下面的输入框是显示的那种

            $("#DropDownList" + temp + "2").hide(); //大于类
            $("#DropDownList" + temp + "3").show(); //包含

            $("#TextBox" + temp + "1").show(); //文本框
            $("#TextBox" + temp + "2").hide();
            $("#TextBox" + temp + "2").attr("value", "");
            $("#TextBox" + temp + "3").hide();
            $("#TextBox" + temp + "4").hide();
            $("#TextBox" + temp + "5").hide();
            $("#TextBox" + temp + "6").hide();
            $("#TextBox" + temp + "7").hide();

        }
        else if (str == "EmployeeName") {
            $("#comlon" + temp + "2").val("TextBox" + temp + "2"); //设置值选中,就是下面的输入框是显示的那种

            $("#DropDownList" + temp + "2").hide(); //大于类
            $("#DropDownList" + temp + "3").show(); //包含

            $("#TextBox" + temp + "1").hide();
            $("#TextBox" + temp + "1").attr("value", "");
            $("#TextBox" + temp + "2").show(); //文本框
            $("#TextBox" + temp + "3").hide();
            $("#TextBox" + temp + "4").hide();
            $("#TextBox" + temp + "5").hide();
            $("#TextBox" + temp + "6").hide();      //员工职务
            $("#TextBox" + temp + "7").hide();      //当前岗位

        }
        else if (str == "UserState") {
            $("#comlon" + temp + "2").val("TextBox" + temp + "5"); //设置值选中,就是下面的输入框是显示的那种

            $("#DropDownList" + temp + "2").hide(); //大于类
            $("#DropDownList" + temp + "3").show(); //包含

            $("#TextBox" + temp + "1").hide();
            $("#TextBox" + temp + "2").hide(); //文本框
            $("#TextBox" + temp + "3").hide();
            $("#TextBox" + temp + "4").hide();
            $("#TextBox" + temp + "5").show();
            $("#TextBox" + temp + "6").hide();      //员工职务
            $("#TextBox" + temp + "7").hide();      //当前岗位

            $("#TextBox" + temp + "1").attr("value", "");
            $("#TextBox" + temp + "2").attr("value", "");

        }
        else if (str == "WorkTypeValue") {
            $("#comlon" + temp + "2").val("TextBox" + temp + "6"); //设置值选中,就是下面的输入框是显示的那种

            $("#DropDownList" + temp + "2").hide(); //大于类
            $("#DropDownList" + temp + "3").show(); //包含

            $("#TextBox" + temp + "1").hide();
            $("#TextBox" + temp + "2").hide(); //文本框
            $("#TextBox" + temp + "3").hide();
            $("#TextBox" + temp + "4").hide();
            $("#TextBox" + temp + "5").hide();
            $("#TextBox" + temp + "6").show();      //员工职务
            $("#TextBox" + temp + "7").hide();      //当前岗位

            $("#TextBox" + temp + "1").attr("value", "");
            $("#TextBox" + temp + "2").attr("value", "");

        }
        else if (str == "WorkPositionValue") {
            $("#comlon" + temp + "2").val("TextBox" + temp + "7"); //设置值选中,就是下面的输入框是显示的那种

            $("#DropDownList" + temp + "2").hide(); //大于类
            $("#DropDownList" + temp + "3").show(); //包含

            $("#TextBox" + temp + "1").hide();
            $("#TextBox" + temp + "2").hide(); //文本框
            $("#TextBox" + temp + "3").hide();
            $("#TextBox" + temp + "4").hide();
            $("#TextBox" + temp + "5").hide();
            $("#TextBox" + temp + "6").hide();      //员工职务
            $("#TextBox" + temp + "7").show();      //当前岗位

            $("#TextBox" + temp + "1").attr("value", "");
            $("#TextBox" + temp + "2").attr("value", "");

        }
        else if (str == "请选择") {
            $("#comlon" + temp + "2").val("TextBox" + temp + "1");

            $("#DropDownList" + temp + "2").hide(); //大于类
            $("#DropDownList" + temp + "3").show(); //包含

            $("#TextBox" + temp + "1").hide();
            $("#TextBox" + temp + "2").hide();
            $("#TextBox" + temp + "3").show();
            $("#TextBox" + temp + "4").hide();
            $("#TextBox" + temp + "5").hide();
            $("#TextBox" + temp + "6").hide();      //员工职务
            $("#TextBox" + temp + "7").hide();      //当前岗位

            $("#TextBox" + temp + "1").attr("value", "");
            $("#TextBox" + temp + "2").attr("value", "");
        }

    }
    /*查询的Js结束*/

    //为选中行添加高亮
    $('.radio').click(function () {
        $(this).parent().parent().addClass('selected');
        $(this).parent().parent().siblings().removeClass('selected');
    });

    /*添加层的显示*/
    $("#iframePopAdd").click(function () {
        return qBox.iFLoad({ title: '添加用户信息', src: 'SignAdd.aspx', w: 400, h: 140 });
    });

    /*修改层的显示*/
    $("#iframePopEdit").click(function () {
        var EmployeeNum = $("input[.radio][checked]").val(); //获取单选按钮
        if (EmployeeNum != undefined) {
            return qBox.iFLoad({ title: '修改用户信息', src: 'SignEdit.aspx?EmployeeNum=' + EmployeeNum, w: 400, h: 140 });
        }
        else {
            alert("请选择您要修改的记录，点击单选按钮选中！");
            return false;
        }
    });

    /*重置密码的显示*/
    $('#setPWD').click(function () {
        var EmployeeNum = $("input[.radio][checked]").val(); //获取单选按钮
        if (EmployeeNum != undefined) {
            //执行删除操作
            if (confirm("您确定要重置该用户的密码吗?")) {
                $.post("SignHandler.ashx", { EmployeeNum: EmployeeNum, OP: "SET", rdom: Math.random() }, function (data) {
                    if (data == "") {
                        alert("密码重置成功！");
                    }
                });
            }
        }
        else {
            alert("请选择您要重置密码的用户，点击单选按钮选中！");
            return false;
        }
    });

    /*删除处理*/
    $('#deleteUser').click(function () {
        var EmployeeNum = $("input[.radio][checked]").val(); //获取单选按钮
        if (EmployeeNum != undefined) {
            //执行删除操作
            if (confirm("您确定要删除吗?")) {
                $.post("SignHandler.ashx", { EmployeeNum: EmployeeNum, OP: "DELETE", rdom: Math.random() }, function (data) {
                    if (data == "") {
                        $("#tr_" + EmployeeNum).remove();
                        alert("删除成功！");
                    }
                });
            }
        }
        else {
            alert("请选择您要删除的记录，点击单选按钮选中！");
            return false;
        }
    });



})