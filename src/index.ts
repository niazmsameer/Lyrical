import { Lyric } from 'lrc-kit';
import parser from './parser';
import renderer from './renderer';

const app = {
  lyrics: [] as Lyric[],
  currentLyricIndex: -1,
  audioBlob: null as string,

  audioChange: (blob: string) => {
    app.audioBlob = blob;
    renderer.audioPlayer.src = app.audioBlob;
  },

  lyricsChange: (fileData: string) => {
    const lyrics = parser.parseLRCFile(fileData);
    if (lyrics) {
      app.lyrics = lyrics;
      renderer.renderLyrics(app.lyrics);
    }
  },

  main: () => {
    console.log('Lyrical ✨ by Soomin Studio');
    console.log('Niaz M. Sameer was here');

    renderer.audioChangeCallback = app.audioChange;
    renderer.lyricsChangeCallback = app.lyricsChange;

    renderer.renderApp();

    requestAnimationFrame(app.loop);
  },

  getCurrentLyricIndex: (currentTime: number): number => {
    for (let i = 0; i < app.lyrics.length; i++) {
      if (currentTime >= app.lyrics[app.lyrics.length - 1].timestamp) {
        return app.lyrics.length - 1;
      } else if (currentTime >= app.lyrics[i].timestamp &&
          currentTime < app.lyrics[i + 1].timestamp) {
        return i;
      }
    }
    return -1;
  },

  loop: () => {
    if (app.lyrics.length > 0) {
      const currentLyricIndex = app.getCurrentLyricIndex(renderer.audioPlayer.currentTime);
      if (currentLyricIndex !== app.currentLyricIndex) {
        app.currentLyricIndex = currentLyricIndex;
        renderer.renderCurrentLyric(app.currentLyricIndex);
      }
    }

    requestAnimationFrame(app.loop);
  },
};

app.main();