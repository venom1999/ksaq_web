<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1">
    <meta name="viewport"
          content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <%--<title>080800</title>--%>

    <link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/static/element/element-ui.css"/>
    <link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/static/css/module.css"/>
    <script type="text/javascript" src="<%=request.getContextPath()%>/static/js/jquery-3.3.1.min.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath()%>/static/js/vue.min.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath()%>/static/element/element-ui.js"></script>

    <script type="text/javascript" src="<%=request.getContextPath()%>/static/response.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath()%>/static/js/moment.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath()%>/static/js/echarts.min.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath()%>/static/js/ecStat.min.js"></script>

    <script type="text/javascript" src="./js/rateStatistics.js?<%=Math.random()%>"></script>
    <style type="text/css">
    </style>


</head>
<body class="right_wap">
<div id="right">
    <el-container>
        <el-header height="48px">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><a href="List_vue">个人成绩统计</a></el-breadcrumb-item>
                <el-breadcrumb-item><a href="score_vue">考核成绩统计</a></el-breadcrumb-item>
                <el-breadcrumb-item>部门分数统计</el-breadcrumb-item>
            </el-breadcrumb>
        </el-header>

        <div class="wrapper">
            <div class="content" v-loading="tableLoading">
                <div class="section">
                    <%--权限查询--%>
                    <div class="list-filter">
                        <el-row style="margin-bottom: 15px">
                            <%--查询考试名称--%>
                            <el-col :span="7">
                                <el-col class="filter-label" :span="7">
                                    {{params[0].label}}
                                </el-col>
                                <el-col :span="16">
                                    <el-select v-model="params[0].value" filterable clearable placeholder="请选择">
                                        <el-option v-for="record in testList"
                                                   :value="record.test_id"
                                                   :label="record.test_id + '-' + record.test_name">
                                        </el-option>
                                    </el-select>
                                </el-col>
                            </el-col>

                            <el-col :span="2">
                                <el-button @click="filter" type="primary" style="float: right">查 询</el-button>
                            </el-col>

                        </el-row>

                    </div>
                </div>

                <div id="rate_histogram" style="width: 800px; height: 600px;margin:0 auto; padding-top: 40px;">
                </div>
            </div>

        </div>
    </el-container>
</div>
</body>
</html>
