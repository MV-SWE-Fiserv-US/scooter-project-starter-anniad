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

// login user
describe("loginUser method tests", () => {
  test("Should log in a user successfully", () => {
    scooterApp.registerUser("User3", "pass789", 24);
    scooterApp.loginUser("User3", "pass789");
    expect(scooterApp.registeredUsers["User3"].loggedIn).toBe(true);
  });

  test("Should throw error if user does not exist", () => {
    expect(() => {
      scooterApp.loginUser("NonExistentUser", "pass000");
    }).toThrow("Username or password is incorrect");
  });

  test("Should throw error if password is incorrect", () => {
    scooterApp.registerUser("User4", "pass012", 26);
    expect(() => {
      scooterApp.loginUser("User4", "wrongPass");
    }).toThrow("incorrect password");
  });
});

// logout user
describe("logoutUser method tests", () => {
  test("Should log out a user successfully", () => {
    scooterApp.registerUser("User5", "pass345", 28);
    scooterApp.loginUser("User5", "pass345");
    scooterApp.logoutUser("User5");
    expect(scooterApp.registeredUsers["User5"].loggedIn).toBe(false);
  });

  test("Should throw error if user is not logged in", () => {
    scooterApp.registerUser("User6", "pass678", 30);
    expect(() => {
      scooterApp.logoutUser("User6");
    }).toThrow("no such user is logged in");
  });
});

// rent scooter
describe("rentScooter method tests", () => {
  test("Should rent a scooter to a user successfully", () => {
    const scooter = scooterApp.createScooter("Station A");
    scooterApp.registerUser("User7", "pass901", 32);
    scooterApp.loginUser("User7", "pass901");
    scooterApp.rentScooter(scooter, scooterApp.registeredUsers["User7"]);
    expect(scooter.user).toBe(scooterApp.registeredUsers["User7"]);
    expect(scooter.station).toBeNull();
  });

  test("Should throw error if scooter is already rented", () => {
    const scooter = scooterApp.createScooter("Station A");
    scooterApp.registerUser("User8", "pass234", 34);
    scooterApp.loginUser("User8", "pass234");
    scooterApp.rentScooter(scooter, scooterApp.registeredUsers["User8"]);
    expect(() => {
      scooterApp.rentScooter(scooter, scooterApp.registeredUsers["User8"]);
    }).toThrow("scooter already rented");
  });

  test("Should throw error if scooter is not at any station", () => {
    const scooter = new Scooter(); // Not added to any station
    scooterApp.registerUser("User9", "pass567", 36);
    scooterApp.loginUser("User9", "pass567");
    expect(() => {
      scooterApp.rentScooter(scooter, scooterApp.registeredUsers["User9"]);
    }).toThrow("scooter not at any station");
  });
});

// dock scooter
describe("dockScooter method tests", () => {
  test("Should dock a scooter at a station successfully", () => {
    const scooter = new Scooter("Station C");
    scooterApp.dockScooter(scooter, "Station B");
    expect(scooter.station).toBe("Station B");
    expect(scooterApp.stations["Station B"]).toContain(scooter);
  });

  test("Should throw error if station does not exist", () => {
    const scooter = new Scooter("Station C");
    expect(() => {
      scooterApp.dockScooter(scooter, "NonExistentStation");
    }).toThrow("no such station");
  });

  test("Should throw error if scooter is already at the station", () => {
    const scooter = scooterApp.createScooter("Station A");
    expect(() => {
      scooterApp.dockScooter(scooter, "Station A");
    }).toThrow("scooter already at station");
  });
});
