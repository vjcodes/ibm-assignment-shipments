import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { InputState } from "../shared/types";
import { inputBoxes } from "../utils/constants";

const Home = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [inputs, setInputs] = useState<InputState>({
    orderNumber: "",
    shipmentNumber: "",
    firstName: "",
    lastName: "",
    emailId: "",
    phoneNumber: "",
  });

  const resetFields = () => {
    setInputs({
      orderNumber: "",
      shipmentNumber: "",
      firstName: "",
      lastName: "",
      emailId: "",
      phoneNumber: "",
    });
  };

  const handleSearch = () => {
    const dataToSend = inputs;
    navigate("/results", { state: dataToSend });
  };

  return (
    <div className=" flex flex-col justify-center items-center">
      <h1 className="text-2xl mb-4 font-semibold text-[#626262]">
        {t("home.LABEL_WhatDoYouWantToDO")}
      </h1>
      <div className="bg-white w-[90%] md:w-[40%] flex flex-col justify-center items-center px-2 py-4 border border-[#D8D8DA]">
        <h1 className="text-2xl font-semibold text-[#626262]">
          Shipment Search
        </h1>
        <div className="flex flex-col w-full mt-10">
          {inputBoxes.map((inputBox) => (
            <input
              key={inputBox.label}
              type={inputBox.type}
              placeholder={inputBox.placeholder}
              className="border w-full mb-2 p-2"
              value={inputs[inputBox.label]}
              onChange={(e) =>
                setInputs((prev: InputState) => ({
                  ...prev,
                  [inputBox.label]: e.target.value.toLowerCase(),
                }))
              }
            />
          ))}
        </div>

        <div className="w-full flex justify-end mb-20">
          <button
            className="border px-6 py-2 border-[#3F78BF] text-[#3F78BF] mr-2 font-semibold"
            onClick={() => resetFields()}
          >
            Reset
          </button>
          <button
            className="border px-6 py-2 bg-[#3F78BF] text-white font-semibold"
            onClick={() => handleSearch()}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
