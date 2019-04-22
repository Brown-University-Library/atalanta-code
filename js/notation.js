
/*


  TODO LIST:

  The tempo is being read from the DOM but the tempo is not taking hold
  in terms of what's being returned for timing in Verovio

*/

(function () {

  'use strict';
  
  // GLOBAL CONSTANTS
  // TODO - should be const

  const MAIN_CLASS_NAME = 'ata-music',
    VIZ_CLASS_NAMES = {
      CMN: 'ata-viz-cmn',
      PIANO_ROLL: 'ata-viz-pianoroll',
      AUDIO: 'ata-viz-audio'
    },
    DEFAULT_TEMPO = 56, // If not defined in audio viz element
    VIZ_REFRESH_INTERVAL = 100, // in ms
    AUDIO_VIZ_MP3_ATTR_NAME = 'data-mp3',
    AUDIO_VIZ_TEMPO_ATTR_NAME = 'data-tempo',
    AUDIO_VIZ_TRACK_CLASSNAME = 'ata-audio-track',
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
      pitchScale: 5,
      HILIGHT_CLASS: 'highlighted'
    },
    VISUALIZE_BUTTON_TEXT = 'Show piano roll',
    MULTIPLE_INSTANCES = (document.querySelectorAll(`.${MAIN_CLASS_NAME}`).length > 1),
    IS_EMBLEM = (window.location.href.search('/emblem[^/]+$') !== -1);

  // GLOBALS
  
  var audioContext, 
    verovioToolkit = new verovio.toolkit();

  // UTILITY FUNCTIONS

  // Workaround for Verovio not reading MEI tempo
  //   convert MEI time to Audio-time (in milliseconds)

  function scaleTime(timeInMilliseconds) {
    const TIME_SCALE = TEMPO * 4;
    return timeInMilliseconds * (TIME_SCALE / 60);
  }

  // For the audio player, need to convert back to MS
  // TODO: make this better

  function unscaleTime(scaledTime) {
    const TIME_SCALE = TEMPO * 4;
    return scaledTime / (TIME_SCALE / 60);
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
    
    // Create verovio toolkit object

    function createVerovioObject(meiFileURL) {
      
      // let verovioToolkit = new verovio.toolkit();

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
            console.log(meiData);
            verovioToolkit.loadData(meiData);
            
            // Convert to MIDI to get timing info
            
            verovioToolkit.renderToMidi();
            // verovioToolkit.renderToMIDI();
            
            // Create views, model, controllers
            
            let viewManager = ViewManager(containerNode, verovioToolkit),
                model = Model(viewManager, verovioToolkit);
            
            // Controller for main window

            initControllers(containerNode, model, meiData);
            
            // Controller for modals

            let modalContainers = containerNode.find('.modal');

            if (modalContainers.length) {
              initControllers(modalContainers, model, meiData);
            }

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
      createVerovioObject(meiFileURL); // TODO: this actually loads all the views, etc. Very confusing!
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

      const VIZ_SELECTOR = Object.keys(VIZ_CLASS_NAMES)
        .map(vizClassName => '.' + VIZ_CLASS_NAMES[vizClassName])
        .join(', ');

      containerNode.find(VIZ_SELECTOR).each(function () {
        let viewContainer = $(this);

        if (viewContainer.hasClass(VIZ_CLASS_NAMES.CMN)) {
          views.push(ViewCMN(viewContainer, verovioToolkit));
        } else if (viewContainer.hasClass(VIZ_CLASS_NAMES.AUDIO)) {
          views.push(ViewAudio(viewContainer));
        } else if (viewContainer.hasClass(VIZ_CLASS_NAMES.PIANO_ROLL)) {
          views.push(ViewPianoRoll(viewContainer, verovioToolkit));
        } // ADD MORE VIEWS HERE AS THEY ARE CREATED
      });

      return views;
    }
    
    function renderAllViews() {
      views.forEach(view => view.render());
    }

    function updateAllViews(timeInMilliseconds) {

      let timeAdjustedForTempo = scaleTime(timeInMilliseconds);

      views.forEach(function(view) {
        // view.update(timeInMilliseconds);
        view.update(timeAdjustedForTempo); // KLUDGE
      });
    }
    
    function stopAllViews() {
      views.forEach(view => view.stop())
    }
    
    function setMute(muteStatus) {
      console.log("MUTE CHANGE FOR ALL VIEWS");
      views.forEach(view => view.onMuteChange(muteStatus));
    }

    function getDuration() {

      let viewWithDuration = views.find(
        view => view.getDuration !== undefined
      );

      return viewWithDuration !== undefined 
        ? viewWithDuration.getDuration()
        : Number.POSITIVE_INFINITY;
    }
    
    function init() {
      views = createViews();
      renderAllViews();      
    }
    
    init();

    return {
      update: updateAllViews,
      stop: stopAllViews,
      setMute: setMute,
      getDuration: getDuration
    };
  }
  
  // OBJECT: PIANO ROLL VIEW

  function ViewPianoRoll(viewContainer, verovioToolkit) {

    const VIZ_INSTANCE_ID = Math.floor(Math.random() * 10000),
        rectId = 'note-rect-' + VIZ_INSTANCE_ID;
    
    let noteInfo = getNoteInfo(verovioToolkit),
        highlightedNotes = [];

    // Given a note ID, return a unique version for this viz

    function getLocalNoteID(noteId) {
      return `${noteId}-pianoroll-${VIZ_INSTANCE_ID}`;
    }

    // Get information on each note in turn from MEI
    // Return a data object with notes, min/max pitches, last note time

    function getNoteInfo(verovioToolkit) {

      let mei = getMEI(verovioToolkit.getMEI()),
          meiNotes = Array.from(mei.querySelectorAll('note')),
          notes = [], 
          maxPitch = 0, 
          minPitch = Number.POSITIVE_INFINITY, 
          lastNoteTime = 0;

      meiNotes.forEach(meiNote => {

        let [dur, id, pitch] = ['dur', 'xml:id', 'pnum'].map(a => meiNote.getAttribute(a)),
            startTime = scaleTime(verovioToolkit.getTimeForElement(id));

        if (dur === 'long') dur = 0.5; // If note duration marked 'long', make it 8 beats
        let durTime = beatsToMilliseconds((1 / dur) * 4); // 1/4 note = 1 beat

        // Get voice number from staff position

        let ancestor = meiNote;

        do { 
          ancestor = ancestor.parentElement 
        } while (ancestor !== null && ancestor.nodeName !== 'staff');

        let voiceNumber = (ancestor !== null && ancestor.getAttribute('n') !== null) 
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

      let getSvg = elem => document.createElementNS('http://www.w3.org/2000/svg', elem);

      // Create root svg element

      function getSvgElement() {

        let svg = getSvg('svg');
        svg.setAttribute('width', '100%');
        svg.setAttribute('height', '100%');
        
        // Set up SVG defs
  
        const rectDef = getSvg('rect'),
          defs = getSvg('defs');
  
        rectDef.setAttribute('class', 'note');
        rectDef.setAttribute('id', rectId);
        rectDef.setAttribute('height', PIANO_ROLL_OPTIONS.barHeight);
        defs.appendChild(rectDef);
        svg.appendChild(defs);

        return svg;
      }

      // Create transport bar - TODO: UNUSED

      function getTransportBar() {
        const b = document.createElement('button');
        b.innerText = 'PRESS';
        return b;
      }

      // Create note bars (color strips)

      function makeBarFromMeiNote(note, noteInfo) {

        let rect = getSvg('rect'),
            scaleTimeForDisplay = t => t / 200;
  
        rect.setAttribute('class', 'note');
        rect.setAttribute('width', scaleTimeForDisplay(note.dur));
        rect.setAttribute('height', PIANO_ROLL_OPTIONS.barHeight);
        rect.setAttribute('x', scaleTimeForDisplay(note.startTime));
        rect.setAttribute('y', (noteInfo.maxPitch - note.pitch) * PIANO_ROLL_OPTIONS.pitchScale);
        rect.setAttribute('id', getLocalNoteID(note.id));

        return rect;
      }

      let svg = getSvgElement();

      // Collect an array of arrays of SVG rectanges by voice

      let svgRectanglesByVoice = noteInfo.notes.reduce((voices, note) => {
        voices[note.voiceNumber].push(makeBarFromMeiNote(note, noteInfo));
        return voices;
      }, [[],[],[],[]]);

      // Create a <g> for each voice, and put SVG rectanges into it

      svgRectanglesByVoice.map((voice, voiceNumber) => { 
        let voiceSvgGroup = getSvg('g');
        voiceSvgGroup.setAttribute('class', `voice-${voiceNumber}`);
        voice.forEach(note => voiceSvgGroup.appendChild(note));
        svg.appendChild(voiceSvgGroup);
      });

      // Attach the transport bar and SVG to container
      // TODO: currently not using local getTransportBar() function

      const viewContainerNode = viewContainer.get(0);
      // viewContainerNode.appendChild(getTransportBar());
      viewContainerNode.appendChild(svg);
    }

    function centerPianoRollOn(svgRect) {

      const svg = svgRect.closest('svg'),
        viewBoxWidth = 500,
        viewBoxHeight = viewBoxWidth,
        viewBoxHorizCenter = viewBoxWidth / 2,
        xCoord = svgRect.getBBox().x,
        xOffset = viewBoxHorizCenter - xCoord;
/*
      svg.setAttribute(
        'viewBox', 
        `${xOffset} 0 ${viewBoxWidth} ${viewBoxHeight}`
      ); */

      Array.from(svg.querySelectorAll('g')).forEach(
        voiceGroup => voiceGroup.setAttribute(
          'transform',
          `translate(${xOffset} 0)`
        )
      );
    }


    function update(timeInMilliseconds) {

      // Turn off currently highlighted notes
      
      highlightedNotes.forEach(
        note => note.classList.remove(PIANO_ROLL_OPTIONS.HILIGHT_CLASS)
      );
      
      highlightedNotes = [];
      let rightMostNote;
      
      verovioToolkit.getElementsAtTime(timeInMilliseconds).notes.forEach(
        note => {
          let highLightedNote = document.getElementById(getLocalNoteID(note));

          if (highLightedNote !== null) {
            highLightedNote.classList.add(PIANO_ROLL_OPTIONS.HILIGHT_CLASS);
            highlightedNotes.push(highLightedNote);

            if (rightMostNote === undefined) {
              rightMostNote = highLightedNote
            }
  
            const highLightedNoteX = highLightedNote.getBBox().x,
              currRightMostNoteX = rightMostNote.getBBox().x;
  
            if (highLightedNoteX > currRightMostNoteX) {
              rightMostNote = highLightedNote;
            }
          }
        }
      );

      if (rightMostNote != undefined) {
        centerPianoRollOn(rightMostNote);
      }
    }



    return {
      render: render,
      update: update,
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
        pageWidth: 2500, // this just seems to clip; doesn't actually effect notation layout
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

      // Regular expressions to extract the width/height
      //  generated by Verovio

      const widthRE = /^\s*<svg\s+[^>]*width="([\d\.]+)px"/i,
            heightRE = /^\s*<svg\s+[^>]*height="([\d\.]+)px"/i;

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
      //  and keep track of the smallest scale overall

      pageContainers.forEach((pageContainer, pageNumber) => {

        let pageContainerWidth = pageContainer.offsetWidth,
          pageSvgCode = verovioToolkit.renderPage(pageNumber + 1);
          //pageSvgCode = verovioToolkit.renderToSVG(pageNumber + 1);

        console.log(pageSvgCode);

        let svgWidth = (widthRE.exec(pageSvgCode))[1],
          scale = (pageContainerWidth / svgWidth);



        if (scale < smallestScale) smallestScale = scale;

        svgCodeForPages.push(pageSvgCode);
      });

      // Add a transform property to the SVG to scale it to fit the containing div
      //  then attach page div to DOM

      const CRYSTALS_CONSTANT = 1.15; // Crystal wants the notation a little bit bigger...

      pageContainers.forEach((pageContainer, pageIndex) => {

        let scaledPageSvgCode, svgHeight;

        // TODO: Why is the next statement necessary? Why do we need to scale by 1?
        // (it becomes very small otherwise)

        scaledPageSvgCode = svgCodeForPages[pageIndex].replace(
          /^<svg\s+/, 
          // `<svg transform-origin="0 0" transform="scale(${smallestScale})" ` 
          // `<svg transform-origin="0 0" transform="scale(${smallestScale * CRYSTALS_CONSTANT})" ` 
          `<svg transform-origin="0 0" transform="scale(1)" ` // Not sure why this is necessary
        );

        // scaledPageSvgCode = svgCodeForPages[pageIndex]; // ONLY USE IF ABOVE IS COMMENTED OUT

        svgHeight = (heightRE.exec(scaledPageSvgCode))[1] * smallestScale;

        pageContainer.style.height = svgHeight;


        // TEMP - START - TODO: Clean this up if it works

        let width = (widthRE.exec(scaledPageSvgCode))[1],
            height = (heightRE.exec(scaledPageSvgCode))[1];

        // Get rid of width and height attributes

        scaledPageSvgCode = scaledPageSvgCode
          .replace(/^\s*(<svg[^>]+)\s+(?:width)\s*=\s*"[^"]*"/i, '$1')
          .replace(/^\s*(<svg[^>]+)\s+(?:height)\s*=\s*"[^"]*"/i, '$1');

        // Add viewBox attribute
        // viewBox="0 0 w h"

        scaledPageSvgCode = scaledPageSvgCode.replace(
          /^\s*<svg\s/i,
          `<svg viewBox="0 0 ${width} ${height}" `
        )

        // TEMP - END


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
        note => note.classList.remove(HIGHLIGHTED_NOTE_CLASSNAME)
      );

      // Get new highighted notes and put a classname on them

      highlightedNotes = [];
      console.log(timeInMilliseconds);
      window.VVV = verovioToolkit;
      verovioToolkit.getElementsAtTime(timeInMilliseconds).notes.forEach(
        noteId => {
          console.log(noteId);
          let highLightedNote = document.getElementById(noteId);
          highLightedNote.classList.add(HIGHLIGHTED_NOTE_CLASSNAME);
          highlightedNotes.push(highLightedNote);
        }
      );
    }
    
    function onMuteChange(muteStatus) {
      
      // TODO: THIS SHOULD BE HANDLED BY CSS
      
      muteStatus.forEach((mute, index) => {
        viewContainer.find('.measure .staff:nth-of-type(' + (index + 1) + ')')
          .attr('opacity', mute ? '0.2': '1.0');
        viewContainer.find('.measure .barLineAttr path:nth-of-type(' + (index + 1) + ')')
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
        console.log(`***************** AUDIO time ${unscaleTime(timeInMilliseconds)}`);
        let unscaledTime = unscaleTime(timeInMilliseconds);
        // tracks.forEach((track) => track.play(timeInMilliseconds));
        tracks.forEach((track) => track.play(unscaledTime));
        isPlaying = true;
      }
    }
    
    // Stop playing the audio
    
    function stop() {
      console.log("STOP TRACKS");
      tracks.forEach(track => track.stop());
      isPlaying = false;
    }
    
    // Given the attribute string, returns an array-of-arrays
    //  [tracks][voices]
    // DEFUNCT

    function getMp3Filenames_DEFUNCT(mp3FilenameString) {
      
      return mp3FilenameString.split(';') // This should be a regex ...
                              .reduce(function (acc, x) {
                                acc.push(x.split(','))
                                return acc;
                              }, []);
    }

    // Get information about an audio track from the markup

    function getTrackInfo(containerNode) {

      let trackInfo = [];

      const trackDomElements = Array.from(
        containerNode.getElementsByClassName(AUDIO_VIZ_TRACK_CLASSNAME)
      );

      trackDomElements.forEach(trackNode => {
        let data = trackNode.dataset;
        trackInfo.push([
          {
            type: 'main',
            filename: data.mp3,
            pan: parseFloat(data.pan) || 0,
            gain: parseFloat(data.gain) || 1,
          },
          {
            type: 'reverb',
            filename: data.reverbMp3,
            pan: 0,
            gain: parseFloat(data.reverbGain) || 1,
          }
        ]);
      });
      
      return trackInfo;
    }
    
    function onMuteChange(muteStatusArray) {
      
      // Bring down volume for tracks
      console.log("MUTE CHANGE FOR AUDIO");
      console.log(muteStatusArray);
      muteStatusArray.forEach((muteStatus, i) => tracks[i].mute(muteStatus));
    }

    function getLongestDuration() {
      let duration;
      let longestDuration = tracks.reduce((longestDuration, track) => {
        duration = track.getDuration();
        return duration > longestDuration ? duration : longestDuration;
      }, 0);

      return longestDuration;
    }
    
    function init() {

      // Get track info from markup (MP3 filename, gain, pan, etc.)

      let tracksInfo = getTrackInfo(viewContainer[0]);      

      // Using tracksInfo, create track objects

      tracks = tracksInfo.map(getViewAudioTrack);
      console.log(tracks);
      
      // Track object: volume, pan, mute, play, pause, jumpTo

    }
    
    init();
    
    return {
      render: function () {},
      update: update,
      stop: stop,
      onMuteChange: onMuteChange,
      getDuration: getLongestDuration
    }
  }
  
  // OBJECT: AUDIO TRACK
  
  // The track object is responsible for playing and stopping an
  //  audio file for a single vocal part AND its reverb.
  // It also mutes when told
  // The AudioTrack object is only owned and used by the Audio View
  
  function getViewAudioTrack(trackInfo) {

   console.log("TRACKINFO");
   console.log(trackInfo);

    let sounds = { main: {}, reverb: {} }; // Initialized in init()

    let bufferList, // A list of audio buffers (i.e. sound files)
        sources, // A list of sound sources which are hooked up to audio graphs
        gainNodes = [], // Array of gain nodes (main and reverb)
        isMuted = false;

    // play() takes the buffers (audio sources) and 
    //  creates an audio graph out of each
    // This is a method common to all Views
    // The start time in MS

    function play(startTimeInMilliseconds) {
      
      // Take each buffer and connect to audio output
      
      sources = bufferList.map((buffer, index) => {
        
        // Get buffer source node
        
        let source = audioContext.createBufferSource();
        source.buffer = buffer;

        let gainNode = audioContext.createGain();
        gainNode.gain.value = trackInfo[index].gain;
        gainNodes.push(gainNode);

        let panNode = audioContext.createStereoPanner();
        panNode.pan.value = trackInfo[index].pan;
        
        // Connect source node to gain node & gain to output
        
        source.connect(gainNode);
        gainNode.connect(panNode);
        panNode.connect(audioContext.destination)
        // gainNode.connect(audioContext.destination);
        
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
      sources.forEach(source => {
        console.log("START SOURCE: ");
        console.log(source.start);
        console.log(`IS MUTED = ${isMuted}`);
        source.start(0, startTimeInMilliseconds / 1000);
        mute(!isMuted);
        // AudioBufferSourceNode.start([when][, offset][, duration]);
      });
    }
    
    // Stop audio
    
    function stop() {
      console.log("TRACK IS BEING STOPPED");
      sources.forEach(source => source.stop(0));
    }

    function setGain(gain) {
      console.log("Setting gain to " + gain);
      gainNodes.forEach(
        gainNode => gainNode.gain.value = gain * gain
      );
      // gainNode.gain.value = gain * gain;
    }
    
    // Won't ever change in mid-play - so maybe 
    //  not necessary as a stand-alone function

    function setPan(pan) {
      console.log("Setting pan to " + pan);
      // panNode.gain.value = pan; THIS NEEDS TO BE IMPLEMENTED
    }
    
    function mute(muteStatus) {
      isMuted = (muteStatus);
      console.log("TURNING MUTE STATUS TO " + muteStatus);
      setGain(muteStatus ? 0 : 1);
    }

    // Find the longest duration of the buffers

    function getLongestDuration() {

      let longestDuration = bufferList.reduce((longestDuration, buffer) => {
        return buffer.duration > longestDuration ? buffer.duration : longestDuration
      }, 0);

      return longestDuration * 1000; // Convert to ms
    }

    function init2(trackInfo) {

      if (trackInfo.mainFilename !== undefined) {
        sounds.main = {

        }
      }

      sounds.reverb = {

      }
    }

    function init(trackInfo) {

      // Create list of filenames for audio files (can't be undefined)

      let trackFilenames = trackInfo.map(track => track.filename);

      //let trackFilenames = [trackInfo.mainFilename, trackInfo.reverbFilename].filter(
      //  filename => filename !== undefined
      //);

      function onFinishedLoading(buffers) { 
        bufferList = buffers;
        console.log('Loaded audio files:' + trackFilenames);
      }

      // Load audio and call onFinishedLoading()

      getAudioFromFilenames(audioContext, trackFilenames, onFinishedLoading);

      //let bufferLoader = new AudioLoader(audioContext, trackFilenames, onFinishedLoading);
      //bufferLoader.load();        
    }

    init(trackInfo);

    return {
      play: play,
      stop: stop,
      mute: mute,
      getDuration: getLongestDuration
    }
  }
  
  // BUFFERLOADER 2

  function getAudioFromFilenames(audioContext, audioFilenames, onFinishedLoading) {

    let loadedCount = 0,
        bufferList = [];

    function endIfAllURLsResolved() {
      loadedCount++;
      if (loadedCount === audioFilenames.length - 1) {
        onFinishedLoading(bufferList);
      }
    }

    // Decode a file buffer into audio

    function convertToAudioData(fileContents, bufferIndex) {

      // If the decoding succeeds

      function onDecodingSuccess(buffer) {
        if (buffer) {
          bufferList[bufferIndex] = buffer;
        } else {
          onDecodingError('unknown');
        }

        endIfAllURLsResolved();
      }

      // If the decoding doesn't succeed

      function onDecodingError(error) {
        console.error('decodeAudioData error', error);
      }

      // Do the decoding

      audioContext.decodeAudioData(fileContents, onDecodingSuccess, onDecodingError);
    }

    // Given a filename, do an HTTP request for the (binary) file contents 
    //  and then pass it to decodeAudioData() to convert it into audio data

    function loadBuffer(audioFilename, bufferIndex) {
    
      let request = new XMLHttpRequest();

      request.open('GET', audioFilename, true);
      request.responseType = 'arraybuffer';

      request.onload = function () {
        let fileContents = request.response;
        convertToAudioData(fileContents, bufferIndex);
      }

      request.onerror = function() {
        console.log('XHR error loading ' + audioFilename);
      }

      request.send();
    }

    // Save a null audio buffer

    function loadNullBuffer(bufferIndex) {
      bufferList[bufferIndex] = null;
      endIfAllURLsResolved();
    }

    // Given a URL, resolve it

    function resolveURL(audioFilename, bufferIndex) {
      if (audioFilename !== undefined) {
        loadBuffer(audioFilename, bufferIndex);
      } else {
        loadNullBuffer(bufferIndex);
      }
    }

    // Resolve all URLs

    audioFilenames.forEach(resolveURL);
  }


  // OBJECT: BUFFERLOADER
  
  // Given an array of filenames, loads them into buffers and calls
  //   onFinishedLoading(bufferList)
  // Code from https://www.html5rocks.com/en/tutorials/webaudio/intro/
  // TODO: rewrite this
  
  function AudioLoader(audioContext, trackFilenames, onFinishedLoading) {
    this.context = audioContext;
    this.urlList = trackFilenames;
    this.onload = onFinishedLoading;
    this.bufferList = new Array();
    this.loadCount = 0;
  }

  AudioLoader.prototype.loadBuffer = function(url, index) {
    
    // If filename is undefined, set this buffer entry to null
    // (which will represent audio silence -- 
    // see https://developer.mozilla.org/en-US/docs/Web/API/AudioBufferSourceNode/buffer)

    if (url === undefined) {
      this.bufferList.push(null);

      // If the last URL, call the callback

      if (++loader.loadCount == loader.urlList.length)
        loader.onload(loader.bufferList);
    }

    // Load buffer asynchronously
    
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';

    var loader = this;

    request.onload = function() {
      
      // Asynchronously decode the audio file data in request.response
      
      loader.context.decodeAudioData(
        request.response,
        function(buffer) {
          if (!buffer) {
            console.log('Error decoding file data: ' + url);
            return;
          }
          loader.bufferList[index] = buffer;

          // If the last URL, call the callback

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

  // Load all the URLs

  AudioLoader.prototype.load = function() {
    for (var i = 0; i < this.urlList.length; ++i)
      this.loadBuffer(this.urlList[i], i);
  }
  
  // OBJECT: MODEL
  
  function Model(viewManager, verovioToolkit) {

    let timerId, startTime, 
      pauseTimePassed = 0,
      functionsToCallOnReset = [],
      mei = verovioToolkit.getMEI();
    
    // "Play" means to schedule updates for views
    // Start time is set to beginning
    
    function play() {

      // If more than one music section on the page
      //  then you need to create a new verovio instance
      //  (verovio only allows one instance at a time)

      if (MULTIPLE_INSTANCES) {
        verovioToolkit = new verovio.toolkit();
        verovioToolkit.loadData(mei);
        verovioToolkit.renderToMidi();
      }

      let maxDuration = viewManager.getDuration();

      startTime = (new Date().valueOf()) - pauseTimePassed;

      function updateTicker() {

        let timePassed = (new Date().valueOf()) - startTime;

        // If time has passed the duration of the longest audio
        //   clip, then rewind and stop

        if (timePassed < maxDuration) {
          viewManager.update(timePassed);
        } else {
          reset();
        }
      }

      timerId = setInterval(updateTicker, VIZ_REFRESH_INTERVAL);
    }
    
    // "Stop" means stop the scheduled updates
    //   and tell the ViewManager to stop()
    
    function stop() {
      clearInterval(timerId);
      timerId = undefined;
      pauseTimePassed = (new Date().valueOf()) - startTime;
      console.log(`Pausing at ${pauseTimePassed}`);
      viewManager.stop();
    }

    // "Reset" means to stop and rewind to beginning

    function reset() {
      stop();
      pauseTimePassed = 0;
      functionsToCallOnReset.forEach(f => f());
    }

    function callOnReset(func) {
      functionsToCallOnReset.push(func);
    }
    
    function setMute(muteStatus) {
      viewManager.setMute(muteStatus);
    }
    
    return {
      play: play,
      stop: stop,
      setMute: setMute,
      callOnReset: callOnReset
    };
  }
  
  
  // OBJECT: Controller (transport UI)
  // meiData is passed for the voice names
  
  function initControllers(containerNode, model, meiData) {

    // Play/pause buttons

    //let playButton = containerNode.find('.atalanta-notation-start'),
    //  pauseButton = containerNode.find('.atalanta-notation-stop');

    let playButton = document.createElement('button'),
      pauseButton =  document.createElement('button');

    playButton.classList.add('atalanta-notation-start'); // TODO: should not be a magic value
    pauseButton.classList.add('atalanta-notation-stop'); // TODO: should not be a magic value
    playButton.innerHTML = '<div class="play-btn__icon"></div><div class="play-btn__label">Play</div>'; //CB create label for play button
    pauseButton.innerHTML = '<div class="pause-btn__icon"></div><div class="pause-btn__label">Pause</div>'; //CB create label for pause button

    playButton.onclick = function () {
      model.play();
      playButton.classList.add('playing'); // TODO: should not be a magic value
      pauseButton.classList.add('playing'); // TODO: should not be a magic value
    }

    pauseButton.onclick = function () {
      model.stop(); // TODO: not stop but pause
      playButton.classList.remove('playing'); // TODO: should not be a magic value
      pauseButton.classList.remove('playing'); // TODO: should not be a magic value
    }

    // Tell Model what to do if reset 
    // (i.e. when the audio runs out)

    model.callOnReset(function () {
      playButton.classList.remove('playing'); // TODO: should not be a magic value
      pauseButton.classList.remove('playing'); // TODO: should not be a magic value
    });
    
    // Mute buttons

    // let muteButtons = containerNode.find('.atalanta-notation-mute-track');
    
    // Get mute button text from MEI

    const voiceNameRE = /<staffDef\s+([^>]+\s+)?label="([^"]+)"/gi;
    let staffDefTxt, muteButtonTexts = [];

    while (staffDefTxt = voiceNameRE.exec(meiData)) {
      muteButtonTexts.push(`Hear/mute ${staffDefTxt[2]}`); //CB change from "play" to "hear"
    }

    let muteButtons = muteButtonTexts.map(muteButtonText => {
      let buttonElem = document.createElement('button');
      buttonElem.classList.add('atalanta-notation-mute-track'); // TODO: should not be a magic value
      buttonElem.innerHTML = '<div class="mute-btn__icon"></div><div class="mute-btn__label">' + muteButtonText + '</div>'; //CB separate icon and label
      return buttonElem;
    });

    // Set up mute button click handlers

    muteButtons.forEach(muteButton => {
      muteButton.onclick = function() {
        this.classList.toggle('mute'); // TODO: should not be a magic value
        let muteStatus = muteButtons.map(mb => mb.classList.contains('mute')); // TODO: should not be a magic value
        model.setMute(muteStatus);
      };
    })

    let muteButtonContainer = document.createElement('div');
    muteButtonContainer.classList.add('track-mute'); // TODO: should not be a magic value

    // Only attach mute buttons if more than one voice
    // TODO: shouldn't generate mute buttons if not needed

    if (muteButtons.length > 1) {
      muteButtons.forEach(muteButton => muteButtonContainer.appendChild(muteButton));
    }

    // Attach buttons to DOM
    //  TODO: this shouldn't be here in this function - it should return a node

    let transportInterface = document.createElement('div');
    transportInterface.classList.add('transport'); // TODO: should not be a magic value
    [playButton, pauseButton, muteButtonContainer].forEach(but => transportInterface.appendChild(but));

    // Popup button for modal
    // TODO: THIS IS A KLUDGE -- FIX ME

    let containerNodeAsDOM = containerNode[0],
      modalTargets = containerNodeAsDOM.querySelectorAll('.modal');

    if (modalTargets.length > 0) {

      let target = modalTargets[0],
       targetId = 'x' + Math.floor(Math.random() * 1000);

      target.setAttribute('id', targetId);

      let modalViewLink = document.createElement('div');
      modalViewLink.classList.add('atalanta-notation__switch'); // TODO: should not be a magic value
      //CB adding an element for the piano roll icon
      modalViewLink.innerHTML = `<a href="#${targetId}" data-lity><div class="piano-roll__icon"></div><div class="piano-roll__label">${VISUALIZE_BUTTON_TEXT}</div></a>`; // TODO: should not be a magic value
      transportInterface.appendChild(modalViewLink);
    }

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
    
    // TODO: COMPLETELY TEMP - move to audio view initialization code
    // TODO: This area assumes the possibility of multiple music
    //  components on the page, each of which could have their own tempo.
    //  BUT This code assumes only one tempo -- NEED TO CHANGE

    let audioNode = document.getElementsByClassName(VIZ_CLASS_NAMES.AUDIO);
    if (audioNode && audioNode[0].hasAttribute(AUDIO_VIZ_TEMPO_ATTR_NAME)) {
      window.TEMPO = parseFloat(audioNode[0].getAttribute(AUDIO_VIZ_TEMPO_ATTR_NAME));
    } else {
      window.TEMPO = DEFAULT_TEMPO;
    }

    /* OLD
    window.TEMPO = parseInt(
      document.getElementsByClassName(VIZ_CLASS_NAMES.AUDIO)[0]
      .getAttribute(AUDIO_VIZ_TEMPO_ATTR_NAME)
    ); */

    // Check for audio players in the markup.
    //  If exists, create a shared AudioContext
    //  (only need one for whole page)
    
    if ($('.' + VIZ_CLASS_NAMES.AUDIO).length) {
      audioContext = getAudioContext();

      // Polfill for StereoPannerNode (for Safari) from
      // https://github.com/mohayonao/stereo-panner-node/

      if (!audioContext.createStereoPanner) {
        StereoPannerNode.polyfill();
      }

      if (!audioContext.createGain) {
        audioContext.createGain = audioContext.createGainNode;
      }
    }

    // Look for modals and if they exist add lity-hide class

    $('.modal').addClass('lity-hide'); // TODO: No magic values!!
    
    // Find Components and initialize each in turn
    
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