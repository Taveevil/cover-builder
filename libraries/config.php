<?php 
//
/* 
!IMPORTANT -- ERROR REPORTING
Turn off before pushing this site to production
*/
ini_set('display_errors', 'On'); //'Off');
error_reporting(E_ALL ^ E_NOTICE);
// Please leave the above lines in this file for marking


$hostname = 'https://'.getenv('HTTP_HOST');
$user_agent = getenv("HTTP_USER_AGENT");


if (str_contains($hostname,'localhost')){
	if(strpos($user_agent, "Win") !== FALSE){
		$os = "Windows";
		$hostname = 'http://localhost/cover-builder';

	}
	elseif(strpos($user_agent, "Mac") !== FALSE){
		$os = "Mac";
		$hostname = 'http://localhost:8888/cover-builder';
	}
}

// Main site details
$site = [];

$site['name'] = 'Cover Letter Builder';
$site['title'] = '';
$site['url'] = $hostname;
$site['url_home'] = $site['url'];
$site['url_search'] = $site['url'].'/search.php?s=';
$site['url_template'] = $site['url'].'/template';
$site['url_content'] = $site['url'].'/content';
$site['url_process'] = $site['url'].'/process';
$site['url_cover_letters'] = $site['url_template'].'/pagelets/cover_letters/';

$site['general_email'] = 'hello@tavee.ca';



// Database connection 
function mysql_cxn() {
	global $pdo;
	
	if (!$pdo) {
		$host = 'localhost';
		$port = '3306';
		$db   = 'tavedmol_cl_builder';
		$user = 'tavedmol_cl_builder';
		$pass = 'HlsSvbRk)/7h5b[F';
		$charset = 'utf8mb4';

		$dsn = "mysql:host=$host;port=$port;dbname=$db;charset=$charset";
		
		$options = [
			PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
			PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
			PDO::ATTR_EMULATE_PREPARES   => false,
		];
		
		try {
			$pdo = new PDO($dsn, $user, $pass, $options);
		} 
		catch (\PDOException $e) {
			throw new \PDOException($e->getMessage(), (int)$e->getCode());
		}
	}
	
	return $pdo;
}


// Session stuff
session_start();

if(!isset($__SESSION['user_id']) || $_SESSION['user_id'] !== 1){
	$_SESSION['user_id'] = 2;
}

if ($_SESSION && $_SESSION['user_id']) {
    // If user is logged in, grab their profile information and avatar so it's always available
	mysql_cxn();
	
	try {
		$stmt = $pdo->prepare("SELECT * FROM users WHERE user_id=:user_id && trashed='n'");
		$stmt->execute(['user_id' => intval($_SESSION['user_id'])]);

		$user = $stmt->fetch(PDO::FETCH_OBJ);

	}
	catch(PDOException $exception){ 
		echo $exception->getMessage(); 
    }
	
    // Set the logo and home links to index.php instead of index.php
	$site['url_home'] = $site['url'].'/index.php';
    
    // Can access this user's info anywhere in the global $user object
}


// Critical functions we've written ourselves
function is_logged_in() {
    if ($_SESSION && $_SESSION['user_id']) {
        return true;
    }
    
    return false;
}

?>