@echo off
echo Installing the latest version of ICHNT (By Dying)
git clone https://github.com/dyingg/ICHNT.git
cd ICHNT
echo Edit the token.json file with the token of the discord user to be used
pause
heroku create
git push heroku master
heroku ps:scale web=0
heroku ps:scale worker=1
heroku logs --tail
pause
