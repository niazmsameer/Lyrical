<template>
  <div ref="lyric" class="lyric-row" :class="{ active: isActive }">
    {{ text }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LyricRow',
  props: {
    isActive: Boolean,
    text: String,
  },
  updated() {
    this.comeIntoView();
  },
  methods: {
    comeIntoView() {
      if (!this.isActive) { return; }
      const lyricDiv = this.$refs.lyric as HTMLElement;
      if (lyricDiv) {
        lyricDiv.scrollIntoView({ behavior: 'smooth' });
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.lyric-row {
  font-size: 1.25rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.4);
  transition: all 0.3s ease-in-out;
  margin-bottom: 20px;
}

.active {
  font-size: 1.5rem !important;
  color: rgba(255, 255, 255, 1);
}
</style>
