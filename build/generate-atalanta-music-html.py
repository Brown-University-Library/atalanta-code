import os
import re

OUTPUT_TO_SCREEN = False # To write to files (in the current directory), set to False


MP3_DIRECTORY = '/Users/patrickrashleigh/Documents/Atalanta/development/atalanta-media/audio/emblem-music/mp3-new'
MP3_FILES = os.listdir(MP3_DIRECTORY)
BPM_RE = re.compile(r'^\d+-[AHP]-(\d+)bpm-(?:Dry|Reverb)[_\-\d]*\.mp3$')
OUTPUT_FILENAME_SUFFIX = '_emblem-music.inc'

CON = {
  'MAIN_MUSIC_CLASSNAME': 'ata-music',
  'AUDIO_TRACK_CLASSNAME': 'ata-audio-track',
  'VIZ_CLASSNAME': 'ata-viz',
  'VIZ_AUDIO_CLASSNAME': 'ata-viz-audio',
  'VIZ_CMN_CLASSNAME': 'ata-viz-cmn',
  'VIZ_PIANOROLL_CLASSNAME': 'ata-viz-pianoroll',
  'MP3_DIRECTORY_WEB': '../assets/audio/',
  'MEI_DIRECTORY_WEB': '../data/mei/'
}

# This array is generated by get-voice-list-from-mei.py

VOICE_ORDER = [ False, 
  ['A','H','P'],['A','P','H'],['A','H','P'],['P','H','A'],['A','H','P'],
  ['P','A','H'],['H','A','P'],['P','H','A'],['H','A','P'],['A','H','P'],
  ['H','A','P'],['H','A','P'],['H','A','P'],['A','P','H'],['A','P','H'],
  ['A','P','H'],['H','A','P'],['H','P','A'],['A','P','H'],['P','A','H'],
  ['P','A','H'],['H','A','P'],['P','A','H'],['P','A','H'],['A','P','H'],
  ['A','P','H'],['H','P','A'],['H','P','A'],['A','P','H'],['A','P','H'],
  ['A','P','H'],['P','H','A'],['P','A','H'],['P','A','H'],['P','H','A'],
  ['A','P','H'],['A','P','H'],['H','A','P'],['H','A','P'],['H','A','P'],
  ['A','P','H'],['A','P','H'],['A','H','P'],['P','H','A'],['P','H','A'],
  ['A','H','P'],['H','P','A'],['H','A','P'],['P','H','A'],['A','P','H'] ]

def forceTwoDigits(aNumber):
  return { True: "0", False: "" }[int(aNumber) < 10] + str(aNumber)

def getMp3Filename(args):
  return forceTwoDigits(args['emblemNumber']) + '-' \
    + args['voice'] + '-' \
    + str(args['tempo']) + 'bpm-' \
    + { True: 'Reverb', False: 'Dry' }[args['isReverb']] \
    + '.mp3'

def getTempo(emblemNumber):
  for filename in MP3_FILES:
    if (filename.startswith(forceTwoDigits(emblemNumber))):
      match = re.match(BPM_RE, filename)
      # print("Found tempo " + match.group(1) + ' in ' + filename)
      return match.group(1)


for emblemNumber in range(1,51):

  tempo = getTempo(emblemNumber)
  vLabels = VOICE_ORDER[emblemNumber]

  html = '''
    <div class="{MAIN_CLASSNAME}" data-mei="{MEI_FILENAME}">
      <div class="{CMN_VIZ_CLASSNAME}"></div>
      <div class="{AUDIO_VIZ_CLASSNAME}" data-tempo="{TEMPO}">
        <div class="{AUDIO_TRACK_CLASSNAME}" data-pan="-.5" data-gain="1" data-reverb-gain="0.6" 
            data-mp3="{VOICE_1_MP3_DRY}" data-reverb-mp3="{VOICE_1_MP3_REVERB}"></div>
        <div class="{AUDIO_TRACK_CLASSNAME}" data-pan="0"   data-gain="1" data-reverb-gain="0.6"  
            data-mp3="{VOICE_2_MP3_DRY}" data-reverb-mp3="{VOICE_2_MP3_REVERB}"></div>
        <div class="{AUDIO_TRACK_CLASSNAME}" data-pan=".5"  data-gain="1" data-reverb-gain="0.6"  
            data-mp3="{VOICE_3_MP3_DRY}" data-reverb-mp3="{VOICE_3_MP3_REVERB}"></div>
      </div>
      <div class="{PIANOROLL_VIZ_CLASSNAME} modal"></div>
    </div>'''.format(
    MAIN_CLASSNAME = CON['MAIN_MUSIC_CLASSNAME'],
    MEI_FILENAME = CON['MEI_DIRECTORY_WEB'] + 'Fuga ' + forceTwoDigits(emblemNumber) + '.xml',
    PIANOROLL_VIZ_CLASSNAME = CON['VIZ_PIANOROLL_CLASSNAME'],
    CMN_VIZ_CLASSNAME = CON['VIZ_CMN_CLASSNAME'],
    AUDIO_VIZ_CLASSNAME = CON['VIZ_AUDIO_CLASSNAME'],
    AUDIO_TRACK_CLASSNAME = CON['AUDIO_TRACK_CLASSNAME'],
    TEMPO = tempo,
    VOICE_1_MP3_DRY    = CON['MP3_DIRECTORY_WEB'] + getMp3Filename({ 'emblemNumber': emblemNumber, 'voice': vLabels[0], 'tempo': tempo, 'isReverb': False }),
    VOICE_1_MP3_REVERB = CON['MP3_DIRECTORY_WEB'] + getMp3Filename({ 'emblemNumber': emblemNumber, 'voice': vLabels[0], 'tempo': tempo, 'isReverb': True  }),
    VOICE_2_MP3_DRY    = CON['MP3_DIRECTORY_WEB'] + getMp3Filename({ 'emblemNumber': emblemNumber, 'voice': vLabels[1], 'tempo': tempo, 'isReverb': False }),
    VOICE_2_MP3_REVERB = CON['MP3_DIRECTORY_WEB'] + getMp3Filename({ 'emblemNumber': emblemNumber, 'voice': vLabels[1], 'tempo': tempo, 'isReverb': True  }),
    VOICE_3_MP3_DRY    = CON['MP3_DIRECTORY_WEB'] + getMp3Filename({ 'emblemNumber': emblemNumber, 'voice': vLabels[2], 'tempo': tempo, 'isReverb': False }),
    VOICE_3_MP3_REVERB = CON['MP3_DIRECTORY_WEB'] + getMp3Filename({ 'emblemNumber': emblemNumber, 'voice': vLabels[2], 'tempo': tempo, 'isReverb': True  })
  )

  outFilename = forceTwoDigits(emblemNumber) + OUTPUT_FILENAME_SUFFIX

  # Write HTML to screen or file (depending on OUTPUT_TO_SCREEN flag)

  if (OUTPUT_TO_SCREEN):
    print("\n----\nWrite to file " + outFilename + "\n----\n")
    print(html)
  else:
    f = open(outFilename, 'w')
    f.write(html)

  

  