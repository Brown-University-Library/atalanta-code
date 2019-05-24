
(function () { 




  const MAIN_COMPONENT_CLASSNAME = 'music',
    AUDIO_CONTAINER_CLASSNAME = 'audio',
    MUTE_STATE_CLASSNAME = 'muted',
    MUTE_BUTTON_CLASSNAME = 'atalanta-notation-mute-track',
    HIGHLIGHT_CLASSNAME = 'highlighted',
    PLAYING_CLASSNAME = 'playing',
    PAUSED_CLASSNAME = 'paused',
    PLAY_BUTTON_CLASSNAME = 'atalanta-notation-start',
    STOP_BUTTON_CLASSNAME = 'atalanta-notation-stop',
    TRACK_NUMBER_ATTNAME = 'data-track',
    TIME_START_ATTNAME = 'data-time-start',
    TIME_END_ATTNAME = 'data-time-end',
    AUDIO_POLLING_INTERVAL = 200;
  
  function initTrackMuteButton(buttonElement, musicRoot) {
  
    const trackNumber = parseInt(buttonElement.getAttribute(TRACK_NUMBER_ATTNAME)),
      // muteClassname = `mute-${trackNumber}`,
      audioElements = Array.from(
        musicRoot.querySelectorAll(`.${AUDIO_CONTAINER_CLASSNAME} > audio[${TRACK_NUMBER_ATTNAME}="${trackNumber}"]`)
      );
      
    let isMuted = false;
  
    const staffElements = Array.from(musicRoot.querySelectorAll('.measure'))
      .map(measure => measure.querySelectorAll('.staff')[trackNumber - 1]);
  
    const barLinesElements = Array.from(musicRoot.querySelectorAll(`.barLineAttr path:nth-child(${trackNumber})`));
  
    const musicSvgElements = staffElements.concat(barLinesElements, buttonElement);
  
    const updateMute = function() {
  
      isMuted = ! isMuted;
      const classNameOp = isMuted ? 'add' : 'remove';
      
      audioElements.forEach(aElem => aElem.volume = isMuted ? 0 : 1); // TODO: finish this
  
      musicSvgElements.forEach(
        elem => elem.classList[classNameOp](MUTE_STATE_CLASSNAME)
      );
    }
  
    // Add onclick to button
  
    buttonElement.onclick = updateMute;
  }
  
  // Update markup to prepare for script
  
  function initializeMarkup(musicRoot) {
  
    // Add classname to indicate that it's all-systems-go
    // TODO: put this on the HTML element?
  
    musicRoot.classList.add('with-js');
    
    // Remove mix track (default with no JS or web audio)
  
    Array.from(musicRoot.querySelectorAll(`.audio *[${TRACK_NUMBER_ATTNAME}="all"]`))
      .forEach(mixTrackElem => mixTrackElem.parentElement.removeChild(mixTrackElem));
  
    // Activate individual tracks
  
    Array.from(musicRoot.querySelectorAll(`.audio *[${TRACK_NUMBER_ATTNAME}]`))
      .forEach(trackElem => trackElem.removeAttribute('hidden'));
  }
  
  // Given a master audio track, a classname, a timetable
  //  update classname 
  // TODO: Too much DOM accessing - this can be made more efficient
  
  function updateHighlights(audioTrack, highlightClassname, timeTable) {
    timeTable.forEach(({elem, start, end}) => {
      const isPlaying = (audioTrack.currentTime > start && audioTrack.currentTime < end),
          classOperation = isPlaying ? 'add' : 'remove';
      elem.classList[classOperation](highlightClassname);
    });
  }
  
  function main() {
  
    // Page elements
  
    const musicRoot = document.getElementsByClassName(MAIN_COMPONENT_CLASSNAME)[0], // TODO: make this fail OK
      playButtons = Array.from(musicRoot.getElementsByClassName(PLAY_BUTTON_CLASSNAME)),
      pauseButtons = Array.from(musicRoot.getElementsByClassName(STOP_BUTTON_CLASSNAME)),
      audio = Array.from(musicRoot.querySelectorAll('audio')),
      masterAudioTrack = audio[0];
  
    const elementsWithTimes = Array.from(document.querySelectorAll(`*[${TIME_START_ATTNAME}]`));
  
    const timeTable = elementsWithTimes.map(elem => { 
      return {
        elem: elem,
        start: elem.getAttribute(TIME_START_ATTNAME), 
        end: elem.getAttribute(TIME_END_ATTNAME)
      }
    });
  
    initializeMarkup(musicRoot);
  
    // Setup track mute buttons
    // TODO: move mute state to musicRoot (like it is with the play button)
    //  so that the CMN and pianoroll buttons stay syncronized in
    //  a declarative way
  
    Array.from(musicRoot.getElementsByClassName(MUTE_BUTTON_CLASSNAME))
      .forEach(muteButton => initTrackMuteButton(muteButton, musicRoot));
  
    // Start updateHighlights when play button is pressed
  
    let timerId;
  
    playButtons.forEach(playButton => playButton.onclick = function() {
      audio.forEach(a => a.play());
      musicRoot.classList.remove(PAUSED_CLASSNAME);
      musicRoot.classList.add(PLAYING_CLASSNAME);
      timerId = window.setInterval(
        function() { 
          updateHighlights(masterAudioTrack, HIGHLIGHT_CLASSNAME, timeTable) 
        }, 
        AUDIO_POLLING_INTERVAL
      );
    });
  
    pauseButtons.forEach(pauseButton => pauseButton.onclick = function() {
      audio.forEach(a => a.pause());
      musicRoot.classList.remove(PLAYING_CLASSNAME);
      musicRoot.classList.add(PAUSED_CLASSNAME);
      window.clearInterval(timerId);
    });
  };
  
  // Check browser and do something only if capable
  
  const MUSIC_CAPABLE = true; // Check the browser here
  
  if (MUSIC_CAPABLE) {
    console.log(document.firstElementChild.classList.add('music-ready'));
    document.addEventListener('DOMContentLoaded', main);
  }
  
  })(); 