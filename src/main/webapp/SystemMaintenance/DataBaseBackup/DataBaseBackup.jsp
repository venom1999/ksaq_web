<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1">
	<meta name="viewport"
		  content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
<title>080800</title>

	<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/static/element/element-ui.css"/>
	<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/static/css/module.css"/>
	<script type="text/javascript" src="<%=request.getContextPath()%>/static/js/jquery-3.3.1.min.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/static/js/vue.min.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/static/element/element-ui.js"></script>

    <script type="text/javascript" src="<%=request.getContextPath()%>/static/response.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/static/js/moment.js"></script>
    <script type="text/javascript" src="./script/DatabaseBackupEvents.js?<%=Math.random()%>"></script>
	<style type="text/css">
		.upload{
			float:right;
			margin-right: 65em;
		}
        .pop-progress .el-dialog__header{
			display:none;
		}
		.el-dialog{
			margin-top: 40vh !important;
			background: none;
		}
		.el-dialog__body{
			padding: 0;
			text-align:center;
		}
		.el-progress{
			margin-top: 5px;
		}
	</style>


</head>
<body class="right_wap">
<div id="right">
	<el-container>
		<el-header height="48px">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>数据库备份与还原</el-breadcrumb-item>
			</el-breadcrumb>
		</el-header>

		<div class="wrapper">
			<div class="content" v-loading="tableLoading">
				<div class="section">
					<label>本系统的数据文件随着系统启动自动备份，如需还原，请根据相关帮助文档进行操作：</label>
				</div>
				<div class="section">
                    <el-button class="operation-editable" type="primary" id="btn_Restore" @click="restoreUploadV">还原上传文件</el-button>
					<el-button class="operation-editable" type="primary" id="btn_ServerRestore" @click="restoreByServerV">还原数据库</el-button>
				</div>

                <%--还原数据库界面--%>
                <div class="add-dialog">
                    <el-dialog title="还原数据库" :visible.sync="restoreDialogVisible" :modal="false"
                               width="26em" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
                        <el-form label-position="right"  :model="restoreFrom"
                                 ref="restoreFrom" :rules="rules">
                            <el-row>
                                <el-col :span="24">
                                    <el-form-item label="数据库还原：" prop="time" size="small">
                                        <el-select v-model="restoreFrom.time" filterable clearable placeholder="请选择">
                                            <el-option v-for="record in timeList"
                                                       :key="record"
                                                       :value="record"
                                                       :label="record">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form>

                        <div slot="footer" class="dialog-footer">
                            <el-button type="primary" @click="_restoreByServer">还原</el-button>
                            <el-button type="danger" @click="restoreDialogVisible=false">取消</el-button>
                        </div>
                    </el-dialog>
                </div>

                <%--还原上传文件界面--%>
                <div class="add-dialog">
                    <el-dialog title="还原上传文件" :visible.sync="resUploadDialogVisible" :modal="false"
                               width="26em" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
                        <el-form label-position="right"  :model="resUploadFrom"
                                 ref="resUploadFrom" :rules="rules">
                            <el-row>
                                <el-col :span="24">
                                    <el-form-item label="还原时间：" prop="resUpTime" size="small">
                                        <el-select v-model="resUploadFrom.resUpTime" filterable clearable placeholder="请选择">
                                            <el-option v-for="record in resUpTimeList"
                                                       :key="record.value"
                                                       :value="record.value"
                                                       :label="record.label">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form>

                        <div slot="footer" class="dialog-footer">
                            <el-button type="primary" @click="_restoreUpload">还原</el-button>
                            <el-button type="danger" @click="resUploadDialogVisible=false">取消</el-button>
                        </div>
                    </el-dialog>
                </div>





                <%--点击备份时的操作，2019.11.15已弃用--%>
                <%--<div class="pop-progress">--%>
                <%--<el-dialog :visible.sync="progressVisible" :close-on-click-modal="false">--%>

                <%--<b style="font-size:24px;color:#ebeef5;">正在备份中：</b>--%>
                <%--<el-progress :percentage="used" :text-inside="true" :stroke-width="26"></el-progress>--%>
                <%--</el-dialog>--%>
                <%--</div>--%>

                <%--上传文件，2019.11.15已弃用--%>
                <%--<el-upload ref="my-upload"--%>
                <%--class="upload" size="small"--%>
                <%--action="upload"--%>
                <%--multiple--%>
                <%--:limit="1"--%>
                <%--:on-success="successUpload"--%>
                <%--:on-remove="removeFile"--%>
                <%--accept=".bak"--%>
                <%-->--%>
                <%--<el-button size="small" type="primary">点击上传<i--%>
                <%--class="el-icon-upload el-icon--right"></i></el-button>--%>
                <%--</el-upload>--%>


                <%--<el-button class="operation-editable" type="primary"  id="btn_Backup" @click="_backup">备份</el-button>--%>
                <%--<el-button class="operation-editable" type="primary"  id="btn_AutoBackup" @click="_autoBackup" v-if="autoBackupV">自动备份</el-button>--%>
                <%--<el-button class="operation-editable" type="primary"  id="btn_closeAutoBackup" @click="_closeAutoBackup" v-if="closeAutoBackupV">关闭自动备份</el-button>--%>
                <%--<el-button class="operation-editable" type="primary" id="btn_Restore" @click="_restore">还原数据库</el-button>--%>


			</div>

		</div>
	</el-container>
</div>
</body>
</html>
