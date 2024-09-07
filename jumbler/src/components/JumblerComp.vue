<template>
  <div class="container box box-2">
    <div class="container position-relative">
      <div v-if="!isMixed" class="row d-flex justify-content-center mt-5">
        <div class="col-md-12 d-flex justify-content-center">
          <input type="text" class="form-control input-field" v-model="inputSentence" placeholder="Enter your sentence" />
        </div>
      </div>
      <div v-if="isMixed" class="row d-flex justify-content-center mt-5">
        <transition-group name="fade" tag="div" class="draggable-container">
          <div
            v-for="(word, index) in sentencePieces"
            :key="index"
            class="draggable"
            draggable="true"
            @dragstart="dragStart(word, $event)"
            @click="handleWordClick(word)"
          >
            {{ word }}
          </div>
        </transition-group>
      </div>
      <div class="row d-flex justify-content-center mt-3">
        <div class="col-md-12 d-flex justify-content-center">
          <div
            class="dropzone"
            @dragover.prevent
            @drop="drop"
          >
            <div v-for="(word, index) in assembledSentence" :key="index" :class="wordClass(word, index)">
              {{ word }}
            </div>
          </div>
        </div>
      </div>
      <button class="btn btn-primary btn-size mt-3" @click="mix">{{ isMixed ? "Remix" : "Mix" }}</button>
      <button class="btn btn-secondary btn-size mt-3" @click="reset">Reset</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'JumblerComp',

  data() {
    return {
      inputSentence: '',
      sentencePieces: [],
      assembledSentence: [],
      isMixed: false,
      draggedWord: null,
      isFullyAssembled: false,
    }
  },

  computed: {
    originalWords() {
      return this.inputSentence.split(' ');
    },
    correctWordCount() {
      return this.assembledSentence.filter((word, index) => this.isCorrect(word, index)).length;
    }
  },

  methods: {
    mix() {
      this.assembledSentence = [];
      if (this.inputSentence.trim() !== '') {
        this.sentencePieces = this.inputSentence.split(' ');
        this.shuffle(this.sentencePieces);
        this.isMixed = true;
        this.isFullyAssembled = false;
      }
    },
    reset() {
      this.assembledSentence = [];
      this.inputSentence = '';
      this.isMixed = false;
      this.isFullyAssembled = false;
    },
    shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    },
    dragStart(word, event) {
      this.draggedWord = word;
      event.dataTransfer.effectAllowed = 'move';
    },
    drop() {
      if (this.draggedWord) {
        this.assembledSentence.push(this.draggedWord);
        const index = this.sentencePieces.indexOf(this.draggedWord);
        if (index > -1) {
          this.sentencePieces.splice(index, 1);
        }
        this.draggedWord = null;
        if (this.assembledSentence.length === this.originalWords.length) {
          this.isFullyAssembled = true;
        }
      }
    },
    handleWordClick(word) {
      // Handle word click for manual sentence assembly
      this.moveWordToAssembled(word);
    },
    moveWordToAssembled(word) {
      // Remove word from sentencePieces and add it to assembledSentence
      this.assembledSentence.push(word);
      const index = this.sentencePieces.indexOf(word);
      if (index > -1) {
        this.sentencePieces.splice(index, 1);
      }
      if (this.assembledSentence.length === this.originalWords.length) {
        this.isFullyAssembled = true;
      }
    },
    isCorrect(word, index) {
      return word === this.originalWords[index];
    },
    wordClass(word, index) {
      if (!this.isFullyAssembled) {
        return 'placed';
      }
      for (let i = 0; i <= index; i++) {
        if (!this.isCorrect(this.assembledSentence[i], i)) {
          return 'incorrect-word';
        }
      }
      return 'correct-word';
    }
  }
}
</script>

<style scoped>

</style>
