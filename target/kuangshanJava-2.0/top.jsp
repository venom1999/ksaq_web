<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head >
    <title></title>
    <link href="Styles/Styles.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript" src="Scripts/jquery-1.4.4.min.js"></script>

    <script type="text/javascript">
        $(function () {
            //用户信息
            $('#userInfo').click(function () {
                return window.parent.qBox.iFLoad({ title: '用户详细信息', src: 'SystemMan/UserMan/UserInfo.aspx?rdom=' + Math.random(), w: 350, h:275 });
            });
            //修改密码
            $('#changePWD').click(function () {
                var userName = $("#UserName").val();
                $.post("SystemMan/UserMan/Judge.ashx", { userName: userName }, function (data) {
                    if(data == "true")
                        return window.parent.qBox.iFLoad({ title: '修改用户密码', src: 'SystemMan/UserMan/changePWD.aspx?rdom=' + Math.random(), w: 750, h: 295 });
                    else
                        return window.parent.qBox.iFLoad({ title: '修改用户密码', src: 'SystemMan/UserMan/changePWD1.aspx?rdom=' + Math.random(), w: 450, h: 295 });
                });
            });
            //帮助信息
            $('#help').click(function () {
                window.parent.location.href ="HelpFile/help.jsp";
            });

            //退出事件
            $('#btn_exit').click(function () {
                window.parent.location.href = "Login.aspx?rdom=" + Math.random();
            });
        })
    </script>
</head>

<body >
<!-- 头部 start -->
<div id="header" style="z-index:-1" class="topbg"></div>
<!-- 头部 END -->

<!-- nav start -->
<div id="nav" style="z-index:-1">
 <table width="100%" border="0" cellspacing="0" cellpadding="0" class="topline" >
  <tr  width="100%" >
    <td  class="nav_bg1">
	<label><b>单工</b>， 欢迎您！</label>  
	<label>角色：安全管理部领导</label>  
	<label>所在机构：安全管理部 </label>
	<label><a href="#" id="btn_exit" style="cursor:pointer">退出</a> </label>
	</td>
      <td>
    
	<div class="loginInfo">上次登陆时间：2012年7月20日 23:59:59  版本：2.0</div>
 
  <div class="userinfo ">   
      <a href="#" class="top_user" id="userInfo">用户信息</a>
      <a href="#" class="top_pwd" id="changePWD">修改密码</a>
    <a href="#" class="top_a3" id="help">帮助</a> 


  </div>
	</td>
  </tr>
</table>
</div>
<!-- 头部 END -->
</body>
</html>
