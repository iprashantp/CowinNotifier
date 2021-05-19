# CowinNotifier
Its a simple Node project that will notify with playing music when it found an availablity of slot for following condition
1. age = 18-45
2. availibility for the pin provided in .ini file

Steps to run
1. fork the project & clone
2. Update the cowin.ini
3. cd to the directory
4. npm i
5. node app.js

Enhancements:
I have tried to implement mail using nodemailer but it somehow not working for me.
Anyone wish to add the feature is really appreciated.

Pincode limitation is resolved. Now you can provide any no. of pin codes.

Feature:
Notification via telegram:
It require below 2 properties:
token = <token here>
group = <public group>
1. for token you need to ping botfather in telegram like below screenshot:
  <img width="720" alt="botfather" src="https://user-images.githubusercontent.com/4593619/118679966-f93bb680-b81b-11eb-8c6f-918876e0d787.png">
2. for group you need to create a public group
