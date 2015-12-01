<?php

error_reporting(0);


function get_page_by_id($page, $per_page, $query, $tag)
{
  
$result=array();

for($i=0;$i<count($tag);$i++)
{
  array_push($result,array("tag"=>$tag[$i]));
}

$fin=$result;


// print_r($fin);print_r($result); print_r($tag); 
  if(!is_numeric($page) || $page<1)
  {
   $page=1;                                             //changes input to default value
  }

  if(!is_numeric($per_page) || $per_page<1 )
   {
      $per_page=10;                                     //changes input to default value
   }

   $page_info = array();
  
   $m = new MongoClient();  
   $db = $m->mydb;                                      //connecting to db
   $collection = $db->mycol;

  
    $i =(($page-1)*$per_page);                          //setting per page limit
    


    if(isset($_GET["query"]) && !empty($_GET["query"]) && (!isset($_GET["tag"]) || (isset($_GET['tag']) && empty($_GET["tag"]))))           //only query
    {
      $value = new MongoRegex("/$query/i");
      $cursor = $collection->find(array('$or' => array( array('title' => $value),  array('post' => $value))))->skip($i);
    }

    elseif (isset($_GET["tag"]) && !empty($_GET["tag"]) && (!isset($_GET["query"]) || (isset($_GET['query']) && empty($_GET["query"]))))      //only tag
    {
           $cursor = $collection->find(array('$and'=>$fin))->skip($i);
    }

    elseif (isset($_GET["tag"]) && !empty($_GET["tag"]) && isset($_GET["query"]) && !empty($_GET["query"]))
    {
      $value = new MongoRegex("/$query/i");

           $cursor = $collection->find(array('$and' => array( array('$or' => array(array('title' => $value),  array('post' => $value))), array('$and' => $fin))))->skip($i);
      
    }

    else
    {
      $cursor = $collection->find()->skip($i);
    }

 
    $v=$cursor->count();
    $total_pages=ceil($v/$per_page);                    //calculating total pages
    $cursor->limit($per_page);
    $cursor->sort(array('updated_on' => -1));

    foreach ($cursor as $document) {                    //looping through all data for current page

      $t=substr($document["title"], 0, 22);
      $p=substr($document["post"], 0, 97);
      if(strlen($t)==22)
      {
        $t=$t."...";
      }                                                 //setting display limit for title and post
      if(strlen($p)==97)
      {
        $p=$p."...";
      } 

     array_push($page_info, array("id" => $document["id"].$document["_id"],"title" => $t, "post" => $p, "tag" => $document["tag"], "created_on" => $document["created_on"], "updated_on" => $document["updated_on"]));
    }
  
  return array("articles" => $page_info, "pagination"=> array("count"=>intval($v), "current_page"=> intval($page), "total_pages" => intval($total_pages), "per_page"=> intval($per_page)));
return $tag;
}




$possible_url = array( "get_page","query","tag");                                     //listening to all possible url accepted

$value = "An error has occurred";

if (isset($_GET["action"]) && in_array($_GET["action"], $possible_url))
{


  foreach($_GET as $name=>$val)
{

}

  switch ($_GET["action"])
    {
        case "get_page":
                    if (isset($_GET["page"]) and isset($_GET["per_page"]) and !empty($_GET["page"]) and !empty($_GET["per_page"]))
                     {
                        if (isset($_GET["query"]) or isset($_GET["tag"]))
                        {
                          if(isset($_GET["tag"]) and !isset($_GET["query"]))
                            {
                              $value = get_page_by_id($_GET["page"],$_GET["per_page"],false,$val);   
                            }
                          elseif (isset($_GET["query"]) and !isset($_GET["tag"]))
                          {
                              $value = get_page_by_id($_GET["page"],$_GET["per_page"],$_GET["query"],false);
                            }
                          else
                          {
                           $value = get_page_by_id($_GET["page"],$_GET["per_page"],$_GET["query"],$val);
                          }
                        }
                        else
                          {
                              $value = get_page_by_id($_GET["page"],$_GET["per_page"],false,false);
                          }
                    }
                    else   
                    {
                      if(!isset($_GET["page"]) || empty($_GET["page"])) {$a=1;}
                      else { $a=$_GET["page"];}

                      if(!isset($_GET["per_page"]) || empty($_GET["per_page"])) {$b=10;}
                      else { $b=$_GET["per_page"];}

                      if (isset($_GET["query"]) or isset($_GET["tag"]))
                        {
                          if(isset($_GET["tag"]) and empty($_GET["query"]))
                            {
                              $value = get_page_by_id($a,$b,flase,$val);   
                            }
                          elseif (isset($_GET["query"]) and empty($_GET["tag"]))
                          {
                              $value = get_page_by_id($a,$b,$_GET["query"],false);
                            }
                          elseif (isset($_GET["query"]) and isset($_GET["tag"]))
                          {
                             $value= get_page_by_id($a, $b, $_GET["query"],$val);
                          }
                        }
                        else
                          {
                              $value = get_page_by_id($a,$b,false,false);
                          }    
                      
                    }




                    break;

        default :
        	echo "database empty";
    }
}
  header('Content-Type: application/json');
exit(json_encode(array("data" => $value)));
?>