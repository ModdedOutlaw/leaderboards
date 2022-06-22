async function fetchRewardsJSON(url) {
    const response = await fetch(url);

    const rewards = await response.json();

    return rewards;

}


async function getRewards() {
    const players = {
        name: "",
        amount: 0,
        memo: "",
        symbol: "",
        date: ""
    };

    let playerArray = [];
    let landRewards = [];
    let playerRewards = [];

    let highReward = 0;

    let n = 0;
    let count = 0;
    let countLand = 0;
    let countPlayer = 0;

    var before = new Date();
    var now = new Date();
    var payoutStartDate = "2022-06-14";
    before.setDate(before.getDate() - 9);

    console.log(before);
    console.log(now);

    for (i = 1; i <= 5; i++) {

        await fetchRewardsJSON('UpliftRewardTransactions' + i + '.json').then(rewards => {
            //console.log(rewards);
            rewards.data.actions.forEach((element, index) => {
                const player = Object.create(players);

                let reward = element.act.data.amount;
                if (reward > highReward) {
                    highReward = reward;
                }
                if (Date.parse(element.timestamp) > Date.parse(payoutStartDate)) {
                    player.name = element.act.data.to;

                    player.amount = element.act.data.amount;

                    player.symbol = element.act.data.symbol;

                    player.memo = element.act.data.memo;

                    player.date = element.timestamp;

                    if (player.memo == "The Uplift World - Player Rewards") {
                        player.memo = "Player Rewards"
                        landRewards[countLand] = player;
                        countLand = countLand + 1;
                    } else {
                        player.memo = "Land Rewards"
                        playerRewards[countPlayer] = player;
                        countPlayer = countPlayer + 1;
                    }
                    playerArray[count] = player;
                    count = count + 1;
                }

            });
            n = 1000 + n;
        });

    }
    playerArray.sort(function (a, b) {
        return b.amount - a.amount;
    });

    landRewards.sort(function (a, b) {
        return b.amount - a.amount;
    });

    playerRewards.sort(function (a, b) {
        return b.amount - a.amount;
    });

    console.log(playerArray);
    console.log(landRewards);
    console.log(playerRewards);

    console.log(highReward);


    let playerSection = document.getElementsByClassName('outputLeaderBoard');




    for (m = 0; m <= 49; m++) {
        let player = document.createElement('tr');

        player.innerHTML += '<td>' + (m + 1) + '.</td><td>' + playerRewards[m].name + '</td> <td>' + playerRewards[m].amount.toFixed(1) + '</td> <td><span id="reward-type"> ' + playerRewards[m].symbol + '</span></td><td><span id="reward-type">' + playerRewards[m].memo + '</span></td>';

        playerSection[0].appendChild(player);
    }

    let break2 = document.createElement('tr');

    break2.innerHTML += '<td><hr></td><td><hr></td><td><hr></td><td><hr></td><td><hr></td>';

    playerSection[0].appendChild(break2);

    for (m = 0; m <= 49; m++) {
        let player = document.createElement('tr');

        player.innerHTML += '<td>' + (m + 1) + '.</td><td>' + landRewards[m].name + '</td> <td>' + landRewards[m].amount.toFixed(1) + '</td> <td><span id="reward-type"> ' + landRewards[m].symbol + '</span></td><td><span id="reward-type">' + landRewards[m].memo + '</span></td>';

        playerSection[0].appendChild(player);
    }

    let break1 = document.createElement('tr');

    break1.innerHTML += '<td><hr></td><td><hr></td><td><hr></td><td><hr></td><td><hr></td>';

    playerSection[0].appendChild(break1);

    for (m = 0; m <= 399; m++) {
        let player = document.createElement('tr');

        player.innerHTML += '<td>' + (m + 1) + '.</td><td>' + playerArray[m].name + '</td> <td>' + playerArray[m].amount.toFixed(1) + '</td> <td><span id="reward-type"> ' + playerArray[m].symbol + '</span></td><td><span id="reward-type">' + playerArray[m].memo + '</span></td>';
        playerSection[0].appendChild(player);
    }

}


getRewards();