import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(
      "mongodb+srv://bhagym09:bhagym09@cluster0.rocpp.mongodb.net/myBlog?retryWrites=true&w=majority"
    );

    const db = client.db();

    const postsCollection = db.collection("posts");

    const result = await postsCollection.insertOne(data);

    console.log(result);

    client.close();

    res.status(201).json({ message: "Post added sucessfully" });
  }
}

export default handler;
