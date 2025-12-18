# installation de l'environnement de développement SERVICE
sudo rm /etc/systemd/system/serverpython.service
sudo rm /etc/systemd/system/servernode.service

cd /etc/systemd/system

sudo touch serverpython.service
sudo chmod 777 serverpython.service

sudo echo '[Unit]' >>serverpython.service
sudo echo 'Description=UVRTechnology' >>serverpython.service
sudo echo 'After=network-online.target' >>serverpython.service
sudo echo 'Wants=network-online.target' >>serverpython.service
sudo echo 'StartLimitIntervalSec=0' >>serverpython.service
sudo echo '[Service]' >>serverpython.service
sudo echo 'Type=simple' >>serverpython.service
sudo echo 'Restart=always' >>serverpython.service
sudo echo 'RestartSec=1' >>serverpython.service
sudo echo 'User=pi' >>serverpython.service
sudo echo 'ExecStart=/home/pi/Documents/distributeur-app/src/scripts/start_server_python.sh' >>serverpython.service

sudo echo '[Install]' >>serverpython.service
sudo echo 'WantedBy=multi-user.target' >>serverpython.service


sudo touch servernode.service
sudo chmod 777 servernode.service

sudo echo '[Unit]' >>servernode.service
sudo echo 'Description=UVRTechnology' >>servernode.service
sudo echo 'After=network-online.target' >>servernode.service
sudo echo 'Wants=network-online.target' >>servernode.service
sudo echo 'StartLimitIntervalSec=0' >>servernode.service
sudo echo '[Service]' >>servernode.service
sudo echo 'Type=simple' >>servernode.service
sudo echo 'Restart=always' >>servernode.service
sudo echo 'RestartSec=1' >>servernode.service
sudo echo 'User=pi' >>servernode.service
sudo echo 'ExecStart=/home/pi/Documents/distributeur-app/src/scripts/start_server_node.sh' >>servernode.service

sudo echo '[Install]' >>servernode.service
sudo echo 'WantedBy=multi-user.target' >>servernode.service

# à faire
sudo systemctl enable serverpython.service
sudo systemctl enable servernode.service
sudo systemctl enable pigpiod