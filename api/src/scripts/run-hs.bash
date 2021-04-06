#!/bin/bash

# Compile and execute code.hs

FILE="./src/tmp/code.hs";
IN="./src/tmp/in.txt";
OUT="./src/tmp/out.txt";
ERR="./src/tmp/err.txt";
EXEC="./src/tmp/exec.exe"

> $OUT;
ghc $FILE -o $EXEC 2> $ERR && ./$EXEC < $IN > $OUT 2> $ERR;