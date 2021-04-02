#!/bin/bash

# Run code.js

FILE="./src/tmp/code.js";
IN="./src/tmp/in.txt";
OUT="./src/tmp/out.txt";
ERR="./src/tmp/err.txt";

node $FILE < $IN > $OUT 2> $ERR;