var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo");

var postSchema = new mongoose.Schema({
    title: String,
    content: String
});

 var Post = mongoose.model("Post", postSchema);

var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts:[postSchema]    
}) ;

var User = mongoose.model("User", userSchema);


// var newPost = new Post({
//   title: "First Post",
//   content: "Akshay Gore"
// });

// newPost.save(function(err,post){
//   if(err)
//   {
//       console.log(err);
//   }
// });




// var newUser = new User({
//     email: "kk@angel.com",
//     name: "Zopnare baa"
// });

// newUser.posts.push(
//         {
//             title: "Kasa kay Bhau 3333333",
//             content: " hao na re baaa malabi aahe"
//         }
//     );


// newUser.save(function(err,user){
//     if(err)
//     {
//         console.log(err);
//     }
//     else
//     {
//         console.log(user);
//     }
    
// });


// User.findOne({ name : "Zopnare baa"}, function(err,user){
//     if(err)
//     {
//         console.log(err);
//     }
//         else{
//                 user.posts.push({
//                     title: "xxx6474848xxx",
//                     content: "wedasds47484849adassad"
//                 });
//                 user.save(function(err,user){
//                     if(err)
//                     {
//                         console.log(err);
//                     }
//                     else
//                     {
//                         console.log(user);
//                     }   
//                 });
//               }
// });



