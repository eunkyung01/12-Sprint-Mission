import Logo from "../../asset/panda.png";
import UserImg from "../../asset/userIcon.png";
import "./Header.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <a href="#!" className="header__logo">
          <img className="header__logo-img" src={Logo} alt="판다마켓 로고" />
          <span className="header__logo-title">판다마켓</span>
        </a>
        <div className="header__Link-container">
          <Link to="/items" className="header__Link-title">
            자유게시판
          </Link>
          <Link to="/items" className="header__Link-title">
            중고마켓
          </Link>
        </div>
        <img className="header__profile-img" src={UserImg} alt="유저 이미지" />
      </div>
    </header>
  );
}

export default Header;