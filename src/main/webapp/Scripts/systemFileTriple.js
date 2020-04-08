$(function () {
    var path = $("#filepath").val();
    var tablename = $("#tablename").val();
    var tableIDname = $("#tableIDname").val();

    $('#custom_file_upload').uploadify({
        'swf': '../../Scripts/jquery.uploadify-v3/uploadify.swf',
        'uploader': '../../file/LicAddHandler.ashx?Path=' + encodeURI(path),
        'multi': true,      //是否允许多选
        'auto': true,       //是否允许自动上传
        'buttonText': '上传',
        'width': 50,
        'fileTypeExts': '*.*', //指定上传文件类型
        'fileTypeDesc': 'Files',
        'queueID': 'custom-queue',
        'queueSizeLimit': 100,      //允许同时上传文件数量
        'uploadLimit': 1000,        //允许上传文件总数，指打开一次浏览器
        'fileSizeLimit': '2048MB',   //限制单个文件大小，限制IIS大小请到Web.Config修改
        'removeCompleted': false,    //上传完成后是否自动消失
        'onUploadComplete': function (file) {       //上传完成时事件 
            //alert('The file ' + file.name + ' finished processing.');
            //$('#custom_file_upload').uploadify('disable', true);       //设置上传按钮不可用 
        },
        'onUploadSuccess': function (file, data, response) {//每个文件上传完毕
            //alert(data);
            var queueID = file.id;
            $("#" + queueID).find(".cancel a").css("background", "url(../../images/success.gif)");
            $("#" + queueID).attr("disabled", "true");
            var v = $("#hfd_DocumentsNames").val();
            $("#hfd_DocumentsNames").val(v + data + "?");
            //获取当前的系统时间
            var oDate = new Date();

            //$("#hfd_SystemTime").val("<%= DateTime.Now.Date.ToString()%>");
            $("#hfd_SystemTime").val(getNowFormatDate());
        },
        'onQueueComplete': function (file) {         //所有文件上传完成时触发此事件
            //alert('上传完毕!');
        },

        'onUploadStart': function (file) {    //文件开始上传的时候触发

        },
        'onSWFReady': function () {                //设置上传按钮不可用 
        }

    })

    $("div.cancel a").click(function () {
        if (confirm("您确定要删除吗?")) {
            var ruleID = $("#IDOne").val();//获取证书编号
            var QueueItem = $(this).closest(".uploadify-queue-item");
            var resultFile = $("#hfd_DocumentsNames").val();//获取文件名，“？”分割
            var delFile = $(QueueItem).find("span.fileName input").val() + '?';


            /*删除点击提交的事件*/
            $.post("../../file/LicListEditHandler.ashx", { ID: ruleID, delFile: delFile, path: path, tablename: tablename, tableIDname: tableIDname, rdom: Math.random() }, function (data) {
                //alert("正在删除");
                if (data == "") {
                    $(QueueItem).css("display", "none");
                    resultFile = resultFile.replace(delFile, '');
                    $("#hfd_DocumentsNames").val(resultFile);
                    //alert("已删除");
                }
                else {
                    alert("删除过程中出错！");
                }
            });
        }
    })

    $('#seeFile').click(function () {
        var ID = $("input[.radio][checked]").val(); //获取单选按钮
        //var seeurl = $("#seeFileBeurl").val();
        var path = $("#filepath").val();
        var tablename = $("#tablename").val();
        var tableIDname = $("#tableIDname").val();

        //alert(seeurl);
        if (ID != undefined) {
            //$.ajax({
            //    type: "post",
            //    url: seeurl,
            //    data: "{'RuleID1':" + ID + "}",
            //    contentType: "application/json; charset=utf-8",
            //    dataType: "json",
            //    success: function (data) {
            //        if (data.d == "2")//说明只有图片
            //        {
            //            window.open("../file/securityImage.aspx?ID=" + ID + "&path=" + encodeURI(path) + "&tablename=" + tablename + "&tableIDname=" + tableIDname + "");
            //        }
            //        if (data.d == "1") {
            //            return qBox.iFLoad({ title: '文档浏览', src: '../file/DocumentMain.aspx?type=0&ID=' + ID + '&path=' + encodeURI(path) + '&tablename=' + tablename + '&tableIDname=' + tableIDname + '', w: 400, h: 265 });
            //        }
            //        if (data.d == "0") {
            //            alert("没有可浏览的文件");
            //        }
            //    },
            //    error: function (err) {
            //        alert("失败:" + err)
            //    }
            //});
            return qBox.iFLoad({ title: '文档浏览', src: '../../file/DocumentMain.aspx?type=0&ID=' + ID + '&path=' + encodeURI(path) + '&tablename=' + tablename + '&tableIDname=' + tableIDname + '', w: 400, h: 270 });
        }
        else {
            alert("请选择您要查看的记录，点击单选按钮选中！");
            return false;
        }
    });

    /*下载事件*/
    $("#download").click(function () {
        var LawAndRuleID = $("input[.radio][checked]").val(); //获取单选按钮 //获取隐藏的法律法规编号的值
        var filepath = $('#filepath').val();
        var tablename = $('#tablename').val();
        var tableIDname = $('#tableIDname').val();

        if (LawAndRuleID != undefined) {
            //return qBox.iFLoad({ title: '公司级考核信息下载', src: 'CompanyAss2Download.aspx?LawAndRuleID=' + LawAndRuleID + '&rdom=' + Math.random(), w: 400, h: 265 });
            return qBox.iFLoad({ title: '文件信息下载', src: '../../file/Download.aspx?ID=' + LawAndRuleID + '&path=' + encodeURI(filepath) + '&tablename=' + tablename + '&tableIDname=' + tableIDname + '&rdom=' + Math.random(), w: 400, h: 270 });
        }
        else {
            alert("请选择您要下载的记录，点击单选按钮选中！");
            return false;
        }
    });

})
//end $
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds();
    return currentdate;
}

//function dodelete() {
//    //var licenceID = $("#hfd_LicenceID").val();
//    var empNum = $("#hfd_EmpNum").val();//////
//    var cerNum = $("#hfd_CerNum").val();//////

//    var QueueItem = $(this).closest(".uploadify-queue-item");

//    var resultFile = $("#hfd_DocumentsNames").val();
//    var delFile = $(QueueItem).find("span.fileName input").val() + '~';

//    /*删除点击提交的事件*/
//    $.post("LicEditHandler.ashx", { EmployeeNum: empNum, CertificateNum: cerNum, delFile: delFile, rdom: Math.random() }, function (data) {
//        if (data == "") {
//            $(QueueItem).css("display", "none");
//            resultFile = resultFile.replace(delFile, '');
//            $("#hfd_DocumentsNames").val(resultFile);
//            alert($("#hfd_DocumentsNames").val())
//        }
//        else {
//            alert("删除过程中出错！");
//        }
//    });
//}

function doUplaod() {
    $('#custom_file_upload').uploadify('upload', '*');
}

function closeLoad() {
    $('#custom_file_upload').uploadify('cancel', '*');
}

function setCursorPos(x) {
    var txtRange = x.createTextRange();
    txtRange.moveStart("character", x.value.length);
    txtRange.moveEnd("character", 0);
    txtRange.select();
}