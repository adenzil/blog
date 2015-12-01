"use strict";
var vent = _.extend({}, Backbone.Events);


var inputview = Backbone.View.extend({
          el: $("#proj"),

         initialize: function(options){ 




 this.collection = new movielist();


    this.render(this.model.get('t'));
       
 _.bindAll(this, "umm");
    options.vent.bind("umm", this.umm);    



                
         },
          events : {
              'keyup #ip' : 'here',           
              'change #per_page' : 'change_page',
              'click .btnb' : 'page',
              'click #cancel' : 'cancel'
              

          },


         umm :function (count,total_pages,pg_no,per_page)
         {
        

                  var bottomr = Handlebars.compile($('#bottomr').html());
              

                   this.$el.find('#LOWR').html(bottomr({'totalresults': count}));



                     for(var yy=1; yy<10; yy++)
                        {
                            this.$el.find("#"+yy).hide(); 
                        }

                       this.$el.find("#prev").hide(); 
                         this.$el.find("#next").hide();
                          this.$el.find("#lp").hide();
                          this.$el.find("#fp").hide();  

            if(total_pages=>pg_no)
            {
                       

                         if(pg_no<total_pages)
                         {
                            this.$el.find("#next").show();
                            this.$el.find("#next").val(pg_no+1);
                             this.$el.find("#next").removeAttr('disabled');
                         }

                          if(pg_no>1)
                         {
                            this.$el.find("#prev").show();
                            this.$el.find("#prev").val(pg_no-1);
                             this.$el.find("#prev").removeAttr('disabled');
                         }

                         if(pg_no<total_pages-3)
                         {
                           this.$el.find("#lp").show();
                           this.$el.find("#lp").removeAttr('disabled');
                          this.$el.find("#lp").text(total_pages);
                        this.$el.find("#lp").val(total_pages);
                      }


                       if(pg_no>4)
                         {
                           this.$el.find("#fp").show();
                           this.$el.find("#fp").removeAttr('disabled');
                      }

                      this.$el.find("#5").removeClass('uncolor').addClass('color');

                      var t=pg_no+4;
                      if(pg_no+4>total_pages)
                      {
                        t=total_pages;
                      }


                        if(pg_no<total_pages-4)
                        {
                           this.$el.find("#9").display=''; 
                       this.$el.find("#9").text("...");
                        this.$el.find("#9").val(t);
                        this.$el.find("#9").show();
                        this.$el.find("#9").removeAttr('disabled'); 
                        }
                      
                         if(pg_no>4)
                        {
                        this.$el.find("#1").display=''; 
                       this.$el.find("#1").text("...");
                        this.$el.find("#1").val(pg_no-4);
                        this.$el.find("#1").show();
                        this.$el.find("#1").removeAttr('disabled');
                      }
                      
                        var c=2
                      for(var yy=pg_no-3; yy<pg_no; yy++)
                        {   
                             if(yy<=0)
                             {}
                           else{
                             this.$el.find("#"+c).display=''; 
                             this.$el.find("#"+c).text(yy);
                              this.$el.find("#"+c).val(yy);
                              this.$el.find("#"+c).show();
                              this.$el.find("#"+c).removeAttr('disabled');
                              c++;
                            }
                          }

                          var count=5;

                          var max=pg_no+3;
                          if(total_pages<pg_no+3)
                          {
                            max=total_pages;
                          }

                          for(var yy=pg_no; yy<=max; yy++)
                        {   
                             this.$el.find("#"+count).display=''; 
                             this.$el.find("#"+count).text(yy);
                              this.$el.find("#"+count).val(yy);
                              this.$el.find("#"+count).show();
                              this.$el.find("#"+count).removeAttr('disabled');
                              count++;
                          }
              }
                        


        },

        render:function (t) {


                   
           this.$el.find('#top2r').html('');
           this.$el.find('#MID').html('');
           this.$el.find('#LOWL').html('');
            this.$el.find('#LOWR').html('');

          var firsttemp = Handlebars.compile($('#firsttemp').html());
                  
                  this.$el.find('#top2r').append(firsttemp());

   var bottoml = Handlebars.compile($('#bottoml').html());
                   this.$el.find('#LOWL').append(bottoml({}));
         var limit =10;            var pg_no=1;
this.$el.find("#iptag").hide();

       if(t!=undefined)
{
  this.$el.find("#iptag").show();
 // this.$el.find("#iptagdata").text(t);
 this.collection.func(this.$el.find("#ip").val(),t,limit,pg_no,this.umm.bind(this));
} 
        

  else{       
         this.collection.func(this.$el.find("#ip").val()," ",limit,pg_no,this.umm.bind(this));

           }
    
          },

        
          here: function(e){
  var lol = this.$el.find("#per_page").val();

 var pg_no=1;
      switch (e.keyCode){
        case 27:

              this.$el.find('#ip').val('');
               this.$el.find('#MID').html('');
      
               this.collection.func(this.$el.find("#ip").val()," ",lol,pg_no,this.umm.bind(this));
              break;

        case 8:
  
               this.$el.find('#MID').html('');       
            if(this.$el.find("#ip").val()=="")
            {

              this.collection.func(this.$el.find("#ip").val()," ",lol,pg_no,this.umm.bind(this));
            }
            else{        
            this.collection.func(this.$el.find("#ip").val()," ",lol,pg_no,this.umm.bind(this));
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

        if(this.$el.find("#ip").val().match(regExp))
        {
          this.$el.find('#MID').html('');      
          this.collection.func(this.$el.find("#ip").val()," ",lol,pg_no,this.umm.bind(this));      
            break;
          }
      }

            },
            

            remove: function () {        
        this.undelegateEvents();
        return this;
    },

      change_page: function () {
        var pg_no=1;
      var lol = this.$el.find("#per_page").val();
           this.$el.find('#MID').html('');
       localVariable = new movielist();
       localVariable.func(this.$el.find("#ip").val()," ",lol,pg_no,this.umm.bind(this));

    },

        page : function(e){

     var p=e.target.value;
      var lol = this.$el.find("#per_page").val();
           this.$el.find('#MID').html('');
       localVariable = new movielist();
       var ll = localVariable.func(this.$el.find("#ip").val()," ",lol,p,this.umm.bind(this));
        
      var t=1;           

        },

        cancel : function(e){

          
 this.$el.find("."+$(event.target).prop("class")).parent().remove();


 var lol = this.$el.find("#per_page").val();
var p=1


 var l = $("div[id^=enclose]").length; 

 if(l==0)
 {
  this.$el.find("#iptag").hide();
  this.$el.find('#MID').html('');
  this.collection.func(this.$el.find("#ip").val(),"",lol,p,this.umm.bind(this));
 }

else{


    
this.collection.func(this.$el.find("#ip").val()," ",lol,p,this.umm.bind(this));
}

        }

      });


