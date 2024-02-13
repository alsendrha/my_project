import axios from "../api/api";
import "./Row.css";
import DetailModal from "./Modal";
import { useEffect, useState } from "react";

const Row = ({ city }) => {
  const [dataInfo, setDataInfo] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState([]);

  const handleClick = (data) => {
    setModalOpen(true);
    setSelected(data);
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get("", {
        params: {
          numOfRows: 20,
          keyword: city,
        },
      });
      setDataInfo(response.data.response.body.items.item);
      console.log(response);
    } catch (error) {
      console.log("error입니다,", error);
    }
  };

  return (
    <div>
      <h3 className="row_title">{city}</h3>
      <div className="slider">
        <div
          className="slider_arrow_left"
          onClick={() => {
            document.getElementById(city).scrollLeft -= window.innerWidth - 80;
          }}
        >
          <span className="arrow">{"<"}</span>
        </div>
        <div id={city} className="row_posters">
          {dataInfo.map((item) => (
            <div key={item.contentid}>
              <img
                className="row_poster"
                src={item.firstimage ? item.firstimage : "images/no_img.jpg"}
                alt="관광지 이미지"
                onClick={() => handleClick(item)}
              />
              <div>
                <p className="row_main_title">{item.title}</p>
              </div>
            </div>
          ))}
        </div>
        <div
          className="slider_arrow_right"
          onClick={() => {
            document.getElementById(city).scrollLeft += window.innerWidth - 80;
          }}
        >
          <span className="arrow">{">"}</span>
        </div>
      </div>
      {modalOpen ? (
        <DetailModal {...selected} setModalOpen={setModalOpen} />
      ) : null}
    </div>
  );
};

export default Row;
