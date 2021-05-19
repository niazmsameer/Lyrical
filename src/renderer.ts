import { Lyric } from 'lrc-kit';
import appUI from './html/app.html';
import lyricRowTemplate from './html/lyric-row.html';
import './styles/index.scss';

const renderer = {
  audioPlayer: null as HTMLAudioElement,
  fileUploadEl: null as HTMLInputElement,
  appLyricsDiv: null as HTMLDivElement,

  lyricsChangeCallback: null as (fileData: string) => void,
  audioChangeCallback: null as (blob: string) => void,

  onFileUpload: (file: File) => {
    if (!file) return;

    // Split into substrings to check for .lrc files
    const fileNameArr = file.name.split('.');

    // Handle lyric file
    if (fileNameArr[fileNameArr.length - 1] === 'lrc') {
      const reader = new FileReader();
      reader.onload = () => {
        renderer.lyricsChangeCallback(reader.result as string);
      };
      reader.readAsText(file);
      return;
    }

    // Handle audio file
    if (file.type.search('audio') !== -1) {
      const blob = URL.createObjectURL(file);
      renderer.audioChangeCallback(blob);
      return;
    }

    alert('Invalid file');
  },

  renderApp: () => {
    const rootEl = document.querySelector('#app');
    rootEl.innerHTML = appUI;

    renderer.audioPlayer = document.querySelector('#app-audio-player'); 

    renderer.fileUploadEl = document.querySelector('#app-file-upload');
    renderer.fileUploadEl.onchange = () => {
      renderer.onFileUpload(renderer.fileUploadEl.files.item(0));
    };

    renderer.appLyricsDiv = document.querySelector('#app-lyrics-list');
  },

  renderLyrics: (lyrics: Lyric[]) => {
    renderer.appLyricsDiv.innerHTML = '';
    for (let i = 0; i < lyrics.length; i++) {
      let htmlTemplate = lyricRowTemplate.split('').join(''); // Clone template

      // Replace templates
      htmlTemplate = htmlTemplate.replace('{{lyric-text}}', lyrics[i].content);
      htmlTemplate = htmlTemplate.replace('{{lyric-index}}', i.toString());

      renderer.appLyricsDiv.innerHTML += htmlTemplate;
    }
  },

  renderCurrentLyric: (index: number) => {
    const lyricRows = document.querySelectorAll('.lyric-row');
    for (let i = 0; i < lyricRows.length; i++) {
      lyricRows[i].classList.remove('active');
      if (lyricRows[i].id === `lyric-row-${index.toString()}`) {
        lyricRows[i].classList.add('active');
        lyricRows[i].scrollIntoView({ behavior: 'smooth' });
      }
    }
  },
};

export default renderer;