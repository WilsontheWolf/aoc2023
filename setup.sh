#!/bin/bash

USAGE="USAGE:
Pass the day to create
$0 <day>\n"

DAY=$1

if [[ -z "$DAY" ]] then
    echo No day was provided!
    printf "$USAGE"
    exit 1
fi

if [[ $DAY -lt 1 || $DAY -gt 25 ]] then
    echo Day must be between 1 and 25!
    printf "$USAGE"
    exit 1
fi

if [[ -d "src/day$DAY" ]] then
    echo "Day folder already exists."
else
    echo "Creating day folder..."
    cp -r src/example src/day$DAY
    sed -i "s/0/$DAY/g" src/day$DAY/pt1.js
    sed -i "s/0/$DAY/g" src/day$DAY/pt2.js

    echo "Creating input file..."
    ./download.sh $DAY

    echo "All done!"
    echo "Run 'node src/day$DAY/pt1.js' to run the first part of the challenge."
fi