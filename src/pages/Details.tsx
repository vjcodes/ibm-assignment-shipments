import { useLocation, useNavigate } from "react-router-dom";
import Divider from "../shared/components/Divider";
import CustomButton from "../shared/components/CustomButton";
import { useTranslation } from "react-i18next";
import DetailsAccordion from "../components/DetailsAccordion";
import ShipmentDetails from "../assets/shipmentDetails.json";
import ProductCard from "../components/ProductCard";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";

const Details = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;
  const { t } = useTranslation();

  const details = ShipmentDetails.Shipment;
  return (
    <div>
      <div className={`bg-white m-2 border border-[#D8D8DA]`}>
        <div className="flex justify-between items-center  p-2 border-b mb-2">
          <div className="flex">
            <button
              className={`mr-2 text-[#3d8ca5] font-bold`}
              onClick={() => navigate(-1)}
            >
              <KeyboardArrowLeftOutlinedIcon />
            </button>
            <Divider type="vertical" />
            <div>
              <h1 className={`ml-2 font-semibold text-xl text-[#626262]`}>
                {t("details.LABEL_ShipmentDetails", {
                  shipmentNo: data?.ShipmentNo,
                })}
              </h1>
            </div>
          </div>

          <div>
            <CustomButton
              text="Close"
              borderColor={"#3F78BF"}
              textColor={"#3F78BF"}
              onClick={() => navigate("/")}
            />
          </div>
        </div>

        <Divider type="horizontal" />

        <DetailsAccordion />

        <div className="mt-4 mx-2">
          <div className={`text-[#3d8ca5] text-xl font-semibold`}>
            {`Products (${details?.ShipmentLines?.TotalNumberOfRecords})`}
          </div>

          <div className="w-full flex flex-wrap">
            {details?.ShipmentLines?.ShipmentLine?.map((item) => (
              <ProductCard key={item?.OrderLine?.ItemDetails?.ItemID} details={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
