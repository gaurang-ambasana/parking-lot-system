const { displayIntable } = require("./displayIntable");

class ParkingLot {
  constructor(slots) {
    if (slots <= 0) throw new Error(`Not possible :(`);
    this.maxSlots = slots;
    this.parkingSlots = new Array(slots).fill(null);
  }

  getParkingStatus() {
    const parkingStatus = [];

    if (this.parkingSlots.every((slot) => slot === null))
      console.log("Parking is Empty!");
    else {
      this.parkingSlots.forEach((car, index) => {
        car !== null
          ? parkingStatus.push({
              Slot: index + 1,
              "Car Number": car.number,
              "Car Color": car.color,
            })
          : parkingStatus.push({
              Slot: index + 1,
              CarNumber: "-",
              "Car Color": "-",
            });
      });

      displayIntable(parkingStatus);
    }
  }
}
