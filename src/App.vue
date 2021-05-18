<template>
  <div class="app-root">
    <Header />
    <div class="app-container">
      <Visualizer :lyrics="lyrics" :currentLyricIndex="currentLyricIndex" />
      <ControlArea
      :audioChangeCallback="changeAudio"
      :lyricsChangeCallback="changeLyrics" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import Header from '@/components/Header.vue';
import Visualizer from '@/components/Visualizer.vue';
import ControlArea from '@/components/ControlArea.vue';

import { Lyric } from '@/interfaces/Lyric';

import parser from '@/parser';

export default defineComponent({
  name: 'App',
  data() {
    return {
      lyrics: [] as Lyric[],
      audioFile: null as string | null,
      currentLyricIndex: -1, // -1 represents no current lyric
      isPlaying: false,
    };
  },
  components: {
    Header,
    Visualizer,
    ControlArea,
  },
  mounted() {
    parser.exposeParserToWindow();

    // Start app loop
    requestAnimationFrame(this.mainLoop);
  },
  methods: {
    mainLoop() {
      // Loop consists of getting current lyric
      // Loop usually runs at Vsync speeds (e.g. 60Hz)
      const lIndex = this.getCurrentLyricIndex();
      this.currentLyricIndex = lIndex != null ? lIndex : -1;
      requestAnimationFrame(this.mainLoop);
    },

    getCurrentLyricIndex() {
      const audioPlayer = document.getElementById('mainAudioPlayer') as HTMLAudioElement;
      // Sometimes recompilation causes audioPlayer to be null
      // for a few frames.
      if (!audioPlayer) {
        return null;
      }

      const { currentTime } = audioPlayer;
      for (let i = 0; i < this.lyrics.length; i += 1) {
        const lyric = this.lyrics[i];
        if (currentTime >= lyric.startTime && currentTime < lyric.endTime) {
          return lyric.index;
        }
      }

      return null;
    },

    changeAudio(file: string) {
      this.audioFile = file;
      const audioPlayer = document.getElementById('mainAudioPlayer') as HTMLAudioElement;
      audioPlayer.src = this.audioFile;
    },

    changeLyrics(file: string) {
      const lyrics = parser.parseLyricFile(file);
      this.lyrics = lyrics;
    },
  },
});
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

*, *::before, *::after {
  margin: 0; padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}

html {
  font-size: 20px;
}

.app-root {
  position: fixed;
  top: 0; left: 0;
  height: 100vh; width: 100vw;
  background: linear-gradient(35deg, #e66465, #9198e5);
  background-repeat: no-repeat;
}

.app-container {
  height: 85%; width: 100%;
}

@media only screen and (max-width: 481px) {
  html {
    font-size: 14px;
  }
}
</style>
