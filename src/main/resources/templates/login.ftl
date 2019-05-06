<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>登录</title>
		<link rel="shortcut icon" href="${request.contextPath}/assets/img/ico.png">
		<link rel="stylesheet" type="text/css" href="${request.contextPath}/assets/css/login.css"/>
	</head>
	<body>
		<div class="wrap"></div>
		<div class="loginWrap" style="opacity: 0.9;">
			<div class="loginContent">
				<div class="logo"><img src="${request.contextPath}/assets/img/logo.png"/></div>
				<form action="${request.contextPath}/dashboard/login" method="POST" id="form">
					<div class="loginUser gray">
						<label for=""><img src="${request.contextPath}/assets/img/user.png"/></label>
						<span class="line"></span>
						<input type="text" name="userName" id="userName" value="" placeholder="请输入账号" />
					</div>
					<div class="loginMima gray">
						<label for=""><img src="${request.contextPath}/assets/img/psw.png"/></label>
						<span class="line"></span>
						<input type="password" name="password" id="password" value="" placeholder="请输入密码" />
					</div>
					<a class="loginBtn" onclick="document.getElementById('form').submit();">登录</a>
				</form>
			</div><!--loginContent-->
		</div><!--loginWrap-->
	</body>
</html>