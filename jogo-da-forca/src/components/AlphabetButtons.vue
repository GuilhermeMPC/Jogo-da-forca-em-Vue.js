<template>
  <div>
    <p>Escolha uma letra:</p>
    <div class="alphabet-buttons">
      <button
        v-for="letter in alphabet"
        :key="letter"
        @click="guessLetter(letter)"
        :disabled="disabledLetters.includes(letter)"
      >
        {{ letter }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    disabledLetters: Array, // Letras já adivinhadas
  },
  data() {
    return {
      alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    };
  },
  methods: {
    guessLetter(letter) {
      this.$emit('guess', letter);
    },
  },
};
</script>

<style scoped>
/* Estilos para o componente AlphabetButtons */
.alphabet-buttons {
  display: flex;
  justify-content: center;
}
.alphabet-buttons button {
  margin: 0 5px;
  font-size: 16px;
}
</style>
