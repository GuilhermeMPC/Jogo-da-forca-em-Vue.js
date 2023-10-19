<template>
  <div>
    <h1>Jogo da Forca</h1>
    <img :src="`assets/forca-${hangmanStage}.png`" alt="Estágio da Forca" />
    <WordToGuess :word="wordToGuess" :guessedWord="guessedWord" />
    <AlphabetButtons :disabledLetters="guessedLetters" @guess="makeGuess" />
    <div v-if="gameOver">
      <p v-if="playerWon">Você venceu!</p>
      <p v-else>Você perdeu. A palavra era: {{ wordToGuess }}</p>
      <button @click="resetGame">Jogar novamente</button>
    </div>
  </div>
</template>

<script>
import WordToGuess from './components/WordToGuess.vue';
import AlphabetButtons from './components/AlphabetButtons.vue';

export default {
  data() {
    return {
      wordToGuess: '', // Inicialize com uma string vazia
      guessedLetters: [],
      hangmanStage: 0,
      guessedWord: [], // Deixe vazio
    };
  },
  computed: {
    gameOver() {
      return this.playerWon || this.playerLost;
    },
    playerWon() {
      return this.guessedWord.join('') === this.wordToGuess;
    },
    playerLost() {
      return this.hangmanStage >= 6;
    },
  },
  methods: {
    makeGuess(letter) {
      if (!this.guessedLetters.includes(letter)) {
        this.guessedLetters.push(letter);
        if (this.wordToGuess.includes(letter)) {
          this.wordToGuess.split('').forEach((char, index) => {
            if (char === letter) {
              this.guessedWord[index] = letter; // Atualize diretamente o array
            }
          });
        } else {
          this.hangmanStage++;
        }
      }
    },
    resetGame() {
      this.wordToGuess = 'VUEJS'; // Defina a palavra para um novo jogo
      this.guessedLetters = [];
      this.hangmanStage = 0;
      this.guessedWord = Array(this.wordToGuess.length).fill('_'); // Reinicialize guessedWord
    },
  },
  created() {
    // Inicialize a palavra do jogo quando o componente é criado
    this.wordToGuess = 'TESTE'; // Defina a palavra do jogo aqui
    this.guessedWord = Array(this.wordToGuess.length).fill('_');
  },
  components: {
    WordToGuess,
    AlphabetButtons,
  },
};
</script>

<style>
/* Estilos para o componente App */
</style>
