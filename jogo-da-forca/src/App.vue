<template>
  <div>
    <div id="header">
      <h1 id="title">Jogo da Forca</h1>
    </div>
    <div id="game-area">
      <div class="left-column">
        <img :src="require(`@/assets/forca-${hangmanStage}.png`)" alt="Estágio da Forca" />
      </div>
      <div class="right-column">
        <div id="word-container">
          <WordToGuess :word="wordToGuess" :guessedWord="guessedWord" />
        </div>
        <div id="button-container">
          <div class="button-row">
            <AlphabetButtons :disabledLetters="guessedLetters" @guess="makeGuess" :letters="['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']" />
          </div>
          <div class="button-row">
            <AlphabetButtons :disabledLetters="guessedLetters" @guess="makeGuess" :letters="['I', 'J', 'K', 'L', 'M', 'N', 'O', 'P']" />
          </div>
          <div class="button-row">
            <AlphabetButtons :disabledLetters="guessedLetters" @guess="makeGuess" :letters="['Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']" />
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
body {
  font-family: Arial, sans-serif;
  background-color: #f7f7f7;
  margin: 0;
  padding: 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

/* Estilos do cabeçalho */
#header {
  background-color: #333;
  color: #fff;
  text-align: center;
  padding: 20px 0;
}

#title {
  font-size: 36px;
  margin: 0;
}

/* Estilos do conteúdo do jogo */
#game-area {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.left-column {
  flex: 1;
  max-width: 50%;
  text-align: center;
}

.right-column {
  flex: 1;
  max-width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Estilos da imagem da forca */
img {
  max-width: 100%;
  height: auto;
}

/* Estilos do contêiner da palavra a ser adivinhada */
#word-container {
  text-align: center;
}

/* Estilos dos botões do alfabeto */
.button-row {
  display: flex;
  justify-content: center;
  align-items: center;
}

button {
  background-color: #0074D9;
  color: #fff;
  padding: 10px 20px;
  font-size: 16px;
  margin: 5px;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

/* Estilos da seção de game over */
#game-over {
  text-align: center;
  margin-top: 20px;
}

#game-over p {
  font-size: 18px;
  margin: 10px 0;
}

/* Estilos gerais para dispositivos menores (responsivo) */
@media (max-width: 768px) {
  #game-area {
    flex-direction: column;
  }

  .left-column, .right-column {
    max-width: 100%;
  }
}
</style>
