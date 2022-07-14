async function fetchRewardsJSON() {
    const response = await fetch('upliftiumRewards.S7W1.json');

    const rewards = await response.json();

    return rewards;

}



async function getRewards() {



    const player = {
        wallet: "",
        mId: "",
        lRewards: 0,
        pRewards: 0,
        lrank: 0,
        totalRewards: 0,
        prank: 0

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

        playerArray = rewards;


    });



    //console.log(playerArray);

    let playerRewardCount = 0;
    let regionRewardCount = 0;



    playerArray.forEach(element => {

        let id = element.minecraftUUID;

        for (let i = 0; i <= 3; i++) {
            id = id.replace("-", "");
        }
        element.minecraftUUID = id;

        if (element.type == 'playerRewards') {

            playerRewards[playerRewardCount] = element;
            playerRewardCount++;

        }
        if (element.type == 'regionRewards') {


            landRewards[regionRewardCount] = element;
            regionRewardCount++;
        }

    });

    let finalPlayerList = [];

    let playersWithLandRewards = 0;

    console.log(playerArray);

    console.log(playerRewards);

    console.log(landRewards);

    playerRewards.forEach((element, index) => {

        const search = landRewards.filter(holder => holder.minecraftUUID == element.minecraftUUID);

        if (search.length != 0) {
            //console.log(search);
            const tPlayer = Object.create(player);

            tPlayer.wallet = element.playerWallet;
            tPlayer.mId = element.minecraftUUID;
            tPlayer.pRewards = element.amount;
            tPlayer.lRewards = search[0].amount;

            tPlayer.totalRewards = tPlayer.pRewards + tPlayer.lRewards;

            console.log(tPlayer);

            finalPlayerList[playersWithLandRewards] = tPlayer;
            playersWithLandRewards++;

        }


    });




    finalPlayerList.sort(function (a, b) {
        return b.totalRewards - a.totalRewards;
    });

    playerArray.sort(function (a, b) {
        return b.amount - a.amount;
    });


    playerRewards.sort(function (a, b) {
        return b.amount - a.amount;
    });


    landRewards.sort(function (a, b) {
        return b.amount - a.amount;
    });



    console.log(finalPlayerList);


    const payMonth = new Date(payoutDate).getMonth() + 1;

    const payDay = new Date(payoutDate).getDate();
    const payYear = new Date(payoutDate).getFullYear();

    //console.log(payMonth);
    //console.log(payDay);

    let playerSection = document.getElementsByClassName('outputLeaderBoard');

    let dateSection = document.getElementsByClassName('outputPayDate');

    let payDate = document.createElement('h3');


    payDate.innerHTML += payMonth + '-' + payDay + '-' + payYear;


    dateSection[0].appendChild(payDate);

    let totalLandPayout = 0;
    let totalPlayerPayout = 0;

    for (m = 0; m < playerArray.length; m++) {
        if (playerArray[m].type == 'playerRewards') {
            totalPlayerPayout += Number(playerArray[m].amount);

        }
        if (playerArray[m].type == 'regionRewards') {
            totalLandPayout += Number(playerArray[m].amount);

        }

    }

    //let totalRegion = document.getElementsByClassName('outputRegion');
    //let totalPlayer = document.getElementsByClassName('outputPlayer');

    let payOut = document.createElement('h3');

    payOut.innerHTML += 'Total Player Payout: ' + totalPlayerPayout.toLocaleString() + '<br>Total Region Payout: ' + totalLandPayout.toLocaleString() + '<br>';

    dateSection[0].appendChild(payOut);

    let headers = document.createElement('tr');
    

    headers.innerHTML += '<th>Rank</th><th>Minecraft ID</th><th colspan="2">Total Land and Player Rewards</th>'

  
    playerSection[0].appendChild(headers);


    for (m = 0; m < finalPlayerList.length; m++) {

        let player = document.createElement('tr');

        player.innerHTML += '<td>' + (m + 1) + '.</td><td><a id = "link-wallet" href="https://mcuuid.net/?q=' + finalPlayerList[m].mId + '" target="_blank">' + finalPlayerList[m].mId + '</a></td> <td colspan="2">' + finalPlayerList[m].totalRewards.toLocaleString() + '</td> ';

        playerSection[0].appendChild(player);
    }

    let break3 = document.createElement('tr');

    break3.innerHTML += '<td colspan=4 ><hr></td>';

    playerSection[0].appendChild(break3);

    let headers2 = document.createElement('tr');
    

    headers2.innerHTML += '<th>Rank</th><th>Wallet</th><th colspan="2">Total Player Rewards</th>'

  
    playerSection[0].appendChild(headers2);

    for (m = 0; m < playerRewards.length; m++) {

        let player = document.createElement('tr');

        player.innerHTML += '<td>' + (m + 1) + '.</td><td><a id = "link-wallet" href="https://wax.atomichub.io/profile/' + playerRewards[m].playerWallet + '?collection_name=upliftworld&order=desc&sort=transferred#inventory" target="_blank">' + playerRewards[m].playerWallet + '</a></td> <td colspan="2">' + playerRewards[m].amount.toLocaleString() + '</td>';

        playerSection[0].appendChild(player);
    }

    let break2 = document.createElement('tr');

    break2.innerHTML += '<td colspan=4 ><hr></td>';

    playerSection[0].appendChild(break2);

    let headers3 = document.createElement('tr');
    

    headers3.innerHTML += '<th>Rank</th><th>Wallet</th><th colspan="2">Total Region Rewards</th>'

  
    playerSection[0].appendChild(headers3);

    for (m = 0; m < landRewards.length; m++) {
        let player = document.createElement('tr');

        player.innerHTML += '<td>' + (m + 1) + '.</td><td><a id = "link-wallet" href="https://mcuuid.net/?q=' + landRewards[m].minecraftUUID + '" target="_blank">' + landRewards[m].minecraftUUID + '</a></td> <td colspan="2">' + landRewards[m].amount.toLocaleString() + '</td>';

        playerSection[0].appendChild(player);
    }

    let break1 = document.createElement('tr');

    break1.innerHTML += '<td colspan=5 ><hr></td>';

    playerSection[0].appendChild(break1);


/*

    for (m = 0; m < playerArray.length; m++) {

        let player = document.createElement('tr');

        player.innerHTML += '<td>' + (m + 1) + '.</td><td><a id = "link-wallet" href="https://mcuuid.net/?q=' + playerArray[m].minecraftUUID + '" target="_blank">' + playerArray[m].minecraftUUID + '</a></td> <td>' + playerArray[m].amount.toLocaleString() + '</td> <td><span id="reward-type">' + playerArray[m].type + '</span></td>';
        playerSection[0].appendChild(player);
    }
*/

}


getRewards();