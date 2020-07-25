import sys
import json
# list
# print (["apple","banana","chiku"])
# print(json.dump(["apple","banana","chiku"]))
print(json.dumps(("Apple", "Banana", "Chiku","Dog","Elephant")))
sys.stdout.flush()

# def retList():
#     list = []
#     for i in range(0,10):
#         list.append(i)
#     return list
# a = retList()
# print(json.dump(a))

# import json
# data = {'x': x, 'y': y}
# # To write to a file:
# with open("output.json", "w") as f:
#     json.dump(data, f)

# # To print out the JSON string (which you could then hardcode into the JS)
# json.dumps(data)