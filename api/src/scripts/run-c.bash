#!/bin/bash

FILE="./src/tmp/code.c";
IN="./src/tmp/in.txt";
OUT="./src/tmp/out.txt";
ERR="./src/tmp/err.txt";
EXEC="./src/tmp/exec.exe"

gcc $FILE -o $EXEC > $OUT 2> $ERR && ./$EXEC < $IN > $OUT 2> $ERR;