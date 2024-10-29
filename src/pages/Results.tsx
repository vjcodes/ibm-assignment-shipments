import { useLocation, useNavigate } from "react-router-dom";
import CustomButton from "../shared/components/CustomButton";
import Divider from "../shared/components/Divider";
import shipmentsData from "../assets/shipments.json";
import ShipmentCard from "../components/ShipmentCard";
import { Shipment } from "../shared/types";
import { useTranslation } from "react-i18next";
import { useEffect, useMemo, useRef, useState } from "react";
import { InputState } from "./Home";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";

const filterCheckboxes = [
  {
    id: "readyForBackroomPick",
    label: "Ready for Backroom Pick",
    type: "checkbox",
  },
  {
    id: "backroomPickInProgress",
    label: "Backroom Pick in Progress",
    type: "checkbox",
  },
  {
    id: "readyForCustomerPickup",
    label: "Ready For Customer Pickup",
    type: "checkbox",
  },
  {
    id: "readyForPacking",
    label: "Ready For Packing",
    type: "checkbox",
  },
  {
    id: "packed",
    label: "Packed",
    type: "checkbox",
  },
  {
    id: "shippedPacked",
    label: "Shipped/Picked",
    type: "checkbox",
  },
  {
    id: "cancelled",
    label: "Cancelled",
    type: "checkbox",
  },
];

interface RefineValues {
  readyForBackroomPick: boolean;
  backroomPickInProgress: boolean;
  readyForCustomerPickup: boolean;
  readyForPacking: boolean;
  packed: boolean;
  shippedPacked: boolean;
  cancelled: boolean;
}

interface RefineMapper {
  readyForBackroomPick: string;
  backroomPickInProgress: string;
  readyForCustomerPickup: string;
  readyForPacking: string;
  packed: string;
  shippedPacked: string;
  cancelled: string;
}

const refineMapper: RefineMapper = {
  readyForBackroomPick: "Ready for Backroom Pick",
  backroomPickInProgress: "Backroom Pick in Progress",
  readyForCustomerPickup: "Ready For Customer Pickup",
  readyForPacking: "Ready For Packing",
  packed: "Packed",
  shippedPacked: "Shipped/Picked",
  cancelled: "Cancelled",
};

const Results = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const location = useLocation();
  const filterValues: InputState = location.state;

  const [isOpen, setIsOpen] = useState(false);
  const [cardSelected, setCardSelected] = useState("");

  // Infinite Scroll State
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10;
  const observerRef = useRef<HTMLDivElement>(null);

  const [refineValues, setRefineValues] = useState<RefineValues>({
    readyForBackroomPick: false,
    backroomPickInProgress: false,
    readyForCustomerPickup: false,
    readyForPacking: false,
    packed: false,
    shippedPacked: false,
    cancelled: false,
  });

  const [shipments, setShipments] = useState(
    shipmentsData?.Shipments?.Shipment
  );

  const [realData, setRealData] = useState(shipmentsData?.Shipments?.Shipment);

  const isFilterApplied = useMemo(() => {
    const result = Object.keys(refineValues).some((key: string) => {
      if (refineValues[key as keyof RefineValues]) {
        return true;
      }
    });

    return result;
  }, [refineValues]);

  console.log(isFilterApplied);

  const isBlank = (value: string) => {
    if (value.trim() === "") {
      return true;
    }

    return false;
  };

  const searchCheck = (shipment: Shipment) => {
    let ans = false;
    if (filterValues?.orderNumber === shipment?.OrderNo?.toLowerCase()) {
      ans = true;
    }
    if (
      filterValues?.emailId === shipment?.BillToAddress?.EMailID.toLowerCase()
    ) {
      ans = true;
    }
    if (filterValues?.shipmentNumber === shipment?.ShipmentNo.toLowerCase()) {
      ans = true;
    }
    if (
      filterValues?.firstName ===
      shipment?.BillToAddress?.FirstName.toLowerCase()
    ) {
      ans = true;
    }
    if (
      filterValues?.lastName === shipment?.BillToAddress?.LastName.toLowerCase()
    ) {
      ans = true;
    }
    if (
      filterValues?.phoneNumber ===
      shipment?.BillToAddress?.DayPhone.toLowerCase()
    ) {
      ans = true;
    }

    let isAllBlank = true;
    Object.keys(filterValues).forEach((key: string) => {
      if (!isBlank(filterValues[key as keyof InputState])) {
        isAllBlank = false;
      }
    });

    if (isAllBlank) {
      return true;
    }

    return ans;
  };

  useEffect(() => {
    const filteredData = realData.filter((shipment) => searchCheck(shipment));
    if (filteredData?.length === 1) {
      navigate("/details");
    } else {
      setShipments(filteredData);
      setRealData(filteredData);
    }
  }, [filterValues]);

  const togglePopover = () => {
    setIsOpen(!isOpen);
  };

  const resetFields = () => {
    setRefineValues({
      readyForBackroomPick: false,
      backroomPickInProgress: false,
      readyForCustomerPickup: false,
      readyForPacking: false,
      packed: false,
      shippedPacked: false,
      cancelled: false,
    });

    setShipments(realData);
  };

  const handleApplyFilters = () => {
    console.log(refineValues);
    const filterValueArray: string[] = [];
    Object.keys(refineValues).forEach((key: string) => {
      if (refineValues[key as keyof RefineValues]) {
        filterValueArray.push(refineMapper[key as keyof RefineMapper]);
      }
    });

    if (!filterValueArray.length) {
      setShipments(realData);
      return;
    }

    const refinedShipments = realData?.filter((shipment: Shipment) =>
      filterValueArray.includes(shipment.Status)
    );

    setShipments(refinedShipments);
  };

  return (
    <div>
      <div className="bg-white m-2 border border-[#1d1d22]">
        <div className="flex justify-between items-center  p-2 border-b mb-2">
          <div className="flex">
            <button
              className="mr-2 text-[#3d8ca5] font-bold"
              onClick={() => navigate(-1)}
            >
              <KeyboardArrowLeftOutlinedIcon />
            </button>
            <Divider type="vertical" />
            <h1 className="ml-2 font-semibold text-xl">Shipment Search Results</h1>
          </div>

          <div>
            <CustomButton
              text="Close"
              borderColor="#3F78BF"
              textColor="#3F78BF"
              onClick={() => navigate("/")}
            />
          </div>
        </div>

        <div className="flex justify-between p-2 mb-2">
          <div>{t("results.RESULTS_Found", { count: shipments.length })}</div>
          <div className="relative">
            {isOpen && (
              <div className="absolute right-[90%] z-10 mt-2 w-[20rem] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div
                  className="p-2"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <h1 className="mb-2">Refine</h1>
                  <Divider type="horizontal" />

                  <div className="bg-[#E8E8E8] p-2">
                    <h1>Status</h1>

                    {filterCheckboxes?.map((checkbox) => (
                      <div className="flex items-center">
                        <input
                          key={checkbox?.id}
                          type="checkbox"
                          checked={
                            refineValues[checkbox.id as keyof RefineValues]
                          }
                          onChange={() =>
                            setRefineValues((prev) => ({
                              ...prev,
                              [checkbox?.id]:
                                !prev[checkbox?.id as keyof RefineValues],
                            }))
                          }
                          className="mr-2"
                        />
                        {checkbox?.label}
                      </div>
                    ))}
                  </div>

                  <Divider type="horizontal" />

                  <div className="w-full flex justify-end mt-4">
                    <button
                      className="border px-6 py-2 border-[#3F78BF] text-[#3F78BF] mr-2 font-semibold"
                      onClick={() => resetFields()}
                    >
                      Reset
                    </button>
                    <button
                      className="border px-6 py-2 bg-[#3F78BF] text-white font-semibold"
                      onClick={() => handleApplyFilters()}
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            )}
            <button className="flex items-center" onClick={togglePopover}>
              <FilterAltOutlinedIcon className="text-[#248b84] relative" />
              <input
                type="checkbox"
                className="h-3 absolute bottom-0 right-0 left-3"
                checked={isFilterApplied}
              />
            </button>
          </div>
        </div>

        <Divider type="horizontal" />

        {/*Shipment Cards Scrollable List */}
        <div className="overflow-y-auto max-h-[34rem]">
          {shipments?.map((shipment: Shipment) => (
            <ShipmentCard
              key={shipment.OrderNo}
              details={shipment}
              cardSelected={cardSelected}
              setCardSelected={setCardSelected}
            />
          ))}

          {/* Observer element for triggering the load of more items */}
          <div ref={observerRef} />
        </div>
      </div>
    </div>
  );
};

export default Results;
