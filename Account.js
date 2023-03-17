import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./App.css";
/**
The Account component represents an account of a customer logged in.
Following several states will be defined to provide constants
which can be dynamically updated.
**/
  const Account = () => {
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
  The return statement returns the data provided for the account.
  It also holds the button for the editing of the account, which is a 
  link to the AccountEdit- page.
  **/	
  return (
	<div className="form">
	
	<h1>Account</h1>
		<h3>personal details</h3>
	<p>
		First name: {dataFirstName}<br />
		Last name: {dataLastName}<br />
		Birth Date: {dataBirthDate}<br />
		Credit card number: {dataCreditCard}<br />
		Email address: {dataEmailAddress}<br />
		<h3>address</h3>
		Street name: {dataStreetName} House number: {dataHouseNumber}<br />
		City: {dataCity} {dataCountry}<br />
		<h3>preferences</h3>
		Favorite event: {dataFavoriteEvent}<br />
		Favorite city: {dataFavoriteCity}<br />
		<h3>account details</h3>
		Account name: {dataAccountName}<br />
		Account password: ***********<br />
		<Link to="/AccountEdit"><button type="submit">Edit details!</button></Link>
    </p>
	</div>
  );
};

export default Account;

