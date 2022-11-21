import { useState, useEffect, useContext } from "react";
import { RiUploadCloudFill } from "react-icons/ri";
import GlobalContext from "../context/GlobalContext";
import "./Admin.css";
import Preview from "./Preview";

function CreateLab() {
  // const imageMimeType = /image\/(png|jpg|jpeg)/i;
  const { addLab, labsData, labEdit, updateLab } = useContext(GlobalContext);

  const [formData, setFormData] = useState(labsData);
  const [file, setFile] = useState(null);
  const [fileDataURL, setFileDataURL] = useState(null);

  const { name, tag, desc, category, team, image } = formData;

  //For Categories
  const categories = [
    { id: 1, name: "Web" },
    { id: 2, name: "Linux" },
  ];

  const teams = [
    { id: 1, name: "Red Team" },
    { id: 2, name: "Blue Team" },
  ];

  //This part help trigger the button to update it, the labEdit
  useEffect(() => {
    if (labEdit.edit === true) {
      setFormData({
        name: labEdit.room.name,
        tag: labEdit.room.tag,
        desc: labEdit.room.desc,
        category: labEdit.room.category,
        team: labEdit.room.team,
        image: labEdit.room.image,
      });
    }
  }, [labEdit]);

  const onChange = (e) => {
    //   For Image Review
    //For files
    if (e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        image: e.target.files[0],
      }));
      setFile(e.target.files[0]);
    }
    //For text/boolean/numbers
    if (!e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: e.target.value,
      }));
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const labsDataCopy = {
      name,
      tag,
      desc,
      category,
      team,
      image,
    };
    addLab(labsDataCopy);

    //Check if the labEdit function is triggered, if yes, update the id of the document
    if (labEdit.edit === true) {
      updateLab(labEdit.room.id, labsDataCopy);
    }
    setFormData({
      name: "",
      tag: "",
      desc: "",
      category: "",
      team: "",
      image: "",
    });
  };

  useEffect(() => {
    let fileReader,
      isCancel = false;
    if (file) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setFileDataURL(result);
        }
      };
      fileReader.readAsDataURL(file);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [file]);

  return (
    <div className="box create-labs">
      <h5>Create Lab</h5>
      <form onSubmit={onSubmit}>
        <div className="form1">
          <div className="form-box">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name || ""}
              onChange={onChange}
              placeholder="Enter Lab Name"
              required
            />
          </div>
          <div className="form-box">
            <label htmlFor="tag">
              Tags <span>minimum of 5 tags</span>
            </label>
            <input
              type="text"
              value={tag || ""}
              id="tag"
              required
              onChange={onChange}
              placeholder="Separate Tags With Commas"
            />
          </div>
          <div className="form-box">
            <label htmlFor="desc">Description</label>
            <textarea
              id="desc"
              onChange={onChange}
              value={desc || ""}
              placeholder="Enter description of lab"
            ></textarea>
          </div>
        </div>

        <div className="form2">
          <div className="form-box">
            <label htmlFor="category">Choose category</label>
            <select
              id="category"
              name="category"
              onChange={onChange}
              value={category || ""}
              form="category"
              required
            >
              <option>-- Category --</option>
              {categories.map((category) => {
                return (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                );
              })}
            </select>{" "}
          </div>
          <div className="form-box">
            <label htmlFor="team">Select Team</label>
            <select
              id="team"
              name="team"
              onChange={onChange}
              value={team || ""}
              form="team"
              required
            >
              <option>-- TEAM --</option>
              {teams.map((team) => {
                return (
                  <option key={team.id} value={team.name}>
                    {team.name}
                  </option>
                );
              })}
            </select>{" "}
          </div>
          <div className="form-box">
            <label htmlFor="image">
              Thumbnail <span>minimum of 1 thumbnail</span>
            </label>
            <div className="form-box-upload">
              <div className="upload">
                <RiUploadCloudFill size="60px" color="#15c3ab9c" />
                <br />
                <p>Drag & Drop Your Files Here</p>
                <input
                  type="file"
                  onChange={onChange}
                  name="image"
                  id="image"
                  accept="image/x-png,image/jpeg"
                />
              </div>
              <div
                className="preview"
                style={{ backgroundImage: `url(${fileDataURL})` }}
              >
                &nbsp;
              </div>
            </div>
          </div>
        </div>

        <button type="submit" className="create">
          Create
        </button>
      </form>

      <div className="display-labs">
        {labsData.map((prevLab) => (
          <Preview preview={prevLab} key={prevLab.id} id={prevLab.id} />
        ))}
      </div>
    </div>
  );
}

export default CreateLab;
