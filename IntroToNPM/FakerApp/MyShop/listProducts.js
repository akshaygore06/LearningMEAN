var product = require("faker");


console.log("=========================");
console.log("                         ");
console.log(" Welcome To My Shop!! ");
console.log("                         ");
console.log("=========================");


for (var i = 0; i < 10;i++)
{
    var productName = product.name.findName();
    var productPrice = product.commerce.price();
    //var symbol = product.finance.currencySymbol("$");
    
    console.log(productName + ' - ' + "$" + productPrice);
}