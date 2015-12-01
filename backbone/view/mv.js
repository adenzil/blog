
"use strict";



  var mv = Backbone.View.extend({

model:moviemodel,

    initialize : function(options) {
                  
                  this.render();
                  this.collection = new movielist();
                  this.vent = options.vent;
              },


              render : function(p){


                  var secondtemp = Handlebars.compile($('#secondtemp').html());    
                  var p = moment(this.model.get("created_on")).format('Do MMMM YYYY, h:mm:ss a');
                  $('#MID').append(this.$el.append(secondtemp({ "cs" : "cli", "title" : this.model.get('title'),"tag" : this.model.get('tag'), "date" : p})));
                  var ee=this.model.get('post');
                           this.$("#s").append(secondtemp()).html(ee);

              },


              events : {

                'click #m, #s': 'lo',
              'click #tagbutton' : 'tag'


              },


              lo : function(){
             
               appRouter.navigate("article/"+this.model.get('id'), { trigger: true });
               this.undelegateEvents();

              },


        tag : function(e){
       var lol = this.$el.find("#per_page").val();

         var p=1;

          var t=e.currentTarget.innerText;





        this.collection.func($("#ip").val(),t.trim(),lol,p,function(count, totalPages, currentPage,perPage){
         vent.trigger("umm",count,totalPages, currentPage,perPage);
        });
         
      
        },

            remove: function () {

        return this;
    }

              

  })


