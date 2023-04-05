import React, { useState, useEffect } from "react";
import "./App.css";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
/**
The EditBooking component represents a booking choosen to be edited.
Following several states will be defined to provide constants
which can be dynamically updated.
**/
const EditBooking = () => {
  /**
  These states provide the ID for the event, its name, organizer, the venue,
  address, genre, date, number of seats, the price and the description.
  Further will be the states for the bookingID, its number of tickets, total price
  and the booking status used..
  **/
  const [dataEventIDBookingEdit, setDataEventIDBookingEdit] = useState("");  
  const [dataEventNameBookingEdit, setDataEventNameBookingEdit] = useState("");
  const [dataOrganizerBookingEdit, setDataOrganizerBookingEdit] = useState("");
  const [dataEventVenueBookingEdit, setDataEventVenueBookingEdit] = useState("");
  const [dataVenueStreetNameBookingEdit, setDataVenueStreetNameBookingEdit] = useState("");
  const [dataVenueHouseNumberBookingEdit, setDataVenueHouseNumberBookingEdit] = useState("");
  const [dataVenueCityBookingEdit, setDataVenueCityBookingEdit] = useState("");
  const [dataVenueCountryBookingEdit, setDataVenueCountryBookingEdit] = useState("");
  const [dataEventGenreBookingEdit, setDataEventGenreBookingEdit] = useState("");
  const [dataEventDateBookingEdit, setDataEventDateBookingEdit] = useState("");
  const [dataNumberSeatsBookingEdit, setDataNumberSeatsBookingEdit] = useState("");
  const [dataTicketPriceBookingEdit, setDataTicketPriceBookingEdit] = useState(0);
  const [dataEventDescriptionBookingEdit, setEventDescriptionBookingEdit] = useState("");
  const [bookingEditID, setBookingEditID] = useState(0);
  const [bookingEditTickets, setBookingEditTickets] = useState(0);  
  const [bookingEditTotalPrice, setBookingEditTotalPrice] = useState(0);  
  const [bookingEditStatus, setBookingEditStatus] = useState("");
  //navigate provides the function to forward to another component in react-router.
  const navigate = useNavigate();
/**
This function will be invoked by changing the value of the number of tickets.	
It sets the value for bookTickets and also calculates the current total price
of the number of tickets times the ticket price with 2 digits after decimal point.
**/	
async function setBookTicketsHandler(value){
	setBookingEditTickets(value);
	await setBookingEditTotalPrice((dataTicketPriceBookingEdit*value).toFixed(2));
};	
/**
This function handles the buying of the tickets for the event and sends the createBooking- POST-request
to the node-server. It provides the event_ID, booking_price and the number of tickets.
After the node request got processed the App- component will be called.
**/
async function BookingHandler(e){
	e.preventDefault();
	axios.post("http://localhost:8080/editBooking", {event_ID: dataEventIDBookingEdit, booking_ID: bookingEditID, booking_price: bookingEditTotalPrice, number_of_tickets: bookingEditTickets})
		.then((res) => {
			});
	navigate("/App");
};
/**
The useEffect- functions provide the possibility to update the states via the
node server.
**/
  useEffect(() => {
    fetch("http://localhost:8000/dataEventIDBookingEdit")
      .then((res) => res.json())
      .then((data) => setDataEventIDBookingEdit(data.dataEventIDBookingEdit));
  }, []);
  useEffect(() => {
    fetch("http://localhost:8000/dataEventNameBookingEdit")
      .then((res) => res.json())
      .then((data) => setDataEventNameBookingEdit(data.dataEventNameBookingEdit));
  }, []);
  useEffect(() => {
    fetch("http://localhost:8000/dataOrganizerBookingEdit")
      .then((res) => res.json())
      .then((data) => setDataOrganizerBookingEdit(data.dataOrganizerBookingEdit));
  }, []);
  useEffect(() => {
    fetch("http://localhost:8000/dataEventVenueBookingEdit")
      .then((res) => res.json())
      .then((data) => setDataEventVenueBookingEdit(data.dataEventVenueBookingEdit));
  }, []);
  useEffect(() => {
    fetch("http://localhost:8000/dataVenueStreetNameBookingEdit")
      .then((res) => res.json())
      .then((data) => setDataVenueStreetNameBookingEdit(data.dataVenueStreetNameBookingEdit));
  }, []);  
  useEffect(() => {
    fetch("http://localhost:8000/dataVenueHouseNumberBookingEdit")
      .then((res) => res.json())
      .then((data) => setDataVenueHouseNumberBookingEdit(data.dataVenueHouseNumberBookingEdit));
  }, []); 
  useEffect(() => {
    fetch("http://localhost:8000/dataVenueCityBookingEdit")
      .then((res) => res.json())
      .then((data) => setDataVenueCityBookingEdit(data.dataVenueCityBookingEdit));
  }, []);
  useEffect(() => {
    fetch("http://localhost:8000/dataVenueCountryBookingEdit")
      .then((res) => res.json())
      .then((data) => setDataVenueCountryBookingEdit(data.dataVenueCountryBookingEdit));
  }, []);  
  useEffect(() => {
    fetch("http://localhost:8000/dataEventGenreBookingEdit")
      .then((res) => res.json())
      .then((data) => setDataEventGenreBookingEdit(data.dataEventGenreBookingEdit));
  }, []);  
  useEffect(() => {
    fetch("http://localhost:8000/dataEventDateBookingEdit")
      .then((res) => res.json())
      .then((data) => setDataEventDateBookingEdit(data.dataEventDateBookingEdit));
  }, []);  
  useEffect(() => {
    fetch("http://localhost:8000/dataNumberSeatsBookingEdit")
      .then((res) => res.json())
      .then((data) => setDataNumberSeatsBookingEdit(data.dataNumberSeatsBookingEdit));
  }, []);  
  useEffect(() => {
    fetch("http://localhost:8000/dataTicketPriceBookingEdit")
      .then((res) => res.json())
      .then((data) => setDataTicketPriceBookingEdit(data.dataTicketPriceBookingEdit));
  }, []);  
  useEffect(() => {
    fetch("http://localhost:8000/dataEventDescriptionBookingEdit")
      .then((res) => res.json())
      .then((data) => setEventDescriptionBookingEdit(data.dataEventDescriptionBookingEdit));
  }, []);  	
  useEffect(() => {
    fetch("http://localhost:8000/bookingEditID")
      .then((res) => res.json())
      .then((data) => setBookingEditID(data.bookingEditID));
  }, []);
  useEffect(() => {
    fetch("http://localhost:8000/bookingEditTickets")
      .then((res) => res.json())
      .then((data) => setBookingEditTickets(data.bookingEditTickets));
  }, []);
  useEffect(() => {
    fetch("http://localhost:8000/bookingEditTotalPrice")
      .then((res) => res.json())
      .then((data) => setBookingEditTotalPrice(data.bookingEditTotalPrice));
  }, []);
  useEffect(() => {
    fetch("http://localhost:8000/bookingEditStatus")
      .then((res) => res.json())
      .then((data) => setBookingEditStatus(data.bookingEditStatus));
  }, []);
/**
The return statement returns the data provided for the booking and
holds the input fields to take the number of tickets to be changed.
With pressing the submit-button the BookingHandler()- function can
be invoked.
**/	
  return (
  <div className="eventFrameWrapper">
  <div className="eventFrame">
		<h3 className="h3-frame">
		   Edit your booking!
	    </h3>
		  Event: {dataEventNameBookingEdit}<br />
		  Organizer: {dataOrganizerBookingEdit}<br />
		  Venue: {dataEventVenueBookingEdit}<br />
		  Address: {dataVenueStreetNameBookingEdit} {dataVenueHouseNumberBookingEdit}<br />
		  {dataVenueCityBookingEdit} {dataVenueCountryBookingEdit}<br />
		  Genre: {dataEventGenreBookingEdit}<br />
		  Date: {dataEventDateBookingEdit}<br />
		  Seats: {dataNumberSeatsBookingEdit}<br />
		  Price: {dataTicketPriceBookingEdit}€<br />
		  Description: {dataEventDescriptionBookingEdit}<br /><br />
		<div className="span-frame">
		<form onSubmit= {e => BookingHandler(e)}>
		  <span>
		  How many tickets would you like to purchase?
		  <input name="bookingEditTickets" type="text" value= {bookingEditTickets} onChange={e => setBookTicketsHandler(e.target.value)}/>
		  </span><br/>
		  Total price: {bookingEditTotalPrice}€
		  <span><br />
		    <button type="submit" >Edit!</button>
		  </span>
		</form> 
		</div>
   </div>
   </div>
  )
};

export default EditBooking;

