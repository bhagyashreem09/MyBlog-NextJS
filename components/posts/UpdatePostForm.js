import { useRef, forwardRef } from "react";

// import Card from '../ui/Card';
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import classes from "./UpdatePostForm.module.css";

const UpdatePostForm = forwardRef((props, ref) => {
  // const [title, setTitle] = useState('')
  // const [image, setImage] = useState('');
  // const [description, setDescription] = useState('');

  const titleInputRef = useRef();
  const descriptionInputRef = useRef();
  const date = new Date().toString();

  function submitHandler(event) {
    event.preventDefault();

    const enteredTitle = titleInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;
    const enteredDate = date;

    const updateData = {
      title: enteredTitle,
      description: enteredDescription,
      createdAt: enteredDate,
    };

    props.updatePost(updateData);
  }

  return (
    <Card className={classes.card}>
      <Form className={classes.form} onSubmit={submitHandler}>
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
          />
        </div>

        <div className={classes.align}>
          <Button className={classes.cancel} type="button">
            Cancel
          </Button>
          <Button className={classes.save} type="submit">
            Save
          </Button>
        </div>
      </Form>
    </Card>
  );
});

UpdatePostForm.displayName = "UpdatePostForm";

export default UpdatePostForm;
