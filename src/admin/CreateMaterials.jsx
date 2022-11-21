import React from "react";
import axios from "axios";

function CreateMaterials() {
  return (
    <div className="box create-labs">
      <h5>Create Lab</h5>
      <form>
        <div className="form1">
          <div className="form-box">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" placeholder="Enter Lab Name" />
          </div>
          <div className="form-box">
            <label htmlFor="tag">
              Tags <span>minimum of 5 tags</span>
            </label>
            <input
              type="text"
              id="tag"
              placeholder="Separate Tags With Commas"
            />
          </div>
          <div className="form-box">
            <label htmlFor="desc">Description</label>
            <textarea
              id="desc"
              placeholder="Enter description of lab"
            ></textarea>
          </div>
        </div>

        <div className="form2">
          <div className="form-box">
            <label htmlFor="category">Choose category</label>
            <input type="text" id="category" placeholder="Choose category" />
          </div>
          <div className="form-box">
            <label htmlFor="team">Select Team</label>
            <input type="text" id="team" placeholder="Select Team" />
          </div>
          {/* <div className="form-box">
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
                  onChange={changeHandler}
                  name="image"
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
          </div> */}
        </div>

        <button type="submit" className="create">
          Create
        </button>
      </form>
    </div>
  );
}

export default CreateMaterials;
