"use strict";

  var moviemodel = Backbone.Model.extend({

  initialize : function(id,display){          

             
                 this.render(id,display);

          },

   render : function(id,display){

                          if(display==0)
                              {

                              }


                          if(display==1)
                              {

                                  $("#MID").html('');
                                              //$("#LOW").html('');
                                              $("#top2r").html('');
                                   $.ajax({        
                                            url: 'http://localhost/getarticle.php?article_id='+id,
                                            success:function(data){
                                               var obj=data;

                             
                                                      $('#top2r').html('');

                                      
                             

                                               if(obj.data.length=="0")
                                              {
                                                    $('#MID').html("No such article exists");
                                              }
                                           
                                              var article = Handlebars.compile($('#article').html());

                            var p = moment(obj.data.created_on).format('Do MMMM YYYY, h:mm:ss a');
                             var q = moment(obj.data.updated_on).format('Do MMMM YYYY, h:mm:ss a');

                            $('#MID').append(article({"id" : obj.data._id, "title" : obj.data.title, "created" : p,"updated" : q }));

                            var ee=obj.data.post;
                            $('#po').append(article()).html(ee);

                            var tago = Handlebars.compile($('#tagscript').html());

                            $('#tag').append(tago({"tag" : obj.data.tag}));

                                                }
                                            });
                                            
                                }

                          if(display==2)
                              {

                                              $("#MID").html('');
                                              //$("#LOW").html('');
                                              $("#top2r").html('');

                                                  if(id=='1')
                                            {
                                                var article = Handlebars.compile($('#article_add').html());
                                                 $('#MID').append(article({}));
                                                   $('#summernote').summernote({
                                                                            height: 200,                 // set editor height

                                                                            minHeight: 200,             // set minimum height of editor
                                                                            maxHeight: 200,             // set maximum height of editor

                                                                            focus: true,                 // set focus to editable area after initializing summernote
                                                                          }); 

                                                     

                                                  
                                            }
                                            else{
                                               
                                                     $.ajax({        
                                                              url: 'http://localhost/getarticle.php?article_id='+id,
                                                              success:function(data){
                                                                 var obj=data;

                                               
                                                                        $('#top2r').html('');

                                                                 if(obj.data.length=="0")
                                                                {
                                                                      $('#MID').html("No such article exists");
                                                                }
                                                             
                                                                 var article = Handlebars.compile($('#article_add').html());
                                                                

                                               var p = moment(obj.data.created_on).format('Do MMMM YYYY, h:mm:ss a');
                             var q = moment(obj.data.updated_on).format('Do MMMM YYYY, h:mm:ss a');
                                 
                                    

                                                                 $('#MID').append(article({"id" : obj.data._id, "title" : obj.data.title, "tag" : obj.data.tag, "created" : p,"updated" : q }));


                                                                  $('#summernote').summernote({
                                                                            height: 200,                 // set editor height

                                                                            minHeight: 200,             // set minimum height of editor
                                                                            maxHeight: 200,             // set maximum height of editor

                                                                            focus: true,                 // set focus to editable area after initializing summernote
                                                                          }); 

                                                              $('#summernote').code(obj.data.post);

                                                               $("#tag").select2({
                                                                                    tags : [""],
                                                                                    tokenSeparators  : [",", " "]
                                                                                  });

                                                                  }
                                                              });  
                                             }


    }  
        },

            remove: function () {
        this.undelegateEvents();
        return this;
    },

   


  });


        function RestServiceJs(newurl,data,type,callback) {  


        $.ajax({  
              url : newurl,
              data: JSON.stringify(data),
               type : type, 
              contentType: 'application/json',
              success:function(data){
                callback(data);
              },
              error:function(data){
                alert(JSON.stringify(data.responseJSON));
              }
           });  

}       



  function Rest(newurl,type,callback) {  


        $.ajax({  
              url : newurl,
               type : type, 
              contentType: 'application/json',
              success:function(data){
                callback(data);
              },
              error:function(data){
                alert(JSON.stringify(data.responseJSON));
              }
           });  

}       