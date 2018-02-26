// Write your JavaScript code here!
var planets = [
    ['Pluto', 0.06],
    ['Neptune', 1.148],
    ['Uranus', 0.917],
    ['Saturn', 1.139],
    ['Jupiter', 2.640],
    ['Mars', 0.3895],
    ['Moon', 0.1655],
    ['Earth', 1],
    ['Venus', 0.9032],
    ['Mercury', 0.377],
    ['Sun', 27.9]
];

var dots = ['', '.', '..', '...'];
var i = 0;
var dotCycle;

function doDots() {
    var output = document.getElementById('output');
    dotCycle = setTimeout(function() {
        if (i < dots.length) {
            output.innerHTML = dots[i];
            i++;
            doDots();
        } else {
            i = 0;
            doDots();
        }
    }, 500);
}

function populatePlanets( planets ) {
    planets = planets.reverse();
    var selectGroup = document.getElementById('planets');

    planets.forEach(function( planet, index, planets ) {
        var newPlanet = document.createElement('option');
        newPlanet.value = index;
        newPlanet.innerHTML = planet[0];
        selectGroup.appendChild(newPlanet);
    });
}

function calculateWeight(weight, planetName) {
    var newWeight = weight * planets[planetName][1];
    return newWeight;
}

function handleClickEvent(e) {

    var weightInput = document.getElementById('user-weight').value;

    var planetInput = document.getElementById('planets').value;
    var planetName = document.getElementById('planets')[planetInput].innerHTML;
    
    if (planetName === 'Sun') {
        var extra = ' the ';
    } else {
        var extra = '';
    }

    var result = calculateWeight(weightInput, planetInput);

    var output = document.getElementById('output');
    output.innerHTML = 'If you were on ' + extra + planetName + ', you would weigh ' + result + 'lbs!';
}

function buttonClick() {
    var button = document.getElementById('calculate-button');
    button.addEventListener('click', function() {
        clearTimeout(dotCycle);
        handleClickEvent();
    });

    var killPluto = document.getElementById('rip-pluto');
    killPluto.addEventListener('click', function() {
        ripPluto();
    });

    var newPlanetButton = document.getElementById('new-planet-button');
    newPlanetButton.addEventListener('click', function() {
        addNewPlanet();
    });
}

function ripPluto() {
    var killPluto = document.getElementById('rip-pluto');
    var selectGroup = document.getElementById('planets');

    if (killPluto.checked) {
        selectGroup.innerHTML = '';
        for (i=0; i<planets.length; i++) {
            if ( planets[i][0] === 'Pluto' ) {
                planets.splice(i, 1);
            }
        }
        planets.reverse();
        populatePlanets(planets);
    } else {
        selectGroup.innerHTML = '';
        planets.splice(10, 0, ['Pluto', 0.06]);
        planets.reverse();
        populatePlanets(planets);
    }
}

function addNewPlanet() {
    var newPlanetName = document.getElementById('new-planet-name').value;
    var newPlanetMulti = document.getElementById('new-planet-multi').value;
    var selectGroup = document.getElementById('planets');

    selectGroup.innerHTML = '';
    planets.push([newPlanetName, newPlanetMulti]);
    planets.reverse();
    populatePlanets(planets);
}

doDots();
populatePlanets( planets );
buttonClick();