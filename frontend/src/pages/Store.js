import React, { useState, useEffect, useContext } from "react";
import AddStore from "../components/AddStore";
import AuthContext from "../AuthContext";

function Store() {
  const [showModal, setShowModal] = useState(false);
  const [stores, setAllStores] = useState([]);

  const authContext = useContext(AuthContext);

  useEffect(() => {
    fetchData();
  }, []);

  // Fetching all stores data
  const fetchData = () => {
    fetch(`https://cec2-backend.onrender.com/api/store/get/${authContext.user}`)
      .then((response) => response.json())
      .then((data) => {
        setAllStores(data);
      });
  };

  const modalSetting = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="col-span-12 lg:col-span-10 flex justify-center ">
      <div className=" flex flex-col gap-5 w-11/12">
        <div className="flex justify-between">
          <span className="font-bold">Manage Warehouse</span>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 text-xs  rounded"
            onClick={modalSetting}
          >
            Add Warehouse
          </button>
        </div>
        {showModal && <AddStore />}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {stores.map((element, index) => {
            return (
              <div
                className="bg-white w-full rounded-lg overflow-hidden shadow-md"
                key={element._id}
              >
                <img
                  alt="store"
                  className="h-60 w-full object-cover"
                  src={element.image}
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold mb-2">{element.name}</h3>
                  <p className="text-sm mb-2">{element.address}, {element.city}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Store;
