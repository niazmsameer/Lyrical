<template>
  <div class="control-area">
    <audio id="mainAudioPlayer" controls></audio>
    <input ref="fileUpload" type="file" @change="onFileUpload()" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

// import { Lyric } from '@/interfaces/Lyric';

export default defineComponent({
  name: 'ControlArea',
  props: {
    audioChangeCallback: Function,
    lyricsChangeCallback: Function,
  },
  methods: {
    onFileUpload() {
      const fileUploadElement = this.$refs.fileUpload as HTMLInputElement;
      if (fileUploadElement.files && fileUploadElement.files.length > 0) {
        const file = fileUploadElement.files[0];
        console.log(file.type);
        if (file.type.includes('audio')) {
          const blob = URL.createObjectURL(file);
          if (this.audioChangeCallback) {
            this.audioChangeCallback(blob);
          }
        } else if (file.type === 'application/json') {
          const reader = new FileReader();
          reader.onload = () => {
            if (this.lyricsChangeCallback) {
              this.lyricsChangeCallback(reader.result);
            }
          };
          reader.readAsText(file);
        }
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.control-area {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 40px;
  height: 10%;
}
</style>
