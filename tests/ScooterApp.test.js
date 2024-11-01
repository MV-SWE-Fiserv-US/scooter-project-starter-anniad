const Scooter = require("../src/Scooter");
const User = require("../src/User");
const ScooterApp = require("../src/ScooterApp");

const scooterApp = new ScooterApp();
// ScooterApp tests here

// register user
describe("registerUser method tests", () => {
  test("Should return instance of User", () => {
    let response = scooterApp.registerUser("Joe Bloggs", "test123", 21);
    expect(response).toBeInstanceOf(User);
  });
});

// Log in test
describe("loginUser method", () => {
  beforeEach(() => {
    scooterApp.registerUser("Alice", "password123", 25);
  });

  test("should log user in successfully", () => {
    scooterApp.loginUser("Alice", "password123");
    expect(scooterApp.registeredUsers["Alice"].loggedIn).toBe(true);
  });
});

// Log out test
describe("logoutUser method", () => {
  beforeEach(() => {
    scooterApp.registerUser("Bob", "securepass", 30);
    scooterApp.loginUser("Bob", "securepass");
  });

  test("should log user out successfully", () => {
    scooterApp.logoutUser("Bob");
    expect(scooterApp.registeredUsers["Bob"].loggedIn).toBe(false);
  });
});

// Rent scooter test
describe("rentScooter method", () => {
  let scooter;

  beforeEach(() => {
    scooter = scooterApp.createScooter("Station A");
    scooterApp.registerUser("Charlie", "password456", 28);
    scooterApp.loginUser("Charlie", "password456");
  });

  test("should rent a scooter successfully", () => {
    scooterApp.rentScooter(scooter, scooterApp.registeredUsers["Charlie"]);
    expect(scooter.user).toBe(scooterApp.registeredUsers["Charlie"]);
  });
});

// Dock scooter test
describe("dockScooter method", () => {
  let scooter;

  beforeEach(() => {
    scooter = scooterApp.createScooter("Station B");
    scooterApp.registerUser("Dave", "password789", 35);
    scooterApp.loginUser("Dave", "password789");
    scooterApp.rentScooter(scooter, scooterApp.registeredUsers["Dave"]);
  });

  test("should dock a scooter successfully", () => {
    scooterApp.dockScooter(scooter, "Station B");
    expect(scooter.station).toBe("Station B");
    expect(scooter.user).toBe(null);
    expect(scooterApp.stations["Station B"]).toContain(scooter);
  });
});
