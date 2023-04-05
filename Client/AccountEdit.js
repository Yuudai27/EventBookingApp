import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import axios from 'axios';
/**
The AccountEdit component represents an account of a customer logged in
and chosen to be edited.
Following several states will be defined to provide constants
which can be dynamically updated.
**/
  const AccountEdit = () => {
  /**
  These states provide the ID for the account, last and first name, birth date, credit card number,
  email address, address, favorite kind of events, favorite city, account name and the account password.
  **/
  const [dataAccountID, setDataAccountID] = useState("");
  const [dataFirstName, setDataFirstName] = useState("");  
  const [dataLastName, setDataLastName] = useState("");
  const [dataBirthDate, setDataBirthDate] = useState("");
  const [dataCreditCard, setDataCreditCard] = useState("");
  const [dataEmailAddress, setDataEmailAddress] = useState("");
  const [dataStreetName, setDataStreetName] = useState("");
  const [dataHouseNumber, setDataHouseNumber] = useState("");
  const [dataCity, setDataCity] = useState("");
  const [dataCountry, setDataCountry] = useState("");
  const [dataFavoriteEvent, setDataFavoriteEvent] = useState("");
  const [dataFavoriteCity, setDataFavoriteCity] = useState("");
  const [dataAccountName, setDataAccountName] = useState("");
  const [dataAccountPassword, setDataAccountPassword] = useState("");
  //navigate provides the function to forward to another component in react-router.
  const navigate = useNavigate();
  /**
  The EditAccountHandler waits for the event of pressing the related button to
  send the renewed data of the account as node POST-request. After the node request has 
  been processed the Account page will linked to.
  **/
  function EditAccountHandler(e){
		e.preventDefault();
		axios.post("http://localhost:8080/editAccount", {customer_ID: dataAccountID,  last_name: dataLastName, credit_card: dataCreditCard, 
		street_name: dataStreetName,house_number: dataHouseNumber,city_name: dataCity,country_name: dataCountry,favorite_event: dataFavoriteEvent,
		favorite_city: dataFavoriteCity,account_password: dataAccountPassword})
		.then((res) => {
		navigate("/Account");
		});
	};
  /**
  The useEffect- functions provide the possibility to update the states via the
  node server.
  **/
  useEffect(() => {
    fetch("http://localhost:8000/dataAccountID")
      .then((res) => res.json())
      .then((data) => setDataAccountID(data.dataAccountID));
  }, []);
  useEffect(() => {
    fetch("http://localhost:8000/dataFirstName")
      .then((res) => res.json())
      .then((data) => setDataFirstName(data.dataFirstName));
  }, []);
  useEffect(() => {
    fetch("http://localhost:8000/dataLastName")
      .then((res) => res.json())
      .then((data) => setDataLastName(data.dataLastName));
  }, []);
  useEffect(() => {
    fetch("http://localhost:8000/dataBirthDate")
      .then((res) => res.json())
      .then((data) => setDataBirthDate(data.dataBirthDate));
  }, []);
  useEffect(() => {
    fetch("http://localhost:8000/dataCreditCard")
      .then((res) => res.json())
      .then((data) => setDataCreditCard(data.dataCreditCard));
  }, []);
  useEffect(() => {
    fetch("http://localhost:8000/dataEmailAddress")
      .then((res) => res.json())
      .then((data) => setDataEmailAddress(data.dataEmailAddress));
  }, []);
  useEffect(() => {
    fetch("http://localhost:8000/dataStreetName")
      .then((res) => res.json())
      .then((data) => setDataStreetName(data.dataStreetName));
  }, []);  
  useEffect(() => {
    fetch("http://localhost:8000/dataHouseNumber")
      .then((res) => res.json())
      .then((data) => setDataHouseNumber(data.dataHouseNumber));
  }, []); 
  useEffect(() => {
    fetch("http://localhost:8000/dataCity")
      .then((res) => res.json())
      .then((data) => setDataCity(data.dataCity));
  }, []);
  useEffect(() => {
    fetch("http://localhost:8000/dataCountry")
      .then((res) => res.json())
      .then((data) => setDataCountry(data.dataCountry));
  }, []);  
  useEffect(() => {
    fetch("http://localhost:8000/dataFavoriteEvent")
      .then((res) => res.json())
      .then((data) => setDataFavoriteEvent(data.dataFavoriteEvent));
  }, []);  
  useEffect(() => {
    fetch("http://localhost:8000/dataFavoriteCity")
      .then((res) => res.json())
      .then((data) => setDataFavoriteCity(data.dataFavoriteCity));
  }, []);  
  useEffect(() => {
    fetch("http://localhost:8000/dataAccountName")
      .then((res) => res.json())
      .then((data) => setDataAccountName(data.dataAccountName));
  }, []);  
  useEffect(() => {
    fetch("http://localhost:8000/dataAccountPassword")
      .then((res) => res.json())
      .then((data) => setDataAccountPassword(data.dataAccountPassword));
  }, []);
  /**
  The return statement returns the data provided for the current account to be edited.
  All fields are input fields. Except the fields for first name, birth date, email address
  and account name all fields can be changed. The password field is encrypted and doesnt 
  show the real value.
  The submit button allows to call the EditAccountHandlet function of the form.
  **/		
  return (
	<div >
	<h1>Edit account details</h1>
	<form className="form" onSubmit= {e => EditAccountHandler(e)}> 
	    <h3>personal details</h3>
		<span>first name:</span> 
		<input class="unchangeable" name="firstName" type="text" value= {dataFirstName} /><br />
		<span>last name: </span> 
		<input name="lastName" type="text" value= {dataLastName} onChange={e => setDataLastName(e.target.value)}/><br />
		<span>birth date: </span> 
		<input class="unchangeable" name="birthDate" type="text" value= {dataBirthDate} /><br /> 
		<span>credit card number: </span> 
		<input name="creditCard" type="text" value= {dataCreditCard} onChange={e => setDataCreditCard(e.target.value)}/><br /> 
		<span>email address: </span> 
		<input class="unchangeable" name="emailAddress" type="text" value= {dataEmailAddress} /><br />
		<h3>address</h3>	
		<span>street: </span> 
		<input name="streetName" type="text" value= {dataStreetName} onChange={e => setDataStreetName(e.target.value)}/><br />  
		<span>house number: </span> 
		<input name="houseNumber" type="text" value= {dataHouseNumber} onChange={e => setDataHouseNumber(e.target.value)}/><br />  
		<span>city: </span> 
		<input name="city" type="text" value= {dataCity} onChange={e => setDataCity(e.target.value)}/><br />  
		<span>country: </span> 
		<input name="country" type="text" value= {dataCountry} onChange={e => setDataCountry(e.target.value)}/><br /> 
		<h3>preferences</h3>	
		<span>favorite events: </span> 
		<input name="favoriteEvents" type="text" value= {dataFavoriteEvent} onChange={e => setDataFavoriteEvent(e.target.value)}/><br />   
		<span>(music - sports - art - theatre - opera)</span><br /> 
		<span>favorite city: </span> 
		<input name="favoriteCity" type="text" value= {dataFavoriteCity} onChange={e => setDataFavoriteCity(e.target.value)}/><br />
		<h3>account details</h3>	
		<span>account name: </span> 
		<input class="unchangeable" name="accountName" type="text" value= {dataAccountName} /><br />  
		<span>account password: </span> 
		<input name="accountPassword" type="password" value= {dataAccountPassword} onChange={e => setDataAccountPassword(e.target.value)}/><br /> 
		<button type="submit">Submit</button>
	</form>
	</div>
  );
};

export default AccountEdit;

