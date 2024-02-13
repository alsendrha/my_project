import styled from "styled-components";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import app from "../../firebase";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";

const LoginPage = () => {
  const { pathname } = useLocation();
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const { setUserData } = useContext(UserContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      setUserData(user);
      alert("회원가입 성공");
      localStorage.setItem("userData", JSON.stringify(user));
      console.log(user);
    } catch (error) {
      if (error.code === "auth/invalid-email") {
        alert("이메일 형식이 잘못되었습니다.");
      } else if (error.code === "auth/email-already-in-use") {
        alert("사용중인 아이디입니다.");
      } else if (error.code === "auth/weak-password") {
        alert("비밀번호가 너무 짧습니다.");
      } else {
        alert("알 수 없는 오류가 발생했습니다.");
      }
      console.log(error.code);
    }
  };
  const handleLogin = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      setUserData(user);
      localStorage.setItem("userData", JSON.stringify(user));
      alert("로그인 성공");
      console.log(user);
    } catch (error) {
      alert("잘못된 아이디 또는 비밀번호가 틀렸습니다.");
      console.log(error.message);
    }
  };

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

        <Input
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="비밀번호"
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div>
          <Button type="submit" name="login" onClick={handleLogin}>
            로그인
          </Button>
          <Button type="submit" name="signUp" onClick={handleSignUp}>
            회원가입
          </Button>
        </div>
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
  margin-bottom: 10px;
  font-size: 1.3rem;
`;

const LinkText = styled.p`
  font-size: 1.2rem;
  color: #2997ff;
  margin: 1rem 0 0 0;
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

// const Button = styled.a`
//   margin-top: 1rem;
//   /* margin-bottom: 8rem; */
//   font-size: 18px;
//   padding: 1rem;
//   border: 1px solid transparent;
//   border-radius: 12px;
//   border-color: #424245;
//   background-color: hsla(0, 0%, 100%, 0.04);
//   width: 310px;
//   font-weight: 400;
//   cursor: pointer;

//   &:hover {
//     background-color: hsla(0, 0%, 100%, 0);
//   }
// `;

const Button = styled.button`
  border: none;
  margin-top: 0.5rem;
  padding: 1rem;
  background-color: transparent;
  font-size: 16px;
  color: #2997ff;
  cursor: pointer;
`;

const Input = styled.input`
  margin-top: 0.5rem;
  width: 200px;
  height: 35px;
  padding-left: 10px;
  border-radius: 8px;
  border: 1px solid #424245;
`;
export default LoginPage;
