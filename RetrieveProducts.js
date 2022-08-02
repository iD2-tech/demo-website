
const express = require('express'); //Line 1
const app = express(); //Line 2
const port = process.env.PORT || 5000; //Line 3
var cors = require("cors");
const stripe = require('stripe')('sk_test_51LPzSaAmJKzU86rcPkixEgsmzCDCKkeSKE9JiRstspOC4RbvaJm3qHlm3NqrBFWhcRiFg2hoDSCqQE879PbAJhHN00W0ePS1ZA')



app.use(cors());

// This displays message that the server runode nning and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6

// create a GET route
app.get('/products', (req, res) => { //Line 9
    const product = getProduct().then((result) => {
        for (let i = 0; i < result.data.length; i++) {
            result.data[i].key = i;
        }
        res.json({products: result.data})
    })

 ; //Line 10
}); //Line 11

app.get('/prices', (req, res) => {
    getPrice().then((result) => {
        console.log(result.data)
        res.json({price: result.data})
    })
})

const getPrice = async() => {
    return new Promise(function (resolve, reject) {
        const price = stripe.prices.list({
           limit: 10,
    });
        resolve(price);
    })
}
const getProduct = async() => {
      return new Promise(function (resolve, reject) {
        const products = stripe.products.list({
            limit: 6,
        });
          resolve(products);
      })
}

// node RetrieveProducts.js