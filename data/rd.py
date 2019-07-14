import json

output = []

with open('websites.json', 'r') as f:

    data = json.loads(f.read())
    i = 0
    mem = set()


    print(len(data))

    for x in data:
    	#print(x['name'])
    	if x['name'] not in mem:
    		mem.add(x['name'])
    		output.append(x)
    		i +=1 
    print(i)
    print(len(output))

#with open('data.json','w') as f:
# 	json.dumps(output)

with open('data.json', 'w') as f:
    f.write(json.dumps(output, indent=4))