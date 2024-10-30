import { useState } from "react";
import shipmentDetails from "../assets/shipmentDetails.json";

const DetailsAccordion = () => {
  const [open, setOpen] = useState(false);
  const details = shipmentDetails?.Shipment;
  return (
    <div className={`px-4 py-2 bg-[#E8E8E8] m-2`}>
      <h1 className={`text-[#9760ae]`}>{details?.Status}</h1>
      <div className="flex flex-wrap justify-items-start">
        <div className="m-2 flex flex-col items-start min-w-[30%]">
          <h1 className="text-xs">Shipment Number</h1>
          <h1>{details?.ShipmentNo}</h1>
        </div>
        <div className="m-2 flex flex-col items-start min-w-[30%]">
          <h1 className="text-xs">Expected Ship Date</h1>
          <h1>{details?.ExpectedShipmentDate}</h1>
        </div>
        <div className="m-2 flex flex-col items-start min-w-[30%]">
          <h1 className="text-xs">Ship to</h1>
          <h1>{`${details?.ToAddress?.City}, ${details?.ToAddress?.State}, ${details?.ToAddress?.ZipCode}`}</h1>
        </div>

        {open && (
          <div className="m-2 flex flex-col items-start min-w-[30%]">
            <h1 className="text-xs">Carrier</h1>
            <h1>{details?.ScacAndService ?? "-"}</h1>
          </div>
        )}

        {open && (
          <div className="m-2 flex flex-col items-start min-w-[30%]">
            <h1 className="text-xs">Customer Info</h1>
            <h1>{`${details?.ToAddress?.FirstName} ${details?.ToAddress?.LastName}`}</h1>
            <h1>{details?.ToAddress?.DayPhone}</h1>
            <h1>{details?.ToAddress?.EmailID}</h1>
          </div>
        )}

        {open && (
          <div className="m-2 flex flex-col items-start min-w-[30%]">
            <h1 className="text-xs">Assigned to</h1>
            <h1>{details?.AssignedToUserId}</h1>
          </div>
        )}
      </div>

      {!open && (
        <div className="w-full flex justify-end mt-4">
          <button onClick={() => setOpen(true)} className={`font-semibold text-[#3d8ca5]`}>Show Info</button>
        </div>
      )}

      {open && (
        <div className="flex flex-wrap justify-between">
          {open && (
            <div className="w-full flex justify-end mt-4">
              <button onClick={() => setOpen(false)} className={`font-semibold text-[#3d8ca5]`}>Hide Info</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DetailsAccordion;
