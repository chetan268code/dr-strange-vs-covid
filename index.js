// Manage Universe in Multiverse
var Multiverse = require("./src/Multiverse.js");
var setupUniverse = require("./src/setupUniverse.js");

// Setup multiverse
var multiverse = new Multiverse();

// Get inputs from user to setup universe, portals and deamon timings in multiverse
// and calculate optimal time to find vaccine in nth universe from earth (1st universe)
setupUniverse(multiverse);
