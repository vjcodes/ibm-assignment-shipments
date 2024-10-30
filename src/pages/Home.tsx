import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { InputState } from "../shared/types";
import { inputBoxes } from "../utils/constants";
import CustomButton from "../shared/components/CustomButton";
import COLORS from "../utils/colors";

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
      <h1
        className={`text-2xl mb-4 font-semibold text-[${COLORS.grayHeading}]`}
      >
        {t("home.LABEL_WhatDoYouWantToDO")}
      </h1>
      <div className={`bg-[${COLORS.white}] w-[90%] md:w-[40%] flex flex-col justify-center items-center px-2 py-4 border border-[${COLORS.cardBorderGray}]`}>
        <h1 className={`text-2xl font-semibold text-[${COLORS.grayHeading}]`}>
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
          <CustomButton
            text="Reset"
            onClick={() => resetFields()}
            textColor={COLORS.btnBgColor}
            borderColor={COLORS.btnBgColor}
          />
          <CustomButton
            text="Search"
            onClick={() => handleSearch()}
            bgColor={COLORS.btnBgColor}
            textColor={COLORS.white}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
