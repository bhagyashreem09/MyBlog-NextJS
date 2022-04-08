import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import classes from "./DeletePostForm.module.css";

function DeletePostForm() {
  return (
    <Card className={classes.card}>
      <Card.Body className={classes.content}>
        <h4 className={classes.header}>Delete Post</h4>

        <Card.Text className={classes.body}>
          Are you sure you want to delete post? <br /> This action cannot be
          undone.
        </Card.Text>

        <div className={classes.align}>
          <Button className={classes.cancel} type="button">
            Cancel
          </Button>
          <Button className={classes.delete} type="submit">
            Delete
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default DeletePostForm;
