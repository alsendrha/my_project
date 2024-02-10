import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../pages/LoginPage/UserContext";
import { getAuth, signOut } from "firebase/auth";
import app from "../firebase";

const NavBar = () => {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const { userData, setUserData } = useContext(UserContext);
  const auth = getAuth(app);
  const handleChange = (e) => {
    navigate(`/search?keyword=${e.target.value}`);
    setSearchValue(e.target.value);
  };

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        setUserData({});
        localStorage.removeItem("userData");
        navigate("/");
        window.location.reload();
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <NavWrapper>
      <Logo>
        <img
          src="/images/logo.png"
          onClick={() => (window.location.href = "/")}
        />
      </Logo>
      <Input
        className="nav_input"
        type="text"
        placeholder="관광지를 검색해주세요"
        value={searchValue}
        onChange={handleChange}
      />
      {!userData ? (
        <Login onClick={() => (window.location.href = "login")}>로그인</Login>
      ) : (
        <SignOut>
          <UserImg src={userData.photoURL} alt={userData.displayName} />
          <DropDown>
            <span onClick={handleLogOut}>Sign Out</span>
          </DropDown>
        </SignOut>
      )}
    </NavWrapper>
  );
};

const UserImg = styled.img`
  border-radius: 50%;
  width: 100%;
  height: 100%;
`;

const DropDown = styled.div`
  position: absolute;
  top: 48px;
  right: 0;
  background-color: rgba(19, 19, 19);
  border: 1px solid rgba(151, 151, 151, 0.34);
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 50%) 0px 0px 18px 0px;
  padding: 10px;
  font-size: 14px;
  letter-spacing: 3px;
  width: 100px;
  opacity: 0;
  color: white;
`;

const SignOut = styled.div`
  position: relative;
  height: 48px;
  width: 48px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;

  &:hover {
    ${DropDown} {
      opacity: 1;
      transition-duration: 1s;
    }
  }
`;

const NavWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: #000000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  letter-spacing: 16px;
  z-index: 3;
`;

const Logo = styled.a`
  padding: 0;
  width: 60px;
  display: inline-block;
  cursor: pointer;
  img {
    display: block;
    width: 100%;
  }
`;

const Input = styled.input`
  position: fixed;
  left: 50%;
  transform: translate(-50%, 0);
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 5px;
  color: white;
  padding: 5px;
  border: 1px solid lightgray;
`;

const Login = styled.a`
  background-color: rgba(0, 0, 0, 0.6);
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border: 1px solid #f9f9f9;
  color: #f9f9f9;
  border-radius: 4px;
  transition: all 0.2s ease;
  cursor: pointer;
  &:hover {
    background-color: #f9f9f9;
    color: #000;
    border-color: transparent;
  }
`;

export default NavBar;
