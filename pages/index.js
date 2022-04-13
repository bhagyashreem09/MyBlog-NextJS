import React from "react";

import Image from "next/image";
import { useRouter } from "next/router";

import Card from "react-bootstrap/Card";

import HeroboxImage from "../public/herobox_magazine.jpg";
import BrowsePosts from "../public/BrowsePosts.jpg";
import AddPost from "../public/AddPost.jpg";

import LogoHeroBox from "../public/LogoHeroBox.svg";
import DecorativeLines from "../public/DecorativeLines.svg";

import Footer from "../components/layout/Footer";

import classes from "./index.module.css";

function HomePage() {
  const router = useRouter();

  function BrowseCardHandler() {
    router.push("/all-posts");
  }

  function AddPostCardHandler() {
    router.push("/new-post");
  }

  return (
    <div>
      <div className={classes.background}>
        <Card className={classes.card}>
          <Image
            src={HeroboxImage}
            alt="Magazine Image"
            width="570px"
            height="560px"
          />
          <div className={classes.textContent}>
            <div>
              <h3 className={classes.text1}>
                Write. <br /> Create. <br /> Share.
              </h3>
            </div>
            <p className={classes.text2}>
              Be it a poetry, memories, or just ideas.
              <br /> Let your creative side spark, with...
            </p>
            <div className={classes.logoWrapper}>
              <LogoHeroBox />
            </div>
          </div>
        </Card>
        <div className={classes.content}>
          <DecorativeLines />
          <div className={classes.pageCards}>
            <Card onClick={BrowseCardHandler} className={classes.cardImage}>
              <Image
                src={BrowsePosts}
                alt="Browse Posts Image"
                width="400px"
                height="400px"
              />
              <p className={classes.cardTitle}>Browse All Posts</p>
            </Card>
            <Card onClick={AddPostCardHandler} className={classes.cardImage}>
              <Image
                src={AddPost}
                alt="Add Post Image"
                width="400px"
                height="400px"
              />
              <p className={classes.cardTitle}>Create a Post</p>
            </Card>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default HomePage;
