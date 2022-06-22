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

    
    let playerSection = document.getElementsByClassName('outputLeaderBoard');
  
    
    

    for (m = 0; m <= 299; m++) {
        let player = document.createElement('tr');

        player.innerHTML += '<td>' +(m+1)+'.</td><td>' + playerArray[m].name +'</td> <td>'+playerArray[m].amount.toFixed(1) + '</td> <td><span id="reward-type"> ' +playerArray[m].symbol +'</span></td><td><span id="reward-type">'+playerArray[m].memo+'</span></td>';
        



/*
        let playerName = document.createElement('td');
        playerName.id = "sub-header2";

        playerName.innerHTML +=playerArray[m].name;


        section[0].appendChild(playerName);

        let playerAmount = document.createElement('td');
        playerAmount.id = "sub-header2";

        playerAmount.innerHTML += playerArray[m].amount.toFixed(1);

        section[0].appendChild(playerAmount);

        let amountType = document.createElement('td');
        amountType.id = "sub-header2";

        amountType.innerHTML += playerArray[m].symbol;
        

        section[0].appendChild(amountType);

        let rewardType = document.createElement('td');
        rewardType.id = "reward-type";

        rewardType.innerHTML += playerArray[m].memo;
        

        section[0].appendChild(rewardType);
        */
        playerSection[0].appendChild(player);
    }
    
}


getRewards();