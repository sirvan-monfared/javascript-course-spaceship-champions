// you can change these values 
const ATTACK_DAMAGE = 10;
const ENEMY_ATACK_DAMAGE = 15;
const POWER_ATTACK_DAMAGE = 18;
const HEAL_VALUE = 20;



const LOG_MODE_PLAYER_NORMAL_ATTACK = 'PLAYER_NORMAL_ATTACK';
const LOG_MODE_PLAYER_POWERL_ATTACK = 'PLAYER_POWER_ATTACK';
const LOG_MODE_ENEMY_ATTACK = 'ENEMY_ATTACK';
const LOG_MODE_PLAYER_HEAL = 'PLAYER_HEAL';
const LOG_MODE_GAME_OVER = 'GAME_OVER';

const ATTACK_MODE_NORMAL = 'NORMAL';
const ATTACK_MODE_POWER = 'POWER';

const userInput = prompt('میزان سلامتی اولیه سفینه ها را وارد کنید!', '100');

let chosenMaxLife = parseInt(userInput);


let enemyHealth = chosenMaxLife;
let playerHealth = chosenMaxLife;
let hasBonusLife = true;


if (isNaN(chosenMaxLife) || chosenMaxLife <= 0) {
    chosenMaxLife = 100;
}


const battleLog = [];

initiatePlayerAndEnemyHealth(chosenMaxLife);


function addToLog(action, data, playerHealth, enemyHealth) {
    let log = {
        action: action,
        value: data,
        playerHealth: playerHealth,
        enemyHealth: enemyHealth
    }

    if (action === LOG_MODE_PLAYER_NORMAL_ATTACK) {
        log.target = 'PLAYER';
    } else if (action === LOG_MODE_PLAYER_POWERL_ATTACK) {
        log.target = 'PLAYER';
    } else if (action === LOG_MODE_ENEMY_ATTACK) {
        log.target = 'ENEMY';
    } else if (action === LOG_MODE_PLAYER_HEAL) {
        log = {
            action: action,
            value: data,
            target: 'PLAYER',
            playerHealth: playerHealth,
            enemyHealth: enemyHealth
        }
    } else if (action === LOG_MODE_GAME_OVER) {
        log = {
            action: action,
            value: data,
            playerHealth: playerHealth,
            enemyHealth: enemyHealth
        }
    }


    battleLog.push(log);
}

function  reset() {
    enemyHealth = chosenMaxLife;
    playerHealth = chosenMaxLife;

    resetGame(chosenMaxLife);
}


function endTurn() {

    const playerHealthBeforeEnemyHit = playerHealth;

    const playerDamage = dealDamageToPlayer(ENEMY_ATACK_DAMAGE);
    playerHealth -= playerDamage;


    addToLog(LOG_MODE_ENEMY_ATTACK, playerDamage, playerHealth, enemyHealth);

    if (playerHealth <= 0 && hasBonusLife) {
        hasBonusLife = false;
        alert('شانس آوردی که جون اضافه به دادت رسید!');
        removeBonusLife();

        playerHealth = playerHealthBeforeEnemyHit;
        setPlayerHealth(playerHealth);
    }


    if (enemyHealth <= 0 && playerHealth > 0) {
        alert("Hooora! You Won");
        addToLog(LOG_MODE_GAME_OVER, 'PLAYER', playerHealth, enemyHealth);

    } else if (playerHealth <= 0 && enemyHealth > 0) {
        alert(" you lost");
        addToLog(LOG_MODE_GAME_OVER, 'ENEMY', playerHealth, enemyHealth);
    } else if (enemyHealth <= 0 && playerHealth <= 0) {
        alert("draw!");
        addToLog(LOG_MODE_GAME_OVER, 'DRAW', playerHealth, enemyHealth);
    }

    if (enemyHealth <=0 || playerHealth <=0) {
        reset();
    }

}

function attack(attackMode) {
    const baseDamage = (attackMode === ATTACK_MODE_NORMAL) ? ATTACK_DAMAGE : POWER_ATTACK_DAMAGE;
    const logAction = (attackMode === ATTACK_MODE_NORMAL) ? LOG_MODE_PLAYER_NORMAL_ATTACK : LOG_MODE_PLAYER_POWERL_ATTACK;

    const enemyDamage = dealDamageToEnemy(baseDamage);

    enemyHealth -= enemyDamage;

    addToLog(logAction, enemyDamage, playerHealth, enemyHealth);
    

    endTurn();
}


function attackHandler() {
    attack(ATTACK_MODE_NORMAL);
}


function powerAttackHandler() {
    attack(ATTACK_MODE_POWER)
}

function healPlayer() {
    const healValue = (playerHealth >= chosenMaxLife - HEAL_VALUE) ? chosenMaxLife - playerHealth : HEAL_VALUE;

    increasePlayerHealth(healValue);

    playerHealth += healValue;

    addToLog(LOG_MODE_PLAYER_HEAL, healValue, playerHealth, enemyHealth);

    endTurn();
}

function logHandler() {
    console.log(battleLog);
}

attackButtonElm.addEventListener("click", attackHandler);
strongAttackButtonElm.addEventListener("click", powerAttackHandler);
healButtonElm.addEventListener("click", healPlayer);
logButtonElm.addEventListener("click", logHandler);
