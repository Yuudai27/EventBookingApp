# EventBookingApp
This react application provides an event booking system, which is connected to a mySQL data base via node.js.

To install the application the following steps have to be taken:
1.) Create the react application with opening the console prompt window and entering the following command:
- npx create-react-app client
2.) Create and change the directory to create the node application by entering the following commands after
each other:
  - mk dir server
  - cd server
  - npm init -y
3.) Install the necessary libraries we need for the application:
  - npm install mysql --save
  - npm install express cors --save
  - npm install nodemon --save -dev
  - npm install http-proxy-middleware --save
  - npm install material-ui --save
  - npm install react-router-dom --save
4.) Create the setupProxy.js of the file on Github in the client folder under the subfolder "src"
5.) Overwrite the following existing files in the react application in the src folder with the Github- files:
  - App.css
  - App.js
  - index.js
6.) Finally add the following files into the src- folder of the react application:
  - Account.js
  - AccountEdit.js
  - Booking.js
  - EditBooking.js
  - Event.js
  - Layout.js
  - Register.js
7.) Add the server.js file into your server- folder for the node application.
    Please keep in mind to add your valid Username and password of your mySQL- server into lines 39 and 40
    of the server.js- file.
8.) Next step is to set up the SQL- database with login into your server system
9.)	Unpack the sql files into your root- folder of the MySQL server
10.) Open the terminal
11.) Enter the following command: “mysql -u root -p < event-app.sql”
12.) The root password will be requested. After entering the command will be executed 
13.) Enter the following command: “mysql -u root -p < events.sql”
14.) The root password will be requested. After entering the command will be executed
15.) Enter the following command: “mysql -u root -p < user_and_bookings.sql”
16.) The root password will be requested. After entering the command will be executed
17.) The database is fully installed
18.) To start the application now open two tabs in the command prompt window
19.) In the first you write following commands to start the react application:
  - cd client
  - npm start
20.) In the second you write the following commands to start the node server:
  - cd server
  - npm run dev
21.) The browser should open automatically with the address: "localhost:3000" otherwise type
  it manually into your browser to start the application.
22.) Now you can use the application with all functions.


How to carry out test?
You can carry out tests directly in the application with creating new user accounts on the register
pages. 
With the event- page can event- bookings be iniated and send to the SQL- server with node.js.
Account- details can be adjusted in the editAccount- page as well as bookings.
All the results of the changes can be checked in the database itself or in the application
after the changes took place.

Defined test cases:
1.) Create a new user- account:
  Navigate to the register- page and fill out all details asked 
  on the page.
  Click on register and the account will be created by sending the data via node.js
  to the SQL-database.
  You can test your new created account by clicking on login and enter your username 
  and the password.
  If the login was successful the login- window closes and the button turns green.
  If not you get an error- message.

2.) Book an event:
  If you are logged in, you can switch to the event page and browse through all events
  and just press book on the event of your interest.
  This navigates you to the event-booking page, where you can see now the total price of the 
  booking and where you can choose the number of tickets.
  After finishing your booking by pressing the submit- button, you can see your booked 
  event under the bookings-page.

3.) Edit your account- detail:
  If you are logged in you can navigate to the account-page and press the edit- button.
  This brings you to the accountEdit- page where adjustable fields are highlighted.
  After editting these fields you can submit these changes.
  After log out and login again you can see the changes were adjusted.
