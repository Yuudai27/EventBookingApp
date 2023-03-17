import React, { useState, useEffect } from "react";
import "./App.css";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
/**
The Event component represents an event chosen to be booked.
Following several states will be defined to provide constants
which can be dynamically updated.
**/
const Event = () => {
  /**
  These states provide the ID for the event, its name, organizer, the venue,
  address, genre, date, number of seats, the price and the description.
  The bookTickets state will hold the number of tickets, which the customer
  want to purchase. TotalPrice displays the total price for the booking.
  **/
  const [dataEventIDBooking, setDataEventIDBooking] = useState("");
  const [dataEventNameBooking, setDataEventNameBooking] = useState("");
  const [dataOrganizerBooking, setDataOrganizerBooking] = useState("");
  const [dataEventVenueBooking, setDataEventVenueBooking] = useState("");
  const [dataVenueStreetNameBooking, setDataVenueStreetNameBooking] = useState("");
  const [dataVenueHouseNumberBooking, setDataVenueHouseNumberBooking] = useState("");
  const [dataVenueCityBooking, setDataVenueCityBooking] = useState("");
  const [dataVenueCountryBooking, setDataVenueCountryBooking] = useState("");
  const [dataEventGenreBooking, setDataEventGenreBooking] = useState("");
  const [dataEventDateBooking, setDataEventDateBooking] = useState("");
  const [dataNumberSeatsBooking, setDataNumberSeatsBooking] = useState("");
  const [dataTicketPriceBooking, setDataTicketPriceBooking] = useState(0);
  const [dataEventDescriptionBooking, setEventDescriptionBooking] = useState("");
  const [bookTickets, setBookTickets] = useState(0);
  const [totalPrice, setTotalPrice] = useState(dataTicketPriceBooking*bookTickets);
  //navigate provides the function to forward to another component in react-router.
  const navigate = useNavigate();
	
/**
This function will be invoked by changing the value of the number of tickets.	
It sets the value for bookTickets and also calculates the current total price
of the number of tickets times the ticket price with 2 digits after decimal point.
**/
async function setBookTicketsHandler(value){
	setBookTickets(value);
	await setTotalPrice((dataTicketPriceBooking*value).toFixed(2));
};	
/**
This function handles the buying of the tickets for the event and sends the createBooking- POST-request
to the node-server. It provides the event_ID, booking_price and the number of tickets.
After the node request got processed the App- component will be called.
**/
async function BookingHandler(e){
	e.preventDefault();
	axios.post("http://localhost:8080/createBooking", {event_ID: dataEventIDBooking, booking_price: totalPrice, number_of_tickets: bookTickets})
		.then((res) => {
			});
	navigate("/App");
};
/**
The useEffect- functions provide the possibility to update the states via the
node server.
**/
  useEffect(() => {
    fetch("http://localhost:8000/dataEventIDBooking")
      .then((res) => res.json())
      .then((data) => setDataEventIDBooking(data.dataEventIDBooking));
  }, []);
  useEffect(() => {
    fetch("http://localhost:8000/dataEventNameBooking")
      .then((res) => res.json())
      .then((data) => setDataEventNameBooking(data.dataEventNameBooking));
  }, []);
  useEffect(() => {
    fetch("http://localhost:8000/dataOrganizerBooking")
      .then((res) => res.json())
      .then((data) => setDataOrganizerBooking(data.dataOrganizerBooking));
  }, []);
  useEffect(() => {
    fetch("http://localhost:8000/dataEventVenueBooking")
      .then((res) => res.json())
      .then((data) => setDataEventVenueBooking(data.dataEventVenueBooking));
  }, []);
  useEffect(() => {
    fetch("http://localhost:8000/dataVenueStreetNameBooking")
      .then((res) => res.json())
      .then((data) => setDataVenueStreetNameBooking(data.dataVenueStreetNameBooking));
  }, []);  
  useEffect(() => {
    fetch("http://localhost:8000/dataVenueHouseNumberBooking")
      .then((res) => res.json())
      .then((data) => setDataVenueHouseNumberBooking(data.dataVenueHouseNumberBooking));
  }, []); 
  useEffect(() => {
    fetch("http://localhost:8000/dataVenueCityBooking")
      .then((res) => res.json())
      .then((data) => setDataVenueCityBooking(data.dataVenueCityBooking));
  }, []);
  useEffect(() => {
    fetch("http://localhost:8000/dataVenueCountryBooking")
      .then((res) => res.json())
      .then((data) => setDataVenueCountryBooking(data.dataVenueCountryBooking));
  }, []);  
  useEffect(() => {
    fetch("http://localhost:8000/dataEventGenreBooking")
      .then((res) => res.json())
      .then((data) => setDataEventGenreBooking(data.dataEventGenreBooking));
  }, []);  
  useEffect(() => {
    fetch("http://localhost:8000/dataEventDateBooking")
      .then((res) => res.json())
      .then((data) => setDataEventDateBooking(data.dataEventDateBooking));
  }, []);  
  useEffect(() => {
    fetch("http://localhost:8000/dataNumberSeatsBooking")
      .then((res) => res.json())
      .then((data) => setDataNumberSeatsBooking(data.dataNumberSeatsBooking));
  }, []);  
  useEffect(() => {
    fetch("http://localhost:8000/dataTicketPriceBooking")
      .then((res) => res.json())
      .then((data) => setDataTicketPriceBooking(data.dataTicketPriceBooking));
  }, []);  
  useEffect(() => {
    fetch("http://localhost:8000/dataEventDescriptionBooking")
      .then((res) => res.json())
      .then((data) => setEventDescriptionBooking(data.dataEventDescriptionBooking));
  }, []);  	
/**
The return statement returns the data provided for the event and
holds the input fields to take the number of tickets.
With pressing the submit-button the BookingHandler()- function can
be invoked.
**/
  return (
  <div className="eventFrameWrapper">
  <div className="eventFrame">
		<h3 className="h3-frame">
		   Book your event!
	    </h3>
		  Event: {dataEventNameBooking}<br />
		  Organizer: {dataOrganizerBooking}<br />
		  Venue: {dataEventVenueBooking}<br />
		  Address: {dataVenueStreetNameBooking} {dataVenueHouseNumberBooking}<br />
		  {dataVenueCityBooking} {dataVenueCountryBooking}<br />
		  Genre: {dataEventGenreBooking}<br />
		  Date: {dataEventDateBooking}<br />
		  Seats: {dataNumberSeatsBooking}<br />
		  Price: {dataTicketPriceBooking}€<br />
		  Description: {dataEventDescriptionBooking}<br /><br />
		<div className="span-frame">
		<form onSubmit= {e => BookingHandler(e)}>
		  <span>
		  How many tickets would you like to purchase?
		  <input name="bookTickets" type="text" value= {bookTickets} onChange={e => setBookTicketsHandler(e.target.value)}/>
		  </span><br/>
		  Total price: {totalPrice}€
		  <span><br />
		    <button type="submit" >Buy Ticket(s)</button>
		  </span>
		</form> 
		</div>
   </div>
   </div>
  )
};

export default Event;

