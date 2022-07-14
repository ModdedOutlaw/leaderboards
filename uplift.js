

async function fetchUpliftJSON() {
    const response = await fetch('https://tools.uplift.art:3033/v1/world/info/upliftium');

    const rewards = await response.json();

    return rewards;

}


async function getUplift(){
await fetchUpliftJSON().then(rewards => {

    console.log(rewards);


});
}

getUplift();
