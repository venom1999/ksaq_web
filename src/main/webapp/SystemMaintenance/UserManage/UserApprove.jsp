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
    <script type="text/javascript" src="scripts/UserApproveEvents.js?<%=Math.random()%>"></script>
    <style>
        .list-table table td,.list-table table th{
            border: 1px solid #e6e6e6;
            /*border-color: black;*/
        }
    </style>
</head>
<body class="body_tcc">
<div id="right">
    <el-container>
        <el-header height="48px">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>用户授权</el-breadcrumb-item>
            </el-breadcrumb>
        </el-header>

        <div class="wrapper">
            <div class="content" v-loading="tableLoading" v-cloak>
                <div class="section">
                    <div class="list-filter">
                        <el-row>
                            <el-col :span="8">
                                <el-col class="filter-label" :span="7">
                                    用户姓名：
                                </el-col>
                                <el-col :span="16">
                                    <el-input v-model="txtusername" readonly="true"></el-input>
                                </el-col>
                            </el-col>
                            <el-col :span="8">
                                <el-col class="filter-label" :span="7">
                                    用户状态：
                                </el-col>
                                <el-col :span="16">
                                    <el-input v-model="txtuserstate" readonly="true"></el-input>
                                </el-col>
                            </el-col>
                            <el-col :span="8">
                                <el-col class="filter-label" :span="7">
                                    所属角色：
                                </el-col>
                                <el-col :span="16">
                                    <el-input v-model="txtrole" readonly="true"></el-input>
                                </el-col>
                            </el-col>
                        </el-row>
                    </div>
                </div>

                <div class="section">
                    <div class="list-table">
                        <table width="100%" border="0" cellspacing="0" cellpadding="0" class="list_title table table-bordered table-striped table-hover wukx2">
                            <tr>
                                <th style="text-align: center" width="25%">一级菜单</th>
                                <th style="text-align: center" width="25%">二级菜单</th>
                                <th style="text-align: center" width="25%">是否查看</th>
                                <th style="text-align: center" width="25%">是否增删改
                                    <el-checkbox  :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                                </th>
                            </tr>

                            <tr v-for="(record,index) in allmodulelist" align="center">
                                <td style="vertical-align: middle;" v-if="record.Count>0" :rowspan="record.Count" :title="record.firstmodulename">{{record.firstmodulename}}</td>
                                <td style="vertical-align: middle;" :title="record.secondmodulename">{{record.secondmodulename}}</td>
                                <td style="vertical-align: middle;">
                                    <el-checkbox size="medium" :true-label="record.modulenum" disabled="true" v-model="idList[index]" @change="_cbchange(index)"></el-checkbox>
                                </td>
                                <td style="vertical-align: middle;">
                                    <el-checkbox size="medium" :true-label="record.modulenum" :disabled="enabled2[index]" v-model="idList2[index]" @change="_cbochange(record.modulenum,index)"></el-checkbox>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
                <!--按钮-->
                <div>
                    <el-button type="danger" @click="_close" id="btn_close" style="float: right">关闭</el-button>
                    <el-button type="primary" @click="_submitSave" :disabled="disabledSubmit" id="btn_save" style="float: right;margin-right: 1em">保存</el-button>
                </div>
            </div>
        </div>
    </el-container>
</div>

<%--<div class="right">
    <div class="right_tltle">

        <ul class="breadcrumb">
            <li>
                <span class="current">用户授权</span>
            </li>
        </ul>
    </div>
    <div class="right_content" v-loading="pageLoading">
        <el-form :inline="true">
            <el-form-item label="用户姓名：">
                <el-input v-model="txtusername" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="用户状态：">
                <el-input v-model="txtuserstate" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="所属角色：">
                <el-input v-model="txtrole" :disabled="true"></el-input>
            </el-form-item>
        </el-form>

        <table width="100%" border="0" cellspacing="0" cellpadding="0"
               class="list_title table table-bordered table-striped table-hover wukx2" style="text-align:center;">
            <tr>
                <th style="text-align: center" width="25%">一级菜单</th>
                <th style="text-align: center" width="25%">二级菜单</th>
                <th style="text-align: center" width="25%">是否查看</th>
                <th style="text-align: center" width="25%">是否增删改
                    <el-checkbox style="float: right;" :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                </th>
            </tr>

            <tr v-for="(record,index) in allmodulelist" align="center">
                <td style="vertical-align: middle;" v-if="record.Count>0" :rowspan="record.Count" :title="record.firstmodulename">{{record.firstmodulename}}</td>
                <td style="vertical-align: middle;" :title="record.secondmodulename">{{record.secondmodulename}}</td>
                <td style="vertical-align: middle;">
                    <el-checkbox size="medium" :true-label="record.modulenum" :disabled="enabled[index]" v-model="idList[index]" @change="_cbchange(index)"></el-checkbox>
                </td>
                <td style="vertical-align: middle;">
                    <el-checkbox size="medium" :true-label="record.modulenum" :disabled="enabled2[index]" v-model="idList2[index]" @change="_cbochange(record.modulenum,index)"></el-checkbox>
                </td>
            </tr>
        </table>
        <!--按钮-->
        <div class="pop_btnBorder">
            <div class="pop_btn">
                <input type="button" @click="_close" id="btn_close" value="关闭" class="btnright redbtn"/>
                <input type="button" @click="_submitSave" :disabled="disabledSubmit" id="btn_save" value="保存" class="btnright bluebtn"/>
            </div>
        </div>
    </div>
</div>--%>
</body>
</html>
