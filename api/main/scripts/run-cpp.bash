#!/bin/bash

# Compile and execute code.cpp

FILE="tmp/code.cpp";
EXEC="tmp/exec.exe";


g++ $FILE -o $EXEC && ./$EXEC;