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

connection.connect()

var qs = [
    {
        type: 'list',
        name: 'q1',
        message: 'Select a Course of Action',
        choices: ["View Products for Sale", "View Low Inventory", "Increase Inventory", "Add New Product"]
    }
]
var qs2 = [
    {
        type: 'input',
        name: 'q1',
        message: "Enter the ID of the product whose inventory you would like to increase."
    },
    {
        type: 'input',
        name: 'q2',
        message: "Enter the number of items you would like to ADD to the inventory."
    }
]
var qs3 = [
    {
        type: 'input',
        name: 'q1',
        message: "Enter the name of the product you would like to add."
    },
    {
        type: 'input',
        name: 'q2',
        message: "Enter the price you would like to charge for this product."
    },
    {
        type: 'input',
        name: 'q3',
        message: "Enter the quantity you would like to put in stock."
    },

]
pmpt(qs).then(function(r){
    if (r.q1 == "View Products for Sale"){
        connection.query('SELECT * FROM products', function (error, results, fields) {
            for(i=0;i<results.length;i++) {
                console.log("ID: " + results[i].item_id + " Product: " + results[i].product_name + " Quantity: " + results[i].stock_quantity)
            }
        })
        connection.end()
    }
    if (r.q1 == "View Low Inventory"){
        connection.query('SELECT * FROM products WHERE stock_quantity < 6', function (error, results, fields) {
            for(i=0;i<results.length;i++) {
                console.log("ID: " + results[i].item_id + " Product: " + results[i].product_name + " Quantity: " + results[i].stock_quantity)
            }
        })
        connection.end()
    }
    if (r.q1 == "Increase Inventory"){
        question2()
    }
    if (r.q1 == "Add New Product"){
        question3()
    }
})

function question2() {
    pmpt(qs2).then(function(r){
    //    console.log(r.q1, r.q2)
        takeStock(r.q1, r.q2)
    })
}

function question3() {
    pmpt(qs3).then(function(r){
    //    console.log(r)
        addInventory(r.q1, r.q2, r.q3)
    })
}

function takeStock(id, stock) {
    connection.query('SELECT * FROM products WHERE item_id =' + id + '', function (error, results, fields) {
        if (error) throw error;
        var newQuantity = parseInt(results[0].stock_quantity) + parseInt(stock)
        addStock(id, newQuantity)
    })
}

function addStock(id, newQuantity) {
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
            item_id: id
        }
    ]
    connection.query(q, values, function(error, results, fields) {
                if (error) throw error;
    })
            connection.end()
}

function addInventory(name, pricetag, quant) {
    var q = `
        INSERT INTO products
        SET ? 
        `
    var values = {
        product_name: name,
        price: pricetag,
        stock_quantity: quant
    }
    connection.query(q, values, function(error, results, fields) {
        if (error) throw error;
    })
        connection.end()
}