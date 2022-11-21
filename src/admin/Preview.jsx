import React, { useContext } from "react";
import thumbnail from "../assets/img/Mr Victor.jpg";
import { MdDeleteForever } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import GlobalContext from "../context/GlobalContext";

function Preview({ preview }) {
  const { deleteLab, editLab } = useContext(GlobalContext);

  return (
    <div className="preview-labs">
      <div className="lab-item">
        <h5>{preview.name}</h5>
        <p>Name</p>
      </div>
      <div className="lab-item">
        <h5>{preview.category}</h5>
        <p>Category</p>
      </div>
      <div className="lab-item">
        <h5>{preview.tag}</h5>
        <p>Tags</p>
      </div>
      <div className="lab-item">
        <h5>{preview.team}</h5>
        <p>Team</p>
      </div>
      <div className="lab-item">
        <img src={thumbnail} alt="thumbnail" />
        <p>Thumbnail</p>
      </div>

      <div className="prev-btns">
        <MdDeleteForever
          onClick={() => deleteLab(preview.id)}
          className="prev-btn"
          color="red"
          size="30px"
        />
        &nbsp;
        <FaRegEdit
          onClick={() => editLab(preview)}
          className="prev-btn"
          color="yellow"
          size="30px"
        />
      </div>
    </div>
  );
}

export default Preview;
