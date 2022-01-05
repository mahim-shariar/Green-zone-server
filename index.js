const { MongoClient } = require('mongodb');
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const app = express();
const ObjectId = require("mongodb").ObjectId;
const stripe = require("stripe")(process.env.STRIPE_SECRET);


app.use(cors());
app.use(express.json());
const port = process.env.PORT || 5000;


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.k4g9x.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
      await client.connect();
      const database = client.db("Barhouse");
      const productsCollection = database.collection("products");
      const reviewsCollection= database.collection("reviews");
      const ordersCollection = database.collection("orders");
      const bathroomCollection = database.collection("bathroomFeetings");
      const ccTvCollection = database.collection("cctvs");
      const interiordesignCollection = database.collection("interiorsDesigns");
      const ecoMaterialCollection = database.collection("ecomaterial");
      const solarEnergyCollection = database.collection("solarenergy");
      const furnitureCollection = database.collection("furniture");
      const usersCollection = database.collection("users");

       // GET furniture
      app.get('/addFurniture', async (req, res) => {
        const result = await furnitureCollection.find({}).toArray();
        res.json(result);
      });

      //POST furniture
      app.post('/addFurniture', async (req, res) => {
        const furniture = req.body;
        const result = await furnitureCollection.insertOne(furniture);
        res.send(result);
      });

       // GET solarEnergy
      app.get('/solarEnergy', async (req, res) => {
        const result = await solarEnergyCollection.find({}).toArray();
        res.json(result);
      });

      //POST solarEnergy
      app.post('/solarEnergy', async (req, res) => {
        const solarEnergy = req.body;
        const result = await solarEnergyCollection.insertOne(solarEnergy);
        res.send(result);
      });

       // GET interiorDesign
      app.get('/ecoMaterial', async (req, res) => {
        const result = await ecoMaterialCollection.find({}).toArray();
        res.json(result);
      });

      //POST interiorDesign
      app.post('/ecoMaterial', async (req, res) => {
        const echoMaterial = req.body;
        const result = await ecoMaterialCollection.insertOne(echoMaterial);
        res.send(result);
      });

       // GET interiorDesign
      app.get('/interiorDesign', async (req, res) => {
        const result = await interiordesignCollection.find({}).toArray();
        res.json(result);
      });

      //POST interiorDesign
      app.post('/interiorDesign', async (req, res) => {
        const interiorDesign = req.body;
        const result = await interiordesignCollection.insertOne(interiorDesign);
        res.send(result);
      });

       // GET cctv
      app.get('/ccTv', async (req, res) => {
        const result = await ccTvCollection.find({}).toArray();
        res.json(result);
      });

      //POST cctv
      app.post('/ccTv', async (req, res) => {
        const ccTv = req.body;
        const result = await ccTvCollection.insertOne(ccTv);
        res.send(result);
      });

       // GET bathCollection
      app.get('/bathroomFeetings', async (req, res) => {
        const result = await bathroomCollection.find({}).toArray();
        res.json(result);
      });

      //POST bathCollection
      app.post('/bathroomFeetings', async (req, res) => {
        const bathFeet = req.body;
        const result = await bathroomCollection.insertOne(bathFeet);
        res.send(result);
      });
 

      // GET Reviews
      app.get('/addReviews', async (req, res) => {
        const result = await reviewsCollection.find({}).toArray();
        res.json(result);
      });

      // POST Reviews
      app.post('/addReviews', async (req, res) => {
        const review = req.body;
        const result = await reviewsCollection.insertOne(review)
        res.send(result);
      });

      // GET products
      app.get('/addProducts', async (req, res) => {
        const result = await productsCollection.find({}).toArray();
        res.json(result);
      });

      // POST products
      app.post('/addProducts', async (req, res) => {
        const products = req.body;
        const result = await productsCollection.insertOne(products)
        res.send(result);
      });
     
      // GET singleProducts
      app.get('/purchaseProducts/:id', async (req, res) => {
        const id = req.params.id;
        const user = { _id: ObjectId(id) }
        const cursor = await productsCollection.find(user).toArray();
        res.json(cursor)
      });
      // GET single eco
      app.get('/purchaseEco/:id', async (req, res) => {
        const id = req.params.id;
        const user = { _id: ObjectId(id) }
        const cursor = await ecoMaterialCollection.find(user).toArray();
        res.json(cursor)
      });
      // GET single solar
      app.get('/purchaseSolar/:id', async (req, res) => {
        const id = req.params.id;
        const user = { _id: ObjectId(id) }
        const cursor = await solarEnergyCollection.find(user).toArray();
        res.json(cursor)
      });

      // GET single furniture
      app.get('/purchaseFurniture/:id', async (req, res) => {
        const id = req.params.id;
        const user = { _id: ObjectId(id) }
        const cursor = await furnitureCollection.find(user).toArray();
        res.json(cursor)
      });

      // GET single bathroom
      app.get('/purchaseBathroom/:id', async (req, res) => {
        const id = req.params.id;
        const user = { _id: ObjectId(id) }
        const cursor = await bathroomCollection.find(user).toArray();
        res.json(cursor)
      });

      // GET single cctV
      app.get('/purchaseCcTv/:id', async (req, res) => {
        const id = req.params.id;
        const user = { _id: ObjectId(id) }
        const cursor = await  ccTvCollection.find(user).toArray();
        res.json(cursor)
      });

      // GET single interior
      app.get('/purchaseInterior/:id', async (req, res) => {
        const id = req.params.id;
        const user = { _id: ObjectId(id) }
        const cursor = await  interiordesignCollection.find(user).toArray();
        res.json(cursor)
      });

      // payment inttt.
      app.get('/confirmOrder/:id', async (req, res) => {
        const id = req.params.id;
        const query = { _id: ObjectId(id) };
        const result = await ordersCollection.findOne(query);
        res.json(result);
      });

      //POST order
      app.post('/confirmOrder', async (req, res) => {
        const orderss = req.body;
        const result = await ordersCollection.insertOne(orderss)
        res.send(result);
        // console.log(result);
      });

      // GET manage Order
      app.get('/allorders', async (req, res) => {
        const allOrders = await ordersCollection.find({}).toArray();
        res.json(allOrders);
      });

      app.post('/confirmOrder', async (req, res) => {
        const orderss = req.body;
        const result = await ordersCollection.insertOne(orderss)
        res.send(result);
        // console.log(result);
      });

      // GET myOrders

      app.get("/myOrders/:email", async (req, res) => {
        const email = req.params.email;
        const cursor = { Email: email }
        const result=await ordersCollection.find(cursor).toArray()
        res.json(result)
      });

      // DELETE Order
      app.delete('/myAllOrder/:productId', async (req, res) => {
        const id = req.params.productId;
        const query = { _id: ObjectId(id) }
        const result = await productsCollection.deleteOne(query);
        console.log(result);
        res.json(result);
      });
      // DELETE Order
      app.delete('/myAllOrders/:productId', async (req, res) => {
        const id = req.params.productId;
        const query = { _id: ObjectId(id) }
        const result = await ordersCollection.deleteOne(query);
        console.log(result);
        res.json(result);
      });

      // GET Users Email
      app.get('/users/:email', async (req, res) => {
        const email = req.params.email;
        const query = { email: email };
        const user = await usersCollection.findOne(query);
        let isAdmin = false;
        if (user?.role === 'admin') {
          isAdmin = true;
        }
        res.json({ admin: isAdmin });
      });


      // POST Users Collection
      app.post('/users', async (req, res) => {
        const user = req.body;
        const result = await usersCollection.insertOne(user);
        res.json(result);
      });

      app.put('/users', async (req, res) => {
        const user = req.body;
        const filter = { email: user.email }
        const options = { upsert: true };
        const updateDoc = { $set: user };
        const result = await usersCollection.updateOne(filter, updateDoc, options);
        res.json(result);
      });
      
      app.put('/users/admin', async (req, res) => {
        const user = req.body;
        const filter = { email: user.email };
        const updateDoc = { $set: { role: 'admin' } };
        const result = await usersCollection.updateOne(filter, updateDoc);
        res.json(result);
      });
     
      // payment methood
      app.post("/create-payment-intent", async (req, res) => {
        const paymentInfo = req.body;
        // Create a PaymentIntent with the order amount and currency
        const paymentIntent = await stripe.paymentIntents.create({
          amount: paymentInfo.price*100,
          currency: "usd",
          payment_method_types: ['card']
        });
      
        res.json({clientSecret: paymentIntent.client_secret});
      });


    }
    finally {
    //   await client.close();
    }
  }
  run().catch(console.dir);



app.get('/', (req, res) => {
  res.send('Hello World!This is my BarHouse Web Application.')
});

app.listen(port, () => {
  console.log(`Example listening at http://localhost:${port}`)
});
