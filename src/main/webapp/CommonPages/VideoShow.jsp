<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>

    <title>在线观看视频</title>
    <link href="video-js-6.12.1/video-js.css" rel="stylesheet">
    <script src="video-js-6.12.1/ie8/videojs-ie8.min.js"></script>
    <script src="video-js-6.12.1/video.js"></script>

<style>
    *{margin: 0;padding: 0}
    html,body{width: 100%;height: 100%}
    video{
    object-fit:contain;
    width: 100%;
    height: 100%;
    }
</style>
</head>
<body>

  <video class="video-js vjs-default-skin" controls preload="none"   data-setup="{}">
    <source src="${location }" type="video/mp4">
  </video>

</body>

</html>