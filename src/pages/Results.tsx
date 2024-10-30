import { useLocation, useNavigate } from "react-router-dom";
import CustomButton from "../shared/components/CustomButton";
import Divider from "../shared/components/Divider";
import shipmentsData from "../assets/shipments.json";
import ShipmentCard from "../components/ShipmentCard";
import { InputState, Shipment } from "../shared/types";
import { useTranslation } from "react-i18next";
import { useEffect, useMemo, useRef, useState } from "react";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import { filterCheckboxes, refineMapper } from "../utils/constants";
import { RefineMapper, RefineValues } from "../shared/interfaces";
import COLORS from "../utils/colors";
import CloseIcon from "@mui/icons-material/Close";

const Results = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const location = useLocation();
  const filterValues: InputState = location.state;

  const [isOpen, setIsOpen] = useState(false);
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [cardSelected, setCardSelected] = useState("");

  // Infinite Scroll State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const observerRef = useRef<HTMLDivElement>(null);

  const [refineValues, setRefineValues] = useState<RefineValues>({
    readyForBackroomPick: false,
    backroomPickInProgress: false,
    readyForCustomerPickup: false,
    readyForPacking: false,
    packed: false,
    shippedPicked: false,
    cancelled: false,
  });

  const [shipments, setShipments] = useState(
    shipmentsData?.Shipments?.Shipment
  );
  const [realData, setRealData] = useState(shipmentsData?.Shipments?.Shipment);

  const isBlank = (value: string) => {
    return value.trim() === "";
  };

  const paginatedShipments = useMemo(() => {
    return shipments.slice(0, currentPage * itemsPerPage);
  }, [shipments, currentPage]);

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

    return isAllBlank || ans;
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

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (
        entries[0].isIntersecting &&
        paginatedShipments.length < realData.length
      ) {
        setCurrentPage((prevPage) => prevPage + 1);
      }
    });

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [observerRef, paginatedShipments.length, realData.length]);

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
      shippedPicked: false,
      cancelled: false,
    });

    setIsFilterApplied(false);
    setShipments(realData);
    setCurrentPage(1);
  };

  const handleApplyFilters = () => {
    const filterValueArray: string[] = [];
    if (refineValues.shippedPicked) {
      filterValueArray.push(refineMapper.picked);
      filterValueArray.push(refineMapper.shipped);
    }
    Object.keys(refineValues).forEach((key: string) => {
      if (refineValues[key as keyof RefineValues]) {
        filterValueArray.push(refineMapper[key as keyof RefineMapper]);
      }
    });

    if (!filterValueArray.length) {
      setShipments(realData);
      return;
    }

    const refinedShipments = realData.filter((shipment: Shipment) =>
      filterValueArray.includes(shipment.Status)
    );

    setIsFilterApplied(refinedShipments.length > 0);
    setShipments(refinedShipments);
    setCurrentPage(1);
  };

  return (
    <div>
      <div className={`bg-[${COLORS.white}] m-2 border border-[${COLORS.cardBorderGray}]`}>
        <div className="flex justify-between items-center p-2 border-b mb-2">
          <div className="flex">
            <button
              className={`mr-2 text-[${COLORS.arrowGreen}] font-bold`}
              onClick={() => navigate(-1)}
            >
              <KeyboardArrowLeftOutlinedIcon />
            </button>
            <Divider type="vertical" />
            <h1
              className={`ml-2 font-semibold text-xl text-[${COLORS.grayHeading}]`}
            >
              Shipment Search Results
            </h1>
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

        <div className="flex justify-between p-2 mb-2">
          <div className={`text-[${COLORS.grayHeading}] font-semibold`}>
            {t("results.RESULTS_Found", { count: paginatedShipments.length })}
          </div>
          <div className="relative">
            {isOpen && (
              <div className="absolute right-[90%] z-10 mt-2 w-[20rem] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div
                  className="p-2"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <div className="flex justify-between">
                    <h1
                      className={`mb-2 font-semibold text-[${COLORS.grayHeading}]`}
                    >
                      Refine
                    </h1>

                    <CloseIcon
                      className="cursor-pointer"
                      onClick={() => setIsOpen(false)}
                    />
                  </div>

                  <Divider type="horizontal" />

                  <div className={`bg-[${COLORS.accordionGray}] p-2 mb-2`}>
                    <h1
                      className={`font-semibold text-[${COLORS.grayHeading}]`}
                    >
                      Status
                    </h1>

                    {filterCheckboxes.map((checkbox) => (
                      <div key={checkbox.id} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={
                            refineValues[checkbox.id as keyof RefineValues]
                          }
                          onChange={() =>
                            setRefineValues((prev) => ({
                              ...prev,
                              [checkbox.id]:
                                !prev[checkbox.id as keyof RefineValues],
                            }))
                          }
                          className={`form-checkbox h-5 w-5 mr-2`}
                        />
                        {checkbox.label}
                      </div>
                    ))}
                  </div>

                  <Divider type="horizontal" />

                  <div className="w-full flex justify-end mt-4">
                    <CustomButton
                      text="Reset"
                      onClick={() => resetFields()}
                      textColor={COLORS.btnBgColor}
                      borderColor={COLORS.btnBgColor}
                    />
                    <CustomButton
                      text="Apply"
                      onClick={() => handleApplyFilters()}
                      bgColor={COLORS.btnBgColor}
                      textColor={COLORS.white}
                    />
                  </div>
                </div>
              </div>
            )}
            <button className="flex items-center" onClick={togglePopover}>
              <FilterAltOutlinedIcon
                className={`text-[${COLORS.arrowGreen}] relative`}
              />
              <input
                type="checkbox"
                className="h-3 absolute bottom-0 right-0 left-3"
                checked={isFilterApplied}
              />
            </button>
          </div>
        </div>

        <Divider type="horizontal" />

        {/* Shipment Cards Scrollable List */}
        <div className="overflow-y-auto max-h-[34rem]">
          {paginatedShipments.map((shipment: Shipment) => (
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
