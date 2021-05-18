<template>
  <div class="visualizer">
    <LyricRow
    v-for="lyric in lyrics"
    :key="lyric.index"
    :text="lyric.text"
    :isActive="currentLyricIndex == lyric.index" />
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue';

import LyricRow from '@/components/LyricRow.vue';

import { Lyric } from '@/interfaces/Lyric';

export default defineComponent({
  name: 'Visualizer',
  components: {
    LyricRow,
  },
  props: {
    lyrics: Object as PropType<Lyric[]>,
    currentLyricIndex: Number,
  },
});
</script>

<style lang="scss" scoped>
.visualizer {
  height: 90%; width: 100%;
  padding: 40px;
  overflow: scroll;
}
</style>
