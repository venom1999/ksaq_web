<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>在线显示图片</title>
<!-- <script type="text/javascript" src="Scripts/bootstrap/js/jquery-2.1.3.min.js"></script> -->
<style>
    *{margin: 0;padding: 0}
    html,body{width: 100%;height: 100%}
    img{
    object-fit:contain;
    width: 100%;
    height: 100%;
    }
</style>
</head>
<body>

<img alt="" src="${location}">
</body>
</html>