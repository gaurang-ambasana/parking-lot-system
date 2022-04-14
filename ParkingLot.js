export class ParkingLot {
  constructor(slots) {
    if (slots <= 0) throw new Error(`Not possible :(`);
    this.maxSlots = slots;
    this.parkingSlots = new Array(slots).fill(null);
  }
}
