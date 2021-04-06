#!/bin/bash

# Compile and execute code.cpp

FILE="./src/tmp/code.cpp";
IN="./src/tmp/in.txt";
OUT="./src/tmp/out.txt";
ERR="./src/tmp/err.txt";
EXEC="./src/tmp/exec.exe"

> $OUT;
g++ $FILE -o $EXEC 2> $ERR && ./$EXEC < $IN > $OUT 2> $ERR;