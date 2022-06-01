import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
 import { useNavigate } from "react-router-dom";


export default function Home() {
  const [stores, setStores] = useState([]);
  const navigate = useNavigate();
  const state = useSelector((state) => {
    return {
      isLoggedIn: state.loginReducer.isLoggedIn,
      token: state.loginReducer.token,
      user_id: state.loginReducer.user_id,
    };
  });
  const getAllStores = async () => {
    try {
      const res = await axios.get("http://localhost:5000/store", {
        headers: {
          Authorization: ` Bearer ${state.token}`,
        },
      });
      if (res.data.success) {
        setStores(res.data.results);
        console.log(res.data.results);
      } else throw Error;
    } catch (error) {
      if (!error.response.data.success) {
        return console.log(`error`);
      }
    }
  };
  useEffect(() => {
    getAllStores();
  }, []);
  return (
    <div>
      <div className="card-group  ">
        {stores.map((item, i) => {
          return (
            <div className="col-12 col-sm-6 col-xl-4 pb-4 bg-light ">
              <div className="card ">
                <img src={item.image} class="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text">{item.userName}</p>
                  <p className="card-text">{item.description}</p>

                  <p className="card-text">
                    <div className="card-footer">
                      <button
                        className="btn btn-dark"
                        onClick={() => {
                          navigate(`/store/${item.id}`);
                        }}
                      >
                        Visit
                      </button>
                    </div>
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
