
const express = require('express'); //Line 1
const app = express(); //Line 2
const port = process.env.PORT || 3000; //Line 3
var cors = require("cors");
const stripe = require('stripe')('sk_test_51LPzSaAmJKzU86rcPkixEgsmzCDCKkeSKE9JiRstspOC4RbvaJm3qHlm3NqrBFWhcRiFg2hoDSCqQE879PbAJhHN00W0ePS1ZA')
var bodyParser = require('body-parser')



app.use(bodyParser.json());
app.use(cors());

// This displays message that the server runode nning and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`));


app.get('/products', (req, res) => {
  const product = getProduct().then((result) => {
    for (let i = 0; i < result.data.length; i++) {
      result.data[i].key = i;
      result.data[i].quantity = 0;
    }
    console.log("length: " + result.data.length)
    console.log(result.data)
    res.json({ products: result.data })
  });
});

app.get('/prices', (req, res) => {
  getPrice().then((result) => {
    res.json({ price: result.data })
  })
})

const getPrice = async () => {
  return new Promise(function (resolve, reject) {
    const price = stripe.prices.list({
      limit: 10,
    });
    resolve(price);
  })
}
const getProduct = async () => {
  return new Promise(function (resolve, reject) {
    const products = stripe.products.list({
      limit: 10,
    });
    resolve(products);
  })
}

app.post('/create-checkout-session', async (req, res) => {
  const items = req.body;
  console.log(req.body);
  console.log("test");

  const lineItems = items.map((item) => {
    return {
      price: item.default_price,
      quantity: item.quantity,
    };
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: lineItems,
    mode: 'payment',
    success_url: "http://localhost:3000/order/success?session_id={CHECKOUT_SESSION_ID}",
    cancel_url: 'http://localhost:3001/cart',
  });

  res.json({ id: session.id });
});

app.get('/checkout-session', async (req, res) => {
  const { sessionId } = req.query;
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  res.send(session);
});

app.get('/checkout/:session_id/line_items', async (req, res) => {
  const sessionId = req.params['session_id'];
  const items = await stripe.checkout.sessions.listLineItems(sessionId);
  res.status(200).json(items.data);
});