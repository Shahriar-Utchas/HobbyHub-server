const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express()
const port = process.env.PORT || 3000

// Middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to HobbyHub')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

//MongoDB Connection
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
    // await client.connect();
    const database = client.db('HobbyHub');
    const groupCollection = database.collection('AllGroups');
    const joinedGroupCollection = database.collection('JoinedGroups');

    //Show all groups
    app.get('/groups', async (req, res) => {
      const cursor = groupCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });


    //Create a new group
    app.post('/createGroup', async (req, res) => {
      const newGroup = req.body;
      const result = await groupCollection.insertOne(newGroup);
      res.send(result);
    });

    //find group by id
    app.get('/group/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const group = await groupCollection.findOne(query);
      res.send(group);
    });

    //find group by email
    app.get('/groupByEmail/:email', async (req, res) => {
      const email = req.params.email;
      const query = { groupCreatorEmail: email };
      const group = await groupCollection.find(query).toArray();
      res.send(group);
    });

    //delete group by id
    app.delete('/deleteGroup/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await groupCollection.deleteOne(query);
      res.send(result);
    });

    //Update group by id
    app.put('/updateGroup/:id', async (req, res) => {
      const id = req.params.id;
      const updatedGroup = req.body;
      const query = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          groupCreatorName: updatedGroup.groupCreatorName,
          groupCreatorEmail: updatedGroup.groupCreatorEmail,
          groupName: updatedGroup.groupName,
          hobbyCategory: updatedGroup.hobbyCategory,
          description: updatedGroup.description,
          meetingLocation: updatedGroup.meetingLocation,
          maxMembers: updatedGroup.maxMembers,
          startDate: updatedGroup.startDate,
          imageUrl: updatedGroup.imageUrl,
          spot_taken: updatedGroup.spot_taken,
        },
      };
      const result = await groupCollection.updateOne(query, updateDoc, options);
      res.send(result);
    });

    //join group 
    app.post('/joinGroup', async (req, res) => {
      const newJoinedGroup = req.body;
      const result = await joinedGroupCollection.insertOne(newJoinedGroup);
      res.send(result);
    });

    //update group spot if someone joins
    app.patch('/updateGroupSpot/:id', async (req, res) => {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const options = { upsert: false };

        // Increment spot_taken by 1
        const updateDoc = {
          $inc: {
            spot_taken: 1,
          },
        };

        const result = await groupCollection.updateOne(query,updateDoc, options);
        res.send(result);
        
    });

    //show the joined groups by a user
    app.get('/checkUserGroup/:email', async (req, res) => {
      const email = req.params.email;
      const query = { userEmail: email };
      const group = await joinedGroupCollection.find(query).toArray();
      res.send(group);
    });

    //check if a user already joined a particular group
    app.get('/checkUserJoined/:email/:id', async (req, res) => {
      const email = req.params.email;
      const id = req.params.id;
      const query = { userEmail: email, groupId: id };
      const group = await joinedGroupCollection.findOne(query);
      res.send(group);
    });

    //delete joined group by id
    app.delete('/leaveGroup/:id/:email', async (req, res) => {
    const groupId = req.params.id;
    const email = req.params.email;

    const query = { groupId: groupId, userEmail: email };
    const result = await joinedGroupCollection.deleteOne(query);
    res.send(result);
  });

  //update group spot if someone leaves
  app.patch('/updateGroupSpotLeave/:id', async (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const options = { upsert: false };
    // Decrement spot_taken by 1
    const updateDoc = {
      $inc: {
        spot_taken: -1,
      },
    };
    const result = await groupCollection.updateOne(query, updateDoc, options);
    res.send(result);
  }
  );

  // Save new user info to MongoDB
  app.post('/users', async (req, res) => {
      const { uid, name, email, photoURL } = req.body;

    try {
      const userCollection = client.db('HobbyHub').collection('Users');

      const existingUser = await userCollection.findOne({ uid });
      if (!existingUser) {
      const result = await userCollection.insertOne({ uid, name, email, photoURL });
      res.status(200).json({ message: 'User saved', insertedId: result.insertedId });
      } else {
      res.status(200).json({ message: 'User already exists' });
      }
      } catch (err) {
       console.error(err);
       res.status(500).json({ error: 'Failed to save user' });
      }
  });


    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

