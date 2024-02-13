import styled from "styled-components";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import app from "../../firebase";
import { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";

const LoginPage = () => {
  const { pathname } = useLocation();
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const { setUserData } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("");
      } else if (user && pathname === "/login") {
        navigate("/");
      }
    });
  }, [auth, navigate, pathname]);

  const handleAuth = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        setUserData(result.user);
        localStorage.setItem("userData", JSON.stringify(result.user));
        console.log(result);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <Container>
      <Center>
        <HeadingText>이메일 로그인하세요</HeadingText>
        <Description>
          한국 관광지에 대한 모든걸 간단한 로그인을 통해 확인해보아요
        </Description>
        <Button>이메일</Button>
        <LinkText>회원가입</LinkText>
        <LinkText>이메일/비밀번호를 잃어버렸어요</LinkText>
        <Logo
          src="/images/google_2_500.png"
          alt="로고"
          onClick={() => handleAuth()}
        />
        {/* <HeadingText>Sign in with your Google ID</HeadingText> */}
        {/* <Button onClick={() => handleAuth()}>google ID</Button> */}
      </Center>
    </Container>
  );
};

const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Description = styled.p`
  margin: 0;
  font-size: 1.3rem;
`;

const LinkText = styled.p`
  font-size: 1.2rem;
  color: #2997ff;
  margin: 2rem 0 0 0;
`;

const Center = styled.div`
  max-width: 650px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Logo = styled.img`
  margin: 1rem 0 0 0;
  /* margin-bottom: 1.3rem; */
  width: 50px;
  cursor: pointer;
`;

const HeadingText = styled.h1`
  font-size: 1.9rem;
`;

const Button = styled.a`
  margin-top: 1rem;
  /* margin-bottom: 8rem; */
  font-size: 18px;
  padding: 1rem;
  border: 1px solid transparent;
  border-radius: 12px;
  border-color: #424245;
  background-color: hsla(0, 0%, 100%, 0.04);
  width: 310px;
  font-weight: 400;
  cursor: pointer;

  &:hover {
    background-color: hsla(0, 0%, 100%, 0);
  }
`;

export default LoginPage;
