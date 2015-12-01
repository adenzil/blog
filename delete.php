<?php

	$m = new MongoClient();
   $db = $m->mydb;
   $collection = $db->mycol;												//connect to db
   header('Content-Type: application/json');

if (isset($_GET["article_id"]) && !empty($_GET["article_id"]))				//check for article id
{
	$b=$_GET["article_id"];
	$ab =array('_id' => new MongoId($b));
	$collection->remove(array("_id" => new MongoId($b)));					//delete element
	exit(json_encode(array("message" =>"deleted sucessfully")));
}

?>



