<?php

	$m = new MongoClient();
   $db = $m->mydb;														//connecting to db
   $collection = $db->mycol;
   header('Content-Type: application/json');
   error_reporting(0);

if (isset($_GET["article_id"]) && !empty($_GET["article_id"]))				//checks for id in URL
{
		
	   $b=$_GET["article_id"];
	   $document=array();
	   $value=array();

		 
		if($entityBody = file_get_contents('php://input'))
				{
					   $a=json_decode($entityBody,true);
					   $i=0;



					   if(isset($a['title']) && isset($a['post'])&& !empty($a['title']) && !empty($a['post']))													//condition for raw data
					   {
						   	$data = array("title" => $a["title"],"post" => $a["post"] ,"updated_on" => date(DATE_ISO8601, (new MongoDate())->sec));
							if(!empty($a['tag']))
								   {
									 	$data["tag"]=$a['tag'];
									  	array_push($data,array("tag" => $tag));
									}
							$i++;
							$collection->findAndModify(array("_id" => new MongoId($b)),array('$set' => $data));
								
						}																			


						$x=explode("WebKitFormBoundary", $entityBody);					//dividing raw data to check type of input
						

						if(count($x)>1)													//condition for form input
						{	
							$i=3;
							$boundary = substr($entityBody, 0, strpos($entityBody, "\r\n"));
							$oh=array();
							$dataa = array();
							$re=0;
																								// Fetch each part
							$parts = array_slice(explode($boundary, $entityBody), 1);
							$data = array();
							foreach ($parts as $part)
							{
							   																	 // If this is the last part, break
							    if ($part == "--\r\n") break; 
							    																// Separate content from headers
							    $part = ltrim($part, "\r\n");
							    list($raw_headers, $body) = explode("\r\n\r\n", $part, 2);
							    																// Parse the headers list
							    $raw_headers = explode("\r\n", $raw_headers);
							    $headers = array();

							    foreach ($raw_headers as $header)
							    {
							        list($name, $values) = explode(':', $header);
							        $headers[strtolower($name)] = ltrim($values, ' '); 
							    } 
							    																// Parse the Content-Disposition to get the field name, etc.
							    if (isset($headers['content-disposition']))
							    {
							        $filename = null;
							        preg_match(
							            '/^(.+); *name="([^"]+)"(; *filename="([^"]+)")?/', 
							            $headers['content-disposition'], 
							            $matches
							        );
							        list(, $type, $name) = $matches;
							        isset($matches[4]) and $filename = $matches[4]; 
							        															// handle your fields here
							        switch ($name) {
							            														// this is a file upload
							            case 'userfile':
							                 file_put_contents($filename, $body);
							                 break;
							            														// default for all other files is to populate $data
							            default: 
								            	$body=substr($body,0, strlen($body) - 2);
								                if ($name=="title")
								                	{
													    if($body=="")
						    								{
						    										err("title cannot be blank");
						    								}
						    							$t=$body;
						    							$i--;
								                	}
								                if ($name=="post")
								                	{
													    if($body=="")
						    								{
						    										err("post cannot be blank");
						    								}
						    							$po=$body;
						    							$i--;
								                	}
								                else if ($name=="tag[]") 
				    								{
				    									$re++;
				    									array_push($oh,$body);
				    								}
							                	 break;
							        } 
							    }
							}
							$dataa = array("title" => $t,"post" => $po ,"updated_on" => date(DATE_ISO8601, (new MongoDate())->sec));
							if($re>0)
								{
									$dataa = array("title" => $t,"post" => $po ,"tag" => $oh,"updated_on" => date(DATE_ISO8601, (new MongoDate())->sec));
								}
							$collection->findAndModify(array("_id" => new MongoId($b)),array('$set' => $dataa));
						}



						if(empty($a['title']) && empty($a['post']) &&count($x)==1)					//condition for url encoded form
						 {
							$urlform = explode("&", $entityBody);
							$data=array();
							$oh=array();
							$re=0;
							$i=3;
							for ($x = 0; $x <= count($urlform); $x++)				//loop through data and check type of input
							{
								$p=explode("=", $urlform[$x]);
								if($p[0]=="title")
    								{
    									if($p[1]=="")
    										{
	    										err("title cannot be blank");
	    									}
    										$t=urldecode($p[1]);
    										$i--;
    								}

    							else if ($p[0]=="post") 
									{
    									if($p[1]=="")
    										{
    											err("post cannot be blank");
    										}
    									$pt=urldecode($p[1]);
    									$i--;
									}

    							else if ($p[0]=="tag%5B%5D") 
									{
    									$re++;
    									array_push($oh,urldecode($p[1]));
									}
		
								}
								
								$data = array("title" => $t,"post" => $pt ,"updated_on" => date(DATE_ISO8601, (new MongoDate())->sec));
								if($re>0)
								{
									$data = array("title" => $t,"post" => $pt ,"tag" => $oh,"updated_on" => date(DATE_ISO8601, (new MongoDate())->sec));
								}

							
							$collection->findAndModify(array("_id" => new MongoId($b)),array('$set' => $data));
						}


						if($i==1)										//sucessfull modified, display new output
						{
							$ab =array('_id' => new MongoId($b));

							if($item = $collection->findOne($ab))			//if article found
								{
									$item["_id"] = $b;
			    					exit(json_encode(array("data" => $item)));
			    				}

			    			else
			    				{
			    					err("article does not exist");
			    				}
	    				}

	    				else
	    				{
	    					err("title and post are compulsary");
	    				}
				}

		else {
			err("enter new value");
		}	 

}


else {
	err("URL NOT SET");
}

function err($l)														//catches all error
{
	http_response_code(422);   
	exit(json_encode(array("error_message" => $l)));
}

?>