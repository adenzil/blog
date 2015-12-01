<?php
$m = new MongoClient();
   $db = $m->mydb;
   $collection = $db->mycol;                              //connecting to db
   $value = array();
   header('Content-Type: application/json');
   error_reporting(0);
   $entityBody = file_get_contents('php://input');         //getting input from body
   $a=json_decode($entityBody,true);
   
 
$i==0;

if($entityBody = file_get_contents('php://input') && !isset($_POST['title']) && !isset($_POST['post']))
{
                            if(empty($a['title']) or empty($a['post']))
                                     {
                                        err("title and post field are compulsary");
                                     }
                            $document=array("title"=>$a['title'],"post"=>$a['post'],"tag"=>$a['tag'],"created_on"=>date(DATE_ISO8601, (new MongoDate())->sec),"updated_on"=>date(DATE_ISO8601, (new MongoDate())->sec));
                            $i++; 
}


else{
                            if(empty($_POST['title']) or empty($_POST['post']))
                           {           
                               err("title and post field are compulsary");
                           }
                          $document=array("title"=> $_POST['title'],"post"=>$_POST['post'],"tag"=>$_POST['tag'],"created_on"=>date(DATE_ISO8601, (new MongoDate())->sec),"updated_on"=>date(DATE_ISO8601, (new MongoDate())->sec));
                          $i++;
          
}


if($i==1){
               $collection->insert($document);
               $cursor = $collection->find();
               $v= $cursor->count();
               $v--;     
                                                //Displaying the latest element inserted
               $cursor = $collection->find()->skip($v);
               foreach ($cursor as $document)
               {
                  array_push($value, array("id" => $document["id"].$document["_id"],"title" => $document["title"], "post" => $document["post"], "tag" => $document["tag"], "created_on" => $document["created_on"], "updated_on" => $document["updated_on"]));
                }
            exit(json_encode(array("data" => $value[0])));
}


else {
               err("no new element created");
}



function err($l)
{
  http_response_code(422);   
  exit(json_encode(array("error_message" => $l)));
}

?>