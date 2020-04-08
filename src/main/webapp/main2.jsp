<%--
  Created by IntelliJ IDEA.
  User: 15926
  Date: 2019/5/10
  Time: 15:08
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head><meta content="webkit" name="renderer" />
    <%--<script type="text/javascript">--%>
        <%--if (window.ActiveXObject || "ActiveXObject" in window) {--%>
            <%--var polyfill = document.createElement("script");--%>
            <%--polyfill.setAttribute("src", "static/js/polyfill.min.js");--%>
            <%--polyfill.setAttribute("type", "text/javascript");--%>
            <%--document.head.appendChild(polyfill);--%>
            <%--var jquery = document.createElement("script");--%>
            <%--jquery.setAttribute("src", "static/js/jquery-1.11.0.min.js");--%>
            <%--jquery.setAttribute("type", "text/javascript");--%>
            <%--document.head.appendChild(jquery);--%>
        <%--}else{--%>
            <%--var jquery = document.createElement("script");--%>
            <%--jquery.setAttribute("src", "static/js/jquery-3.3.1.min.js");--%>
            <%--jquery.setAttribute("type", "text/javascript");--%>
            <%--document.head.appendChild(jquery);--%>
        <%--}--%>
    <%--</script>--%>
    <script type="text/javascript" src="static/js/jquery-3.3.1.min.js"></script>
    <script type="text/javascript" src="static/js/vue.min.js"></script>
    <script type="text/javascript" src="static/element/element-ui.js"></script>
    <script type="text/javascript" src="static/main/js/main.js"></script>
    <script type="text/javascript" src="static/response.js"></script>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>乌龙泉矿双重预防机制预警系统</title>
    <!-- Tell the browser to be responsive to screen width -->
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <!-- Bootstrap 3.3.7 -->
    <link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/static/bootstrap/css/bootstrap.min.css"/>
    <link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/static/element/element-ui.css"/>
    <link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/static/css/module.css"/>
    <!-- Font Awesome -->
    <link rel="stylesheet" href="<%=request.getContextPath()%>/static/main/css/font-awesome.min.css">
    <!-- Ionicons -->
    <link rel="stylesheet" href="<%=request.getContextPath()%>/static/main/css/ionicons.min.css">
    <!-- Theme style -->
    <link rel="stylesheet" href="<%=request.getContextPath()%>/static/main/css/AdminLTE.min.css">
    <!-- AdminLTE Skins. Choose a skin from the css/skins
         folder instead of downloading all of them to reduce the load. -->
    <link rel="stylesheet" href="<%=request.getContextPath()%>/static/main/css/_all-skins.min.css">
    <style>
        html {
            overflow: hidden;
        }

        body {
            overflow: hidden;
            font-size: 16px;
        }

        .wrapper {
            overflow: hidden;
        }

        .sidebar {
            overflow-y: auto;
        }

        .sidebar::-webkit-scrollbar {
            width: 0;
        }

        .treeview-menu > li {
            height: 48px;
        }

        .treeview > a {
            height: 48px;
            font-size: 18px;
        }

        .treeview-menu > li.active {
            background-color: #36c2fd;
        }

        .treeview-menu > li:hover {
            background: #36c2fd;
            transition: 0.2s;
        }

        .navbar-button {
            font-size: 16px;
        }

        .menu-logo {
            width: 22px;
            height: 22px;
        }

        .left-menu {
            margin-left: 8px;
        }

        .left-menu-2 {
            margin-left: 50px;
        }

        input#search-input::-webkit-input-placeholder {
            color: #1781ed;
        }

        .navbar.navbar-static-top > .navbar-custom-menu {
            margin-left: auto;
        }

        .navbar.navbar-static-top {
            display: flex;
            align-items: center;
            height: 75px;
        }

        .fa-circle-o {
            margin-right: 1em;
        }

        .wrapper {
            margin-top: 0px;
        }

        .top-button {
            margin-right: 1em;
            font-size: 1.1em;
            padding: 0px;
        }

        .el-dialog__body .el-textarea__inner {
            width: 15em;
        }


    </style>
    <%
        String right = session.getAttribute("UserRight").toString();

    %>
    <script type="text/javascript">
        // 点击“检查表数据录入”时收缩
        var websocket = null;
        var userno = window.sessionStorage.getItem('userNum');

        //判断当前浏览器是否支持WebSocket
        if ('WebSocket' in window) {
            websocket = new WebSocket("ws://localhost:8080/kuangshanJava/websocket/"+userno);
            // websocket = new ReconnectingWebSocket("ws://10.138.108.203:8080/websocket/"+userno);
        }
        else {
            alert('当前浏览器 Not support websocket')
        }
        //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
        window.onbeforeunload = function () {
            closeWebSocket();
        }

        //关闭WebSocket连接
        function closeWebSocket() {
            websocket.close();
        }

        $(function(){
            $("#leftno").click(function(){
                $(".addlei").addClass("sidebar-collapse");
                $(".sidebar-mini.sidebar-collapse .main-header .logo > .logo-mini").css("display","block");
                $(".sidebar-mini.sidebar-collapse .main-header .logo > .logo-mini").css("margin-left","-15px");
                $(".sidebar-mini.sidebar-collapse .main-header .logo > .logo-mini").css("margin-right","-15px");
                $(".sidebar-mini.sidebar-collapse .main-header .logo > .logo-mini").css("font-size","18px");
                $(".sidebar-mini.sidebar-collapse .main-header .logo > .logo-lg").css("display","none");

                $(".sidebar-mini.sidebar-collapse .main-sidebar .user-panel > .info").css("display","none");
                $(".sidebar-mini.sidebar-collapse .sidebar-form").css("display","none");
                $(".sidebar-mini.sidebar-collapse .sidebar-menu > li > a > span").css("display","none");
                $(".sidebar-mini.sidebar-collapse .sidebar-menu > li > .treeview-menu").css("display","none");
                $(".sidebar-mini.sidebar-collapse .sidebar-menu > li > a > .pull-right").css("display","none");
                $(".sidebar-mini.sidebar-collapse .sidebar-menu li.header").css("display","none");
            })
            $(".navbar a").click(function(){
                if($(".logo-mini").css("display")=="block"){
                    $(".sidebar-mini.sidebar-collapse .main-header .logo > .logo-mini").css("display","none");
                    $(".sidebar-mini.sidebar-collapse .main-header .logo > .logo-lg").css("display","block");
                    $(".sidebar-mini.sidebar-collapse .main-sidebar .user-panel > .info").css("display","");
                    $(".sidebar-mini.sidebar-collapse .sidebar-form").css("display","");
                    $(".sidebar-mini.sidebar-collapse .sidebar-menu > li > a > span").css("display","");
                    $(".sidebar-mini.sidebar-collapse .sidebar-menu > li > .treeview-menu").css("display","");
                    $(".sidebar-mini.sidebar-collapse .sidebar-menu > li > a > .pull-right").css("display","");
                    $(".sidebar-mini.sidebar-collapse .sidebar-menu li.header").css("display","");

                    $(".sidebar-mini.sidebar-collapse .sidebar-menu .menu-open .treeview-menu").css("display","block");
                } else if($(".logo-mini").css("display")=="none"){
                    $(".logo-lg").css("display","none");
                    $(".logo-mini").css("display","block");
                }
            })
        })
    </script>
</head>
<body class="hold-transition skin-blue sidebar-mini addlei">
<div class="wrapper" v-loading="pageLoading">

    <header class="main-header">
        <!-- Logo -->

        <a href="main2.jsp" class="logo">
            <span class="logo-mini"><img src="static/image/logo-mini.png"></span>
            <span class="logo-lg"><img src="static/image/logo.png"></span>

        </a>
        <!-- Header Navbar: style can be found in header.less -->
        <nav class="navbar navbar-static-top">
            <%--<div class="navbar-header">--%>
            <!-- Sidebar toggle button-->
            <a href="#" data-toggle="push-menu" role="button">
                <img src="static/image/menu-indentation.png" style="margin-left: 1em;">
                <span class="sr-only">Toggle navigation</span>
            </a>

            <div class="navbar-custom-menu">
                <ul class="nav navbar-nav">
                    <li class="dropdown user user-menu">
                        <%--<el-button @click="getList">111</el-button>--%>
                        <el-button type="text" @click="getList();correctStyle();" data-toggle="dropdown" class="top-button">
                            <img src="static/image/userPicture.png" class="user-image" alt="User Image">
                            <span class="hidden-xs">{{EmployeeName}}</span>
                        </el-button>
                    </li>
                    <!--           Control Sidebar Toggle Button -->
                    <%--<li >
                        <a target="right-frame" href="SystemMaintenance/UserManage/ChangePassword_vue" >修改密码</a>
                    </li>--%>

                    <li class="navbar-button">
                        <el-button type="text" @click="_help" data-toggle="dropdown" class="top-button">帮助
                        </el-button>
                        <%--<a>帮助</a>--%>
                    </li>
                    <li class="navbar-button">
                        <el-button type="text" @click="logout" data-toggle="dropdown" class="top-button">退出
                        </el-button>
                        <%--<a href="javascript:top.location='login.jsp'">登出</a>--%>
                    </li>
                </ul>
            </div>
            <%--</div>--%>
        </nav>
    </header>
    <!-- Left side column. contains the logo and sidebar -->
    <aside class="main-sidebar">
        <!-- sidebar: style can be found in sidebar.less -->
        <section class="sidebar">

            <%--左侧栏--%>
            <ul class="sidebar-menu" data-widget="tree" style="margin-top: 2em">

                <!--员工基本信息 EmployeeManagement-->
                <li class="treeview">
                    <%if (right.contains("010100") || right.contains("010200") || right.contains("010300") || right.contains("010400")) {%>
                    <a href="#">
                        <i class="fa"><img class="menu-logo" src="static/image/menu-employeeMan.png"></i>
                        <span class="left-menu">员工安全信息管理</span>
                        <span class="pull-right-container">
                            <i class="fa fa-angle-left pull-right"></i>
                      </span>
                    </a>
                    <ul class="treeview-menu">
                        <%if (right.contains("010100")) {%>
                        <li>
                            <a target="right-frame" href="EmployeeManagement/EmployeeMan/EmployeeList_vue"><span
                                class="left-menu-2">公司员工基本信息</span></a>
                        </li>
                        <%}%>
                    </ul>
                    <%}%>
                </li>


                <!--培训计划管理 webapp下相关的文件夹名写一下，权限先不管-->
                <li class="treeview">
                    <%if (right.contains("010100") || right.contains("010200") || right.contains("010300") || right.contains("010400")) {%>

                        <a href="#">
                            <i class="fa"><img class="menu-logo" src="static/image/menu-employeeMan.png"></i>
                            <span class="left-menu">培训计划管理</span>
                            <span class="pull-right-container">
                                    <i class="fa fa-angle-left pull-right"></i>
                              </span>
                        </a>

                        <ul class="treeview-menu">
                            <%if (right.contains("010100")) {%>
                            <li>
                                <a target="right-frame" href="EducationTrain/NoticeListVue"><span
                                        class="left-menu-2">培训信息公告</span></a>
                            </li>
                            <%}%>
                            <%if (right.contains("010100")) {%>
                                <li>
                                    <a target="right-frame" href="EducationTrain/ManageListVue"><span
                                            class="left-menu-2">培训信息管理</span></a>
                                </li>
                            <%}%>
                        </ul>

                    <%}%>
                </li>


                <!--考试信息管理 webapp下相关的文件夹名写一下，权限先不管-->
                <li class="treeview">
                    <%if (right.contains("010100") || right.contains("010200") || right.contains("010300") || right.contains("010400")) {%>

                        <a href="#">
                            <i class="fa"><img class="menu-logo" src="static/image/menu-employeeMan.png"></i>
                            <span class="left-menu">考试信息管理</span>
                            <span class="pull-right-container">
                                        <i class="fa fa-angle-left pull-right"></i>
                                  </span>
                        </a>

                        <ul class="treeview-menu">
                            <%if (right.contains("010100")) {%>
                                <li>
                                    <a target="right-frame" href="TestInfo/NoticeListVue"><span
                                            class="left-menu-2">考试信息公告</span></a>
                                </li>
                            <%}%>
                            <%if (right.contains("010100")) {%>
                            <li>
                                <a target="right-frame" href="TestInfo/ManageListVue"><span
                                        class="left-menu-2">考试信息管理</span></a>
                            </li>
                            <%}%>

                        </ul>

                    <%}%>
                </li>


                <!--自动组卷 AutoGenerateTestPaper-->
                <li class="treeview">
                    <%if (right.contains("010100") || right.contains("010200") || right.contains("010300") || right.contains("010400")) {%>

                        <a href="#">
                            <i class="fa"><img class="menu-logo" src="static/image/menu-employeeMan.png"></i>
                            <span class="left-menu">自动组卷</span>
                            <span class="pull-right-container">
                                <i class="fa fa-angle-left pull-right"></i>
                          </span>
                        </a>

                        <ul class="treeview-menu">
                            <%if (right.contains("010100")) {%>
                                <li>
                                    <a target="right-frame" href="AutoGenerateTestPaper/AutoGTPList_vue"><span
                                            class="left-menu-2">考试组卷</span></a>
                                </li>
                            <%}%>
                        </ul>

                    <%}%>
                </li>


                <!--考试成绩管理 ExamSourcesManage-->
                <li class="treeview">
                    <%if (right.contains("010100") || right.contains("010200") || right.contains("010300") || right.contains("010400")) {%>

                        <a href="#">
                            <i class="fa"><img class="menu-logo" src="static/image/menu-employeeMan.png"></i>
                            <span class="left-menu">考试成绩管理</span>
                            <span class="pull-right-container">
                                    <i class="fa fa-angle-left pull-right"></i>
                              </span>
                        </a>

                        <ul class="treeview-menu">

                            <%if (right.contains("010100")) {%>
                                <li>
                                    <a target="right-frame" href="ExamSourcesManage/EmployeeMan/EmployeeList_vue"><span
                                            class="left-menu-2">在线阅卷</span></a>
                                </li>
                            <%}%>

                            <%if (right.contains("010100")) {%>
                                <li>
                                    <a target="right-frame" href="ExamSourcesManage/EmployeeMan/EmployeeList_vue"><span
                                            class="left-menu-2">成绩录入</span></a>
                                </li>
                            <%}%>

                            <%if (right.contains("010100")) {%>
                                <li>
                                    <a target="right-frame" href="ExamSourcesManage/dataStatistics/List_vue"><span
                                            class="left-menu-2">统计分析</span></a>
                                </li>
                            <%}%>

                        </ul>

                    <%}%>
                </li>


                <!-- 考试题库管理 ExamQuestionManage-->
                <li class="treeview">
                    <%if (right.contains("010100") || right.contains("010200") || right.contains("010300") || right.contains("010400")) {%>

                        <a href="#">
                            <i class="fa"><img class="menu-logo" src="static/image/menu-employeeMan.png"></i>
                            <span class="left-menu">考试题库管理</span>
                            <span class="pull-right-container">
                                <i class="fa fa-angle-left pull-right"></i>
                          </span>
                        </a>

                        <ul class="treeview-menu">
                            <%if (right.contains("010100")) {%>
                                <li>
                                    <a target="right-frame" href="ExamQuestionManage/Single/TCList_vue"><span
                                            class="left-menu-2">单选题</span></a>
                                </li>
                            <%}%>

                            <%if (right.contains("010100")) {%>
                                <li>
                                    <a target="right-frame" href="ExamQuestionManage/Multi/List_vue"><span
                                            class="left-menu-2">多选题</span></a>
                                </li>
                            <%}%>

                            <%if (right.contains("010100")) {%>
                                <li>
                                    <a target="right-frame" href="ExamQuestionManage/Judge/List_vue"><span
                                            class="left-menu-2">判断题</span></a>
                                </li>
                            <%}%>

                            <%if (right.contains("010100")) {%>
                                <li>
                                    <a target="right-frame" href="ExamQuestionManage/Single/EmployeeList_vue"><span
                                            class="left-menu-2">填空题</span></a>
                                </li>
                            <%}%>

                            <%if (right.contains("010100")) {%>
                                <li>
                                    <a target="right-frame" href="ExamQuestionManage/Single/EmployeeList_vue"><span
                                            class="left-menu-2">问答题</span></a>
                                </li>
                            <%}%>

                        </ul>

                    <%}%>
                </li>


                <!--在线教育资源 webapp下相关的文件夹名写一下，权限先不管-->
                <li class="treeview">
                    <%if (right.contains("010100") || right.contains("010200") || right.contains("010300") || right.contains("010400")) {%>

                        <a href="#">
                            <i class="fa"><img class="menu-logo" src="static/image/menu-employeeMan.png"></i>
                            <span class="left-menu">在线教育资源</span>
                            <span class="pull-right-container">
                                        <i class="fa fa-angle-left pull-right"></i>
                                  </span>
                        </a>

                        <ul class="treeview-menu">
                            <%if (right.contains("010100")) {%>
                            <li>
                                <a target="right-frame" href="OnlineResourceEdu/ListVue"><span
                                        class="left-menu-2">各类资源</span></a>
                            </li>
                            <%}%>
                        </ul>

                    <%}%>
                </li>


                <!--考试成绩预警 webapp下相关的文件夹名写一下，权限先不管-->
                <li class="treeview">
                    <%if (right.contains("010100") || right.contains("010200") || right.contains("010300") || right.contains("010400")) {%>

                        <a href="#">
                            <i class="fa"><img class="menu-logo" src="static/image/menu-employeeMan.png"></i>
                            <span class="left-menu">考试成绩信息</span>
                            <span class="pull-right-container">
                                            <i class="fa fa-angle-left pull-right"></i>
                                      </span>
                        </a>

                        <ul class="treeview-menu">
                            <%if (right.contains("010100")) {%>
                                <li>
                                    <a target="right-frame" href=""><span
                                            class="left-menu-2">各类成绩预警</span></a>
                                </li>
                            <%}%>
                            <%if (right.contains("010100")) {%>
                            <li>
                                <a target="right-frame" href="TestGradeInfo/ManageListVue"><span
                                        class="left-menu-2">考试成绩管理</span></a>
                            </li>
                            <%}%>
                        </ul>

                    <%}%>
                </li>


                <%--系统维护与管理 SystemMaintenance--%>
                <li class="treeview">
                    <%if (right.contains("080100") || right.contains("080200") || right.contains("080300") || right.contains("080400") || right.contains("080500") || right.contains("080600") || right.contains("080700")|| right.contains("080800")|| right.contains("080900")) {%>
                    <a href="#">
                        <i class="fa"><img class="menu-logo" src="static/image/menu-systemMan.png"></i>
                        <span class="left-menu">系统维护与管理</span>
                        <span class="pull-right-container">
                            <i class="fa fa-angle-left pull-right"></i>
                      </span>
                    </a>
                    <ul class="treeview-menu">

                            <%if (right.contains("080100")) {%>
                        <li><a target="right-frame"
                               href="SystemMaintenance/institutionManager/InstitutionList_vue"><span
                                    class="left-menu-2">机构管理</span></a></li>
                            <%}%>


                            <%if (right.contains("080200")) {%>
                        <li><a target="right-frame"
                               href="SystemMaintenance/RoleManager/RoleList_vue"><span
                                    class="left-menu-2">角色管理</span></a></li>
                            <%}%>


                            <%if (right.contains("080300")) {%>
                        <li><a target="right-frame"
                               href="SystemMaintenance/UserManage/UserList_vue"><span
                                    class="left-menu-2">用户管理</span></a></li>
                            <%}%>


                        <%if (right.contains("080400")) {%>
                            <li><a target="right-frame"
                               href="SystemMaintenance/DataDictionary/DirectoryCategory"><span
                                    class="left-menu-2">数据字典</span></a></li>
                        <%}%>

                        <%if (right.contains("080400")) {%>
                        <li><a target="right-frame"
                               href="SystemMaintenance/EduSourceManage/EduSList_vue"><span
                                class="left-menu-2">培训资源类型</span></a></li>
                        <%}%>

                        <%if (right.contains("080400")) {%>
                        <li><a target="right-frame"
                               href="SystemMaintenance/RackUpPoints/RackUpPList_vue"><span
                                class="left-menu-2">积分方法</span></a></li>
                        <%}%>

                            <%if (right.contains("080700")) {%>
                        <li><a target="right-frame"
                               href="SystemMaintenance/ParameterManager/List"><span class="left-menu-2">参数管理</span></a></li>
                            <%}%>


                            <%if (right.contains("080800")) {%>
                        <li><a target="right-frame"
                               href="SystemMaintenance/DataBaseBackup/page"><span class="left-menu-2">数据库维护</span></a></li>
                            <%}%>

                    </ul>
                    <%}%>
                </li>


            </ul>
        </section>
        <!-- /.sidebar -->
    </aside>

    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper" style="height:100%">
        <iframe name="right-frame" id="right-frame" src="indexPage.jsp"
                style="width:100%;height:100%;box-sizing: border-box;overflow: scroll;border-width: 1px;border-top-color: #e4e2e3;"></iframe>
    </div>
    <div class="control-sidebar-bg"></div>

    <div class="pop-dialog">
        <%--修改密码——信息加载（含签名照）--%>
        <div class="ChangePasswordAndSign-dialog">
            <el-dialog title="用户信息" :modal="true" :visible.sync="DialogVisible1" width="45em"
                       :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
                <el-form :inline="true" :model="ruleForm" ref="ruleForm" :rules="rules" v-loading="dialogLoading">
                    <el-row>

                        <el-col :span="12">
                            <el-form-item label="用户编号：" prop="EmployeeID">
                                <el-input v-model="ruleForm.EmployeeID" readonly="true" disabled="true"></el-input>
                            </el-form-item>
                            <el-form-item label="用户姓名：" prop="EmployeeName">
                                <el-input v-model="ruleForm.EmployeeName" readonly="true" disabled="true"></el-input>
                            </el-form-item>
                            <el-form-item label="所属机构：" prop="UserInstitutionName">
                                <el-input v-model="ruleForm.UserInstitutionName" readonly="true"
                                          disabled="true"></el-input>
                            </el-form-item>
                            <el-form-item label="所属角色：" prop="RoleName">
                                <el-input type="textarea" autosize v-model="ruleForm.RoleName" readonly="true"
                                          disabled="true"></el-input>
                            </el-form-item>
                            <el-form-item label="旧密码：" prop="Password">
                                <%--<el-input  v-model="ruleForm.Password" show-password></el-input>--%>
                                <el-input type="password" placeholder="请输入旧密码" v-model="ruleForm.Password"
                                          show-password @change="passwordChange"></el-input>
                            </el-form-item>
                            <el-form-item label="新密码：" prop="pass">
                                <el-input type="password" placeholder="请输入新密码" v-model="ruleForm.pass" show-password
                                          @change="passChange"></el-input>
                            </el-form-item>
                            <el-form-item label="确认密码：" prop="checkPass">
                                <el-input type="password" placeholder="请确认新密码" v-model="ruleForm.checkPass"
                                          show-password
                                          @change="checkPassChange"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-row type="flex" justify="center">
                                <el-upload
                                        class="avatar-uploader"
                                        drag
                                        action="/kuangshanJava/SystemMaintenance/UserManage/uploadPhoto"

                                        :show-file-list="false"
                                        :on-success="handleAvatarSuccess"
                                        :before-upload="beforeAvatarUpload"
                                        style="margin-bottom: 1.5em">
                                    <img v-if="ruleForm.imageUrl" :src="ruleForm.imageUrl" class="avatar">
                                    <div class="el-upload__text" style="margin-top: 5em"><em>点击上传签名照片</em></div>
                                </el-upload>
                            </el-row>
                        </el-col>
                    </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer">

                    <el-button id="btn-add" type="primary" @click="submitAdd">保存
                    </el-button>
                    <el-button :disabled="disabled_clear" type="primary" @click="removePhoto">删除签名照</el-button>
                    <el-button @click="_close" type="danger">关 闭
                    </el-button>
                </div>

            </el-dialog>
        </div>

        <%--修改密码——信息加载（不含签名照）--%>
        <div class="ChangePassword-dialog">
            <el-dialog title="用户信息" :modal="true" :visible.sync="DialogVisible2" width="45em"
                       :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
                <el-form :inline="true" :model="ruleForm2" ref="ruleForm2" :rules="rules2" v-loading="dialogLoading">
                    <el-row>

                        <el-col :span="24">
                            <el-form-item label="用户编号：" prop="EmployeeID">
                                <el-input v-model="ruleForm2.EmployeeID" readonly="true" disabled="true"></el-input>
                            </el-form-item>
                            <el-form-item label="用户姓名：" prop="EmployeeName">
                                <el-input v-model="ruleForm2.EmployeeName" readonly="true" disabled="true"></el-input>
                            </el-form-item>
                            <el-form-item label="所属机构：" prop="UserInstitutionName">
                                <el-input v-model="ruleForm2.UserInstitutionName" readonly="true"
                                          disabled="true"></el-input>
                            </el-form-item>
                            <el-form-item label="所属角色：" prop="RoleName">
                                <el-input type="textarea" autosize v-model="ruleForm2.RoleName" readonly="true"
                                          disabled="true"></el-input>
                            </el-form-item>
                            <el-form-item label="旧密码：" prop="Password">
                                <%--<el-input  v-model="ruleForm.Password" show-password></el-input>--%>
                                <el-input type="password" placeholder="请输入旧密码" v-model="ruleForm2.Password"
                                          show-password @change="passwordChange2"></el-input>
                            </el-form-item>
                            <el-form-item label="新密码：" prop="pass">
                                <el-input type="password" placeholder="请输入新密码" v-model="ruleForm2.pass" show-password
                                          @change="passChange2"></el-input>
                            </el-form-item>
                            <el-form-item label="确认密码：" prop="checkPass">
                                <el-input type="password" placeholder="请确认新密码" v-model="ruleForm2.checkPass"
                                          show-password
                                          @change="checkPassChange2"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer">

                    <el-button id="btn-add" type="primary" @click="submitAdd2">保存
                    </el-button>
                    <el-button @click="_close2" type="danger">关 闭
                    </el-button>
                </div>

            </el-dialog>
        </div>

    </div>
</div>
<!-- ./wrapper -->

<!-- jQuery 3 -->
<%--<script type="text/javascript" src="static/js/jquery-3.3.1.min.js"></script>--%>

<%--<script>--%>
<%--$.widget.bridge('uibutton', $.ui.button);--%>
<%--</script>--%>
<!-- Bootstrap 3.3.7 -->

<script type="text/javascript" src="static/bootstrap/js/bootstrap.min.js"></script>
<script type="text/javascript" src="static/main/js/adminlte.min.js"></script>
<!-- AdminLTE dashboard demo (This is only for demo purposes) -->
<!--<script src="dist/js/pages/dashboard.js"></script>-->
<!-- AdminLTE for demo purposes -->
<script type="text/javascript" src="static/main/js/demo.js"></script>
<script>
    $(function () {
        const Selector = {
            wrapper: '.wrapper',
            contentWrapper: '.content-wrapper',
            layoutBoxed: '.layout-boxed',
            mainFooter: '.main-footer',
            mainHeader: '.main-header',
            sidebar: '.sidebar',
            controlSidebar: '.control-sidebar',
            fixed: '.fixed',
            sidebarMenu: '.sidebar-menu',
            logo: '.main-header .logo'
        };
        $('#right-frame').css('height', $(window).height() - $(Selector.mainHeader).outerHeight());
        $('ul.treeview-menu>li>a').click(function () {
            $('ul.treeview-menu>li.active').removeClass('active');
            $(this).closest('li').addClass('active');
        });
        $('section.sidebar').css('height', $('aside.main-sidebar').height())

    })
</script>


</body>
</html>

