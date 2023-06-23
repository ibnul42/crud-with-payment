// This example sets up an endpoint using the Express framework.
// Watch this video to get started: https://youtu.be/rPR2aJ6XnAc.

const express = require('express');
const app = express();
const Stripe = require('stripe');
const User = require('../models/userModel');

require('dotenv').config()

const router = express.Router()

const stripe = Stripe((process.env.STRIPE_KEY))

router.post('/create-checkout-session', async (req, res) => {
  // console.log(req.body)
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
    success_url: `https://lovely-lollipop-1e977d.netlify.app/checkout-success`,
    cancel_url: `https://lovely-lollipop-1e977d.netlify.app/checkout-fail`,
  });

  res.send({
    url: session.url
  });
});

// stripe webhook


// This is your Stripe CLI webhook secret for testing your endpoint locally.
let endpointSecret;
// endpointSecret = "whsec_1b8087ee1e84b0778705c58075faacc82dbedfc9d59d3de5d2c7c394d827fd36";

router.post('/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  console.log("LISTENING");
  console.log(req.body);
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
    data = req.body.data.object
    eventType = req.body.type
  }
  console.log("EVENTTYPE", eventType)


  // Handle the event
  if (eventType === 'checkout.session.completed') {
    stripe.customers
      .retrieve(data.customer)
      .then((customer) => {
        updateUserInfo(customer, data)
      })
      .catch((error) => console.log("Failed to retrieve", error))
  }

  // Return a 200 res to acknowledge receipt of the event
  res.send().end();
});

const updateUserInfo = async (customer, userdata) => {
  // console.log("User information for update")
  // console.log("Customer data:", customer)
  // console.log("............")
  // console.log("UserData for update", userdata)
  // const { id, name, email, password, newPassword, gender, birthDate } = req.body

  const id = customer.metadata.userId

  // check if id is available
  // if (!id) {
  //   res.status(404)
  //   throw new Error('Invalid User')
  // }

  const userExists = await User.findOne({ id })

  // check if the user exists
  // if (!userExists) {
  //   res.status(404)
  //   throw new Error('Invalid User')
  // }

  // console.log("USER: ", userExists)


  // update the profile
  try {
    const updatedProfile = await User.findByIdAndUpdate(id, {
      subscription: true
    })
    console.log("Update profile successful",customer.metadata.userId, updatedProfile)
  } catch (error) {
    console.log("Update profile failed")
  }

  // if (updatedProfile) {
  //     const user = await User.findOne({ email })
  //     res.status(200)
  //     res.json({
  //         id: user.id,
  //         name: user.name,
  //         email: user.email,
  //         gender: user.gender,
  //         birthDate: user.birthDate,
  //         token: generateToken(user._id)
  //     })
  // }
}

module.exports = router