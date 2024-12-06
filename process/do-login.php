<?php

// Include our libraries
include '../libraries/config.php';
include '../libraries/functions.php';
include '../libraries/read.php';
include '../libraries/write.php';


// If session exists, send the user to the homepage
// if (is_logged_in()) {
// 	header('Location: '.$site['url_home']);
// 	die();
// }


// Clean data passed from form POST
$rqst = rqst($_POST);
// If they submitted the form with an empty email adress field... 
if (!empty($rqst['username'])) {
	// They entered something in the email address field
	
	// Grab the data we need
	$login_user = mysql_read_user_by_name($rqst['username']);

	// Check if user found 
	if ($login_user) {



		// Check if password matches
		if (password_verify($_POST['password'], $login_user->password)) {


			// Password is correct, so create a session
			$_SESSION['user_id'] = $login_user->user_id;

			// Send logged in user to home page
			header('Location: '.$site['url']);
			die();
		}


		// Password was wrong, so send them back with an error message
		header('Location: '.$site['url'].'/?login_error=password');
		die();
	}

	// User's email address wasn't found in the database
	header('Location: '.$site['url'].'/?login_error=user');
	die();
}


// Kick them out...
header('Location: '.$site['url'].'/?login_error=blank');
die();

?>