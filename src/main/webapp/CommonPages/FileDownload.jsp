<%@ page import="java.util.*,com.kuangshan.riskcontrol.model.*" language="java" contentType="text/html; charset=utf-8"
         pageEncoding="utf-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
    <script type="text/javascript" src="Scripts/bootstrap/js/jquery-2.1.3.min.js"></script>
    <script type="text/javascript" src="Scripts/bootstrap/js/bootstrap.min.js"></script>
    <link href="Scripts/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css"/>
    <link href="Styles/apply.css" rel="stylesheet" type="text/css"/>
    <script type="text/javascript" src="../Scripts/layer-js/layer.js"></script>
    <script type="text/javascript" src="Scripts/jquery.uploadify-v3/jquery.uploadify.wzModifyForViewProof.js"></script>
    <script type="text/javascript" src="Scripts/jquery.uploadify-v3/swfobject.js"></script>
    <script type="text/javascript" src="Scripts/systemFile.js"></script>
    <script type="text/javascript">
        $(function () {
            $('#btn_close').click(function () {
                var index = parent.layer.getFrameIndex(window.name);
                parent.layer.close(index);
            });
        });
    </script>
</head>
<body>
<div style='display: none'>
    <input id="path" value="${path }"/>
</div>
<form>
    <div class="popTxt">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-top: 5px;">
            <tr>
                <td style="width: 80%">
                    <fieldset style="height: 200px; text-align: center">
                        <legend align="center">文件列表</legend>

                        <select id="fileList" style="width: 100%; height: 90%;" size="4">
                            <c:forEach var="file" items="${filelist}">
                                <option title="${file.uploadname }"
                                        value="${file.realname }">${file.uploadname }</option>
                            </c:forEach>
                        </select>


                    </fieldset>
                </td>
            </tr>
        </table>
        <div class="pop_btnBorder">
            <div class="pop_btn">
                <i>
                    <input type="button" id="btn_close" value="关闭" class="btnright redbtn"/>
                    <input type="button" id="btn_submit_download" value="下载" class="btnright bluebtn"/>
                </i>
                <span id="finishedTips" style="color: red"></span>


            </div>
        </div>
    </div>

</form>
</body>
</html>
