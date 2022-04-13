import { useRouter } from "next/router";
import Image from "next/image";

import Card from "react-bootstrap/Card";

import classes from "./PostItem.module.css";

function PostItem(props) {
  const router = useRouter();

  function showDetailsHandler() {
    router.push("/" + props.id);
  }

  return (
    <div className={classes.background}>
      <Card onClick={showDetailsHandler} className={classes.card}>
        <Card.Img
          src={props.image}
          alt={props.title}
          className={classes.image}
        />
        <div className={classes.textContent}>
          <div>
            <h3 className={classes.textTitle}>{props.title}</h3>
            <p className={classes.textAuthor}>- by {props.author}</p>
          </div>
          <p className={classes.textDescription}>{props.description}</p>
          <p className={classes.textReadMore} onClick={showDetailsHandler}>
            Read More
          </p>
        </div>
      </Card>
    </div>
  );
}

export default PostItem;
