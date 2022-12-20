const fs = require('fs');
const PRICE_TABLE = [[5.0, 3000],[4.0, 2200],[3.0, 2000],[2.0, 1800],[1.5, 1600],[1.0, 1400],[0.9, 1200],[0, 1000],];
const GRAMS_PER_CARAT = 0.2;
const NUMBER_OF_ACCOMPLICES = 3;

function sum(arr) {
  if (arr.length === 0)
    return 0;
  return arr.reduce((a,b)=>a+b);
}

const diamondList = JSON.parse(fs.readFileSync('./diamonds.json'));
const valueList = diamondList.map((weight)=>{
  const carats = weight/GRAMS_PER_CARAT;
  let pricePerCarat = 0;
  for (i=0; i<PRICE_TABLE.length; i++){
    if (carats < PRICE_TABLE[i][0])
      continue;
    pricePerCarat = PRICE_TABLE[i][1];
    break;
  } 
  return Math.round(carats * pricePerCarat);
});

const spread = [];
for (i=0; i<NUMBER_OF_ACCOMPLICES; i++) {
  spread.push([]);
}

const toDistribute = valueList.sort((a,b)=>a-b);
while (toDistribute.length > 0) {
  let chosenArr = 0;
  for (let arr in spread) {
    if ( sum(spread[arr]) < sum(spread[chosenArr])) {
      chosenArr = arr;
    }
  }
  spread[chosenArr].push(toDistribute.pop());
}
for (let x of spread){
  console.log(x, "Total:", sum(x));
}