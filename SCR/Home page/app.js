
class Pokeball {
  // The Pokeball will have the ability to move on a x and y axis.
  constructor(ball) {
    this.ball = ball
    //Below takes the with of the window aka viewport and divides by half make the starting location to be the center of the window. It also take half the width and hieght of the image so it will be centered in the center of the window.
    this.x = window.innerWidth / 2.085 //- ball.offsetWidth / 2
    this.y = window.innerHeight / 3.05 //- ball.offsetHeight / 2; 
  }
  // This method will allow css to translate the positition of the ball when moved refernce to the most left and top posititions
  updateLocation() {
    this.ball.style.left = this.x + 'px';
    this.ball.style.top = this.y + 'px';
  }
}
let currentPokemonCry = '';

function fetchRandomPokemon(sprite) {
  //random number to feed in to the URL retrieval and grab that pokemons shiny sprite
  const maxPokemon = 151;
  const randomId = Math.floor(Math.random() * maxPokemon) + 1;
  sprite = document.getElementById('pokemon-sprite')
  fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`)
    .then(response => response.json())
    .then(data => {
      const pokemonSprite = data.sprites.front_shiny;
      sprite.src = pokemonSprite;
      currentPokemonCry = data.cries.latest;  
    })
}

// When pokemon is click it will make a cry using the URL to play a with Audio and Play function built into Javascript.
document.getElementById('pokemon-sprite').addEventListener('click', function() {
  if (currentPokemonCry) {
    const cry = new Audio(currentPokemonCry);
    // Volume by percenatages of .1 being 10% 1(100) to 0(0).
    cry.volume = 0.3;
    cry.play();
  }
})
//this is the class function to move my pokeball and sprites to appear.
class MovePokeball extends Pokeball {
  constructor(ball, pokemonSprite) {
    super(ball);
    this.moveCount = 0;
    this.pokemonSprite = pokemonSprite
    this.randomMove = this.randomThreshold();
  }

  randomThreshold(){
    return Math.floor(Math.random() * 41) + 10;
  }

  //Pokeball move 10 px each time and of the moves happen. Then positition will be saved into Pokeballs updated Location with updateLocation method
  move(direction) {
    const moves = 50;
    if (direction === 'left') this.x -= moves;
    if (direction === 'right') this.x += moves;
    if (direction === 'up') this.y -= moves;
    if (direction === 'down') this.y += moves;
    this.updateLocation();
    // Below takes the moves that you make and use a random number 10 to 50. when both the movecount and getRandomThreshhold equal a pokemon appears and moveCount is set to zero.
    this.moveCount++;
    if(this.moveCount === this.randomMove) {
      this.showPokemon();
      this.moveCount = 0;
      this.randomMove = this.randomThreshold();
    }
  }

  //Pokemon will show up near the pokeball 40px away   
  showPokemon() {
    fetchRandomPokemon(this.pokemonSprite);//Grabs random pokemon
    this.pokemonSprite.style.left = (this.x + 40) + 'px'
    this.pokemonSprite.style.top = (this.y -40) + 'px'
    this.pokemonSprite.style.display = 'block'
  }
  
}



// const maxPokemon = 151
// const randomId = Math.floor(Math.random() * maxPokemon) + 1
// // Fetches the sprite from the json of the Api to show up on the scr of the <img id='pokemon-sprite' it will show hidden until the pokeball move a certain distance.

// fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`)
//   .then(response => response.json())
//   .then(data => {
//     const pokemonSprite = data.sprites.front_shiny;
//     console.log(pokemonSprite);
//     document.getElementById('pokemon-sprite').src = pokemonSprite
//   })

//takes the sprite image(API) and pokeball(url) and goes the the MovePokeball to call them to go through the function.
const pokemonSprite = document.getElementById('pokemon-sprite')
const pokeBallImage = document.getElementById('pokeball');
const pokeall = new MovePokeball(pokeBallImage, pokemonSprite);

// Creates a event action for the pokeall aka pokeball
document.addEventListener('keydown', (event) =>{
  if (event.key === 'ArrowLeft') pokeall.move('left');
  if (event.key === 'ArrowRight') pokeall.move('right');
  if (event.key === 'ArrowUp') pokeall.move('up');
  if (event.key === 'ArrowDown') pokeall.move('down');
})


