const EventEmitter = require("events");
const { ParkingLot } = require("./ParkingLot");
const prompt = new EventEmitter();
let current = null;
let parkingLot = null;
const color = require("colors");
process.stdin.resume();

process.stdin.on("data", (data) => {
  prompt.emit(current, data.toString().trim());
});

prompt.on(":new", (name, question) => {
  current = name;
  console.log(question);
  process.stdout.write("-> ");
});

prompt.on(":end", () => process.stdin.pause());

prompt.emit(":new", "start", "Enter size of parking lot : ".green.bold);

prompt.on("start", (data) => {
  console.log("Creating Parking Lot with " + parseInt(data) + " slots");
  parkingLot = new ParkingLot(parseInt(data));
  parkingLot.getAllEmptySlots();
  prompt.emit(":new", "cmd", "Enter your command :".blue.bold);
});

prompt.on("cmd", (data) => {
  const command = data.toLowerCase();

  if (command === "help") {
    console.log(
      "Warning : you should write your car number without space.".red.bold
    );
    console.log("eg. GJ03ME8489 and not GJ 03 ME 8489".black.bgWhite);
    console.log("");
    console.log(
      "To check current status of parking : display_parking_status".bold
    );
    console.log(
      "To check your car slot by number : check_slot_number_for <Reg. Number>"
        .bold
    );
    console.log(
      "To park your car at nearest slot : park_car <Reg. Number> <Color>".bold
    );
    console.log(
      "To park your car at particular slot : park_car_at <Slot> <Reg. Number> <Color>"
        .bold
    );
    console.log(
      "To park your car at particular slot : park_car_at <Slot> <Reg. Number> <Color>"
        .bold
    );
    console.log(
      "To check all the cars with same color : get_all_car_with_color <Color>"
        .bold
    );
    console.log(
      "To check for all available slots : available_slot_numbers".bold
    );
    console.log(
      "To check for all occupied slots : allocated_slot_numbers".bold
    );
    console.log(
      "To take car out from Parking : leave_car_by_number <Reg. Number>".bold
    );
    console.log(
      "To take car out from Parking by slot number : leave_car_by_slot <Slot>"
        .bold
    );
    console.log("");
    console.log('To simply exit write "exit"'.bold);
  } else if (command.startsWith("park_car_at")) {
    const [_, slot, number, color] = data.split(" ");
    parkingLot.parkCarAtGivenSlot(slot, number, color);
  } else if (command.startsWith("park_car")) {
    const [_, number, color] = data.split(" ");
    parkingLot.parkCar(number, color);
  } else if (command.startsWith("display_parking_status"))
    parkingLot.getParkingStatus();
  else if (command.startsWith("exit")) prompt.emit(":end");
  else if (command.startsWith("allocated_slot_numbers"))
    parkingLot.getAllOccupiedSlots();
  else if (command.startsWith("available_slot_numbers"))
    parkingLot.getAllEmptySlots();
  else if (command.startsWith("leave_car_by_number")) {
    const [_, number] = command.split(" ");
    parkingLot.takeCarByNumber(number);
  } else if (command.startsWith("leave_car_by_slot")) {
    const [_, slotNum] = command.split(" ");
    parkingLot.takeCarBySlotNumber(slotNum);
  } else if (command.startsWith("get_all_car_with_color")) {
    const [_, color] = command.split(" ");
    parkingLot.getAllCarsWithSameColor(color);
  } else if (command.startsWith("check_slot_number_for")) {
    const [_, number] = command.split(" ");
    parkingLot.getSlotByCarNumber(number);
  } else console.log("Invalid command!".red.bold);

  prompt.emit(":new", "cmd", "Enter your command :");
});
