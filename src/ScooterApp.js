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
    try {
      if (this.registeredUsers[username]) {
        throw new Error("already registered");
      }
      if (age < 18) {
        throw new Error("too young to register");
      }
      const user = new User(username, password, age);
      this.registeredUsers[username] = user;
      console.log("User has been registered");
      return user;
    } catch (error) {
      throw error;
    }
  }

  loginUser(username, password) {
    try {
      const user = this.registeredUsers[username];
      if (!user) {
        throw new Error("Username or password is incorrect");
      }
      user.login(password);
      console.log("User has been logged in");
    } catch (error) {
      throw error;
    }
  }

  logoutUser(username) {
    try {
      const user = this.registeredUsers[username];
      if (!user || !user.loggedIn) {
        throw new Error("no such user is logged in");
      }
      user.logout();
      console.log("User is logged out");
    } catch (error) {
      throw error;
    }
  }

  createScooter(station) {
    try {
      if (!this.stations[station]) {
        throw new Error("no such station");
      }
      const scooter = new Scooter(station);
      this.stations[station].push(scooter);
      console.log("Created new scooter");
      return scooter;
    } catch (error) {
      throw error;
    }
  }

  dockScooter(scooter, station) {
    try {
      if (!this.stations[station]) {
        throw new Error("no such station");
      }
      if (this.stations[station].includes(scooter)) {
        throw new Error("scooter already at station");
      }
      scooter.dock(station);
      this.stations[station].push(scooter);
      console.log("Scooter is docked");
    } catch (error) {
      throw error;
    }
  }

  rentScooter(scooter, user) {
    try {
      if (scooter.user) {
        throw new Error("scooter already rented");
      }

      const station = scooter.station;
      if (!station || !this.stations[station].includes(scooter)) {
        throw new Error("scooter not at any station");
      }

      scooter.rent(user);
      const index = this.stations[station].indexOf(scooter);
      this.stations[station].splice(index, 1);
      console.log("Scooter is rented");
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ScooterApp;
