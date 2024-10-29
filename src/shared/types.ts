export type Shipment = {
  AssignedToUserId: string;
  DeliveryMethod: string;
  ExpectedShipmentDate: string; // Consider using `Date` type for actual date handling
  OrderNo: string;
  ScacAndService: string;
  ShipNode: string;
  ShipmentKey: string;
  ShipmentNo: string;
  Status: string;
  BillToAddress: {
    DayPhone: string;
    EMailID: string;
    FirstName: string;
    LastName: string;
    PersonInfoKey: string;
  };
  ShipmentLines: {
    TotalNumberOfRecords: string;
  };
};

export type ShipmentDetails = {
  AssignedToUserId: string;
  Status: string;
  DeliveryMethod: string;
  ExpectedShipmentDate: string;
  OrderNo: string;
  ScacAndService: string;
  ShipmentKey: string;
  ShipmentNo: string;
  BillToAddress: {
    FirstName: string;
    LastName: string;
    EmailID: string;
    Phonenumber: string;
    AddressID: string;
    AddressLine1: string;
    AddressLine2: string;
    City: string;
    Country: string;
    State: string;
    ZipCode: string;
    PersonInfoKey: string;
  };
  ToAddress: {
    FirstName: string;
    LastName: string;
    EmailID: string;
    DayPhone: string;
    AddressID: string;
    AddressLine1: string;
    AddressLine2: string;
    City: string;
    Country: string;
    State: string;
    ZipCode: string;
    PersonInfoKey: string;
  };
  ShipmentLines: {
    TotalNumberOfRecords: string;
    ShipmentLine: Array<{
      Quantity: string;
      ShipmentLineKey: string;
      OrderLine: {
        ItemDetails: {
          DisplayUnitOfMeasure: string;
          Description: string;
          ImageUrl: string;
          ItemID: string;
        };
      };
    }>;
  };
};

export type ProductType = {
  Quantity: string;
  ShipmentLineKey: string;
  OrderLine: {
    ItemDetails: {
      DisplayUnitOfMeasure: string;
      Description: string;
      ImageUrl: string;
      ItemID: string;
    };
  };
};

export type InputState = {
  orderNumber: string;
  shipmentNumber: string;
  firstName: string;
  lastName: string;
  emailId: string;
  phoneNumber: string;
};

export type InputBox = {
  id: number;
  label: keyof InputState;
  type: string;
  placeholder: string;
};
