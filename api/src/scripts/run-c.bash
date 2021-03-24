#!/bin/bash

$FILE='api/src/tmp/code.c'

gcc $FILE -0 $4 > $2 2> $3;

./$4 < $1;