<?php 

// ##################################################################### //
// ####################### MY SQL READ FUNCTIONS ####################### //
// ##################################################################### //


// ##################################################################### //

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

// ##################################################################### //


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

// ##################################################################### //


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

// ##################################################################### //

function mysql_read_all_presets() {
	global $pdo;
	
	mysql_cxn();

	
	try {
		$stmt = $pdo->prepare("SELECT * FROM preset WHERE trashed='n'");
		
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

// ##################################################################### //

function mysql_read_preset_by_id($preset_id = 0) {
	global $pdo;
	
	mysql_cxn();

	
	try {
		$stmt = $pdo->prepare("SELECT * FROM preset WHERE preset_id=:preset_id && trashed='n'");
		
		$stmt->execute([
			'preset_id' => intval($preset_id)
		]);

		$data = $stmt->fetch(PDO::FETCH_OBJ);
	}
	catch(PDOException $exception){ 
		echo $exception->getMessage(); 
	}
	
	return $data;
}

// ##################################################################### //

function mysql_read_block_by_id($block_id = 0) {
	global $pdo;
	
	mysql_cxn();

	
	try {
		$stmt = $pdo->prepare("SELECT * FROM blocks WHERE block_id=:block_id && trashed='n'");
		
		$stmt->execute([
			'block_id' => intval($block_id)
		]);

		$data = $stmt->fetch(PDO::FETCH_OBJ);
	}
	catch(PDOException $exception){ 
		echo $exception->getMessage(); 
	}
	
	return $data;
}


?>
