﻿<%--
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
                    <img src="helpimg/sy_03.png" alt="icon" height="40" align="bottom"> 特种作业人员台账
                    <span class="line-style"></span>
                </p>
            </div>
            <div class="col-md-12 ">
                <ul class="breadcrumb">
                    <li><span><a href="#tab1" class="thirdMenu current">复审时间预警</a></span></li>
                    <li><span><a href="#tab2" class="thirdMenu">有效时间预警</a></span></li>
                    <li><span><a href="#tab3" class="thirdMenu">证书信息管理</a></span></li>
                    <li><span><a href="#tab4" class="thirdMenu">特种作业证书字典管理</a></span></li>
                </ul>
                <div class="main-intro">
                    <div>
                        <p>（一）功能：主要对公司特种作业人员证书进行预警和管理以及对公司的作业类别、准操项目进行管理。</p>
                        <p>（二）使用方法：点击菜单“员工安全信息管理”-->“特种作业人员台账”。该模块包含“复审时间预警”、“有效时间预警”、“证书信息管理”和“特种作业证书字典管理”四个选项卡。其中，选项卡“特种作业证书字典管理”里，“作业类别”与“准操项目”是为选项卡“证书信息管理”中相应输入框提供选择项，因此，首次使用时，需要先录入“特种作业证书字典管理”中内容。</p>
                    </div>
                    <div class="tabs">
                        <div id="tab1">
                            <span><复审时间预警></span>
                            <p>以记录列表的形式展示各类复审时间即将过期（或已经）的特种作业证书信息（预警时间可以由系统管理员通过参数表自行设定，目前为30天），提示相关管理人员及时对证书进行复审，如图1所示。</p>
                            <div class="pic-comment">
                                <img src="helpimg/employeeManage/specialMan/specialmanreexaminetimewarn.png" alt="复审时间预警界面">
                                <p>图1 复审时间预警界面</p>
                            </div>
                        </div>
                        <div id="tab2">
                            <span><有效时间预警></span>
                            <p>以记录列表的形式展示各类有效时间即将过期（或已经）的特种作业证书信息（预警时间可以由系统管理员通过参数表自行设定，目前为30天），提示相关管理人员及时对证书进行更换，如图2所示。</p>
                            <div class="pic-comment">
                                <img src="helpimg/employeeManage/specialMan/specialmanvaliditywarn.png" alt="有效时间预警界面">
                                <p>图2 有效时间预警界面</p>
                            </div>
                        </div>
                        <div id="tab3">
                            <span><证书信息管理></span>
                            <p>以记录列表的形式展示各类特种作业证书信息，授权用户可以进行添加、删除、批量、打印名单、复审、导出、详细、修改、浏览、下载和查询操作，如图3所示，注意：批量表示修改在某个时间段内的所有人员信息，具体参见【批量】使用方法。</p>
                            <div class="pic-comment">
                                <img src="helpimg/employeeManage/specialMan/specialman.png" alt="证书信息管理界面">
                                <p>图3 证书信息管理界面</p>
                            </div>

                            <span>【添加】</span>
                            <p> 用于添加特种作业人员证书的相关信息。点击【添加】进入如图4所示的添加界面。其中，在“基本信息”栏目中，依次填入员工姓名，作业类别，准操项目等信息（其中带*的为必填项；“作业类别”、“准操项目”中内容，可以通过“特种作业证书字典管理”进行编辑）；在“证书文件”栏目中，可通过点击【点击上传】区域或者将所要上传的文件通过鼠标拖到该区域，上传有关文件（上传文件时需等待文件名后出现对勾，才表示上传完成），如果上传成功后需要删除该文件，也可以通过鼠标滑到该文件处并点击其后的×完成。 最后，点击【添加】，则将这条记录信息以及上传的文件添加到系统中；点击【重置】将已填写信息清空；点击【关闭】则结束本次添加操作。值得注意的是，员工姓名可通过下拉框选择，也可以直接输入，以便快速在下拉框中定位相关人员。</p>
                            <div class="pic-comment">
                                <img src="helpimg/employeeManage/specialMan/addspecialman.png" alt="特种作业人员证书的添加功能">
                                <p>图4 特种作业人员证书的添加功能</p>
                            </div>

                            <span>【删除】</span>
                            <p> 用于删除特种作业人员证书的相关信息。从特种作业人员证书列表选中一条或多条记录，点击【删除】进入如图5所示的删除界面。点击【确定】删除选中记录，点击【取消】取消本次删除操作。</p>
                            <div class="pic-comment">
                                <img src="helpimg/employeeManage/specialMan/delspecialman.png" alt="特种作业人员证书的删除功能">
                                <p>图5 特种作业人员证书的删除功能</p>
                            </div>

                            <span>【批量】</span>
                            <p> 用于修改多个特种作业人员证书的相关信息。点击【批量】进入如图6所示的批量修改界面。选择修改条件，输入起始时间和终止时间以及新日期，点击【保存】批量修改满足以上条件记录的相关信息；点击【关闭】结束本次批量修改操作。以复审日期作为批量修改条件为例：将复审日期在起始时间和终止时间内的所有员工的特种作业证书的复审日期修改为新日期，有效期至类似，不再赘述。（当修改条件为是否复审时，起始时间和终止时间为复审时间，新日期无法选择，只需要选择是否复审即可进行批量修改。）</p>
                            <div class="pic-comment">
                                <img src="helpimg/employeeManage/specialMan/batchspecialman.png" alt="特种作业人员证书的批量修改功能">
                                <p>图6 特种作业人员证书的批量修改功能</p>
                            </div>

                            <span>【打印名单】</span>
                            <p> 用于批量打印特种作业人员证书的相关信息。点击【打印名单】进入如图7所示的打印名单界面。选择作业类别，点击【打印】打印证书信息；点击【关闭】结束本次打印操作。</p>
                            <div class="pic-comment">
                                <img src="helpimg/employeeManage/specialMan/printspecialman.png" alt="特种作业人员证书的打印名单功能">
                                <p>图7 特种作业人员证书的打印名单功能</p>
                            </div>
                            <span>【复审】</span>
                            <p> 对单个或多个记录进行复审。选中一个或多个记录进行复审，点击【确定】即可复审成功，点击【取消】取消本次复审。</p>

                            <div class="pic-comment">
                                <img src="helpimg/employeeManage/specialMan/reviewspecialman.png" alt="特种作业人员证书的复审功能">
                                <p>图8 特种作业人员证书的复审功能</p>
                            </div>
                            <span>【导出】</span>
                            <p> 用于以EXCEL文件形式批量导出特种作业人员的相关信息。从特种作业人员列表选中一条或多条记录，点击【导出】进入如图9所示的导出界面
                                （不同的浏览器，可能出现的界面略有不同），按照提示框提示打开或者保存导出的文件（文件保存位置可自行设置）。如果未选择记录，则会导出当前列表所有的记录。
                                如果需要按查询条件导出，则先输入查询条件并点击【查询】，然后再点击【导出】。同时，导出时如果存在查询条件，则在导出的文件里，标题与记录信息之间显示查询条件，否则不显示。</p>

                            <div class="pic-comment">
                                <img src="helpimg/employeeManage/specialMan/exportspecialman.png" alt="特种作业人员证书的导出功能">
                                <p>图9 特种作业人员证书的导出功能</p>
                            </div>
                            <span>【详细】</span>
                            <p> 用于查看特种作业人员证书的详细信息。从特种作业人员证书列表相应的操作中点击【详细】进入如图10所示的详细界面，可以查看该员工特种作业人员证书的详细信息。若“证书文件”存在若干文件，选择一个文件，点击【查看】可进行在线浏览；点击【下载】可将选中文件下载到本地；点击【关闭】结束本次查看操作；点击【上一条】和【下一条】还能够查看公司其他员工特种作业人员证书的详细信息。</p>

                            <div class="pic-comment">
                                <img src="helpimg/employeeManage/specialMan/detailspecialman.png" alt="特种作业人员证书的详细功能 ">
                                <p>图10 特种作业人员证书的详细功能 </p>
                            </div>
                            <span>【修改】</span>
                            <p> 用于修改特种作业人员证书的相关信息。从特种作业人员证书列表相应的操作中点击【修改】进入如图11所示的修改界面。根据需要修改相关内容，对于上传的文件，如果要删除，在“证书文件”栏目中，点击文件名后的【删除】；也可以点击【点击上传】，上传新文件（上传文件时需等待文件名后出现对勾，才表示上传完成）。最后，点击【保存】将修改内容更新到系统中；点击【关闭】则取消本次修改操作。</p>
                            <div class="pic-comment">
                                <img src="helpimg/employeeManage/specialMan/editspecialman.png" alt="特种作业人员证书的修改功能">
                                <p>图11 特种作业人员证书的修改功能</p>
                            </div>

                            <span>【更多】</span>
                            <p>由于页面空间有限，更多的操作按钮一般通过点击【更多】完成。此处提供【浏览】和【下载】用于浏览或下载公司特种作业人员证书文件，如图12所示的界面。点击【浏览】或者【下载】进入如图13所示的界面，选择一个文件，点击【浏览】，即可在线浏览该文件内容（如果文件类型不支持在线浏览，可以通过点击【下载】，下载该文件后浏览）。点击【下载】，可以下载该文件到本地。</p>
                            <div class="pic-comment">
                                <img src="helpimg/employeeManage/specialMan/morespecialman.png" alt="特种作业人员证书中【更多】">
                                <p>图12 特种作业人员证书中【更多】</p>
                            </div>

                            <div class="pic-comment">
                                <img src="helpimg/employeeManage/specialMan/lookspecialman.png" alt="浏览或下载特种作业人员证书">
                                <p>图13 浏览或下载特种作业人员证书</p>
                            </div>
                        </div>
                        <div id="tab4">
                            <span><特种作业证书字典管理><作业类别> </span>
                            <p>以记录列表的形式展示所有的公司作业类别信息，授权用户可以进行添加、删除、修改操作，如图14所示。</p>
                            <div class="pic-comment">
                                <img src="helpimg/employeeManage/specialMan/specialdiccategory.png" alt="特种作业证书字典管理界面-作业类别">
                                <p>图14 特种作业证书字典管理界面-作业类别</p>
                            </div>

                            <span>【添加】</span>
                            <p> 用于添加作业类别的相关信息。点击【添加】进入如图15所示的添加界面。填入作业类别，点击【添加】则这条信息添加到系统中，点击【关闭】取消本次添加操作。</p>
                            <div class="pic-comment">
                                <img src="helpimg/employeeManage/specialMan/addspeciadiccategory.png" alt="特种作业证书字典管理的作业类别添加功能">
                                <p>图15 特种作业证书字典管理的作业类别添加功能</p>
                            </div>

                            <span>【删除】</span>
                            <p> 用于删除作业类别的相关信息。从作业类别列表选中一条或多条记录，点击【删除】进入如图16所示的删除界面。点击【确定】删除选中记录及其包括的所有准操项目，点击【取消】取消本次删除操作。</p>
                            <div class="pic-comment">
                                <img src="helpimg/employeeManage/specialMan/delspeciadiccategory.png" alt="特种作业证书字典管理的作业类别删除功能">
                                <p>图16 特种作业证书字典管理的作业类别删除功能</p>
                            </div>

                            <span>【修改】</span>
                            <p> 用于修改作业类别的相关信息。从作业类别列表相应的操作中点击【修改】进入如图17所示的修改界面。根据需要修改相关内容，点击【保存】将该记录修改内容更新到系统中，点击【关闭】取消本次修改操作。</p>
                            <div class="pic-comment">
                                <img src="helpimg/employeeManage/specialMan/editspeciadiccategory.png" alt="特种作业证书字典管理的作业类别修改功能">
                                <p>图17 特种作业证书字典管理的作业类别修改功能</p>
                            </div>

                            <span><特种作业证书字典管理><准操项目> </span>
                            <p>以记录列表的形式展示所有的公司准操项目信息，授权用户可以进行添加、删除、修改操作，如图18所示。</p>
                            <div class="pic-comment">
                                <img src="helpimg/employeeManage/specialMan/specialdicitem.png" alt="特种作业证书字典管理界面-准操项目">
                                <p>图18 特种作业证书字典管理界面-准操项目</p>
                            </div>

                            <span>【添加】</span>
                            <p> 用于添加准操项目的相关信息。点击【添加】进入如图19所示的添加界面。选择需要添加作业类别，输入准操项目，点击【添加】则这条信息添加到系统中，点击【关闭】取消本次添加操作。</p>
                            <div class="pic-comment">
                                <img src="helpimg/employeeManage/specialMan/addspecialdicitem.png" alt="特种作业证书字典管理的准操项目添加功能">
                                <p>图19 特种作业证书字典管理的准操项目添加功能</p>
                            </div>

                            <span>【删除】</span>
                            <p> 用于删除准操项目的相关信息。从准操项目列表选中一条或多条记录，点击【删除】进入如图20所示的删除界面。点击【确定】删除选中的记录，点击【取消】取消本次删除操作。</p>
                            <div class="pic-comment">
                                <img src="helpimg/employeeManage/specialMan/delspecialdicitem.png" alt="特种作业证书字典管理的准操项目删除功能">
                                <p>图20 特种作业证书字典管理的准操项目删除功能</p>
                            </div>

                            <span>【修改】</span>
                            <p> 用于修改准操项目的相关信息。从准操项目列表相应的操作中点击【修改】进入如图21所示的修改界面。根据需要修改相关内容，点击【保存】将该记录修改内容更新到系统中，点击【关闭】取消本次修改操作。</p>
                            <div class="pic-comment">
                                <img src="helpimg/employeeManage/specialMan/editspecialdicitem.png" alt="特种作业证书字典管理的准操项目修改功能">
                                <p>图21 特种作业证书字典管理的准操项目修改功能</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
