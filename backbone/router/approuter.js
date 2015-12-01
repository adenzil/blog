"use strict";

var AppRouter = Backbone.Router.extend({
        


      routes: { 

          '': 'homeRoute',
          'home': 'homeRoute',
          'about': 'aboutRoute',
          'article/:id': 'article',
          'add/:id' : 'add',         
          'add' : 'add'         
      },
      homeRoute: function () {
                   
           if(this.currentView){
            this.currentView.remove();
           
           }
       
           var oh=new moviemodel();
          this.currentView = new inputview({model : oh,  vent: vent});

        
      },
      aboutRoute: function () {

      
       var p =new AboutView();
      },
      article: function (id) {

          // if(this.currentView)
          //   this.currentView.remove();
          var display=1;
         var ar=new moviemodel(id,display);
         ar.set('id',id);
          
        // this.currentView
        var p = new viewarticle({model : ar});
        
      },
      add: function (id) {
        if(this.currentView)
            this.currentView.remove();
        var display=2;
        var uo=new moviemodel(id || 1,display);
        uo.set('id',id); 
        this.currentView = new addview({model : uo});
        
        
      }

  });

  var appRouter = new AppRouter();
  Backbone.history.start();