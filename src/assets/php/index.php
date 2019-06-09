<?php
	header('Access-Control-Allow-Origin: *');
	header('Access-Control-Allow-Credentials: true');
	
	include 'send-mail.php';

	if(isset($_POST)) {
		// Отправка на E-mail
		sendMail($_POST);
	}
?>