<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>在线浏览PDF</title>
</head>
<style>
    *{margin: 0;padding: 0}
    html,body{width: 100%;height: 100%}
    iframe{
    /* object-fit:contain; */
    width: 100%;
    height: 100%;
    }
</style>
<body style="height:100%">
<script type="text/javascript" src="Scripts/bootstrap/js/jquery-2.1.3.min.js"></script>
<script type="text/javascript">
     $(function(){
        $("#displayPdfIframe").attr("src",'<c:url value="CommonPages/pdf-js/web/viewer.html" />?file=' + encodeURIComponent('<c:url value="${location}"/>'));
    });
</script>
<iframe id="displayPdfIframe">
</iframe>
</body>
</html>