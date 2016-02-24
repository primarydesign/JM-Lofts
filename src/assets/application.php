<?php

  if (isset($_POST)) {

    $submission = $_POST;

    $address = "niko@primarydesign.com";
    $subject = "New Application from J.M. Lofts";
    $content = "There is a new application from the J.M. Lofts website. Please see the details below:</br>";

    foreach($submission as $fieldset => $fields) {
      $legend = str_replace('_', ' ', $fieldset);
      $content .= "</br><b>$legend</b></br>";
      foreach($submission[$fieldset] as $field => $value) {
        $fieldname = str_replace('_', ' ', $field);
        $fieldvalue = $value ?: "N/A";
        $content .= "$fieldname: $fieldvalue</br>";
      }
    }

    $message = "<html><body>$content</body></html>";
    $headers  = 'MIME-Version: 1.0' . "\r\n";
    $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";

    if (mail($address, $subject, $message, $headers)) {
      echo "success";
    }
  }

?>