const { ParkingLot } = require("./ParkingLot");

const parkingLot = new ParkingLot(10);

parkingLot.parkCarAtGivenSlot(5, "GJ 04 CJ 2022", "White");
parkingLot.parkCarAtGivenSlot(2, "GJ 05 CJ 2022", "Pink");
parkingLot.parkCar("GJ 03 KA 5674", "White"); //* will be parked at nearest empty slot (Slot 1)
parkingLot.getSlotByCarNumber("gj 05 cJ 2022");
parkingLot.getAllCarsWithSameColor("White");
parkingLot.takeCarByNumber("gj 05 cJ 2022");
parkingLot.takeCarBySlotNumber(1);
parkingLot.getAllOccupiedSlots();
parkingLot.parkCar("GJ 07 TA 0432", "Dark");
parkingLot.getAllEmptySlots();
parkingLot.getAllOccupiedSlots();
parkingLot.getParkingStatus();
