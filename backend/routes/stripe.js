// This example sets up an endpoint using the Express framework.
// Watch this video to get started: https://youtu.be/rPR2aJ6XnAc.

const express = require('express');
const app = express();
const Stripe = require('stripe')

require('dotenv').config()

const router = express.Router()

const stripe = Stripe((process.env.STRIPE_KEY))

router.post('/create-checkout-session', async (req, res) => {
  const customer = await stripe.customers.create({
    metadata: {
      userId: req.body.id
    }
  })
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Subscription',
          },
          unit_amount: 1000,
        },
        quantity: 1,
      },
    ],
    customer: customer.id,
    mode: 'payment',
    success_url: `http://localhost:3000/checkout-success`,
    cancel_url: `http://localhost:3000/`,
  });

  res.send({
    url: session.url
  });
});

// stripe webhook


// This is your Stripe CLI webhook secret for testing your endpoint locally.
let endpointSecret;
endpointSecret = "whsec_1b8087ee1e84b0778705c58075faacc82dbedfc9d59d3de5d2c7c394d827fd36";

router.post('/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  console.log("LISTENING");
  console.log(req.body)
  const sig = req.headers['stripe-signature'];

  let data
  let eventType

  if (endpointSecret) {
    let event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
      console.log("Webhook successfully created")
    } catch (err) {
      console.log(`Webhook Error: ${err.message}`)
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
    data = event.data.object
    eventType = event.type
  } else {
    console.log("aaaaa", req.body)
    data = req.body.data.object
    eventType = req.body.type
  }
  console.log("EVENTTYPE", eventType)


  // Handle the event
  if (eventType === 'checkout.session.completed') {
    console.log('checkout.session.completed from server', data)
    console.log('checkout.session.completed from server', data.customers)
    stripe.customers
      .retrieve(data.customer)
      .then((customer) => {
        console.log("Successfully", customer)
        console.log("data:", data)
      })
      .catch((error) => console.log("Failed to retrieve", error))
  }

  // Return a 200 res to acknowledge receipt of the event
  res.send().end();
});

module.exports = router