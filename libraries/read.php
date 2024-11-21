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

function mysql_read_tag_xid($tag_id = 0) {
	global $pdo;
	
	mysql_cxn();
	
	try {
		$stmt = $pdo->prepare("SELECT * FROM tag WHERE tag_id=:tag_id && trashed='n'");
		
		$stmt->execute([
			'tag_id' => intval($tag_id)
		]);

		$data = $stmt->fetch(PDO::FETCH_OBJ);
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
