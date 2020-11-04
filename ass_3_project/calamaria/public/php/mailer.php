<?php
   if(isset($_POST['submit']) && !empty($_POST['submit'])){
      $botcheck = htmlspecialchars(stripslashes(trim($_POST['botcheck'])));
      $email = htmlspecialchars(stripslashes(trim($_POST['email'])));
      $message = htmlspecialchars(stripslashes(trim($_POST['message'])));
      $error = "";

      if (!ctype_alnum($botcheck) || ($botcheck != "four" && $botcheck != "4")) {
         $error .= "Try again to solve that equation.";
      }
      if (!preg_match("/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/", $email)) {
         $error .= "Invalid e-mail address.";
      }
      if (strlen($message) === 0) {
         $error .= "Your message should not be empty.";
      }

      if (strlen($error) === 0) {
         $to = 'dennishagg@gmail.com';
         $body = "E-mail: $email\nMessage:\n$message";
         $subject = "Message from Calamaria of Borneo website";
         $headers = array(
            'From' => 'Calamaria of Borneo <noreply@calamariaofborneo.com>',
            'Reply-To' => $email,
            'X-Mailer' => 'PHP/' . phpversion()
         );
         if (mail($to, $subject, $body, $headers)) {
            echo 'Message sent';
         }
         else {
            echo 'An error occurred, please try again later.';
         }
      }
      else {
         echo $error;
      }
   }

?>