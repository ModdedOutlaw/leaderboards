async function fetchRewardsJSON() {
    const response = await fetch('upliftiumRewards.S7W1.json');

    const rewards = await response.json();

    return rewards;

}



async function getRewards() {

    

    const players = {
        name: "",
        amount: 0,
        mId: "",
        type: "",
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


    var now = new Date();
    var payoutDate = new Date();
    var payoutStartDate = "2022-06-23";

    console.log(now);


    await fetchRewardsJSON().then(rewards => {
            //console.log(rewards.name);
            playerArray = rewards;
/*
            rewards.forEach((element, index) => {
                
                const player = Object.create(players);

                //console.log(element);
                
                player.name = element.playerWallet;
                player.amount = element.amount;
                player.mId = element.minecraftUUID;
                player.type = element.type;
            
                console.log(element.type)

                playerArray[index] = player;

            });
            */
        });



    console.log(playerArray);

    let playerRewardCount = 0;
    let regionRewardCount = 0;

    playerArray.forEach(element =>{
        if(element.type == 'playerRewards'){
            playerRewards[playerRewardCount] = element;
            playerRewardCount++;

        }
        if(element.type == 'regionRewards'){
            landRewards[regionRewardCount] = element;
            regionRewardCount++;
        }
 
    });

    playerRewards.sort(function (a, b) {
        return b.amount - a.amount;
    });


    landRewards.sort(function (a, b) {
        return b.amount - a.amount;
    });



    console.log(landRewards);
    console.log(playerRewards);

   // console.log(highReward);
   // console.log(payoutDate);

   
    const payMonth = new Date(payoutDate).getMonth() + 1;

    const payDay = new Date(payoutDate).getDate();
    const payYear = new Date(payoutDate).getFullYear();
  
    console.log(payMonth);
    console.log(payDay);

    let playerSection = document.getElementsByClassName('outputLeaderBoard');

    let dateSection = document.getElementsByClassName('outputPayDate');

    let payDate = document.createElement('h3'); 


    payDate.innerHTML += payMonth+'-'+payDay+'-'+payYear;


    dateSection[0].appendChild(payDate);


    for (m = 0; m <= 99; m++) {

        let player = document.createElement('tr'); 

        player.innerHTML += '<td>' + (m + 1) + '.</td><td><a id = "link-wallet" href="https://wax.atomichub.io/profile/' + playerRewards[m].playerWallet + '?collection_name=upliftworld&order=desc&sort=transferred#inventory" target="_blank">' + playerRewards[m].playerWallet + '</a></td> <td>' + playerRewards[m].amount.toLocaleString()  + '</td><td><span id="reward-type">' + playerRewards[m].type + '</span></td>';

        playerSection[0].appendChild(player);
    }

    let break2 = document.createElement('tr');

    break2.innerHTML += '<td colspan=5 ><hr></td>';

    playerSection[0].appendChild(break2);

    for (m = 0; m <= 99; m++) {
        let player = document.createElement('tr');

        player.innerHTML += '<td>' + (m + 1) + '.</td><td>' + landRewards[m].minecraftUUID + '</a></td> <td>' + landRewards[m].amount.toLocaleString() + '</td> <td><span id="reward-type">' + landRewards[m].type + '</span></td>';

        playerSection[0].appendChild(player);
    }

    let break1 = document.createElement('tr');

    break1.innerHTML += '<td colspan=5 ><hr></td>';
/*
    playerSection[0].appendChild(break1);

    for (m = 0; m <= 399; m++) {
        let player = document.createElement('tr');

        player.innerHTML += '<td>' + (m + 1) + '.</td><td><a id = "link-wallet" href="https://wax.atomichub.io/profile/' + playerArray[m].name + '?collection_name=upliftworld&order=desc&sort=transferred#inventory" target="_blank">' + playerArray[m].name + '</a></td> <td>' + playerArray[m].amount.toFixed(1) + '</td> <td><span id="reward-type"> ' + playerArray[m].symbol + '</span></td><td><span id="reward-type">' + playerArray[m].memo + '</span></td>';
        playerSection[0].appendChild(player);
    }
    */

}


getRewards();