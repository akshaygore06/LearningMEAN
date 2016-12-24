var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo_2");

var Post = require("./models/post");
var User = require("./models/user");



// User schema


Post.create({
  title: "new post sd ds fds fds f 343243223434..!!",
  content: "blah asd asd as asds da blah"
},function(err,post){
    User.findOne({email : "AkshayGore@gmail.com"}, function(err, foundUser){
      if(err)
      {
          console.log(err);
      }
      else
      {
          foundUser.posts.push(post);
          foundUser.save(function(err,data){
              if(err)
              {
                  console.log(err);
              }
              else{
                  console.log(data);
              }
          });
      }
    });
    
    });

// User.findOne({email: "AkshayGore@gmail.com" }).populate("post").exec(function(err,user){
//   if(err)
//   {
//       console.log(err);
//   }
//   else{
//       console.log(user);
//   }
// });
