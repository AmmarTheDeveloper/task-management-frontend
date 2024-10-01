import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="border border-t shadow px-[20px] py-[10px] text-center">
      Created and developed by{" "}
      <Link to="https://github.com/ammarthedeveloper" className="text-blue-500">
        Ammar
      </Link>
    </div>
  );
};

export default Footer;
