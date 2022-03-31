import { MongoClient, ObjectId } from "mongodb";
import { Fragment } from "react";
import Head from "next/head";

import { Card } from "react-bootstrap";

import classes from "./index.module.css";

function PostDetails(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.postData.title}</title>
        <meta name="description" content={props.postData.description} />
      </Head>

      <div className={classes.detail}>
        <Card className="mx-auto shadow mb-4 bg-white rounded">
          <Card.Img src={props.postData.image} alt="My blog image" />
          <Card.Body>
            <h3 className="p-2">{props.postData.title}</h3>
            <Card.Text className="p-3">{props.postData.description}</Card.Text>
          </Card.Body>
        </Card>
      </div>
    </Fragment>
  );
}

export async function getStaticProps(context) {
  //fetch data for single meetup

  const postId = context.params.postID;

  const client = await MongoClient.connect(
    "mongodb+srv://bhagym09:bhagym09@cluster0.rocpp.mongodb.net/myBlog?retryWrites=true&w=majority"
  );

  const db = client.db();

  const postsCollection = db.collection("posts");

  const selectedPost = await postsCollection.findOne({
    _id: ObjectId(postId),
  });

  client.close();

  return {
    props: {
      postData: {
        id: selectedPost._id.toString(),
        title: selectedPost.title,
        description: selectedPost.description,
        image: selectedPost.image,
      },
    },
  };
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://bhagym09:bhagym09@cluster0.rocpp.mongodb.net/myBlog?retryWrites=true&w=majority"
  );

  const db = client.db();

  const postsCollection = db.collection("posts");

  const posts = await postsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: false,

    paths: posts.map((post) => ({
      params: {
        postID: post._id.toString(),
      },
    })),
  };
}

export default PostDetails;
