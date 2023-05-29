import json
from collections import Counter
import matplotlib.pyplot as plt

with open('data.json') as f: 
    data = json.loads(f.read())

letters = {}

characters = 'abcdefghijklmnopqrstuvwxyz.,:;!?\'\"'

count = []

for song in data:
    res = dict(Counter(song.lower()))
    count.append(res)

for char in characters:
    letters[char] = 0

    for song in count:
        try:
            letters[char] += song[char]
        except:
            print()
            continue

letters = dict(sorted(letters.items(), key=lambda x: x[1], reverse=True))

# x-coordinates of left sides of bars 
left = []
# heights of bars
height = []
# labels for bars
tick_label = []

i = 1
for letter in letters:
    left.append(i)
    i += 1
    height.append(letters[letter])
    tick_label.append(letter)
 
# plotting a bar chart
barplot = plt.bar(tick_label, height,  color = ['red', 'orange','yellow','green','blue','purple'])

for i, v in enumerate(height):
    plt.text(i, v, str(v), ha='center', va='bottom')
  
# naming the x-axis
plt.xlabel('character')
# naming the y-axis
plt.ylabel('occurrences')
# plot title
plt.title('lyrics analysis')
  

# function to show the plot
plt.show()