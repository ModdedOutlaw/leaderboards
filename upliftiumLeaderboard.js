async function fetchTemplates() {

    const response = await fetch('https://wax.api.atomicassets.io/atomicassets/v1/templates?collection_name=upliftworld&schema_name=keys&page=1&limit=100&order=desc&sort=created');

    const templates = await response.json();

    return templates;

}



async function fetchID(id) {

    const response = await fetch('https://playerdb.co/api/player/minecraft/' + id);

    const id_info = await response.json();

    return id_info;

}


async function getTemplates() {
    const template = {
        name: "",
        tempId: ""
    }

    let templateList = [];

    await fetchTemplates().then(templates => {
        //console.log(templates);
        let i = 0;


        templates.data.forEach((element, index) => {

            const tempTemp = Object.create(template);

            if (element.template_id != '477759') {

                tempTemp.name = element.name;
                tempTemp.templateId = element.template_id;
                templateList[i] = tempTemp;
                i++
            }

        });

    });

    return templateList;

}



async function fetchRewardsJSON() {
    const response = await fetch('upliftiumRewards.S7W1.json');

    let payoutDate = response.headers.get('last-modified')
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

    const rewards = await response.json();

    return rewards;

}


async function getRewards() {



    const player = {
        wallet: "",
        mId: "",
        mName:"",
        lRewards: 0,
        pRewards: 0,
        lrank: 0,
        totalRewards: 0,

        prank: 0,
        totalKeys: 0

    };

    let playerArray = [];
    let landRewards = [];
    let playerRewards = [];

    
    let regionRewardsArray = [];
    let playerRewardsArray = [];
    let playerObjectArray = [];


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

    let templates = await getTemplates();

    //console.log(templates);


    playerArray.forEach((element , index)=> {

        let id = element.minecraftUUID;

        for (let i = 0; i <= 3; i++) {
            id = id.replace("-", "");
        }
         element.minecraftUUID = id;

         const tPlayer = Object.create(player);

         tPlayer.mId = id;


        if (element.type == 'playerRewards') {

            playerRewards[playerRewardCount] = element;

            tPlayer.wallet = element.playerWallet;
            tPlayer.pRewards = element.amount;

            playerRewardsArray[playerRewardCount] = tPlayer;

            playerRewardCount++;

        }
        if (element.type == 'regionRewards') {


            landRewards[regionRewardCount] = element;

            tPlayer.lRewards = element.amount;

            regionRewardsArray[regionRewardCount] = tPlayer;

            regionRewardCount++;
        }

        playerObjectArray[index] = tPlayer;

    });

    let finalPlayerList = [];

    let playersWithLandRewards = 0;

    //console.log(playerArray);


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

    playerRewardsArray.sort(function (a, b) {
        return b.pRewards - a.pRewards;
    });


    regionRewardsArray.sort(function (a, b) {
        return b.lRewards - a.lRewards;
    });





    //console.log(finalPlayerList);


   
    //  ^^^^^−−−−−−−−−−−−−−−−−−−−−−−−−−− use `const` or `let`, not `var`

    for (let i = 0; i < finalPlayerList.length; i++) {
        //       ^^^−−−−−−−−−−−−−−−−−−−−−−−− added missing declaration
       const resp = await fetch('https://playerdb.co/api/player/minecraft/' + finalPlayerList[i].mId);
        
        let data = await resp.json();

       // console.log(promises[i].data.player.username);

        finalPlayerList[i].mName = data.data.player.username
    }

  /*  for (let i = 0; i < playerRewardsArray.length; i++) {
        //       ^^^−−−−−−−−−−−−−−−−−−−−−−−− added missing declaration
       const resp = await fetch('https://playerdb.co/api/player/minecraft/' + playerRewardsArray[i].mId);
        
        let data = await resp.json();

       // console.log(promises[i].data.player.username);

        playerRewardsArray[i].mName = data.data.player.username
    }

*/


  
    console.log(playerRewardsArray);

    console.log(regionRewardsArray);


    //console.log(promises[0].json());

    //const p = await Promise.resolve(promises);

//console.log(p);


   

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


    //let templateList = await getTemplates();
    /*

        for (i = 0; i < templateList.length; i++) {


            await fetchKeys('https://wax.api.atomicassets.io/atomicassets/v1/accounts?collection_name=upliftworld&schema_name=keys&template_id=' + templateList[i].templateId + '&page=1&limit=500&order=desc').then(keys => {

                if (templateList[i].templateId != '330810' && templateList[i].templateId != '244813' && templateList[i].templateId != '245539') {
                    
                    keys.data.forEach(element => {
                   
                        const search = finalPlayerList.filter(holder => holder.wallet == element.account);

                        if(search.length != 0){
                         
                            search[0].totalKeys += Number(element.assets);
            
                        }
                        
                    });
                }



            });

        }
    */

        let playerSection = document.getElementsByClassName('outputLeaderBoard');

        let dateSection = document.getElementsByClassName('outputPayDate');


    let payOut = document.createElement('h3');

    payOut.innerHTML += 'Total Player Payout: ' + totalPlayerPayout.toLocaleString() + '<br>Total Region Payout: ' + totalLandPayout.toLocaleString() + '<br>';

    dateSection[0].appendChild(payOut);

    let headers = document.createElement('tr');


    headers.innerHTML += '<th>Rank</th><th>Minecraft Name -- Wax wallet</th><th >Total Land and <br>Player Rewards</th>'


    playerSection[0].appendChild(headers);


    for (m = 0; m < finalPlayerList.length; m++) {

        let player = document.createElement('tr');

        player.innerHTML += '<td>' + (m + 1) + '.</td><td><a id = "link-wallet" href="https://wax.atomichub.io/profile/' + finalPlayerList[m].mId + '?collection_name=upliftworld&order=desc&sort=transferred#inventory" target="_blank">' + finalPlayerList[m].mName + ' -- '+finalPlayerList[m].wallet +'</a></td> <td >' + finalPlayerList[m].totalRewards.toLocaleString() + '</td>';

        playerSection[0].appendChild(player);
    }

    let break3 = document.createElement('tr');

    break3.innerHTML += '<td colspan=4 ><hr></td>';

    playerSection[0].appendChild(break3);

    let headers2 = document.createElement('tr');


    headers2.innerHTML += '<th>Rank</th><th>Wallet</th><th colspan="2">Total Player Rewards</th>'


    playerSection[0].appendChild(headers2);

    for (m = 0; m < playerRewardsArray.length; m++) {

        let player = document.createElement('tr');

        player.innerHTML += '<td>' + (m + 1) + '.</td><td><a id = "link-wallet" href="https://wax.atomichub.io/profile/' + playerRewardsArray[m].wallet + '?collection_name=upliftworld&order=desc&sort=transferred#inventory" target="_blank">' + playerRewardsArray[m].wallet + '</a></td> <td colspan="2">' + playerRewardsArray[m].pRewards.toLocaleString() + '</td>';

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


}

async function fetchKeys(url) {
    const response = await fetch(url);

    const keys = await response.json();

    return keys;

}

async function fetchTemplateCount(wam) {

    const response = await fetch('https://wax.api.atomicassets.io/atomicassets/v1/accounts/' + wam + '/upliftworld');

    const templateCount = await response.json();

    return templateCount;

}

getRewards();