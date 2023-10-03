export const filterBy = (data, filterBy, value) => {
  let pokemonFilter = [];

  switch (filterBy) {
  case 'region':
    pokemonFilter = data.filter(
      (data) => data.generation.name === value
    );
    break;

  case 'type':
    pokemonFilter = data.filter((data) => {
      const findType = data.type.find((e) => e === value);
      return findType;
    });
    break;

    
  default:
    pokemonFilter = [];
    break;
  }

  return pokemonFilter;
};


export const ordenarPokemon = (data,property, order) => {

  const sortedPokemon = [...data];

  const compareFunction = (a, b) => {
    if (order === 'asc') {
      return a[property] > b[property] ? 1 : -1;
    } else {
      return a[property] < b[property] ? 1 : -1;
    }
  };

  sortedPokemon.sort(compareFunction);

  return sortedPokemon;
};

export const computeStats = (data) => {
  function findAtaquesEspeciales(pokemon) {
    return pokemon['special-attack'].map(attack => ({
      attack: attack.name,
      damage: parseFloat(attack['base-damage'])
    }));
  }
  
  const ataques= data.flatMap(pokemon => findAtaquesEspeciales(pokemon));

  const ataquesEspeciales = ataques.reduce((acc, attack) => {
    const existingAttack = acc.find(item => item.attack === attack.attack);
    
    if (!existingAttack) {
      acc.push(attack);
    } 
    return acc;
  }, []).sort((a, b) => b.damage - a.damage).slice(0, 15);
  return ataquesEspeciales
}

