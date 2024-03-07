git clone https://github.com/yanyan-alien/Flight-Log-System.git 
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
sudo apt install mysql-server
sudo systemctl start mysql
sudo systemctl enable mysql
sudo apt install -y debian-keyring debian-archive-keyring apt-transport-https curl
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list
sudo apt update
sudo apt install caddy

source ~/.bashrc
nvm install node
cd Flight-Log-System
npm install
cd client
npm install
cd ../server
npm install
npm install -g serve
nano database.js