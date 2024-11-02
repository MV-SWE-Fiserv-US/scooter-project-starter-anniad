const Scooter = require("./Scooter");
const User = require("./User");

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
      throw new Error("Already registered");
    }
    if (age < 18) {
      throw new Error("Too young to register");
    }
    const user = new User(username, password, age);
    this.registeredUsers[username] = user;
    console.log("User has been registered");
    return user;
  }

  loginUser(username, password) {
    const user = this.registeredUsers[username];
    if (!user) {
      throw new Error("Username or password is incorrect");
    }
    try {
      user.login(password);
      console.log("User has been logged in");
    } catch (error) {
      throw new Error("Username or password is incorrect");
    }
  }

  logoutUser(username) {
    const user = this.registeredUsers[username];
    if (!user) {
      throw new Error("No such user is logged in");
    }
    user.logout();
    console.log("User is logged out");
  }

  createScooter(station) {
    if (!this.stations[station]) {
      throw new Error("No such station");
    }
    const scooter = new Scooter(station);
    this.stations[station].push(scooter);
    console.log("Created new scooter");
    return scooter;
  }

  dockScooter(scooter, station) {
    if (!this.stations[station]) {
      throw new Error("No such station");
    }

    const isAtStation = this.stations[station].some(
      (s) => s.serial === scooter.serial
    );
    if (isAtStation) {
      throw new Error("Scooter already at station");
    }

    scooter.dock(station);
    this.stations[station].push(scooter);
    console.log("Scooter is docked");
  }

  rentScooter(scooter, user) {
    let found = false;
    for (const station in this.stations) {
      const index = this.stations[station].findIndex(
        (s) => s.serial === scooter.serial
      );
      if (index !== -1) {
        this.stations[station].splice(index, 1);
        found = true;
        break;
      }
    }
    if (!found) {
      throw new Error("Scooter already rented");
    }
    scooter.rent(user);
    console.log("Scooter is rented");
  }
}

module.exports = ScooterApp;
