#!/bin/bash

# Compile and execute code.hs

FILE="./src/tmp/code.hs";
IN="./src/tmp/in.txt";
OUT="./src/tmp/out.txt";
ERR="./src/tmp/err.txt";
EXEC="./src/tmp/exec.exe"

ghc $FILE -o $EXEC > $OUT 2> $ERR && ./$EXEC < $IN > $OUT 2> $ERR;