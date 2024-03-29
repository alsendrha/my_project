import { useEffect, useState } from "react";
import "./MainScreen.css";
import axios from "../api/api";

const MainScreen = () => {
  const [mainScreen, setMainScreen] = useState([]);
  useEffect(() => {
    const mainImage = async () => {
      try {
        const response = await axios.get("", {
          params: {
            numOfRows: 100,
            keyword: "서울",
          },
        });
        const imageData = response.data.response.body.items.item;
        const images = imageData
          .filter((item) => item.firstimage)
          .map((item) => item);
        const randomImage = Math.floor(Math.random() * images.length);
        setMainScreen(images[randomImage]);
      } catch (error) {
        console.log("error입니다,", error);
      }
    };
    mainImage();
  }, []);
  console.log("이거 뭐야 : ", mainScreen);
  return (
    <div className="main_view">
      <div className="main_image_container">
        <img className="main_img" src={mainScreen.firstimage} />
        {mainScreen.firstimage && <div className="background_gradient"></div>}
        <div className="main_screen_title">
          <p>{mainScreen.title}</p>
        </div>
      </div>
    </div>
  );
};

export default MainScreen;
