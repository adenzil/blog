    function doAction(val){
      
      $('#MID').html('');
       this.collection = new movielist();
       this.collection.func("");
    }






var inputview = Backbone.View.extend({
          el: $("#top2r"),

         initialize: function(){ 
                    
                    this.render();
                    
                       
         },

        render:function () {
         var i=2;
           this.collection = new movielist();
          $('#MID').html('');
           var source = $("#firsttemp").html();
         var template = Handlebars.compile(source);
         var context = {};
         var  html = template(context);
         $("#top2r").html(html);
          this.collection.func("");
          
       
          },

          events : {
              'keyup' : 'here'

          },

          here: function(e){
            
      switch (e.keyCode){
        case 27:
              this.$('#ip').val('');
               $('#MID').html('');
               this.collection.func(this.$("#ip").val());
              break;

        case 8:
            $('#MID').html('');
            if(this.$("#ip").val()=="")
            {
              this.collection.func(this.$("#ip").val());
            }
            else{        
            this.collection.func(this.$("#ip").val());
          }
            break;

        case 37 :
            break;

        case 39 : 
            break;

        case 38 :

            break;

        case 40:

            break;

        default :
        var regExp = /^[A-Za-z0-9]+$/;
        if($("#ip").val().match(regExp))
        {

          $('#MID').html('');      
          this.collection.func(this.$("#ip").val());      
            break;
          }
      }


            },

            remove: function () {
        this.$el.empty(); // Instead of this.$el.remove();
        //this.stopListening();
        this.undelegateEvents();
        return this;
    }

      })



  var mmmodel = Backbone.Model.extend({
  initialize : function(){                                        
    }

  })

  
  var movielist = Backbone.Collection.extend({

    initialize : function(){  
         },

         func : function(as){

            
if(as==""){

                          $.ajax({        
                  url: 'http://localhost/ap.php?action=get_page',
                  success:function(data){
                     var obj=data;


                     if(obj.data.articles.length=="0")
                    {
                          $('#MID').html("empty database");
                    }

                     var e = document.getElementById("per_page");
                      var strUser = e.options[e.selectedIndex].value;
                      if(strUser>obj.data.articles.length)
                          {
                            strUser=obj.data.articles.length;
                          }
                      
                     for (var q=0; q<strUser; q++)
                                {
                                  a=new mmmodel(obj.data.articles[q]);
                                  
                                    movieview1 = new mv({model : a});  
                                }
                      }
                  });            
          }  

          else{

                          $.ajax({        
                  url: 'http://localhost/ap.php?action=get_page&query='+as,
                  success:function(data){
                     var obj=data;

                     if(obj.data.articles.length=="0")
                    {
                          $('#MID').html("No matching values found");
                    }

                    var e = document.getElementById("per_page");
                      var strUser = e.options[e.selectedIndex].value;
                      if(strUser>obj.data.articles.length)
                          {
                            strUser=obj.data.articles.length;
                          }
                      
                     for (var q=0; q<strUser; q++)
                                {
                                  a=new mmmodel(obj.data.articles[q]);
                                  //a.set("ppp",ppp);
                                    movieview1 = new mv({model : a});  
                                }
                      }
                  });    

          }             

 


                   
         }

      })






  var mv = Backbone.View.extend({
    
model:mmmodel,
       
    initialize : function() {


                  
                  this.render();


              },


              render : function(p){


                  var secondtemp = Handlebars.compile($('#secondtemp').html());
                  var h=this.model.get('ppp');

                  

                   $('#MID').append(this.$el.append(secondtemp({ "cs" : "cli", "title" : this.model.get('title'), "post" : this.model.get('post')})));
                   
               

              },


              events : {

                'click': 'lo',


              },


              lo : function(){
                
              }

              

  })




  

var AboutView = Backbone.View.extend({
      
      
      initialize: function () {
          this.render();
      },
      render: function () {
          $("#MID").html("ABOUT");
          
      }
  });
  
  var AppRouter = Backbone.Router.extend({
        


      routes: {          
          '': 'homeRoute',
          'home': 'homeRoute',
          'about': 'aboutRoute',          
      },
      homeRoute: function () {
         
          
           if(this.currentView)
            this.currentView.remove();
        this.currentView = new inputview({model : mmmodel});
        
      },
      aboutRoute: function () {

          if(this.currentView)
            this.currentView.remove();
        this.currentView = new AboutView();
       
      }

  });

  var appRouter = new AppRouter();
  Backbone.history.start();







/*
<script type="text/javascript"  src="/backbone/router/approuter.js" ></script>

  <script type="text/javascript"  src="/backbone/view/view.js" ></script>

  <script type="text/javascript"  src="/backbone/model/model.js" ></script>

  <script type="text/javascript"  src="/backbone/collection/collection.js" ></script>
*/





   