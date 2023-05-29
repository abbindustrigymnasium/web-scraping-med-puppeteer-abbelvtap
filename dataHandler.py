import json
from collections import Counter
import matplotlib.pyplot as plt


# Öppna data.json och spara innehållet i variabeln data
with open('data.json') as f: 
    data = json.loads(f.read())

# skapar ett objekt där antalet av olika tecken sparas
letters = {}

# skriver vilka tecken jag vill räkna
characters = 'abcdefghijklmnopqrstuvwxyz.,:;!?\'\"'

# skapar en lista där tecken antalet för varje låt sparas
count = []

# räknar hur många av varje tecken det finns i varje låt och lägger till det i listan count
for song in data:
    res = dict(Counter(song.lower()))
    count.append(res)

# lägger ihop antalet tecken i olika låtar
for char in characters:
    letters[char] = 0

    # lägger till antalet an ett visst tecken från varje sång till totala räkningen
    for song in count:
        try:
            letters[char] += song[char]
        except:
            continue

# sorterar objektet med det totala antalet av olika tecken i storleksordning med den största först
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