// Priority Queue for managing universe to visit and calculate time elapsed
var PriorityQueue = require("./priorityQueue.js");

module.exports = class Multiverse {
  constructor() {
    this.universeList = [];
    this.portalsList = {};
    this.deamonsTiming = {};
  }

  addUniverse(universe) {
    this.universeList.push(universe);
    this.portalsList[universe] = [];
    this.deamonsTiming[universe] = [];
  }

  addPortal(universe1, universe2, time) {
    this.portalsList[universe1].push({
      neighborUniverse: universe2,
      portalTime: time,
    });
    this.portalsList[universe2].push({
      neighborUniverse: universe1,
      portalTime: time,
    });
  }

  addDeamonTimimgs(universe, times = []) {
    this.deamonsTiming[universe] = times;
  }

  checkForDeamon(universe, time) {
    return this.deamonsTiming[universe].includes(time);
  }

  findCovidVaccine(startUniverse, endUniverse) {
    let times = {};
    let pq = new PriorityQueue();

    // Set time to travel for {startUniverse} to 0
    times[startUniverse] = 0;

    // Set time to travel for all universe other than {startUniverse} to Infinity, as time is not yet calculated
    this.universeList.forEach((universe) => {
      if (universe !== startUniverse) {
        times[universe] = Infinity;
      }
    });

    // Add {startUniverse} to priority queue
    pq.enqueue([startUniverse, 0]);

    while (!pq.isEmpty()) {
      // Get the universe with the shortest time to travel
      let shortestPortal = pq.dequeue();
      let currentUniverse = shortestPortal[0];

      // Travel all universe which are connected to {startUniverse} with portals
      this.portalsList[currentUniverse].forEach((portalConnection) => {
        // Time to travel to neighbor universe to {startUniverse} through {portalConnection}
        let time = times[currentUniverse] + portalConnection.portalTime;

        // Check if deamon exists at time {time} on universe {portalConnection.neighborUniverse}
        let isDeamonPresent = this.checkForDeamon(
          portalConnection.neighborUniverse,
          time
        );
        // if Deamon exists, add 1 unit of time
        if (isDeamonPresent) time += 1;

        // Check if new time to travel is less than already calculated time to travel for {portalConnection.neighborUniverse},
        if (time < times[portalConnection.neighborUniverse]) {
          times[portalConnection.neighborUniverse] = time;
          pq.enqueue([portalConnection.neighborUniverse, time]);
        }
      });
    }

    // return time to travel for {endUniverse}
    return times[endUniverse];
  }
};
