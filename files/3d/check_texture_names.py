fname = 'house.mtl'

with open(fname) as f:
    lines = f.readlines()

with open(fname, 'w') as f :
    for l in lines:
        if 'textures\\' in l:
            parts = l.split('textures\\')
            parts[-1] = parts[-1].lower()
            l= 'textures\\'.join(parts)
        f.write(l)
        

