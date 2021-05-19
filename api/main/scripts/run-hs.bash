#!/bin/bash

# Compile and execute code.hs

FILE="tmp/code.hs";
EXEC="tmp/exec.exe";


ghc $FILE -o $EXEC >"tmp/dont-care.txt" && ./$EXEC;