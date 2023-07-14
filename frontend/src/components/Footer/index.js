import "./Footer.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
const Footer = () => {
  return (
    <div className="Footer-Container">
      <div className="Account-Div">
        <h3 className="header-foot">Connect With Me</h3>
        <a href="https://github.com/ChrisPHong" className="link-class">
          Github
        </a>
        <Link to="/login" className="link-class">
          Login
        </Link>
      </div>
      <div className="Account-Div">
        <h3 className="header-foot">Account</h3>
        <a href="/signup" className="link-class">
          Create Account
        </a>
        <a href="/login" className="link-class">
          Login
        </a>
      </div>
    </div>
  );
};

export default Footer;
