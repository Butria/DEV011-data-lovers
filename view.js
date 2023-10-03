export const renderItems = (data) => {
  // Selecciona el contenedor con el id "listaPokemon"
  const listaPokemon = document.getElementById('listaPokemon');
  listaPokemon.innerHTML = '';

  const tiposDePokemon = { 
    fire: {
      emoji: "🔥",
      color: '#FADBD8' 
    },
    water: {
      emoji: "💧",
      color: '#AED6F1' 
    },
    grass: {
      emoji: "🌿",
      color: '#D4EFDF' 
    },
    electric: {
      emoji: "⚡",
      color: '#FCF3CF' 
    },
    ground: {
      emoji: "🌍",
      color: '#BCAAA4' 
    },
    flying: {
      emoji: "🦅",
      color: '#D6EAF8' 
    },
    poison: {
      emoji: "☠️",
      color: '#E8DAEF' 
    },
    psychic: {
      emoji: "🔮",
      color: '#F8BBD0' 
    },
    fighting: {
      emoji: "🥊",
      color: '#FAD7A0' 
    },
    ice: {
      emoji: "❄️",
      color: '#B3E5FC' 
    },
    rock: {
      emoji: "🪨",
      color: '#AFA981' 
    },
    bug: {
      emoji: "🐞",
      color: '#A2D9CE' 
    },
    dragon: {
      emoji: "🐉",
      color: '#9FA8DA' 
    },
    ghost: {
      emoji: "👻",
      color: '#C39BD3' 
    },
    steel: {
      emoji: "🔩",
      color: '#60A1B8' 
    },
    normal: {
      emoji: "🔘",
      color: '#EBEDEF' 
    },
    dark: {
      emoji: "🌑",
      color: '#9E9E9E' 
    },
    fairy: {
      emoji: "🧚‍♀️",
      color: '#F48FB1' 
    },
  }

  function obtenerEmojiTipo(arr) {
    let emoji = ''
    arr.forEach(e => {
      emoji = emoji + ' ' + tiposDePokemon[e].emoji
    })
    return emoji
  }
  function obtenerColorTipo(arr) {
    const colors = [];
    arr.forEach(e => {
      colors.push(tiposDePokemon[e].color)
    })
    return colors
  }

  data.forEach(pokemon => {
    const backgroundColors = obtenerColorTipo(pokemon.type);

    const li = document.createElement('li');
    li.setAttribute('itemscope', '');
    li.setAttribute('itemtype', 'pokemon');
    li.setAttribute('class', 'li-card');
    if (backgroundColors.length === 1) {
      li.style.background = backgroundColors[0];
    } else {
      li.style.background = `linear-gradient(180deg, ${backgroundColors[0]} 40%, ${backgroundColors[1]} 75%)`;
    }

    const cartaPokemon = `
      <dl itemscope itemtype="pokemon" class="tarjeta">
        <dd itemprop="name">${pokemon.name}</dd>
        <dd itemprop="image">
          <img src="${pokemon.img}" alt="${pokemon.name}">
        </dd>    
        <dd itemprop="num">${pokemon.num}</dd>
        <dd itemprop="tipo">${obtenerEmojiTipo(pokemon.type)}</dd>
        <div class="caracteristicas">
          <div class="resistant">
              <dt>Resistant</dt>
              <ul>
                  ${pokemon.resistant.map(resistant => `<li>${resistant}</li>`).join('')}
              </ul>
          </div>
          <div class="weaknesses">
              <dt>Weaknesses</dt>
              <ul>
                  ${pokemon.weaknesses.map(weakness => `<li>${weakness}</li>`).join('')}
              </ul>
          </div>
        </div>
      </dl>
      <button class="btn-masInfo">Ver más...</button>
      `;
  
    li.innerHTML = cartaPokemon;
  
      
    listaPokemon.appendChild(li);
  });
  return listaPokemon;
}
  
