

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
    let highReward = 0;

    let n = 0;
    let count = 0;

    var before = new Date();
    var now = new Date();

    before.setDate(before.getDate() - 7);

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
                if (Date.parse(element.timestamp) > Date.parse(before)) {
                    player.name = element.act.data.to;

                    player.amount = element.act.data.amount;

                    player.symbol = element.act.data.symbol;

                    player.memo = element.act.data.memo;

                    player.date = element.timestamp;

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

    console.log(playerArray);

    console.log(highReward);

    const outputLeaderBoard = document.querySelector('.outputLeaderBoard');

    for(m=0;m<=299;m++){
    outputLeaderBoard.innerHTML += '<span>' +(m+1)+'. ' + playerArray[m].name +' = '+playerArray[m].amount + ' ' +playerArray[m].symbol +' '+playerArray[m].memo+' '+playerArray[m].date+'</span> <br>';
    }
    

}


getRewards();