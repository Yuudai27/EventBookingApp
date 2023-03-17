const express = require("express");
const cors = require("cors");
const os = require('os');
const app = express();
 
//declares the usage of mysql
var mysql = require('mysql');
//declares an array to hold all event objects
var eventName = new Array();
//declares an array to hold all event objects related to the booking process
var eventNameBooking = new Array();
//declares an array to hold all event objects related to the booking page to browse bookings
var eventNameBookingHistory = new Array();
//declares an array to hold all event objects related to the editing page for bookings
var eventNameBookingEdit = new Array();
//declares an array to hold all event objects related to favorite cities
var eventNameCities = new Array();
//declares an array to hold all event objects related to favorite genre
var eventNameGenre = new Array();
//declares an array to hold all booking objects for the booking page
var bookingDetails = new Array();
//declares an array to hold all booking objects for the edit booking page
var bookingEditDetails = new Array();
//declares an object to hold all account information to the logged in customer
var accountName = new Object();
//declares an array to hold all event IDs related to the favorite city of the customer
var eventCityIDs = new Array();
//declares an array to hold all event IDs related to the favorite genre of the customer
var eventGenreIDs = new Array();
//declares an array to hold all booking IDs related to the customer
var bookingHistoryIDs = new Array();
//declares an object to hold the account ID related to the customer
var account_ID = new Object();
/**
Creates the function to mySQL server with the address and the login-information
**/
var con = mysql.createConnection({
	host: "localhost", 
	user: "USER",
	password: "PASSWORD",
	database: "eventapp"
});
//activates the usage of CORS component on the node server
app.use(cors()); 
//activates the usage of express.json component on the node server
app.use(express.json());
app.use(express.urlencoded({extended: false}));
//activates listener to listen to requests on port 8000.
app.listen(8000, () => {
	console.log(`server is running on port 8000.`); 
});
/**
The getEventsID function takes an event_ID and searches the data base for it.
The result will be pushed into the eventName array.
**/ 
async function getEventsID (id){
	con.query("SELECT * FROM events WHERE event_ID = "+id, async function (err, result) {
   	if (err) throw err;
	await Object.keys(result).forEach(async function(key) {
		await eventName.push(Object.assign({}, result[key]));
    		 await console.log(eventName[eventName.length-1])  
	});
  	});
};
/**
The getEventBooking function takes an event_ID and searches the data base for it.
The result will be pushed into the eventNameBooking array.
**/ 
async function getEventBooking (id){
	con.query("SELECT * FROM events WHERE event_ID = "+id, async function (err, result) {
   	if (err) throw err;
	await Object.keys(result).forEach(async function(key) {
		await eventNameBooking.push(Object.assign({}, result[key]));
    		 await console.log(eventNameBooking[eventNameBooking.length-1])  
	});
  	});
}; 
/**
POST- request receiver for getNumberBookings searches the data base for all bookings related to the customer and
pushs the result IDs into the bookingHistoryIDs array.
The length of the array will be send by GET function to the Bookings- page.
Finally the function will redirect back to the react client.
**/
app.post("/getNumberBookings", async function (req,res){
	var bookingCounter = 0;
	bookingHistoryIDs = new Array();
	try{
	con.query("SELECT * FROM bookings WHERE customer_ID ="+account_ID.customer_ID+";", async function (err, result) {
	await Object.keys(result).forEach(async function(key) {
	    await bookingHistoryIDs.push(Object.assign({}, result[key]));
	});
	});	
	await app.get("/numberBookingHistory", (req, res) => {	  
		res.json({ numberBookingHistory: bookingHistoryIDs.length});
	}); 
	}
	catch(err){
	}
	await res.redirect("http://localhost:3000"); 
}); 
/**
The getEventBookingHistory function takes an booking_ID and searches the data base for the related event.
The result will be pushed into the eventNameBookingHistory array.
The getEventBookingHistory function than searches the data base for the related booking.
and pushs the result into the bookingDetails array.
**/ 
async function getEventBookingHistory (id){  
  try{
	con.query("SELECT * FROM events WHERE event_ID = (SELECT event_ID FROM bookings WHERE booking_ID ="+bookingHistoryIDs[id].booking_ID+");", async function (err, result) {
   	if (err) throw err;
	await Object.keys(result).forEach(async function(key) {
		await eventNameBookingHistory.push(Object.assign({}, result[key]));
    		 await console.log(eventNameBookingHistory[eventNameBookingHistory.length-1])  
	});
  	});
	con.query("SELECT * FROM  bookings WHERE booking_ID ="+bookingHistoryIDs[id].booking_ID, async function (err, result) {
   	if (err) throw err;
	await Object.keys(result).forEach(async function(key) {
		await bookingDetails.push(Object.assign({}, result[key]));
    		 await console.log(bookingDetails[bookingDetails.length-1])  
	});
  	});
  }
  catch(err){
  }
}; 
/**
The getEventBookingEdit function takes an booking_ID and searches the data base for the related event.
The result will be pushed into the eventNameBookingEdit array.
The getEventBookingEdit function than searches the data base for the related booking.
and pushs the result into the bookingEditDetails array.
**/ 
async function getEventBookingEdit (id){
	con.query("SELECT * FROM events WHERE event_ID = (SELECT event_ID FROM bookings WHERE booking_ID ="+id+");", async function (err, result) {
   	if (err) throw err;
	await Object.keys(result).forEach(async function(key) {
		await eventNameBookingEdit.push(Object.assign({}, result[key]));
    		 await console.log(eventNameBookingEdit[eventNameBookingEdit.length-1])  
	});
  	});
	con.query("SELECT * FROM  bookings WHERE booking_ID ="+id, async function (err, result) {
   	if (err) throw err;
	await Object.keys(result).forEach(async function(key) {
		await bookingEditDetails.push(Object.assign({}, result[key]));
    		 await console.log(bookingEditDetails[bookingEditDetails.length-1])  
	});
  	});
}; 
/**
The getEventsIDCities function takes an event_ID and searches the data base for it.
The result will be pushed into the eventNameCities array.
**/  
async function getEventsIDCities (id){
	try{
	console.log(eventCityIDs[id].event_ID);
	con.query("SELECT * FROM events WHERE event_ID = "+eventCityIDs[id].event_ID, async function (err, result) {
   	if (err) throw err;
	await Object.keys(result).forEach(async function(key) {
		await eventNameCities.push(Object.assign({}, result[key]));
    		 await console.log(eventNameCities[eventNameCities.length-1])  
	});
  	});
	}
	catch(err){
	}
};
/**
The getEventsIDGenre function takes an event_ID and searches the data base for it.
The result will be pushed into the eventNameGenre array.
**/ 
async function getEventsIDGenre (id){
	con.query("SELECT * FROM events WHERE event_ID = "+eventGenreIDs[id].event_ID, async function (err, result) {
   	if (err) throw err;
	await Object.keys(result).forEach(async function(key) {
		await eventNameGenre.push(Object.assign({}, result[key]));
    		 await console.log(eventNameGenre[eventNameGenre.length-1])  
	});
  	});
}; 
/**
POST- request receiver for getEventsCities searches the data base for all events related to the customers favorite city 
and pushs the result IDs into the eventCityIDs array.
The length of the array will be send by GET function to the App- page.
Finally the function will redirect back to the react client.
**/
app.post("/getEventsCities", async function (req,res){
	try{ 
	con.query("SELECT event_ID FROM events WHERE venue_city = (SELECT favorite_city FROM customers WHERE customer_ID ="+req.body.customer_ID+");", async function (err, result) {
	await Object.keys(result).forEach(async function(key) {
		await eventCityIDs.push(Object.assign({}, result[key]));
	});
	await app.get("/numberEventsCities", async function(req, res){	  
		await res.json({ numberEventsCities: eventCityIDs.length});
	}); 
	});
	}
	catch(err){ 
	} 
	await res.redirect("http://localhost:3000"); 
});
/**
POST- request receiver for getEventsGenre searches the data base for all events related to the customers favorite genre 
and pushs the result IDs into the eventGenreIDs array.
The length of the array will be send by GET function to the App- page.
Finally the function will redirect back to the react client.
**/
app.post("/getEventsGenre", async function (req,res){
	try{
	con.query("SELECT event_ID FROM events WHERE event_genre = (SELECT favorite_events FROM customers WHERE customer_ID ="+req.body.customer_ID+");", async function (err, result) {
	await Object.keys(result).forEach(async function(key) {
		await eventGenreIDs.push(Object.assign({}, result[key]));
	});
	await app.get("/numberEventsGenre", async function(req, res){	  
		await res.json({ numberEventsGenre: eventGenreIDs.length});
	});
	});
	}
	catch(err){
	} 
	await res.redirect("http://localhost:3000"); 
});
/**
The getAccount function takes an customer_ID and searches the data base for the related account.
The result will be pushed into the accountName array.
**/ 
async function getAccount (id){
	con.query("SELECT * FROM customers WHERE customer_ID = "+id, async function (err, result) {
   	if (err) throw err;
	accountName = Object.assign({}, result[0]);
	});
};  
/**
POST- request receiver for getEvents searches the data base for all events avaiable 
and counts them.
The counter value will be send by GET function to the App- page.
Finally the function will redirect back to the react client.
**/ 
app.post("/getEvents", async function (req,res){
	var eventCounter = 0;
	try{
	con.query("SELECT * FROM events;", async function (err, result) {
	await Object.keys(result).forEach(async function(key) {
	    eventCounter++;
	});
	});	
	await app.get("/numberEvents", (req, res) => {	  
		res.json({ numberEvents: eventCounter});
	}); 
	}
	catch(err){
	}
	await res.redirect("http://localhost:3000"); 
});    
/**
POST- request receiver for logIn searches the data base, if there is an existing account with 
the account name and the account password.
If there is a result the getAccount- function and the updateAccountID- function will be invoked
and the current account_ID send to the calling Layout- page.
If there is no result the account_ID 0 will be send to the calling Layout- page.
Finally the function will redirect back to the react client.
**/    
app.post("/logIn", async function (req,res){
	
	con.query("SELECT customer_ID FROM customers WHERE account_name = '"+req.body.account_name+"' && account_password = '" +req.body.account_password+"';", async function (err, result) {
		account_ID = Object.assign({}, result[0]);
		if(result[0] !==undefined){
			await getAccount(account_ID.customer_ID); 
			await updateAccountID(account_ID.customer_ID);
			await res.json({accountID: account_ID.customer_ID});
		}
		else{
		    await res.json({accountID: 0});
		}
	});
});	 
/**
The updateAccountID function provides the current customer_ID via a 
GET function to the App-page.
**/ 
async function updateAccountID(){ 
  await app.get("/accountIDApp", async function (req, res) {
	res.json({ accountIDApp: account_ID.customer_ID});
  }); 
};
/**
The GET function for accountIDApp provides the current customer_ID to the App-page.
**/ 
app.get("/accountIDApp", async function (req, res) {
	res.json({ accountIDApp: account_ID.customer_ID});
  });
/**
POST- request receiver for logOut reassignes all neccessary constants, that these get emptied
and can be prepared for a new login.
The updateAccountID- function will be called to reset the account ID on the App- page. 
Finally the function will redirect back to the react client.
**/   
app.post("/logOut", async function (req,res){
	accountName = new Object();
	account_ID.customer_ID = 0;
	eventCityIDs = new Array();
	eventGenreIDs = new Array(); 
	bookingHistoryIDs = new Array();
	bookingDetails = new Array();
	bookingEditIDs = new Array();
	bookingEditDetails = new Array();
    await updateAccountID();	 
	await res.redirect("http://localhost:3000"); 
});	 
/**
POST- request receiver for createUser creates a new customer account in the data base based on the
provided data sets. 
Finally the function will redirect back to the react client.
**/
app.post("/createUser", async function (req,res){
	con.query("INSERT INTO `customers`(first_name, last_name, birth_date, age, credit_card, email_address, street_name, house_number, city, country, favorite_events, favorite_city, account_name, account_password)"+ 
	"VALUES ('"+ req.body.first_name +"', '"+ req.body.last_name +"', '"+ req.body.birth_date +"',(DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(),'"+ req.body.birth_date +"')), '%Y'))+0,'"+ req.body.credit_card +
	"','"+ req.body.email_address +"','"+ req.body.street_name +"','"+ req.body.house_number +"','"+ req.body.city_name +"','"+ req.body.country_name +"','"+ req.body.favorite_events +"','"+ req.body.favorite_city +"','"+ 
	req.body.account_name +"','"+ req.body.account_password +"');"
		 , async function (err, result) {
   	if (err) throw err; 
  	});
	await res.redirect("http://localhost:3000");  
});
/**
POST- request receiver for createBooking creates a new booking in the data base based on the
provided data sets. It also updates the number of seats in the related event.
Finally the function will redirect back to the react client.
**/
app.post("/createBooking", async function (req,res){
	con.query("INSERT INTO `bookings`(customer_ID, event_ID, booking_price, number_of_tickets, booking_status)"+ 
	"VALUES ("+ account_ID.customer_ID +", "+ req.body.event_ID +", "+ req.body.booking_price +", "+ req.body.number_of_tickets +",'requested');"
		 , async function (err, result) { 
   	if (err) throw err;
  	});
	con.query("UPDATE `events` SET number_of_seats = (SELECT number_of_seats FROM events WHERE event_ID="+req.body.event_ID+")"+ -req.body.number_of_tickets+" WHERE event_ID="+req.body.event_ID+";"
	, async function (err, result) {
   	if (err) throw err;
  	});
	await res.redirect("http://localhost:3000");  
});
/**
POST- request receiver for editAccount updates the account details in the data base with the new data sets.
Finally the function will redirect back to the react client.
**/ 
app.post("/editAccount", async function (req,res){
    con.query("UPDATE `customers` SET last_name = '" + req.body.last_name+"', credit_card = '"+req.body.credit_card+"', street_name = '"+req.body.street_name+"',"+
	"house_number = '"+req.body.house_number+"', city = '"+req.body.city_name+"', country = '"+req.body.country_name+"', favorite_events = '"+req.body.favorite_event+"',"+
	"favorite_city = '"+req.body.favorite_city+"', account_password = '"+req.body.account_password+"' WHERE customer_ID = '"+req.body.customer_ID+"';"
	, async function (err, result) {
   	if (err) throw err;
  	});
	await res.redirect("http://localhost:3000");   
});
/**
POST- request receiver for cancelBooking updates the number of seats for an event after a booking is canceled
in the data base and then updates the booking status in the data base as canceled.
Finally the function will redirect back to the react client.
**/ 
app.post("/cancelBooking", async function (req,res){
	con.query("UPDATE `events` SET number_of_seats = (SELECT number_of_seats FROM events WHERE event_ID=(SELECT event_ID FROM bookings WHERE booking_ID="+req.body.id+"))"
	+"+ (SELECT number_of_tickets FROM bookings WHERE booking_ID="+req.body.id+") WHERE event_ID=(SELECT event_ID FROM bookings WHERE booking_ID="+req.body.id+");"
	, async function (err, result) {
   	if (err) throw err; 
  	});
	con.query("UPDATE `bookings` SET booking_status = 'canceled' WHERE booking_ID="+req.body.id+";"
	, async function (err, result) {
   	if (err) throw err;
  	});
	await res.redirect("http://localhost:3000");  
});
/**
POST- request receiver for editBooking updates the number of seats for an event after a booking is edited
in the data base and then updates the booking details in the data base with the new data sets.
Finally the function will redirect back to the react client.
**/ 
app.post("/editBooking", async function (req,res){
	con.query("UPDATE `events` SET number_of_seats = (SELECT number_of_seats FROM events WHERE event_ID= "+req.body.event_ID+")"
	+"+ (SELECT number_of_tickets FROM bookings WHERE booking_ID="+req.body.booking_ID+") - "+req.body.number_of_tickets+" WHERE event_ID="+req.body.event_ID+";"
	, async function (err, result) {
   	if (err) throw err;
  	});
	con.query("UPDATE `bookings` SET booking_status = 'requested', number_of_tickets = "+req.body.number_of_tickets+",booking_price = "+req.body.booking_price+" WHERE booking_ID="+req.body.booking_ID+";"
	, async function (err, result) {
   	if (err) throw err;
  	});
	await res.redirect("http://localhost:3000");  
});
/**
POST- request receiver for reqEvents to provide all event details
by first invoking the getEventsID function with the provided event_ID and then
providing GET- functions for the neccessary event details.
Finally the function will redirect back to the react client.
**/ 
app.post("/reqEvents", async function (req, res) {
  getEventsID(req.body.id);
  await app.get("/dataEventID", (req, res) => {	  
	res.json({ dataEventID: eventName[eventName.length-1].event_ID});
  });
  await app.get("/dataEventName", (req, res) => {	  
	res.json({ dataEventName: eventName[eventName.length-1].event_name });
  });
  await app.get("/dataOrganizer", (req, res) => {	  
	res.json({ dataOrganizer: eventName[eventName.length-1].organizer });
  });
  await app.get("/dataEventVenue", (req, res) => {	  
	res.json({ dataEventVenue: eventName[eventName.length-1].event_venue });
  });
  await app.get("/dataVenueStreetName", (req, res) => {	    
	res.json({ dataVenueStreetName: eventName[eventName.length-1].venue_street_name });
  });
  await app.get("/dataVenueHouseNumber", (req, res) => {	  
	res.json({ dataVenueHouseNumber: eventName[eventName.length-1].venue_house_number });
  });
  await app.get("/dataVenueCity", (req, res) => {	  
	res.json({ dataVenueCity: eventName[eventName.length-1].venue_city });
  });
  await app.get("/dataVenueCountry", (req, res) => {	  
	res.json({ dataVenueCountry: eventName[eventName.length-1].venue_country });
  });
  await app.get("/dataEventGenre", (req, res) => {	  
	res.json({ dataEventGenre: eventName[eventName.length-1].event_genre });
  });
  await app.get("/dataEventDate", (req, res) => {	  
	res.json({ dataEventDate: eventName[eventName.length-1].event_date });
  });
  await app.get("/dataNumberSeats", (req, res) => {	  
	res.json({ dataNumberSeats: eventName[eventName.length-1].number_of_seats +" seats available"});
  });
  await app.get("/dataTicketPrice", (req, res) => {	  
	res.json({ dataTicketPrice: eventName[eventName.length-1].ticket_price +"€"});
  });
  await app.get("/dataEventDescription", (req, res) => {	  
	res.json({ dataEventDescription: eventName[eventName.length-1].event_description });
  });
  await res.redirect("http://localhost:3000"); 
});
/**
POST- request receiver for reqEventsBookingHistory to provide all event and booking details
by first invoking the getEventBookingHistory function with the provided booking_ID and then
providing GET- functions for the neccessary event and booking details.
Finally the function will redirect back to the react client.
**/ 
app.post("/reqEventsBookingHistory", async function (req, res) {
  getEventBookingHistory(req.body.id);
  await app.get("/dataEventIDBookingHistory", (req, res) => {	  
	res.json({ dataEventIDBookingHistory: eventNameBookingHistory[eventNameBookingHistory.length-1].event_ID});
  });
  await app.get("/dataEventNameBookingHistory", (req, res) => {	  
	res.json({ dataEventNameBookingHistory: eventNameBookingHistory[eventNameBookingHistory.length-1].event_name });
  });
  await app.get("/dataOrganizerBookingHistory", (req, res) => {	  
	res.json({ dataOrganizerBookingHistory: eventNameBookingHistory[eventNameBookingHistory.length-1].organizer });
  });
  await app.get("/dataEventVenueBookingHistory", (req, res) => {	  
	res.json({ dataEventVenueBookingHistory: eventNameBookingHistory[eventNameBookingHistory.length-1].event_venue });
  });
  await app.get("/dataVenueStreetNameBookingHistory", (req, res) => {	    
	res.json({ dataVenueStreetNameBookingHistory: eventNameBookingHistory[eventNameBookingHistory.length-1].venue_street_name });
  });
  await app.get("/dataVenueHouseNumberBookingHistory", (req, res) => {	  
	res.json({ dataVenueHouseNumberBookingHistory: eventNameBookingHistory[eventNameBookingHistory.length-1].venue_house_number });
  });
  await app.get("/dataVenueCityBookingHistory", (req, res) => {	  
	res.json({ dataVenueCityBookingHistory: eventNameBookingHistory[eventNameBookingHistory.length-1].venue_city });
  });
  await app.get("/dataVenueCountryBookingHistory", (req, res) => {	  
	res.json({ dataVenueCountryBookingHistory: eventNameBookingHistory[eventNameBookingHistory.length-1].venue_country });
  });
  await app.get("/dataEventGenreBookingHistory", (req, res) => {	  
	res.json({ dataEventGenreBookingHistory: eventNameBookingHistory[eventNameBookingHistory.length-1].event_genre });
  });
  await app.get("/dataEventDateBookingHistory", (req, res) => {	  
	res.json({ dataEventDateBookingHistory: eventNameBookingHistory[eventNameBookingHistory.length-1].event_date });
  });
  await app.get("/dataNumberSeatsBookingHistory", (req, res) => {	  
	res.json({ dataNumberSeatsBookingHistory: eventNameBookingHistory[eventNameBookingHistory.length-1].number_of_seats +" seats available"});
  });
  await app.get("/dataTicketPriceBookingHistory", (req, res) => {	  
	res.json({ dataTicketPriceBookingHistory: eventNameBookingHistory[eventNameBookingHistory.length-1].ticket_price +"€"});
  });
  await app.get("/dataEventDescriptionBookingHistory", (req, res) => {	  
	res.json({ dataEventDescriptionBookingHistory: eventNameBookingHistory[eventNameBookingHistory.length-1].event_description });
  });
  await app.get("/bookingID", (req, res) => {	  
	res.json({ bookingID: bookingDetails[bookingDetails.length-1].booking_ID });
  });
  await app.get("/bookingTickets", (req, res) => {	  
	res.json({ bookingTickets: bookingDetails[bookingDetails.length-1].number_of_tickets });
  });
  await app.get("/bookingTotalPrice", (req, res) => {	  
	res.json({ bookingTotalPrice: bookingDetails[bookingDetails.length-1].booking_price });
  });
  await app.get("/bookingStatus", (req, res) => {	  
	res.json({ bookingStatus: bookingDetails[bookingDetails.length-1].booking_status });
  });
  await res.redirect("http://localhost:3000"); 
});
/**
POST- request receiver for reqEventsBookingEdit to provide all event and booking details
by first invoking the getEventBookingEdit function with the provided booking_ID and then
providing GET- functions for the neccessary event and booking details.
Finally the function will redirect back to the react client.
**/ 
app.post("/reqEventsBookingEdit", async function (req, res) {
  getEventBookingEdit(req.body.id);
  await app.get("/dataEventIDBookingEdit", (req, res) => {	  
	res.json({ dataEventIDBookingEdit: eventNameBookingEdit[eventNameBookingEdit.length-1].event_ID});
  });
  await app.get("/dataEventNameBookingEdit", (req, res) => {	  
	res.json({ dataEventNameBookingEdit: eventNameBookingEdit[eventNameBookingEdit.length-1].event_name });
  });
  await app.get("/dataOrganizerBookingEdit", (req, res) => {	  
	res.json({ dataOrganizerBookingEdit: eventNameBookingEdit[eventNameBookingEdit.length-1].organizer });
  });
  await app.get("/dataEventVenueBookingEdit", (req, res) => {	  
	res.json({ dataEventVenueBookingEdit: eventNameBookingEdit[eventNameBookingEdit.length-1].event_venue });
  });
  await app.get("/dataVenueStreetNameBookingEdit", (req, res) => {	    
	res.json({ dataVenueStreetNameBookingEdit: eventNameBookingEdit[eventNameBookingEdit.length-1].venue_street_name });
  });
  await app.get("/dataVenueHouseNumberBookingEdit", (req, res) => {	  
	res.json({ dataVenueHouseNumberBookingEdit: eventNameBookingEdit[eventNameBookingEdit.length-1].venue_house_number });
  });
  await app.get("/dataVenueCityBookingEdit", (req, res) => {	  
	res.json({ dataVenueCityBookingEdit: eventNameBookingEdit[eventNameBookingEdit.length-1].venue_city });
  });
  await app.get("/dataVenueCountryBookingEdit", (req, res) => {	  
	res.json({ dataVenueCountryBookingEdit: eventNameBookingEdit[eventNameBookingEdit.length-1].venue_country });
  });
  await app.get("/dataEventGenreBookingEdit", (req, res) => {	  
	res.json({ dataEventGenreBookingEdit: eventNameBookingEdit[eventNameBookingEdit.length-1].event_genre });
  });
  await app.get("/dataEventDateBookingEdit", (req, res) => {	  
	res.json({ dataEventDateBookingEdit: eventNameBookingEdit[eventNameBookingEdit.length-1].event_date });
  });
  await app.get("/dataNumberSeatsBookingEdit", (req, res) => {	  
	res.json({ dataNumberSeatsBookingEdit: eventNameBookingEdit[eventNameBookingEdit.length-1].number_of_seats +" seats available"});
  });
  await app.get("/dataTicketPriceBookingEdit", (req, res) => {	  
	res.json({ dataTicketPriceBookingEdit: eventNameBookingEdit[eventNameBookingEdit.length-1].ticket_price});
  });
  await app.get("/dataEventDescriptionBookingEdit", (req, res) => {	  
	res.json({ dataEventDescriptionBookingEdit: eventNameBookingEdit[eventNameBookingEdit.length-1].event_description });
  });
  await app.get("/bookingEditID", (req, res) => {	  
	res.json({ bookingEditID: bookingEditDetails[bookingEditDetails.length-1].booking_ID });
  });
  await app.get("/bookingEditTickets", (req, res) => {	  
	res.json({ bookingEditTickets: bookingEditDetails[bookingEditDetails.length-1].number_of_tickets });
  });
  await app.get("/bookingEditTotalPrice", (req, res) => {	  
	res.json({ bookingEditTotalPrice: bookingEditDetails[bookingEditDetails.length-1].booking_price });
  });
  await app.get("/bookingEditStatus", (req, res) => {	  
	res.json({ bookingEditStatus: bookingEditDetails[bookingEditDetails.length-1].booking_status });
  });
  await res.redirect("http://localhost:3000"); 
});
/**
POST- request receiver for reqEventsBooking to provide all event details
by first invoking the getEventBooking function with the provided event_ID and then
providing GET- functions for the neccessary event details.
Finally the function will redirect back to the react client.
**/
app.post("/reqEventBooking", async function (req, res) {
  getEventBooking(req.body.id);
  await app.get("/dataEventIDBooking", (req, res) => {	  
	res.json({ dataEventIDBooking: eventNameBooking[eventNameBooking.length-1].event_ID});
  });
  await app.get("/dataEventNameBooking", (req, res) => {	  
	res.json({ dataEventNameBooking: eventNameBooking[eventNameBooking.length-1].event_name });
  });
  await app.get("/dataOrganizerBooking", (req, res) => {	  
	res.json({ dataOrganizerBooking: eventNameBooking[eventNameBooking.length-1].organizer });
  });
  await app.get("/dataEventVenueBooking", (req, res) => {	  
	res.json({ dataEventVenueBooking: eventNameBooking[eventNameBooking.length-1].event_venue });
  });
  await app.get("/dataVenueStreetNameBooking", (req, res) => {	    
	res.json({ dataVenueStreetNameBooking: eventNameBooking[eventNameBooking.length-1].venue_street_name });
  });
  await app.get("/dataVenueHouseNumberBooking", (req, res) => {	  
	res.json({ dataVenueHouseNumberBooking: eventNameBooking[eventNameBooking.length-1].venue_house_number });
  });
  await app.get("/dataVenueCityBooking", (req, res) => {	  
	res.json({ dataVenueCityBooking: eventNameBooking[eventNameBooking.length-1].venue_city });
  });
  await app.get("/dataVenueCountryBooking", (req, res) => {	  
	res.json({ dataVenueCountryBooking: eventNameBooking[eventNameBooking.length-1].venue_country });
  });
  await app.get("/dataEventGenreBooking", (req, res) => {	  
	res.json({ dataEventGenreBooking: eventNameBooking[eventNameBooking.length-1].event_genre });
  });
  await app.get("/dataEventDateBooking", (req, res) => {	  
	res.json({ dataEventDateBooking: eventNameBooking[eventNameBooking.length-1].event_date });
  });
  await app.get("/dataNumberSeatsBooking", (req, res) => {	  
	res.json({ dataNumberSeatsBooking: eventNameBooking[eventNameBooking.length-1].number_of_seats +" seats available"});
  });
  await app.get("/dataTicketPriceBooking", (req, res) => {	  
	res.json({ dataTicketPriceBooking: eventNameBooking[eventNameBooking.length-1].ticket_price});
  });
  await app.get("/dataEventDescriptionBooking", (req, res) => {	  
	res.json({ dataEventDescriptionBooking: eventNameBooking[eventNameBooking.length-1].event_description });
  });
  await res.redirect("http://localhost:3000"); 
});
/**
POST- request receiver for reqEventsCities to provide all event details
by first invoking the getEventsIDCities function with the provided event_ID and then
providing GET- functions for the neccessary event details.
Finally the function will redirect back to the react client.
**/
app.post("/reqEventsCities", async function (req, res) {
  getEventsIDCities(req.body.id);  
  await app.get("/dataEventIDCities", (req, res) => {	  
	res.json({ dataEventIDCities: eventNameCities[eventNameCities.length-1].event_ID});
  });
  await app.get("/dataEventNameCities", (req, res) => {	  
	res.json({ dataEventNameCities: eventNameCities[eventNameCities.length-1].event_name });
  });
  await app.get("/dataOrganizerCities", (req, res) => {	  
	res.json({ dataOrganizerCities: eventNameCities[eventNameCities.length-1].organizer });
  });
  await app.get("/dataEventVenueCities", (req, res) => {	  
	res.json({ dataEventVenueCities: eventNameCities[eventNameCities.length-1].event_venue });
  });
  await app.get("/dataVenueStreetNameCities", (req, res) => {	    
	res.json({ dataVenueStreetNameCities: eventNameCities[eventNameCities.length-1].venue_street_name });
  });
  await app.get("/dataVenueHouseNumberCities", (req, res) => {	  
	res.json({ dataVenueHouseNumberCities: eventNameCities[eventNameCities.length-1].venue_house_number });
  });
  await app.get("/dataVenueCityCities", (req, res) => {	  
	res.json({ dataVenueCityCities: eventNameCities[eventNameCities.length-1].venue_city });
  });
  await app.get("/dataVenueCountryCities", (req, res) => {	  
	res.json({ dataVenueCountryCities: eventNameCities[eventNameCities.length-1].venue_country });
  });
  await app.get("/dataEventGenreCities", (req, res) => {	  
	res.json({ dataEventGenreCities: eventNameCities[eventNameCities.length-1].event_genre });
  });
  await app.get("/dataEventDateCities", (req, res) => {	  
	res.json({ dataEventDateCities: eventNameCities[eventNameCities.length-1].event_date });
  });
  await app.get("/dataNumberSeatsCities", (req, res) => {	  
	res.json({ dataNumberSeatsCities: eventNameCities[eventNameCities.length-1].number_of_seats +" seats available"});
  });
  await app.get("/dataTicketPriceCities", (req, res) => {	  
	res.json({ dataTicketPriceCities: eventNameCities[eventNameCities.length-1].ticket_price +"€"});
  });
  await app.get("/dataEventDescriptionCities", (req, res) => {	  
	res.json({ dataEventDescriptionCities: eventNameCities[eventNameCities.length-1].event_description });
  });
  await res.redirect("http://localhost:3000"); 
});
/**
POST- request receiver for reqEventsGenre to provide all event details
by first invoking the getEventsIDGenre function with the provided event_ID and then
providing GET- functions for the neccessary event details.
Finally the function will redirect back to the react client.
**/
app.post("/reqEventsGenre", async function (req, res) {
  getEventsIDGenre(req.body.id);
  await app.get("/dataEventIDGenre", (req, res) => {	  
	res.json({ dataEventIDGenre: eventNameGenre[eventNameGenre.length-1].event_ID});
  });
  await app.get("/dataEventNameGenre", (req, res) => {	  
	res.json({ dataEventNameGenre: eventNameGenre[eventNameGenre.length-1].event_name });
  });
  await app.get("/dataOrganizerGenre", (req, res) => {	  
	res.json({ dataOrganizerGenre: eventNameGenre[eventNameGenre.length-1].organizer });
  });
  await app.get("/dataEventVenueGenre", (req, res) => {	  
	res.json({ dataEventVenueGenre: eventNameGenre[eventNameGenre.length-1].event_venue });
  });
  await app.get("/dataVenueStreetNameGenre", (req, res) => {	    
	res.json({ dataVenueStreetNameGenre: eventNameGenre[eventNameGenre.length-1].venue_street_name });
  });
  await app.get("/dataVenueHouseNumberGenre", (req, res) => {	  
	res.json({ dataVenueHouseNumberGenre: eventNameGenre[eventNameGenre.length-1].venue_house_number });
  });
  await app.get("/dataVenueCityGenre", (req, res) => {	  
	res.json({ dataVenueCityGenre: eventNameGenre[eventNameGenre.length-1].venue_city });
  });
  await app.get("/dataVenueCountryGenre", (req, res) => {	  
	res.json({ dataVenueCountryGenre: eventNameGenre[eventNameGenre.length-1].venue_country });
  });
  await app.get("/dataEventGenreGenre", (req, res) => {	  
	res.json({ dataEventGenreGenre: eventNameGenre[eventNameGenre.length-1].event_genre });
  });
  await app.get("/dataEventDateGenre", (req, res) => {	  
	res.json({ dataEventDateGenre: eventNameGenre[eventNameGenre.length-1].event_date });
  });
  await app.get("/dataNumberSeatsGenre", (req, res) => {	  
	res.json({ dataNumberSeatsGenre: eventNameGenre[eventNameGenre.length-1].number_of_seats +" seats available"});
  });
  await app.get("/dataTicketPriceGenre", (req, res) => {	  
	res.json({ dataTicketPriceGenre: eventNameGenre[eventNameGenre.length-1].ticket_price +"€"});
  });
  await app.get("/dataEventDescriptionGenre", (req, res) => {	  
	res.json({ dataEventDescriptionGenre: eventNameGenre[eventNameGenre.length-1].event_description });
  });
  await res.redirect("http://localhost:3000"); 
});
/**
POST- request receiver for reqAccount to provide all account details
by providing GET- functions for the neccessary account details.
Finally the function will redirect back to the react client.
**/
app.post("/reqAccount", async function (req, res) {
  await app.get("/dataAccountID", (req, res) => {	  
	res.json({ dataAccountID: accountName.customer_ID});
  });
  await app.get("/dataFirstName", (req, res) => {	  
	res.json({ dataFirstName: accountName.first_name});
  });
  await app.get("/dataLastName", (req, res) => {	  
	res.json({ dataLastName: accountName.last_name });
  });
  await app.get("/dataBirthDate", (req, res) => {	  
	res.json({ dataBirthDate: accountName.birth_date }); 
  });
  await app.get("/dataCreditCard", (req, res) => {	  
	res.json({ dataCreditCard: accountName.credit_card });
  });
  await app.get("/dataEmailAddress", (req, res) => {	  
	res.json({ dataEmailAddress: accountName.email_address });
  });
  await app.get("/dataStreetName", (req, res) => {	    
	res.json({ dataStreetName: accountName.street_name });
  });
  await app.get("/dataHouseNumber", (req, res) => {	  
	res.json({ dataHouseNumber: accountName.house_number });
  });
  await app.get("/dataCity", (req, res) => {	  
	res.json({ dataCity: accountName.city });
  });
  await app.get("/dataCountry", (req, res) => {	  
	res.json({ dataCountry: accountName.country });
  });
  await app.get("/dataFavoriteEvent", (req, res) => {	  
	res.json({ dataFavoriteEvent: accountName.favorite_events });
  });
  await app.get("/dataFavoriteCity", (req, res) => {	  
	res.json({ dataFavoriteCity: accountName.favorite_city });
  });
  await app.get("/dataAccountName", (req, res) => {	  
	res.json({ dataAccountName: accountName.account_name });
  });
  await app.get("/dataAccountPassword", (req, res) => {	  
	res.json({ dataAccountPassword: accountName.account_password});
  });
  await res.redirect("http://localhost:3000/");
});

//activates listener to listen to requests on port 8080.  
app.listen(8080, () => {
	console.log(`server got request on port 8080`);
});


