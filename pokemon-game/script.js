/* ========================================
   POKÉ-PIXEL — Battle Game Logic
   ======================================== */

// ==================== POKÉMON DATA ====================

const POKEMON = {
  // Starters
  4: { name: 'Charmander', type: 'fire', baseHp: 18, baseAtk: 10, baseDef: 8, moveName: 'Ember' },
  7: { name: 'Squirtle', type: 'water', baseHp: 20, baseAtk: 8, baseDef: 10, moveName: 'Water Gun' },
  1: { name: 'Bulbasaur', type: 'grass', baseHp: 19, baseAtk: 9, baseDef: 9, moveName: 'Vine Whip' },

  // Wild pool (common)
  10: { name: 'Caterpie', type: 'bug', baseHp: 14, baseAtk: 4, baseDef: 4, moveName: 'Tackle' },
  13: { name: 'Weedle', type: 'bug', baseHp: 14, baseAtk: 5, baseDef: 4, moveName: 'Poison Sting' },
  16: { name: 'Pidgey', type: 'normal', baseHp: 15, baseAtk: 6, baseDef: 6, moveName: 'Gust' },
  19: { name: 'Rattata', type: 'normal', baseHp: 15, baseAtk: 7, baseDef: 5, moveName: 'Tackle' },
  23: { name: 'Ekans', type: 'poison', baseHp: 16, baseAtk: 7, baseDef: 6, moveName: 'Wrap' },
  27: { name: 'Sandshrew', type: 'ground', baseHp: 17, baseAtk: 8, baseDef: 8, moveName: 'Scratch' },
  41: { name: 'Zubat', type: 'poison', baseHp: 15, baseAtk: 6, baseDef: 5, moveName: 'Leech Life' },
  52: { name: 'Meowth', type: 'normal', baseHp: 15, baseAtk: 8, baseDef: 5, moveName: 'Scratch' },
  54: { name: 'Psyduck', type: 'water', baseHp: 17, baseAtk: 7, baseDef: 7, moveName: 'Confusion' },
  56: { name: 'Mankey', type: 'fighting', baseHp: 18, baseAtk: 9, baseDef: 5, moveName: 'Karate Chop' },
  58: { name: 'Growlithe', type: 'fire', baseHp: 18, baseAtk: 9, baseDef: 7, moveName: 'Ember' },
  60: { name: 'Poliwag', type: 'water', baseHp: 16, baseAtk: 6, baseDef: 6, moveName: 'Bubble' },
  63: { name: 'Abra', type: 'psychic', baseHp: 14, baseAtk: 10, baseDef: 4, moveName: 'Teleport' },
  66: { name: 'Machop', type: 'fighting', baseHp: 19, baseAtk: 9, baseDef: 7, moveName: 'Low Kick' },
  69: { name: 'Bellsprout', type: 'grass', baseHp: 17, baseAtk: 8, baseDef: 6, moveName: 'Vine Whip' },
  74: { name: 'Geodude', type: 'rock', baseHp: 18, baseAtk: 8, baseDef: 9, moveName: 'Rock Throw' },
  77: { name: 'Ponyta', type: 'fire', baseHp: 17, baseAtk: 9, baseDef: 7, moveName: 'Ember' },
  79: { name: 'Slowpoke', type: 'water', baseHp: 21, baseAtk: 6, baseDef: 6, moveName: 'Water Gun' },
  81: { name: 'Magnemite', type: 'electric', baseHp: 15, baseAtk: 8, baseDef: 8, moveName: 'Thunder Shock' },

  // Rare encounters
  25: { name: 'Pikachu', type: 'electric', baseHp: 16, baseAtk: 10, baseDef: 6, moveName: 'Thunder Shock' },
  133: { name: 'Eevee', type: 'normal', baseHp: 18, baseAtk: 8, baseDef: 7, moveName: 'Quick Attack' },
  147: { name: 'Dratini', type: 'dragon', baseHp: 18, baseAtk: 10, baseDef: 7, moveName: 'Dragon Rage' },
};

const WILD_POOL = [10, 13, 16, 19, 23, 27, 41, 52, 54, 56, 58, 60, 63, 66, 69, 74, 77, 79, 81];
const RARE_POOL = [25, 133, 147];

// Type effectiveness (simple rock-paper-scissors style)
const TYPE_EFFECTS = {
  fire:   { grass: 1.5, bug: 1.5, water: 0.5, rock: 0.5, dragon: 0.5, normal: 1, poison: 1, ground: 1, fighting: 1, psychic: 1, electric: 1 },
  water:  { fire: 1.5, ground: 1.5, rock: 1.5, grass: 0.5, electric: 0.5, dragon: 0.5, normal: 1, bug: 1, poison: 1, fighting: 1, psychic: 1 },
  grass:  { water: 1.5, ground: 1.5, rock: 1.5, fire: 0.5, bug: 0.5, poison: 0.5, dragon: 0.5, normal: 1, fighting: 1, psychic: 1, electric: 1 },
  normal: { normal: 1, fire: 1, water: 1, grass: 1, bug: 1, poison: 1, ground: 1, rock: 0.5, fighting: 1, psychic: 1, electric: 1, dragon: 1 },
  electric: { water: 1.5, normal: 1, fire: 1, grass: 0.5, electric: 0.5, ground: 0, bug: 1, poison: 1, fighting: 1, psychic: 1, rock: 0.5, dragon: 0.5 },
  fighting: { normal: 1.5, rock: 1.5, bug: 0.5, poison: 0.5, psychic: 0.5, fire: 1, water: 1, grass: 1, ground: 1, electric: 1, dragon: 1 },
  poison:  { grass: 1.5, bug: 1.5, poison: 0.5, ground: 0.5, rock: 0.5, ghost: 0.5, normal: 1, fire: 1, water: 1, fighting: 1, psychic: 1, electric: 1, dragon: 1 },
  ground:  { fire: 1.5, electric: 1.5, poison: 1.5, rock: 1.5, grass: 0.5, bug: 0.5, normal: 1, water: 1, fighting: 1, psychic: 1, dragon: 1 },
  psychic: { fighting: 1.5, poison: 1.5, psychic: 0.5, normal: 1, fire: 1, water: 1, grass: 1, bug: 1, ground: 1, rock: 1, electric: 1, dragon: 1 },
  rock:    { fire: 1.5, bug: 1.5, normal: 1, water: 0.5, grass: 0.5, fighting: 0.5, ground: 0.5, poison: 1, electric: 1, psychic: 1, dragon: 1 },
  bug:     { grass: 1.5, psychic: 1.5, poison: 0.5, fighting: 0.5, normal: 1, fire: 0.5, water: 1, ground: 1, rock: 1, electric: 1, dragon: 1 },
  dragon:  { dragon: 1.5, normal: 1, fire: 1, water: 1, grass: 1, electric: 1, bug: 1, poison: 1, ground: 1, rock: 1, fighting: 1, psychic: 1 },
};

const TYPE_COLORS = {
  normal: '#95a5a6', fire: '#e74c3c', water: '#3498db', grass: '#2ecc71',
  electric: '#f1c40f', ice: '#85c1e9', fighting: '#e67e22', poison: '#9b59b6',
  ground: '#b8860b', psychic: '#ff69b4', bug: '#27ae60', rock: '#8b5e3c',
  ghost: '#7d3c98', dragon: '#6c3483', dark: '#5d6d7e', steel: '#aeb6bf',
  fairy: '#f5b7b1',
};

const EFFECT_NAMES = {
  fire: 'effect-fire', water: 'effect-water', grass: 'effect-grass',
  normal: 'effect-slash', bug: 'effect-slash', poison: 'effect-slash',
  ground: 'effect-slash', electric: 'effect-fire', fighting: 'effect-slash',
  psychic: 'effect-slash', rock: 'effect-slash', dragon: 'effect-fire',
};

// ==================== SPRITE URL ====================
function spriteUrl(id) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vii/icons/${id}.png`;
}

// ==================== STATE ====================

let state = {
  playerPoke: null,   // { id, name, type, maxHp, hp, atk, def, moveName, level, xp, xpToNext }
  wildPoke: null,     // same structure
  caught: 0,
  streak: 0,
  bestStreak: 0,
  isLocked: false,
  hasFled: false,
};

const XP_PER_LEVEL = 20;
const CATCH_BASE_CHANCE = 0.35;

// ==================== DOM REFS ====================

const $ = id => document.getElementById(id);
const titleScreen = $('titleScreen');
const starterScreen = $('starterScreen');
const battleScreen = $('battleScreen');
const gameOverScreen = $('gameOverScreen');
const startersContainer = $('startersContainer');
const wildSprite = $('wildSprite');
const playerSprite = $('playerSprite');
const wildName = $('wildName');
const playerName = $('playerName');
const wildLevel = $('wildLevel');
const playerLevel = $('playerLevel');
const wildHpBar = $('wildHpBar');
const playerHpBar = $('playerHpBar');
const wildHpText = $('wildHpText');
const playerHpText = $('playerHpText');
const playerXpBar = $('playerXpBar');
const battleLog = $('battleLog');
const battleLogSub = $('battleLogSub');
const actionBar = $('actionBar');
const moveBar = $('moveBar');
const caughtCount = $('caughtCount');
const streakCount = $('streakCount');
const attackEffect = $('attackEffect');
const catchModal = $('catchModal');
const catchText = $('catchText');
const overCaught = $('overCaught');
const overStreak = $('overStreak');
const titleArt = $('titleArt');

// ==================== UTILITY ====================

function rand(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

function clamp(val, min, max) { return Math.min(Math.max(val, min), max); }

function delay(ms) { return new Promise(r => setTimeout(r, ms)); }

// ==================== POKÉMON FACTORY ====================

function makePokemon(id, level) {
  const data = POKEMON[id];
  if (!data) return null;
  const hpMulti = 1 + (level - 1) * 0.15;
  const atkMulti = 1 + (level - 1) * 0.12;
  const defMulti = 1 + (level - 1) * 0.12;
  return {
    id,
    name: data.name,
    type: data.type,
    maxHp: Math.floor(data.baseHp * hpMulti),
    hp: Math.floor(data.baseHp * hpMulti),
    atk: Math.floor(data.baseAtk * atkMulti),
    def: Math.floor(data.baseDef * defMulti),
    moveName: data.moveName,
    level,
    xp: 0,
    xpToNext: XP_PER_LEVEL + level * 5,
  };
}

function generateWild() {
  const isRare = Math.random() < 0.12;
  const pool = isRare ? RARE_POOL : WILD_POOL;
  const id = pool[rand(0, pool.length - 1)];
  const level = rand(2, 8);
  const poke = makePokemon(id, level);
  // Boost rare Pokémon a bit
  if (isRare) {
    poke.level += rand(1, 3);
    poke.maxHp = Math.floor(poke.maxHp * 1.2);
    poke.hp = poke.maxHp;
  }
  return poke;
}

// ==================== TYPE EFFECTIVENESS ====================

function getEffectiveness(atkType, defType) {
  const chart = TYPE_EFFECTS[atkType];
  if (!chart) return 1;
  return chart[defType] || 1;
}

function getEffectivenessText(ef) {
  if (ef >= 1.8) return '💥 Super effective!';
  if (ef >= 1.3) return '✨ Super effective!';
  if (ef <= 0.3) return '💨 No effect...';
  if (ef <= 0.7) return '🔽 Not very effective...';
  return '';
}

function getColorForHp(hp, maxHp) {
  const pct = hp / maxHp;
  if (pct > 0.5) return 'hp-green';
  if (pct > 0.25) return 'hp-yellow';
  return 'hp-red';
}

// ==================== ATTACK EFFECTS ====================

function showEffect(type) {
  attackEffect.className = 'attack-effect';
  void attackEffect.offsetWidth;
  const className = EFFECT_NAMES[type] || 'effect-slash';
  attackEffect.className = `attack-effect ${className}`;
  attackEffect.style.display = 'block';
  setTimeout(() => {
    attackEffect.style.display = 'none';
  }, 500);
}

// ==================== UI UPDATES ====================

function setSprite(imgEl, id) {
  imgEl.src = spriteUrl(id);
  imgEl.onerror = function() {
    this.src = ''; // hide broken image
    // Show emoji fallback
    const emojiMap = {
      4: '🦎', 7: '🐢', 1: '🌱', 10: '🐛', 13: '🐛', 16: '🐦', 19: '🐭',
      23: '🐍', 25: '⚡', 27: '🦔', 41: '🦇', 52: '🐱', 54: '🦆',
      56: '🐒', 58: '🐕', 60: '🐸', 63: '🧠', 66: '💪', 69: '🌿',
      74: '🪨', 77: '🐎', 79: '🐌', 81: '🧲', 133: '🦊', 147: '🐉',
    };
    const fallback = document.createElement('span');
    fallback.textContent = emojiMap[id] || '❓';
    fallback.style.fontSize = '40px';
    this.parentNode.replaceChild(fallback, this);
  };
}

function updateHpBar(barEl, textEl, hp, maxHp) {
  const pct = (hp / maxHp) * 100;
  barEl.style.width = `${Math.max(0, pct)}%`;
  barEl.className = `pk-hp-bar-inner ${getColorForHp(hp, maxHp)}`;
  textEl.textContent = `${Math.max(0, hp)}/${maxHp}`;
}

function updateXpBar() {
  const pct = (state.playerPoke.xp / state.playerPoke.xpToNext) * 100;
  playerXpBar.style.width = `${Math.min(100, pct)}%`;
}

function updateBattleUI() {
  const p = state.playerPoke;
  const w = state.wildPoke;

  setSprite(playerSprite, p.id);
  setSprite(wildSprite, w.id);
  playerName.textContent = p.name;
  wildName.textContent = w.name;
  playerLevel.textContent = `Lv.${p.level}`;
  wildLevel.textContent = `Lv.${w.level}`;

  updateHpBar(playerHpBar, playerHpText, p.hp, p.maxHp);
  updateHpBar(wildHpBar, wildHpText, w.hp, w.maxHp);
  updateXpBar();

  caughtCount.textContent = state.caught;
  streakCount.textContent = state.streak;
}

function setLog(text, sub = '') {
  battleLog.textContent = text;
  battleLogSub.textContent = sub || 'What will you do?';
}

function showActionBar() { actionBar.style.display = 'flex'; moveBar.style.display = 'none'; }
function showMoveBar() { actionBar.style.display = 'none'; moveBar.style.display = 'flex'; }

function spriteDamage(el) {
  el.classList.remove('sprite-damage', 'sprite-heal', 'sprite-faint', 'sprite-appear', 'sprite-dodge');
  void el.offsetWidth;
  el.classList.add('sprite-damage');
}

function spriteHeal(el) {
  el.classList.remove('sprite-damage', 'sprite-heal', 'sprite-faint', 'sprite-appear', 'sprite-dodge');
  void el.offsetWidth;
  el.classList.add('sprite-heal');
}

function spriteFaint(el) {
  el.classList.remove('sprite-damage', 'sprite-heal', 'sprite-faint', 'sprite-appear', 'sprite-dodge');
  void el.offsetWidth;
  el.classList.add('sprite-faint');
}

function spriteAppear(el) {
  el.classList.remove('sprite-damage', 'sprite-heal', 'sprite-faint', 'sprite-appear', 'sprite-dodge');
  void el.offsetWidth;
  el.classList.add('sprite-appear');
}

function spriteDodge(el) {
  el.classList.remove('sprite-damage', 'sprite-heal', 'sprite-faint', 'sprite-appear', 'sprite-dodge');
  void el.offsetWidth;
  el.classList.add('sprite-dodge');
}

// ==================== LEVEL UP ====================

function checkLevelUp() {
  const p = state.playerPoke;
  while (p.xp >= p.xpToNext) {
    p.xp -= p.xpToNext;
    p.level++;
    p.xpToNext = XP_PER_LEVEL + p.level * 5;

    // Stat gains
    const hpGain = rand(2, 5);
    const atkGain = rand(1, 3);
    const defGain = rand(1, 3);
    p.maxHp += hpGain;
    p.hp += hpGain;
    p.atk += atkGain;
    p.def += defGain;

    setLog(`⬆️ ${p.name} grew to Lv.${p.level}!`, 'Stats increased!');
    spriteHeal(playerSprite.parentElement);
    updateBattleUI();
    return true;
  }
  return false;
}

// ==================== BATTLE ACTIONS ====================

function damageCalc(attacker, defender, movePower) {
  const atk = attacker.atk;
  const def = defender.def || 5;
  const base = Math.floor(((2 * attacker.level / 5 + 2) * movePower * atk / def) / 5 + 2);
  const variance = rand(85, 100) / 100;
  return Math.max(1, Math.floor(base * variance));
}

function playerAttack(moveIndex) {
  if (state.isLocked) return;
  state.isLocked = true;

  const p = state.playerPoke;
  const w = state.wildPoke;

  if (moveIndex === 0) {
    // TACKLE
    const dmg = damageCalc(p, w, 10);
    const ef = getEffectiveness('normal', w.type);
    const totalDmg = Math.floor(dmg * ef);
    w.hp = clamp(w.hp - totalDmg, 0, w.maxHp);

    let log = `${p.name} used TACKLE! -${totalDmg}HP`;
    const efText = getEffectivenessText(ef);
    if (efText) log += ` ${efText}`;
    setLog(log, '');
    showEffect('normal');
    spriteDamage(wildSprite.parentElement);
    updateBattleUI();

    setTimeout(async () => {
      if (w.hp <= 0) {
        await handleWildFaint();
      } else {
        await wildTurn();
      }
      state.isLocked = false;
    }, 800);

  } else if (moveIndex === 1) {
    // TYPE MOVE
    const power = 15;
    const dmg = damageCalc(p, w, power);
    const ef = getEffectiveness(p.type, w.type);
    const totalDmg = Math.floor(dmg * ef);
    w.hp = clamp(w.hp - totalDmg, 0, w.maxHp);

    let log = `${p.name} used ${p.moveName}! -${totalDmg}HP`;
    const efText = getEffectivenessText(ef);
    if (efText) log += ` ${efText}`;
    setLog(log, '');
    showEffect(p.type);
    spriteDamage(wildSprite.parentElement);
    updateBattleUI();

    setTimeout(async () => {
      if (w.hp <= 0) {
        await handleWildFaint();
      } else {
        await wildTurn();
      }
      state.isLocked = false;
    }, 800);

  } else if (moveIndex === 2) {
    // HEAL
    const healAmt = Math.floor(p.maxHp * 0.35);
    const actualHeal = Math.min(healAmt, p.maxHp - p.hp);
    p.hp += actualHeal;

    setLog(`💚 ${p.name} used POTION! +${actualHeal}HP`, 'Feeling refreshed!');
    showEffect('heal');
    spriteHeal(playerSprite.parentElement);
    updateBattleUI();

    setTimeout(async () => {
      await wildTurn();
      state.isLocked = false;
    }, 700);

  } else if (moveIndex === 3) {
    // CATCH
    attemptCatch();
  }
}

async function wildTurn() {
  const p = state.playerPoke;
  const w = state.wildPoke;

  if (w.hp <= 0) return;
  if (state.hasFled) return;

  // Wild AI: choose a move
  const wildMoveNames = ['Tackle', 'Scratch', 'Bite', w.moveName];
  const chosenMove = wildMoveNames[rand(0, wildMoveNames.length - 1)];
  const power = chosenMove === w.moveName ? 12 : 8;
  const dmg = damageCalc(w, p, power);
  const ef = getEffectiveness(w.type, p.type);
  const totalDmg = Math.floor(dmg * ef);
  p.hp = clamp(p.hp - totalDmg, 0, p.maxHp);

  let log = `Wild ${w.name} used ${chosenMove}! -${totalDmg}HP`;
  const efText = getEffectivenessText(ef);
  if (efText) log += ` ${efText}`;
  setLog(log, '');
  showEffect(w.type);
  spriteDamage(playerSprite.parentElement);
  updateBattleUI();

  if (p.hp <= 0) {
    await delay(500);
    handlePlayerFaint();
  }
}

async function handleWildFaint() {
  const w = state.wildPoke;
  spriteFaint(wildSprite.parentElement);
  setLog(`💥 Wild ${w.name} fainted!`, 'You gained XP!');

  const xpGain = rand(5, 12) + w.level * 2;
  state.playerPoke.xp += xpGain;
  state.streak++;
  if (state.streak > state.bestStreak) state.bestStreak = state.streak;

  await delay(600);
  updateXpBar();
  const leveledUp = checkLevelUp();

  await delay(800);

  if (!leveledUp) {
    setLog(`✨ Gained ${xpGain} XP!`, 'A new challenger approaches...');
  }

  await delay(1500);

  // Update wild to stay alive check
  showActionBar();
  spawnNewWild();
}

function handlePlayerFaint() {
  state.isLocked = true;
  spriteFaint(playerSprite.parentElement);
  setTimeout(() => {
    overCaught.textContent = state.caught;
    overStreak.textContent = state.bestStreak;
    battleScreen.style.display = 'none';
    gameOverScreen.style.display = 'flex';
  }, 1200);
}

// ==================== CATCH MECHANIC ====================

function attemptCatch() {
  if (state.isLocked) return;
  state.isLocked = true;
  const w = state.wildPoke;

  setLog('🔴 You threw a POKÉBALL!', '...');
  showEffect('catch');
  moveBar.style.display = 'none';

  setTimeout(() => {
    const hpFactor = 1 - (w.hp / w.maxHp);
    const catchChance = CATCH_BASE_CHANCE + hpFactor * 0.5 + (state.streak >= 5 ? 0.1 : 0);
    const roll = Math.random();

    if (roll < catchChance) {
      // CAUGHT!
      state.caught++;
      state.streak++;
      if (state.streak > state.bestStreak) state.bestStreak = state.streak;

      catchText.textContent = `✨ ${w.name} was caught! (Lv.${w.level})`;
      catchModal.style.display = 'flex';
      setLog(`🎉 Gotcha! ${w.name} was caught!`, '');

      const xpGain = rand(3, 8);
      state.playerPoke.xp += xpGain;
      updateXpBar();
      checkLevelUp();
      updateBattleUI();
    } else {
      // ESCAPED
      setLog(`💨 ${w.name} broke free!`, 'Try weakening it more!');
      spriteDodge(wildSprite.parentElement);
      state.isLocked = false;
      showActionBar();

      // Wild attacks back (angry)
      setTimeout(() => {
        if (!state.isLocked) {
          wildTurn();
        }
      }, 500);
    }
  }, 1200);
}

function closeCatchModal() {
  catchModal.style.display = 'none';
  state.isLocked = false;
  showActionBar();
  spawnNewWild();
}

// ==================== RUN ====================

function handleRun() {
  if (state.isLocked) return;
  state.isLocked = true;

  const runChance = 0.5 + (state.streak >= 3 ? 0.2 : 0);
  const roll = Math.random();

  if (roll < runChance) {
    setLog('🏃 You fled successfully!', 'But another appears...');
    state.streak = 0;
    setTimeout(() => {
      spawnNewWild();
      state.isLocked = false;
    }, 1000);
  } else {
    setLog('🚫 Can\'t escape!', 'The wild Pokémon blocks your path!');
    state.isLocked = false;
    setTimeout(() => {
      wildTurn();
    }, 500);
  }
}

// ==================== SPAWN WILD ====================

function spawnNewWild() {
  state.wildPoke = generateWild();
  state.hasFled = false;

  const isRare = RARE_POOL.includes(state.wildPoke.id);
  const rarity = isRare ? '✨ A rare Pokémon appeared! ✨' : 'A wild Pokémon appeared!';

  setLog(`🥚 ${rarity}`, '');
  showActionBar();

  // Animate the wild sprite appearing
  spriteAppear(wildSprite.parentElement);

  // Update UI after a brief moment
  setTimeout(() => {
    updateBattleUI();
    setLog(`⚡ Wild ${state.wildPoke.name} (Lv.${state.wildPoke.level}) appeared!`, 'What will you do?');
  }, 400);

  updateBattleUI();
}

// ==================== STARTER SELECT ====================

function renderStarters() {
  startersContainer.innerHTML = '';
  const ids = [4, 7, 1];
  ids.forEach(id => {
    const data = POKEMON[id];
    const card = document.createElement('div');
    card.className = 'starter-card';
    card.innerHTML = `
      <img class="starter-sprite" src="${spriteUrl(id)}" alt="${data.name}" onerror="this.outerHTML='<span style=\\'font-size:48px\\'>${['🦎','🐢','🌱'][ids.indexOf(id)]}</span>'">
      <span class="starter-name">${data.name}</span>
      <span class="starter-type type-${data.type}">${data.type.toUpperCase()}</span>
    `;
    card.addEventListener('click', () => selectStarter(id));
    startersContainer.appendChild(card);
  });
}

function selectStarter(id) {
  state.playerPoke = makePokemon(id, 5);
  // Give starter a little boost
  state.playerPoke.maxHp += 5;
  state.playerPoke.hp = state.playerPoke.maxHp;

  starterScreen.style.display = 'none';
  battleScreen.style.display = 'flex';

  spawnNewWild();
  updateBattleUI();
  setLog(`🌟 ${state.playerPoke.name} is ready for battle!`, 'Your journey begins...');
}

// ==================== RESET ====================

function resetGame() {
  state.caught = 0;
  state.streak = 0;
  state.bestStreak = 0;
  state.isLocked = false;
  state.hasFled = false;
  state.playerPoke = null;
  state.wildPoke = null;

  gameOverScreen.style.display = 'none';
  battleScreen.style.display = 'none';
  catchModal.style.display = 'none';
  titleScreen.style.display = 'flex';
}

// ==================== EVENT BINDINGS ====================

// Title screen
$('titleBtn').addEventListener('click', startGame);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    if (titleScreen.style.display !== 'none' && titleScreen.style.display !== '') {
      startGame();
    }
  }
});

function startGame() {
  titleScreen.style.display = 'none';
  starterScreen.style.display = 'flex';
  renderStarters();
}

// Action buttons
document.querySelectorAll('.action-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const action = btn.dataset.action;
    if (action === 'fight') {
      showMoveBar();
      setLog('Choose a move:', '');
    } else if (action === 'items') {
      // Quick heal or catch from items
      if (state.playerPoke.hp < state.playerPoke.maxHp * 0.5) {
        // Auto-heal
        playerAttack(2);
      } else {
        // Auto-catch attempt
        playerAttack(3);
      }
    } else if (action === 'run') {
      handleRun();
    }
  });
});

// Move buttons
document.querySelectorAll('.move-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const moveIdx = parseInt(btn.dataset.move);
    playerAttack(moveIdx);
  });
});

// ==================== INIT ====================

// Generate title screen pixel art
function initTitleArt() {
  const chars = ['🟥', '🟧', '🟨', '🟩', '🟦', '🟪', '⬛', '⬜'];
  let art = '';
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 8; j++) {
      art += chars[rand(0, chars.length - 1)];
    }
    if (i < 2) art += '<br>';
  }
  titleArt.innerHTML = art;
}

initTitleArt();
