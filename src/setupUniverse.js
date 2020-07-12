const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

module.exports = function setupUniverse(multiverse) {
  var lineno = 0;
  var universeCount = 0;
  var portalCount = 0;
  var deamonUniverseCount = 0;

  rl.on("line", function (line) {
    lineno++;

    // Fetch No of universe and No of portals from first line of input
    if (lineno == 1) {
      [universeCount, portalCount] = line.split(" ");
      universeCount = parseInt(universeCount);
      portalCount = parseInt(portalCount);

      // Create {universeCount} number of universe
      for (var u = 1; u <= universeCount; u++)
        multiverse.addUniverse(u.toString());
    }
    // From 2nd to {portalCount+1} lines accept portal path and time to travel for all {portalCount} portals
    else if (lineno > 1 && lineno <= 1 + portalCount) {
      var [fromUniverse, toUniverse, travelTime] = line.split(" ");
      travelTime = parseInt(travelTime);
      multiverse.addPortal(fromUniverse, toUniverse, travelTime);
    }
    // From {portalCount+1} to {universeCount+portalCount+1} lines accept deamon timings for {universeCount} universe
    else if (
      lineno > 1 + portalCount &&
      lineno <= 1 + portalCount + universeCount
    ) {
      deamonUniverseCount++;
      var data = line.split(" ");
      var universe = deamonUniverseCount.toString();
      var deamonTimings = data.length > 1 ? data.slice(1) : [];
      deamonTimings = deamonTimings.map(function (time) {
        return parseInt(time);
      });
      multiverse.addDeamonTimimgs(universe, deamonTimings);

      // If it's the last line of input, calculate the time to travel from 1st to {universeCount} universe
      if (lineno == 1 + portalCount + universeCount) {
        var timeToFindVaccine = multiverse.findCovidVaccine(
          "1",
          universeCount.toString()
        );
        rl.write(timeToFindVaccine.toString());
        rl.write("\n");
        rl.close();
      }
    }
  });
};
