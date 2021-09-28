#!/bin/bash
git clone https://github.com/rakdman/DebtNotificationSystem.git
sudo apt-get install -y nodejs
sudo apt-get update
sudo apt-get install npm
cd /home/ubuntu/DebtNotificationSystem/server
npm install
npm start &
sleep 10
cd /home/ubuntu/DebtNotificationSystem/client
npm install
npm start &
sleep 10
