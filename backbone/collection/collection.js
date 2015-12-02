"use strict";

var localVariable;
var count=0;

  var movielist = Backbone.Collection.extend({
       

    initialize : function(){  

         },

         func : function(q,tag,per_page,pg_no,callback){
                       
                      var that = this;
                       var pg_no =pg_no;
                      var per_page =per_page;
                      var dat = null;


    
                    $("#MID").html("");


                        if(tag!="")
                        { 
                           $("#iptag").show();

                            for (var i=0; i<count; i++)
                                  {
                                     if(tag == $("#enclose"+i).children("div").attr("id"))
                                     {
                                      tag=" ";
                                     }
                                  }


                           if(tag == " ")
                           { 
                              str='';
                             
                             
                                  for (var i=0; i<count; i++)
                                  {  
                                   if(typeof $("#enclose"+i).children("div").attr("id") === 'undefined')
                                   {
                                     
                                   }
                                   else{
                                      str += '&tag[]='+$("#enclose"+i).children("div").attr("id");
                                   }

                                  }
                           }
                            
                            else{

                          var enclose = document.createElement('div');
                          enclose.id = "enclose"+count;
                          enclose.className = "en"; 
                          enclose.data=tag;
                          

                          var innerDiv = document.createElement('div');
                          innerDiv.id = tag;


                          var but = document.createElement('button');
                          but.id = "cancel";
                          but.className = tag;
                          but.innerHTML="X";

                          enclose.appendChild(innerDiv);
                          enclose.appendChild(but)

                          var div = document.getElementById('iptagdata');
                          div.appendChild(enclose);
                            $("#"+tag).text(tag);
                             count++;
                             var l = $("div[id^=enclose]").length; 
                           
                           var str = '';
                           for (var i=0; i<count; i++)
                           {
                                  if(typeof $("#enclose"+i).children("div").attr("id") === 'undefined')
                                   {
                                     
                                   }
                                   else{
                                      str += '&tag[]='+$("#enclose"+i).children("div").attr("id");
                                   }
                           }

                          }



                          
                         
                            
                             Rest('http://adenzil.github.io/blog/ap.php?action=get_page&per_page='+per_page+'&page='+pg_no+'&query='+q + str,"GET",a);  
  
                            
                         
                        }

                        else{
                              count=0;
                            Rest('http://adenzil.github.io/blog/ap.php?action=get_page&per_page='+per_page+'&page='+pg_no+'&query='+q + '&tag='+tag,"GET",a);  
                            
                        }
                       
                      
                     
        function a(data)
              {
                    var obj=data;
                     if(obj.data.articles.length=="0")
                    {
                          
                          $('#MID').html("<h1 align=\"center\">No matching values found</h1>");
                    }


                     for (var q=0; q<obj.data.articles.length; q++)
                                {
                                  var display=0;
                                  var a=new moviemodel(obj.data.articles[q],obj.data.pagination[q],display);
                                 
                                    var movieview1 = new mv({model : a, vent: vent});  
                          }

                callback(obj.data.pagination.count,obj.data.pagination.total_pages,obj.data.pagination.current_page,obj.data.pagination.per_page);

              }
               

 
       
       
          }


      });