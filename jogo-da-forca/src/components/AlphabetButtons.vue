<template>
  <div class="alphabet-buttons">
    <button
      v-for="letter in letters"
      :key="letter"
      @click="guessLetter(letter)"
      :class="{ 'disabled-button': disabledLetters.includes(letter) }"
      :disabled="disabled"
    >
      {{ letter }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    letters: Array, // Letras a serem renderizadas
    disabledLetters: Array, // Letras já adivinhadas
    disabled: Boolean, // Nova prop para desabilitar todos os botões
  },
  methods: {
    guessLetter(letter) {
      if (!this.disabledLetters.includes(letter) && !this.disabled) {
        this.$emit('guess', letter);
      }
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

.disabled-button {
  background-color: gray; /* Define a cor de fundo do botão para cinza quando a letra estiver desativada */
  opacity: 0.5; /* Torna o botão semitransparente quando desativado */
  pointer-events: none; /* Impede a interação com o botão, mas mantém a visibilidade */
}
</style>
