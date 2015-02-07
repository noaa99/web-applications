<!DOCTYPE HTML>
<html>
	<head>
		<title><?php echo $title_for_layout; ?></title>
		<meta http-equiv="content-type" content="text/html; charset=utf-8" />
		<meta name="description" content="" />
		<meta name="keywords" content="" />
		<!--[if lte IE 8]><script src="css/ie/html5shiv.js"></script><![endif]-->
		<script src="js/jquery.min.js"></script>
		<script src="js/skel.min.js"></script>
		
		<noscript>
			<link rel="stylesheet" href="/css/skel.css" />
			<link rel="stylesheet" href="/css/style.css" />
			<link rel="stylesheet" href="/css/style-wide.css" />
			<link rel="stylesheet" href="/css/style-normal.css" />
		</noscript>
		<!--[if lte IE 8]><link rel="stylesheet" href="css/ie/v8.css" /><![endif]-->
        <link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family=Gloria Hallelujah">
        <style>
          body {
            font-family: 'Gloria Hallelujah', serif;
            font-size: 20px;
          }
        </style>
		
	</head>
	<body>
		<?php echo $content_for_layout ?>
		<script src="js/jquery.poptrox.min.js"></script>
		<script src="js/jquery.scrolly.min.js"></script>
		<script src="js/jquery.scrollgress.min.js"></script>
		<script src="js/init.js"></script>

	</body>
</html>