#Write a Python program to calculate number of days between two dates. Sample dates: (2019, 7, 2) (2019, 7, 11)

from datetime import date
from datetime import timedelta

if __name__ == '__main__':
	date1 = input("What is the first date (dd.mm.jjjj)")
	print("Date 1: ", date1)
	day1, month1, year1 = map(int, date1.split('.'))
	d1 = date(year1, month1, day1)
	date2 = input("What is the second date (dd.mm.jjj)")
	print("date 2: ", date2)
	day2, month2, year2 = map(int, date2.split('.'))
	d2 = date(year2, month2, day2)
	
	delta = d1 - d2
	if (delta.days < 0):
		delta *= -1
	print("Day difference between the two dates: ", delta.days)