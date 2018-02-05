
/* 
 * TO DO LIST
 * 
 * - Put timing into HTML code (attribute of SVG element? cds:timing="m-32:432 m-36:8675")
 * - cds namespace
 * 
 * 
 */

(function () {

  var NOTATION_ROOT_CLASSNAME = 'cds-playable-music',
      AUDIO_HREF_ATTR_NAME = 'cds:audio-href',
      TIMING_ATTR_NAME = 'cds:timing',
      controller, 
      svgRoot;

  svgRoot = document.getElementsByClassName(NOTATION_ROOT_CLASSNAME)[0];

  // console.log(getInformationFromHTML($(svgRoot)));

  controller = getController(svgRoot.getAttribute('id'));
  window.controller = controller; // TEMP

  controller.start();
  
  // CONTROLLER OBJECT
  // Main application -- creates all the other objects
  
  function getController(svgId) {
  
    var schedule, cursor, audioPlayer, startTime;
    
  /*
    var schedule = getSchedule(),
        cursor = getCursor($('#' + svgId)),
        audioPlayer = getAudioPlayer('music.mp3'),
        startTime = 0; 

    cursor.init(schedule);
    window.schedule = schedule;
     

  */
    
    function start() {
      audioPlayer.start();
      cursor.start(schedule, startTime); 
    }
    
    function pause() {
    
      // Get time from audio object & pause
      startTime = audioPlayer.currentTime();
      audioPlayer.pause();
      
      // Stop cursor animation
      cursor.pause();
    }
    
    function getConfigDataFromHTML($svgRoot) {
      return {
        $root: $svgRoot,
        audioFileHref: $svgRoot.attr(AUDIO_HREF_ATTR_NAME),
        scheduleDataString:  $svgRoot.attr(TIMING_ATTR_NAME)
      }
    }
     
    function init(svgRoot) {
    
      var configData = getConfigDataFromHTML($(svgRoot));
      console.log(configData); // TEMP

      schedule = getSchedule(configData);
      cursor = getCursor(configData);
      audioPlayer = getAudioPlayer(configData);
      
      startTime = 0;
      
      cursor.init(schedule); // this isn't necessary -- see initializeCursorDimensions
       // initializeCursorDimensions() can be set upon start(sch)
       // The cursor can be hidden prior to start()
      
    }
    
    init(svgRoot);
    
    window.iii = init;
    
    return {
      start: start,
      pause: pause
    }
  }
  
  // TAPE DECK CONTROLS
 
  function getPlayControlsUI() {
    return {}
  }
  
  // AUDIO PLAYER
  
  function getAudioPlayer(configData) {
  
    var s = new Audio(configData.audioFileHref);

    return {
      getSurrentTime: function () { return s.currentTime },
      setSurrentTime: function (t) { s.currentTime = t },
      start: function () { s.play() },
      pause: function () { s.pause() }
    }
  }
  
  // FOLLOW-ALONG CURSOR
  
  function getCursor(configData) {
    
    var $cursor, cursorNodeDOM, svgClientRect, $svgRoot;
    
    $svgRoot = configData.$root;
    
    // Client coordinates of overall SVG
    
    svgClientRect = $svgRoot[0].getBoundingClientRect();
    
    // Create cursor in DOM
    
    cursorNodeDOM = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    
    cursorNodeDOM.setAttribute('fill', '#r00');
    cursorNodeDOM.setAttribute('width', '10');
    cursorNodeDOM.setAttribute('height', '500');
    cursorNodeDOM.setAttribute('x', '500');
    cursorNodeDOM.setAttribute('class', 'music-cursor');

    cursorNodeDOM.setAttribute('y', '500');
    
    // $svgRoot.find('.page-margin')[0].appendChild(cursorNodeDOM);
    $svgRoot[0].appendChild(cursorNodeDOM);
    
    $cursor = $(cursorNodeDOM);
    window.cursor = $cursor; // temp
    window.cursorOffset = 0;
    
    // Initialize start time at 0
    
    startTime = 0;
    
    function getBBoxRelativeToSVG(elem) {
      var elemClientRect = elem.getBoundingClientRect();
      
      // window.scrollX || window.pageXOffset
      
      return {
        x: elemClientRect.left - svgClientRect.left + window.cursorOffset,
        y: elemClientRect.top - svgClientRect.top
      }
    }
    
    function start(scheduleObject, startTime) {
    
      var slicedScheduleObject = scheduleObject.slice(startTime);
    
      console.log("SCHEDULE");
      console.log(slicedScheduleObject);
      
      function buildAnimationQueue(s, isFirst) {
      
        if (s.length === 2) {
          return true; 
        } else {
        
          var ease, 
              elemBBox = getBBoxRelativeToSVG(document.getElementById(s[1].id));
          
          console.log("PLAN");
             
          if (isFirst) {
            ease = "ease-in"
          } else if (s.length === 3) {
            ease = "easeOutSine"
          } else {
            ease = "linear"
            // ease = "easeInOutCirc"
          }
           
          return function() { 
            console.log("DO");
            var elemBBox = getBBoxRelativeToSVG(document.getElementById(s[1].id));
            $cursor.velocity( { x: elemBBox.x },
            // $cursor.velocity( { x: getBBoxRelativeToSVG(document.getElementById(s[1].id)).x },
                              ease,
                              s[0].duration,
                              buildAnimationQueue(s.slice(1)));
          }          
        }
      }
    
      (buildAnimationQueue(slicedScheduleObject, true))();
    }
    
    function pause() {
      $cursor.velocity('stop', true);
    }
    
    function initializeCursorDimensions(scheduleObject) {
    
      var $target = $('#' + scheduleObject.slice(0)[0].id),
          targetBBox = getBBoxRelativeToSVG($target[0]),
          measureBBox = getBBoxRelativeToSVG($target.closest('.measure')[0]);
      
      $cursor.attr('x', targetBBox.x)
        .attr('y', measureBBox.y)
        .attr('height', measureBBox.height);
    }
    
    return {
      pause: pause,
      start: start,
      init: initializeCursorDimensions
    }
  }
  
  // SCHEDULE
  
  function getSchedule(configData) {
  
    var rawData, data;
    
    rawData = configData.scheduleDataString
      .split(/\s+/)
      .map(function(x) { 
        var a = x.split(':'); 
        return { id: a[0], time: a[1] } 
       });
  
    // v.split(/\s+/).map(function(x) { var a = x.split(':'); return { id: a[0], time: a[1] } });
  /*
    rawData = [
      { id: 'm-56', time: 0 },
      { id: 'm-44', time: 1657 },
      { id: 'm-57', time: 3274 },
      { id: 'm-45', time: 4026 },
      { id: 'm-46', time: 4789 },
      { id: 'm-47', time: 5552 },
      { id: 'm-62', time: 6345 },
      { id: 'm-64', time: 10157 },
      { id: 'm-68', time: 11286 },
      { id: 'm-85', time: 12000 }
    ];*/
    
    data = initData(rawData);
    
    console.log("ORIGINAL SCHEDULE");
    console.log(JSON.stringify(data));
    
    function initData(s) {
      for (var i = 0; i < s.length - 1; i++) {
        s[i].duration = s[i+1].time - s[i].time;
      }
      return s;
    }
    
    function getScheduleStartingAt(time) {
    
      var schedule, remainingTime, proportionComplete, startTime;
      
      startTime = (time === undefined ? 0 : time); 
    
      // Get everything in the schedule after the starttime
    
      schedule = data.filter(function (entry, i) {
        if (data[i+1] === undefined)
          return true
        else
          return startTime < data[i+1].time;
      });
      
      // Calculate what remaining time is left (remainingDuration)
      //   and what proportion between markers we've travelled

      remainingTime = schedule[1].time - startTime;
      proportionComplete = (startTime - schedule[0].time) / (schedule[1].time - schedule[0].time);
      
      schedule[0].duration = remainingTime;
      schedule[0].proportionComplete = proportionComplete;  

      return schedule;
    }
    
    return {
      slice: getScheduleStartingAt,
      getData: function () { return data } // is this necessary?
    }
  }
   
})() 



