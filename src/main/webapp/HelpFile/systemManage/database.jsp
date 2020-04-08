<%--
  Created by IntelliJ IDEA.
  User: 10247
  Date: 2019/7/9
  Time: 21:00
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
</head>
<body>
<div class="main-content">
    <div class="row">
        <div class="col-md-12 headnav">
            <p>
                <img src="helpimg/sy_03.png" alt="icon" height="40" align="bottom"> 数据库维护
                <span class="line-style"></span>
            </p>
        </div>
        <div class="col-md-12 ">
            <ul class="breadcrumb">
                <li><span><a href="#tab1" class="thirdMenu current">数据库备份与还原</a></span></li>

            </ul>
            <div class="main-intro">
                <div>
                    <p>（一）功能：主要对整个系统数据信息进行备份和还原操作。</p>
                    <p>（二）使用方法：点击菜单“系统维护与管理”—>“数据库维护”，该模块包括“数据库备份与还原”选项卡。</p>
                </div>
                <div class="tabs">
                    <div id="tab1">
                        <span><数据库备份与还原></span>
                        <p>主要对数据库信息进行备份与还原。

                        </p>
                        <div class="pic-comment">
                            <img src="helpimg/systemManage/database/databasemain.png" alt="warn">
                            <p>图1 数据库备份与还原</p>
                        </div>

                        <span>【数据备份】</span>
                        <p>本系统的数据库备份和上传文件备份均为系统自动备份。数据库备份文件备份在SQL SERVER默认的备份文件夹下
                            “C:\Program Files\Microsoft SQL Server\MSSQL12.SQLEXPRESS\MSSQL\Backup\”，为了备份方便，
                            通过”备份数据库.bat“脚本将数据库备份文件复制到”F:\数据文件备份\Backup“目录下。 本系统只保留7天内的数据库
                            文件备份。超过7天的数据库文件会被配置的脚本自动删除。上传文件的备份以压缩的包的形式备份在“F:\数据文件备份“里，
                            命名格式为kuangshanJavaAuto0.zip和kuangshanJavaAuto1.zip，以2019-11-18为例，kuangshanJavaAuto0.zip
                            保存的是2019-11-18凌晨3点时的上传文件，而另一个保存着2019-11-17凌晨3点时的上传文件，以此类推。即上传文件只保留2天的数据。
                            为了防止服务器崩溃导致的数据缺失，请以每周一次的频率用U盘将"F:\数据文件备份"整个文件夹复制到U盘中，防患于未然。
                        </p>

                        <span>【还原上传文件】</span>
                        <p>用于还原上传的文件信息，点击上传文件还原，会弹出如图2所示的提示框，通过选择”今天“或者”昨天“，可以将上传的文件信息还原到
                            今天凌晨3点的状态或者昨天凌晨3点的状态（要保证“F:\数据文件备份“下存在kuangshanJavaAuto0.zip和kuangshanJavaAuto1.zip两个文件）
                            。由于文件大小问题，点击还原后需要等待5分钟左右。
                        </p>

                        <div class="pic-comment">
                            <img src="helpimg/systemManage/database/restoreUpload.png" alt="warn">
                            <p>图2 还原上传文件</p>
                        </div>

                        <span>【还原数据库】</span>
                        <p>用于还原数据库。点击还原数据库，会弹出如图3的提示框，通过选择选择列表中的日期，将数据库还原到对应日期凌晨3点时的状态。
                            （列表日期来自于SQL SERVER默认的备份文件夹下的数据库备份文件）。对于是不由本系统产生的数据库备份文件则无法进行还原。
                            还原时根据文件大小需要等待2分钟左右。
                        </p>

                        <div class="pic-comment">
                            <img src="helpimg/systemManage/database/restorebys.png" alt="warn">
                            <p>图3 还原数据库</p>
                        </div>

                        <span>【特殊情况】</span>
                        <p>以上的还原方法建立在该系统正常运行，服务器正常的情况下。若服务器硬盘毁坏或因其他原因导致服务器文件丢失。在这样的情况下
                            要进行还原文件和数据库，需要先安装该系统正常运行所需要的软件，尤其是SQL SERVER要采用默认安装方式。随后将U盘中的备份
                            的文件拖放到F盘，即使得”F:\数据文件备份“这个文件夹和之前没毁坏的情况保持一致。随后运行”F:\数据文件备份\bat“文件夹下的
                            ”还原数据库.bat“脚本，将数据库备份文件复制到SQL SERVER默认的备份文件夹下。随后进入程序按之前的操作进行还原
                            （具体还原到哪个时间段，是依据U盘中备份的日期决定的）。最后，在window的任务计划程序中添加”F:\数据文件备份\bat\run_delete_bak.bat“
                            和”F:\数据文件备份\bat\备份数据库.bat“ 这两个脚本计划（一周运行一次），确保备份的数据库是定期备份和定期删除，防止长期累积，占用硬盘资源。
                        </p>



                        <%--<span>【备份】</span>--%>
                        <%--<p>用于备份数据库和上传文件信息。直接点击【备份】，系统将会进入如图2的压缩备份页面。当进度条到达100%后，如果压缩成功且--%>
                            <%--压缩后的文件大于1G，提示信息如图3所示，此时，在服务器F盘的数据文件备份文件夹内会有压缩后的备份数据--%>
                            <%--kuangshanJavaByUser-"当前时间".zip， 该zip里包含upload中的所有文件和数据库备份文件。--%>
                            <%--若压缩成功且压缩后的文件小于1G，将会被传送到客户端，用户可以将备份文件下载到本地保存。--%>
                            <%--此外，本系统会在启动时自动对数据进行备份，每天凌晨两点，自动备份upload文件和差异数据库文件，每周（以程序启动时间推算）--%>
                            <%--完整备份一次数据库文件。自动备份文件保存在F盘的数据文件备份文件夹内，名为kuangshanJavaAuto0.zip和--%>
                            <%--kuangshanJavaAuto1.zip，举个例子，当今天是20号时，0.zip里包含的是20号凌晨2点前的数据，1.zip包含的是19号--%>
                            <%--凌晨2点前的数据；若今天是21号，则0.zip里包含的是20号凌晨2点前的数据，1.zip包含的是21号凌晨2点前的数据。--%>
                            <%--最后，请每周将服务器F盘下的数据文件备份拷贝到U盘中，以备数据还原时使用。--%>
                        <%--</p>--%>
                        <%--<div class="pic-comment">--%>
                            <%--<img src="helpimg/systemManage/database/backuping.png" alt="warn">--%>
                            <%--<p>图2 正在备份页面</p>--%>
                        <%--</div>--%>

                        <%--<div class="pic-comment">--%>
                            <%--<img src="helpimg/systemManage/database/prompt.png" alt="warn">--%>
                            <%--<p>图3 备份文件大于1G时的提示</p>--%>
                        <%--</div>--%>

                        <%--<span>【还原】</span>--%>

                        <%--<p>用于还原数据库和上传信息。点击【浏览】找到已备份过的数据库文件--%>
                            <%--kuangshanJavaTestByUser.bak，点击还原，会弹出提问示框，输入密码后进行还原，此方法使数据库还原到备份此文件时--%>
                            <%--的数据库信息和当天凌晨2点的上传文件信息。注意，此还原仅适用kuangshanJavaTestByUser.bak文件还原。对于--%>
                            <%--kuangshanJavaAuto.bak的还原，请手动进行还原。--%>
                            <%--点击【还原】还原系统数据库。如图4所示。--%>
                        <%--</p>--%>

                        <%--<div class="pic-comment">--%>
                            <%--<img src="helpimg/systemManage/database/restore.png" alt="warn">--%>
                            <%--<p>图4 还原</p>--%>
                        <%--</div>--%>


                        <%--<span>手动还原</span>--%>
                        <%--<p>打开Microsoft SQL Server Management Studio，用sa用户登录。展开首个文件夹及数据库文件夹，右键点击kuangshanJava,--%>
                            <%--选择任务->还原->数据库，还原线会提示数据库将会还原到什么时间的数据库，也可以点击还原线，自己选择要还原数据库。--%>
                            <%--如图6，7，8所示。最后点击还原按钮即可。--%>
                        <%--</p>--%>

                        <%--<div class="pic-comment">--%>
                            <%--<img src="helpimg/systemManage/database/restorebyu01.png" alt="warn">--%>
                            <%--<p>图6 登录Management Studio</p>--%>
                        <%--</div>--%>

                        <%--<div class="pic-comment">--%>
                            <%--<img src="helpimg/systemManage/database/restorebyu02.png" alt="warn">--%>
                            <%--<p>图7 点击任务还原</p>--%>
                        <%--</div>--%>

                        <%--<div class="pic-comment">--%>
                            <%--<img src="helpimg/systemManage/database/restorebyu03.png" alt="warn">--%>
                            <%--<p>图8 选择时间线</p>--%>
                        <%--</div>--%>


                    </div>

                </div>
            </div>
        </div>
    </div>
</div>
</body>
</html>
