
// THIS IS ENTIRELY INCOMPLETE

(function () {

'use strict';

// GLOBALS

const MAIN_CLASS_NAME = 'atalanta-notation',
      VIZ_CLASS_NAME = 'atalanta-notation-viz',
      VIZ_TYPES = {
        'cmn' : ViewCMN,
        'pianoroll': ViewPianoRoll,
        'audio': ViewAudio
      },
      CMN_VIZ_CLASS_NAME = VIZ_CLASS_NAME + '-cmn',
      PIANO_ROLL_VIZ_CLASS_NAME = VIZ_CLASS_NAME + '-pianoroll',
      AUDIO_VIZ_CLASS_NAME = VIZ_CLASS_NAME + '-audio',
      AUDIO_VIZ_MP3_ATTR_NAME = 'data-mp3',
      AUDIO_VIZ_TEMPO_ATTR_NAME = 'data-tempo',
      VEROVIO_OPTIONS = {
        pageHeight: 2000,
        pageWidth: 2000,
        scale: 30,
        ignoreLayout: 1,
        adjustPageHeight: 1
        // adjustPageHeight: true
      },
      PIANO_ROLL_OPTIONS = {
        barHeight: 5,
        pitchScale: 5
      },
      TEMPO = 56; // Should be read from DOM


// MISC HELPER FUNCTIONS


// MUSIC DATA OBJECT

class Music {

  constructor(meiFileURL) {

    function getVerovio(meiFileURL) {
      Music.getFile(meiFileURL);
      let verovioToolkit = new verovio.toolkit();
      verovioToolkit.loadData(meiData);
    }

    let verovio = await getVerovio(meiFileURL);

  }

  static async getFile(url, success) {
    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    xhr.open('GET', url);
    xhr.onreadystatechange = function() {
      if (xhr.readyState > 3 && xhr.status === 200) success(xhr.responseText);
    };
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.send();
    return xhr;
  }


}




// VIEWS

// One view manager per component

class ViewManager {
  constructor(containerNode, verovioToolkit) { 

    function () {}
  }

  createView() {}
  renderAllViews() {}
}

// View base class

class View {
  constructor (viewContainer, verovioToolkit) {

  }

  get className () => View.classNameRoot + ''; // Get name from View.types

  // Workaround for Verovio not reading MEI tempo
  //   convert MEI time to Audio-time (in milliseconds)

  static scaleTime(timeInMilliseconds) {
    const TIME_SCALE = TEMPO * 4;
    return timeInMilliseconds * (TIME_SCALE / 60);
  }

  static beatsToMilliseconds(beats) {
    const BEAT_IN_MS = (1 / TEMPO) * 60 * 1000;
    return this.scaleTime(beats * BEAT_IN_MS);
  }
}

View.types = VIZ_TYPES;

class ViewPianoRoll extends View {
  constructor (viewContainer, verovioToolkit) {}
  render() {}
}

class ViewCMN extends View {
  constructor (viewContainer, verovioToolkit) {}
  render() {}
  update() {}
  onMuteChange(muteStatus) {}
}

class ViewAudio extends View {
  constructor (viewContainer, verovioToolkit) {}
  update() {}
  stop() {}
}

ViewAudio.context = new AudioContext();

class ViewAudioTrack{
  constructor (trackFilenames) {}
}

class AudioLoader {

}

// MODEL

class Model {
  constructor (viewManager) {}
  play() {}
  stop() {}
  setMute() {}
}

// CONTROLLER



// This handles all the DOM interface

function parseComponent(componentDomNode) {
  // Create MVC root objects
  // Parse views (ask ViewManager to create)
}

function parseDocument(documentRoot){
  // Look for all MAIN_CLASS_NAME containers
  // For each one of those, call parseComponent
}

// MAIN, UPON PAGE LOAD - identify music component markup in the HTML and instantiate

function initWhenPageLoaded() {
  
}

document.addEventListener('DOMContentLoaded', initWhenPageLoaded);


})()