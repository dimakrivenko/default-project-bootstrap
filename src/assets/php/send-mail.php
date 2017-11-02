<?php
	include "class.phpmailer.php";

	if(!empty($_POST['name'])) { $message_text .= "<p><b>Имя : </b>".$_POST['name']."</p>"; }
	if(!empty($_POST['phone'])) { $message_text .= "<p><b>Телефон : </b>".$_POST['phone']."</p>"; }

	$subject = "Новая заявка с сайта - Default project"; // Тема письма
	$send_email = "wen2333@gmail.com";
	$message_body = "
		<h2>".$subject."</h2>".$message_text;

	$mail = new PHPMailer();
	$mail->CharSet = 'UTF-8';
	$mail->From = $_POST['name'];
	$mail->FromName = $_POST['name'];
	$mail->AddAddress($send_email);
	$mail->IsHTML(true);
	$mail->Subject = $subject;

	// Вложенные файлы
	// foreach ($_FILES as $key => $value) {
	// 	if ($value['error'] === 0) {
	// 	   $mail->AddAttachment($value['tmp_name'], $value['name']);
	// 	}
	// }

	$mail->Body = $message_body;
	$mail->Send();
?>
