<%@ page import="java.util.*,com.kuangshan.riskcontrol.model.*" language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title></title>
<script type="text/javascript" src="../Scripts/jquery.js"></script>
<script type="text/javascript" src="../Scripts/jquery.flexpaper/flexpaper_flash.js"></script>
</head>
<body>
	<form id="form1" >
		<span id="tip" style="display:none"></span>
		<div style="text-align: center">
			<a id="viewerPlaceHolder" style="width: 100%; height: 900px; display: block; margin-left: 0%"></a>

			<script type="text/javascript">
	            var fp = new FlexPaperViewer(
						 '../FlexPaper/FlexPaperViewer',
						 'viewerPlaceHolder', {
						     config: {
						         SwfFile: escape('${path}'),
						         Scale: 0.6,
						         ZoomTransition: 'easeOut',
						         ZoomTime: 0.5,
						         ZoomInterval: 0.2,
						         FitPageOnLoad: true,
						         FitWidthOnLoad: true,
						         PrintEnabled: true,
						         FullScreenAsMaxWindow: true,
						         ProgressiveLoading: true,
						         MinZoomSize: 0.2,
						         MaxZoomSize: 5,
						         SearchMatchAll: false,
						         InitViewMode: 'Portrait',

						         ViewModeToolsVisible: true,
						         ZoomToolsVisible: true,
						         NavToolsVisible: true,
						         CursorToolsVisible: true,
						         SearchToolsVisible: true,

						         localeChain: 'en_US'
						     }
						 });
	        </script>
		</div>
	</form>
</body>
</html>