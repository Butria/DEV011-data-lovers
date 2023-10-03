// Importa los datos de Pokémon desde el archivo "pokemon.js"
import data from "./data/pokemon/pokemon.js";
import { renderItems } from "./view.js";
import { filterBy,ordenarPokemon, computeStats } from './dataFunctions.js';

const root = document.querySelector('#root')
const dataPokemon = data.pokemon;
let isDataFiltered = false; //rastrea si la data esta filtrada
let pokemonFilter = [];

root.appendChild(renderItems(dataPokemon));

const filtrarButton = document.querySelector('#filtrar-button');
const filtrarOptions = document.querySelector('#filtrar-options');
const selectType = document.querySelector('#tipo');
const selectRegion = document.querySelector('#region');
const clearButton = document.querySelector('#clear-button');

filtrarButton.addEventListener('click', () => {
  filtrarOptions.classList.toggle('mostrar');
});

selectRegion.addEventListener('change', () => {
  const selectedRegionOption = selectRegion.value;
  pokemonFilter = filterBy(dataPokemon, 'region', selectedRegionOption);
  isDataFiltered = true; // Marcar que la data está filtrada
  renderItems(pokemonFilter);
  filtrarOptions.classList.remove('mostrar');
});

selectType.addEventListener('change', () => {
  const selectedTypeOption = selectType.value;
  pokemonFilter = filterBy(dataPokemon, 'type', selectedTypeOption);
  isDataFiltered = true; 
  renderItems(pokemonFilter );
  filtrarOptions.classList.remove('mostrar');
});



const ordenarButton = document.getElementById('ordenar-button');
const ordenarOptions = document.getElementById('ordenar-options');

ordenarButton.addEventListener('click', () => {
  ordenarOptions.classList.toggle('mostrar');

  //Verificar si la data esta filtrada y proceder a ordenarla
  if (isDataFiltered) {
    ordenarOptions.addEventListener('click', (event) => {
      if (event.target.tagName === 'BUTTON') {
        const selectedOption = event.target.getAttribute('data-orden');
        const [property, order] = selectedOption.split('-');

        const sortedPokemon = ordenarPokemon(pokemonFilter, property, order);
        renderItems(sortedPokemon);
        ordenarOptions.classList.remove('mostrar');
      }   
    });
  } else {
    ordenarOptions.addEventListener('click', (event) => {
      if (event.target.tagName === 'BUTTON') {
        const selectedOption = event.target.getAttribute('data-orden');
        const [property, order] = selectedOption.split ('-');

        const sortedPokemon = ordenarPokemon(dataPokemon, property, order);
        renderItems(sortedPokemon);
        ordenarOptions.classList.remove('mostrar');
      }
    });
  } 
});

const statsButton = document.getElementById('stats-button');
statsButton.addEventListener('click', () => {

  const main = document.querySelector('main')
  const statsContainer = `
    <h2>Ataques especiales más poderosos</h2>
    <table>
      <thead class= "estilos-tabla">
        <tr>
          <th>Ataque especial</th>
          <th>Daño</th>
        </tr>
      </thead>
      <tbody class= "estilos-tabla">
        ${computeStats(dataPokemon).map((attack) => `
          <tr>
              <td>${attack.attack}</td>
              <td>${attack.damage}</td>
          </tr>
      `).join('')}
      </tbody>
    </table>
  `
  main.innerHTML = statsContainer
  
})


clearButton.addEventListener('click', () => {
  
  isDataFiltered = false;
  pokemonFilter = [];
  const main = document.querySelector('main')
  const mainOriginal = `
  <h2>Lista de Pokémon</h2>
  <div id="root"><ul id="listaPokemon"></ul></div>  
    
  <div id="tablaContainer" style="display: none;">
    
</div>  
`
  main.innerHTML = mainOriginal
  return renderItems(dataPokemon); // Vuelve a mostrar todos los Pokémon
});

