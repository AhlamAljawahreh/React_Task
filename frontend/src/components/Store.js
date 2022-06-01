import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate,useParams } from "react-router-dom";

export default function Store() {
  const [items, setItems] = useState([]);
    const [store, setStore] = useState({});

  const navigate = useNavigate();
  const {id}= useParams();
  const state = useSelector((state) => {
    return {
      isLoggedIn: state.loginReducer.isLoggedIn,
      token: state.loginReducer.token,
      user_id: state.loginReducer.user_id,
    };
  });
  const getAllStoresItems = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/item/${id}`, {
        headers: {
          Authorization: ` Bearer ${state.token}`,
        },
      });
      if (res.data.success) {
        setItems(res.data.results);
      } else throw Error;
    } catch (error) {
      if (!error.response.data.success) {
        return console.log(`error`);
      }
    }
  };
  /********************************************** */
    const getStoreById = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/store/${id}`, {
          headers: {
            Authorization: ` Bearer ${state.token}`,
          },
        });
        if (res.data.success) {
          setStore(res.data.results[0]);
          console.log(res.data.results[0]);
        } else throw Error;
      } catch (error) {
        if (!error.response.data.success) {
          return console.log(`error`);
        }
      }
    };
  useEffect(() => {
    getAllStoresItems();
    getStoreById();
  }, []);
  return (
    <div className="col">
      {store.owner == state.user_id ? (
        <div
          className="col-12 col-sm-6 col-xl-4 pb-4 bg-light "
          onClick={() => {
            navigate(`new_item/${id}`);
          }}
        >
          <h5>New Item</h5>
        </div>
      ) : (
        <></>
      )}
      <div className="card-group  ">
        {items.map((item, i) => {
          return (
            <div className="col-12 col-sm-6 col-xl-4 pb-4 bg-light ">
              <div className="card ">
                <img src={item.image} class="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text">{item.description}</p>
                  <p className="card-text">{item.price} $</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
