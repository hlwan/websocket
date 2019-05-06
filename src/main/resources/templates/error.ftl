<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=gbk" />
    <title>出错咯</title>
    <link rel="shortcut icon" href="${request.contextPath}/assets/img/ico.png">
    <style type="text/css">
        body{ margin:0; padding:0; background:#efefef; font-family:Georgia, Times, Verdana, Geneva, Arial, Helvetica, sans-serif; }
        div#mother{ margin:0 auto; width:943px; height:572px; position:relative; }
        div#errorBox{ background: url(${request.contextPath}/assets/img/404_bg.png) no-repeat top left; width:943px; height:572px; margin:auto; }
        div#errorText{ color:#39351e; padding:146px 0 0 446px }
        div#errorText p{ width:303px; font-size:14px; line-height:26px; }
        div.link{ /*background:#f90;*/ height:50px; width:145px; float:left; }
        div#home{ margin:20px 0 0 444px;}
        div#contact{ margin:20px 0 0 25px;}
        h1{ font-size:40px; margin-bottom:35px; }
    </style>
</head>
<body>
<div id="mother">
    <div id="errorBox">
        <div id="errorText">
            <h1>Sorry..</h1>
            <h3>${msg!"发生错误。请与工作人员联系!"}</h3>
        </div>
        <a href="${request.contextPath}/dashboard" title="返回首页">
            <div class="link" id="home">返回首页</div>
        </a>
        <a href="javascript:void(0);" title="联系管理员">
            <div class="link" id="contact">联系管理员</div>
        </a>
    </div>
</div>
</body>
</html>
