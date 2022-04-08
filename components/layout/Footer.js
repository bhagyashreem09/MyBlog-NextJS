import classes from "./Footer.module.css";

function Footer() {
  return (
    <div className={classes.footer}>
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
    </div>
  );
}

export default Footer;
