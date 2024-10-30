import { useLocation, useNavigate } from "react-router-dom";
import Divider from "../shared/components/Divider";
import CustomButton from "../shared/components/CustomButton";
import { useTranslation } from "react-i18next";
import DetailsAccordion from "../components/DetailsAccordion";
import ShipmentDetails from "../assets/shipmentDetails.json";
import ProductCard from "../components/ProductCard";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import COLORS from "../utils/colors";

const Details = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;
  const { t } = useTranslation();

  const details = ShipmentDetails.Shipment;
  return (
    <div>
      <div className={`bg-white m-2 border border-[${COLORS.cardBorderGray}]`}>
        <div className="flex justify-between items-center  p-2 border-b mb-2">
          <div className="flex">
            <button
              className={`mr-2 text-[${COLORS.arrowGreen}] font-bold`}
              onClick={() => navigate(-1)}
            >
              <KeyboardArrowLeftOutlinedIcon />
            </button>
            <Divider type="vertical" />
            <div>
              <h1 className={`ml-2 font-semibold text-xl text-[${COLORS.grayHeading}]`}>
                {t("details.LABEL_ShipmentDetails", {
                  shipmentNo: data?.ShipmentNo,
                })}
              </h1>
            </div>
          </div>

          <div>
            <CustomButton
              text="Close"
              borderColor={COLORS.btnBgColor}
              textColor={COLORS.btnBgColor}
              onClick={() => navigate("/")}
            />
          </div>
        </div>

        <Divider type="horizontal" />

        <DetailsAccordion />

        <div className="mt-4 mx-2">
          <div className={`text-[${COLORS.arrowGreen}] text-xl font-semibold`}>
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
