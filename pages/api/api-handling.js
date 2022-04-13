import { MongoClient, ObjectId } from "mongodb";

async function handler(req, res) {
  // switch the methods
  switch (req.method) {
    case "POST": {
      return addPost(req, res);
    }

    case "PUT": {
      return updatePost(req, res);
    }

    case "DELETE": {
      return deletePost(req, res);
    }
  }
}

//------------------------------------ ADDING POST ------------------------------------

async function addPost(req, res) {
  try {
    const data = req.body;

    // const client = await MongoClient.connect(
    //   "mongodb+srv://string:string@cluster0.rocpp.mongodb.net/myBlog?retryWrites=true&w=majority"
    // );

    const client = await MongoClient.connect(process.env.DB_URL);

    const db = client.db();

    const postsCollection = db.collection("posts");

    await postsCollection.insertOne(data);

    client.close();

    return res.json({
      message: "Post added successfully",
      success: true,
    });
  } catch (error) {
    return res.json({
      message: new Error(error).message,
      success: false,
    });
  }
}

// ------------------------------------ UPDATING POST ------------------------------------

async function updatePost(req, res) {
  try {
    const data = req.body;

    const client = await MongoClient.connect(process.env.DB_URL);

    const db = client.db();

    const postsCollection = db.collection("posts");

    const filter = { _id: ObjectId(data.id) };
    const updatedData = {
      $set: {
        title: data.title,
        description: data.description,
        // image: data.image,
        createdAt: data.createdAt,
      },
    };

    const options = { returnNewDocument: true };

    await postsCollection.findOneAndUpdate(filter, updatedData, options);

    client.close();

    return res.json({
      message: "Post Updated Successfully",
      success: true,
    });
  } catch (error) {
    return res.json({
      message: new Error(error).message,
      success: false,
    });
  }
}

//------------------------------------ DELETING POST ------------------------------------

async function deletePost(req, res) {
  try {
    const data = req.body;
    console.log(data);
    const client = await MongoClient.connect(process.env.DB_URL);

    const db = client.db();

    const postsCollection = db.collection("posts");

    const filter = { _id: new ObjectId(data) };
    const options = {
      sort: { createdAt: -1 },
    };

    await postsCollection.findOneAndDelete(filter, options);

    client.close();

    // return;
    return res.json({
      message: "Post deleted successfully",
      success: true,
    });
  } catch (error) {
    return res.json({
      message: new Error(error).message,
      success: false,
    });
  }
}

export default handler;
