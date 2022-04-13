import { useRef, forwardRef, useState } from "react";

import { useRouter } from "next/router";

import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import classes from "./UpdatePostForm.module.css";

const UpdatePostForm = forwardRef((props, ref) => {
  const router = useRouter();

  const titleInputRef = useRef();
  const descriptionInputRef = useRef();
  const date = new Date().toString();

  //--------------------------- SUBMIT HANDLER ------------------------------

  async function submitHandler(event) {
    event.preventDefault();

    const enteredTitle = titleInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;
    const enteredDate = date;

    const postId = router.query.postID;

    const updatedPostData = {
      id: postId.toString(),
      title: enteredTitle,
      description: enteredDescription,
      createdAt: enteredDate,
    };

    if (enteredTitle.length < 1 && enteredDescription.length < 1) {
      alert("Title and Description cannot be Null.");
    } else {
      const response = await fetch("/api/api-handling", {
        // this will trigger the api function.
        method: "PUT",
        body: JSON.stringify(updatedPostData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      await response.json();

      return router.replace("/all-posts");
    }
  }

  // --------------------------- Close Modal ----------------------------------

  function modalClose() {
    router.replace("/all-posts");
  }

  return (
    <Card className={classes.card}>
      <Form className={classes.form}>
        <div>
          <h4 className={classes.header}>Edit Post</h4>
          <div className={classes.control}>
            <Form.Label className={classes.label} htmlFor="title">
              Title
            </Form.Label>
            <Form.Control
              className={classes.textbox}
              type="text"
              required
              id="title"
              ref={titleInputRef}
              maxLength="35"
              minLength="3"
            />
          </div>

          <div className={classes.control}>
            <Form.Label className={classes.label} htmlFor="description">
              Description
            </Form.Label>
            <Form.Control
              className={classes.textbox}
              required
              as="textarea"
              rows={2}
              id="description"
              ref={descriptionInputRef}
              maxLength="2000"
              minLength="10"
            />
          </div>

          <div className={classes.align}>
            <Button
              onClick={modalClose}
              className={classes.cancel}
              type="button"
            >
              Cancel
            </Button>
            <Button
              className={classes.save}
              onClick={submitHandler}
              type="submit"
            >
              Save
            </Button>
          </div>
        </div>
      </Form>
    </Card>
  );
});

export default UpdatePostForm;
