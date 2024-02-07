import { useRef } from "react";
import "./Modal.css";
import useOnclickOutside from "../../hooks/useOnClickOutside";
const DetailModal = ({
  addr1,
  addr2,
  firstimage,
  title,
  tel,
  setModalOpen,
}) => {
  const ref = useRef(null);
  useOnclickOutside(ref, () => {
    setModalOpen(false);
  });
  console.log(ref);
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailModal;
