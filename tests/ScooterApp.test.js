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
// login
describe("loginUser method tests", () => {
  test("Should login user successfully", () => {
    scooterApp.registerUser("TestUser", "password123", 25);
    expect(() => scooterApp.loginUser("TestUser", "password123")).not.toThrow();
  });
});

// logout
describe("logoutUser method tests", () => {
  test("Should logout user successfully", () => {
    const username = "LogoutUser";
    scooterApp.registerUser(username, "pass123", 25);
    scooterApp.loginUser(username, "pass123");
    expect(() => scooterApp.logoutUser(username)).not.toThrow();
  });
});

// rent scooter
describe("rentScooter method tests", () => {
  test("Should rent scooter to user", () => {
    const user = scooterApp.registerUser("RenterUser", "pass123", 25);
    const scooter = scooterApp.createScooter("Station A");
    expect(() => scooterApp.rentScooter(scooter, user)).not.toThrow();
  });
});

// dock scooter
describe("dockScooter method tests", () => {
  test("Should dock scooter at station", () => {
    const scooter = scooterApp.createScooter("Station A");
    expect(() => scooterApp.dockScooter(scooter, "Station B")).not.toThrow();
  });
});
