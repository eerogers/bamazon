var inq = require('inquirer')
var pmpt = inq.createPromptModule()
var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'bamazon',
  socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
});
var inq = require('inquirer')
var pmpt = inq.createPromptModule()

var qs = [
    {
        type: 'input',
        name: 'q1',
        message: 'What is the ID of the product you would like to buy?',
    },
    {
        type: 'input',
        name: 'q2',
        message: 'How many would you like to buy?'
    }
]
connection.connect()
connection.query('SELECT * FROM products', function (error, results, fields) {
    for(i=0;i<results.length;i++) {
        console.log("ID: " + results[i].item_id + " Product: " + results[i].product_name + " Price: $" + results[i].price)
    }
    
    question()
})

function question() {
    pmpt(qs).then(function(r){
        connection.query('SELECT * FROM products WHERE item_id =' + r.q1 + '', function (error, results, fields) {
            if (error) throw error;
            var item = results[0].product_name
            var price = results[0].price * r.q2
            var newQuantity = results[0].stock_quantity - r.q2
            console.log(newQuantity)
            if (newQuantity >= 0) { 
                console.log("You have purchased " + r.q2 + " " + item + "s for $" + price + ". Thank you.") 
                updateStock(newQuantity, r.q1)
            }
            else {
                console.log("Insufficient Quantity!")
                connection.end()
            }
        })
    })
}

function updateStock(newQuantity, r) {
    var q = `
            UPDATE products 
            SET ? 
            WHERE ?
            `
            var values = [
            {
                stock_quantity: newQuantity
            },
            {
                item_id: r
            }
            ]
    connection.query(q, values, function(error, results, fields) {
        if (error) throw error;
    })
    connection.end()
}