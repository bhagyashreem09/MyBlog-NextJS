import { MongoClient } from "mongodb";

import Head from "next/head";
import { Fragment } from "react";

import PostList from "../components/posts/PostList";

function AllPosts(props) {
  return (
    <Fragment>
      <Head>
        <title>MyBlog</title>
        <meta
          name="description"
          content="Your only place to share photos and content you love."
        />
      </Head>

      <PostList posts={props.posts} />
    </Fragment>
  );
}

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://bhagym09:bhagym09@cluster0.rocpp.mongodb.net/myBlog?retryWrites=true&w=majority"
  );

  const db = client.db();

  const postsCollection = db.collection("posts");

  const posts = await postsCollection.find().sort({ createdAt: -1 }).toArray(); //will find all the documents, then convert them into an array.

  client.close();

  return {
    props: {
      posts: posts.map((post) => ({
        id: post._id.toString(),
        title: post.title,
        image: post.image,
        author: post.author,
        description: post.description,
        createdAt: post.createdAt.toString(),
      })),
    },
    revalidate: 1,
  };
}

// export async function getServerSideProps(context) {
//   const request = context.req;
//   const response = context.res;

//   return {
//     props: {
//       meetups : DUMMY_DATA
//     }
//   }
// }

export default AllPosts;
