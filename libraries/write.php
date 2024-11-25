<?php 

function mysql_write_new_block($name = '', $copy = '', $tags = '') {
	global $pdo;
	
	mysql_cxn();
	
	try {
		$sql = "INSERT INTO blocks (name, copy, tags) VALUES (:name, :copy, :tags)";

		$pdo->prepare($sql)->execute([
			'name' => $name,
			'copy' => $copy,
			'tags' => $tags
		]);

		$id = $pdo->lastInsertId();
	}
	catch(PDOException $exception){ 
		echo $exception->getMessage(); 
	}	
	
	return $id;
}

function mysql_update_block($block_id = 0,$name = '', $copy = '', $tags = '') {
	global $pdo;
	
	mysql_cxn();
	
	try {
		$sql = "UPDATE blocks SET name=:name, copy=:copy, tags=:tags WHERE block_id=:block_id";

		$pdo->prepare($sql)->execute([
			'block_id' => intval($block_id),
			'name' => $name,
			'copy' => $copy,
			'tags' => $tags
		]);

	}
	catch(PDOException $exception){ 
		echo $exception->getMessage(); 
	}	
	return true;
}

// This function deletes the block from the database
function mysql_delete_block($block_id = 0){
	global $pdo;

	mysql_cxn();

	try{
		$sql = "UPDATE blocks SET trashed='y' WHERE block_id=:block_id";
		
		$pdo->prepare($sql)->execute([
			'block_id' => intval($block_id)
		]);

	}catch(PDOException $exception){
		echo $exception->getMessage(); 
	}

	return true;

}

// This function deletes the block from the database
function mysql_delete_tag($tag_id = 0){
	global $pdo;

	mysql_cxn();

	try{
		$sql = "UPDATE tag SET trashed='y' WHERE tag_id=:tag_id";
		
		$pdo->prepare($sql)->execute([
			'tag_id' => intval($tag_id)
		]);

	}catch(PDOException $exception){
		echo $exception->getMessage(); 
	}

	return true;

}

function mysql_write_new_tag($name = '') {
	global $pdo;
	
	mysql_cxn();
	
	try {
		$sql = "INSERT INTO tag (name) VALUES (:name)";

		$pdo->prepare($sql)->execute([
			'name' => $name,
		]);

		$id = $pdo->lastInsertId();
	}
	catch(PDOException $exception){ 
		echo $exception->getMessage(); 
	}	
	
	return $id;
}

function mysql_update_tag($tag_id = 0,$name = '') {
	global $pdo;
	
	mysql_cxn();
	
	try {
		$sql = "UPDATE tag SET name=:name WHERE tag_id=:tag_id && trashed='n'";

		$pdo->prepare($sql)->execute([
			'tag_id' => intval($tag_id),
			'name' => $name,
		]);

	}
	catch(PDOException $exception){ 
		echo $exception->getMessage(); 
	}	
	return true;
}

?>