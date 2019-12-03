#Write a Python program to check whether a specified value is contained in a group of values.
# Test Data:
# 3 -> [1, 5, 8, 3]: True
# -1 -> [1, 5, 8, 3]: False

if __name__ == '__main__':
	value = [1, 5, 8, 3]
	val = int(input("Type in a number that should be checked"))
	check = "false";
	for v in value:
		if (v == val):
			check = "True"
	print(check)