import React, { useState, useEffect } from "react";
import "./App.css";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
/**
The App component displays all events, favorite city events and favorite genre events.
Following several states will be defined to provide constants which can be dynamically updated.
**/
function App () {
  /**
  These states provide the ID for the current event, its name, organizer, the venue,
  address, genre, date, number of seats, the price and the description.
  These states exist for all 3 variants
  **/	
  const [accountIDApp, setAccountIDApp] = React.useState(0);
  const [dataEventID, setDataEventID] = useState("");  
  const [dataEventName, setDataEventName] = useState("");
  const [dataOrganizer, setDataOrganizer] = useState("");
  const [dataEventVenue, setDataEventVenue] = useState("");
  const [dataVenueStreetName, setDataVenueStreetName] = useState("");
  const [dataVenueHouseNumber, setDataVenueHouseNumber] = useState("");
  const [dataVenueCity, setDataVenueCity] = useState("");
  const [dataVenueCountry, setDataVenueCountry] = useState("");
  const [dataEventGenre, setDataEventGenre] = useState("");
  const [dataEventDate, setDataEventDate] = useState("");
  const [dataNumberSeats, setDataNumberSeats] = useState("");
  const [dataTicketPrice, setDataTicketPrice] = useState("");
  const [dataEventDescription, setEventDescription] = useState("");
  /**
  The currentNumber and the number state keep the current event index and the maximum Number
  of events.
  **/
  const [numberEvents, setNumberEvents] = useState("");
  const [currentEventNumber, setCurrentEventNumber] = useState(1);
  const [dataEventIDGenre, setDataEventIDGenre] = useState("");  
  const [dataEventNameGenre, setDataEventNameGenre] = useState("");
  const [dataOrganizerGenre, setDataOrganizerGenre] = useState("");
  const [dataEventVenueGenre, setDataEventVenueGenre] = useState("");
  const [dataVenueStreetNameGenre, setDataVenueStreetNameGenre] = useState("");
  const [dataVenueHouseNumberGenre, setDataVenueHouseNumberGenre] = useState("");
  const [dataVenueCityGenre, setDataVenueCityGenre] = useState("");
  const [dataVenueCountryGenre, setDataVenueCountryGenre] = useState("");
  const [dataEventGenreGenre, setDataEventGenreGenre] = useState("");
  const [dataEventDateGenre, setDataEventDateGenre] = useState("");
  const [dataNumberSeatsGenre, setDataNumberSeatsGenre] = useState("");
  const [dataTicketPriceGenre, setDataTicketPriceGenre] = useState("");
  const [dataEventDescriptionGenre, setEventDescriptionGenre] = useState("");
  /**
  The currentNumber and the number state keep the current events index of the customers favorite genre 
  and the maximum Number realted to it for the customers account.
  **/
  const [numberEventsGenre, setNumberEventsGenre] = useState("");
  const [currentEventNumberGenre, setCurrentEventNumberGenre] = useState(0);
  const [dataEventIDCities, setDataEventIDCities] = useState("");  
  const [dataEventNameCities, setDataEventNameCities] = useState("");
  const [dataOrganizerCities, setDataOrganizerCities] = useState("");
  const [dataEventVenueCities, setDataEventVenueCities] = useState("");
  const [dataVenueStreetNameCities, setDataVenueStreetNameCities] = useState("");
  const [dataVenueHouseNumberCities, setDataVenueHouseNumberCities] = useState("");
  const [dataVenueCityCities, setDataVenueCityCities] = useState("");
  const [dataVenueCountryCities, setDataVenueCountryCities] = useState("");
  const [dataEventGenreCities, setDataEventGenreCities] = useState("");
  const [dataEventDateCities, setDataEventDateCities] = useState("");
  const [dataNumberSeatsCities, setDataNumberSeatsCities] = useState("");
  const [dataTicketPriceCities, setDataTicketPriceCities] = useState("");
  const [dataEventDescriptionCities, setEventDescriptionCities] = useState("");
  /**
  The currentNumber and the number state keep the current events index of the customers favorite city 
  and the maximum Number realted to it for the customers account.
  **/
  const [numberEventsCities, setNumberEventsCities] = useState("");
  const [currentEventNumberCities, setCurrentEventNumberCities] = useState(0);
  //navigate provides the function to forward to another component in react-router.
  const navigate = useNavigate();
/**
The handleResize function gets invoked of the eventListener, which checks for
resizing events. The function reloads the page.
**/     
function handleResize(){
	window.location.reload();
}
window.addEventListener('resize', handleResize)
  /**
  The previousEvent function can be invoked if the related currentNumber index is higher than 0 and
  it than calls the related event with the currentNumber -1.
  After the node request is processed the value for the currentNumber will be decreased
  and the updateEventData function called.
  Finally the App- page will be called again to renew the values of the states in the browser.
  **/
async function previousEvent(e){
	e.preventDefault();
	if(currentEventNumber > 1){
	  await axios.post("http://localhost:8080/reqEvents", {id: currentEventNumber-1})
	    .then( async function (res) {
		}); 
	  await setCurrentEventNumber(currentEventNumber-1);
	}
	await updateEventData(e);
	await navigate("/App");
};
  /**
  The nextEvent function can be invoked if the related currentNumber index is lower than the related maximum number of events and
  it than calls the related event with the currentNumber +1.
  After the node request is processed the value for the currentNumber will be increased
  and the updateEventData function called.
  Finally the App- page will be called again to renew the values of the states in the browser.
  **/
async function nextEvent(e){
	e.preventDefault();
	if(currentEventNumber < numberEvents){
	  await axios.post("http://localhost:8080/reqEvents", {id: currentEventNumber+1})
	    .then( async function (res) {
		});
	  await setCurrentEventNumber(currentEventNumber+1);
	}
	await updateEventData(e);
	await navigate("/App");
};
  /**
  The previousEventGenre function can be invoked if the related currentNumber index is higher than 0 and
  it than calls the related event with the currentNumber -1.
  After the node request is processed the value for the currentNumber will be decreased
  and the updateEventData function called.
  Finally the App- page will be called again to renew the values of the states in the browser.
  **/
async function previousEventGenre(e){
	e.preventDefault();
	if(currentEventNumberGenre > 0){
	  await axios.post("http://localhost:8080/reqEventsGenre", {id: currentEventNumberGenre-1})
	    .then( async function (res) {
		}); 
	  await setCurrentEventNumberGenre(currentEventNumberGenre-1);
	}
	await updateEventDataGenre(e);
	await navigate("/App");
};
  /**
  The nextEventGenre function can be invoked if the related currentNumber index is lower than the related maximum number of events and
  it than calls the related event with the currentNumber +1.
  After the node request is processed the value for the currentNumber will be increased
  and the updateEventData function called.
  Finally the App- page will be called again to renew the values of the states in the browser.
  **/
async function nextEventGenre(e){
	e.preventDefault();
	if(currentEventNumberGenre < numberEventsGenre-1){
	  await axios.post("http://localhost:8080/reqEventsGenre", {id: currentEventNumberGenre+1})
	    .then( async function (res) {
		});
	  await setCurrentEventNumberGenre(currentEventNumberGenre+1);
	}
	await updateEventDataGenre(e);
	await navigate("/App");
};
  /**
  The previousEventCities function can be invoked if the related currentNumber index is higher than 0 and
  it than calls the related event with the currentNumber -1.
  After the node request is processed the value for the currentNumber will be decreased
  and the updateEventData function called.
  Finally the App- page will be called again to renew the values of the states in the browser.
  **/
async function previousEventCities(e){
	e.preventDefault();
	if(currentEventNumberCities > 0){
	  await axios.post("http://localhost:8080/reqEventsCities", {id: currentEventNumberCities-1})
	    .then( async function (res) {
		}); 
	  await setCurrentEventNumberCities(currentEventNumberCities-1);
	}
	await updateEventDataCities(e);
	await navigate("/App");
};
  /**
  The nextEventCities function can be invoked if the related currentNumber index is lower than the related maximum number of events and
  it than calls the related event with the currentNumber +1.
  After the node request is processed the value for the currentNumber will be increased
  and the updateEventData function called.
  Finally the App- page will be called again to renew the values of the states in the browser.
  **/
async function nextEventCities(e){
	e.preventDefault();
	if(currentEventNumberCities < numberEventsCities-1){
	  await axios.post("http://localhost:8080/reqEventsCities", {id: currentEventNumberCities+1})
	    .then( async function (res) {
		});
	  await setCurrentEventNumberCities(currentEventNumberCities+1);
	}
	await updateEventDataCities(e);
	await navigate("/App");
};
  /**
  The bookingEvent send the node POST request with providing the event_ID.
  After the request is processed the page will be linked to the Event- page.
  **/
async function bookingEvent(e){
	e.preventDefault();
	await axios.post("http://localhost:8080/reqEventBooking", {id: dataEventID})
	    .then( async function (res) {
		});
	await navigate("/Event");	
};
  /**
  The bookingEventGenre send the node POST request with providing the event_ID.
  After the request is processed the page will be linked to the Event- page.
  **/
async function bookingEventGenre(e){
	e.preventDefault();
	await axios.post("http://localhost:8080/reqEventBooking", {id: dataEventIDGenre})
	    .then( async function (res) {
		});
	await navigate("/Event");	
};
  /**
  The bookingEventCities send the node POST request with providing the event_ID.
  After the request is processed the page will be linked to the Event- page.
  **/
async function bookingEventCities(e){
	e.preventDefault();
	await axios.post("http://localhost:8080/reqEventBooking", {id: dataEventIDCities})
	    .then( async function (res) {
		});
	await navigate("/Event");	
};
 /**
 The updateEventData function updates all states with related fetch statements.
 **/
async function updateEventData(e){
	e.preventDefault();
	fetch("http://localhost:8000/dataEventID")
      .then((res) => res.json())
      .then((data) => setDataEventID(data.dataEventID));
	fetch("http://localhost:8000/dataEventName")
      .then((res) => res.json())
      .then((data) => setDataEventName(data.dataEventName));  
	fetch("http://localhost:8000/dataOrganizer")
      .then((res) => res.json())
      .then((data) => setDataOrganizer(data.dataOrganizer)); 
    fetch("http://localhost:8000/dataEventVenue")
      .then((res) => res.json())
      .then((data) => setDataEventVenue(data.dataEventVenue));
    fetch("http://localhost:8000/dataVenueStreetName")
      .then((res) => res.json())
      .then((data) => setDataVenueStreetName(data.dataVenueStreetName));
    fetch("http://localhost:8000/dataVenueHouseNumber")
      .then((res) => res.json())
      .then((data) => setDataVenueHouseNumber(data.dataVenueHouseNumber));
    fetch("http://localhost:8000/dataVenueCity")
      .then((res) => res.json())
      .then((data) => setDataVenueCity(data.dataVenueCity));
    fetch("http://localhost:8000/dataVenueCountry")
      .then((res) => res.json())
      .then((data) => setDataVenueCountry(data.dataVenueCountry));
    fetch("http://localhost:8000/dataEventGenre")
      .then((res) => res.json())
      .then((data) => setDataEventGenre(data.dataEventGenre));
    fetch("http://localhost:8000/dataEventDate")
      .then((res) => res.json())
      .then((data) => setDataEventDate(data.dataEventDate));
    fetch("http://localhost:8000/dataNumberSeats")
      .then((res) => res.json())
      .then((data) => setDataNumberSeats(data.dataNumberSeats));
    fetch("http://localhost:8000/dataTicketPrice")
      .then((res) => res.json())
      .then((data) => setDataTicketPrice(data.dataTicketPrice));
    fetch("http://localhost:8000/dataEventDescription")
      .then((res) => res.json())
      .then((data) => setEventDescription(data.dataEventDescription));	  
};
 /**
 The updateEventDataGenre function updates all states with related fetch statements.
 **/
async function updateEventDataGenre(e){
	e.preventDefault();
	fetch("http://localhost:8000/dataEventIDGenre")
      .then((res) => res.json())
      .then((data) => setDataEventIDGenre(data.dataEventIDGenre));
	fetch("http://localhost:8000/dataEventNameGenre")
      .then((res) => res.json())
      .then((data) => setDataEventNameGenre(data.dataEventNameGenre));  
	fetch("http://localhost:8000/dataOrganizerGenre")
      .then((res) => res.json())
      .then((data) => setDataOrganizerGenre(data.dataOrganizerGenre)); 
    fetch("http://localhost:8000/dataEventVenueGenre")
      .then((res) => res.json())
      .then((data) => setDataEventVenueGenre(data.dataEventVenueGenre));
    fetch("http://localhost:8000/dataVenueStreetNameGenre")
      .then((res) => res.json())
      .then((data) => setDataVenueStreetNameGenre(data.dataVenueStreetNameGenre));
    fetch("http://localhost:8000/dataVenueHouseNumberGenre")
      .then((res) => res.json())
      .then((data) => setDataVenueHouseNumberGenre(data.dataVenueHouseNumberGenre));
    fetch("http://localhost:8000/dataVenueCityGenre")
      .then((res) => res.json())
      .then((data) => setDataVenueCityGenre(data.dataVenueCityGenre));
    fetch("http://localhost:8000/dataVenueCountryGenre")
      .then((res) => res.json())
      .then((data) => setDataVenueCountryGenre(data.dataVenueCountryGenre));
    fetch("http://localhost:8000/dataEventGenreGenre")
      .then((res) => res.json())
      .then((data) => setDataEventGenreGenre(data.dataEventGenreGenre));
    fetch("http://localhost:8000/dataEventDateGenre")
      .then((res) => res.json())
      .then((data) => setDataEventDateGenre(data.dataEventDateGenre));
    fetch("http://localhost:8000/dataNumberSeatsGenre")
      .then((res) => res.json())
      .then((data) => setDataNumberSeatsGenre(data.dataNumberSeatsGenre));
    fetch("http://localhost:8000/dataTicketPriceGenre")
      .then((res) => res.json())
      .then((data) => setDataTicketPriceGenre(data.dataTicketPriceGenre));
    fetch("http://localhost:8000/dataEventDescriptionGenre")
      .then((res) => res.json())
      .then((data) => setEventDescriptionGenre(data.dataEventDescriptionGenre));	  
};
 /**
 The updateEventDataCities function updates all states with related fetch statements.
 **/
async function updateEventDataCities(e){
	e.preventDefault();
	fetch("http://localhost:8000/dataEventIDCities")
      .then((res) => res.json())
      .then((data) => setDataEventIDCities(data.dataEventIDCities));
	fetch("http://localhost:8000/dataEventNameCities")
      .then((res) => res.json())
      .then((data) => setDataEventNameCities(data.dataEventNameCities));  
	fetch("http://localhost:8000/dataOrganizerCities")
      .then((res) => res.json())
      .then((data) => setDataOrganizerCities(data.dataOrganizerCities)); 
    fetch("http://localhost:8000/dataEventVenueCities")
      .then((res) => res.json())
      .then((data) => setDataEventVenueCities(data.dataEventVenueCities));
    fetch("http://localhost:8000/dataVenueStreetNameCities")
      .then((res) => res.json())
      .then((data) => setDataVenueStreetNameCities(data.dataVenueStreetNameCities));
    fetch("http://localhost:8000/dataVenueHouseNumberCities")
      .then((res) => res.json())
      .then((data) => setDataVenueHouseNumberCities(data.dataVenueHouseNumberCities));
    fetch("http://localhost:8000/dataVenueCityCities")
      .then((res) => res.json())
      .then((data) => setDataVenueCityCities(data.dataVenueCityCities));
    fetch("http://localhost:8000/dataVenueCountryCities")
      .then((res) => res.json())
      .then((data) => setDataVenueCountryCities(data.dataVenueCountryCities));
    fetch("http://localhost:8000/dataEventGenreCities")
      .then((res) => res.json())
      .then((data) => setDataEventGenreCities(data.dataEventGenreCities));
    fetch("http://localhost:8000/dataEventDateCities")
      .then((res) => res.json())
      .then((data) => setDataEventDateCities(data.dataEventDateCities));
    fetch("http://localhost:8000/dataNumberSeatsCities")
      .then((res) => res.json())
      .then((data) => setDataNumberSeatsCities(data.dataNumberSeatsCities));
    fetch("http://localhost:8000/dataTicketPriceCities")
      .then((res) => res.json())
      .then((data) => setDataTicketPriceCities(data.dataTicketPriceCities));
    fetch("http://localhost:8000/dataEventDescriptionCities")
      .then((res) => res.json())
      .then((data) => setEventDescriptionCities(data.dataEventDescriptionCities));	  
};
 /**
  The useEffect- functions provide the possibility to update the states via the
  node server.
  **/
  useEffect(() => {
    fetch("http://localhost:8000/numberEvents")
      .then((res) => res.json())
      .then((data) => setNumberEvents(data.numberEvents));
  }, []);
  useEffect(() => {
    fetch("http://localhost:8000/accountIDApp")
      .then((res) => res.json())
      .then((data) => setAccountIDApp(data.accountIDApp));
  }, []);
  useEffect(() => {
    fetch("http://localhost:8000/numberEventsGenre")
      .then((res) => res.json())
      .then((data) => setNumberEventsGenre(data.numberEventsGenre));
  }, []);
  useEffect(() => {
    fetch("http://localhost:8000/numberEventsCities")
      .then((res) => res.json())
      .then((data) => setNumberEventsCities(data.numberEventsCities));
  }, []);
  useEffect(() => {
    fetch("http://localhost:8000/dataEventID")
      .then((res) => res.json())
      .then((data) => setDataEventID(data.dataEventID));
  }, []);
  useEffect(() => {
    fetch("http://localhost:8000/dataEventName")
      .then((res) => res.json())
      .then((data) => setDataEventName(data.dataEventName));
  }, []);
  useEffect(() => {
    fetch("http://localhost:8000/dataOrganizer")
      .then((res) => res.json())
      .then((data) => setDataOrganizer(data.dataOrganizer));
  }, []);
  useEffect(() => {
    fetch("http://localhost:8000/dataEventVenue")
      .then((res) => res.json())
      .then((data) => setDataEventVenue(data.dataEventVenue));
  }, []);
  useEffect(() => {
    fetch("http://localhost:8000/dataVenueStreetName")
      .then((res) => res.json())
      .then((data) => setDataVenueStreetName(data.dataVenueStreetName));
  }, []);  
  useEffect(() => {
    fetch("http://localhost:8000/dataVenueHouseNumber")
      .then((res) => res.json())
      .then((data) => setDataVenueHouseNumber(data.dataVenueHouseNumber));
  }, []); 
  useEffect(() => {
    fetch("http://localhost:8000/dataVenueCity")
      .then((res) => res.json())
      .then((data) => setDataVenueCity(data.dataVenueCity));
  }, []);
  useEffect(() => {
    fetch("http://localhost:8000/dataVenueCountry")
      .then((res) => res.json())
      .then((data) => setDataVenueCountry(data.dataVenueCountry));
  }, []);  
  useEffect(() => {
    fetch("http://localhost:8000/dataEventGenre")
      .then((res) => res.json())
      .then((data) => setDataEventGenre(data.dataEventGenre));
  }, []);  
  useEffect(() => {
    fetch("http://localhost:8000/dataEventDate")
      .then((res) => res.json())
      .then((data) => setDataEventDate(data.dataEventDate));
  }, []);  
  useEffect(() => {
    fetch("http://localhost:8000/dataNumberSeats")
      .then((res) => res.json())
      .then((data) => setDataNumberSeats(data.dataNumberSeats));
  }, []);  
  useEffect(() => {
    fetch("http://localhost:8000/dataTicketPrice")
      .then((res) => res.json())
      .then((data) => setDataTicketPrice(data.dataTicketPrice));
  }, []);  
  useEffect(() => {
    fetch("http://localhost:8000/dataEventDescription")
      .then((res) => res.json())
      .then((data) => setEventDescription(data.dataEventDescription));
  }, []);  

  useEffect(() => { 
    fetch("http://localhost:8000/dataEventIDCities")
      .then((res) => res.json())
      .then((data) => setDataEventIDCities(data.dataEventIDCities));
  }, []);
  useEffect(() => {
	fetch("http://localhost:8000/dataEventNameCities")
      .then((res) => res.json())
      .then((data) => setDataEventNameCities(data.dataEventNameCities)); 
  }, []);
  useEffect(() => { 
	fetch("http://localhost:8000/dataOrganizerCities")
      .then((res) => res.json())
      .then((data) => setDataOrganizerCities(data.dataOrganizerCities));
  }, []);
  useEffect(() => { 
    fetch("http://localhost:8000/dataEventVenueCities")
      .then((res) => res.json())
      .then((data) => setDataEventVenueCities(data.dataEventVenueCities));
  }, []);
  useEffect(() => {
    fetch("http://localhost:8000/dataVenueStreetNameCities")
      .then((res) => res.json())
      .then((data) => setDataVenueStreetNameCities(data.dataVenueStreetNameCities));
  }, []);
  useEffect(() => {
    fetch("http://localhost:8000/dataVenueHouseNumberCities")
      .then((res) => res.json())
      .then((data) => setDataVenueHouseNumberCities(data.dataVenueHouseNumberCities));
  }, []);
  useEffect(() => {
    fetch("http://localhost:8000/dataVenueCityCities")
      .then((res) => res.json())
      .then((data) => setDataVenueCityCities(data.dataVenueCityCities));
  }, []);
  useEffect(() => {
    fetch("http://localhost:8000/dataVenueCountryCities")
      .then((res) => res.json())
      .then((data) => setDataVenueCountryCities(data.dataVenueCountryCities));
  }, []);
  useEffect(() => {
    fetch("http://localhost:8000/dataEventGenreCities")
      .then((res) => res.json())
      .then((data) => setDataEventGenreCities(data.dataEventGenreCities));
  }, []);
  useEffect(() => {
    fetch("http://localhost:8000/dataEventDateCities")
      .then((res) => res.json())
      .then((data) => setDataEventDateCities(data.dataEventDateCities));
  }, []);
  useEffect(() => {
    fetch("http://localhost:8000/dataNumberSeatsCities")
      .then((res) => res.json())
      .then((data) => setDataNumberSeatsCities(data.dataNumberSeatsCities));
  }, []);
  useEffect(() => {
    fetch("http://localhost:8000/dataTicketPriceCities")
      .then((res) => res.json())
      .then((data) => setDataTicketPriceCities(data.dataTicketPriceCities));
  }, []);
  useEffect(() => {
    fetch("http://localhost:8000/dataEventDescriptionCities")
      .then((res) => res.json())
      .then((data) => setEventDescriptionCities(data.dataEventDescriptionCities));
  }, []);
  
  useEffect(() => {
    fetch("http://localhost:8000/dataEventIDGenre")
      .then((res) => res.json())
      .then((data) => setDataEventIDGenre(data.dataEventIDGenre));
  }, []);
  useEffect(() => {
	fetch("http://localhost:8000/dataEventNameGenre")
      .then((res) => res.json())
      .then((data) => setDataEventNameGenre(data.dataEventNameGenre));
  }, []);
  useEffect(() => {  
	fetch("http://localhost:8000/dataOrganizerGenre")
      .then((res) => res.json())
      .then((data) => setDataOrganizerGenre(data.dataOrganizerGenre)); 
  }, []);
  useEffect(() => {
    fetch("http://localhost:8000/dataEventVenueGenre")
      .then((res) => res.json())
      .then((data) => setDataEventVenueGenre(data.dataEventVenueGenre));
  }, []);
  useEffect(() => {
    fetch("http://localhost:8000/dataVenueStreetNameGenre")
      .then((res) => res.json())
      .then((data) => setDataVenueStreetNameGenre(data.dataVenueStreetNameGenre));
  }, []);
  useEffect(() => {
    fetch("http://localhost:8000/dataVenueHouseNumberGenre")
      .then((res) => res.json())
      .then((data) => setDataVenueHouseNumberGenre(data.dataVenueHouseNumberGenre));
  }, []);
  useEffect(() => {
    fetch("http://localhost:8000/dataVenueCityGenre")
      .then((res) => res.json())
      .then((data) => setDataVenueCityGenre(data.dataVenueCityGenre));
  }, []);
  useEffect(() => {
    fetch("http://localhost:8000/dataVenueCountry")
      .then((res) => res.json())
      .then((data) => setDataVenueCountryGenre(data.dataVenueCountryGenre));
  }, []);
  useEffect(() => {
    fetch("http://localhost:8000/dataEventGenreGenre")
      .then((res) => res.json())
      .then((data) => setDataEventGenreGenre(data.dataEventGenreGenre));
  }, []);
  useEffect(() => {
    fetch("http://localhost:8000/dataEventDateGenre")
      .then((res) => res.json())
      .then((data) => setDataEventDateGenre(data.dataEventDateGenre));
  }, []);
  useEffect(() => {
    fetch("http://localhost:8000/dataNumberSeatsGenre")
      .then((res) => res.json())
      .then((data) => setDataNumberSeatsGenre(data.dataNumberSeatsGenre));
  }, []);
  useEffect(() => {
    fetch("http://localhost:8000/dataTicketPriceGenre")
      .then((res) => res.json())
      .then((data) => setDataTicketPriceGenre(data.dataTicketPriceGenre));
  }, []);
  useEffect(() => {
    fetch("http://localhost:8000/dataEventDescriptionGenre")
      .then((res) => res.json())
      .then((data) => setEventDescriptionGenre(data.dataEventDescriptionGenre));
  }, []);
  /**
  The return statement holds the 3 div items for each typ of event (all/ favorite city/ favorite genre) with its related 
  buttons for previous, next and book event. If no customer is logged in the book- button for all events and the favorite
  events will be hidden.
  **/  
  return (
    <div className="App" style={{flexDirection:(window.innerWidth>600) ? "row" : "column"}}>
	  
		<div className="eventFrame">
		<h3 className="h3-frame">
		   All events:<br /> {currentEventNumber} of {numberEvents}
	    </h3>
		  Event: {dataEventName}<br />
		  Organizer: {dataOrganizer}<br />
		  Venue: {dataEventVenue}<br />
		  Address: {dataVenueStreetName} {dataVenueHouseNumber}<br />
		  {dataVenueCity} {dataVenueCountry}<br />
		  Genre: {dataEventGenre}<br />
		  Date: {dataEventDate}<br />
		  Seats: {dataNumberSeats}<br />
		  Price: {dataTicketPrice}<br />
		  Description: {dataEventDescription}<br />
		<div className="span-frame">
		  <span><br />
		  <button onClick = {e => previousEvent(e)}>previous</button>
		  <button onClick = {e => bookingEvent(e)} style={{visibility:(accountIDApp > 0) ? "visible" : "hidden"}}>book</button>
		  <button onClick = {e => nextEvent(e)}>next</button>
		  </span>
		</div>
        </div>
		<div className="eventFrameCities" style={{visibility:(accountIDApp > 0 && numberEventsCities > 0) ? "visible" : "hidden"}}>
		<h3 className="h3-frame">
		   Events in your city:<br /> {currentEventNumberCities+1} of {numberEventsCities}
	    </h3>
		  Event: {dataEventNameCities}<br />
		  Organizer: {dataOrganizerCities}<br />
		  Venue: {dataEventVenueCities}<br />
		  Address: {dataVenueStreetNameCities} {dataVenueHouseNumberCities}<br />
		  {dataVenueCityCities} {dataVenueCountryCities}<br />
		  Genre: {dataEventGenreCities}<br />
		  Date: {dataEventDateCities}<br />
		  Seats: {dataNumberSeatsCities}<br />
		  Price: {dataTicketPriceCities}<br />
		  Description: {dataEventDescriptionCities}<br />
		<div className="span-frame">
		  <span><br />
		  <button onClick = {e => previousEventCities(e)}>previous</button>
		  <button onClick = {e => bookingEventCities(e)}>book</button>
		  <button onClick = {e => nextEventCities(e)}>next</button>
		  </span>
		</div>
        </div>
<div className="eventFrameGenre" style={{visibility: (accountIDApp > 0 && numberEventsGenre > 0) ? "visible" : "hidden"}}>
		<h3 className="h3-frame">
		   Event of your genre:<br /> {currentEventNumberGenre+1} of {numberEventsGenre}
	    </h3>
		  Event: {dataEventNameGenre}<br />
		  Organizer: {dataOrganizerGenre}<br />
		  Venue: {dataEventVenueGenre}<br />
		  Address: {dataVenueStreetNameGenre} {dataVenueHouseNumberGenre}<br />
		  {dataVenueCityGenre} {dataVenueCountryGenre}<br />
		  Genre: {dataEventGenreGenre}<br />
		  Date: {dataEventDateGenre}<br />
		  Seats: {dataNumberSeatsGenre}<br />
		  Price: {dataTicketPriceGenre}<br />
		  Description: {dataEventDescriptionGenre}<br />
		<div className="span-frame">
		  <span><br />
		  <button onClick = {e => previousEventGenre(e)}>previous</button>
		  <button onClick = {e => bookingEventGenre(e)}>book</button>
		  <button onClick = {e => nextEventGenre(e)}>next</button>
		  </span>
		</div>
        </div>
    </div>
  );
}

export default App


