const { Car } = require("./Car");
const { displayIntable } = require("./displayIntable");

class ParkingLot {
  #maxSlots;
  #parkingSlots;
  #occupiedSlots;
  #emptySlots;

  constructor(slots) {
    if (slots <= 0) throw new Error(`Not possible :(`);
    this.#maxSlots = slots;
    this.#parkingSlots = new Array(slots).fill(null);
    this.#occupiedSlots = [];
    this.#emptySlots = [...this.#parkingSlots.keys()].map((i) => i + 1);
  }

  getParkingStatus() {
    const parkingStatus = [];

    if (this.#isEmpty()) console.log("Parking is Empty!");
    else {
      this.#parkingSlots.forEach((car, index) => {
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

  getAllEmptySlots() {
    if (!this.#isFull())
      console.log(
        `Available Slots for parking are ${this.#emptySlots
          .sort((a, b) => a - b)
          .join(", ")}`
      );
    else console.log("Parking is Full :(");
  }

  getAllOccupiedSlots() {
    if (!this.#isEmpty()) {
      console.log(
        `Occupied parking slots are ${this.#occupiedSlots
          .sort((a, b) => a - b)
          .join(", ")}`
      );
    } else console.log("Parking is Empty :)");
  }

  #findNearestParkingSlot() {
    return Math.min(...this.#emptySlots);
  }

  #isFull() {
    return this.#occupiedSlots.length === this.#maxSlots;
  }

  #isEmpty() {
    return this.#emptySlots.length === this.#maxSlots;
  }

  parkCar(carNumber, carColor) {
    if (!this.#isFull()) {
      const slotNo = this.#findNearestParkingSlot();
      if (carColor && carNumber) {
        const car = new Car(carNumber, carColor);
        this.#parkingSlots[slotNo - 1] = car;
        this.#occupiedSlots.push(slotNo);
        this.#emptySlots = this.#emptySlots.filter(
          (slotNum) => slotNum !== slotNo
        );

        console.log(
          `Parked Car with Number "${carNumber}" with ${carColor} color at Slot no. ${slotNo}`
        );
      } else console.log("Please provide valid car number or color");
    } else console.log("Sorry! Parking is Full");
  }

  parkCarAtGivenSlot(slotNo, carNumber, carColor) {
    if (slotNo > this.#maxSlots) {
      console.log("Please provide valid slot number");
      return;
    }

    if (this.#parkingSlots[slotNo - 1] === null) {
      if (carColor && carNumber) {
        const car = new Car(carNumber, carColor);
        this.#parkingSlots[slotNo - 1] = car;
        this.#occupiedSlots.push(slotNo);
        this.#emptySlots = this.#emptySlots.filter(
          (slotNum) => slotNum !== slotNo
        );

        console.log(
          `Parked Car with Number "${carNumber}" with ${carColor} color at Slot no. ${slotNo}`
        );
      } else console.log("Please provide valid car number or color");
    } else
      console.log(`There is already a car parked at Parking Slot ${slotNo}`);
  }

  getAllCarsWithSameColor(color) {
    if (!this.#isEmpty()) {
      const carsWithProvidedColor = this.#occupiedSlots
        .filter(
          (slot) =>
            this.#parkingSlots[slot - 1].color.toLowerCase() ===
            color.toLowerCase()
        )
        .map((slot) => this.#parkingSlots[slot - 1]);

      if (carsWithProvidedColor.length > 0) {
        console.log(`Cars with color ${color}`);
        displayIntable(carsWithProvidedColor);
      } else console.log(`Can't find a car with ${color} as there isn't one`);
    } else console.log("Parking is Empty!");
  }

  getSlotByCarNumber(number) {
    if (!this.#isEmpty()) {
      const slotNumber = this.#occupiedSlots.find(
        (slot) =>
          this.#parkingSlots[slot - 1].number.toLowerCase() ===
          number.toLowerCase()
      );

      if (slotNumber)
        console.log(`Car with Number ${number} is parked at ${slotNumber}`);
      else console.log(`Couldn't find any Car with Number ${number}`);
    } else console.log("Parking is Empty!");
  }

  takeCarByNumber(number) {
    if (!this.#isEmpty()) {
      const carPosition = this.#occupiedSlots.find(
        (slot) =>
          this.#parkingSlots[slot - 1].number.toLowerCase() ===
          number.toLowerCase()
      );

      if (carPosition) {
        this.#emptySlots.push(carPosition);
        this.#occupiedSlots = this.#occupiedSlots.filter(
          (slot) => slot !== carPosition
        );
        this.#parkingSlots[carPosition - 1] = null;
        console.log(
          `Slot ${carPosition} is empty as Car with No. ${number} has been taken.`
        );
      } else console.log(`Couldn't find any car with No. ${number}`);
    } else console.log(`Parking is Empty!`);
  }

  takeCarBySlotNumber(slotNum) {
    const car = this.#parkingSlots[slotNum - 1];
    if (car !== null) {
      this.#emptySlots.push(slotNum);
      this.#occupiedSlots = this.#occupiedSlots.filter(
        (slot) => slot !== slotNum
      );
      const carNumber = car.number;
      console.log(
        `Slot ${slotNum} is empty as Car with No. ${carNumber} has been taken.`
      );
    } else console.log(`Parking Spot no. ${slotNum} is empty!`);
  }
}

exports.ParkingLot = ParkingLot;
