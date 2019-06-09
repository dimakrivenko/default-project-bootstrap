<?php
	include "libs/class.phpmailer.php";

	function sendMail ($post) {
		$send_email = "zip557@yandex.ru";

		$subject = 'Новая заявка с сайта: Default Project';
		$message_text = '<h3>' . $subject . '</h3>';

		if(!empty($post['name'])) { $message_text .= "<p><b>Имя : </b>".htmlspecialchars($post['name'])."</p>"; }
		if(!empty($post['phone'])) { $message_text .= "<p><b>Телефон : </b>".htmlspecialchars($post['phone'])."</p>"; }
		if(!empty($post['email'])) { $message_text .= "<p><b>E-mail : </b>".htmlspecialchars($post['email'])."</p>"; }

		$mail = new PHPMailer();
		$mail->CharSet = 'UTF-8';
		$mail->From = 'Default Project';
		$mail->FromName = 'Default Project';
		$mail->AddAddress($send_email);
		$mail->IsHTML(true);
		$mail->Subject = $subject;

		$mail->Body = $message_text;
		$mail->Send();
	}
