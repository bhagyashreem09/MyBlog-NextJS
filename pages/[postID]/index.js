import { MongoClient, ObjectId } from "mongodb";
import { Fragment, useState, createRef } from "react";
import Head from "next/head";
import Image from "next/image";

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
  const forwardRef = createRef();

  const router = useRouter();

  const [editStateOpen, setEditStateOpen] = useState(false);
  const [deleteStateOpen, setDeleteStateOpen] = useState(false);

  const editOpen = () => setEditStateOpen(true);
  const editClose = () => setEditStateOpen(false);

  const deleteOpen = () => setDeleteStateOpen(true);
  const deleteClose = () => setDeleteStateOpen(false);

  return (
    <Fragment>
      <Head>
        <title>{props.postData.title}</title>
        <meta name="description" content={props.postData.description} />
      </Head>

      <div className={classes.detail}>
        <img src={props.postData.image} alt="My blog image" />
        <Card className={classes.textContent}>
          <Card.Body>
            <div className={classes.textHeader}>
              <h3 className={classes.textTitle}>{props.postData.title}</h3>
              <p className={classes.textAuthor}>
                - by {props.postData.author} -
              </p>
            </div>

            <div className={classes.textBody}>
              <h6 className={classes.textCreatedAt}>
                Created At : {props.postData.createdAt}
              </h6>
              <Card.Text className={classes.textDescription}>
                {props.postData.description}
              </Card.Text>
            </div>

            <div className={classes.iconButtons}>
              <Tooltip title="Edit Post">
                <IconButton onClick={editOpen} aria-label="edit">
                  <EditIcon />
                </IconButton>
              </Tooltip>
              {
                <Modal open={editStateOpen} onClose={editClose}>
                  <UpdatePostForm ref={forwardRef} />
                </Modal>
              }

              <Tooltip title="Delete Post">
                <IconButton onClick={deleteOpen} aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
              {
                <Modal open={deleteStateOpen} onClose={deleteClose}>
                  <DeletePostForm ref={forwardRef} />
                </Modal>
              }
            </div>
          </Card.Body>
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
        author: selectedPost.author,
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
