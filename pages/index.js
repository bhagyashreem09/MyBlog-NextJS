// import { MongoClient } from "mongodb";

import React from "react";

// import Head from "next/head";
// import { Fragment } from "react";

// import PostList from "../components/posts/PostList";

// function HomePage(props) {
//   return (
//     <Fragment>
//       <Head>
//         <title>My Blog</title>
//         <meta
//           name="description"
//           content="Your only place to share photos and content you love."
//         />
//       </Head>

//       <PostList posts={ props.posts } />

//     </Fragment>
//   );
// }

// export async function getStaticProps() {
//   const client = await MongoClient.connect(
//     "mongodb+srv://bhagym09:bhagym09@cluster0.rocpp.mongodb.net/myBlog?retryWrites=true&w=majority"
//   );

//   const db = client.db();

//   const postsCollection = db.collection("posts");

//   const posts = await postsCollection.find().sort({ createdAt: -1 }).toArray(); //will find all the documents, then convert them into an array.

//   client.close();

//   return {
//     props: {
//       posts: posts.map((post) => ({
//         id: post._id.toString(),
//         title: post.title,
//         image: post.image,
//         description: post.description,
//         createdAt: post.createdAt.toString(),
//       })),
//     },
//     revalidate: 1,
//   };
// }

// // export async function getServerSideProps(context) {
// //   const request = context.req;
// //   const response = context.res;

// //   return {
// //     props: {
// //       meetups : DUMMY_DATA
// //     }
// //   }
// // }

// export default HomePage;

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
              {/* <div className={classes.empty}> </div> */}
              <div className={classes.logo}>
                <LogoHeroBox />
              </div>
            </div>
          </div>
        </Card>
        <div className={classes.content}>
          <DecorativeLines />
          <div className={classes.pageCards}>
            <Card onClick={BrowseCardHandler} className={classes.cardImage}>
              <Image
                src={BrowsePosts}
                alt="Add Post Image"
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
        {/* <div className={classes.footer}>
          <a
            className={classes.footerText}
            href="https://www.linkedin.com/in/bhagyashreemarde09/"
          >
            LinkedIn
          </a>
          <a
            className={classes.footerText}
            href="https://github.com/bhagyashreem09"
          >
            GitHub
          </a>
        </div> */}
      </div>
    </div>
  );
}

export default HomePage;
