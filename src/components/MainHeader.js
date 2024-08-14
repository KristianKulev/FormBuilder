import React from "react";

import { Link } from "react-router-dom";

const MainHeader = () => {
  return (
    <header
      className="flex flex-col md:flex-row
     items-center bg-secondary py-4 px-4 md:px-12"
    >
      <Link to={"/"}>
        <img
          src="assets/images/Quickbase-logo-color.png"
          className="w-48 py-2 mr-12"
        />
      </Link>
      <h1 className="text-xl font-bold">Kristian Kulev - Field Builder</h1>
    </header>
  );
};
export default MainHeader;
