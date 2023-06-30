const ATTACK_DAMAGE = 10;
const ENEMY_ATACK_DAMAGE = 15;
const POWER_ATTACK_DAMAGE = 18;
const HEAL_VALUE = 20;

let chosenMaxLife = 100;

let enemyHealth = chosenMaxLife;
let playerHealth = chosenMaxLife;

initiatePlayerAndEnemyHealth(chosenMaxLife);


function endTurn() {
    const playerDamage = dealDamageToPlayer(ENEMY_ATACK_DAMAGE);
    playerHealth -= playerDamage;

    if (enemyHealth <= 0 && playerHealth > 0) {
        alert("Hooora! You Won");
    } else if (playerHealth <= 0 && enemyHealth > 0) {
        alert(" you lost");
    } else if (enemyHealth <= 0 && playerHealth <= 0) {
        alert("draw!");
    }
}

function attack(attackMode) {
    let baseDamage;

    if (attackMode === 'NORMAL') {
        baseDamage = ATTACK_DAMAGE;
    } else if (attackMode === 'POWER') {
        baseDamage = POWER_ATTACK_DAMAGE;
    }

    const enemyDamage = dealDamageToEnemy(baseDamage);

    enemyHealth -= enemyDamage;

    endTurn();
}


function attackHandler() {
    attack('NORMAL');
}


function powerAttackHandler() {
    attack('POWER')
}

function healPlayer() {
    let healValue;

    if (playerHealth >= chosenMaxLife - HEAL_VALUE) {
        healValue = chosenMaxLife - playerHealth;
    } else {
        healValue = HEAL_VALUE;
    }


    increasePlayerHealth(healValue);

    playerHealth += healValue;

    endTurn();
}


attackButtonElm.addEventListener("click", attackHandler);
strongAttackButtonElm.addEventListener("click", powerAttackHandler);
healButtonElm.addEventListener("click", healPlayer);
