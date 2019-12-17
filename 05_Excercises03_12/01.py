# Write a Python program to display the current date and time

from datetime import date
from datetime import datetime

if __name__ == '__main__':
	today = date.today()
	print("Today is: ", today)
	
	now = datetime.now()
	print("Now is: ", now.strftime("%d/%m/%Y %H:%M:%S"))