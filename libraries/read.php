<?php 

function mysql_read_blocks_list() {
	global $pdo;
	
	mysql_cxn();
	
	try {
		$stmt = $pdo->prepare("SELECT * FROM blocks WHERE trashed='n'");
		
		$stmt->execute([
		]);

		$data = [];

		while ($row = $stmt->fetch(PDO::FETCH_OBJ)) {
			$data[] = $row;
		}
	}
	catch(PDOException $exception){ 
		echo $exception->getMessage(); 
	}
	
	return $data;
}

function mysql_read_tag_xid($name = '') {
	global $pdo;
	
	mysql_cxn();
	
	try {
		$stmt = $pdo->prepare("SELECT * FROM tag WHERE name=:name && trashed='n'");
		
		$stmt->execute([
			'name' => intval($name)
		]);

		$data = $stmt->fetch(PDO::FETCH_OBJ);
	}
	catch(PDOException $exception){ 
		echo $exception->getMessage(); 
	}
	
	return $data;
}

function mysql_read_all_tags() {
	global $pdo;
	
	mysql_cxn();

	
	try {
		$stmt = $pdo->prepare("SELECT * FROM tag WHERE trashed='n'");
		
		$stmt->execute([
		]);

		$data = [];

		while ($row = $stmt->fetch(PDO::FETCH_OBJ)) {
			$data[] = $row;
		}
	}
	catch(PDOException $exception){ 
		echo $exception->getMessage(); 
	}
	
	return $data;
}


function block_id() {
	global $pdo;
	
	mysql_cxn();
	
	try {
		$stmt = $pdo->prepare("SELECT COUNT(*) FROM blocks");
		
		$stmt->execute([ ]);

		$data = $stmt->fetch();

	}
	catch(PDOException $exception){ 
		echo $exception->getMessage(); 
	}
	
	return $data['COUNT(*)'] + 1;
}

?>
