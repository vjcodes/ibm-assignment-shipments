export interface RefineValues {
  readyForBackroomPick: boolean;
  backroomPickInProgress: boolean;
  readyForCustomerPickup: boolean;
  readyForPacking: boolean;
  packed: boolean;
  shippedPacked: boolean;
  cancelled: boolean;
}

export interface RefineMapper {
  readyForBackroomPick: string;
  backroomPickInProgress: string;
  readyForCustomerPickup: string;
  readyForPacking: string;
  packed: string;
  shippedPacked: string;
  cancelled: string;
}
