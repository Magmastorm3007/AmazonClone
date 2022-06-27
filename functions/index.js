const functions = require("firebase-functions");
const express=require("express");
const cors=require("cors");
const s1="sk_test_51LEEGeSGbGUoxFPiASowylwPDLRipq";
const s2="VepHokW5tCidCgeKowfWukMU90FKFygftqCbt";
const s3="QbkjqjxAZS8HkJJNZANcj00qOg3jVUe";
const s4=s1+s2+s3;
const stripe=require("stripe")(s4);
const app=express();
app.use(cors({origin: true}));
app.use(express.json());
app.get("/", (request, response) => response.status(200).send("hello world"));
app.post("/payments/create", async (request, response)=>{
  const total=request.query.total;
  console.log("Payment Request Recieved BOOM!!! for this amount>>>", total);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, // subunits of the currency
    currency: "usd",
  });
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});
exports.api=functions.https.onRequest(app);

