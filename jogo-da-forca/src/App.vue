<template>
  <div>
    <div id="header">
      <h1 id="title">Jogo da Forca</h1>
    </div>
    <div id="game-area">
      <div class="top-section">
        <img :src="require(`@/assets/forca-${hangmanStage}.png`)" alt="Estágio da Forca" />
      </div>
      <div class="middle-section">
        <div class="word-container">
          <WordToGuess :word="wordToGuess" :guessedWord="guessedWord" />
        </div>
      </div>
      <div class="bottom-section">
        <div class="button-container">
          <div class="button-row">
            <AlphabetButtons
              :disabledLetters="guessedLetters"
              @guess="makeGuess"
              :letters="['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P']"
              :disabled="gameOver"
            />
          </div>
          <div class="button-row">
            <AlphabetButtons
              :disabledLetters="guessedLetters"
              @guess="makeGuess"
              :letters="['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L']"
              :disabled="gameOver"
            />
          </div>
          <div class="button-row">
            <AlphabetButtons
              :disabledLetters="guessedLetters"
              @guess="makeGuess"
              :letters="['Z', 'X', 'C', 'V', 'B', 'N', 'M']"
              :disabled="gameOver"
            />
          </div>
        </div>
        <div v-if="gameOver" id="game-over">
          <p v-if="playerWon">Você venceu!</p>
          <p v-else>Você perdeu. A palavra era: {{ wordToGuess }}</p>
          <button @click="resetGame">Jogar novamente</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import WordToGuess from './components/WordToGuess.vue';
import AlphabetButtons from './components/AlphabetButtons.vue';
import axios from 'axios';

export default {
  data() {
    return {
      wordToGuess: null,
      guessedLetters: [],
      hangmanStage: 0,
      guessedWord: [],
      wordLoaded: false,
    };
  },
  components: {
    AlphabetButtons,
    WordToGuess
  },
  computed: {
    gameOver() {
      return this.wordLoaded && (this.playerWon || this.playerLost);
    },
    playerWon() {
      return this.wordLoaded && this.guessedWord.join('') === this.wordToGuess;
    },
    playerLost() {
      return this.wordLoaded && this.hangmanStage >= 6;
    },
  },
  methods: {
    makeGuess(letter) {
      if (!this.wordLoaded || this.playerWon || this.playerLost) return;

      if (!this.guessedLetters.includes(letter)) {
        this.guessedLetters.push(letter);

        const wordArray = this.wordToGuess.split('');
        let updatedGuessedWord = this.guessedWord.slice();
        let letterFound = false;

        wordArray.forEach((char, index) => {
          if (char === letter) {
            
            updatedGuessedWord[index] = letter;
            letterFound = true;
          }
        });

        if (letterFound) {
          this.guessedWord = updatedGuessedWord;
        } else {
          this.hangmanStage++;
        }
      }
    },
    resetGame() {
      this.wordLoaded = false;
      axios.get('http://localhost:3000/palavra-aleatoria')
        .then(response => {
          this.wordToGuess = response.data.toUpperCase();
          /*console.log(response.data)*/
          this.guessedLetters = [];
          this.hangmanStage = 0;
          this.guessedWord = Array(this.wordToGuess.length).fill('_');
          this.wordLoaded = true;
        })
        .catch(error => {
          console.error('Erro ao buscar a palavra:', error);
        });
    },
  },
  created() {
    this.resetGame();
  },
};
</script>

<style>
  body {
    font-family: 'Arial', sans-serif;
    background-color: #BFCDEA;
    margin: 0;
    padding: 0;
  }

  #header {
    background-color: #333;
    color: #fff;
    text-align: center;
    padding: 20px 0;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  #title {
    font-size: 36px;
    margin: 0;
    font-family: 'Arial', cursive;
  }

  #game-area {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 50px;
    padding: 20px;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  .word-container {
    text-align: center;
    font-size: 24px; /* Tamanho maior para a palavra a ser adivinhada */
    font-weight: bold;
  }

  .button-row button {
    background-color: #0074D9;
    color: #fff;
    padding: 12px 24px;
    font-size: 20px;
    margin: 10px;
    border: none;
    cursor: pointer;
    transition: background-color 0.2s; /* Adiciona uma transição suave */
    border-radius: 8px; /* Cantos arredondados */
  }

  .button-row button:hover {
    background-color: #0056b3;
  }

  #game-over {
    text-align: center;
    margin-top: 20px;
    font-size: 28px; /* Tamanho maior para a mensagem de fim de jogo */
  }

  #game-over button {
    background-color: #85a0d7; /* Uma cor de destaque para o botão de jogar novamente */
    padding: 12px 24px;
    font-size: 20px;
    border-radius: 8px;
  }

  #game-over button:hover {
    background-color: #5d7096;
  }
</style>
