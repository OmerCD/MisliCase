const matches = [{
    id: {value: 1},
    league: {value: 'UCL'},
    time: {value: '20:00'},
    MBS: {value: '3'},
    description: {value: 'IS Halmia\nEslovs BK'},
    one: {value: 1.55, isButton: true, display: 1},
    zero: {value: 3.75, isButton: true, display: 0},
    two: {value: 3.40, isButton: true, display: 2}
},
    {
        id: {value: 2},
        league: {value: 'JSF'},
        time: {value: '20:00'},
        MBS: {value: '3'},
        description: {value: 'Hobro\nVibog'},
        one: {value: 2.95, isButton: true, display: 1},
        zero: {value: 3.00, isButton: true, display: 0},
        two: {value: 1.85, isButton: true, display: 2}
    },
    {
        id: {value: 3},
        league: {value: 'TRN'},
        time: {value: '20:00'},
        MBS: {value: '3'},
        description: {value: 'Hassleholm\nKristianstad'},
        one: {value: 1.85, isButton: true, display: 1},
        zero: {value: 3.20, isButton: true, display: 0},
        two: {value: 2.70, isButton: true, display: 2}
    }
]
const selectedMatches = [];
let betSum = 0;
let betMultiplier = 1;
const mainTable = document.getElementById("main-table");

const mapped = matches.map(item => {
    const props = Object.entries(item);
    const propMapped = props.map(function (prop, index) {
        const propertyValue = prop[1];
        if (prop[0] === 'id') return;
        if (propertyValue.isButton) {
            return `<td>
                        <button id="btn${props[0][1].value}${propertyValue.display}" class="btn-percentage" onclick="buttonClick(${propertyValue.value},${propertyValue.display},${props[0][1].value})">
                            ${propertyValue.value.toFixed(2)}
                        </button>
                    </td>`
        } else {
            return `<td>${propertyValue.value}</td>`;
        }
    })
    return '<tr>' + propMapped.join('') + '</tr>';
});
mainTable.innerHTML += mapped;


const buttonClick = (bet, display, id) => {
    const matchInfos = document.getElementById('match-infos');
    const match = matches.find(x => x.id.value === id);
    const matchInfo = `<div id="${id}">
                            <p>${match.description.value}</p>
                            <p>${match.MBS.value}   B  Maç Sonucu :${display}  ${bet.toFixed(2)} </p>>
                            <button onclick="removeBet(${id},${display})">X</button>
                        </div>
`
    matchInfos.innerHTML += matchInfo;
    selectedMatches.push({match, bet});
    document.getElementById(`btn${id}${display}`).style.backgroundColor = 'red';
    calculateBets();
}

const removeBet = (id, display) => {
    const match = document.getElementById(id);
    match.parentNode.removeChild(match);
    const deleteIndex = selectedMatches.map(e => e.match.id).indexOf(id);
    selectedMatches.splice(deleteIndex, 1);
    document.getElementById(`btn${id}${display}`).style.backgroundColor = 'white'
    calculateBets();
}

function checkBetAvailability() {
    const betButton = document.getElementById("bet-on");
    if (selectedMatches.length >= 3){
        betButton.style.backgroundColor = "green";
        betButton.innerHTML="Bahis Oyna";
    }
    else{
        betButton.style.backgroundColor = "red";
        betButton.innerHTML="3 maç seçmeniz gerekmektedir";
    }
}

const calculateBets = () => {
    betSum = 1;
    for (let i = 0; i < selectedMatches.length; i++) {
        betSum *= selectedMatches[i].bet;
    }
    if (betSum === 1) {
        betSum = 0;
    }
    checkBetAvailability();
    changeBet();
}

const betMultiplierChange = (val) => {
    betMultiplier = val === 0 ? 1 : val;
    changeBet();
}
const changeBet = () => {
    document.getElementById('bet-total').innerHTML = `Bahis Oranı :${(betSum * betMultiplier).toFixed(2)}`;
}
