const express = require("express");
const cors = require("cors");
const ObjectID = require("mongodb").ObjectID;

const MongoClient = require("mongodb").MongoClient;

require("dotenv").config();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@clusterph1.yvjd9.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const port = process.env.PORT || 5000;

const app = express();

//middlewire here
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome! To the Amar dokan Server...");
});

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect((err) => {
  const productCollection = client.db("AmarDokan").collection("products");
  // perform actions on the collection object

  // all products
  app.get("/products", (req, res) => {
    productCollection.find({}).toArray((err, items) => {
      res.send(items);
    });
  });

  // single product by id
  app.get("/products/:id", (req, res) => {
    productCollection
      .find({ _id: ObjectID(req.params.id) })
      .toArray((err, documents) => {
        res.send(documents[0]);
      });
  });

  //add all products to database
  app.post("/addProducts", (req, res) => {
    const options = { ordered: true };
    productCollection.insertMany(req.body, options).then((result) => {
      // console.log(`${result.insertedCount} documents were inserted`);
      res.send(result.insertedCount > 0);
    });
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
