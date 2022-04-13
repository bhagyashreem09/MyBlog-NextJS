import { useRef } from "react";

// import Card from '../ui/Card';
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import classes from "./NewPostForm.module.css";
import { useRouter } from "next/router";

function NewPostForm(props) {
  const router = useRouter();

  const titleInputRef = useRef();
  const imageInputRef = useRef();
  const authorInputRef = useRef();
  const descriptionInputRef = useRef();
  const date = new Date().toString();

  function submitHandler(event) {
    event.preventDefault();

    const enteredTitle = titleInputRef.current.value;
    const enteredImage = imageInputRef.current.value;
    const enteredAuthor = authorInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;
    const enteredDate = date;

    const postData = {
      title: enteredTitle,
      image: enteredImage,
      author: enteredAuthor,
      description: enteredDescription,
      createdAt: enteredDate,
    };

    props.onAddPost(postData);
  }

  function onCancelHandler() {
    router.replace("/all-posts");
  }

  return (
    <div className={classes.background}>
      <Card className={classes.card}>
        <Form className={classes.form} onSubmit={submitHandler}>
          <h4 className={classes.header}>Add Post</h4>
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
            />
          </div>
          <div className={classes.control}>
            <Form.Label className={classes.label} htmlFor="image">
              Image
            </Form.Label>

            <Form.Control
              className={classes.textbox}
              type="url"
              required
              id="image"
              ref={imageInputRef}
            />
          </div>
          <div className={classes.control}>
            <Form.Label className={classes.label} htmlFor="name">
              Your Name
            </Form.Label>
            <Form.Control
              className={classes.textbox}
              type="text"
              required
              id="name"
              ref={authorInputRef}
              maxLength="20"
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
            />
          </div>

          <div className={classes.align}>
            <Button
              onClick={onCancelHandler}
              className={classes.cancel}
              type="button"
            >
              Cancel
            </Button>
            <Button className={classes.upload} type="submit">
              Upload
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
}

export default NewPostForm;
