import { useRef } from "react";

// import Card from '../ui/Card';
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import classes from "./NewPostForm.module.css";

function NewPostForm(props) {
  const titleInputRef = useRef();
  const imageInputRef = useRef();
  const descriptionInputRef = useRef();

  function submitHandler(event) {
    event.preventDefault();

    const enteredTitle = titleInputRef.current.value;
    const enteredImage = imageInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;

    const postData = {
      title: enteredTitle,
      image: enteredImage,
      description: enteredDescription,
    };

    props.onAddPost(postData);
  }

  return (
    <Card className="mx-auto shadow mb-4 bg-white rounded">
      <Form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <Form.Label htmlFor="title">Post Title</Form.Label>
          <Form.Control type="text" required id="title" ref={titleInputRef} />
        </div>
        <div className={classes.control}>
          <Form.Label htmlFor="image">Post Image</Form.Label>
          <Form.Control type="url" required id="image" ref={imageInputRef} />
        </div>
        <div className={classes.control}>
          <Form.Label htmlFor="description">Post Description</Form.Label>
          <Form.Control
            required
            as="textarea"
            rows={3}
            id="description"
            ref={descriptionInputRef}
          />
        </div>

        <div className={classes.actions}>
          <Button type="submit">Upload</Button>
        </div>
      </Form>
    </Card>
  );
}

export default NewPostForm;
