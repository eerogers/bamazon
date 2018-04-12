# bamazon
Deploy 'node customer.js' in the command line to:
1) See a full list of the items for sale, their prices and IDs.
![Full list](screenshots/customer1.png)
2) Select an item using its ID, then select the number of these items desired for purchase.
![Purchase](screenshots/customer2.png)
3) If you try to buy more of an item than is in stock, you will be alerted that their is an insufficient quantity.
![Insufficient quantity](screenshots/customer3.png)

Deploy 'node manager.js' in the command line to:
1) See a list of products for sale
![Sale list](screenshots/manager1.png)
2) View "Low Inventory" items, meaning items with a total current stock of 5 or fewer.
![Low Inventory](screenshots/manager2.png)
3) Increase the inventory of a given item, selected using its ID.
![Increase Inventory](screenshots/manager3.png "As you can see, after adding printers, there are no longer any items visible when viewing low inventory.")
4) Add a new product to the list of products, setting the name, price, and quantity in stock.
![Add product](screenshots/manager4.png "As you can see, after adding laptops to the product list, the list of products reflects that change.")


Do not deploy 'node supervisor.js'; I have not yet completed it.
