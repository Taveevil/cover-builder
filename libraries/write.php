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


/* mysql_write_new_block_tag: 
Create a block_tag in the database
*/
function mysql_write_new_block_tag($block_id = '', $tag_id = '') {
	global $pdo;
	
	mysql_cxn();
	
	try {
		$sql = "INSERT INTO block_tags (block_id, tag_id) VALUES (:block_id, :tag_id)";

		$pdo->prepare($sql)->execute([
			'block_id' => $block_id,
			'tag_id' => $tag_id
		]);

		$id = $pdo->lastInsertId();
	}
	catch(PDOException $exception){ 
		echo $exception->getMessage(); 
	}	
	
	return $id;
}

?>