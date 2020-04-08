$(function () {

    /*查询的Js开始*/
    var t;
    var m = $("#Label0").val();
    //var numsOfQueryItem = $("#DropDownList11 option").length;
    var numsOfQueryItem = $("#numsOfQueryItem").val();
    for (var i = 1; i <= numsOfQueryItem; i++) {
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
        if (m < numsOfQueryItem) {
            m++;
            if (m == numsOfQueryItem)
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
        if (str == "CheckTableNum") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "3"); //设置条件选中，2对应大于小于等于，3对应like或=（input/下拉框，这个地方为temp + "3",时间 为 temp + "2"）
            $("#comlon" + temp + "2").val("TextBox" + temp + "1"); //设置值选中,就是下面的输入框是显示的那种

            $("#DropDownList" + temp + "2").hide(); //大于类
            $("#DropDownList" + temp + "3").show(); //包含

            $("#ddlKeys" + temp + "1").hide(); //下拉框
            $("#ddlKeys" + temp + "2").hide();
            $("#ddlKeys" + temp + "3").hide();
            $("#ddlKeys" + temp + "4").hide();
            $("#ddlKeys" + temp + "5").hide();
            $("#ddlKeys" + temp + "6").hide();
            $("#ddlKeys" + temp + "7").hide();
            $("#ddlKeys" + temp + "8").hide();
            $("#ddlKeys" + temp + "9").hide();
            $("#ddlKeys" + temp + "10").hide();
            $("#ddlKeys" + temp + "11").hide();
            $("#ddlKeys" + temp + "12").hide();

            $("#TextBox" + temp + "1").show(); //文本框
            $("#TextBox" + temp + "2").hide(); //日历文本框
        }
        else if (str == "safetychecktable_T.InstitutionNum") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "3");
            $("#comlon" + temp + "2").val("ddlKeys" + temp + "2"); //ddKey2绑定机构编号

            $("#DropDownList" + temp + "2").hide();
            $("#DropDownList" + temp + "3").show();

            $("#ddlKeys" + temp + "1").hide();
            $("#ddlKeys" + temp + "2").show();
            $("#ddlKeys" + temp + "3").hide();
            $("#ddlKeys" + temp + "4").hide();
            $("#ddlKeys" + temp + "5").hide();
            $("#ddlKeys" + temp + "6").hide();
            $("#ddlKeys" + temp + "7").hide();
            $("#ddlKeys" + temp + "8").hide();
            $("#ddlKeys" + temp + "9").hide();
            $("#ddlKeys" + temp + "10").hide();
            $("#ddlKeys" + temp + "11").hide();
            $("#ddlKeys" + temp + "12").hide();
            $("#TextBox" + temp + "1").hide();
            $("#TextBox" + temp + "2").hide();
        }

        else if (str == "CheckTableName") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "3"); 
            $("#comlon" + temp + "2").val("ddlKeys" + temp + "3"); //ddKeys3绑定检查表

            $("#DropDownList" + temp + "2").hide();
            $("#DropDownList" + temp + "3").show();

            $("#ddlKeys" + temp + "1").hide();
            $("#ddlKeys" + temp + "2").hide();
            $("#ddlKeys" + temp + "3").show();
            $("#ddlKeys" + temp + "4").hide();
            $("#ddlKeys" + temp + "5").hide();
            $("#ddlKeys" + temp + "6").hide();
            $("#ddlKeys" + temp + "7").hide();
            $("#ddlKeys" + temp + "8").hide();
            $("#ddlKeys" + temp + "9").hide();
            $("#ddlKeys" + temp + "10").hide();
            $("#ddlKeys" + temp + "11").hide();
            $("#ddlKeys" + temp + "12").hide();
            $("#TextBox" + temp + "1").hide();
            $("#TextBox" + temp + "2").hide();
        }
        else if (str == "left(convert(nvarchar(20),CheckTableFirstIndex_T.AddTime,120),10)" || str == "left(convert(nvarchar(20),CheckTableSecondIndex_T.AddTime,120),10)" || str == "left(convert(nvarchar(20),SafetyCheckTable_T.AddTime,120),10)"
            || str == "left(convert(nvarchar(20),CheckTableFirstIndex_T.DeleteTime,120),10)" || str == "left(convert(nvarchar(20),CheckTableSecondIndex_T.DeleteTime,120),10)" || str == "left(convert(nvarchar(20),SafetyCheckTable_T.DeleteTime,120),10)") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "2");
            $("#comlon" + temp + "2").val("TextBox" + temp + "2");

            $("#DropDownList" + temp + "2").show();
            $("#DropDownList" + temp + "3").hide();

            $("#ddlKeys" + temp + "1").hide();
            $("#ddlKeys" + temp + "2").hide();
            $("#ddlKeys" + temp + "3").hide();
            $("#ddlKeys" + temp + "4").hide();
            $("#ddlKeys" + temp + "5").hide();
            $("#ddlKeys" + temp + "6").hide();
            $("#ddlKeys" + temp + "7").hide();
            $("#ddlKeys" + temp + "8").hide();
            $("#ddlKeys" + temp + "9").hide();
            $("#ddlKeys" + temp + "10").hide();
            $("#ddlKeys" + temp + "11").hide();
            $("#ddlKeys" + temp + "12").hide();
            $("#TextBox" + temp + "1").hide();
            $("#TextBox" + temp + "2").show();
        }

        else if(str == "VisibleToWho")
        {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "3");
            $("#comlon" + temp + "2").val("ddlKeys" + temp + "4"); //ddKey4绑定其他可见机构

            $("#DropDownList" + temp + "2").hide();
            $("#DropDownList" + temp + "3").show();
            $("#DropDownList" + temp + "3")[0].options.remove(0);

            $("#ddlKeys" + temp + "1").hide();
            $("#ddlKeys" + temp + "2").hide();
            $("#ddlKeys" + temp + "3").hide();
            $("#ddlKeys" + temp + "4").show();
            $("#ddlKeys" + temp + "5").hide();
            $("#ddlKeys" + temp + "6").hide();
            $("#ddlKeys" + temp + "7").hide();
            $("#ddlKeys" + temp + "8").hide();
            $("#ddlKeys" + temp + "9").hide();
            $("#ddlKeys" + temp + "10").hide();
            $("#ddlKeys" + temp + "11").hide();
            $("#ddlKeys" + temp + "12").hide();
            $("#TextBox" + temp + "1").hide();
            $("#TextBox" + temp + "2").hide();
        }
        else if (str == "Deleted" || str == "CheckTableFirstIndex_T.Deleted" || str == "CheckTableSecondIndex_T.Deleted") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "3");
            $("#comlon" + temp + "2").val("ddlKeys" + temp + "5"); //ddKey5绑定是否删除

            $("#DropDownList" + temp + "2").hide();
            $("#DropDownList" + temp + "3").show();

            $("#ddlKeys" + temp + "1").hide();
            $("#ddlKeys" + temp + "2").hide();
            $("#ddlKeys" + temp + "3").hide();
            $("#ddlKeys" + temp + "4").hide();
            $("#ddlKeys" + temp + "5").show();
            $("#ddlKeys" + temp + "6").hide();
            $("#ddlKeys" + temp + "7").hide();
            $("#ddlKeys" + temp + "8").hide();
            $("#ddlKeys" + temp + "9").hide();
            $("#ddlKeys" + temp + "10").hide();
            $("#ddlKeys" + temp + "11").hide();
            $("#ddlKeys" + temp + "12").hide();
            $("#TextBox" + temp + "1").hide();
            $("#TextBox" + temp + "2").hide();
        }

        else if (str == "FirstIndexName") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "3");
            $("#comlon" + temp + "2").val("ddlKeys" + temp + "6"); //ddKey6绑定检查项目

            $("#DropDownList" + temp + "2").hide();
            $("#DropDownList" + temp + "3").show();

            $("#ddlKeys" + temp + "1").hide();
            $("#ddlKeys" + temp + "2").hide();
            $("#ddlKeys" + temp + "3").hide();
            $("#ddlKeys" + temp + "4").hide();
            $("#ddlKeys" + temp + "5").hide();
            $("#ddlKeys" + temp + "6").show();
            $("#ddlKeys" + temp + "7").hide();
            $("#ddlKeys" + temp + "8").hide();
            $("#ddlKeys" + temp + "9").hide();
            $("#ddlKeys" + temp + "10").hide();
            $("#ddlKeys" + temp + "11").hide();
            $("#ddlKeys" + temp + "12").hide();
            $("#TextBox" + temp + "1").hide();
            $("#TextBox" + temp + "2").hide();
        }

        else if (str == "SecondIndexName") {
            $("#comlon" + temp + "1").val("DropDownList" + temp + "3");
            $("#comlon" + temp + "2").val("ddlKeys" + temp + "7"); //ddKey6绑定检查内容

            $("#DropDownList" + temp + "2").hide();
            $("#DropDownList" + temp + "3").show();

            $("#ddlKeys" + temp + "1").hide();
            $("#ddlKeys" + temp + "2").hide();
            $("#ddlKeys" + temp + "3").hide();
            $("#ddlKeys" + temp + "4").hide();
            $("#ddlKeys" + temp + "5").hide();
            $("#ddlKeys" + temp + "6").hide();
            $("#ddlKeys" + temp + "7").show();
            $("#ddlKeys" + temp + "8").hide();
            $("#ddlKeys" + temp + "9").hide();
            $("#ddlKeys" + temp + "10").hide();
            $("#ddlKeys" + temp + "11").hide();
            $("#ddlKeys" + temp + "12").hide();
            $("#TextBox" + temp + "1").hide();
            $("#TextBox" + temp + "2").hide();
        }
        
            /*请选择，清空其他*/
        else if (str == "请选择") {

            $("#comlon" + temp + "1").val("DropDownList" + temp + "3");
            $("#comlon" + temp + "2").val("TextBox" + temp + "1");

            $("#DropDownList" + temp + "2").hide();
            $("#DropDownList" + temp + "3").show();

            $("#ddlKeys" + temp + "1").hide();
            $("#ddlKeys" + temp + "2").hide();
            $("#ddlKeys" + temp + "3").hide();
            $("#ddlKeys" + temp + "4").hide();
            $("#ddlKeys" + temp + "5").hide();
            $("#ddlKeys" + temp + "6").hide();
            $("#ddlKeys" + temp + "7").hide();
            $("#ddlKeys" + temp + "8").hide();
            $("#ddlKeys" + temp + "9").hide();
            $("#ddlKeys" + temp + "10").hide();
            $("#ddlKeys" + temp + "11").hide();
            $("#ddlKeys" + temp + "12").hide();
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

    //选项卡制作
    var $div_menu = $('div.tab_menu ul li');
    $div_menu.click(function () {
        //alert(123);
        $(this).addClass('current')
				.siblings().removeClass('current');
        var index = $div_menu.index(this);
        $('div.tab_box > div')
			.eq(index).show()
			.siblings().hide();

    });
    var txt_show = $('#txt_show').val();
    //alert(txt_show);
    if (txt_show == "2") {
        //设置第一个不选中，第二个选中

        $('#first').removeClass('current');
        $('#second').addClass('current');

        $('#secondMenu').show();
        $('#FirstMenu').hide();
    }

    /*添加层的显示*/
    $("#add_Second").click(function () {
        return qBox.iFLoad({ title: '添加检查内容信息', src: 'SecondItemAdd.jsp', w: 440, h: 335 });
    });
    $("#add_First").click(function () {
        return qBox.iFLoad({ title: '添加检查项目信息', src: 'FirstItemAdd.jsp', w: 440, h: 300 });
    });
    $("#add_Checktable").click(function () {
        return qBox.iFLoad({ title: '添加检查表信息', src: 'SafetyManagement/lawAndRule/SafetyCheckTableItemAdd.jsp', w: 440, h: 275 });
    });
    $("#addMo_Checktable").click(function () {
        return qBox.iFLoad({ title: '模板法添加检查表', src: 'SafetyCheckTableMould.jsp', w: 664, h: 470 });
    });

    /*详细层的显示*/
    $("#searchDetail_Second").click(function () {
        var SecondItemNum = $("input[.radio][checked]").val(); //获取单选按钮
        if (SecondItemNum != undefined) {
            return qBox.iFLoad({ title: '检查标准详情', src: 'SecondItemDetail.jsp?SecondItemNum=' + SecondItemNum + '&rdom=' + Math.random(), w:800, h: 600 });
        }
        else {
            alert("请选择您要查看的记录，点击单选按钮选中！");
            return false;
        }
    });
    $("#searchDetail_First").click(function () {
        var FirstItemNum = $("input[.radio][checked]").val(); //获取单选按钮
        if (FirstItemNum != undefined) {
            return qBox.iFLoad({ title: '检查内容详情', src: 'FirstItemDetail.jsp?FirstItemNum=' + FirstItemNum + '&rdom=' + Math.random(), w: 664, h: 160 });
        }
        else {
            alert("请选择您要查看的记录，点击单选按钮选中！");
            return false;
        }
    });
    $("#searchDetail_Checktable").click(function () {
        var ChecktableID = $("input[.radio][checked]").val(); //获取单选按钮
        if (ChecktableID != undefined) {
            //return qBox.iFLoad({ title: '检查表详情', src: 'SafetyChecktableItemDetail.jsp?ChecktableID=' + ChecktableID + '&rdom=' + Math.random(), w: 900, h: 700 });
            self.location = 'getSafetyChecktableItemDetail?ChecktableID=' + ChecktableID + '&rdom=' + Math.random();
        }
        else {
            alert("请选择您要查看的记录，点击单选按钮选中！");
            return false;
        }
    });

    /*修改层的显示*/
    $("#update_Second").click(function () {
        var SecondIndexID = $("input[.radio][checked]").val(); //获取单选按钮
        if (SecondIndexID != undefined) {
            var isDel = $("input[.radio][checked]")[0].parentNode.children.isDelete.value; //判断是否已经逻辑删除
            if (isDel == "1") {
                alert("所选该检查表已经逻辑删除，不能修改");
            }
            else {
                return qBox.iFLoad({ title: '修改检查内容', src: 'SecondItemEdit.jsp?SecondIndexID=' + SecondIndexID + '&rdom=' + Math.random(), w: 440, h: 335 });
            }
        }
        else {
            alert("请选择您要查看的记录，点击单选按钮选中！");
            return false;
        }
    });
    $("#update_First").click(function () {
        var FirstIndexID = $("input[.radio][checked]").val(); //获取单选按钮
        if (FirstIndexID != undefined) {
            var isDel = $("input[.radio][checked]")[0].parentNode.children.isDelete.value; //判断是否已经逻辑删除
            if (isDel == "1") {
                alert("所选该检查表已经逻辑删除，不能修改");
            }
            else {
                return qBox.iFLoad({ title: '修改检查项目', src: 'FirstItemEdit.jsp?FirstIndexID=' + FirstIndexID + '&rdom=' + Math.random(), w: 440, h: 300 });
            }
        }
        else {
            alert("请选择您要查看的记录，点击单选按钮选中！");
            return false;
        }
    });
    $("#update_Checktable").click(function () {
//        var ChecktableItemNum = $("input[.radio][checked]").val(); //获取单选按钮
//        if (ChecktableItemNum != undefined) {
//            var isDel = $("input[.radio][checked]")[0].parentNode.children.isDelete.value; //判断是否已经逻辑删除
    	var isDel="0";
            if (isDel == "1") {
                alert("所选该检查表已经逻辑删除，不能修改");
            }
            else {
                return qBox.iFLoad({ title: '修改检查表', src: 'SafetyManagement/lawAndRule/SafetyChecktableItemEdit.jsp?', w: 440, h: 275 });
            }
//        }
//        else {
//            alert("请选择您要查看的记录，点击单选按钮选中！");
//            return false;
//        }
    });

    /*删除点击提交的事件 delete_First*/
    $('#delete_Second').click(function () {
        var SecondIndexID = $("input[.radio][checked]").val(); //获取单选按钮
        if (SecondIndexID != undefined) {
            //执行删除操作
            /*获取变量，并进行删除处理，异步进行，先删除数据库，然后回调函数删除页面上的一行*/
            var isDel = $("input[.radio][checked]")[0].parentNode.children.isDelete.value; //判断是否已经逻辑删除
            if (isDel == "1") {
                alert("所选该检查表已经逻辑删除，不能修改");
            }
            else {
                if (confirm("您确定要删除吗?")) {
                    $.post("DeleteProcess.ashx", { op: "DelSecondIndex", SecondIndexID: SecondIndexID, rdom: Math.random() }, function (data) {
                        if (data == "1") {
                            $("#tr_" + SecondIndexID).remove();
                        }
                        else {
                            alert("删除失败！");
                        }
                    });
                }
            }
        }
        else {
            alert("请选择您要删除的记录，点击单选按钮选中！");
            return false;
        }
    });

    $('#delete_First').click(function () {
        var FirstIndexID = $("input[.radio][checked]").val(); //获取单选按钮
        if (FirstIndexID != undefined) {
            //执行删除操作
            /*获取变量，并进行删除处理，异步进行，先删除数据库，然后回调函数删除页面上的一行*/
            var isDel = $("input[.radio][checked]")[0].parentNode.children.isDelete.value; //判断是否已经逻辑删除
            if (isDel == "1") {
                alert("所选该检查表已经逻辑删除，不能修改");
            }
            else {
                if (confirm("您确定要删除吗?")) {
                    $.post("DeleteProcess.ashx", { op: "DelFirstIndex", FirstIndexID: FirstIndexID, rdom: Math.random() }, function (data) {
                        if (data == "1") {
                            $("#tr_" + FirstIndexID).remove();
                        }
                        else {
                            alert("删除失败！");
                        }
                    });
                }
            }
        }
        else {
            alert("请选择您要删除的记录，点击单选按钮选中！");
            return false;
        }
    });

    $('#delete_Checktable').click(function () {
        var ChecktableID = $("input[.radio][checked]").val(); //获取单选按钮
        if (ChecktableID != undefined) {
            //执行删除操作
            /*获取变量，并进行删除处理，异步进行，先删除数据库，然后回调函数删除页面上的一行*/
            var isDel = $("input[.radio][checked]")[0].parentNode.children.isDelete.value; //判断是否已经逻辑删除
            if (isDel == "1") {
                alert("所选该检查表已经逻辑删除，不能修改");
            }
            else {
                if (confirm("您确定要删除吗?")) {
                    $.post("SafetyCheckTableItemDel", { op: "DelCheckTable", ChecktableID: ChecktableID, rdom: Math.random() }, function (data) {
                        if (data == "1") {
                            $("#tr_" + ChecktableID).remove();
                        }
                        else if (data == "2") {
                            alert("安全检查表添加时间晚于当前时间，不允许删除！");
                        }
                        else {
                            alert("删除失败！");
                        }
                    });
                }
            }
        }
        else {
            alert("请选择您要删除的记录，点击单选按钮选中！");
            return false;
        }
    });

    $("#export_Checktable").click(function () {
        var ChecktableID = $("input[.radio][checked]").val(); //获取单选按钮
        if (ChecktableID != undefined) {
            $.post("CheckTableExport.ashx", { op: "exportCheckTable", ChecktableID: ChecktableID, rdom: Math.random() }, function (data) {
                
            });
        }
        else {
            alert("请选择您要导出的记录，点击单选按钮选中！");
            return false;
        }
    });

    /*显示特种人员信息和安全人员信息的显示*/
    $("#iframePopSpeSec").click(function () {
        var employeeNum = $("input[.radio][checked]").val(); //获取单选按钮
        var employeeName = $("input[.radio][checked]").siblings('.employeeName').val();
        if (employeeNum != undefined) {
            return qBox.iFLoad({ title: '显示证书信息', src: 'specialAndSecurityEmployee.jsp?employeeNum=' + employeeNum + '&employeeName=' + employeeName + '&rdom=' + Math.random(), w: 580, h: 345 });
        }
        else {
            alert("请选择您要查看的记录，点击单选按钮选中！");
            return false;
        }
    });

    /*培训信息的显示*/
    $("#iframePopEdu").click(function () {
        var employeeNum = $("input[.radio][checked]").val(); //获取单选按钮
        if (employeeNum != undefined) {
            return qBox.iFLoad({ title: '员工教育培训经历', src: 'employeeEducationInfo.jsp?employeeNum=' + employeeNum + '&rdom=' + Math.random(), w: 763, h: 205 });
        }
        else {
            alert("请选择您要查看的记录，点击单选按钮选中！");
            return false;
        }
    });

    /*重置按钮*/
    $('#btnResetEmp').click(function () {
        $('#txt_employeeBirth').attr("value", "");
        $('#txt_employeeIDNum').attr("value", "");
        $('#txt_employeeName').attr("value", "");
        $('#txt_employeeNative').attr("value", "");
        $('#txt_employeeNumAdd').attr("value", "");
        $('#txt_employeeTel').attr("value", "");
        $('#txt_Encouragement').attr("value", "");
        $('#txt_GraduateSchool').attr("value", "");
        $('#txt_HomeAddress').attr("value", "");
        $('#txt_InStationDate').attr("value", "");
        $('#txt_JoinCompanyDate1').attr("value", "");
        $('#txt_OutComanyDate').attr("value", "");
        $('#txt_OutStationDate').attr("value", "");
        $('#txt_Speciality').attr("value", "");
        $('#txt_UrgentLinkman').attr("value", "");
        $('#txt_UrgentLinkmanTel').attr("value", "");
        $('#txt_WorkType').val("");
        $('#txt_WoundRecord').attr("value", "");
        $('#txt_onstate').val('0');
        $('#txt_employeeSex').val('男');
        $('#txt_InstitutionNum').val('');
        $('#txt_WorkStyleNum').val('');
        $('#txt_WorkPositionNum').val('');
        $('#txt_CurrentWorkNum').val('');
        $('#txt_Category').val('');
        $('#txt_OccupationTitleNum').val('');
        $('#txt_TechnicalTitleNum').val('');
        $('#txt_DegreeNum').val('');
        $('#txt_StudyExperienceNum').val('');
        $('#userImage').attr('ImageUrl', '');
        $('#finishedTips').text(''); //清除提示条
        $('#txt_IdentityID').attr("value", "");

        $('#ThreeFlag').attr("value", "2");
        $('#finishedTips').attr("value", "");

    });

    /**从身份证号中提取出生日期*/
    $('#txt_employeeIDNum').change(function () {
        var idNum = $(this).val();
        if (idNum != undefined) {
            if (idNum.length == "18")//18位身份证号码
            {
                var iddate = idNum.substring(6, 14);
                //alert(iddate);
                var birth = iddate.substring(0, 4) + '-' + iddate.substring(4, 6) + '-' + iddate.substring(6, 8);
                //alert(birth);
                $('#txt_employeeBirth').attr("value", birth);
            }
            else if (idNum.length == "15")//15位身份证号码
            {
                var iddate = idNum.substring(6, 12);
                //alert(iddate);
                var birth = '19' + iddate.substring(0, 2) + '-' + iddate.substring(2, 4) + '-' + iddate.substring(4, 6);
                //alert(birth);
                $('#txt_employeeBirth').attr("value", birth);
            }
            else {
            }

        }
        else {

        }
    });


    /*验证员工编号*/
    $('#txt_employeeNumAdd').change(function () {
        var employeeNum = $(this).val();
        if (employeeNum != undefined && employeeNum != "") {//员工编号已填写
            $.post("dataProcess.ashx", { op: "txt_employeeNum", employeeNum: employeeNum, rdom: Math.random() }, function (data) {
                if (data == "") {
                    //alert("员工编号不存在，可以添加！");
                }
                else {
                    alert("员工编号" + employeeNum + "已存在！");
                    $('#txt_employeeNumAdd').attr("value", "");
                    return false;
                }
            });
        }
        else {

        }
    });


    /**在添加一个新员工的时候，进公司日期弹出提示，是否添加三级安全教育*/
    $('#txt_JoinCompanyDate1').focus(function () {
        var joindate = $(this).val();
        var employeeNum = $('#txt_employeeNumAdd').val();
        if (joindate != undefined && joindate != "") {
            if (employeeNum != undefined && employeeNum != "") {
                if (confirm("确定添加三级安全教育培训？")) {
                    //alert('添加培训');
                    $('#ThreeFlag').attr("value", "2");  // 2 表示添加三级安全教育培训
                    $('#txt_UrgentLinkman').focus();
                    return false;
                } else {
                    //alert('不添加培训');
                    $('#ThreeFlag').attr("value", "1"); // 1 表示不添加三级安全教育培训
                    $('#txt_UrgentLinkman').focus();
                    return false;
                }
            }
            else {

                alert("请先填写员工编号！");
                $(this).attr("value", "");
                $('#txt_employeeNumAdd').focus();
                return false;
            }
        }
        else {

        }
    });

    /*当前岗位变化的时候，添加调岗记录 txt_WorkPositionNum**/
    $('#txt_WorkPositionNum1').change(function () {
        var currentWork = $('#currentWork').val();
        var changeWork = $('#txt_WorkPositionNum1').val();
        var employeeNum = $('#txt_employeeNum').val();
        if (currentWork != "" && currentWork != changeWork && changeWork != "") {
            //调换岗位，添加调岗记录
            //alert("调换岗位，添加调岗记录");
            //当前岗位和改变岗位不同，添加调岗记录//if (currentWork != changeWork) {

            if (confirm("确定添加调换岗位教育培训？")) {
                //添加调岗记录
                $('#changePosition').attr("value", "1"); //表示添加调岗信息
            }
            else {
                $('#changePosition').attr("value", "0"); //表示不添加调岗信息
                return false;
            }

        }
        else {

        }
    });


    /**是否添加复工培训，这个是调入日期的填写*/
    $('#txt_InStationDateE').focus(function () {
        var inStation = $(this).val();
        var employeeNum = $('#txt_employeeNum').val();
        if (inStation != undefined && inStation != "") {
            if (confirm("确定添加复工教育培训？")) {
                $('#txt_onstate').val('0'); //添加了复工培训的，应该为离岗状态，他的复工培训合格后，在修改为在岗状态
                //进入添加复工教育培训
                $('#reWork').attr("value", "1"); //添加复工培训
            }
            else {
                //不添加复工培训计划，岗位状态为在岗，但是在后台将调入，调离日期清空
                $('#reWork').attr("value", "0"); //不添加复工培训
                $('#txt_onstate').val('1'); //不添加复工培训,则岗位状态为在岗
                $('#txt_Encouragement').focus();
            }
        }
        else {
            //空
        }
    });
    /**这个是调离日期的填写*/
    $('#txt_OutStationDateE').focus(function () {
        var outStation = $(this).val();
        if (outStation != undefined && outStation != "") {
            $('#txt_onstate').val('0');
        }
        else {
            //空
        }
    });

    /*验证下井的员工编号*/
    $('#txt_IdentityID').change(function () {
        var identityID = $(this).val();
        if (identityID != undefined && identityID != "") {//员工编号已填写
            $.post("dataProcess.ashx", { op: "txt_identityID", identityID: identityID, rdom: Math.random() }, function (data) {
                if (data == "") {
                    //alert("员工编号不存在，可以添加！");
                }
                else {
                    alert("下井员工编号" + identityID + "已存在！");
                    $('#txt_IdentityID').attr("value", "");
                    return false;
                }
            });
        }
        else {

        }
    });

    //校验检查项目的SerialNum
    $('#serialNumFir').change(function () {
        var temp = $("#serialNumArr").val();
        if (temp == "") {
            $('#submitadd').removeAttr("disabled");
            $('#Label2').hide();
        }
        else {
            var serialNumFir = $('#serialNumFir').val();
            temp = "," + temp + ",";
            if (temp.indexOf("," + serialNumFir + ",") != -1) //序号已存在
            {
                $('#submitadd').attr({ "disabled": "disabled" });
                $('#Label2').text("!");
                $('#Label2').show();
            }
            else {
                $('#submitadd').removeAttr("disabled");
                $('#Label2').hide();
            }
        }
    });

    //校验检查内容的SerialNum
    $('#serialNumSec').change(function () {
        var temp = $("#serialNumArr2").val();
        if (temp == "") {
            $('#submitadd').removeAttr("disabled");
            $('#Label2').hide();
        }
        else {
            var serialNumSec = $('#serialNumSec').val();
            var label1 = $('#Label1').text();
            temp = "," + temp + ",";
            if (temp.indexOf("," + label1 + serialNumSec + ",") != -1) //序号已存在
            {
                $('#submitadd').attr({ "disabled": "disabled" });
                $('#Label2').text("!");
                $('#Label2').show();
            }
            else {
                $('#submitadd').removeAttr("disabled");
                $('#Label2').hide();
            }
        }
    });
})