import "bootstrap/dist/css/bootstrap.min.css";
// import Layout from "../components/layout/Layout";
import MainNavigation from "../components/layout/MainNavigation";

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <MainNavigation />
      {/* <Layout> */}
      <Component {...pageProps} />
      {/* </Layout> */}
    </div>
  );
}

export default MyApp;
