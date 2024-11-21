<?php 



// Database connection 
function mysql_cxn() {
	global $pdo;
	
	if (!$pdo) {
		$host = 'localhost';
		$port = '3306';
		$db   = 'cl_builder';
		$user = 'cl_builder';
		$pass = 'M@9gU(Osh9hiYLkp]j)M';
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


?>