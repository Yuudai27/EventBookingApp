import React, { useState } from "react";
import "./App.css";
import axios from 'axios';
/**
The Register component represents an empty account of a customer, which have
to be filled out.
Following several states will be defined to provide constants
which can be dynamically updated.
**/
const Register = () => {
	/**
    These states provide the ID for the account, last and first name, birth date, credit card number,
    email address, address, favorite kind of events, favorite city, account name and the account password.
    **/
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [birthDate, setBirthDate] = useState("");
	const [creditCard, setCreditCard] = useState("");
	const [emailAddress, setEmailAddress] = useState("");
	const [streetName, setStreetName] = useState("");
	const [houseNumber, setHouseNumber] = useState("");
	const [city, setCity] = useState(""); 
	const [country, setCountry] = useState("");
	const [favoriteEvents, setFavoriteEvents] = useState("");
	const [favoriteCity, setFavoriteCity] = useState("");
	const [accountName, setAccountName] = useState("");
	const [accountPassword, setAccountPassword] = useState("");
	/**
	The SubmitHandler function sends a node POST request and providing all the
	inserted data to node to create a new account.
	After the node request has been processed the page will be reloaded.
	**/
	function SubmitHandler(e){
		e.preventDefault();
		axios.post("http://localhost:8080/createUser", {first_name: firstName, last_name: lastName, birth_date: birthDate, credit_card: creditCard, 
		email_address: emailAddress, street_name: streetName,house_number: houseNumber,city_name: city,country_name: country,favorite_events: favoriteEvents,
		favorite_city: favoriteCity,account_name: accountName,account_password: accountPassword})
		.then((res) => {
		window.location.reload();
		});
	};
  /**
  The return statement returns the form with inputfield for the account details.
  It also holds the button to register the account with these details.
  The password field is encrypted and doesnt show the real value.
  **/	
  return (  
  <form className="form" onSubmit= {e => SubmitHandler(e)}>
    <h1>Register your account!</h1>
	<h3>personal details</h3>
	<span>first name: </span> 
	<input name="firstName" type="text" value= {firstName} onChange={e => setFirstName(e.target.value)}/><br />
	<span>last name: </span> 
    <input name="lastName" type="text" value= {lastName} onChange={e => setLastName(e.target.value)}/><br />
	<span>birth date: </span> 
    <input name="birthDate" type="text" value= {birthDate} onChange={e => setBirthDate(e.target.value)}/><br /> 
	<span>credit card number: </span> 
    <input name="creditCard" type="text" value= {creditCard} onChange={e => setCreditCard(e.target.value)}/><br /> 
	<span>email address: </span> 
    <input name="emailAddress" type="text" value= {emailAddress} onChange={e => setEmailAddress(e.target.value)}/><br />
	<h3>address</h3>	
	<span>street: </span> 
    <input name="streetName" type="text" value= {streetName} onChange={e => setStreetName(e.target.value)}/><br />  
	<span>house number: </span> 
    <input name="houseNumber" type="text" value= {houseNumber} onChange={e => setHouseNumber(e.target.value)}/><br />  
	<span>city: </span> 
    <input name="city" type="text" value= {city} onChange={e => setCity(e.target.value)}/><br />  
	<span>country: </span> 
    <input name="country" type="text" value= {country} onChange={e => setCountry(e.target.value)}/><br /> 
    <h3>preferences</h3>	
	<span>favorite events:</span> 
    <input name="favoriteEvents" type="text" value= {favoriteEvents} onChange={e => setFavoriteEvents(e.target.value)}/><br />  
	<span>(music - sports - art - theatre - opera)</span><br />
	<span>favorite city: </span> 
    <input name="favoriteCity" type="text" value= {favoriteCity} onChange={e => setFavoriteCity(e.target.value)}/><br />
    <h3>account details</h3>	
	<span>account name: </span> 
    <input name="accountName" type="text" value= {accountName} onChange={e => setAccountName(e.target.value)}/><br />  
	<span>account password: </span> 
    <input name="accountPassword" type="password" value= {accountPassword} onChange={e => setAccountPassword(e.target.value)}/><br /> 
    <button type="submit">Register</button>
  </form>
  );
};

export default Register;

