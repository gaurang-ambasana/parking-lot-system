const { ParkingLot } = require("./ParkingLot");

const parkingLotZ = new ParkingLot(10);

parkingLotZ.parkCarAtGivenSlot(5, "GJ 04 CJ 2022", "White");
parkingLotZ.parkCarAtGivenSlot(2, "GJ 05 CJ 2022", "Pink");
parkingLotZ.parkCar("GJ 03 KA 5674", "White"); //* will be parked at nearest empty slot (Slot 1)
parkingLotZ.getSlotByCarNumber("gj 05 cJ 2022");
parkingLotZ.getAllCarsWithSameColor("White");
parkingLotZ.takeCarByNumber("gj 05 cJ 2022");
parkingLotZ.takeCarBySlotNumber(1);
parkingLotZ.getAllOccupiedSlots();
parkingLotZ.parkCar("GJ 07 TA 0432", "Dark");
parkingLotZ.getAllEmptySlots();
parkingLotZ.getAllOccupiedSlots();
parkingLotZ.getParkingStatus();
