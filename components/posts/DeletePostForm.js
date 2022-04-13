import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import { useRouter } from "next/router";

import classes from "./DeletePostForm.module.css";
import { forwardRef } from "react";

const DeletePostForm = forwardRef((props, ref) => {
  const router = useRouter();
  const date = new Date().toString();

  async function deletePostHandler() {
    console.log("delete button clicked");

    const postId = router.query.postID;

    await fetch("/api/api-handling", {
      // this will trigger the api function.
      method: "DELETE",
      body: postId,
    });

    return router.replace("/all-posts");
  }

  function modalClose() {
    router.replace("/all-posts");
  }

  return (
    <Card className={classes.card}>
      <Card.Body className={classes.content}>
        <h4 className={classes.header}>Delete Post</h4>

        <Card.Text className={classes.body}>
          Are you sure you want to delete post? <br /> This action cannot be
          undone.
        </Card.Text>

        <div className={classes.align}>
          <Button onClick={modalClose} className={classes.cancel} type="button">
            Cancel
          </Button>
          <Button
            className={classes.delete}
            onClick={deletePostHandler}
            type="submit"
          >
            Delete
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
});

export default DeletePostForm;
