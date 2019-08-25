import csv

col_names = []

stripped_names = []

s = ""

with open('BattedBallDefinitions.csv') as f:
    reader = csv.reader(f, delimiter=',')
    names = []
    for row in reader:
        names.append(row[0])

    s = ", ".join([n for n in names])

with open('defs.txt', 'w') as f:
    f.write(s)
