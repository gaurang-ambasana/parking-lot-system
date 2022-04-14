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

  findAllEmptySlots() {
    if (this.parkingSlots.some((slot) => slot === null)) {
      const availableSlots = this.parkingSlots
        .filter((slot) => slot === null)
        .map((_, index) => index + 1)
        .join(" ,");

      console.log(`Available Slots for parking are ${availableSlots}`);
    } else console.log("Parking is Full :(");
  }
}
