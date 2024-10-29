import { RefineMapper } from "../shared/interfaces";
import { InputBox } from "../shared/types";

export const filterCheckboxes = [
  {
    id: "readyForBackroomPick",
    label: "Ready for Backroom Pick",
    type: "checkbox",
  },
  {
    id: "backroomPickInProgress",
    label: "Backroom Pick In Progress",
    type: "checkbox",
  },
  {
    id: "readyForCustomerPickup",
    label: "Ready for Customer Pickup",
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
    id: "shippedPicked",
    label: "Shipped/Picked",
    type: "checkbox",
  },
  {
    id: "cancelled",
    label: "Cancelled",
    type: "checkbox",
  },
];

export const refineMapper: RefineMapper = {
  readyForBackroomPick: "Ready for Backroom Pick",
  backroomPickInProgress: "Backroom Pick In Progress",
  readyForCustomerPickup: "Ready for Customer Pickup",
  readyForPacking: "Ready For Packing",
  packed: "Packed",
  shipped: "Shipped",
  picked: "Picked",
  cancelled: "Cancelled",
};

export const inputBoxes: InputBox[] = [
  {
    id: 1,
    label: "orderNumber",
    placeholder: "Order #",
    type: "text",
  },
  {
    id: 2,
    label: "shipmentNumber",
    placeholder: "Shipment #",
    type: "text",
  },
  {
    id: 3,
    label: "firstName",
    placeholder: "First Name",
    type: "text",
  },
  {
    id: 4,
    label: "lastName",
    placeholder: "Last Name",
    type: "text",
  },
  {
    id: 5,
    label: "emailId",
    placeholder: "Email ID",
    type: "text",
  },
  {
    id: 6,
    label: "phoneNumber",
    placeholder: "Phone number",
    type: "text",
  },
];
