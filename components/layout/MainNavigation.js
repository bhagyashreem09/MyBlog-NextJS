import Link from "next/link";

import classes from "./MainNavigation.module.css";

import LogoNavBar from "../../public/LogoNavBar.svg";
import FlareIcon from "@mui/icons-material/Flare";

function MainNavigation() {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link href="/">
          {/* <div>
            <FlareIcon />
            MyBlog
          </div> */}
          <LogoNavBar />

          {/* <LogoNavBar /> */}
        </Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link href="/all-posts">All Posts</Link>
          </li>
          <li>
            <Link href="/new-post">Add New Post</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
