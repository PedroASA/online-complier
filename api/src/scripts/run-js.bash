#!/bin/bash

$FILE="../tmp/exec.exe";
pwd
node $FILE < $1 > $2 2> $3;