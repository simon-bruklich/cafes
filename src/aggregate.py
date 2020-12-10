#!/usr/bin/python3

import csv
import sys
import argparse

parser = argparse.ArgumentParser(
    description='Lookup Covid-19 statistics from CSV file')
parser.add_argument('County', type=str, help='Desired County to search')
parser.add_argument('State', type=str, help='Desired State to search')

args = parser.parse_args()

if __name__ == "__main__":

    number = input('Enter number to find\n')

    # Read CSV
    csv_file = csv.reader(open('us-counties.csv'))

    # Loop through CSV rows
    for row in csv_file:
        # if current rows 2nd value is equal to input, print that row
        if number == row[1]:
            print(row)

    k = input("press close to exit")
