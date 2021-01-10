const express = require('express')
const cors = require('cors');
const path = require('path');

if(process.env.NODE_ENV!== 'production') require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(cors());

// if(process.env.NODE_ENV === 'production'){
//     app.use(express.static(path.join(__dirname, 'client/build')));
//     app.get('*', function(req, res){
//         res.send(path.join(__dirname, 'client/build', 'index.html'));
//     });
// }


app.post("/payment", (req, res)=>{
    const body = {
        source: req.body.token.id,
        amount : req.body.amount,
        currency : 'inr',
        description : 'iSkull Mart Services Testing'
    };

    stripe.charges.create(body).then(stripeRes => {
        res.status(200).send({success : stripeRes})
    }).catch(stripeError => {
        res.status(500).send({error : stripeError})
    })
})

app.listen(PORT, error =>{
    if (error) throw error;
    console.log("Server running on PORT : "+PORT);
});