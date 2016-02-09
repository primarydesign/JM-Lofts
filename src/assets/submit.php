<?php

  if (isset($_POST)) {

    $fname = $_POST["fname"];
    $lname = $_POST["lname"];
    $email = $_POST["email"];
    $phone = $_POST["phone"];
    $comment = $_POST["message"];

    $comment = trim(preg_replace('/\s+/', ' ', $comment));

    $address = "mitchell@primarydesign.com";
    $subject = "New Inquiry from J.M. Lofts";
    $message = "There is a new inquiry from the J.M. Lofts website. Please see the details below:\n";
    $message .= "Name: $fname $lname\n";
    $message .= "Email: $email\n";
    if ($phone !== "") $message .= "Phone: $phone\n";
    if ($comment !== "") $message .= "Message: $comment";

    if (mail($address, $subject, $message)) {
      echo "success";
    }
  }

?>
