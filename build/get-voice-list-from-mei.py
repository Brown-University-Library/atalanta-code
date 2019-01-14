from glob import glob
import re

# This script scans the MEI files for the fugues and
#  generates a python list-of-lists to be pasted into
#  generate-atalanta-music-html.py

extractFugueNumber_RE = re.compile(r'/Fuga\s(\d+)\.xml$')
extractVoiceNames_RE = re.compile(r'<staffDef\s+([^>]+\s+)?label="([^"]+)"')

allVoiceInitials = []
filenames = glob('/Users/patrickrashleigh/Documents/Atalanta/atalanta-code/data/mei/*.xml')
filenames.sort()

for filename in filenames:
  print(filename)
  fugueNumber = re.search(extractFugueNumber_RE, filename).group(1)
  file = open(filename, encoding='utf-16')
  mei = file.read()
  staffDefMatches = re.findall(extractVoiceNames_RE, mei)
  voiceInitials = []
  for staffDefMatch in staffDefMatches:
    print(staffDefMatch[1][0])
    voiceInitials.append("'" + staffDefMatch[1][0] + "'")
  allVoiceInitials.append('[' + ','.join(voiceInitials) + ']')


print('[ False, ' + ','.join(allVoiceInitials) + ']')

