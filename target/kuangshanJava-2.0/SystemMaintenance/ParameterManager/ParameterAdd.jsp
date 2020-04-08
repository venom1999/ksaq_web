<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">


<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" >
<title></title>
<script type="text/javascript"
	src="../../Scripts/bootstrap/js/jquery-2.1.3.min.js"></script>
<script type="text/javascript"
	src="../../Scripts/My97DatePicker/WdatePicker.js"></script>
<script charset="utf-8" type="text/javascript"
	src="scripts/ParameterEvents.js"></script>
<link rel="stylesheet" type="text/css" href="../../Styles/easyui.css" />
<script type="text/javascript"
	src="../../Scripts/bootstrap/js/bootstrap.min.js"></script>
<link href="../../Scripts/bootstrap/css/bootstrap.min.css"
	rel="stylesheet" type="text/css" />
<script type="text/javascript" src="../../Scripts/jquery.easyui.min.js"></script>

<link type="text/css" rel="Stylesheet"
	href="../../Scripts/jquery.uploadify-v3/uploadify.css" />
<script type="text/javascript"
	src="../../Scripts/jquery.uploadify-v3/jquery.uploadify.wzModifyForViewProof.js"></script>
<script type="text/javascript"
	src="../../Scripts/jquery.uploadify-v3/swfobject.js"></script>
<script type="text/javascript"
	src="../../Scripts/bootstrap/js/bootstrap-select.js"></script>
<link rel="stylesheet" type="text/css"
	href="../../Scripts/bootstrap/css/bootstrap-select.css" />
<link rel="stylesheet" type="text/css" href="../../Styles/apply.css" />

</head>
<body class="body_tcc">
	<form id="form_submit">
		<div class="popTxt">
			<table width="100%" border="0" cellspacing="0" cellpadding="0"
				style="margin-top: 5px;">
				<tr>
					<td style="width: 50%; height: 100px;">
						<table width="100%" border="0" cellspacing="0" cellpadding="0"
							class="popTable table table-striped" style="margin-top: 0;">							
							<tr>
								<th width="30%">参数编号：</th>
								<td><input name="parameteritem" style="width: 180px" type="text"
								     id="txt_ParameterItem" value=""></input> 
								     <font color='red'>*</font> <span
								     style="color: red; display: none" class="hint"> !</span></td>
							</tr>
							<tr>
								<th width="30%">参数名称：</th>
								<td><input name="parametername" style="width: 180px" type="text" 
								    id="txt_ParameterName" value=""></input> 
								    <font color='red'>*</font> <span
								    style="color: red; display: none" class="hint"> !</span></td>
							</tr>
							<tr>
								<th width="30%">参数值：</th>
								<td><input name="parametervalue" style="width: 180px" type="text"
								    id="txt_ParameterValue" value=""></input> 
								    <font color='red'>*</font> <span
								    style="color: red; display: none" class="hint"> !</span></td>
							</tr>
						</table>

					</td>
				</tr>
			</table>
            <div class="pop_btnBorder">
				<div class="pop_btn">
					<i> <input type="button" id="btn_close" value="关闭" class="btnright redbtn"  />
						<input type="button" id="btn_reset" value="重置" class="btnright bluebtn" />
						<input type="button" id="btn_submit_add" value="添加" class="btnright bluebtn" />
					</i> <span id="finishedTips" style="color: red"></span>

				</div>
			</div>
		</div>
	</form>
</body>
</html>
