const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express()
const port = process.env.PORT || 3000

// Middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('HobbyHub cookingggggg')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

//MongoDB Connection
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_User}:${process.env.DB_Pass}@simple-crud-server.ql3nn36.mongodb.net/?retryWrites=true&w=majority&appName=Simple-CRUD-server`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();




    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

