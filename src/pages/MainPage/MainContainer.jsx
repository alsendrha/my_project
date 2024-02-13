import MainScreen from "../../components/MainScreen";
import Row from "../../components/Row";

const MainContainer = () => {
  const city = [
    "서울",
    "경기",
    "인천",
    "강원",
    "충북",
    "충남",
    "대전",
    "경북",
    "경남",
    "대구",
    "울산",
    "부산",
    "전북",
    "전남",
    "광주",
    "제주",
  ];
  return (
    <div>
      <MainScreen />
      {city.map((item, index) => {
        return <Row key={index} city={item} />;
      })}
    </div>
  );
};

export default MainContainer;
