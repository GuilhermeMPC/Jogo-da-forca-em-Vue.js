<template>
  <div>
    <p>Palavra a ser adivinhada:</p>
    <div class="word-to-guess">
      <span v-for="(char, index) in word" :key="index">
        {{ char === ' ' ? ' ' : guessedWord[index] }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    word: String, // Palavra a ser adivinhada
    guessedWord: Array, // Estado de adivinhação do jogador
  },
};
</script>

<style scoped>
/* Estilos para o componente WordToGuess */
.word-to-guess {
  display: flex;
  justify-content: center;
  font-size: 24px;
}
.word-to-guess span {
  margin: 0 5px;
}
</style>