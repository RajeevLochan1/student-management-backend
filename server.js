const express = require("express");
const dbConnect = require("./mongodb");
const mongoDb = require("mongodb");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());

//get all data
app.get("/", async (req, res) => {
  let data = await dbConnect();
  let result = await data.find().toArray();
  res.send(result);
});

//get single data
app.get("/singleStudent/:id", async (req, res) => {
  let data = await dbConnect();
  let result = await data
    .find({
      _id: new mongoDb.ObjectId(req.params.id),
    })
    .toArray();
  res.send(result);
});

//post data
app.post("/newStudent", async (req, res) => {
  let data = await dbConnect();
  let result = await data.insertOne(req.body);
  res.send(result);
});

//update data
app.put("/updateStudent/:id", async (req, res) => {
  try {
    let data = await dbConnect();
    let result = await data.updateOne(
      { _id: new mongoDb.ObjectId(req.params.id) },
      { $set: req.body }
    );
    res.send(result);
  } catch (error) {
    console.log(error.message);
  }
});

//delete data
app.delete("/delete/:id", async (req, res) => {
  let data = await dbConnect();
  let result = await data.deleteOne({
    _id: new mongoDb.ObjectId(req.params.id),
  });
  res.send(result);
});

app.listen(4000, () => {
  console.log("Listening at 4000");
});
