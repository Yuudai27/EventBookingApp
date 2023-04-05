
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
