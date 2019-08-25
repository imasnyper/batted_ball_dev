tokens = []
with open('defs.txt', 'r') as f:
    s = f.readline()
    tokens = s.split(', ')

with open('defs2.txt', 'w') as f:
    f.write(" TEXT, ".join([t for t in tokens]))
