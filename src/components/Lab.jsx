import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import GlobalContext from "../context/GlobalContext";
import { MdDeleteForever } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

function Lab({ room }) {
  const { deleteLab, labEdit } = useContext(GlobalContext);

  return (
    <div className="labsGrid-box">
      <h3 className="labsGrid-name">{room.name}</h3>
      <h5 className="labsGrid-category">{room.category}</h5>
      <Link to={`/dashboard/labs/${room.id}`} className="start">
        Start Machine &nbsp;▷
      </Link>

      <div className="labsGrid-tags">
        {/* {room.tag.map((tagName) => (
          <p>{tagName}</p>
        ))} */}
        <p>{room.tag}</p>
      </div>
      <button onClick={() => deleteLab(room.id)}>
        <MdDeleteForever size="20px" color="red" />
      </button>
      <button onClick={() => labEdit(room)}>
        <FaRegEdit size="20px" color="yellow" />
      </button>
    </div>
  );
}

export default Lab;
