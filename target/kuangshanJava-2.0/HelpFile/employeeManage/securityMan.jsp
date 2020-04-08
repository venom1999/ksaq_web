<%--
  Created by IntelliJ IDEA.
  User: SLR
  Date: 2019/7/9
  Time: 16:23
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
                    <img src="helpimg/sy_03.png" alt="icon" height="40" align="bottom"> 安全管理人员台账
                    <span class="line-style"></span>
                </p>
            </div>
            <div class="col-md-12 ">
                <ul class="breadcrumb">
                    <li><span><a href="#tab1" class="thirdMenu current">再教育时间预警</a></span></li>
                    <li><span><a href="#tab2" class="thirdMenu">有效时间预警</a></span></li>
                    <li><span><a href="#tab3" class="thirdMenu">证书信息管理</a></span></li>
                </ul>
                <div class="main-intro">
                    <div>
                        <p>（一）功能：主要对公司安全管理人员证书进行预警和管理。</p>
                        <p>（二）使用方法：点击菜单“员工安全信息管理”-->“安全管理人员台账”。该模块包含“再教育时间预警”、“有效时间预警”、“证书信息管理”三个选项卡。</p>
                    </div>
                    <div class="tabs">
                        <div id="tab1">
                            <span><再教育时间预警></span>
                            <p>以记录列表的形式展示各类再教育时间即将（或已经）过期的公司安全管理人员证书信息（预警时间可以由系统管理员通过参数表自行设定，目前为90天），提示相关人员及时进行再教育，如图1所示。</p>
                            <div class="pic-comment">
                                <img src="helpimg/employeeManage/securityMan/securityreeducationwarn.png" alt="再教育时间预警界面">
                                <p>图1 再教育时间预警界面</p>
                            </div>
                        </div>
                        <div id="tab2">
                            <span><有效时间预警></span>
                            <p>以记录列表的形式展示各类有效时间即将（或已经）过期的公司安全管理人员证书信息（预警时间可以由系统管理员通过参数表自行设定，目前为30天），提示相关管理人员及时对证书进行更换，如图2所示。</p>
                            <div class="pic-comment">
                                <img src="helpimg/employeeManage/securityMan/securitymanvaliditywarn.png" alt="有效时间预警界面">
                                <p>图2 有效时间预警界面</p>
                            </div>
                        </div>
                        <div id="tab3">
                            <span><证书信息管理></span>
                            <p>以记录列表的形式展示各类安全管理人员证书信息，授权用户可以进行添加、删除、批量、导出、详细、修改、浏览、下载和查询操作，如图3所示。注意：批量表示修改在某个时间段内的所有人员信息，具体参见【批量】使用方法。</p>
                            <div class="pic-comment">
                                <img src="helpimg/employeeManage/securityMan/securityman.png" alt="证书信息管理界面">
                                <p>图3 证书信息管理界面</p>
                            </div>

                            <span>【添加】</span>
                            <p>用于添加安全管理人员证书的相关信息。点击【添加】进入如图4所示的添加界面。其中，在“基本信息”栏目中，依次填入员工姓名，证书编号，资格类型等信息（其中带*的为必填项）；在“证书文件”栏目中，可通过点击【点击上传】区域或者将所要上传的文件通过鼠标拖到该区域，上传有关文件（上传文件时需等待文件名后出现对勾，才表示上传完成），如果上传成功后需要删除该文件，也可以通过鼠标滑到该文件处并点击其后的×完成。 最后，点击【添加】，则这条信息添加到系统中；点击【重置】将已填写信息清空；点击【关闭】则结束本次添加操作。值得注意的是，员工姓名可通过下拉框选择，也可以直接输入，以便快速在下拉框中定位相关人员。</p>
                            <div class="pic-comment">
                                <img src="helpimg/employeeManage/securityMan/addsecurityman.png" alt="安全管理人员证书的添加功能">
                                <p>图4 安全管理人员证书的添加功能</p>
                            </div>

                            <span>【删除】</span>
                            <p>用于删除安全管理人员证书的相关信息。从安全管理人员证书列表选中一条或多条记录，点击【删除】进入如图5所示的删除界面。点击【确定】删除选中记录，点击【取消】取消本次删除操作。</p>
                            <div class="pic-comment">
                                <img src="helpimg/employeeManage/securityMan/delsecurityman.png" alt="安全管理人员证书的删除功能">
                                <p>图5 安全管理人员证书的删除功能</p>
                            </div>

                            <span>【批量】</span>
                            <p>用于修改多个安全管理人员证书的相关信息。点击【批量】进入如图6所示的批量修改界面。选择修改条件，输入起始时间和终止时间以及新日期，点击【保存】批量修改满足以上条件记录的相关信息；点击【关闭】结束本次批量修改操作。以换证日期为例：将换证日期在起始时间和终止时间内的所有员工的安全管理证书的换证日期修改为新日期，有效期至类似，不再赘述。</p>
                            <div class="pic-comment">
                                <img src="helpimg/employeeManage/securityMan/batchsecurityman.png" alt="安全管理人员证书的批量功能">
                                <p>图6 安全管理人员证书的批量功能</p>
                            </div>

                            <span>【导出】</span>
                            <p>用于以EXCEL文件形式批量导出安全管理人员的相关信息。从安全管理人员列表选中一条或多条记录，点击【导出】进入如图7所示的导出界面
                                （不同的浏览器，可能出现的界面略有不同），按照提示框提示打开或者保存导出的文件（文件保存位置可自行设置）。如果未选择记录，则会导出当前列表所有的记录。
                                如果需要按查询条件导出，则先输入查询条件并点击【查询】，然后再点击【导出】。同时，导出时如果存在查询条件，则在导出的文件里，标题与记录信息之间显示查询条件，否则不显示。</p>
                            <div class="pic-comment">
                                <img src="helpimg/employeeManage/securityMan/exportsecurityman.png" alt="安全管理人员证书的导出功能">
                                <p>图7 安全管理人员证书的导出功能</p>
                            </div>

                            <span>【详细】</span>
                            <p>用于查看安全管理人员证书的详细信息。从安全管理人员证书列表相应的操作中点击【详细】进入如图8所示的详细界面，可以查看该公司安全管理人员证书的详细信息。若“证书文件”存在若干文件，选择一个文件，点击【查看】可进行在线浏览；点击【下载】可将选中文件下载到本地；点击【关闭】结束本次查看操作；点击【上一条】和【下一条】还能够查看公司其他安全管理人员证书的详细信息。</p>
                            <div class="pic-comment">
                                <img src="helpimg/employeeManage/securityMan/detailsecurityman.png" alt="安全管理人员证书的详细功能">
                                <p>图8 安全管理人员证书的详细功能</p>
                            </div>

                            <span>【修改】</span>
                            <p>用于修改安全管理人员证书的相关信息。从安全管理人员证书列表相应的操作中点击【修改】进入如图9所示的修改界面。根据需要修改相关内容，对于上传的文件，如果要删除，在“证书文件”栏目中，点击文件名后的【删除】；也可以点击【点击上传】，上传新文件（上传文件时需等待文件名后出现对勾，才表示上传完成）。最后，点击【保存】将修改内容更新到系统中；点击【关闭】则取消本次修改操作。</p>
                            <div class="pic-comment">
                                <img src="helpimg/employeeManage/securityMan/editsecurityman.png" alt="安全管理人员证书的修改功能">
                                <p>图9 安全管理人员证书的修改功能</p>
                            </div>

                            <span>【更多】</span>
                            <p>由于页面空间有限，更多的操作按钮一般通过点击【更多】完成。此处提供【浏览】和【下载】用于浏览或下载公司安全管理人员证书文件，如图10所示的界面。点击【浏览】或者【下载】进入如图11所示的界面，选择一个文件，点击【浏览】，即可在线浏览该文件内容（如果文件类型不支持在线浏览，可以通过点击【下载】，下载该文件后浏览）。点击【下载】，可以下载该文件到本地。</p>
                            <div class="pic-comment">
                                <img src="helpimg/employeeManage/securityMan/moresecurityman.png" alt="安全管理人员证书中【更多】">
                                <p>图10 安全管理人员证书中【更多】</p>
                            </div>

                            <div class="pic-comment">
                                <img src="helpimg/employeeManage/securityMan/browser.jpg" alt="浏览安全管理人员证书">
                                <p>图11 浏览安全管理人员证书</p>
                            </div>

                            <div class="pic-comment">
                                <img src="helpimg/employeeManage/securityMan/download.png" alt="下载安全管理人员证书">
                                <p>图12 下载安全管理人员证书</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
