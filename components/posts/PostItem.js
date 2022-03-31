import { useRouter } from "next/router";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

//import Card from "../ui/Card";
import classes from "./PostItem.module.css";

function PostItem(props) {
  const router = useRouter();

  function showDetailsHandler() {
    router.push("/" + props.id);
  }

  return (
    // <li className={classes.item}>
    <Card className="mx-auto shadow mb-4 bg-white rounded">
      {/* <div className={classes.image}> */}
      <Card.Img variant="top" src={props.image} alt={props.title} />
      <Card.Body>
        <div className={classes.content}>
          <h3>{props.title}</h3>
        </div>
        {/* <h3>{ props.title }</h3> */}

        <div className={classes.actions}>
          <Button
            onClick={showDetailsHandler}
            variant="outline-dark"
            className="text-center"
          >
            Read More
          </Button>
        </div>
      </Card.Body>
    </Card>
    // </li>
  );
}

export default PostItem;
