


"use strict";



var viewarticle = Backbone.View.extend({
  
     el : $("#proj, #bottomrow") ,
      initialize: function () {
        this.collection = new movielist();
          this.render();
      },
      
          events : {
              'click #edit' : 'edi',
              'click #delete' : 'del',
              'click #tagbutton' : 'tag'

          },
      render: function () {
          this.$el.find("#MID").html("");
           this.$el.find("#LOWL").html("");
             this.$el.find("#LOWR").html("");


           var source = $("#edit").html();
               var template = Handlebars.compile(source);
               var context = {};
               var  html = template(context);
               this.$el.find("#LOWR").html(html);

        var source1 = $("#delete").html();
               var template1 = Handlebars.compile(source1);
               var context1 = {};
               var  html1 = template1(context1);
               this.$el.find("#LOWL").html(html1);

          
      },

        edi : function(){
        	 
        	//$("#LOWR").html('');
			appRouter.navigate("add/"+this.$el.find("#id")[0].innerText, { trigger: true });
this.undelegateEvents();

        },

        
        del : function(){

           var id = this.$el.find("#id")[0].innerText;

function a()
              {
               alert("deleted successfully");         
appRouter.navigate("home", { trigger: true });
                        }

 var data = {};

 RestServiceJs('http://localhost/delete.php?article_id='+id,data,"DELETE",a);  
  

 this.undelegateEvents();
 
        },

        tag : function(e){
          
          var t=e.currentTarget.innerText;
          var m =new moviemodel(e.currentTarget.innerText);
          m.set('t',t)
         this.currentView = new inputview({model : m});
                
        },

            remove: function () {
        //this.$el.empty(); 
        this.undelegateEvents();
        return this;
    }
  });






