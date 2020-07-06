
(function () { 

  const MAIN_COMPONENT_CLASSNAME = 'music',
        AUDIO_CONTAINER_CLASSNAME = 'audio',
        AUDIO_LOADED_CLASSNAME = 'loaded',
        AUDIO_LOADING_CLASSNAME = 'loading',
        MUTE_STATE_CLASSNAME = 'muted',
        MUTE_BUTTON_CLASSNAME = 'atalanta-notation-mute-track',
        HIGHLIGHT_CLASSNAME = 'highlighted',
        PLAYING_CLASSNAME = 'playing',
        PAUSED_CLASSNAME = 'paused',
        PLAY_BUTTON_CLASSNAME = 'track-play', // 'atalanta-notation-start',
        // STOP_BUTTON_CLASSNAME = 'atalanta-notation-stop',
        TRACK_NUMBER_ATTNAME = 'data-track',
        TIME_START_ATTNAME = 'data-time-start',
        TIME_END_ATTNAME = 'data-time-end',
        AUDIO_POLLING_INTERVAL = 200,
        SCROLL_OFFSET = 100, // CMN scroll offset - to account for topnav
        PIANOROLL_SCROLL_OFFSET = 100;


  // Audio feature detection - can we make sound?
  // modernizr 3.6.0 (Custom Build) | MIT
  // https://modernizr.com/download/?-audio-webaudio-setclasses
 
  ! function (e, n, a) {
    function o(e, n) {
      return typeof e === n
    }
    function s() {
      var e, n, a, s, t, i, r;
      for (var u in l) if (l.hasOwnProperty(u)) {
        if (e =[], n = l[u], n.name && (e.push(n.name.toLowerCase()), n.options && n.options.aliases && n.options.aliases.length)) for (a = 0; a < n.options.aliases.length; a++) e.push(n.options.aliases[a].toLowerCase());
        for (s = o(n.fn, "function") ? n.fn(): n.fn, t = 0; t < e.length; t++) i = e[t], r = i.split("."), 1 === r.length ? Modernizr[r[0]] = s: (! Modernizr[r[0]] || Modernizr[r[0]] instanceof Boolean || (Modernizr[r[0]] = new Boolean (Modernizr[r[0]])), Modernizr[r[0]][r[1]] = s), c.push((s ? "": "no-") + r.join("-"))
      }
    }
    function t(e) {
      var n = u.className, a = Modernizr._config.classPrefix || "";
      if (p && (n = n.baseVal), Modernizr._config.enableJSClass) {
        var o = new RegExp("(^|\\s)" + a + "no-js(\\s|$)");
        n = n.replace(o, "$1" + a + "js$2")
      }
      Modernizr._config.enableClasses && (n += " " + a + e.join(" " + a), p ? u.className.baseVal = n: u.className = n)
    }
    function i() {
      return "function" != typeof n.createElement ? n.createElement(arguments[0]): p ? n.createElementNS.call(n, "http://www.w3.org/2000/svg", arguments[0]): n.createElement.apply(n, arguments)
    }
    var c =[], l =[], r = {
      _version: "3.6.0", _config: {
        classPrefix: "", enableClasses: ! 0, enableJSClass: ! 0, usePrefixes: ! 0
      },
      _q:[], on: function (e, n) {
        var a = this;
        setTimeout(function () {
          n(a[e])
        },
        0)
      },
      addTest: function (e, n, a) {
        l.push({
          name: e, fn: n, options: a
        })
      },
      addAsyncTest: function (e) {
        l.push({
          name: null, fn: e
        })
      }
    },
    Modernizr = function () {
    };
    Modernizr.prototype = r, Modernizr = new Modernizr, Modernizr.addTest("webaudio", function () {
      var n = "webkitAudioContext" in e, a = "AudioContext" in e; return Modernizr._config.usePrefixes ? n || a: a
    });
    var u = n.documentElement, p = "svg" === u.nodeName.toLowerCase();
    Modernizr.addTest("audio", function () {
      var e = i("audio"), n = ! 1; try {
        n = ! ! e.canPlayType, n && (n = new Boolean (n), n.ogg = e.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""), n.mp3 = e.canPlayType('audio/mpeg; codecs="mp3"').replace(/^no$/, ""), n.opus = e.canPlayType('audio/ogg; codecs="opus"') || e.canPlayType('audio/webm; codecs="opus"').replace(/^no$/, ""), n.wav = e.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ""), n.m4a = (e.canPlayType("audio/x-m4a;") || e.canPlayType("audio/aac;")).replace(/^no$/, ""))
      }
      catch (a) {
      }
      return n
    }), s(), t(c), delete r.addTest, delete r.addAsyncTest;
    for (var f = 0; f < Modernizr._q.length; f++) Modernizr._q[f]();
    e.Modernizr = Modernizr
  } (window, document);

  // Set up mute button click event for a single mute button (including pianoroll)

  function initTrackMuteSwitch(muteSwitchElem, musicRoot) {
  
    const trackNumber = parseInt(muteSwitchElem.getAttribute(TRACK_NUMBER_ATTNAME)),
          audioElements = Array.from(
            musicRoot.querySelectorAll(`.${AUDIO_CONTAINER_CLASSNAME} > audio[${TRACK_NUMBER_ATTNAME}="${trackNumber}"]`)
          ),
          muteSwitchesForThisTrack = Array.from(
            musicRoot.querySelectorAll(`.${MUTE_BUTTON_CLASSNAME}[${TRACK_NUMBER_ATTNAME}='${trackNumber}']`)
          );

    const staffElements = Array.from(musicRoot.querySelectorAll('.measure'))
                                .map(measure => measure.querySelectorAll('.staff')[trackNumber - 1]),
          barLinesElements = Array.from(musicRoot.querySelectorAll(`.barLineAttr path:nth-child(${trackNumber})`)),
          pianoRollNotes = Array.from(document.querySelectorAll(`.pianoroll svg rect.note.voice-${trackNumber}`)),
          musicSvgElements = staffElements.concat(barLinesElements, muteSwitchElem, pianoRollNotes);

    // This is the onChange callback for the mute switches

    const updateMute = function() {

      const isMuted = ! muteSwitchElem.checked;

      // Sync all mute switches

      muteSwitchesForThisTrack.forEach(muteSwitch => muteSwitch.checked = !isMuted);

      // Turn on/off audio for this track

      audioElements.forEach(aElem => aElem.volume = isMuted ? 0 : 1);

      // Change classname on CMN and pianoroll, etc.

      const classNameOp = isMuted ? 'add' : 'remove';
      musicSvgElements.forEach(
        elem => elem.classList[classNameOp](MUTE_STATE_CLASSNAME)
      );
    }
  
    // Add onchange to switch
  
    muteSwitchElem.onchange = updateMute;
  }
  
  // Update markup to prepare for script
  
  function initializeMarkup(musicRoot) {
  
    // Add classname to indicate that it's all-systems-go
    // @todo: THIS HAS BEEN DONE WITH html.music-ready
  
    musicRoot.classList.add('with-js');
    
    // Remove mix track (default with no JS or web audio)
  
    Array.from(musicRoot.querySelectorAll(`.audio *[${TRACK_NUMBER_ATTNAME}="all"]`))
      .forEach(mixTrackElem => mixTrackElem.parentElement.removeChild(mixTrackElem));
  
    // Activate individual tracks
  
    Array.from(musicRoot.querySelectorAll(`.audio *[${TRACK_NUMBER_ATTNAME}]`))
         .forEach(audioElem => audioElem.removeAttribute('hidden'));

    // Add style element to piano roll (for scrolling)

    document.querySelector('.pianoroll svg')
            .appendChild(document.createElement('style'));
  }
  
  // Given an element, and the last (music) system which was scrolled,
  //  scroll to that system if it's changed
  // TODO: move transition style & mute style to main CSS sheet

  function scrollToSystem(elemInSystem, lastScrolledSystemElem) {

    function recurseUpDomLookingForSystem(elem) {

      // If the musical system element is found

      if (elem.classList.contains('system')) {

        // ... and the system element is different from the last
        // one we scrolled to, then scroll to it
        
        if (elem !== lastScrolledSystemElem) {
          TweenMax.to(window, 2, { 
            scrollTo:{ y: `#${elem.id}`, offsetY: SCROLL_OFFSET }, 
            ease:Power2.easeInOut 
          });
        }
        return elem;
      } else if (elem.parentElement) {
        return recurseUpDomLookingForSystem(elem.parentElement);
      }
    }

    return recurseUpDomLookingForSystem(elemInSystem);
  }

  // Scroll the piano roll to show <elem>
  // Do this by updating the style element inside the
  //  piano roll SVG

  function scrollPianoRollTo(elem, styleElem) {
    const offset = (parseInt(elem.getAttribute('x')) - PIANOROLL_SCROLL_OFFSET) * -1;
    styleElem.textContent = `
      rect.note { 
        transform: translate(${offset}px, 0);
      }`
  }

  // Given a master audio track, a classname, a timetable
  //  update classname 
 
  function updateHighlights(audioTrack, timeTable, lastScrolledSystem, pianoRollStyleElem) {

    let scrollNeedsToBeUpdated = true,
        scrolledSystem;
  
    // For each element in the timetable ...

    timeTable.forEach(({ elem, start, end }) => {
  
      // See if the element is currently playing - 
      //  add the highlight classname or remove it, depending

      const isPlaying = (audioTrack.currentTime > start && audioTrack.currentTime < end),
            classOperation = isPlaying ? 'add' : 'remove';
      elem.classList[classOperation](HIGHLIGHT_CLASSNAME);
  
      // Update CMN scroll, if necessary

      if (scrollNeedsToBeUpdated && isPlaying) {
        scrolledSystem = scrollToSystem(elem, lastScrolledSystem);
        scrollNeedsToBeUpdated = false;
      }
    });

    // Update pianoroll scrolling

    const pianorollHighlightedElem = document.querySelector(`.pianoroll rect.note.${HIGHLIGHT_CLASSNAME}`);
    scrollPianoRollTo(pianorollHighlightedElem, pianoRollStyleElem);
  
    return scrolledSystem;
  }

  // Check when audio is all loaded, then change classes on root music element

  function removeLoadingClassnameWhenContentLoaded(musicRoot, audioElements) {

    // Callback: returns boolean indicating if all audio is ready to play

    function canAllPlay() {
      if (audioElements.every(audioElement => audioElement.readyState === 4)) {
        musicRoot.classList.remove(AUDIO_LOADING_CLASSNAME);
        musicRoot.classList.add(AUDIO_LOADED_CLASSNAME);
        // audioReady = true;
        console.log('Audio loaded');
        return true;
      } else {
        console.log('Loading audio: ' + 
                    audioElements.map(ae => ae.readyState === 4).join(','));
        return false;
      }
    }

    // Check if audio loaded - if not, add listener

    if (canAllPlay() === false) {
      audioElements.forEach(
        (audioElement, i) => {
          audioElement.addEventListener('canplaythrough', canAllPlay); 
        }
      );
    }
  }

  
  function main() {

    // Get page elements

    const musicRoot = document.getElementsByClassName(MAIN_COMPONENT_CLASSNAME)[0], // TODO: make this fail OK
      pianorollContainer = musicRoot.getElementsByClassName('pianoroll')[0],
      playButtons = Array.from(musicRoot.getElementsByClassName(PLAY_BUTTON_CLASSNAME)),
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
  
    // Update the markup

    initializeMarkup(musicRoot);

    // Add classes once audio is loaded

    removeLoadingClassnameWhenContentLoaded(musicRoot, audio);
  
    // Setup track mute buttons
  
    Array.from(musicRoot.getElementsByClassName(MUTE_BUTTON_CLASSNAME))
         .forEach(muteButton => initTrackMuteSwitch(muteButton, musicRoot));
  
    // Start updateHighlights when play button is pressed
  
    let timerId, scrolledSystem;
    const pianoRollStyleElem = document.querySelector('.pianoroll svg style');
  
    // Set onclick for play button

    playButtons.forEach(playButton => playButton.onchange = function(x) {

      const changedToPlayMode = this.checked;

      // Synchronize all play buttons (i.e. CMN and piano roll)

      playButtons.forEach(pb => pb.checked = this.checked);

      // Remove/add playing/paused classnames based on state

      addWhenPlay    = changedToPlayMode ? 'add' : 'remove',
      removeWhenPlay = changedToPlayMode ? 'remove' : 'add';

      musicRoot.classList[removeWhenPlay](PAUSED_CLASSNAME);
      musicRoot.classList[addWhenPlay](PLAYING_CLASSNAME);
      pianorollContainer.classList[removeWhenPlay](PAUSED_CLASSNAME);
      pianorollContainer.classList[addWhenPlay](PLAYING_CLASSNAME);

      // Start or stop audio playing

      const audioFunction = changedToPlayMode ? 'play' : 'pause';
      audio.forEach(a => a[audioFunction]());

      // Start or stop note highlighting

      if (changedToPlayMode) {

        const runToUpdateHighlights = function() {
          scrolledSystem = updateHighlights(  
            masterAudioTrack, timeTable, 
            scrolledSystem, pianoRollStyleElem
          ); 
        }
        timerId = window.setInterval(runToUpdateHighlights, AUDIO_POLLING_INTERVAL);
      } else {
        window.clearInterval(timerId);
      }
    });
  };
  
  // Check browser and do something only if capable
  
  const MUSIC_CAPABLE = (Modernizr.audio && Modernizr.audio.mp3 !== '');
  
  if (MUSIC_CAPABLE) {
    document.firstElementChild.classList.add('music-ready');
    document.addEventListener('DOMContentLoaded', main);
  }
  
  })();
