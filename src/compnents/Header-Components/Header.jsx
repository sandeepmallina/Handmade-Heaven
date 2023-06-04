import React, { useContext, useEffect, useState } from "react";
import "./Header.css";
import { GrFavorite } from "react-icons/gr";
import { FiShoppingCart } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { db } from "../../firebase";
import { MdSearch } from "react-icons/md";
import { MdShoppingBasket } from "react-icons/md";
import { BsPersonCircle } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useStateValue } from "../StateProvider/StateProvider";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { useUserStateValue } from "../SimpleStateProvider/UnameProvider";
import { RxHamburgerMenu } from "react-icons/rx";
function Header() {
  const history = useNavigate();
  const [{ basket, user }, dispatch] = useStateValue();
  const { setUsername, userName } = useUserStateValue();
  const [showMenuitems, setShowMenuitems] = useState(false);
  const handleAuthentication = () => {
    if (user) {
      history("/");
      auth.signOut();
    }
  };
  auth.onAuthStateChanged((Nuser) => {
    var userRef = db.collection("users").doc(Nuser?.uid);
    userRef
      .get()
      .then(function (doc) {
        if (doc.exists) {
          var username = doc.data().username;
          console.log("Username:1 ", username);
          setUsername(username);
          // localStorage.setItem("username",JSON.stringify(username));
        } else {
          console.log("No such document!");
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
  });
  return (
    <div className="header">
      <Link to="/">
        <img
          className="header-logo"
          src="https://i.ibb.co/PcVkLrs/Screenshot-2023-03-26-000104-removebg-preview.png"
          alt=""
          srcset=""
        />
      </Link>

      <div className="header-search">
        <input
          className="header-searchInput"
          type="text"
          // placeholder=" for depoly change from poweshell to cmd in vscode"
          placeholder="serach for Art"
        />
        <MdSearch size="2em" className="header-searchIcon" />
      </div>
      <div className="hamburger__menu">
        <a href="#" onClick={() => setShowMenuitems(!showMenuitems)}>
          <RxHamburgerMenu size="2rem" />
        </a>
      </div>

      <div className={showMenuitems ? "header-right visible" : "header-right"}>
        <div className="user-container">
          <BsPersonCircle size="2rem" strokeWidth={0} />
          <Link to={!user && "/login"} className="link-styles">
            <div className="user-data" onClick={handleAuthentication}>
              <h4 className="link-styles wish__font">
                Hello, {user ? userName : "Guest"}
              </h4>
              <h4 className="link-styles ">{user ? "Sign Out" : "Sign In"}</h4>
            </div>
          </Link>
        </div>
        <div className="header-search2">
          <input
            className="header-searchInput2"
            type="text"
            // placeholder=" for depoly change from poweshell to cmd in vscode"
            placeholder="serach for Art"
          />
          <MdSearch size="2em" className="header-searchIcon2" />
        </div>

        <Link to="/wishlist" className="link-styles ">
          <div className="wish__list__container">
            <div className="header-favourites">
              <GrFavorite size="2rem" />
            </div>
            <div className="wish__list__right__container wish__font">
              <p className="wish__info wish__font">wish list</p>
              <p className="wish__info ">99</p>
            </div>
          </div>
        </Link>
        <Link to="/orders" className="link-styles">
          <div className="order-returns">
            <span>Orders / </span>
            <span>Returns</span>
          </div>
        </Link>
        <Link to="/checkout" className="link-styles">
          <div className="cart">
            <FiShoppingCart size="2.5rem" />{" "}
            <h4 className="item-count">{basket?.length}</h4>{" "}
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
