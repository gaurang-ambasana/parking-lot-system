const { Car } = require("./Car");
const { displayIntable } = require("./displayIntable");

class ParkingLot {
  constructor(slots) {
    if (slots <= 0) throw new Error(`Not possible :(`);
    this.maxSlots = slots;
    this.parkingSlots = new Array(slots).fill(null);
  }

  getParkingStatus() {
    const parkingStatus = [];

    if (this.isEmpty()) console.log("Parking is Empty!");
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
              "Car Number": "-",
              "Car Color": "-",
            });
      });

      displayIntable(parkingStatus);
    }
  }

  findAllEmptySlots() {
    if (!this.isFull()) {
      const availableSlots = this.parkingSlots
        .filter((slot) => slot === null)
        .map((_, index) => index + 1)
        .join(" ,");

      console.log(`Available Slots for parking are ${availableSlots}`);
    } else console.log("Parking is Full :(");
  }

  getAllOccupiedSlots() {
    if (!this.isEmpty()) {
      const occupiedSlots = this.parkingSlots
        .filter((slot) => slot !== null)
        .map((_, index) => index + 1)
        .join(" ,");

      console.log(`Occupied Slots for parking are ${availableSlots}`);
    } else console.log("Parking is Empty :)");
  }

  findNearestParkingSlot() {
    return this.parkingSlots.indexOf(
      this.parkingSlots.find((slot) => slot === null)
    );
  }

  isFull() {
    return this.parkingSlots.every((slot) => slot !== null);
  }

  isEmpty() {
    return this.parkingSlots.every((slot) => slot === null);
  }

  parkCar(carNumber, carColor) {
    if (!this.isFull()) {
      const slotNo = this.findNearestParkingSlot();

      if (carColor && carNumber) {
        const car = new Car(carNumber, carColor);
        this.parkingSlots[slotNo] = car;
      }
    } else console.log("Sorry! Parking is Full");
  }

  getAllParkedCars() {
    return this.parkingSlots
      .filter((slot) => slot !== null)
      .map(({ number: carNumber, color: carColor }) => {
        return { carNumber, carColor };
      });
  }

  getAllCarsWithSameColor(color) {
    if (!this.isEmpty()) {
      const carsWithProvidedColor = this.getAllParkedCars().filter(
        ({ carColor }) => carColor.toLowerCase() === color.toLowerCase()
      );

      if (carsWithProvidedColor.length > 0) {
        console.log(`Cars with color ${color}`);
        displayIntable(carsWithProvidedColor);
      } else console.log(`Can't find a car with ${color} as there isn't one`);
    } else console.log("Parking is Empty!");
  }
}
