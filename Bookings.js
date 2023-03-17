import React, { useState, useEffect } from "react";
import "./App.css";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
/**
The Booking component represents all Booking of a customer.
Following several states will be defined to provide constants
which can be dynamically updated.
**/
const Bookings = () => {
  /**
  These states provide the ID for the event, its name, organizer, the venue,
  address, genre, date, number of seats, the price and the description.
  The bookTickets state will hold the number of tickets, which the customer
  want to purchase. TotalPrice displays the total price for the booking.
  **/
  const [dataEventIDBookingHistory, setDataEventIDBookingHistory] = useState("");  
  const [dataEventNameBookingHistory, setDataEventNameBookingHistory] = useState("");
  const [dataOrganizerBookingHistory, setDataOrganizerBookingHistory] = useState("");
  const [dataEventVenueBookingHistory, setDataEventVenueBookingHistory] = useState("");
  const [dataVenueStreetNameBookingHistory, setDataVenueStreetNameBookingHistory] = useState("");
  const [dataVenueHouseNumberBookingHistory, setDataVenueHouseNumberBookingHistory] = useState("");
  const [dataVenueCityBookingHistory, setDataVenueCityBookingHistory] = useState("");
  const [dataVenueCountryBookingHistory, setDataVenueCountryBookingHistory] = useState("");
  const [dataEventGenreBookingHistory, setDataEventGenreBookingHistory] = useState("");
  const [dataEventDateBookingHistory, setDataEventDateBookingHistory] = useState("");
  const [dataNumberSeatsBookingHistory, setDataNumberSeatsBookingHistory] = useState("");
  const [dataTicketPriceBookingHistory, setDataTicketPriceBookingHistory] = useState("");
  const [dataEventDescriptionBookingHistory, setEventDescriptionBookingHistory] = useState("");
  /**
  The currentNumber and the number state keep the current booking index and the maximum Number
  of bookings for the customers account.
  **/
  const [currentNumberBookingHistory, setCurrentNumberBookingHistory] = useState(0);
  const [numberBookingHistory, setNumberBookingHistory] = useState(0);	
  const [bookingID, setBookingID] = useState(0);
  const [bookingTickets, setBookingTickets] = useState(0);  
  const [bookingTotalPrice, setBookingTotalPrice] = useState(0);  
  const [bookingStatus, setBookingStatus] = useState("");
  //navigate provides the function to forward to another component in react-router.
  const navigate = useNavigate();  
  /**
  The useEffect- functions provide the possibility to update the states via the
  node server.
  **/
  useEffect(() => {
    fetch("http://localhost:8000/bookingID")
      .then((res) => res.json())
      .then((data) => setBookingID(data.bookingID));
  }, []);
  useEffect(() => {
    fetch("http://localhost:8000/bookingTickets")
      .then((res) => res.json())
      .then((data) => setBookingTickets(data.bookingTickets));
  }, []);
  useEffect(() => {
    fetch("http://localhost:8000/bookingTotalPrice")
      .then((res) => res.json())
      .then((data) => setBookingTotalPrice(data.bookingTotalPrice));
  }, []);
  useEffect(() => {
    fetch("http://localhost:8000/bookingStatus")
      .then((res) => res.json())
      .then((data) => setBookingStatus(data.bookingStatus));
  }, []);
  useEffect(() => {
    fetch("http://localhost:8000/dataEventIDBookingHistory")
      .then((res) => res.json())
      .then((data) => setDataEventIDBookingHistory(data.dataEventIDBookingHistory));
  }, []);
  useEffect(() => {
    fetch("http://localhost:8000/dataEventNameBookingHistory")
      .then((res) => res.json())
      .then((data) => setDataEventNameBookingHistory(data.dataEventNameBookingHistory));
  }, []);
  useEffect(() => {
    fetch("http://localhost:8000/dataOrganizerBookingHistory")
      .then((res) => res.json())
      .then((data) => setDataOrganizerBookingHistory(data.dataOrganizerBookingHistory));
  }, []);
  useEffect(() => {
    fetch("http://localhost:8000/dataEventVenueBookingHistory")
      .then((res) => res.json())
      .then((data) => setDataEventVenueBookingHistory(data.dataEventVenueBookingHistory));
  }, []);
  useEffect(() => {
    fetch("http://localhost:8000/dataVenueStreetNameBookingHistory")
      .then((res) => res.json())
      .then((data) => setDataVenueStreetNameBookingHistory(data.dataVenueStreetNameBookingHistory));
  }, []);  
  useEffect(() => {
    fetch("http://localhost:8000/dataVenueHouseNumberBookingHistory")
      .then((res) => res.json())
      .then((data) => setDataVenueHouseNumberBookingHistory(data.dataVenueHouseNumberBookingHistory));
  }, []); 
  useEffect(() => {
    fetch("http://localhost:8000/dataVenueCityBookingHistory")
      .then((res) => res.json())
      .then((data) => setDataVenueCityBookingHistory(data.dataVenueCityBookingHistory));
  }, []);
  useEffect(() => {
    fetch("http://localhost:8000/dataVenueCountryBookingHistory")
      .then((res) => res.json())
      .then((data) => setDataVenueCountryBookingHistory(data.dataVenueCountryBookingHistory));
  }, []);  
  useEffect(() => {
    fetch("http://localhost:8000/dataEventGenreBookingHistory")
      .then((res) => res.json())
      .then((data) => setDataEventGenreBookingHistory(data.dataEventGenreBookingHistory));
  }, []);  
  useEffect(() => {
    fetch("http://localhost:8000/dataEventDateBookingHistory")
      .then((res) => res.json())
      .then((data) => setDataEventDateBookingHistory(data.dataEventDateBookingHistory));
  }, []);  
  useEffect(() => {
    fetch("http://localhost:8000/dataNumberSeatsBookingHistory")
      .then((res) => res.json())
      .then((data) => setDataNumberSeatsBookingHistory(data.dataNumberSeatsBookingHistory));
  }, []);  
  useEffect(() => {
    fetch("http://localhost:8000/dataTicketPriceBookingHistory")
      .then((res) => res.json())
      .then((data) => setDataTicketPriceBookingHistory(data.dataTicketPriceBookingHistory));
  }, []);  
  useEffect(() => {
    fetch("http://localhost:8000/dataEventDescriptionBookingHistory")
      .then((res) => res.json())
      .then((data) => setEventDescriptionBookingHistory(data.dataEventDescriptionBookingHistory));
  }, []);
  useEffect(() => {
    fetch("http://localhost:8000/numberBookingHistory")
      .then((res) => res.json())
      .then((data) => setNumberBookingHistory(data.numberBookingHistory));
  }, []);  
  /**
  The previousBooking function can be invoked if the currentNumber index is higher than 0 and
  it than calls the related event and booking data to the booking with the currentNumber -1.
  After the node request is processed the value for the currentNumber will be decreased
  and the updateEventData function called.
  Finally the Bookings- page will be called again to renew the values of the states in the browser.
  **/
  async function previousBooking(e){
	e.preventDefault();
	if(currentNumberBookingHistory > 0){
	  await axios.post("http://localhost:8080/reqEventsBookingHistory", {id: currentNumberBookingHistory-1})
	    .then( async function (res) {
		}); 
	  await setCurrentNumberBookingHistory(currentNumberBookingHistory-1);
	}
	await updateEventDataBookingHistory(e);
	await navigate("/Bookings");
  };
  /**
  The nextBooking function can be invoked if the currentNumber index is lower than the maximum number of bookings and
  it than calls the related event and booking data to the booking with the currentNumber +1.
  After the node request is processed the value for the currentNumber will be increased
  and the updateEventData function called.
  Finally the Bookings- page will be called again to renew the values of the states in the browser.
  **/
  async function nextBooking(e){
	e.preventDefault();
	if(currentNumberBookingHistory < numberBookingHistory-1){
	  await axios.post("http://localhost:8080/reqEventsBookingHistory", {id: currentNumberBookingHistory+1})
	    .then( async function (res) {
		});
	  await setCurrentNumberBookingHistory(currentNumberBookingHistory+1);
	}
	await updateEventDataBookingHistory(e);
	await navigate("/Bookings");
};
  /**
  The updateEventData function refreshes the states for all constants with a fetch statement for each.
  This way the data is refreshed after switching the booking.
  **/
  async function updateEventDataBookingHistory(e){
	e.preventDefault();
	fetch("http://localhost:8000/dataEventIDBookingHistory")
      .then((res) => res.json())
      .then((data) => setDataEventIDBookingHistory(data.dataEventIDBookingHistory));
	fetch("http://localhost:8000/dataEventNameBookingHistory")
      .then((res) => res.json())
      .then((data) => setDataEventNameBookingHistory(data.dataEventNameBookingHistory));  
	fetch("http://localhost:8000/dataOrganizerBookingHistory")
      .then((res) => res.json())
      .then((data) => setDataOrganizerBookingHistory(data.dataOrganizerBookingHistory)); 
    fetch("http://localhost:8000/dataEventVenueBookingHistory")
      .then((res) => res.json())
      .then((data) => setDataEventVenueBookingHistory(data.dataEventVenueBookingHistory));
    fetch("http://localhost:8000/dataVenueStreetNameBookingHistory")
      .then((res) => res.json())
      .then((data) => setDataVenueStreetNameBookingHistory(data.dataVenueStreetNameBookingHistory));
    fetch("http://localhost:8000/dataVenueHouseNumberBookingHistory")
      .then((res) => res.json())
      .then((data) => setDataVenueHouseNumberBookingHistory(data.dataVenueHouseNumberBookingHistory));
    fetch("http://localhost:8000/dataVenueCityBookingHistory")
      .then((res) => res.json())
      .then((data) => setDataVenueCityBookingHistory(data.dataVenueCityBookingHistory));
    fetch("http://localhost:8000/dataVenueCountryBookingHistory")
      .then((res) => res.json())
      .then((data) => setDataVenueCountryBookingHistory(data.dataVenueCountryBookingHistory));
    fetch("http://localhost:8000/dataEventGenreBookingHistory")
      .then((res) => res.json())
      .then((data) => setDataEventGenreBookingHistory(data.dataEventGenreBookingHistory));
    fetch("http://localhost:8000/dataEventDateBookingHistory")
      .then((res) => res.json())
      .then((data) => setDataEventDateBookingHistory(data.dataEventDateBookingHistory));
    fetch("http://localhost:8000/dataNumberSeatsBookingHistory")
      .then((res) => res.json())
      .then((data) => setDataNumberSeatsBookingHistory(data.dataNumberSeatsBookingHistory));
    fetch("http://localhost:8000/dataTicketPriceBookingHistory")
      .then((res) => res.json())
      .then((data) => setDataTicketPriceBookingHistory(data.dataTicketPriceBookingHistory));
    fetch("http://localhost:8000/dataEventDescriptionBookingHistory")
      .then((res) => res.json())
      .then((data) => setEventDescriptionBookingHistory(data.dataEventDescriptionBookingHistory));
    fetch("http://localhost:8000/bookingID")
      .then((res) => res.json())
      .then((data) => setBookingID(data.bookingID));
    fetch("http://localhost:8000/bookingTickets")
      .then((res) => res.json())
      .then((data) => setBookingTickets(data.bookingTickets));
    fetch("http://localhost:8000/bookingTotalPrice")
      .then((res) => res.json())
      .then((data) => setBookingTotalPrice(data.bookingTotalPrice));
    fetch("http://localhost:8000/bookingStatus")
      .then((res) => res.json())
      .then((data) => setBookingStatus(data.bookingStatus));  
  };
  /**
  The editBooking function sends the node POST-request for editing the booking and providing the booking_ID with it.
  After the node request is processed it will link to the EditBooking- page.
  **/
  async function editBooking(e){
	e.preventDefault();
	await axios.post("http://localhost:8080/reqEventsBookingEdit", {id: bookingID})
	  .then( async function (res) {
	});
	await navigate("/EditBooking");
};
  /**
  The cancelBooking function sends the node POST-request for canceling the booking and providing the booking_ID with it.
  After the node request is processed it will reload the page.
  **/
  async function cancelBooking(e){
	e.preventDefault();
	await axios.post("http://localhost:8080/cancelBooking", {id: bookingID})
	  .then( async function (res) {
	});
	await updateEventDataBookingHistory(e);
	await window.location.reload();
};
  /**
  The return statement returns the data provided for the current booking.
  It also holds the buttons for the previous booking, the next booking, editing
  and canceling the booking.
  **/	
  return (
  <div className="eventFrameWrapper">
    <div className="eventFrame" >
		<h3 className="h3-frame">
		   All bookings:<br /> {currentNumberBookingHistory+1} of {numberBookingHistory}
	    </h3>
		  Event: {dataEventNameBookingHistory}<br />
		  Organizer: {dataOrganizerBookingHistory}<br />
		  Venue: {dataEventVenueBookingHistory}<br />
		  Address: {dataVenueStreetNameBookingHistory} {dataVenueHouseNumberBookingHistory}<br />
		  {dataVenueCityBookingHistory} {dataVenueCountryBookingHistory}<br />
		  Genre: {dataEventGenreBookingHistory}<br />
		  Date: {dataEventDateBookingHistory}<br />
		  Seats: {dataNumberSeatsBookingHistory}<br />
		  Price: {dataTicketPriceBookingHistory}<br />
		  Description: {dataEventDescriptionBookingHistory}<br />
		  Number of Tickets: {bookingTickets}<br />
		  Total Price: {bookingTotalPrice}<br />
		  Booking status: {bookingStatus}<br />
		<div className="span-frame" >
		  <span><br />
		  <button onClick = {e => previousBooking(e)}>previous</button>
		  <button  onClick = {e => editBooking(e)} style={{visibility:(bookingStatus !== "canceled") ? "visible" : "hidden"}}>edit</button>
		  <button  onClick = {e => cancelBooking(e)} style={{visibility:(bookingStatus !== "canceled") ? "visible" : "hidden"}}>cancel</button>
		  <button onClick = {e => nextBooking(e)}>next</button>
		  </span>
		</div>
        </div>
		</div>
  )
};

export default Bookings;

