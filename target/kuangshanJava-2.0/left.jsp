<%@ page language="java" contentType="text/html; charset=utf-8"
         pageEncoding="utf-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title></title>

    <link href="Scripts/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css"/>
    <link href="Styles/Styles.css" rel="stylesheet" type="text/css"/>
    <script type="text/javascript" src="Scripts/jquery-1.4.4.min.js"></script>
    <script type="text/javascript" src="Scripts/left.js"></script>

    <!-- 左边菜单JS -->
    <script type="text/javascript" language="javascript" id="clientEventHandlersJS">
        var number = 20;

        function loadPage(page) {
            parent.document.getElementById('bodyframe').src = page;
        }

        $(function () {
            $(".tpl-left-nav-sub-menu a").click(function () {
                $(".tpl-left-nav-sub-menu a").removeClass("visiting");
                $(this).addClass("visiting");

            });

            $(".tpl-left-nav-item").click(function () {
                $(".lefticon").removeClass("menuVisit");
                $(this).find(".lefticon").addClass("menuVisit");

                parent.scrollMenu($(this).offset().top);

            });

        })
    </script>

</head>

<body class="left_bg">
<!-- 左边 start  a: class="link_on"  li:class="shu_hover" -->
<div id="left" style="overflow-x: hidden;">
    <div class="tpl-left-nav tpl-left-nav-hover" id="leftframe">
        <div class="tpl-left-nav-list">

            <ul class="tpl-left-nav-menu">
                <li class="tpl-left-nav-item">
                    <a href="javascript:;" class="nav-link tpl-left-nav-link-list">
                        <span class="lefticon"></span>
                        <span>安全制度与体系管理</span>
                        <span class="glyphicon glyphicon-menu-right tpl-left-nav-more-ico" style="float: right"></span>
                    </a>

                    <ul class="tpl-left-nav-sub-menu">
                        <li>
                            <a href="javascript:loadPage('FileManagement/LawAndRule/List');">
                                <span class="glyphicon glyphicon-menu-right"></span>
                                <span>安全生产法律法规</span>
                            </a>
                        </li>
                        <li>
                            <a href="javascript:loadPage('FileManagement/DualPreventionMechanism/List_vue');">
                            <span class="glyphicon glyphicon-menu-right"></span>
                            <span>双重预防机制文件管理</span>
                            </a>
                        </li>

                    </ul>
                </li>
            </ul>


            <ul class="tpl-left-nav-menu">
                <li class="tpl-left-nav-item">
                    <%--                         <%if (right.Contains("160100") || right.Contains("160200") || right.Contains("160300") || right.Contains("160400") || right.Contains("160500") || right.Contains("160600") || right.Contains("160700")) --%>
                    <%--                             {%> --%>
                    <a href="javascript:;" class="nav-link tpl-left-nav-link-list">
                        <span class="lefticon"></span>
                        <span>安全检查与隐患管理</span>
                        <span class="glyphicon glyphicon-menu-right tpl-left-nav-more-ico" style="float: right"></span>
                    </a>

                    <%--                         <%} %> --%>
                    <ul class="tpl-left-nav-sub-menu">
                        <li>
                            <%--                                 <%if (right.Contains("160100")) --%>
                            <%--                                     {%> --%>
                            <a href="javascript:loadPage('loadZTreeNodes?num=1');">
                                <span class="glyphicon glyphicon-menu-right"></span>
                                <span>检查表数据录入</span>
                            </a>
                            <%--                                 <%} %> --%>
                            <%--                                 <%if (right.Contains("160200")) --%>
                            <%--                                     {%> --%>
                            <a href="javascript:loadPage('loadZTreeNodes?num=2');">
                                <span class="glyphicon glyphicon-menu-right"></span>
                                <span>安全检查结果管理</span>
                            </a>
                            <%--                                 <%} %> --%>
                            <%--                                 <%if (right.Contains("160300")) --%>
                            <%--                                     {%> --%>
                            <!-- <a href="javascript:loadPage('lawAndRule/lawAndRule4.aspx?rdom='+Math.random());">
                                <span class="glyphicon glyphicon-menu-right"></span>
                                <span>安全检查隐患分析</span>
                            </a> -->
                            <a href="javascript:loadPage('SafetyManagement/statistics/hidden_category_statistics.jsp?rdom='+Math.random());">
                                <span class="glyphicon glyphicon-menu-right"></span>
                                <span>安全检查隐患分析</span>
                            </a>
                            <%--                                 <%} %> --%>
                            <%--                                 <%if (right.Contains("160400")) --%>
                            <%--                                     {%> --%>
                            <a href="javascript:loadPage('getrectifyBefore');">
                                <span class="glyphicon glyphicon-menu-right"></span>
                                <span>安全整改信息处理</span>
                            </a>
                            <%--                                 <%} %> --%>
                            <%--                                 <%if (right.Contains("160500")) --%>
                            <%--                                     {%> --%>
                            <a href="javascript:loadPage('SafetyManagement/statistics/RectificationOfStatisticsByType.jsp?rdom='+Math.random());">
                                <span class="glyphicon glyphicon-menu-right"></span>
                                <span>安全整改信息统计</span>
                            </a>
                            <%--                                 <%} %> --%>
                            <%--                                 <%if (right.Contains("160600")) --%>
                            <%--                                     {%> --%>
                            <a href="javascript:loadPage('lawAndRule/lawAndRule7.aspx?rdom='+Math.random());">
                                <span class="glyphicon glyphicon-menu-right"></span>
                                <span>隐患违章管理</span>
                            </a>
                            <%--                                 <%} %> --%>
                            <%--                                 <%if (right.Contains("160700")) --%>
                            <%--                                     {%> --%>
                            <a href="javascript:loadPage('SafetyCheckCriterionManagement');">
                                <span class="glyphicon glyphicon-menu-right"></span>
                                <span>安全检查标准管理</span>
                            </a>

                            <%--                                 <%} %> --%>
                        </li>
                    </ul>

                </li>
            </ul>

            <ul class="tpl-left-nav-menu">
                <li class="tpl-left-nav-item">
                    <a href="javascript:;"
                       class="nav-link tpl-left-nav-link-list">
                        <span class="lefticon"></span>
                        <span>系统维护与管理</span>
                        <span class="glyphicon glyphicon-menu-right tpl-left-nav-more-ico" style="float: right"></span>
                    </a>

                    <ul class="tpl-left-nav-sub-menu">
                        <li><a
                                href="javascript:loadPage('SystemMaintenance/institutionManager/List');">
                            <span class="glyphicon glyphicon-menu-right"></span>
                            <span>机构管理</span>
                        </a>
                            <a href="javascript:loadPage('SystemMaintenance/ParameterManager/List');">
                                <span class="glyphicon glyphicon-menu-right"></span>
                                <span>参数管理</span>
                            </a>
                            <a href="javascript:loadPage('SystemMaintenance/DataBaseBackup/DataBaseBackup.jsp')">
                                <span class="glyphicon glyphicon-menu-right"></span>
                                <span>数据库维护</span>
                            </a>
                        </li>
                    </ul>
                </li>
            </ul>

            <ul class="tpl-left-nav-menu">
                <li class="tpl-left-nav-item">
                    <a href="javascript:;"
                       class="nav-link tpl-left-nav-link-list">
                        <span class="lefticon"></span>
                        <span>员工安全信息管理</span>
                        <span class="glyphicon glyphicon-menu-right tpl-left-nav-more-ico" style="float: right"></span>
                    </a>

                    <ul class="tpl-left-nav-sub-menu">
                        <li><a
                                href="javascript:loadPage('EmployeeManagement/EmployeeCompanyMan/EmployeeCompanyMan.jsp');">
                            <span class="glyphicon glyphicon-menu-right"></span>
                            <span>公司员工基本信息</span>
                        </a></li>
                    </ul>
                </li>
            </ul>


        </div>
    </div>

</div>
<!-- 左边 END -->

<script src="Scripts/bootstrap/js/jquery-2.1.3.min.js"></script>
<script src="Scripts/bootstrap/js/bootstrap.min.js"></script>
<script src="Scripts/bootstrap/js/content.js"></script>
</body>
</html>
