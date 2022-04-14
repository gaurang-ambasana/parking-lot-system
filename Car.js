class Car {
  constructor(number, color) {
    this.number = number;
    this.color = color;
  }

  isSameCar(car1, car2) {
    return (
      car1.number.toLowerCase() === car2.number.toLowerCase() &&
      car2.color.toLowerCase() === car2.color.toLowerCase()
    );
  }
}

exports.Car = Car;
