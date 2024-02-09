import { useEffect, useRef, useState } from "react";
import "./Modal.css";
import useOnclickOutside from "../../hooks/useOnClickOutside";
import axios from "axios";
import { apiKey, baseUrl } from "../../api/api";
const DetailModal = ({
  addr1,
  addr2,
  firstimage,
  title,
  tel,
  setModalOpen,
  contentid,
}) => {
  const ref = useRef(null);
  useOnclickOutside(ref, () => {
    setModalOpen(false);
  });
  const [overViewData, setOverViewData] = useState("");

  useEffect(() => {
    overView();
  }, []);

  const overView = async () => {
    const response = await axios.get(
      `${baseUrl}detailCommon1?serviceKey=${apiKey}&MobileOS=ETC&MobileApp=AppTest&_type=json&contentId=${contentid}&contentTypeId=12&defaultYN=Y&overviewYN=Y&numOfRows=1&pageNo=1`
    );
    setOverViewData(response.data.response.body.items.item[0].overview);
  };
  return (
    <div className="presentation" role="presentation">
      <div className="wrapper_modal">
        <div className="modal" ref={ref}>
          <span onClick={() => setModalOpen(false)} className="modal_close">
            X
          </span>

          <img
            className="modal_poster_img"
            src={firstimage ? firstimage : "images/no_img.jpg"}
            alt="관광지 이미지"
            onClick={() => setModalOpen(false)}
          />
          <div className="modal_content">
            <h2 className="modal_title">{title}</h2>
            <p className="modal_address">{`주소지: ${addr1}, ${addr2}`}</p>
            <p className="modal_tel">{`연락처: ${
              tel ? tel : "연락처 없음"
            }`}</p>
            <div className="modal_overview">
              {!overViewData ? (
                "Loading..."
              ) : (
                <p
                  dangerouslySetInnerHTML={{
                    __html: overViewData
                      .replace(/<br \/>/g, "<br />")
                      .replace(/\n/g, "<br />"),
                  }}
                ></p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailModal;
