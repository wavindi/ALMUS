#!/bin/bash

cd /
cd home/pi/Documents/distributeur-app
npm start &> /home/pi/Documents/distributeur-app/log/node.log 2>&1
