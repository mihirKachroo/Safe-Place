<?php
// Check for empty fields
if(empty($_POST['name']) || empty($_POST['email']) || empty($_POST['phone']) || empty($_POST['message']) || !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
  http_response_code(500);
  exit();
}

$name = strip_tags(htmlspecialchars($_POST['name']));

// Create the email and send the message
$to = "yourname@yourdomain.com";

if(!mail($to, $subject, $body, $header))
  http_response_code(500);
?>
