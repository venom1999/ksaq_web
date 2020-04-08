<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" isELIgnored="false" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta name="viewport"
          content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>080100</title>
   <%-- <script type="text/javascript" src="../../Scripts/jquery-2.2.4.min.js"></script>
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
    <script type="text/javascript" src="scripts/InstitutionManageEvents.js?<%=Math.random()%>"></script>

</head>
<body>
<div id="right">
    <el-container >
        <el-header height="48px">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>机构管理</el-breadcrumb-item>
                <el-breadcrumb-item><a href="InstitutionModuleManager">机构模块管理</a></el-breadcrumb-item>
            </el-breadcrumb>
        </el-header>
        <div class="wrapper">
            <div class="content" v-loading="tableLoading" v-cloak>
                <div class="section">
                    <div class="list-filter">
                        <el-row style="margin-bottom: 15px">
                            <el-col :span="7">
                                <el-col class="filter-label" :span="6">
                                    {{params[0].label}}
                                </el-col>
                                <el-col :span="16">
                                    <el-select v-model="params[0].value" filterable clearable placeholder="请选择">
                                        <el-option v-for="item in InstitutionList" :value="item.institutionNum"
                                                   :label="item.institutionName"></el-option>
                                    </el-select>
                                </el-col>
                            </el-col>
                            <el-col :span="7">
                                <el-col class="filter-label" :span="6">
                                    {{params[1].label}}
                                </el-col>
                                <el-col :span="16">
                                    <el-select v-model="params[1].value" filterable clearable placeholder="请选择">
                                        <el-option v-for="item in InstitutionCategoryList" :value="item.DDItemID"
                                                   :label="item.DDItemValue"></el-option>
                                    </el-select>
                                </el-col>
                            </el-col>
                            <el-col :span="7">
                                <el-col class="filter-label" :span="6">
                                    {{params[2].label}}
                                </el-col>
                                <el-col :span="16">
                                    <el-select v-model="params[2].value" filterable clearable placeholder="请选择">
                                        <el-option value="否" label="否"></el-option>
                                        <el-option value="是" label="是"></el-option>
                                    </el-select>
                                </el-col>
                            </el-col>
                            <el-col :span="2">
                                <el-button @click="filter" type="primary" style="float: right">查 询</el-button>
                            </el-col>
                        </el-row>

                    </div>
                </div>
                <div class="section">
                    <div class="list-operation">
                        <el-button class="operation-editable" type="primary" @click="getInfoForAdd" id="btn_add">添加</el-button>
                        <el-button class="operation-editable" type="primary" @click="_delete" id="btn_export">删除</el-button>
                    </div>
                </div>
                <div class="section" >
                    <div class="list-table">
                        <table >
                            <tr>
                                <th width="5%">
                                    <div>
                                        <span>#</span>
                                    </div>
                                </th>
                                <th width="6%">
                                    <div>
                                        <span>机构编号</span>
                                    </div>
                                </th>
                                <th class="6%">
                                    <div>
                                        <span>机构缩写</span>
                                    </div>
                                </th>
                                <th width="19%">
                                    <div>
                                        <span>机构名称</span>
                                    </div>
                                </th>
                                <th width="7%">
                                    <div>
                                        <span>负责人</span>
                                    </div>
                                </th>
                                <th width="7%">
                                    <div>
                                        <span>安全员</span>
                                    </div>
                                </th>
                                <th width="7%">
                                    <div>
                                        <span>代表方</span>
                                    </div>
                                </th>
                                <th width="7%">
                                    <div>
                                        <span>机构类型</span>
                                    </div>
                                </th>
                                <th width="14%">
                                    <div>
                                        <span>建立时间</span>
                                    </div>
                                </th>
                                <%--<th class="14%">
                                    <div>
                                        <span>撤销时间</span>
                                    </div>
                                </th>--%>
                                <th width="7%">
                                    <div>
                                        <span>删除否</span>
                                    </div>
                                </th>
                                <th width="7%">
                                    <div>
                                        <span>操作</span>
                                    </div>
                                </th>
                            </tr>
                            <tr v-for="(record,index) in list" :id="record.InstitutionNum" align="center">
                                <td>
                                    <el-checkbox size="medium" :true-label="record.InstitutionNum"
                                                 v-model="id_list[index]"></el-checkbox>
                                </td>
                                <td :title="record.InstitutionNum">{{record.InstitutionNum}}</td>
                                <td :title="record.InstitutionAbbr">{{record.InstitutionAbbr}}</td>
                                <td :title="record.InstitutionName">{{record.InstitutionName}}</td>
                                <td :title="record.PeopleInCharge">{{record.PeopleInCharge}}</td>
                                <td :title="record.SecurityOfficer">{{record.SecurityOfficer}}</td>
                                <td >{{record.Category}}</td>
                                <td >{{record.InstitutionCategory}}</td>
                                <td >{{record.EstablishTime=='1970-01-01 00:00:00'?'':record.EstablishTime}}
                                </td>
                                <%--<td >{{record.DeleteTime =='1970-01-01 00:00:00'?'':record.DeleteTime}}</td>--%>
                                <td >{{record.IsDelete}}</td>
                                <td>
                                    <el-button class="operation-editable" type="text" @click="_edit(record.InstitutionNum)">修改</el-button>

                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div class="section">
                    <div class="list-pagination">
                        <el-pagination
                                v-if="pagenum>0"
                                background
                                page-size="10"
                                layout="prev, pager, next"
                                @current-change="getList"
                                :current-page="pageindex"
                                :total="pagenum*10">
                        </el-pagination>
                        <div class="list-hint" v-else>提示：列表中无数据</div>
                    </div>
                </div>

                <div class="pop-dialog">
                    <%--添加界面--%>
                    <div class="add-dialog">
                        <el-dialog title="添加机构信息" :visible.sync="addDialogVisible" :modal="true"
                                   :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false"
                                   width="50em">
                            <el-form label-position="right"  v-loading="dialogLoading" :model="record" ref="ruleForm" :rules="rules">
                                <el-row>
                                    <el-col :span="12">
                                        <el-form-item label="机构编号：" prop="InstitutionNum">
                                            <el-input type="text" v-model="record.InstitutionNum"
                                                      @change="institutionNumChange"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item label="机构缩写：" prop="InstitutionAbbr">
                                            <el-input type="text" v-model="record.InstitutionAbbr"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="12">
                                        <el-form-item label="机构名称：" prop="InstitutionName">
                                            <el-input type="text" v-model="record.InstitutionName"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item label="代表方：" prop="category">
                                            <el-select v-model="record.category" filterable placeholder="请选择"
                                                       @change="categoryChange">
                                                <el-option value="1" label="公司"></el-option>
                                                <el-option value="2" label="协力单位"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>

                                </el-row>
                                <el-row>
                                    <el-col :span="12">
                                        <el-form-item label="机构类别：" prop="institutionCategory">
                                            <el-select v-model="record.institutionCategory" filterable placeholder="请选择"
                                                       @change="institutionCategoryChange">
                                                <el-option v-for="item in InstitutionCategoryList" :value="item.DDItemID"
                                                           :label="item.DDItemValue"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item label="所属机构：" prop="InstitutionPrefix">
                                            <el-select v-model="record.InstitutionPrefix" filterable placeholder="请选择"
                                                       :disabled="InstitutionPrefix_disabled">
                                                <el-option v-for="item in InstitutionPrefixList"
                                                           :value="item.institutionnum"
                                                           :label="item.institutionname"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>

                                </el-row>
                                <el-row>
                                    <el-col :span="12">
                                        <el-form-item label="负责人：" prop="peopleInCharge">
                                            <el-select v-model="record.peopleInCharge" filterable placeholder="请选择">
                                                <el-option v-for="item in PeopleInChargeList" :value="item.EmployeeNum"
                                                           :label="item.peopleinfo"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item label="安全员：" prop="SecurityOfficer">
                                            <el-select v-model="record.SecurityOfficer" filterable placeholder="请选择" :disabled="SecurityOfficer_disabled">
                                                <el-option v-for="item in SecurityOfficerList" :value="item.EmployeeID"
                                                           :label="item.peopleinfo"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                            </el-form>
                            <div slot="footer" class="dialog-footer">
                                <el-button id="btn-add" :disabled="disabled_add" type="primary" @click="submitAdd();getList(pageindex,conditions);">添 加
                                </el-button>
                                <el-button @click="reset_add">重 置</el-button>
                                <el-button @click="addDialogVisible=false" type="danger">关
                                    闭
                                </el-button>
                            </div>
                        </el-dialog>
                    </div>

                    <%--修改界面--%>
                    <div class="edit-dialog">
                        <el-dialog title="修改机构信息" v-loading="editLoading" :visible.sync="editDialogVisible" :modal="true"
                                   :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false" width="50em">
                            <el-form label-position="right" v-loading="dialogLoading" :model="record" ref="ruleForm" :rules="rules">
                                <el-row>
                                    <el-col :span="12">
                                        <el-form-item label="机构编号：" prop="InstitutionNum">
                                            <el-input type="text" v-model="record.InstitutionNum"
                                                      :disabled="true"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item label="机构缩写：" prop="InstitutionAbbr">
                                            <el-input type="text" v-model="record.InstitutionAbbr"></el-input>
                                        </el-form-item>
                                    </el-col>

                                </el-row>
                                <el-row>
                                    <el-col :span="12">
                                        <el-form-item label="机构名称：" prop="InstitutionName">
                                            <el-input type="text" v-model="record.InstitutionName"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item label="代表方：" prop="category">
                                            <el-select v-model="record.category" filterable placeholder="请选择"
                                                       @change="categoryChange">
                                                <el-option value="1" label="公司"></el-option>
                                                <el-option value="2" label="协力单位"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>

                                </el-row>
                                <el-row>
                                    <el-col :span="12">
                                        <el-form-item label="机构类别：" prop="institutionCategory">
                                            <el-select v-model="record.institutionCategory" filterable placeholder="请选择"
                                                       @change="institutionCategoryChange">
                                                <el-option v-for="item in InstitutionCategoryList" :value="item.DDItemID"
                                                           :label="item.DDItemValue"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item label="所属机构：" prop="InstitutionPrefix">
                                            <el-select v-model="record.InstitutionPrefix" filterable placeholder="请选择"
                                                       :disabled="InstitutionPrefix_disabled">
                                                <el-option v-for="item in InstitutionPrefixList"
                                                           :value="item.institutionnum"
                                                           :label="item.institutionname"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>

                                </el-row>
                                <el-row>
                                    <el-col :span="12">
                                        <el-form-item label="负责人：" prop="peopleInCharge">
                                            <el-select v-model="record.peopleInCharge" filterable placeholder="请选择">
                                                <el-option v-for="item in PeopleInChargeList" :value="item.EmployeeNum"
                                                           :label="item.peopleinfo"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>

                                    <el-col :span="12">
                                        <el-form-item label="安全员：" prop="SecurityOfficerSecurityOfficer">
                                            <el-select v-model="record.SecurityOfficer" filterable placeholder="请选择" :disabled="SecurityOfficer_disabled">
                                                <el-option v-for="item in SecurityOfficerList" :value="item.EmployeeNum"
                                                           :label="item.peopleinfo"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="12">
                                        <el-form-item label="建立时间：" prop="establishDate">
                                            <el-date-picker v-model="record.establishDate" disabled="true" clearable></el-date-picker>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item label="撤销时间：" prop="deleteDate">
                                            <el-date-picker v-model="record.deleteDate"  disabled="true" clearable ></el-date-picker>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="12">
                                        <el-form-item label="删除否：" prop="isDelete">
                                            <el-select v-model="record.isDelete" filterable placeholder="请选择" :disabled="isDelete_disabled" @change="isDeleteChange">
                                                <el-option value="否" label="否"></el-option>
                                                <el-option value="是" label="是"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                            </el-form>
                            <div slot="footer" class="dialog-footer">
                                <el-button id="btn-add" :disabled="disabled_add" type="primary" @click="submitSave();getList(pageindex,conditions);editDialogVisible=false">保存
                                </el-button>
                                <el-button @click="editDialogVisible=false" type="danger">关
                                    闭
                                </el-button>
                            </div>
                        </el-dialog>
                    </div>
                </div>
            </div>

        </div>


    </el-container>
</div>
</body>
</html>

