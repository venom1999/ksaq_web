<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" isELIgnored="false" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta name="viewport"
          content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>010100</title>
    <script type="text/javascript">
        if (window.ActiveXObject || "ActiveXObject" in window) {
            var polyfill = document.createElement("script");
            polyfill.setAttribute("src", "<%=request.getContextPath()%>/static/js/polyfill.min.js");
            polyfill.setAttribute("type", "text/javascript");
            document.head.appendChild(polyfill);
        }
    </script>
    <link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/static/element/element-ui.css"/>
    <link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/static/css/module.css"/>
    <script type="text/javascript" src="<%=request.getContextPath()%>/static/js/jquery-3.3.1.min.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath()%>/static/js/vue.min.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath()%>/static/element/element-ui.js"></script>

    <script type="text/javascript" src="<%=request.getContextPath()%>/static/js/moment.js"></script>
    <!--加密-->
    <script type="text/javascript" src="<%=request.getContextPath()%>/static/js/core.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath()%>/static/js/enc-base64.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath()%>/static/js/cipher-core.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath()%>/static/js/aes.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath()%>/static/js/mode-ecb.js"></script>

    <script type="text/javascript" src="<%=request.getContextPath()%>/static/js/systemFile.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath()%>/Scripts/videojs/video.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath()%>/Scripts/magnify/js/jquery.magnify.js"></script>
    <link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/Scripts/videojs/video-js.css"/>
    <script type="text/javascript" src="scripts/EmployeeCompanyManEvents.js?<%=Math.random()%>"></script>
    <style>
        .el-dialog__body .el-textarea__inner {

            width: 42em;
            /*width: 542.44px;*/
        }
        .shorten .el-textarea__inner{
            width:15em;
        }
        .el-tabs__nav-wrap::after{
            background:none;
        }
        .el-tabs--top{
            margin-top:-29px;
        }
        #tab-1::before, #tab-2::before{
            content:"/";
            color:#ccc;
            position:relative;;
            left:-20px;
        }
        .el-tabs__header{
            background:#f5f5f5;
            width:790px;
            left:-18px;
            height:45px;
        }
        .el-tabs__nav{
            margin-left: 20px;
        }
        .shorten .el-textarea__inner{
            width:15em;
        }
    </style>

</head>
<body>
<div id="app">
    <el-container>
        <el-header height="48px">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>公司员工基本信息</el-breadcrumb-item>
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
                                    <el-input v-model="params[0].value" clearable placeholder="请输入员工姓名"></el-input>
                                </el-col>
                            </el-col>
                            <el-col :span="7">
                                <el-col class="filter-label" :span="6">
                                    {{params[1].label}}
                                </el-col>
                                <el-col :span="16">
                                    <el-select v-model="params[1].value" filterable clearable placeholder="请选择">
                                        <el-option v-for="item in InstitutionList" :value="item.institutionNum"
                                                   :label="item.institutionName"></el-option>
                                    </el-select>
                                </el-col>
                            </el-col>
                            <el-col :span="7">
                                <el-col class="filter-label" :span="6">
                                    {{params[2].label}}
                                </el-col>
                                <el-col :span="16">
                                    <el-select v-model="params[2].value" filterable clearable placeholder="请选择">
                                        <el-option value="0" label="否"></el-option>
                                        <el-option value="1" label="是"></el-option>
                                    </el-select>
                                </el-col>
                            </el-col>
                            <el-col :span="2">
                                <el-button @click="filter" type="primary" style="float: right">查 询</el-button>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="7">
                                <el-col class="filter-label" :span="6">
                                    {{params[3].label}}
                                </el-col>
                                <el-col :span="16">
                                    <el-select v-model="params[3].value" filterable clearable placeholder="请选择">
                                        <el-option v-for="item in WorkStyle" :value="item.DDItemID"
                                                   :label="item.DDItemValue"></el-option>
                                    </el-select>
                                </el-col>
                            </el-col>
                            <el-col :span="7">
                                <el-col class="filter-label" :span="6">
                                    {{params[4].label}}
                                </el-col>
                                <el-col :span="16">
                                    <el-select v-model="params[4].value" filterable clearable placeholder="请选择">
                                        <el-option v-for="item in WorkPosition" :value="item.DDItemID"
                                                   :label="item.DDItemValue"></el-option>
                                    </el-select>
                                </el-col>
                            </el-col>
                            <el-col :span="7">
                                <el-col class="filter-label" :span="6">
                                    {{params[5].label}}
                                </el-col>
                                <el-col :span="16">
                                    <el-select v-model="params[5].value" filterable clearable placeholder="请选择">
                                        <el-option value="0" label="否"></el-option>
                                        <el-option value="1" label="是"></el-option>
                                    </el-select>
                                </el-col>
                            </el-col>
                        </el-row>
                    </div>
                </div>
                <div class="section">
                    <div class="list-operation">
                        <el-button class="operation-editable" type="primary" @click="showAddDialog" id="btn_add">添加</el-button>
                        <el-button type="primary" @click="_export()" id="btn_export">导出</el-button>

                    </div>
                </div>
                <div class="section">
                    <div class="list-table">
                        <table>
                            <tr>
                                <th width="7%">
                                    <div>
                                        <span>员工编号</span>
                                    </div>
                                </th>
                                <th width="7%">
                                    <div>
                                        <span>员工姓名</span>
                                    </div>
                                </th>
                                <th width="19%">
                                    <div>
                                        <span>所属机构</span>
                                    </div>
                                </th>
                                <th width="8%">
                                    <div>
                                        <span>在岗状态</span>
                                    </div>
                                </th>
                                <th width="19%">
                                    <div>
                                        <span>当前岗位</span>
                                    </div>
                                </th>
                                <th width="14%">
                                    <div>
                                        <span>联系方式</span>
                                    </div>
                                </th>
                                <th width="6%">
                                    <div>
                                        <span>是否离职</span>
                                    </div>
                                </th>
                                <th width="15%">
                                    <div>
                                        <span>操作</span>
                                    </div>
                                </th>
                            </tr>
                            <tr v-for="(record,index) in employeeList" :id="record.employeeID" align="center">
                                <%--<td>
                                    <el-checkbox size="medium" :true-label="record.EmployeeNum"
                                                 v-model="id_list[index]"></el-checkbox>
                                </td>--%>
                                <td :title="record.employeeID">{{record.employeeID}}</td>
                                <td :title="record.employeeName">{{record.employeeName}}</td>
                                <td :title="record.institutionName">{{record.institutionName}}</td>
                                <td >{{record.onState == '1'?'在岗':'离岗'}}</td>
                                <td :title="record.workPositionValue">{{record.workPositionValue}}</td>
                                <td :title="record.employeeTel">{{record.employeeTel == ''?'':record.employeeTel}}</td>
                                <td >{{record.outCompanyOrNot == '1'?'是':'否'}}</td>
                                <td>
                                    <el-button type="text" @click="getInfoForDetail(record.employeeNum)">详细</el-button>
                                    <el-button class="operation-editable" type="text" @click="getInfoForEdit(record.employeeNum)">修改</el-button>
                                    <%--<el-button type="text" @click="getInfoForCertificate(record.employeeNum)">证书</el-button>--%>
                                    <%--<el-dropdown trigger="hover">
                                    <span class="el-dropdown-link">
                                       更多<i class="el-icon-arrow-down el-icon--right"></i>
                                   </span>
                                        <el-dropdown-menu slot="dropdown">
                                            <el-dropdown-item @click.native="getInfoForDetail(record.EmployeeNum)">授权</el-dropdown-item>
                                            <el-dropdown-item @click.native="getCertificate(record.EmployeeNum,record.EmployeeName)">证书</el-dropdown-item>
                                        </el-dropdown-menu>
                                    </el-dropdown>--%>

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
                        <el-dialog title="添加公司员工信息" :visible.sync="addDialogVisible" :modal="true" width="50em"
                                   :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
                            <el-form label-position="right"  v-loading="dialogLoading" :model="record"
                                     ref="record" :rules="rules">
                                <el-row>
                                    <el-col :span="12">
                                        <el-form-item label="员工编号：" prop="employeeID">
                                            <el-input v-model="record.employeeID" clearable
                                                      @change="employeeNumChange"></el-input>
                                        </el-form-item>
                                        <el-form-item label="员工姓名：" prop="employeeName">
                                            <el-input v-model="record.employeeName" clearable></el-input>
                                        </el-form-item>
                                        <el-form-item label="员工性别：" prop="employeeSex">
                                            <el-select v-model="record.employeeSex" filterable placeholder="请选择">
                                                <el-option value="男" label="男"></el-option>
                                                <el-option value="女" label="女"></el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item label="身份证号：" prop="employeeIDNum">
                                            <el-input v-model="record.employeeIDNum" clearable
                                                      @change="employeeIDNumChange"></el-input>
                                        </el-form-item>
                                        <el-form-item label="出生日期：" prop="employeeBirth">
                                            <el-date-picker v-model="record.employeeBirth" clearable></el-date-picker>
                                        </el-form-item>
                                        <el-form-item label="员工电话：" prop="employeeTel">
                                            <el-input v-model="record.employeeTel" clearable></el-input>
                                        </el-form-item>
                                        <el-form-item label="机构名称：" prop="institutionNum">
                                            <el-select v-model="record.institutionNum" filterable placeholder="请选择">
                                                <el-option v-for="item in InstitutionList" :value="item.institutionNum"
                                                           :label="item.institutionName"></el-option>
                                            </el-select>
                                        </el-form-item>

                                        <el-form-item label="是否离职：" prop="outCompanyOrNot">
                                            <el-select v-model="record.outCompanyOrNot" filterable placeholder="请选择"
                                                       disabled="true">
                                                <el-option value="0" label="否"></el-option>
                                                <el-option value="1" label="是"></el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item label="是否退休：" prop="isRetire">
                                            <el-select v-model="record.isRetire" filterable placeholder="请选择"
                                                       disabled="true">
                                                <el-option value="0" label="否"></el-option>
                                                <el-option value="1" label="是"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <%--<el-row type="flex" justify="center">--%>
                                        <el-form-item label="员工照片：">
                                            <el-upload
                                                    ref="my-upload"
                                                    class="avatar-uploader"
                                                    drag
                                                    action="uploadPhoto"
                                                    :show-file-list="false"
                                                    :on-success="handleAvatarSuccess"
                                                    :before-upload="beforeAvatarUpload">
                                                <img v-if="record.imageUrl" :src="record.imageUrl" class="avatar">
                                                <%--<i class="el-icon-plus avatar-uploader-icon"></i>--%>
                                                <div class="el-upload__text" style="margin-top: 5em"><em>点击上传员工照片</em>
                                                </div>
                                                <%--<div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>--%>
                                            </el-upload>
                                        </el-form-item>

                                        <%--</el-row>--%>
                                        <el-form-item label="在岗状态：" prop="onState">
                                            <el-select v-model="record.onState" filterable placeholder="请选择">
                                                <el-option value="0" label="离岗"></el-option>
                                                <el-option value="1" label="在岗"></el-option>
                                                <el-option value="2" label="待岗"></el-option>
                                            </el-select>
                                        </el-form-item>

                                        <el-form-item label="当前岗位：" prop="workPositionNum">
                                            <el-select v-model="record.workPositionNum" filterable placeholder="请选择">
                                                <el-option v-for="item in WorkPosition" :value="item.DDItemID"
                                                           :label="item.DDItemValue"></el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item label="进公司日期：" prop="joinCompanyDate">
                                            <el-date-picker v-model="record.joinCompanyDate" clearable
                                                            @change="joinCompanyDateChange"></el-date-picker>
                                        </el-form-item>
                                        <el-form-item label="用工形式：" prop="workStyleNum">
                                            <el-select v-model="record.workStyleNum" filterable placeholder="请选择">
                                                <el-option v-for="item in WorkStyle" :value="item.DDItemID"
                                                           :label="item.DDItemValue"></el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item label="离职时间：" prop="outCompanyDate">
                                            <el-date-picker v-model="record.outCompanyDate" clearable
                                                            disabled="true"></el-date-picker>
                                        </el-form-item>
                                        <el-form-item label="退休时间：" prop="retireTime">
                                            <el-date-picker v-model="record.retireTime" clearable
                                                            disabled="true"></el-date-picker>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <e-col :span="24">
                                        <el-form-item label="家庭住址：" prop="homeAddress">
                                            <el-input type="textarea" v-model="record.homeAddress"></el-input>
                                        </el-form-item>
                                    </e-col>
                                </el-row>
                            </el-form>
                            <div slot="footer" class="dialog-footer">

                                <el-button id="btn-add"  type="primary" @click="submitAdd();resetForm('record');getList(pageindex,conditions);">添 加
                                </el-button>
                                <el-button :disabled="disabled_clear" type="primary" @click="removePhoto('add')">清除照片</el-button>
                                <el-button @click="resetForm('record')">重 置</el-button>
                                <el-button @click="addDialogVisible=false;closeForm('record')"
                                           type="danger">关 闭
                                </el-button>
                            </div>
                        </el-dialog>
                    </div>

                    <%--修改界面--%>
                    <div class="edit-dialog">
                        <el-dialog title="修改公司员工信息" v-loading="editLoading" :visible.sync="editDialogVisible"
                                   :modal="true" width="50em"
                                   :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
                            <el-form v-loading="dialogLoading" label-position="right" :model="record" ref="ruleForm" :rules="rules">
                                <el-row>
                                    <el-col :span="12">
                                        <el-form-item label="员工编号：" prop="employeeID">
                                            <el-input v-model="record.employeeID" clearable
                                                      @change="employeeNumChange"></el-input>
                                        </el-form-item>
                                        <el-form-item label="员工姓名：" prop="employeeName">
                                            <el-input v-model="record.employeeName" clearable></el-input>
                                        </el-form-item>
                                        <el-form-item label="员工性别：" prop="employeeSex">
                                            <el-select v-model="record.employeeSex" filterable placeholder="请选择">
                                                <el-option value="男" label="男"></el-option>
                                                <el-option value="女" label="女"></el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item label="身份证号：" prop="employeeIDNum">
                                            <el-input v-model="record.employeeIDNum" clearable
                                                      @change="employeeIDNumChange"></el-input>
                                        </el-form-item>
                                        <el-form-item label="出生日期：" prop="employeeBirth">
                                            <el-date-picker v-model="record.employeeBirth" clearable></el-date-picker>
                                        </el-form-item>
                                        <el-form-item label="员工电话：" prop="employeeTel">
                                            <el-input v-model="record.employeeTel" clearable></el-input>
                                        </el-form-item>
                                        <el-form-item label="机构名称：" prop="institutionNum">
                                            <el-select v-model="record.institutionNum" filterable placeholder="请选择"
                                                       @change="InstitutionNumChange">
                                                <el-option v-for="item in InstitutionList" :value="item.institutionNum"
                                                           :label="item.institutionName"></el-option>
                                            </el-select>
                                        </el-form-item>

                                        <el-form-item label="是否离职：" prop="outCompanyOrNot">
                                            <el-select v-model="record.outCompanyOrNot" filterable placeholder="请选择"
                                                       :disabled="OutCompanyOrNotDisabled"
                                                       @change="outCompanyOrNotChange">
                                                <el-option value="0" label="否"></el-option>
                                                <el-option value="1" label="是"></el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item label="是否退休：" prop="isRetire">
                                            <el-select v-model="record.isRetire" filterable placeholder="请选择"
                                                       :disabled="IsRetireDisabled"
                                                       @change="IsRetireChange">
                                                <el-option value="0" label="否"></el-option>
                                                <el-option value="1" label="是"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item label="员工照片：">
                                            <el-upload
                                                    ref="my-upload"
                                                    class="avatar-uploader"
                                                    drag
                                                    action="uploadPhoto"
                                                    :show-file-list="false"
                                                    :on-success="handleAvatarSuccess"
                                                    :before-upload="beforeAvatarUpload">
                                                <img v-if="record.imageUrl" :src="record.imageUrl" class="avatar">
                                                <%--<i class="el-icon-plus avatar-uploader-icon"></i>--%>
                                                <div class="el-upload__text" style="margin-top: 5em"><em>点击上传员工照片</em>
                                                </div>
                                                <%--<div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>--%>
                                            </el-upload>
                                        </el-form-item>
                                        <el-form-item label="在岗状态：" prop="onState">
                                            <el-select v-model="record.onState" filterable placeholder="请选择"
                                                       :disabled="OnStateDisabled">
                                                <el-option value="0" label="离岗"></el-option>
                                                <el-option value="1" label="在岗"></el-option>
                                                <el-option value="2" label="待岗"></el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item label="当前岗位：" prop="workPositionNum">
                                            <el-select v-model="record.workPositionNum" filterable placeholder="请选择"
                                                       @change="workPositionNumChange">
                                                <el-option v-for="item in WorkPosition" :value="item.DDItemID"
                                                           :label="item.DDItemValue"></el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item label="进公司日期：" prop="joinCompanyDate">
                                            <el-date-picker v-model="record.joinCompanyDate" clearable></el-date-picker>
                                        </el-form-item>
                                        <el-form-item label="用工形式：" prop="workStyleNum">
                                            <el-select v-model="record.workStyleNum" filterable placeholder="请选择">
                                                <el-option v-for="item in WorkStyle" :value="item.DDItemID"
                                                           :label="item.DDItemValue"></el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item label="离职时间：" prop="outCompanyDate">
                                            <el-date-picker v-model="record.outCompanyDate" clearable
                                                            :disabled="outCompanyDateDisabled"></el-date-picker>
                                        </el-form-item>
                                        <el-form-item label="退休时间：" prop="retireTime">
                                            <el-date-picker v-model="record.retireTime" clearable
                                                            :disabled="RetireTimeDisabled"></el-date-picker>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <e-col :span="24">
                                        <el-form-item label="家庭住址：" prop="homeAddress">
                                            <el-input type="textarea" v-model="record.homeAddress"
                                                      ></el-input>
                                        </el-form-item>
                                    </e-col>
                                </el-row>
                            </el-form>
                            <div slot="footer" class="dialog-footer">

                                <el-button id="btn-add" type="primary" @click="submitSave();getList(pageindex,conditions)">保存
                                </el-button>
                                <el-button :disabled="disabled_clear" type="primary" @click="removePhoto('edit');getList(pageindex,conditions)">清除照片</el-button>
                                <el-button @click="editDialogVisible=false;resetForm('ruleForm');getList(pageindex,conditions)"
                                           type="danger">关 闭
                                </el-button>
                            </div>
                        </el-dialog>
                    </div>

                    <%--详细界面--%>
                    <div class="detail-dialog">
                        <el-dialog title="公司员工详细信息" v-loading="detailLoading" :visible.sync="detailDialogVisible"
                                   :modal="true" width="50em"
                                   :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
                            <el-form v-loading="dialogLoading" label-position="right" :model="record" ref="record">
                                <el-row>
                                    <el-col :span="12">
                                        <el-form-item label="员工编号：" prop="EmployeeID">
                                            <el-input v-model="detailForm.EmployeeID" clearable disabled="true"></el-input>
                                        </el-form-item>
                                        <el-form-item label="员工姓名：" prop="EmployeeName">
                                            <el-input v-model="detailForm.EmployeeName" clearable
                                                      disabled="true"></el-input>
                                        </el-form-item>
                                        <el-form-item label="员工性别：" prop="EmployeeSex">
                                            <el-select v-model="detailForm.EmployeeSex" filterable placeholder="请选择"
                                                       disabled="true">
                                                <el-option value="男" label="男"></el-option>
                                                <el-option value="女" label="女"></el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item label="身份证号：" prop="EmployeeIDNum">
                                            <el-input v-model="detailForm.EmployeeIDNum" clearable
                                                      @change="employeeIDNumChange" disabled="true"></el-input>
                                        </el-form-item>
                                        <el-form-item label="出生日期：" prop="EmployeeBirth">
                                            <el-date-picker v-model="detailForm.EmployeeBirth" clearable
                                                            disabled="true"></el-date-picker>
                                        </el-form-item>
                                        <el-form-item label="员工电话：" prop="EmployeeTel">
                                            <el-input v-model="detailForm.EmployeeTel" clearable disabled="true"></el-input>
                                        </el-form-item>
                                        <el-form-item label="机构名称：" prop="InstitutionNum">
                                            <el-select v-model="detailForm.InstitutionNum" filterable placeholder="请选择"
                                                       @change="InstitutionNumChange" disabled="true">
                                                <el-option v-for="item in InstitutionList" :value="item.institutionNum"
                                                           :label="item.institutionName"></el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item label="是否离职：" prop="OutCompanyOrNot">
                                            <el-select v-model="detailForm.OutCompanyOrNot" filterable placeholder="请选择"
                                                       @change="outCompanyOrNotChange" disabled="true">
                                                <el-option value="0" label="否"></el-option>
                                                <el-option value="1" label="是"></el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item label="是否退休：" prop="IsRetire">
                                            <el-select v-model="detailForm.IsRetire" filterable placeholder="请选择"
                                                       disabled="true">
                                                <el-option value="0" label="否"></el-option>
                                                <el-option value="1" label="是"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item label="员工照片：">
                                            <el-upload
                                                    class="avatar-uploader"
                                                    drag
                                                    action="uploadPhoto"
                                                    :show-file-list="false"
                                                    :on-success="handleAvatarSuccess"
                                                    :before-upload="beforeAvatarUpload"

                                                    disabled="true">
                                                <img v-if="detailForm.imageUrl" :src="detailForm.imageUrl" class="avatar">
                                                <%--<i class="el-icon-plus avatar-uploader-icon"></i>--%>
                                               <%-- <div class="el-upload__text" style="margin-top: 5em"><em>点击上传员工照片</em>
                                                </div>--%>
                                                <%--<div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>--%>
                                            </el-upload>
                                        </el-form-item>
                                        <el-form-item label="在岗状态：" prop="OnState">
                                            <el-select v-model="detailForm.OnState" filterable placeholder="请选择"
                                                       disabled="true">
                                                <el-option value="0" label="离岗"></el-option>
                                                <el-option value="1" label="在岗"></el-option>
                                                <el-option value="2" label="待岗"></el-option>
                                            </el-select>
                                        </el-form-item>

                                        <el-form-item label="当前岗位：" prop="WorkPositionNum">
                                            <el-select v-model="detailForm.WorkPositionNum" filterable placeholder="请选择"
                                                       @change="workPositionNumChange" disabled="true">
                                                <el-option v-for="item in WorkPosition" :value="item.DDItemID"
                                                           :label="item.DDItemValue"></el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item label="进公司日期：" prop="JoinCompanyDate">
                                            <el-date-picker v-model="detailForm.JoinCompanyDate" clearable
                                                            disabled="true"></el-date-picker>
                                        </el-form-item>
                                        <el-form-item label="用工形式：" prop="WorkStyleNum">
                                            <el-select v-model="detailForm.WorkStyleNum" filterable placeholder="请选择"
                                                       disabled="true">
                                                <el-option v-for="item in WorkStyle" :value="item.DDItemID"
                                                           :label="item.DDItemValue"></el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item label="离职时间：" prop="OutCompanyDate">
                                            <el-date-picker v-model="detailForm.OutCompanyDate" clearable
                                                            disabled="true"></el-date-picker>
                                        </el-form-item>
                                        <el-form-item label="退休时间：" prop="RetireTime">
                                            <el-date-picker v-model="detailForm.RetireTime" clearable
                                                            disabled="true"></el-date-picker>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <e-col :span="24">
                                        <el-form-item label="家庭住址：" prop="HomeAddress">
                                            <el-input type="textarea" v-model="detailForm.HomeAddress"
                                                       disabled="true"></el-input>
                                        </el-form-item>
                                    </e-col>
                                </el-row>
                            </el-form>
                            <div slot="footer" class="dialog-footer">
                                <el-button @click="getDetail(listindex-1)" :disabled="listindex==0" type="primary"
                                        class="btn btn-primary btn-left" style="margin-right: 10px;float: left">
                                    上一条
                                </el-button>
                                <el-button @click="getDetail(listindex+1)" :disabled="listindex+1==listsize" type="primary"
                                        class="btn btn-primary btn-left" style="margin-right: 10px;float: left">
                                    下一条
                                </el-button>
                                <el-button @click="detailDialogVisible=false;resetForm('detailForm')" type="danger">关
                                    闭
                                </el-button>
                            </div>
                        </el-dialog>
                    </div>
                    <%--证书界面--%>
                    <div class="certificate-dialog">
                        <el-dialog title="公司员工证书信息" v-loading="certificateLoading" :visible.sync="certificateVisible"
                                   :modal="true"
                                   width="50%"
                                   :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
                            <el-tabs v-model="activeName" @tab-click="handleClick">
                                <%--<el-tab-pane
                                        v-for="(item, index) in editableTabs"
                                        :key="item.name"
                                        :label="item.title"
                                        :name="item.name">
                                    {{item.content}}
                                </el-tab-pane>--%>
                                <el-tab-pane label="特种设备作业人员证" name="SpecialEquipEmployee">
                                    <div v-if="SpecialEquipEmployeeFormExist">
                                        <el-form label-position="right" class="" :model="SpecialEquipEmployeeForm" ref="SpecialEquipEmployeeForm">
                                            <el-container>
                                                <fieldset class="dialog-fieldset">
                                                    <legend>基本信息</legend>
                                                    <div>
                                                        <el-form-item label="员工姓名：" prop="EmployeeName" size="small">
                                                            <el-input type="input" v-model="SpecialEquipEmployeeForm.EmployeeName" autocomplete="off" readonly></el-input>
                                                        </el-form-item>
                                                        <el-form-item label="身份证号：" prop="EmployeeIDNum" size="small">
                                                            <el-input type="input" v-model="SpecialEquipEmployeeForm.EmployeeIDNum" clearable autocomplete="off" readonly></el-input>
                                                        </el-form-item>
                                                        <el-form-item label="作业种类：" prop="OpCategoryName" size="small">
                                                            <el-input type="input" v-model="SpecialEquipEmployeeForm.OpCategoryName" clearable autocomplete="off" readonly></el-input>
                                                        </el-form-item>
                                                        <el-form-item label="作业项目：" prop="OpItemName" size="small">
                                                            <el-input type="input" v-model="SpecialEquipEmployeeForm.OpItemName" clearable autocomplete="off" readonly></el-input>
                                                        </el-form-item>
                                                        <el-form-item label="证书编号：" prop="CertificateNum" size="small">
                                                            <el-input type="input" v-model="SpecialEquipEmployeeForm.CertificateNum" clearable autocomplete="off" readonly></el-input>
                                                        </el-form-item>
                                                        <el-form-item label="证书名称：" prop="CertificateName" size="small">
                                                            <el-input type="input" v-model="SpecialEquipEmployeeForm.CertificateName" clearable autocomplete="off" readonly></el-input>
                                                        </el-form-item>
                                                        <el-form-item label="发证机关：" prop="IssueInstitute" size="small">
                                                            <el-input type="input" v-model="SpecialEquipEmployeeForm.IssueInstitute" clearable autocomplete="off" readonly></el-input>
                                                        </el-form-item>
                                                        <el-form-item label="批准日期：" prop="GetTime" size="small">
                                                            <el-date-picker
                                                                    v-model="SpecialEquipEmployeeForm.GetTime"
                                                                    align="right"
                                                                    type="date"
                                                                    placeholder="选择日期"
                                                                    readonly>
                                                            </el-date-picker>
                                                        </el-form-item>
                                                        <el-form-item label="有效期至：" prop="Validity" size="small">
                                                            <el-date-picker
                                                                    v-model="SpecialEquipEmployeeForm.Validity"
                                                                    align="right"
                                                                    type="date"
                                                                    placeholder="选择日期" readonly>
                                                            </el-date-picker>
                                                        </el-form-item>
                                                        <el-form-item  label="是否复审：" prop="review" size="small">
                                                            <el-radio disabled v-model="SpecialEquipEmployeeForm.review" label="1">是</el-radio>
                                                            <el-radio disabled v-model="SpecialEquipEmployeeForm.review" label="0">否</el-radio>
                                                        </el-form-item>
                                                        <el-form-item label="备注：" prop="Memo" size="small">
                                                            <el-input type="textarea" autosize v-model="SpecialEquipEmployeeForm.Memo" clearable autocomplete="off" class="shorten"readonly></el-input>
                                                        </el-form-item>
                                                        <el-form-item label="上传人：" prop="UploadPersonName" size="small">
                                                            <el-input type="input" v-model="SpecialEquipEmployeeForm.UploadPersonName" clearable autocomplete="off" readonly></el-input>
                                                        </el-form-item>
                                                        <el-form-item label="上传时间：" prop="UploadTime" size="small">
                                                            <el-date-picker
                                                                    v-model="SpecialEquipEmployeeForm.UploadTime"
                                                                    align="right"
                                                                    type="date"
                                                                    placeholder="选择日期"
                                                                    readonly>
                                                            </el-date-picker>
                                                        </el-form-item>
                                                    </div>
                                                </fieldset>

                                                <fieldset class="dialog-fieldset">
                                                    <legend>证书文件</legend>
                                                    <div>
                                                        <el-table :data="SpecialEquipEmployeeForm.filetable">
                                                            <el-table-column
                                                                    prop="name"
                                                                    label="文件名称"
                                                                    width="50%">
                                                            </el-table-column>
                                                            <el-table-column
                                                                    label="操作"
                                                                    width="50%">
                                                                <template slot-scope="scope">
                                                                    <el-button @click="_viewFile(SpecialEquipEmployeeForm.SpecialEquiementEmployeeID,scope.row.name,'specialequip')"
                                                                               type="text" size="small">查看
                                                                    </el-button>

                                                                    <el-button @click="_downloadone(SpecialEquipEmployeeForm.SpecialEquiementEmployeeID,scope.row.name,'specialequip')"
                                                                            type="text" size="small">下载
                                                                    </el-button>
                                                                </template>
                                                            </el-table-column>
                                                        </el-table>
                                                    </div>
                                                </fieldset>

                                            </el-container>
                                        </el-form>
                                        <div slot="footer" class="dialog-footer" style="height:60px;">
                                            <el-button type="primary"
                                                       :disabled="SpecialEquipEmployeeForm.listindex===0"
                                                       @click="SpecialEquipEmployeeForm.listindex--;SpecialEquipDetail(SpecialEquipEmployeeForm.listindex)"
                                                       style="margin-right: 10px;float: left;margin-top:15px;">
                                                上一条
                                            </el-button>
                                            <el-button type="primary" :disabled="SpecialEquipEmployeeForm.listindex===SpecialEquipEmployeeForm.listsize-1"
                                                       @click="SpecialEquipEmployeeForm.listindex++;SpecialEquipDetail(SpecialEquipEmployeeForm.listindex)"
                                                       style="margin-right: 10px;float: left;margin-top:15px;">
                                                下一条
                                            </el-button>
                                            <el-button
                                                    @click="certificateVisible=false;closeForm('SpecialEquipEmployeeForm')"
                                                    type="danger" style="margin-top:15px;margin-left:500px;">关闭
                                            </el-button>
                                        </div>
                                    </div>
                                    <div style="height:540px" v-else>
                                        <p style="color:red">提示：暂无证书信息数据</p>
                                        <div slot="footer" class="dialog-footer">
                                            <el-button
                                                    @click="certificateVisible=false;closeForm('SpecialEquipEmployeeForm')"
                                                    type="danger" style="margin-left: 670px;margin-top:450px;">关闭
                                            </el-button>
                                        </div>
                                    </div>
                                </el-tab-pane>
                                <el-tab-pane label="特种作业操作证" name="SpecialEmployee">
                                    <div v-if="SpecialManFormExist">
                                        <el-form label-position="right" class="" :model="SpecialManForm" ref="SpecialManForm">
                                            <el-container>
                                                <fieldset class="dialog-fieldset">
                                                    <legend>基本信息</legend>
                                                    <div>
                                                        <el-form-item label="员工姓名：" prop="EmployeeName" size="small">
                                                            <el-input type="input" v-model="SpecialManForm.EmployeeName" autocomplete="off" readonly></el-input>
                                                        </el-form-item>
                                                        <el-form-item label="身份证号：" prop="EmployeeIDNum" size="small">
                                                            <el-input type="input" v-model="SpecialManForm.EmployeeIDNum" clearable autocomplete="off" readonly></el-input>
                                                        </el-form-item>
                                                        <el-form-item label="作业类别：" prop="OpCategoryName" size="small">
                                                            <el-input type="input" v-model="SpecialManForm.OpCategoryName" clearable autocomplete="off" readonly></el-input>
                                                        </el-form-item>
                                                        <el-form-item label="准操项目：" prop="OpItemName" size="small">
                                                            <el-input type="input" v-model="SpecialManForm.OpItemName" clearable autocomplete="off" readonly></el-input>
                                                        </el-form-item>
                                                        <el-form-item label="证书编号：" prop="CertificateNum" size="small">
                                                            <el-input type="input" v-model="SpecialManForm.CertificateNum" clearable autocomplete="off" readonly></el-input>
                                                        </el-form-item>
                                                        <el-form-item label="证书名称：" prop="CertificateName" size="small">
                                                            <el-input type="input" v-model="SpecialManForm.CertificateName" clearable autocomplete="off" readonly></el-input>
                                                        </el-form-item>
                                                        <el-form-item label="发证机关：" prop="IssueInstitute" size="small">
                                                            <el-input type="input" v-model="SpecialManForm.IssueInstitute" clearable autocomplete="off" readonly></el-input>
                                                        </el-form-item>
                                                        <el-form-item label="初领日期：" prop="GetTime" size="small">
                                                            <el-date-picker
                                                                    v-model="SpecialManForm.GetTime"
                                                                    align="right"
                                                                    type="date"
                                                                    placeholder="选择日期"
                                                                    readonly>
                                                            </el-date-picker>
                                                        </el-form-item>
                                                        <el-form-item label="复审日期：" prop="ReexamineTime" size="small">
                                                            <el-date-picker
                                                                    v-model="SpecialManForm.ReexamineTime"
                                                                    align="right"
                                                                    type="date"
                                                                    placeholder="选择日期" readonly>
                                                            </el-date-picker>
                                                        </el-form-item>
                                                        <el-form-item label="有效期至：" prop="Validity" size="small">
                                                            <el-date-picker
                                                                    v-model="SpecialManForm.Validity"
                                                                    align="right"
                                                                    type="date"
                                                                    placeholder="选择日期" readonly>
                                                            </el-date-picker>
                                                        </el-form-item>
                                                        <el-form-item  label="是否复审：" prop="review" size="small">
                                                            <el-radio disabled v-model="SpecialManForm.review" label="1">是</el-radio>
                                                            <el-radio disabled v-model="SpecialManForm.review" label="0">否</el-radio>
                                                        </el-form-item>
                                                        <el-form-item label="备注：" prop="Memo" size="small">
                                                            <el-input type="textarea" autosize v-model="SpecialManForm.Memo" clearable autocomplete="off" class="shorten" readonly></el-input>
                                                        </el-form-item>
                                                        <el-form-item label="上传人：" prop="UploadPersonName" size="small">
                                                            <el-input type="input" v-model="SpecialManForm.UploadPersonName" clearable autocomplete="off" readonly></el-input>
                                                        </el-form-item>
                                                        <el-form-item label="上传时间：" prop="UploadTime" size="small">
                                                            <el-date-picker
                                                                    v-model="SpecialManForm.UploadTime"
                                                                    align="right"
                                                                    type="date"
                                                                    placeholder="选择日期"
                                                                    readonly>
                                                            </el-date-picker>
                                                        </el-form-item>
                                                    </div>
                                                </fieldset>

                                                <fieldset class="dialog-fieldset">
                                                    <legend>证书文件</legend>
                                                    <div>
                                                        <el-table :data="SpecialManForm.filetable">
                                                            <el-table-column
                                                                    prop="name"
                                                                    label="文件名称"
                                                                    width="50%">
                                                            </el-table-column>
                                                            <el-table-column
                                                                    label="操作"
                                                                    width="50%">
                                                                <template slot-scope="scope">
                                                                    <el-button @click="_viewFile(SpecialManForm.SpecialID,scope.row.name,'special')"
                                                                            type="text" size="small">查看
                                                                    </el-button>

                                                                    <el-button @click="_downloadone(SpecialManForm.SpecialID,scope.row.name,'special')"
                                                                            type="text" size="small">下载
                                                                    </el-button>
                                                                </template>
                                                            </el-table-column>
                                                        </el-table>
                                                    </div>
                                                </fieldset>

                                            </el-container>
                                        </el-form>
                                        <div slot="footer" class="dialog-footer" style="height:60px;">
                                            <el-button type="primary"
                                                       :disabled="SpecialManForm.listindex===0"
                                                       @click="SpecialManForm.listindex--;SpecialDetail(SpecialManForm.listindex)"
                                                       style="margin-right: 10px;float: left;margin-top:15px;">
                                                上一条
                                            </el-button>
                                            <el-button type="primary" :disabled="SpecialManForm.listindex===SpecialManForm.listsize-1"
                                                       @click="SpecialManForm.listindex++;SpecialDetail(SpecialManForm.listindex)"
                                                       style="margin-right: 10px;float: left;margin-top:15px;">
                                                下一条
                                            </el-button>
                                            <el-button
                                                    @click="certificateVisible=false;closeForm('SpecialManForm')"
                                                    type="danger" style="margin-top:15px;margin-left:500px;">关闭
                                            </el-button>
                                        </div>
                                    </div>
                                    <div style="height:540px" v-else>
                                        <p style="color:red">提示：暂无证书信息数据</p>
                                        <div slot="footer" class="dialog-footer">
                                            <el-button
                                                    @click="certificateVisible=false;closeForm('SpecialManForm')"
                                                    type="danger" style="margin-left: 670px;margin-top:450px;">关闭
                                            </el-button>
                                        </div>
                                    </div>
                                </el-tab-pane>
                                <el-tab-pane label="安全管理资格证" name="SecurityMan">
                                    <div v-if="SecurityManFormExist">
                                        <el-form label-position="right" class="" :model="SecurityManForm" ref="SecurityManForm">
                                            <el-container>
                                                <fieldset class="dialog-fieldset">
                                                    <legend>基本信息</legend>
                                                    <div>
                                                        <el-form-item label="员工姓名：" prop="EmployeeName" size="small">
                                                            <el-input type="input" v-model="SecurityManForm.EmployeeName" autocomplete="off" readonly></el-input>
                                                        </el-form-item>
                                                        <el-form-item label="身份证号：" prop="employeeIDNum" size="small">
                                                            <el-input type="input" v-model="SecurityManForm.EmployeeIDNum" autocomplete="off" readonly></el-input>
                                                        </el-form-item>
                                                        <el-form-item label="证书编号：" prop="CertificateNum" size="small">
                                                            <el-input type="input" v-model="SecurityManForm.CertificateNum" autocomplete="off" readonly></el-input>
                                                        </el-form-item>
                                                        <el-form-item label="证书名称：" prop="CertificateName" size="small">
                                                            <el-input type="input" v-model="SecurityManForm.CertificateName" autocomplete="off" readonly></el-input>
                                                        </el-form-item>
                                                        <el-form-item label="发证机关：" prop="IssueInstitute" size="small">
                                                            <el-input type="input" v-model="SecurityManForm.IssueInstitute" autocomplete="off" readonly></el-input>
                                                        </el-form-item>
                                                        <el-form-item label="初领日期：" prop="IssueDate" size="small">
                                                            <el-date-picker
                                                                    v-model="SecurityManForm.IssueDate"
                                                                    type="date"
                                                                    placeholder="选择日期" readonly>
                                                            </el-date-picker>
                                                        </el-form-item>
                                                        <el-form-item label="换证日期：" prop="FirstDate" size="small">
                                                            <el-date-picker
                                                                    v-model="SecurityManForm.FirstDate"
                                                                    align="right"
                                                                    type="date"
                                                                    placeholder="选择日期" readonly>
                                                            </el-date-picker>
                                                        </el-form-item>
                                                        <el-form-item label="有效期至：" prop="Validity" size="small">
                                                            <el-date-picker
                                                                    v-model="SecurityManForm.Validity"
                                                                    align="right"
                                                                    type="date"
                                                                    placeholder="选择日期" readonly>
                                                            </el-date-picker>
                                                        </el-form-item>
                                                        <el-form-item label="上传人：" prop="UploadPersonName" size="small">
                                                            <el-input type="input" v-model="SecurityManForm.UploadPersonName" clearable autocomplete="off" readonly></el-input>
                                                        </el-form-item>
                                                        <el-form-item label="上传时间：" prop="UploadTime" size="small">
                                                            <el-date-picker
                                                                    v-model="SecurityManForm.UploadTime"
                                                                    align="right"
                                                                    type="date"
                                                                    placeholder="选择日期"
                                                                    readonly>
                                                            </el-date-picker>
                                                        </el-form-item>
                                                    </div>
                                                </fieldset>

                                                <fieldset class="dialog-fieldset">
                                                    <legend>证书文件</legend>
                                                    <div>
                                                        <el-table :data="SecurityManForm.filetable">
                                                            <el-table-column
                                                                    prop="name"
                                                                    label="文件名称"
                                                                    width="50%">
                                                            </el-table-column>
                                                            <el-table-column
                                                                    label="操作"
                                                                    width="50%">
                                                                <template slot-scope="scope">
                                                                    <el-button @click="_viewFile(SecurityManForm.id,scope.row.name,'security')"
                                                                            type="text" size="small">查看
                                                                    </el-button>

                                                                    <el-button @click="_downloadone(SecurityManForm.id,scope.row.name,'security')"
                                                                            type="text" size="small">下载
                                                                    </el-button>
                                                                </template>
                                                            </el-table-column>
                                                        </el-table>
                                                    </div>
                                                </fieldset>

                                            </el-container>
                                        </el-form>
                                        <div slot="footer" class="dialog-footer" style="height:60px;">
                                            <el-button type="primary"
                                                       :disabled="SecurityManForm.listindex===0"
                                                       @click="SecurityManForm.listindex--;SecurityDetail(SecurityManForm.listindex)"
                                                       style="margin-right: 10px;float: left;margin-top:15px;">
                                                上一条
                                            </el-button>
                                            <el-button type="primary" :disabled="SecurityManForm.listindex===SecurityManForm.listsize-1"
                                                       @click="SecurityManForm.listindex++;SecurityDetail(SecurityManForm.listindex)"
                                                       style="margin-right: 10px;float: left;margin-top:15px;">
                                                下一条
                                            </el-button>
                                            <el-button
                                                    @click="certificateVisible=false;closeForm('SecurityManForm')"
                                                    type="danger" style="margin-top:15px;margin-left:500px;">关闭
                                            </el-button>
                                        </div>
                                    </div>
                                    <div style="height:540px" v-else>
                                        <p style="color:red">提示：暂无证书信息数据</p>
                                        <div slot="footer" class="dialog-footer">
                                            <el-button
                                                    @click="certificateVisible=false;closeForm('SecurityManForm')"
                                                    type="danger" style="margin-left: 670px;margin-top:450px;">关闭
                                            </el-button>
                                        </div>
                                    </div>
                                </el-tab-pane>

                            </el-tabs>

                        </el-dialog>
                    </div>
                </div>
                <div class="view-dialog0 viewbady">
                    <el-dialog title="公司员工证书信息" top="2.5vh" :visible.sync="viewDialogVisible0" :modal="false"
                               width="100%"
                               :close-on-click-modal="true" :close-on-press-escape="true" :show-close="true"
                               :fullscreen="true">
                        <div style="height: 100%">
                            <iframe id="pdfRead" :src="filePath" width="100%" height="100%">
                            </iframe>

                        </div>

                    </el-dialog>
                </div>
                <div class="view-dialog1 viewbady">
                    <el-dialog id="videodia" title="title" top="2.5vh" :visible.sync="viewDialogVisible1"
                               :modal="false" width="100%"
                               :close-on-click-modal="true" :close-on-press-escape="true" :show-close="true"
                               :fullscreen="true" @close="closevideoDialog">

                        <div id="mydiv" style="height: 100%;height: 100%">
                            <video id="videoex" class="video-js vjs-default-skin" controls preload="none" width="100%"
                                   height="100%">
                                <source :src="filePath">
                            </video>
                        </div>

                    </el-dialog>
                </div>
                <div class="audio-dialog audiobady">
                    <el-dialog id="picview" :visible.sync="audioDialogVisible"
                               :modal="false" width="20%" height="20%"
                               :modal-append-to-body="true"
                               :center="true"
                               :close-on-click-modal="false" :close-on-press-escape="false" :show-close="true"
                               @close="closevideoDialog1">
                        <audio id="audio" controls>
                            <source :src="filePath" :type="filetype">

                        </audio>

                    </el-dialog>
                </div>
                <div class="picview-dialog viewbady">
                    <el-dialog id="picview" title="公司员工证书信息" top="2.5vh" :visible.sync="picviewDialogVisible"
                               :modal="false" width="100%"
                               :close-on-click-modal="true" :close-on-press-escape="true" :show-close="true"
                               :fullscreen="true">
                        <div id="mydiv" style="height: 100%;height: 100%">
                            <img :src="filePath" style="margin-left: auto;
    margin-right:auto;
    display:block;" height="100%"/>
                        </div>
                    </el-dialog>
                </div>
            </div>

        </div>


    </el-container>
</div>
</body>


</html>

