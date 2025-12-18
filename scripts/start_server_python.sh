#!/bin/bash

cd /
cd home/pi/Documents/distributeur-app/src/scripts
python -u command.py -o 9000 &> /home/pi/Documents/distributeur-app/log/command.log 2>&1
