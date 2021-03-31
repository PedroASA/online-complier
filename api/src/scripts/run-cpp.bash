#!/bin/bash

FILE="./src/tmp/code.cpp";
IN="./src/tmp/in.txt";
OUT="./src/tmp/out.txt";
ERR="./src/tmp/err.txt";
EXEC="./src/tmp/exec.exe"

g++ $FILE -o $EXEC > $OUT 2> $ERR && ./$EXEC < $IN > $OUT 2> $ERR;