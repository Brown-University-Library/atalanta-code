
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
    AUDIO_POLLING_INTERVAL = 200,
    SCROLL_OFFSET = 100, // CMN scroll offset - to account for topnav
    PIANOROLL_SCROLL_OFFSET = 100;

  // Set up mute button click event for a single mute button (including pianoroll)

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

    const pianoRollNotes = Array.from(document.querySelectorAll(`.pianoroll svg rect.note.voice-${trackNumber}`));
  
    const musicSvgElements = staffElements.concat(barLinesElements, buttonElement, pianoRollNotes);

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
    // TODO: THIS HAS BEEN DONE WITH html.music-ready
  
    musicRoot.classList.add('with-js');
    
    // Remove mix track (default with no JS or web audio)
  
    Array.from(musicRoot.querySelectorAll(`.audio *[${TRACK_NUMBER_ATTNAME}="all"]`))
      .forEach(mixTrackElem => mixTrackElem.parentElement.removeChild(mixTrackElem));
  
    // Activate individual tracks
  
    Array.from(musicRoot.querySelectorAll(`.audio *[${TRACK_NUMBER_ATTNAME}]`))
      .forEach(trackElem => trackElem.removeAttribute('hidden'));

    // Add style element & filter to pianoroll
    // TODO: this should be added to SVG transform

    const pianoRollDefs = document.createElement('defs');
    
    pianoRollDefs.innerHTML = `
        <filter id="highlightFilter" x="0" y="0" width="2000%" height="2000%">
        <feOffset result="offOut" in="SourceGraphic" dx="0" dy="0"></feOffset>
        <feGaussianBlur result="blurOut" in="offOut" stdDeviation="10"></feGaussianBlur>
        <feBlend in="SourceGraphic" in2="blurOut" mode="normal"></feBlend>
      </filter>`;

    Array.from(document.querySelectorAll('.pianoroll svg'))
      .forEach(pianorollSvg => {
        pianorollSvg.appendChild(document.createElement('style'));
        pianorollSvg.appendChild(pianoRollDefs);
      });

    // Add to global style (TODO: should be migrated to main css file)

    const tempStyle = document.createElement('style');
    
    tempStyle.textContent = `

      .pianoroll svg rect.note { 
        transition: transform 3s ease-out, fill 0.5s;
      }

      .pianoroll svg rect.note.${MUTE_STATE_CLASSNAME} {
        fill: #eee;
      }
      
      .pianoroll svg rect.note.${HIGHLIGHT_CLASSNAME} {
        /* filter: url(#highlightFilter); */
      }`;
    
      // The filter above isn't working for some reason ... 

    document.head.appendChild(tempStyle);

    

    // filter: url(#displacementFilter);


    /*

    // Get rightmost coordinate of rightmost bar

    Array.from(document.querySelectorAll('.pianoroll rect'))
      .map(rect => parseInt(rect.getAttribute('x')) + parseInt(rect.getAttribute('width')))
      .sort((a, b) => b - a)[0];

    <svg width="100%" viewBox="961 0 1000 1000" preserveAspectRatio="xMidYMid slice">
    (where 961 is the x-coord of the bar)

    */
  }
  
  // Given an element, and the last (music) system which was scrolled,
  //  scroll to that system if it's changed
  // TODO: move transition style & mute style to main CSS sheet

  function scrollToSystem(elemInSystem, lastScrolledSystemElem) {

    /*

    Uncaught TypeError: Failed to execute 'scrollTo' on 'Window': parameter 1 ('options') is not an object.

    */

    function recurseUpDomLookingForSystem(elem) {

      // If the musical system element is found

      if (elem.classList.contains('system')) {
        // ... and the system element is different from the last
        // one we scrolled to, then scroll to it
        if (elem !== lastScrolledSystemElem) {
          // const elem.getBoundingClientRect()
          // TweenLite.to(window, 2, { scrollTo:400, offsetY: SCROLL_OFFSET });
          // TweenLite.to(window, 2, { scrollTo: `#${elem.id}`, offsetY: SCROLL_OFFSET });
          TweenMax.to(window, 2, { scrollTo:{ y: `#${elem.id}`, offsetY: SCROLL_OFFSET }, ease:Power2.easeInOut });
          console.log("Scrolling to " + elem.id);
        }
        return elem;
      } else if (elem.parentElement) {
        return recurseUpDomLookingForSystem(elem.parentElement);
      }
    }

    return recurseUpDomLookingForSystem(elemInSystem);
  }

  function scrollPianoRollTo(elem, styleElem) {
    const offset = (parseInt(elem.getAttribute('x')) - PIANOROLL_SCROLL_OFFSET) * -1;
    styleElem.textContent = `

      rect.note { 
        transform: translate(${offset}px, 0);
      }`
  }

  // Given a master audio track, a classname, a timetable
  //  update classname 
  // TODO: Too much DOM accessing - this can be made more efficient
 
  function updateHighlights(audioTrack, highlightClassname, timeTable, lastScrolledSystem, pianoRollStyleElem) {

    let scrollNeedsToBeUpdated = true,
      scrolledSystem;
  
    // For each element in the timetable ...

    timeTable.forEach(({ elem, start, end }) => {
  
      // See if the element is currently playing - 
      //  add the highlight classname or remove it, depending

      const isPlaying = (audioTrack.currentTime > start && audioTrack.currentTime < end),
          classOperation = isPlaying ? 'add' : 'remove';
      elem.classList[classOperation](highlightClassname);
  
      // Update CMN scroll, if necessary
      //  TODO: do we need to check this for _every_ element in the timetable??

      if (scrollNeedsToBeUpdated && isPlaying) {
        scrolledSystem = scrollToSystem(elem, lastScrolledSystem);
        scrollNeedsToBeUpdated = false;
      }
    });

    // Update pianoroll scrolling

    const pianorollHighlightedElem = document.querySelector(`.pianoroll rect.note.${highlightClassname}`);
    scrollPianoRollTo(pianorollHighlightedElem, pianoRollStyleElem);
  
    return scrolledSystem;
  }
  
  function main() {
  
    // Get page elements

    const musicRoot = document.getElementsByClassName(MAIN_COMPONENT_CLASSNAME)[0], // TODO: make this fail OK
      pianorollContainer = musicRoot.getElementsByClassName('pianoroll')[0],
      playButtons = Array.from(musicRoot.getElementsByClassName(PLAY_BUTTON_CLASSNAME)),
      pauseButtons = Array.from(musicRoot.getElementsByClassName(STOP_BUTTON_CLASSNAME)),
      audio = Array.from(musicRoot.querySelectorAll('audio')),
      masterAudioTrack = audio[0];
  
    const elementsWithTimes = Array.from(document.querySelectorAll(`*[${TIME_START_ATTNAME}]`));
  
    // Get table of DOM ID's with timestamps

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
  
    let timerId, scrolledSystem;
    const pianoRollStyleElem = document.querySelector('.pianoroll svg style');
  
    // Set onclick for play button

    playButtons.forEach(playButton => playButton.onclick = function() {
      audio.forEach(a => a.play());
      musicRoot.classList.remove(PAUSED_CLASSNAME);
      musicRoot.classList.add(PLAYING_CLASSNAME);
      pianorollContainer.classList.remove(PAUSED_CLASSNAME);
      pianorollContainer.classList.add(PLAYING_CLASSNAME);
      timerId = window.setInterval(
        function() {
          scrolledSystem = updateHighlights(masterAudioTrack, HIGHLIGHT_CLASSNAME, timeTable, scrolledSystem, pianoRollStyleElem); 
        }, 
        AUDIO_POLLING_INTERVAL
      );
    });

    // Set onclick for pause/stop button
  
    pauseButtons.forEach(pauseButton => pauseButton.onclick = function() {
      audio.forEach(a => a.pause());
      musicRoot.classList.remove(PLAYING_CLASSNAME);
      musicRoot.classList.add(PAUSED_CLASSNAME);
      pianorollContainer.classList.remove(PLAYING_CLASSNAME);
      pianorollContainer.classList.add(PAUSED_CLASSNAME);
      window.clearInterval(timerId);
    });
  };
  
  // Check browser and do something only if capable
  
  const MUSIC_CAPABLE = true; // TODO: Check the browser here
  
  if (MUSIC_CAPABLE) {
    console.log(document.firstElementChild.classList.add('music-ready'));
    document.addEventListener('DOMContentLoaded', main);
  }
  
  })(); 