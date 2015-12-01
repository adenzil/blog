<?php

	$m = new MongoClient();
   $db = $m->mydb;														//connect to db
   $collection = $db->mycol;
   header('Content-Type: application/json');

if (isset($_GET["article_id"]) && !empty($_GET["article_id"]))				//chechk for article id
{
	$b=$_GET["article_id"];
	$ab =array('_id' => new MongoId($b));
	if($item = $collection->findOne($ab))									//check if article is present in db
		{
			$item["_id"] = $b;
			exit(json_encode(array("data" => $item)));
		}
	else  																	//else display error
	{
		http_response_code(422); 
		exit(json_encode(array("error" => "Article does not exist")));
	}
}

?>