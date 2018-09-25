import os
import re

OUTPUT_TO_SCREEN = False # To write to files, set to False


MP3_DIRECTORY = '/Users/patrickrashleigh/Documents/Atalanta/atalanta-media/audio/emblem-music/MP3'
MP3_FILES = os.listdir(MP3_DIRECTORY)
BPM_RE = re.compile('^\d+-[AHP]-(\d+)bpm-(?:Dry|Reverb)[_\-\d]*\.mp3$')
OUTPUT_FILENAME_SUFFIX = '_emblem-music.inc'

CON = {
  'MAIN_MUSIC_CLASSNAME': 'ata-music',
  'AUDIO_TRACK_CLASSNAME': 'ata-audio-track',
  'VIZ_CLASSNAME': 'ata-viz',
  'VIZ_AUDIO_CLASSNAME': 'ata-viz-audio',
  'VIZ_CMN_CLASSNAME': 'ata-viz-cmn',
  'MP3_DIRECTORY_WEB': 'audio/',
  'MEI_DIRECTORY_WEB': 'mei/'
}

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

  html = '''
    <div class="{MAIN_CLASSNAME}" data-mei="{TEI_FILENAME}">
      <div class="atalanta-notation-viz atalanta-notation-viz-cmn"></div>
      <div class="atalanta-notation-viz atalanta-notation-viz-audio" 
            data-tempo="{TEMPO}">
            <div class="{AUDIO_TRACK_CLASSNAME}" data-pan="-.5" data-gain="1" data-reverb-gain="0.6" 
                data-mp3="{VOICE_A_MP3_DRY}" data-reverb-mp3="{VOICE_A_MP3_REVERB}"></div>
            <div class="{AUDIO_TRACK_CLASSNAME}" data-pan="0"   data-gain="1" data-reverb-gain="0.6"  
                data-mp3="{VOICE_H_MP3_DRY}" data-reverb-mp3="{VOICE_H_MP3_REVERB}"></div>
            <div class="{AUDIO_TRACK_CLASSNAME}" data-pan=".5"  data-gain="1" data-reverb-gain="0.6"  
                data-mp3="{VOICE_P_MP3_DRY}" data-reverb-mp3="{VOICE_P_MP3_REVERB}"></div>
      </div>
      <div class="atalanta-notation-viz atalanta-notation-viz-pianoroll"></div>
    </div>'''.format(
    MAIN_CLASSNAME = CON['MAIN_MUSIC_CLASSNAME'],
    TEI_FILENAME = CON['MEI_DIRECTORY_WEB'] + 'Fuga ' + str(emblemNumber) + '.xml',
    AUDIO_TRACK_CLASSNAME = CON['AUDIO_TRACK_CLASSNAME'],
    TEMPO = tempo,
    VOICE_A_MP3_DRY    = CON['MP3_DIRECTORY_WEB'] + getMp3Filename({ 'emblemNumber': emblemNumber, 'voice': 'A', 'tempo': tempo, 'isReverb': False }),
    VOICE_A_MP3_REVERB = CON['MP3_DIRECTORY_WEB'] + getMp3Filename({ 'emblemNumber': emblemNumber, 'voice': 'A', 'tempo': tempo, 'isReverb': True  }),
    VOICE_H_MP3_DRY    = CON['MP3_DIRECTORY_WEB'] + getMp3Filename({ 'emblemNumber': emblemNumber, 'voice': 'H', 'tempo': tempo, 'isReverb': False }),
    VOICE_H_MP3_REVERB = CON['MP3_DIRECTORY_WEB'] + getMp3Filename({ 'emblemNumber': emblemNumber, 'voice': 'H', 'tempo': tempo, 'isReverb': True  }),
    VOICE_P_MP3_DRY    = CON['MP3_DIRECTORY_WEB'] + getMp3Filename({ 'emblemNumber': emblemNumber, 'voice': 'P', 'tempo': tempo, 'isReverb': False }),
    VOICE_P_MP3_REVERB = CON['MP3_DIRECTORY_WEB'] + getMp3Filename({ 'emblemNumber': emblemNumber, 'voice': 'P', 'tempo': tempo, 'isReverb': True  })
  )

  outFilename = forceTwoDigits(emblemNumber) + OUTPUT_FILENAME_SUFFIX

  # Write HTML to screen or file (depending on OUTPUT_TO_SCREEN flag)

  if (OUTPUT_TO_SCREEN):
    print("\n----\nWrite to file " + outFilename + "\n----\n")
    print(html)
  else:
    f = open(outFilename, 'w')
    f.write(html)

  

  