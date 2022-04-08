import { Router } from "@mui/icons-material";
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

    const client = await MongoClient.connect(
      "mongodb+srv://bhagym09:bhagym09@cluster0.rocpp.mongodb.net/myBlog?retryWrites=true&w=majority"
    );

    const db = client.db();
    const postsCollection = db.collection("posts");

    await postsCollection.insertOne(data);

    // res.status(201).json({ message: "Post added sucessfully" });

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

    const client = await MongoClient.connect(
      "mongodb+srv://bhagym09:bhagym09@cluster0.rocpp.mongodb.net/myBlog?retryWrites=true&w=majority"
    );

    const db = client.db();
    const postsCollection = db.collection("posts");

    const filter = { _id: ObjectId(data.id) }; //_id: ObjectId(data._id)
    const updatedData = {
      $set: {
        title: data.title,
        description: data.description,
        // image: data.image,
        createdAt: data.createdAt,
      },
    };

    const options = { returnNewDocument: true };
    console.log(filter);

    await postsCollection.findOneAndUpdate(filter, updatedData, options);

    client.close();

    // res.status(201).json({ message: "Post updated sucessfully" });

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

//   //------------------------------------ DELETING POST ------------------------------------

async function deletePost(req, res) {
  try {
    const data = req.body;

    const client = await MongoClient.connect(
      "mongodb+srv://bhagym09:bhagym09@cluster0.rocpp.mongodb.net/myBlog?retryWrites=true&w=majority"
    );

    const db = client.db();
    const postsCollection = db.collection("posts");

    const filter = { _id: new ObjectId(data) }; //ObjectId(data.id) }
    const options = {
      sort: { createdAt: -1 },
    };

    await postsCollection.deleteOne(filter, options);

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

//   if (req.method === "DELETE") {

//     const result = await postsCollection.deleteOne(data);

//     console.log(result);

//     res.status(201).json({ message: "Post deleted sucessfully" });
//   }

//   client.close();
// }

export default handler;
