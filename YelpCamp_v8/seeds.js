var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = 
    [
        {
            name: "Test Data 1",
            image: "http://static3.businessinsider.com/image/5484d9d1eab8ea3017b17e29/9-science-backed-reasons-to-own-a-dog.jpg",
            description: " Vivamus sit amet urna pellentesque, accumsan dolor vel, accumsan ex. Nulla arcu odio, iaculis nec purus sed, ornare maximus metus. Nam in eros et magna blandit luctus vel a arcu. Nam vulputate nunc non arcu sollicitudin, sed blandit nisi porttitor. Aliquam erat volutpat. Donec suscipit diam quis tortor euismod malesuada. Integer euismod diam vel aliquam vulputate. Donec vitae velit in est consequat sollicitudin sed vestibulum dui. Curabitur eu quam ac lectus efficitur suscipit sit amet vitae ex. Suspendisse eget commodo diam, non condimentum orci. Suspendisse volutpat venenatis erat."
        } ,
        
        {
            name: "Test Data 2",
            image: "http://www.seodirect.org/wp-content/uploads/2016/10/734899052_13956580111.jpg",
            description: " Vivamus sit amet urna pellentesque, accumsan dolor vel, accumsan ex. Nulla arcu odio, iaculis nec purus sed, ornare maximus metus. Nam in eros et magna blandit luctus vel a arcu. Nam vulputate nunc non arcu sollicitudin, sed blandit nisi porttitor. Aliquam erat volutpat. Donec suscipit diam quis tortor euismod malesuada. Integer euismod diam vel aliquam vulputate. Donec vitae velit in est consequat sollicitudin sed vestibulum dui. Curabitur eu quam ac lectus efficitur suscipit sit amet vitae ex. Suspendisse eget commodo diam, non condimentum orci. Suspendisse volutpat venenatis erat."
        },
        
        {
            name: "Test Data 3",
            image: "http://www.aspca.org/sites/default/files/dog-care_general-dog-care_main-image.jpg",
            description: " Vivamus sit amet urna pellentesque, accumsan dolor vel, accumsan ex. Nulla arcu odio, iaculis nec purus sed, ornare maximus metus. Nam in eros et magna blandit luctus vel a arcu. Nam vulputate nunc non arcu sollicitudin, sed blandit nisi porttitor. Aliquam erat volutpat. Donec suscipit diam quis tortor euismod malesuada. Integer euismod diam vel aliquam vulputate. Donec vitae velit in est consequat sollicitudin sed vestibulum dui. Curabitur eu quam ac lectus efficitur suscipit sit amet vitae ex. Suspendisse eget commodo diam, non condimentum orci. Suspendisse volutpat venenatis erat."
        }
    
    
    ]



function seedDB()
{
    Campground.remove({},function(err){
    if(err)
    {
        console.log(err);
    }
    else
    {
        console.log("Campground removed successfully!!");
        
        data.forEach(function(seed){
            Campground.create(seed,function(err,campground){
               if(err)
               {
                   console.log(err);
               }
               else
               {
                   console.log("added campground..!!");
                   
                   Comment.create(
                       {
                            text: "This is my first comment",
                            author: "Akshay Gore"
                        }, function(err,comment){
                            if(err)
                            {
                                console.log(err)
                            }
                            else{
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Created new comment!!");
                            }
                            
                            
                        });
                   
                   
                   
               }
            });
        });
        
    }
    }); 
    
    
  //  
    
    
    
}

module.exports = seedDB;

