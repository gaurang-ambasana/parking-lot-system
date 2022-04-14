export class ParkingLot {
  constructor(slots) {
    this.maxSlots = slots;
    this.parkingSlots = new Array(slots).fill(null);
  }
}
