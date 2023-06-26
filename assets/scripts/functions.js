const enemyMaxHealthElm = document.getElementById("max-enemy-health");
const enemyHealthElm = document.getElementById("current-enemy-health");
const playerMaxHealthElm = document.getElementById("max-player-health");
const playerHealthElm = document.getElementById("current-player-health");

const bonusLifeEl = document.getElementById("bonus-life");

const attackButtonElm = document.getElementById("attack-btn");
const strongAttackButtonElm = document.getElementById("strong-attack-btn");
const healButtonElm = document.getElementById("heal-btn");
const logButtonElm = document.getElementById("log-btn");

function initiatePlayerAndEnemyHealth(maxLife) {
  enemyMaxHealthElm.innerHTML = maxLife;
  enemyHealthElm.innerHTML = maxLife;
  playerMaxHealthElm.innerHTML = maxLife;
  playerHealthElm.innerHTML = maxLife;
}

function dealDamageToEnemy(damage) {
  const dealtDamage = Math.random() * damage;
  enemyHealthElm.innerHTML = +enemyHealthElm.innerHTML - dealtDamage;

  return dealtDamage;
}

function dealDamageToPlayer(damage) {
  const dealtDamage = Math.floor(Math.random() * damage);
  playerHealthElm.innerHTML = +playerHealthElm.innerHTML - dealtDamage;
  return dealtDamage;
}

function increasePlayerHealth(healValue) {
  playerHealthElm.innerHTML = +playerHealthElm.innerHTML + healValue;
}

function resetGame(value) {
  playerHealthElm.innerHTML = value;
  enemyHealthElm.innerHTML = value;
}

function removeBonusLife() {
  bonusLifeEl.parentNode.removeChild(bonusLifeEl);
}

function setPlayerHealth(health) {
  playerHealthElm.innerHTML = health;
}
