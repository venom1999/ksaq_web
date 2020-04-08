<%@ page language="java" contentType="text/html;charset=utf-8"
         pageEncoding="utf-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1">
    <title></title><%--
    <script type="text/javascript" src="../../Scripts/jquery-2.2.4.min.js"></script>
    <script type="text/javascript" src="../../Scripts/vue-js/vue.min.js"></script>

    <script type="text/javascript" src="../../Scripts/layer-js/layer.js"></script>

    <script type="text/javascript"
            src="../../Scripts/bootstrap/js/bootstrap.min.js"></script>
    <link rel="stylesheet" type="text/css"
          href="../../Scripts/bootstrap/css/bootstrap.min.css"/>

    <script type="text/javascript"
            src="../../Scripts/bootstrap/js/bootstrap-select.js"></script>
    <link rel="stylesheet" type="text/css"
          href="../../Scripts/bootstrap/css/bootstrap-select.css"/>

    <script type="text/javascript"
            src="../../Scripts/daterangepicker/moment.min.js"></script>
    <script type="text/javascript"
            src="../../Scripts/daterangepicker/daterangepicker.js"></script>
    <link rel="stylesheet" type="text/css"
          href="../../Scripts/daterangepicker/daterangepicker.css"/>

    <link href="../../Styles/apply.css" rel="stylesheet" type="text/css"/>--%>

    <link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/static/element/element-ui.css"/>
    <link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/static/css/module.css"/>
    <script type="text/javascript" src="<%=request.getContextPath()%>/static/js/jquery-3.3.1.min.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath()%>/static/js/vue.min.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath()%>/static/element/element-ui.js"></script>

    <script type="text/javascript" src="<%=request.getContextPath()%>/static/js/moment.js?<%=Math.random()%>"></script>

    <script charset="utf-8" type="text/javascript"
            src="scripts/institutionModuleEvents.js"></script>

    <script type="text/javascript">
        $('.column_width').css('width', $('.list_table').width() / 4);
    </script>
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
                <el-breadcrumb-item><a href="InstitutionList_vue">机构管理</a></el-breadcrumb-item>
                <el-breadcrumb-item>机构模块管理</el-breadcrumb-item>
            </el-breadcrumb>
        </el-header>

        <div class="wrapper">
            <div class="content" v-loading="tableLoading">
                <div class="section">
                    <div class="list-filter">
                        <el-row>
                            <el-col :span="8">

                            </el-col>
                            <el-col :span=8 :offset="8">
                                <el-col class="filter-label" :span="7">
                                    机构名称：
                                </el-col>
                                <el-col :span="16">
                                    <el-select v-model="Institution" filterable placeholder="请选择"
                                               @change="InstitutionChange">
                                        <el-option v-for="item in InstitutionList" :value="item.institutionNum"
                                                   :label="item.institutionName"></el-option>
                                    </el-select>
                                </el-col>
                            </el-col>
                            <el-col :span="8" :offset="8">

                            </el-col>
                        </el-row>
                    </div>
                </div>


                <div class="section">
                    <div class="list-table">
                        <table>
                            <tr>
                                <th class="column_width">一级菜单</th>
                                <th class="column_width">二级菜单</th>
                                <th class="column_width">是否查看
                                    <el-checkbox :indeterminate="isIndeterminate"
                                                 v-model="checkAll" @change="handleCheckAllChange">全选
                                    </el-checkbox>
                                </th>
                                <th class="column_width">是否增删改
                                    <el-checkbox :indeterminate="isIndeterminate2"
                                                 v-model="checkAll2" @change="handleCheckAllChange2">全选
                                    </el-checkbox>
                                </th>
                            </tr>

                            <tr v-for="(record,index) in allmodulelist" align="center">
                                <td v-if="record.Count>0" :rowspan="record.Count"
                                    :title="record.firstmodulename">{{record.firstmodulename}}
                                </td>
                                <td :title="record.secondmodulename">
                                    {{record.secondmodulename}}
                                </td>
                                <td>
                                    <el-checkbox size="medium" :true-label="record.modulenum"
                                                 @change="viewChange(index)"
                                                 v-model="idList[index]"></el-checkbox>
                                </td>
                                <td>
                                    <el-checkbox size="medium" :true-label="record.modulenum" @change="adcChange(index)"
                                                 v-model="idList2[index]"></el-checkbox>
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

                    <el-button @click="submitSave" :disabled="save_disabled"
                               type="primary" style="float: right;margin-right:10px">保 存
                    </el-button>
                </div>
            </div>
        </div>
    </el-container>
</div>
</body>
</html>
