const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
    "sk_test_51M2w7qFvyMuA5Qv6AlrK959rYSDk2Udop79WxtKO9PshfEFhSYEprEv1j9OQbFzvI89eGL2v7nBKelwVn9qkL9mZ00aC32tPD8"
)

const app = express();

app.use(cors({origin:true}));
app.use(express.json());



// 라우트 부분
app.get("/",(req,res)=> res.status(200).send("안녕"));

app.post("/payments/create", async (req,res)=>{
    const total = req.query.total;
    console.log("payment 에서 가져온 total 곱하기 100의 양은 이것 입니다." + total);

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency :  "usd",
    })

    res.status(201).send({
        clientSecret: paymentIntent.client_secret,
    })
})

exports.api = functions.https.onRequest(app);


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });


/* 

http://localhost:5001/e-clone-1289a/us-central1/api

*/
