import "bootstrap/dist/css/bootstrap.min.css";
import MainNavigation from "../components/layout/MainNavigation";

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <MainNavigation />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
