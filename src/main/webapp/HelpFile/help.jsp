<%--
  Created by IntelliJ IDEA.
  User: 10247
  Date: 2019/6/26
  Time: 10:30
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>帮助文档</title>
    <script src="src/jquery-2.1.3.min.js" type="text/javascript" charset="utf-8"></script>
    <script src="src/bootstrap.min.js" type="text/javascript" charset="utf-8"></script>
    <script src="js/help.js" type="text/javascript" charset="utf-8"></script>
    <link rel="stylesheet" href="src/bootstrap.min.css">
    <link rel="stylesheet" href="css/help.css">
</head>
<body style="height:100%">
<div class="row" style="padding:20px;height:100%">
    <div class="col-md-12">
        <span class="navbar-title">乌龙泉矿业有限公司双重预防机制管控平台帮助文档</span>
    </div>
    <div class="col-md-2">
        <ul class="left-nav" >
            <p class="title-li">操作手册</p>
            <li class="nav-li change-style clickcur" findurl="systemAll.jsp"><span>系统概述</span></li>
            <li class="nav-li change-style" findurl="login.jsp"><span>用户登录</span></li>
            <li class="nav-li change-style" findurl="main.jsp"><span>主页面</span></li>
            <li class="nav-li change-style" findurl="search.jsp"><span>查询功能介绍</span></li>
            <li class="nav-li change-style" findurl="require.jsp"><span>使用要求</span></li>
            <li>
                <span class="toggle-ul change-style"><span class="glyphicon glyphicon-chevron-down"></span> 功能模块使用</span>
                <ul class="first-ul">
                    <li>
                        <span class="toggle-ul change-style"><span class="glyphicon glyphicon-chevron-down"></span>员工安全信息管理</span>
                        <ul class="second-ul">
                            <li class="nav-li change-style" findurl="employeeManage/employeeMan.jsp"><span>公司员工基本信息</span></li>
                            <li class="nav-li change-style" findurl="employeeManage/specialEquipMan.jsp"><span>特种设备作业人员台账</span></li>
                            <li class="nav-li change-style" findurl="employeeManage/specialMan.jsp"><span>特种作业人员台账</span></li>
                            <li class="nav-li change-style" findurl="employeeManage/securityMan.jsp"><span>安全管理人员台账</span></li>
                        </ul>
                    </li>

                </ul>
                <ul class="first-ul">
                    <li>
                        <span class="toggle-ul change-style"><span class="glyphicon glyphicon-chevron-down"></span>安全文件管理</span>
                        <ul class="second-ul">
                            <li class="nav-li change-style" findurl="fileManage/lawRule.jsp"><span>法律法规</span></li>
                            <li class="nav-li change-style" findurl="fileManage/technicalStandard.jsp"><span>技术标准规范</span></li>
                            <li class="nav-li change-style" findurl="fileManage/groupFile.jsp"><span>集团文件</span></li>
                            <li class="nav-li change-style" findurl="fileManage/systemFile.jsp"><span>体系文件</span></li>
                        </ul>
                    </li>

                </ul>
                <ul class="first-ul">
                    <li>
                        <span class="toggle-ul change-style"><span class="glyphicon glyphicon-chevron-down"></span>安全风险分级管控</span>
                        <ul class="second-ul">
                            <li class="nav-li change-style" findurl="risk_control/section_partition.html"><span>风险评价单元划分</span></li>
                            <li class="nav-li change-style" findurl="risk_control/section_identification.html"><span>危险有害因素辨识</span></li>
                            <li class="nav-li change-style" findurl="risk_control/section_evaluation.html"><span>安全风险分级管控</span></li>
                            <li class="nav-li change-style" findurl="saftyRiskNotice/saftyRiskNotice.jsp"><span>安全风险告知</span></li>
                            <li class="nav-li change-style" findurl="risk_control/riskStatistics.jsp"><span>区域风险评估与统计</span></li>
                        </ul>
                    </li>

                </ul>
                <ul class="first-ul">
                    <li>
                        <span class="toggle-ul change-style"><span class="glyphicon glyphicon-chevron-down"></span>关联危险作业管理</span>
                        <ul class="second-ul">
                            <li class="nav-li change-style" findurl="AssociateManagement/dangerTaskApply.jsp"><span>关联危险作业申请</span></li>
                            <li class="nav-li change-style" findurl="AssociateManagement/dangerTaskApproval.jsp"><span>关联危险作业审批</span></li>
                        </ul>
                    </li>

                </ul>
                <ul class="first-ul">
                    <li>
                        <span class="toggle-ul change-style"><span class="glyphicon glyphicon-chevron-down"></span>安全检查与隐患管理</span>
                        <ul class="second-ul">
                            <li class="nav-li change-style" findurl="RectifyManage/SafetyCheckApplay.jsp"><span>安全检查标准申请</span></li>
                            <li class="nav-li change-style" findurl="RectifyManage/SafetyCheckApproval.jsp"><span>安全检查标准审批</span></li>
                            <li class="nav-li change-style" findurl="RectifyManage/SafetyCheckStandard.jsp"><span>安全检查标准管理</span></li>
                            <li class="nav-li change-style" findurl="RectifyManage/CheckTableEntering.jsp"><span>检查表数据录入</span></li>
                            <li class="nav-li change-style" findurl="RectifyManage/CheckResultMana.jsp"><span>安全检查结果管理</span></li>
                            <li class="nav-li change-style" findurl="SafetyManagement/hiddenStatistics.jsp"><span>安全检查隐患分析</span></li>
                            <li class="nav-li change-style" findurl="RectifyManage/rectifyBefore.jsp"><span>安全整改信息处理</span></li>
                            <li class="nav-li change-style" findurl="SafetyManagement/RectificationStatistics.jsp"><span>安全整改信息统计</span></li>
                        </ul>
                    </li>

                </ul>
                <ul class="first-ul">
                    <li>
                        <span class="toggle-ul change-style"><span class="glyphicon glyphicon-chevron-down"></span>应急救援信息管理</span>
                        <ul class="second-ul">
                            <li class="nav-li change-style" findurl="emergencyRescueManage/emergencySysManage.jsp"><span>应急体系管理</span></li>
                            <li class="nav-li change-style" findurl="emergencyRescueManage/materialManage.jsp"><span>应急物资管理</span></li>
                            <li class="nav-li change-style" findurl="emergencyRescueManage/trainManage.jsp"><span>应急演练管理</span></li>
                        </ul>
                    </li>

                </ul>
                <ul class="first-ul">
                    <li>
                        <span class="toggle-ul change-style"><span class="glyphicon glyphicon-chevron-down"></span>安全履职评价管理</span>
                        <ul class="second-ul">
                            <li class="nav-li change-style" findurl="performanceAss/companyAss.jsp"><span>公司级考核</span></li>
                            <li class="nav-li change-style" findurl="performanceAss/workshopAss.jsp"><span>车间级考核</span></li>
                            <li class="nav-li change-style" findurl="performanceAss/classAss.jsp"><span>班组级考核</span></li>
                        </ul>
                    </li>

                </ul>
                <ul class="first-ul">
                    <li>
                        <span class="toggle-ul change-style"><span class="glyphicon glyphicon-chevron-down"></span>系统维护与管理</span>
                        <ul class="second-ul">
                            <li class="nav-li change-style" findurl="systemManage/instituMan.jsp"><span>机构管理</span></li>
                            <li class="nav-li change-style" findurl="systemManage/roleMan.jsp"><span>角色管理</span></li>
                            <li class="nav-li change-style" findurl="systemManage/userMan.jsp"><span>用户管理</span></li>
                            <li class="nav-li change-style" findurl="systemManage/dataDirectory.jsp"><span>数据字典</span></li>
                            <li class="nav-li change-style" findurl="risk_control/level_management.html"><span>风险管理</span></li>
                            <li class="nav-li change-style" findurl="systemManage/assessment_management.jsp"><span>考核等级管理</span></li>
                            <li class="nav-li change-style" findurl="systemManage/sign.jsp"><span>签名管理</span></li>
                            <li class="nav-li change-style" findurl="systemManage/parameterMan.jsp"><span>参数管理</span></li>
                            <li class="nav-li change-style" findurl="systemManage/database.jsp"><span>数据库维护</span></li>
                        </ul>
                    </li>

                </ul>
                <ul class="first-ul">
                    <li>
                        <span class="toggle-ul change-style"><span class="glyphicon glyphicon-chevron-down"></span>基于移动端的双控平台</span>
                        <ul class="second-ul">
                            <li class="nav-li change-style" findurl="APP/FunctionDescript.html"><span>功能概述</span></li>
                            <li class="nav-li change-style" findurl="APP/UserLogin.html"><span>用户登录</span></li>
                            <li class="nav-li change-style" findurl="rectify_mobile/check_manage.html"><span>现场检查</span></li>
                            <li class="nav-li change-style" findurl="rectify_mobile/rectify_manage.html"><span>闭环管理</span></li>
                            <li class="nav-li change-style" findurl="APP/dangerTaskApplication.html"><span>作业申请</span></li>
                            <li class="nav-li change-style" findurl="APP/dangerTaskApprovel.html"><span>作业审批</span></li>
<li class="nav-li change-style" findurl="APP/checkapply.html"><span>检查申请</span></li>
<li class="nav-li change-style" findurl="APP/checkapprove.html"><span>检查审批</span></li>
                            <li class="nav-li change-style" findurl="APP/standardUpdate.jsp"><span>标准更新</span></li>
                           <%--    <li class="nav-li change-style" findurl=""><span>机构更新</span></li>
                            <li class="nav-li change-style" findurl=""><span>个人中心</span></li>--%>
                        </ul>
                    </li>

                </ul>
            </li>
        </ul>
    </div>
    <div class="article col-md-10" style="height:100%" id="article">
    </div>
</div>
<div class="backtop">
    <span class="glyphicon glyphicon-home"></span>
</div>

<script>
    $(function(){
        $(".article").load('systemAll.jsp');
    })
    $(".nav-li").click(function(){
        console.log($(this).attr("findurl"))
        $(".article").load($(this).attr("findurl"));
    })
</script>
</body>
</html>
