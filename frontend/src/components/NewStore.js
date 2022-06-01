import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";



toast.configure();
const NewStore = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
const navigation = useNavigate();
  const state = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      userId: state.loginReducer.userId,
    };
  });


  /******************************** */
  const createNewStore = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/store",
        { name, description, image },
        {
          headers: {
            Authorization: ` Bearer ${state.token}`,
          },
        }
      );
      if (res.data.success) {
        toast.success(res.data.massage, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        navigation("home")
      } else {
        toast.error(res.data.massage, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      if (!error.response.data.success) {
        return console.log(`error`);
      }
    }
  };
  // ************************************************************
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "sab8a4tg");

    await axios
      .post(
        "https://api.cloudinary.com/v1_1/aaaaahlllaaaam/image/upload",
        formData
      )
      .then((response) => {
        setImage(response.data.secure_url);
      })
      .catch((err) => {
        console.log("error");
        throw err;
      });
  };
  return (
    <>
      <div className="container ">
        <div className="  position-absolute top-50 start-50 translate-middle border ps-5 pe-5 pt-3 pb-3 bg-light">
          <p className="text-center fs-2  text-danger">New Service</p>
          <div className="form-floating mb-3 p-2">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="Name"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <label for="floatingInput">Name</label>
          </div>
          <div className="form-floating mb-3 p-2">
            <input
              type="text"
              className="form-control"
              id="floatingPassword"
              placeholder="description"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
            <label for="floatingPassword">Description</label>
          </div>
          <div className="mb-3">
            <input
              className="form-floating"
              type="file"
              onChange={(e) => {
                uploadImage(e.target.files[0]);
              }}
            />
          </div>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => {
              createNewStore();
            }}
          >
            Create New Store
          </button>
        </div>
      </div>
    </>
  );
};

export default NewStore;
