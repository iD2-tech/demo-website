const express = require('express'); //Line 1
const app = express(); //Line 2
const WebSocket = require('ws');
const port = process.env.PORT || 3000; //Line 3
const wss = new WebSocket.Server({ port: 8080 });
var cors = require("cors");
const stripe = require('stripe')('sk_test_51LPzSaAmJKzU86rcPkixEgsmzCDCKkeSKE9JiRstspOC4RbvaJm3qHlm3NqrBFWhcRiFg2hoDSCqQE879PbAJhHN00W0ePS1ZA')
var bodyParser = require('body-parser')

const endpointSecret = "whsec_4d9d5aa5c272302bf5f15227b8ed33bc1b8b0395ca62c0ace56a8cd286294626";

function broadcast(data) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  }

app.use(bodyParser.json());
app.use(cors());

// This displays message that the server runode nning and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`));

app.post('/webhookProduct', express.raw({type: 'application/json'}), (request, response) => {
    const sig = request.headers['stripe-signature'];
  
    let event;
  
    try {
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err) {
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
  
    // Handle the event
    switch (event.type) {
      case 'price.created':
        const priceCreated = event.data.object;
        // Then define and call a function to handle the event price.created
        broadcast(JSON.stringify({ type: 'product_updated' }));
        break;
      case 'price.deleted':
        const priceDeleted = event.data.object;
        // Then define and call a function to handle the event price.deleted
        broadcast(JSON.stringify({ type: 'product_updated' }));
        break;
      case 'price.updated':
        const priceUpdated = event.data.object;
        // Then define and call a function to handle the event price.updated
        broadcast(JSON.stringify({ type: 'product_updated' }));
        break;
      case 'product.created':
        const productCreated = event.data.object;
        // Then define and call a function to handle the event product.created
        broadcast(JSON.stringify({ type: 'product_updated' }));
        break;
      case 'product.deleted':
        const productDeleted = event.data.object;
        // Then define and call a function to handle the event product.deleted
        broadcast(JSON.stringify({ type: 'product_updated' }));
        break;
      case 'product.updated':
        const productUpdated = event.data.object;
        // Then define and call a function to handle the event product.updated
        broadcast(JSON.stringify({ type: 'product_updated' }));
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  
    // Return a 200 response to acknowledge receipt of the event
    response.send();
  });


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
      limit: 100,
    });
    resolve(price);
  })
}
const getProduct = async () => {
  return new Promise(function (resolve, reject) {
    const products = stripe.products.list({
      limit: 100,
    });
    resolve(products);
  })
}

app.post('/create-checkout-session', async (req, res) => {
  const items = req.body;

  const lineItems = items.map((item) => {
    return {
      price: item.default_price,
      quantity: item.quantity,
    };
  });


  const metadata = items.reduce((result, item) => {
    result[item.id] = item.instructions;
    return result;
  }, {});

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: lineItems,
    mode: 'payment',
    success_url: "https://communityteriyaki.com/order/success?session_id={CHECKOUT_SESSION_ID}",
    cancel_url: 'https://communityteriyaki.com/cart',
    metadata: metadata
  });

  res.json({ id: session.id });
});

app.get('/checkout-session', async (req, res) => {
  const { sessionId } = req.query;
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  console.log(sessionId);
  console.log(session);
  res.send(session);
});

app.get('/checkout/:session_id/line_items', async (req, res) => {
  const sessionId = req.params['session_id'];
  const items = await stripe.checkout.sessions.listLineItems(sessionId);
  res.status(200).json(items.data);
});