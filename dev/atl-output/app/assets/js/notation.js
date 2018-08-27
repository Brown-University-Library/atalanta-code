
/*

  The tempo is being read from the DOM but the tempo is not taking hold
  in terms of what's being returned for timing in Verovio
  
  Try editing the sample MEI directly and putting in the tempo there; maybe the regex method 
  isn't doing it
  
  (Didn't work - defaulting to 60 BPM)
  
  Have to implement update(time) functions for the CMN view
  
  Have to give the model a play() method that starts a setInterval that tells the view 
  manager to updateAllViews
  
  May want to have a Verovio-type API for other visualizations (e.g. )

*/

(function () {

  'use strict';
  
  // Constants
  
  let MAIN_CLASS_NAME = 'atalanta-notation',
      VIZ_CLASS_NAME = 'atalanta-notation-viz',
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

  // GLOBALS
  
  var audioContext;
  
  // UTILITY FUNCTIONS

  // Workaround for Verovio not reading MEI tempo
  //   convert MEI time to Audio-time (in milliseconds)

  function scaleTime(timeInMilliseconds) {
    const TIME_SCALE = TEMPO * 4;
    return timeInMilliseconds * (TIME_SCALE / 60);
  }

  function beatsToMilliseconds(beats) {
    const BEAT_IN_MS = (1 / TEMPO) * 60 * 1000;
    return scaleTime(beats * BEAT_IN_MS);
  }

  // COMPONENT CREATION

  // Given a DOM node (through _this_), make a music notation component
  
  function createMusicComponent() {
    
    let containerNode = $(this);
    
    // Get rid of default content for browsers with no javascript
    
    containerNode.css('backgroundImage', 'none');

    // Take MEI code, remove tempo information, replace with that tempo
    //  indicated by the tempo attribute in the markup
    // THIS DOESN'T SEEM TO WORK
    
    function setMeiTempo(meiData) {
      
      // Get tempo from child of main container 
      // TODO: also look in main container
      
      let tempoValue = Number(containerNode.find('*[' + AUDIO_VIZ_TEMPO_ATTR_NAME + ']')
                                           .attr(AUDIO_VIZ_TEMPO_ATTR_NAME)),
          tempo =  tempoValue === NaN ? 60 : tempoValue;

      console.log("Tempo read from DOM: " + tempo);
      
      // Take out existing tempo data
      //  and insert new tempo data
      
      return meiData.replace(/\s+midi.bpm="[^"]"/g, '')
                    .replace(/<scoreDef\s+/, '<scoreDef midi.bpm="' + tempo + '" ');
    }
    
    // Create verovio toolkit object

    function createVerovioObject(meiFileURL) {
      
      let verovioToolkit = new verovio.toolkit();
      window.v = verovioToolkit; // TODO - this is temp

      // Load the MEI file using a HTTP GET
      
      $.ajax({
          url: meiFileURL, dataType: 'text', success: function(meiData) {

            const voiceNameRE = /<staffDef\s+([^>]+\s+)?label="([^"]+)"/gi;
            let staffDefTxt;

            while (staffDefTxt = voiceNameRE.exec(meiData)) {
              console.log(staffDefTxt[2]);
            }

            // verovioToolkit.loadData(setMeiTempo(meiData)); 
            // COMMENTED OUT ABOVE B/C VEROVIO DOESN'T SEEM TO BE READING THE TEMPO FROM THE MEI
            verovioToolkit.loadData(meiData);
            
            // Convert to MIDI to get timing info
            
            verovioToolkit.renderToMidi();
            
            // Create views, model, controllers
            
            let viewManager = ViewManager(containerNode, verovioToolkit),
                model = Model(viewManager, verovioToolkit);
            
            initControllers(containerNode, model, meiData);

            // Create onclick events to jump to time
            // TODO: test this
            // TODO: shouldn't this be in the CMN View?
            
            $('.note').click(function() {
                var id = $(this).attr('id');
                var time = verovioToolkit.getTimeForElement(id);
                // $('#player').midiPlayer.seek(time);
                console.log("NOTE TIME: " + time);
            });
          }
      });
    }

    // TODO: Create main interface buttons
    
    // MAIN
    
    function init() {
      let meiFileURL = containerNode.attr('data-mei');
      createVerovioObject(meiFileURL);
    }
    
    init();
  }
  
  // OBJECT: VIEW MANAGER
  //  The viewManager scans the DOM for markup and 
  //   creates all views (*-viz) including audio-viz and CMN-viz
  //  Responsible for receiving direction from Model and relaying it
  //   to the views
  
  function ViewManager(containerNode, verovioToolkit) {

    var views;
    
    function createViews() {
      
      let views = [];
      
      containerNode.find('.' + VIZ_CLASS_NAME).each(function () {
        let viewContainer = $(this);

        if (viewContainer.hasClass(CMN_VIZ_CLASS_NAME)) {
          views.push(ViewCMN(viewContainer, verovioToolkit));
        } else if (viewContainer.hasClass(AUDIO_VIZ_CLASS_NAME)) {
          views.push(ViewAudio(viewContainer));
        } else if (viewContainer.hasClass(PIANO_ROLL_VIZ_CLASS_NAME)) {
          views.push(ViewPianoRoll(viewContainer, verovioToolkit));
        } // ADD MORE VIEWS HERE AS THEY ARE CREATED
      });
      
      return views;
    }
    
    function renderAllViews() {
      views.forEach(function(view) {
        view.render();
      });
    }

    function updateAllViews(timeInMilliseconds) {
            
      let timeAdjustedForTempo = scaleTime(timeInMilliseconds);

      views.forEach(function(view) {
        // view.update(timeInMilliseconds);
        view.update(timeAdjustedForTempo); // KLUDGE
      });
    }
    
    function stopAllViews() {
      views.forEach((view) => view.stop())
    }
    
    function setMute(muteStatus) {
      console.log("MUTE CHANGE FOR ALL VIEWS");
      views.forEach((view) => view.onMuteChange(muteStatus));
    }
    
    function init() {
      views = createViews();
      renderAllViews();      
    }
    
    init();

    return {
      update: updateAllViews,
      stop: stopAllViews,
      setMute: setMute
    };
  }
  
  // OBJECT: PIANO ROLL VIEW

  function ViewPianoRoll(viewContainer, verovioToolkit) {

    let rectId = 'note-rect-' + Math.floor(Math.random() * 10000),
        noteInfo = getNoteInfo(verovioToolkit);

    function getNoteInfo(verovioToolkit) {
      let mei = getMEI(verovioToolkit.getMEI()),
          meiNotes = Array.from(mei.querySelectorAll('note')),
          notes = [], 
          maxPitch = 0, 
          minPitch = Number.POSITIVE_INFINITY, 
          lastNoteTime = 0;

      // Get information on each note in turn

      meiNotes.forEach((meiNote) => {

        let [dur, id, pitch] = ['dur', 'xml:id', 'pnum'].map(a => meiNote.getAttribute(a)),
            startTime = scaleTime(verovioToolkit.getTimeForElement(id)),
            durTime, voiceNumber;

        if (dur === 'long') dur = 0.5; // If note duration marked 'long', make it 8 beats
        durTime = beatsToMilliseconds((1 / dur) * 4); // 1/4 note = 1 beat

        // Get voice number from staff position

        let ancestor = meiNote;
        do { ancestor = ancestor.parentElement } while (ancestor !== null && ancestor.nodeName !== 'staff');
        voiceNumber = (ancestor !== null && ancestor.getAttribute('n') !== null) 
                      ? Number.parseInt(ancestor.getAttribute('n')) 
                      : 0; // If not specified, put into voice 0

        notes.push({ 
          dur: durTime, 
          id: id, 
          pitch: pitch, 
          startTime: startTime, 
          voiceNumber: voiceNumber 
        });

        maxPitch = (maxPitch < pitch) ? pitch : maxPitch;
        minPitch = (minPitch > pitch) ? pitch : minPitch;
        lastNoteTime = (lastNoteTime < startTime) ? startTime : lastNoteTime;
      });

      return {
        notes: notes,
        maxPitch: maxPitch,
        minPitch: minPitch,
        lastNoteTime: lastNoteTime
      }
    }

    function render() {

      let getSvg = (elem) => document.createElementNS('http://www.w3.org/2000/svg', elem),
          rectDef = getSvg('rect'),
          defs = getSvg('defs'),
          svg = getSvg('svg');

      svg.setAttribute('width', '100%');
      svg.setAttribute('height', '100%');
      
      // Set up SVG defs

      rectDef.setAttribute('class', 'note');
      rectDef.setAttribute('id', rectId);
      rectDef.setAttribute('height', PIANO_ROLL_OPTIONS.barHeight);
      defs.appendChild(rectDef);
      svg.appendChild(defs);

      // Create bars

      function makeBarFromMeiNote(note, noteInfo) {

        let rect = getSvg('rect'),
            scaleTimeForDisplay = t => t / 200;
  
        rect.setAttribute('class', 'note');
        rect.setAttribute('width', scaleTimeForDisplay(note.dur));
        rect.setAttribute('height', PIANO_ROLL_OPTIONS.barHeight);
        rect.setAttribute('x', scaleTimeForDisplay(note.startTime));
        rect.setAttribute('y', (noteInfo.maxPitch - note.pitch) * PIANO_ROLL_OPTIONS.pitchScale);

        return rect;
      }

      noteInfo.notes
        .reduce((voices, note) => {
          voices[note.voiceNumber].push(makeBarFromMeiNote(note, noteInfo));
          return voices;
        }, [[],[],[],[]])
        .map((voice, voiceNumber) => { 
          let voiceSvgGroup = getSvg('g');
          voiceSvgGroup.setAttribute('class', `voice-${voiceNumber}`);
          voice.forEach(note => voiceSvgGroup.appendChild(note));
          svg.appendChild(voiceSvgGroup);
        });

      // Attach to container

      viewContainer.get(0).appendChild(svg);
    }

    return {
      render: render,
      update: () => {},
      stop: () => {},
      onMuteChange: () => {}
    }
  }


  // OBJECT: CMN VIEW
  
  function ViewCMN(viewContainer, verovioToolkit) {
/*
                pageHeight = $(document).height() * 100 / zoom ;
                pageWidth = $(window).width() * 100 / zoom ;
                options = {
                            pageHeight: pageHeight,
                            pageWidth: pageWidth,
                            scale: zoom,
                            adjustPageHeight: true
                        };
                vrvToolkit.setOptions(options);
  */  
    
    let zoom = 30,
        pageHeight = viewContainer.height() * 100 / zoom,
        pageWidth  = viewContainer.width()  * 100 / zoom,
        highlightedNotes = [],
        HIGHLIGHT_COLOR = '#f00', // THIS MAY BE DEFUNCT
        HIGHLIGHTED_NOTE_CLASSNAME = 'highlighted';

    function removeFallbackImage() {
      viewContainer.css('background-image', 'none');
    }
    
    function render() {

      let viewDOM = (viewContainer.get())[0];

      // let // pageHeight = viewContainer.height() * 100 / zoom,
          // pageWidth  = viewContainer.width()  * 100 / zoom;
      /*
      VEROVIO_OPTIONS.pageHeight = viewContainer.height() * 100 / zoom;
      VEROVIO_OPTIONS.pageWidth  = viewContainer.width()  * 100 / zoom;
      VEROVIO_OPTIONS.scale = zoom;
      */

      // let scale = ((pageWidth / 2) / 300) * 10;

      //console.log(pageWidth  / 2);
      //console.log(scale);

      let VEROVIO_OPTIONS_2 = { // TEMP - should use the one above
        pageHeight: 3000,
        pageWidth: 2500, // this just seems to clip; doesn't actually effect notation layouot
        // scale: 33, // 10 => 300 px wide; 20 => 600 px wide
        // scale: scale,
        // ignoreLayout: 1,
        adjustPageHeight: 1
      // adjustPageHeight: true
      };

      verovioToolkit.setOptions(VEROVIO_OPTIONS_2);

      // Merge pages together

      let numberOfPages = verovioToolkit.getPageCount(), 
          pageNumber, 
          svgCode = '';

      const widthRE = /^\s*<svg\s+[^>]*width="(\d+)px"/i,
            heightRE = /^\s*<svg\s+[^>]*height="(\d+)px"/i;

      // Create page containers

      let pageContainers = [];

      let x = document.createElement('div');
      x.classList.add('music-pages');

      for (pageNumber = 1; pageNumber <= numberOfPages; pageNumber++) {
        let pageContainer = document.createElement('div');
        pageContainer.classList.add('music-page');
        pageContainer.innerHTML = '&nbsp;';
        x.appendChild(pageContainer);
        pageContainers.push(pageContainer);
      }

      viewDOM.appendChild(x);

      let smallestScale = Infinity,
          svgCodeForPages = [];

      // Generate SVG code, calculate scale for each page

      pageContainers.forEach((pageContainer, pageNumber) => {

        let pageContainerWidth = pageContainer.offsetWidth,
          pageSvgCode = verovioToolkit.renderPage(pageNumber + 1),
          svgWidth = (widthRE.exec(pageSvgCode))[1],
          // scale = (pageContainerWidth / svgWidth);
          scale = (pageContainerWidth / svgWidth)*1.15; // (CB) I made the scale slightly larger so I can make the verse text larger

        if (scale < smallestScale) smallestScale = scale;

        svgCodeForPages.push(pageSvgCode);
      });

      // Add a transform property to the SVG to scale it to fit the containing div
      //  then attach page div to DOM

      pageContainers.forEach((pageContainer, pageIndex) => { // (CB) This results in very different layout in Chrome vs. Safari/Firefox

        let scaledPageSvgCode, svgHeight;

        scaledPageSvgCode = svgCodeForPages[pageIndex].replace(
          /^<svg\s+/, 
          `<svg transform-origin="0 0" transform="scale(${smallestScale})" ` 
        );

        svgHeight = (heightRE.exec(scaledPageSvgCode))[1] * smallestScale;

        pageContainer.style.height = svgHeight;
        pageContainer.innerHTML = scaledPageSvgCode;
      });

      // Fill with music SVG
/*
      for (pageNumber = 1; pageNumber <= numberOfPages; pageNumber++) {
        let pageSvgCode = verovioToolkit.renderPage(pageNumber),
          svgWidth = (widthRE.exec(pageSvgCode))[1],
          scale = (pageWidth / 2) ;
        svgCode += `<div class="music-page">${verovioToolkit.renderPage(pageNumber)}</div>`;
      }

      svgCode = `<div class="music-pages">${svgCode}</div>`;
*/
/* 
      svgCode = `<svg xmlns="http://www.w3.org/2000/svg" width="12000" height="4000" 
                  transform-origin="0 0" transform="scale(1.5)">
                  ${svgCode}</svg>`; */
      
      // viewContainer.innerHtml = svgCode;



      // viewContainer.
      // viewContainer.html(verovioToolkit.renderData(1) + );
    }
    
    function update(timeInMilliseconds) {

      // Turn off currently highlighted notes
      
      highlightedNotes.forEach(
        // (note) => note.attr('fill', '#000').attr('stroke', '#000')
        note => note.classList.remove(HIGHLIGHTED_NOTE_CLASSNAME)
      );
      
      // Highlight notes
      
      highlightedNotes = [];
      
      verovioToolkit.getElementsAtTime(timeInMilliseconds).notes.forEach(
        (note) => {
          let highLightedNote = document.getElementById(note);
          highLightedNote.classList.add(HIGHLIGHTED_NOTE_CLASSNAME);
          highlightedNotes.push(highLightedNote);
        }
      );
    }
    
    function onMuteChange(muteStatus) {
      
      // TODO: THIS SHOULD BE HANDLED BY CSS
      
      console.log("MUTE CHANGE FOR CMN");

      muteStatus.forEach((mute, index) => {
        $('.measure .staff:nth-of-type(' + (index + 1) + ')')
          .attr('opacity', mute ? '0.2': '1.0');
        $('.measure .barLineAttr path:nth-of-type(' + (index + 1) + ')')
          .attr('opacity', mute ? '0.2': '1.0');
      })
      
      // For each 
      //  Gray out 
      //  $('.measure .staff:nth-of-type(2)').attr('opacity','0.2');
      //  Gray out bar lines
      //  $('.measure .barLineAttr path:nth-of-type(2)').attr('opacity', '0.2');
    }
    
    function init() {
      removeFallbackImage();
      window.cmn = render;
    }

    init();
    
    return {
      render: render,
      update: update,
      stop: function () {},
      onMuteChange: onMuteChange
    }
  }
  
  // OBJECT: AUDIO VIEW
  //  The audioview manages multiple audio tracks
  //  It also reads the @data-mp3 attribute for mp3 filenames
  
  function ViewAudio(viewContainer, verovioToolkit) {

    let isPlaying = false,
        tracks = [];
    
    // update() is roughly the idea of a "play audio" function.
    //   IF the audio is already playing, then ignore
    //   IF the audio is not playing, then start it playing
    //     at the timeInMilliseconds
    
    function update(timeInMilliseconds) {
      
      if (!isPlaying) {
        tracks.forEach((track) => track.play(timeInMilliseconds));
        isPlaying = true;
      }
    }
    
    // Stop playing the audio
    
    function stop() {
      console.log("STOP TRACKS");
      tracks.forEach((track) => track.stop());
      isPlaying = false;
    }
    
    // Given the attribute string, returns an array-of-arrays
    //  [tracks][voices]
    
    function getMp3Filenames(mp3FilenameString) {
      
      return mp3FilenameString.split(';') // This should be a regex ...
                              .reduce(function (acc, x) {
                                acc.push(x.split(','))
                                return acc;
                              }, []);
    }
    
    function onMuteChange(muteStatusArray) {
      
      // Bring down volume for tracks
      console.log("MUTE CHANGE FOR AUDIO");
      console.log(muteStatusArray);
      muteStatusArray.forEach((muteStatus, i) => tracks[i].mute(muteStatus));
    }
    
    function init() {
      
      // Load filenames for MP3 files from attribute
      
      let allTrackFilenames = getMp3Filenames(viewContainer.attr(AUDIO_VIZ_MP3_ATTR_NAME));

      // Create objects for each track (main voice + reverb)
      // TODO: implement reverb
      
      tracks = allTrackFilenames.map(getViewAudioTrack);
      console.log(tracks);
      
      // Track object: volume, pan, mute, play, pause, jumpTo

    }
    
    init();
    
    return {
      render: function () {},
      update: update,
      stop: stop,
      onMuteChange: onMuteChange
    }
  }
  
  // OBJECT: AUDIO TRACK
  
  // The track object is responsible for playing and stopping an
  //  audio file for a single vocal part AND its reverb.
  // It also mutes when told
  
  function getViewAudioTrack(trackFilenames) {

    let bufferList, 
        bufferLoader, 
        sources,
        isMuted = false,
        gainNode = null;

    function play(startTimeInMilliseconds) {
      
      // Take each buffer and connect to audio output
      
      sources = bufferList.map((buffer) => {
        
        // Get buffer source node
        
        let source = audioContext.createBufferSource();
        source.buffer = buffer;
        
        // Get gain node
        
        if (!audioContext.createGain)
          audioContext.createGain = audioContext.createGainNode;
        
        gainNode = audioContext.createGain();
        
        // Connect source node to gain node & gain to output
        
        source.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        return source;
      });
      
      /*
      
      sources = bufferList.map((buffer) => {
        let source = audioContext.createBufferSource();
        source.buffer = buffer;
        source.connect(audioContext.destination);
        return source;
      });
      
      */

      // Start audio

      console.log("TRACK IS BEING PLAYED starting at time " + startTimeInMilliseconds);
      // console.log(bufferList);
      sources.forEach((source) => {
        console.log("START SOURCE: ");
        console.log(source.start);
        source.start(startTimeInMilliseconds / 1000);
        // AudioBufferSourceNode.start([when][, offset][, duration]);
      });
    }
    
    // Stop audio
    
    function stop() {
      console.log("TRACK IS BEING STOPPED");
      sources.forEach(source => source.stop(0));
    }

    function finishedLoading(buffers) { 
      bufferList = buffers;
      console.log('Loaded audio files:' + trackFilenames);
      // play(); // TEMP -- for testing
    }
    
    function setGain(gain) {
      console.log("Setting gain to " + gain);
      gainNode.gain.value = gain * gain;
    }    
    
    function mute(muteStatus) {
      isMuted = (muteStatus);
      console.log("TURNING MUTE STATUS TO " + muteStatus);
      setGain(muteStatus ? 0 : 1);
    }

    function init() {
      // Load audio
      bufferLoader = new AudioLoader(audioContext, trackFilenames, finishedLoading);
      bufferLoader.load();        
    }

    init();

    return {
      play: play,
      stop: stop,
      mute: mute
    }
  }
  
  // OBJECT: BUFFERLOADER
  
  // Loads an audio buffer
  // Code from https://www.html5rocks.com/en/tutorials/webaudio/intro/
  
  function AudioLoader(context, urlList, callback) {
    this.context = context;
    this.urlList = urlList;
    this.onload = callback;
    this.bufferList = new Array();
    this.loadCount = 0;
  }

  AudioLoader.prototype.loadBuffer = function(url, index) {
    
    // Load buffer asynchronously
    
    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.responseType = "arraybuffer";

    var loader = this;

    request.onload = function() {
      
      // Asynchronously decode the audio file data in request.response
      
      loader.context.decodeAudioData(
        request.response,
        function(buffer) {
          if (!buffer) {
            alert('error decoding file data: ' + url);
            return;
          }
          loader.bufferList[index] = buffer;
          if (++loader.loadCount == loader.urlList.length)
            loader.onload(loader.bufferList);
        },
        function(error) {
          console.error('decodeAudioData error', error);
        }
      );
    }

    request.onerror = function() {
      alert('AudioLoader: XHR error');
    }

    request.send();
  }

  AudioLoader.prototype.load = function() {
    for (var i = 0; i < this.urlList.length; ++i)
      this.loadBuffer(this.urlList[i], i);
  }
  
  // OBJECT: MODEL
  
  function Model(viewManager) {

    let timerId, startTime;
    
    // "Play" means to schedule updates for views
    // Start time is set to beginning
    
    function play() {
      startTime = new Date().valueOf();
      timerId = setInterval(function(){
        let timePassed = (new Date().valueOf()) - startTime;
        viewManager.update(timePassed);
      }, 100); // TODO - SHOULD NOT BE HARD CODED
    }
    
    // "Stop" means stop the scheduled updates
    //   and tell the ViewManager to stop()
    
    function stop() {
      clearInterval(timerId);
      timerId = undefined;
      viewManager.stop();
    }
    
    function setMute(muteStatus) {
      viewManager.setMute(muteStatus);
    }
    
    return {
      play: play,
      stop: stop,
      setMute: setMute
    };
  }
  
  
  // OBJECT: Controller
  
  function initControllers(containerNode, model, meiData) {

    // Play/pause buttons

    //let playButton = containerNode.find('.atalanta-notation-start'),
    //  pauseButton = containerNode.find('.atalanta-notation-stop');

    let playButton = document.createElement('button'),
      pauseButton =  document.createElement('button');

    playButton.classList.add('atalanta-notation-start');
    pauseButton.classList.add('atalanta-notation-stop');

    playButton.onclick = function () {
      model.play();
      playButton.classList.add('playing');
      pauseButton.classList.add('playing');
    }

    pauseButton.onclick = function () {
      model.stop(); // TODO: not stop but pause
      playButton.classList.remove('playing');
      pauseButton.classList.remove('playing');
    }
    
    // Mute buttons

    // let muteButtons = containerNode.find('.atalanta-notation-mute-track');
    
    // Get mute button text from MEI

    const voiceNameRE = /<staffDef\s+([^>]+\s+)?label="([^"]+)"/gi;
    let staffDefTxt, muteButtonTexts = [];

    while (staffDefTxt = voiceNameRE.exec(meiData)) {
      muteButtonTexts.push(`Play/mute ${staffDefTxt[2]}`);
    }

    let muteButtons = muteButtonTexts.map(muteButtonText => {
      let buttonElem = document.createElement('button');
      buttonElem.classList.add('atalanta-notation-mute-track');
      buttonElem.innerText = muteButtonText;
      return buttonElem;
    });

    // Set up mute button click handlers

    muteButtons.forEach(muteButton => {
      muteButton.onclick = function() {
        this.classList.toggle('mute');
        let muteStatus = muteButtons.map(mb => mb.classList.contains('mute'));
        model.setMute(muteStatus);
      };
    })

    let muteButtonContainer = document.createElement('div');
    muteButtonContainer.classList.add('track-mute');
    muteButtons.forEach(muteButton => muteButtonContainer.appendChild(muteButton));

    // Attach buttons to DOM
    //  TODO: this shouldn't be here in this function - it should return a node

    let transportInterface = document.createElement('div');
    transportInterface.classList.add('transport');
    [playButton, pauseButton, muteButtonContainer].forEach(x => transportInterface.appendChild(x));
    containerNode.prepend(transportInterface); // TODO: Don't need jQuery here ...
  }
  
  
  // Create an audio context
  // TODO: a fallback if WebAudio API not available
  
  function getAudioContext() {
    
    try {
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      return new AudioContext();
    }
    catch(e) {
      console.log('Web Audio API is not supported in this browser');
      return null;
    }
  }
  
  function getMEI(xmlString) {

    let mei = (new DOMParser()).parseFromString(xmlString,'text/xml');

    // Move @xml:id over to @id so that querySelectorAll will work on id's
    // NOT NECESSARY
    /*
    Array.from(mei.querySelectorAll('note')).map((note) => { 
      note.setAttribute('id', note.getAttribute('xml:id')); 
      return note;
    })
    */
    
    return mei;
  }

  // MAIN, UPON PAGE LOAD - identify music component markup in the HTML and instantiate
  
  function initWhenPageLoaded() {
    
    // Check for audio players in the markup.
    //  If exists, create a shared AudioContext
    //  (only need one for whole page)
    
    if ($('.' + AUDIO_VIZ_CLASS_NAME).length)
      audioContext = getAudioContext();
    
    // Find components and initialize each in turn
    
    $('.' + MAIN_CLASS_NAME).each(createMusicComponent);
  }
  
  // MAIN, BEFORE PAGE LOAD
  
  function init() {
    
    // ALSO REMEMBER TO LOAD MP3s RIGHT AWAY (you could also load MEIs as well)
    // TODO
    
    // Register event - call main() when page loaded
    
    document.addEventListener('DOMContentLoaded', initWhenPageLoaded);
    
    window.AudioLoader = AudioLoader; // TEMP FOR DEBUGGING
  }
  

  init();

  
})()