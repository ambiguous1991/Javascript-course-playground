/////////////////////////////////
// CODING CHALLENGE

/*
Suppose that you're working in a small town administration, and you're in charge of two town elements:
1. Parks
2. Streets
It's a very small town, so right now there are only 3 parks and 4 streets. All parks and streets have a name and a build year.
At an end-of-year meeting, your boss wants a final report with the following:
1. Tree density of each park in the town (forumla: number of trees/park area)
2. Average age of each town's park (forumla: sum of all ages/number of parks)
3. The name of the park that has more than 1000 trees
4. Total and average length of the town's streets
5. Size classification of all streets: tiny/small/normal/big/huge. If the size is unknown, the default is normal
All the report data should be printed to the console.
HINT: Use some of the ES6 features: classes, subclasses, template strings, default parameters, maps, arrow functions, destructuring, etc.
*/

class CityElement {
    constructor(name, buildYear){
        this.name=name;
        this.buildYear=buildYear;
    }
}
const mappings = new Map();
mappings.set(5000, 'huge');
mappings.set(2000, 'big');
mappings.set(1000, 'normal');
mappings.set(500, 'small');
mappings.set(100, 'tiny');

class Park extends CityElement{
    constructor(name, buildYear, parkArea, numberOfTrees){
        super(name,buildYear);
        this.parkArea=parkArea;
        this.numberOfTrees=numberOfTrees;
    }

    calculateTreeDensity() {
        return this.parkArea/this.numberOfTrees;
    }

    calculateAge() {
        return new Date().getFullYear()-this.buildYear;
    }
}

class Street extends CityElement{
    constructor(name, buildYear, length, size='normal'){
        super(name, buildYear);
        this.length=length;
        this.size=size;
    }

    classify(){
        for(let [key,element] of mappings.entries()){
            if(this.size>=key) return element;
        }
    }
}

const parks = [
    new Park('first park', 1990, 200, 100),
    new Park('old park', 1950, 500, 25000),
    new Park('new park', 2000, 100, 999)
];

const streets = [
    new Street('Audreys Road', 2000, 100),
    new Street('Road nr 66', 1990, 5001),
    new Street('Tinies', 2010, 50),
    new Street('Another street', 2015, 101)
];

function displayTreeDensity(){
    parks.forEach(el=> console.log(`${el.name}'s tree density is ${el.calculateTreeDensity()}`));
}

function getParkAverageYear() {
    return parks.map(el=>el.calculateAge()).reduce((total, current)=>total+current);
}

function findParkNameWithOver1000Trees() {
    let ids = parks.map(el=>el.numberOfTrees>=1000);
    let id = ids.findIndex(function (el, index) {
        if(el) return index;
    });
    return parks[id].name;
}

function countTotalLength() {
    let sum = 0;
    streets.forEach((current)=>sum+=current.length);
    return sum;
}
function countAverageLength() {
    return countTotalLength()/streets.length;
}

(function display() {
    console.log('Tree density of each park in the town (forumla: number of trees/park area)');
    console.log(displayTreeDensity());
    console.log('Average age of each town\'s park (forumla: sum of all ages/number of parks)');
    console.log(getParkAverageYear());
    console.log('The name of the park that has more than 1000 trees');
    console.log(findParkNameWithOver1000Trees());
    console.log('Total and average length of the town\'s streets');
    console.log(`Total is ${countTotalLength()} and average is ${countAverageLength()}`);
})();