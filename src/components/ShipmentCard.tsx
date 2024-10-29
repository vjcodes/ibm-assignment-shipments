import { useNavigate } from "react-router-dom";
import { Shipment } from "../shared/types";

const ShipmentCard = ({
  details,
  cardSelected,
  setCardSelected,
}: {
  details: Shipment;
  cardSelected: string;
  setCardSelected: (value: string) => void;
}) => {
  console.log(cardSelected);
  const navigate = useNavigate();
  return (
    <div
      className={`flex flex-wrap border-b-[1px] mx-2 px-10 `}
      style={{
        backgroundColor: cardSelected === details?.ShipmentNo ? "#F8F8FA" : "",
      }}
      onClick={() => setCardSelected(details?.ShipmentNo)}
    >
      {/* 1st column */}
      <div className="flex flex-col items-start p-2 mr-40">
        <h1>{details?.OrderNo}</h1>
        <h1>{`${details?.ShipmentLines?.TotalNumberOfRecords} products`}</h1>
        <h1>{`Carrier: ${details?.ScacAndService}`}</h1>
        <h1>
          Shipment #{" "}
          <span
            onClick={() => navigate("/details", { state: details })}
            className="text-[#4797a1] font-semibold cursor-pointer"
          >
            {details?.ShipmentNo}
          </span>
        </h1>
      </div>

      {/* 2nd Column */}
      <div className="flex flex-col items-start p-2 mr-40">
        <h1 className="text-[#9760ae]">{details?.Status}</h1>
        <h1>{`Assigned to: ${details?.AssignedToUserId}`}</h1>
        <h1>{`Expected pickup date: ${details?.ExpectedShipmentDate}`}</h1>
      </div>

      {/* 3rd Column */}
      <div className="flex flex-col items-start p-2">
        <h1>Customer Info</h1>
        <h1>{`${details?.BillToAddress?.FirstName} ${details?.BillToAddress?.LastName}`}</h1>
        <h1>{details?.BillToAddress?.DayPhone}</h1>
        <h1>{details?.BillToAddress?.EMailID}</h1>
      </div>
    </div>
  );
};

export default ShipmentCard;
