$(function () {
    //每秒钟刷新窗口高度
    function getFrameHeight() {
        $("#leftframe").css("height", $(window).height() - $('#topframe').height());
        $("#bodyframe").css("height", $(window).height() - $('#topframe').height());
      
        //setTimeout(getFrameHeight, 1000); //1秒钟读取一次 
    }
    getFrameHeight(); //调用刷新，其中这里是窗口高度减去topframe窗口的高度，就是leftframe窗口的高度

    /*var mainFlag = $('#mianTag').val();
    if (mainFlag != undefined && mainFlag == "MAINFLAG") {
        //标记是否已经弹出窗口
        //var winFlag = ""; //默认为0，表示没有弹出，为1，表示已经弹出，不需要再次弹出

        //动态扫描错误数据库，显示模态窗口进行处理
        var rightFlag = $('#rightFlag').val();
        function getDataMsg() {
            var winFlag = $('#winFlag').val();
            //alert("机构名第二次" + institotinID)
            //alert("双十一");
            if (winFlag == 0) {
                var institutionID = $('#institution').val();
                var userName = $("#username").val();
                //alert("username:"+userName);
                $.post("scanErrorDB.ashx", { op: "Error_T", InstitutionID: institutionID, userName:userName, rdom: Math.random() }, function (data) {
                    //alert("sssssssssssdfdsdfsdfsfsfsfsfsfsfsf");
                    if (data != "") {
                        //alert(data)
                        var a = new Array();
                        a = data.split(';')
                        var alert1 = a[0]
                        var rectify = a[1]
                        var expire = a[2]
                        var approve = a[3];
                        window.focus();
                        $('#winFlag').attr("value", "1");
                        $('#alertDiv').OpenDiv();
                        $('#alertDiv').show();

                        //alert("星期六想放假")
                        $('#labAlert').html(alert1);
                        $('#labRectify').html(rectify);
                        $('#labExpire').html(expire);
                        $('#labapprove').html(approve);
                    }
                    else {
                        //alert("dddddddddddddddddddddddddddddddddd");
                    }
                });
                //setTimeout(getDataMsg, 3600000); //10秒钟读取一次 
            }
            else {
                //setTimeout(getDataMsg, 3600000); //20秒钟读取一次 
            }
        }
        if (rightFlag != undefined && rightFlag == "1") {
            getDataMsg();
        }
    }



    //弹出错误处理页面
    $('#processAlert').click(function () {
        $('#alertDiv').CloseDiv();
        $('#alertDiv').hide();
        $.XYTipsWindow({ ___title: "", ___content: "iframe: Alert/alertProcess.aspx", ___width: "2000", ___height: "500", ___drag: "___boxTitle", ___showbg: true });
    });
    //弹出整改处理页面
    $('#RectifyAlert').click(function () {
        $('#alertDiv').CloseDiv();
        $('#alertDiv').hide();
        $.XYTipsWindow({ ___title: "", ___content: "iframe: Alert/alertRectify.aspx", ___width: "2000", ___height: "500", ___drag: "___boxTitle", ___showbg: true });
    });
    //弹出已逾期页面
    $('#ExpireAlert').click(function () {
        $('#alertDiv').CloseDiv();
        $('#alertDiv').hide();
        $.XYTipsWindow({ ___title: "", ___content: "iframe: Alert/AlertRecList.aspx", ___width: "1500", ___height: "500", ___drag: "___boxTitle", ___showbg: true });
    });

    //待办事宜
    $('#labapprove1').click(function () {
        $('#alertDiv').CloseDiv();
        $('#alertDiv').hide();
        $.XYTipsWindow({ ___title: "", ___content: "iframe: Alert/approve.aspx", ___width: "1500", ___height: "500", ___drag: "___boxTitle", ___showbg: true });
    });

    //待办事宜 index.aspx
    $('#backlog').click(function () {
        console.log("more")
        //$('#alertDiv').CloseDiv();
        //$('#alertDiv').hide();
        parent.$.XYTipsWindow({ ___title: "", ___content: "iframe: Alert/approve.aspx", ___width: "1500", ___height: "500", ___drag: "___boxTitle", ___showbg: true });
    });

    //确认处理事件
    //$("input[class ^= sure]").click(function () {
    //    var errorID = $(this).parent().parent().find('.errorID').val(); //获取输入框的值
    //    var person = $('#txtPer').val(); //获取确认用户
    //    //alert(person);
    //    // alert(errorID);
    //    if (errorID != undefined && errorID != "") {
    //        //alert("处理确认操作");
    //        $.post("scanErrorDB.ashx", { op: "errorProcess_T", person: person, errorID: errorID, rdom: Math.random() }, function (data) {
    //            if (data == "") {
    //                alert("处理成功！");
    //                $("#tr_" + errorID).remove();
    //            }
    //            else {
    //                alert("处理失败！");
    //            }
    //        });
    //    }
    //    else {
    //        alert("请先填写确认人！再确认！");
    //    }

    //});

    //关闭处理页面 
    //    $(window.parent.document.getElementById('___closeBox1')).click(function () {
    //        alert($(this).parent().parent().parent().parent().find('.XYTipsWindow').attr("id"));
    //        $(window.parent.document.getElementById('winFlag')).attr("value", "0");
    //    });

    //关闭处理页面 
    $('#closeBox1').click(function () {
        $(window.parent.document.getElementById('winFlag')).attr("value", "0");
        window.parent.$.XYTipsWindow.removeBox();
    });

    //整改按钮事件
    $('#changeProc').click(function () {
        $(window.parent.document.getElementById('winFlag')).attr("value", "0");
        //parent.frames['I2'].location.href = "SecurityCheck/RecAddFromIndex.aspx?radom=" + Math.random();
        //return qBox.iFLoad({ title: '添加整改指令', src: 'SecurityCheck/RecAddFromIndex.aspx?rdom=' + Math.random(), w: 350, h: 330 });
        window.parent.$.XYTipsWindow.removeBox();


    });*/

});


/*
if (window.screen) {              //判断浏览器是否支持window.screen判断浏览器是否支持screen   
            var myw = screen.availWidth;   //定义一个myw，接受到当前全屏的宽   
            var myh = screen.availHeight;  //定义一个myw，接受到当前全屏的高   
            window.moveTo(0, 0);           //把window放在左上脚   
            window.resizeTo(myw, myh);     //把当前窗体的长宽跳转为myw和myh   
        }
*/