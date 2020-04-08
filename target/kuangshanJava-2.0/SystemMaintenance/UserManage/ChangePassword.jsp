<%@ page language="java" contentType="text/html; charset=utf-8"
         pageEncoding="utf-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1">
    <title></title>
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
    <script type="text/javascript" src="scripts/ChangePassword.js"></script>
    <style type="text/css">

        .pop-dialog .el-input { /*输入框 */
            width: 160px;
        }

        .pop-dialog .el-dialog { /*对话框 */
            width: 650px;
        }

        .pop-dialog .el-form-item__label { /*文本 */
            width: 130px;
        }

        .pop-dialog .detail-dialog2 .el-dialog {
            width: 650px;
        }

        .el-dialog__body {
            padding-left: 70px;
        }

        .filter-label {
            line-height: 2.5em;
        }

        .row-bg2 {
            padding-bottom: 2em;
        }

        .avatar-uploader .el-upload {
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
        }

        .avatar-uploader .el-upload:hover {
            border-color: #409EFF;
        }

        .avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 178px;
            height: 178px;
            line-height: 178px;
            text-align: center;
        }

        .el-upload-dragger {
            width: 180px;
        }

        .avatar {
            width: 178px;
            height: 178px;
            display: block;
        }

        .list-filter .el-select {
            width: 50%;
        }

    </style>
</head>
<body class="body_tcc">
<div class="right">
    <%--<div class="right_tltle">

        <ul class="breadcrumb">
            <li>
                <span class="current">修改密码</span>
            </li>
        </ul>
    </div>--%>
    <div class="pop-dialog">
        <el-dialog title="修改密码" :modal="true" visible="true" width="60%"
                   :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
            <el-form :inline="true" :model="ruleForm" ref="ruleForm" :rules="rules">
                <el-row>

                    <el-col :span="24">
                        <el-form-item label="用户编号：" prop="EmployeeID">
                            <el-input v-model="ruleForm.EmployeeID" readonly="true"></el-input>
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
                            <el-input type="password" placeholder="请确认新密码" v-model="ruleForm.checkPass" show-password
                                      @change="checkPassChange"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">

                <el-button id="btn-add"  type="primary" @click="submitAdd">保存
                </el-button>
                <el-button @click="_close" type="danger">关 闭
                </el-button>
            </div>

        </el-dialog>
    </div>
</div>
</body>
</html>
