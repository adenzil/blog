
"use strict";



var addview = Backbone.View.extend({
   
   el : $("#proj"),  
      
      initialize: function () {
        
     this.render();
          
      },

      events : {
      		'click #add' : 'adds',
          'click #update' : 'up'
      },

      render: function () {
         var p=this.model.get('id');

if(typeof p==='undefined')
{
    
      this.$el.find('#LOWR').html("");
            var add = Handlebars.compile($('#add').html());
   this.$el.find('#LOWR').html(add({}));
   this.$el.find('#LOWL').html("");


 $("#tag").select2({
                      tags : [""],
                      tokenSeparators  : [",", " "]
                    });


}
else{

   this.$el.find('#LOWR').html("");
            var update = Handlebars.compile($('#update').html());
   this.$el.find('#LOWR').html(update({}));
   this.$el.find('#LOWL').html("");
   
   $('select').select2();
  $("#tag").select2({
                  tags: true,
                  tokenSeparators: [',', ' ']
    });
 }
  

      },



      // model: new addmodel({
      //       url: this.url
      //   }),

 

      adds : function(){

         function a()
              {
                        alert("Successful");
                             
                                appRouter.navigate("home", { trigger: true });

                        }

                        var sHTML = $('#summernote').code();
              
              var data = {title:this.$el.find('#title').val(), post:sHTML, tag:this.$el.find('#tag').val().split(",")};
              
              
        RestServiceJs('https://github.com/adenzil/blog/tree/gh-pages/articles.php',data,"POST",a);  
        
      },

      up : function(){


     this.model.set({update: 1});

          var id= this.$el.find("#id")[0].innerText;
function a()
              {
                    alert("succesful");    
  appRouter.navigate("article/"+id, { trigger: true });
                        }
 var sHTML = $('#summernote').code();
 var data = {title:this.$el.find("#title")[0].value, post:sHTML, tag:this.$el.find('#tag').val().split(",")};

 RestServiceJs('https://github.com/adenzil/blog/tree/gh-pages/put.php?article_id='+id,data,"PUT",a);  

 
         this.undelegateEvents();
                     
                
            },

            remove: function () {
        //this.$el.empty(); 
       this.undelegateEvents();
        return this;
    }
  });


