class Scooter {
  static nextSerial = 1;
  constructor(station) {
    this.station = station;
    this.user = null;
    this.serial = Scooter.nextSerial++;
    this.charge = 100;
    this.isBroken = false;
  }

  rent(user) {
    if (this.charge < 20) {
      throw new Error("Scooter needs to charge.");
    }
    if (this.isBroken) {
      throw new Error("scooter needs repair.");
    }
    this.user = user;
  }

  dock(station) {
    this.station = station;
    this.user = null;
  }
}

module.exports = Scooter;
