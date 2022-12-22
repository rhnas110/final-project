import logo from "./logo.svg";
import "./App.css";

// route
import { Routes, Route } from "react-router-dom";

// pages
import { ProfilePage } from "./pages/ProfilePage/ProfilePage";
import { ProfileAddressPage } from "./pages/ProfilePage/ProfileAddressPage";

import { DummyPage } from "./pages/DummyPage";
import { NotFoundPage } from "./pages/NotFound/NotFound";

import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const testApi = async () => {
    try {
      const response = await (
        await axios.get(`${process.env.REACT_APP_API_BASE_URL}`)
      ).data;
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    testApi();
    console.log("MOKOMDO HERE");
  }, []);
  return (
    <div>
      <Routes>
        <Route path="/" element={<DummyPage />} />
        <Route path="/profile/settings" element={<ProfilePage />} />
        <Route
          path="/profile/settings/address"
          element={<ProfileAddressPage />}
        />
        {/* not found  */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
