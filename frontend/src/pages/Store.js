import React, { useState, useEffect, useContext } from "react";
import AddStore from "../components/AddStore";
import AuthContext from "../AuthContext";

function Store() {
  const [showModal, setShowModal] = useState(false);
  const [stores, setAllStores] = useState([]);
  const [reloadTrigger, setReloadTrigger] = useState(false);

  const authContext = useContext(AuthContext);

  useEffect(() => {
    fetchData();
  }, [reloadTrigger]);

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

  const handleStoreAdded = () => {
    setReloadTrigger(!reloadTrigger);
  };

  return (
    <div className="col-span-12 lg:col-span-10 flex justify-center">
      <div className="flex flex-col gap-5 w-11/12 border-2">
        <div className="flex justify-between">
          <span className="font-bold">Manage Store</span>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 text-xs rounded"
            onClick={modalSetting}
          >
            Add Store
          </button>
        </div>
        {showModal && <AddStore onStoreAdded={handleStoreAdded} />}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {stores.map((element, index) => (
            <div
              className="bg-white rounded-lg shadow-md p-4"
              key={element._id}
            >
              <img
                alt="store"
                className="h-60 w-full object-cover rounded-md mb-4"
                src={element.image}
              />
              <div className="flex flex-col gap-3">
                <span className="font-bold text-lg">{element.name}</span>
                <div className="flex items-center">
                  <img
                    alt="location-icon"
                    className="h-6 w-6 mr-2"
                    src={require("../assets/location-icon.png")}
                  />
                  <span className="text-gray-600">
                    {element.address}, {element.city}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Store;
