<%@ page language="java" contentType="text/html; charset=utf-8"
         pageEncoding="utf-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1">
    <title></title>
    <%--
        <script type="text/javascript" src="../../Scripts/jquery-2.2.4.min.js"></script>
        <script type="text/javascript" src="../../Scripts/vue-js/vue.min.js"></script>

        <script type="text/javascript" src="../../Scripts/layer-js/layer.js"></script>

        <script type="text/javascript"
                src="../../Scripts/bootstrap/js/bootstrap.min.js"></script>
        <link rel="stylesheet" type="text/css"
              href="../../Scripts/bootstrap/css/bootstrap.min.css"/>
        <link href="../../Styles/apply.css" rel="stylesheet" type="text/css"/>
        <script type="text/javascript" src="<%=request.getContextPath()%>/static/element/element-ui.js"></script>
        <script type="text/javascript" src="<%=request.getContextPath()%>/static/js/moment.js"></script>
        <link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/static/element/element-ui.css"/>
        <link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/static/css/right.css"/>


    --%>

    <link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/static/element/element-ui.css"/>
    <link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/static/css/module.css"/>
    <script type="text/javascript" src="<%=request.getContextPath()%>/static/js/jquery-3.3.1.min.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath()%>/static/js/vue.min.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath()%>/static/element/element-ui.js"></script>

    <script type="text/javascript" src="<%=request.getContextPath()%>/static/js/moment.js"></script>

    <script type="text/javascript" src="scripts/RoleEditEvents.js?<%=Math.random()%>"></script>
    <style>
        .list-table table td,.list-table table th{
            border: 1px solid #e6e6e6;
            /*border-color: black;*/
        }
    </style>
</head>
<body class="body_tcc">
<div class="right">
    <el-container>
        <el-header height="48px">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>编辑角色信息</el-breadcrumb-item>
            </el-breadcrumb>
        </el-header>

        <div class="wrapper">
            <div class="content" v-loading="pageLoading">
                <div class="section">
                    <div class="list-filter">
                        <el-row>
                            <el-col :span="6">
                                <el-col class="filter-label" :span="7">
                                    机构名称：
                                </el-col>
                                <el-col :span="16">
                                    <el-input v-model="InsName" :disabled="true"></el-input>
                                </el-col>
                            </el-col>
                            <el-col :span="6">
                                <el-col class="filter-label" :span="7">
                                    角色类型：
                                </el-col>
                                <el-col :span="16">
                                    <el-select v-model="typeselected" filterable placeholder="请选择"
                                               :disabled="typeEnabled">
                                        <el-option v-for="item in roletypelist" :value="item.value"
                                                   :label="item.value"></el-option>
                                    </el-select>
                                </el-col>
                            </el-col>
                            <el-col :span="6">
                                <el-col class="filter-label" :span="7">
                                    角色名称：
                                </el-col>
                                <el-col :span="16">
                                    <el-input type="textarea" autosize v-model="txtrolename" ></el-input>
                                </el-col>
                            </el-col>
                            <el-col :span="6">
                                <el-col class="filter-label" :span="7">
                                    备注：
                                </el-col>
                                <el-col :span="16">
                                    <el-input type="textarea" autosize v-model="txtrolememo" ></el-input>
                                </el-col>
                            </el-col>
                        </el-row>
                    </div>
                </div>


                <div class="section">
                    <div class="list-table">
                        <table>
                            <tr>
                                <th style="text-align: center" width="25%">一级菜单</th>
                                <th style="text-align: center" width="25%">二级菜单</th>
                                <th style="text-align: center" width="25%">是否查看
                                    <el-checkbox :indeterminate="isIndeterminate"
                                                 v-model="checkAll" @change="handleCheckAllChange">全选
                                    </el-checkbox>
                                </th>
                            </tr>

                            <tr v-for="(record,index) in allmodulelist" align="center">
                                <td style="vertical-align: middle;" v-if="record.Count>0" :rowspan="record.Count"
                                    :title="record.firstmodulename">{{record.firstmodulename}}
                                </td>
                                <td style="vertical-align: middle;" :title="record.secondmodulename">
                                    {{record.secondmodulename}}
                                </td>
                                <td style="vertical-align: middle;">
                                    <el-checkbox size="medium" :true-label="record.modulenum"
                                                 v-model="idList[index]"></el-checkbox>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
                <!--按钮-->
                <div>
                    <el-button @click="_close"
                               type="danger" style="float: right">关 闭
                    </el-button>

                    <el-button @click="submitsave"
                               type="primary" style="float: right;margin-right:10px">保 存
                    </el-button>
                </div>
            </div>
        </div>
    </el-container>
</div>
</body>
</html>
