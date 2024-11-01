const User = require("./User");
const Scooter = require("./Scooter");

class ScooterApp {
  constructor() {
    this.stations = {
      "Station A": [],
      "Station B": [],
      "Station C": [],
    };
    this.registeredUsers = {};
  }

  registerUser(username, password, age) {
    if (this.registeredUsers[username]) {
      throw new Error("User already registered.");
    }
    if (age < 18) {
      throw new Error("Too young to register.");
    }

    const user = new User(username, password, age);
    this.registeredUsers[username] = user;
    console.log(`${username} has been registered.`);
    return user;
  }

  loginUser(username, password) {
    const user = this.registeredUsers[username];
    if (!user) {
      throw new Error("Username or password is incorrect.");
    }
    user.login(password);
  }

  logoutUser(username) {
    const user = this.registeredUsers[username];
    if (!user || !user.loggedIn) {
      throw new Error("No such user is logged in.");
    }
    user.logout();
  }

  createScooter(station) {
    if (!this.stations[station]) {
      throw new Error("No such station.");
    }

    const scooter = new Scooter(station);
    this.stations[station].push(scooter);
    console.log(`Created new scooter ${scooter.serial} at ${station}.`);
    return scooter;
  }

  dockScooter(scooter, station) {
    if (!this.stations[station]) {
      throw new Error("No such station.");
    }
    if (scooter.station === station) {
      throw new Error("Scooter already at station.");
    }

    scooter.dock(station);
    this.stations[station].push(scooter);
    console.log(`Scooter ${scooter.serial} is docked to ${station}.`);
  }

  rentScooter(scooter, user) {
    const station = Object.keys(this.stations).find((station) =>
      this.stations[station].includes(scooter)
    );

    if (!station) {
      throw new Error("Scooter not found at any station.");
    }

    if (scooter.user) {
      throw new Error("Scooter already rented.");
    }

    scooter.rent(user);
    const index = this.stations[station].indexOf(scooter);
    this.stations[station].splice(index, 1);
  }
}

module.exports = ScooterApp;
