var EventEmitter = require("events");
const { ParkingLot } = require("./ParkingLot");
let prompt = new EventEmitter();
let current = null;
let parkingLot = null;
process.stdin.resume();

process.stdin.on("data", (data) => {
  prompt.emit(current, data.toString().trim());
});

prompt.on(":new", (name, question) => {
  current = name;
  console.log(question);
  process.stdout.write("-> ");
});

prompt.on(":end", () => {
  current = ":end";
  process.stdin.pause();
});

prompt.emit(":new", "start", "Enter size of parking lot : ");

prompt.on("start", (data) => {
  console.log("Creating Parking Lot with " + parseInt(data) + " slots");
  parkingLot = new ParkingLot(parseInt(data));
  parkingLot.getParkingStatus();
  parkingLot.getAllEmptySlots();
  prompt.emit(":new", "cmd", "Enter your command :");
});

prompt.on("cmd", (data) => {
  current = "cmd";
  const command = data.toLowerCase();

  if (command.startsWith("park_car_at")) {
    const [_, slot, number, color] = data.split(" ");
    parkingLot.parkCarAtGivenSlot(slot, number, color);
  } else if (command.toLowerCase().startsWith("park_car")) {
    const [_, number, color] = data.split(" ");
    parkingLot.parkCar(number, color);
  } else if (command.startsWith("display")) parkingLot.getParkingStatus();
  else if (command.startsWith("end")) prompt.emit(":end");
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
  }

  prompt.emit(":new", "cmd", "Enter your command :");
});
