
/*
function SharedVerovio() {
  this.hello = 'there';
} */


// This is the single instance of Verovio that is shared
//  by all instances of VerovioInstance

let sharedVerovio = {

  verovioToolkit: new verovio.toolkit(),
  meiRegistry: {}, // cache MEI code
  currentMeiFileUrl: undefined,
  currentlyRenderedToMidi: false,

  // Only global options (no need for different options at the instance level)

  setOptions: function(options) {
    this.verovioToolkit.setOptions(options);
  },

  // Given a MEI file URL, either change state to that file's MEI,
  //  or (if it hasn't been loaded) load it up and change state.
  // If no MEI arg passed, just use the current MEI-state

  updateTo: function(meiFileUrl) {

    let verovioToolkit = this.verovioToolkit,
      meiRegistry = this.meiRegistry,
      returnVerovio;

    const useCurrentMei = (meiFileUrl === undefined || meiFileUrl === this.currentMeiFileUrl),
      registryEntryExists = meiRegistry.hasOwnProperty(meiFileUrl);

    // if already current MEI, then no change

    if (useCurrentMei) { 
      returnVerovio = verovioToolkit;

    // if MEI cached in registry, then load that into verovio

    } else if (registryEntryExists) { 
      let newMei = meiRegistry[meiFileUrl];
      verovioToolkit.loadData(newMei);
      this.currentMeiFileUrl = meiFileUrl;
      this.currentlyRenderedToMidi = false;
      returnVerovio = verovioToolkit;

    // otherwise, load new MEI file and cache it

    } 
    
    /* else { 
      let meiCodePromise = this.loadMeiFile(verovioToolkit, meiFileUrl, meiRegistry);
      meiCodePromise.then(mei => {
        verovioToolkit.loadData(mei);
      });

      returnVerovio = verovioToolkit;
    } */

    return returnVerovio;
  },

  // TODO: THIS IS A MESS

  loadMeiFile: async function(meiFileUrl) {

    const request = async url => {
      let meiCode;
      const response = await fetch(url);
      let meiCodePromise = await response.text();
      meiCode = meiCodePromise;
      this.meiRegistry[meiFileUrl] = meiCodePromise;
      return meiCode;
    }
    
    request(meiFileUrl).then(meiCode => {
      this.meiRegistry[meiFileUrl] = meiCode;  
      this.updateTo(meiFileUrl);
    });
/*
    let meiCode = await request(meiFileUrl);
    this.meiRegistry[meiFileUrl] = meiCode;
    this.updateTo(meiFileUrl);
    // return verovioToolkit; */
  },

  getMEI: function(meiFileUrl) {
    return this.meiRegistry[meiFileUrl];
  },

  // Render to MIDI only if not already done so

  renderToMidi: function() {
    if (! this.currentlyRenderedToMidi) {
      this.verovioToolkit.renderToMidi();
      this.currentlyRenderedToMidi = true;
    }
  },

  renderPage: async function(pageNumber, meiFileUrl) {
    this.updateTo(meiFileUrl);
    this.meiRegistry[meiFileUrl].then()
    return this.verovioToolkit.renderPage(pageNumber);
  },

  getPageCount: function(meiFileUrl) {
    this.updateTo(meiFileUrl);
    return this.verovioToolkit.getPageCount();
  },

  getTimeForElement: function(id, meiFileUrl) {
    this.updateTo(meiFileUrl);
    return this.verovioToolkit.getTimeForElement(id);
  },

  getElementsAtTime: function(time, meiFileURL) {
    this.updateTo(meiFileURL);
    return // FINISH
  }
}

function VerovioInstance(meiFileUrl) {

  const id = meiFileUrl;

  this.getTimeForElement = function(xmlId) {
    return this.__proto__.getTimeForElement(xmlId, id);
  }

  this.getElementsAtTime = function(time) {
    return this.__proto__.getElementsAtTime(time, id);
  }

  this.getMEI = function() {
    return this.__proto__.getMEI(id);
  }

  this.getPageCount = function() {
    return this.__proto__.getPageCount(id);
  }

  this.renderPage = async function(pageNumber) {
    return this.__proto__.renderPage(pageNumber, id);
  }
  
  function init(thisVerovioInstance) {
    // thisVerovioInstance.__proto__.updateTo(meiFileUrl);
    thisVerovioInstance.loadMeiFile(meiFileUrl);
  }

  init(this);
}

VerovioInstance.prototype = sharedVerovio;
