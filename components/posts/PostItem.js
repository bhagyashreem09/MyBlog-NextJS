import { useRouter } from "next/router";
import Image from "next/image";

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
    //   <Card className="flex-container">
    //     {/* <div className={classes.image}> */}
    //     <Card.Img variant="top" src={props.image} alt={props.title} />
    //     <Card.Body>
    //       <div className={classes.content}>
    //         <h3>{props.title}</h3>
    //         <p>{props.author}</p>
    //         <p>{props.description}</p>
    //       </div>
    //       <div className={classes.actions}>
    //         <Button
    //           onClick={showDetailsHandler}
    //           variant="outline-dark"
    //           className="text-center"
    //         >
    //           Read More
    //         </Button>
    //       </div>
    //     </Card.Body>
    //   </Card>
    // </li>

    <div className={classes.background}>
      <Card className={classes.card}>
        <Card.Img
          src={props.image}
          alt={props.title}
          // width="10%"
          // height="560px"
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
