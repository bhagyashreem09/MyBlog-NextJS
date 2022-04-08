import { MongoClient, ObjectId } from "mongodb";
import { createRef, Fragment, useState } from "react";
import Head from "next/head";

import { useRouter } from "next/router";

import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Modal from "@mui/material/Modal";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { Card } from "react-bootstrap";

import UpdatePostForm from "../../components/posts/UpdatePostForm";
import DeletePostForm from "../../components/posts/DeletePostForm";

import Footer from "../../components/layout/Footer";

import classes from "./index.module.css";

//----------------------------------- DETAILS Page--------------------------------------

function PostDetails(props) {
  const ref = createRef();
  const router = useRouter();

  const [editStateOpen, setEditStateOpen] = useState(false);
  const [deleteStateOpen, setDeleteStateOpen] = useState(false);

  const editOpen = () => setEditStateOpen(true);
  const editClose = () => setEditStateOpen(false);

  const deleteOpen = () => setDeleteStateOpen(true);
  const deleteClose = () => setDeleteStateOpen(false);

  //----------------------------DELETE FUNCTION---------------------------------

  async function deletePostHandler() {
    console.log("delete button clicked");

    const postId = router.query.postID;

    //const deleteDoc = { id: postId.toString() };
    // const deleteDoc = postId.toString();

    await fetch("/api/add-update-post", {
      // this will trigger the api function.
      method: "DELETE",
      body: postId,
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(postId);

    return router.replace("/all-posts");
  }

  // ---------------------- EDIT FUNCTION ------------------------------------

  async function editPostHandler(updatedData) {
    //const mypath = router.push("/update-post");

    const postId = router.query.postID;

    const updatedPostData = {
      id: postId.toString(),
      title: updatedData.title,
      description: updatedData.description,
      // image: updatedData.image,
      createdAt: updatedData.createdAt,
    };

    const response = await fetch("/api/add-update-post", {
      // this will trigger the api function.
      method: "PUT",
      body: JSON.stringify(updatedPostData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    await response.json();

    // console.log(updatedPostData);

    return router.replace("/all-posts");
  }

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
            <h6>Created at : {props.postData.createdAt}</h6>
          </Card.Body>

          <div className={classes.iconButtons}>
            <Tooltip title="Edit Post">
              <IconButton onClick={editOpen} aria-label="edit">
                <EditIcon />
              </IconButton>
            </Tooltip>
            {
              <Modal open={editStateOpen} onClose={editClose}>
                <UpdatePostForm ref={ref} updatePost={editPostHandler} />
              </Modal>
            }

            <Tooltip title="Delete Post">
              <IconButton onClick={deleteOpen} aria-label="delete">
                <DeleteIcon />
              </IconButton>
            </Tooltip>
            {
              <Modal open={deleteStateOpen} onClose={deleteClose}>
                <DeletePostForm onClick={deletePostHandler} />
              </Modal>
            }
          </div>
        </Card>
      </div>
      <Footer />
    </Fragment>
  );
}

export async function getStaticProps(context) {
  //fetch data for single post

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
        createdAt: selectedPost.createdAt,
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
    fallback: "blocking",

    paths: posts.map((post) => ({
      params: {
        postID: post._id.toString(),
      },
    })),
  };
}

export default PostDetails;
