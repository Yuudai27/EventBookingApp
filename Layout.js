import React, { useState } from "react";
import "./App.css";
import { Outlet, Link, useNavigate } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import axios from 'axios';
 /**
The Layout component represents the navigation bar on every page and the entry point of the 
application.
Following several states will be defined to provide constants which can be dynamically updated.
**/
const Layout = () => {
  /**
  These states provide the status of the log in dialogue box, the loggedIn state, the status of 
  the logInError message, the accountID of the customer logged in and the account name and its
  password.
  **/
  const [open, setOpen] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [logInError, setLogInError] = React.useState(false);
  const [accountID, setAccountID] = React.useState(0);
  const [accountNameLog, setAccountNameLog] = React.useState("");
  const [accountPasswordLog, setAccountPasswordLog] = React.useState("");
  //navigate provides the function to forward to another component in react-router.
  const navigate = useNavigate();
  /**
  The handleClickToOpen function opens the dialogue box for the log in,
  when the related button got pressed and sets the open value to true.
  **/
  function handleClickToOpen(e) { 
    e.preventDefault();
	setOpen(true);
  };
  /**
  The handleClickToClose function closes the dialogue box for the log in,
  when the related button got pressed or the function invoked and sets the 
  open value to false.
  **/
  function handleToClose(e) {
	e.preventDefault();
    setOpen(false);
  }; 
  /**
  The handleErrorToOpen function opens the message box for the log in error,
  when the related event got triggered and sets the open value to true.
  **/
  function handleErrorToOpen(e) { 
    e.preventDefault();
	setLogInError(true);
  };
  /**
  The handleClickToClose function closes the message box for the log in error,
  when the related button got pressed and sets the open value to false.
  **/
  function handleErrorToClose(e) {
	e.preventDefault();
    setLogInError(false);
  }; 
  /**
  The GetEvents function sends the node POST request to get the number of all avaiable events.
  It then request from the node server the details for the event with the id 1.
  After all requests are processed it will link to the App- page.
  The function gets invoked by pressing the Event- button in the navigation bar.
  **/
async function GetEvents(e){
	e.preventDefault();
	axios.post("http://localhost:8080/getEvents", {})
	  .then( async function (res) {
		  await axios.post("http://localhost:8080/reqEvents", {id: 1})
	  .then( async function (res) {});
	  await navigate ("/App");
	});
};
  /**
  The GetBookings function sends the node POST request to get the number of all made bookings
  for the customer.
  It then request from the node server the details for the booking with the id 0 of the result
  array on the node server.
  After all requests are processed it will link to the Bookings- page.
  The function gets invoked by pressing the Bookings- button in the navigation bar.
  **/
async function GetBookings(e){
	e.preventDefault();
	if(loggedIn){
	axios.post("http://localhost:8080/getNumberBookings", {})
	  .then( async function (res) {
		  await axios.post("http://localhost:8080/reqEventsBookingHistory", {id: 0})
	  .then( async function (res) {});
	  await navigate ("/Bookings");
	});
	}
};
  /**
  The GetEventsCities function sends the node POST request to get the number of all avaiable events
  in the customers favorite city.
  It then request from the node server the details for the event with the id 0 of the result
  array on the node server.
  The function gets invoked by the log in function.
  **/
async function GetEventsCities(e, id){
	e.preventDefault();
	await axios.post("http://localhost:8080/getEventsCities", {customer_ID: id})
	  .then( async function (res) {
		  await axios.post("http://localhost:8080/reqEventsCities", {id: 0})
	  .then( async function (res) {});
	});
};
  /**
  The GetEventsGenre function sends the node POST request to get the number of all avaiable events
  for the customers favorite genre.
  It then request from the node server the details for the event with the id 0 of the result
  array on the node server.
  The function gets invoked by the log in function.
  **/
async function GetEventsGenre(e, id){
	e.preventDefault();
	await axios.post("http://localhost:8080/getEventsGenre", {customer_ID: id})
	  .then( async function (res) {
		  await axios.post("http://localhost:8080/reqEventsGenre", {id: 0})
	  .then( async function (res) {});
	});
};
  /**
  The AccountHandler function sends the node POST request to get account details for the logged in customer.
  After the request is processed it will link to the Account- page.
  The function gets invoked by pressing the Account- button in the navigation bar.
  **/
 async function AccountHandler(e){
	 e.preventDefault();
	await axios.post("http://localhost:8080/reqAccount", {})
	  .then(async function(res){	  
		await navigate("/Account");
	});
};  
  /**
  The LogInHandler function sends the node POST request to verify the account details for the log in.
  After the request was successful the accountID will set to the response data, the logged in status will
  be set to true and the GetEventCities and GetEventGenre functions will be invoked.
  If the request failed the error message for the log in will be invoked. 
  Finally the dialogue-box will be closed and it will be forwarded to the Account- page.
  **/
  async function LogInHandler(e){
		e.preventDefault();
		axios.post("http://localhost:8080/logIn", {account_name: accountNameLog,account_password: accountPasswordLog})
		.then( async function(res){
		if(res.data.accountID!== 0){
			await setAccountID(res.data.accountID);
			await setLoggedIn(true);
			await console.log(res.data.accountID);
		    await GetEventsCities(e, res.data.accountID);
	        await GetEventsGenre(e, res.data.accountID);
		}
		else{
			await handleErrorToOpen(e);
		}
		});
		await handleToClose(e);
		await navigate("/Account");
	};
  /**
  The LogOutHandler function sends the node POST request to start the log out process on the node server.
  After the request is processed the loggedIn will be set to false, the accountID set to 0 and the the page
  forwarded to the App- page.
  **/  
  async function LogOutHandler(e){
	e.preventDefault();
	await axios.post("http://localhost:8080/logOut", {})
		.then( async function(res){
		});
	await setLoggedIn(false);
	await setAccountID(0);	
	await window.location.reload();
	await navigate("/App");
  };
  //This statement sets the background for the body part to the color brown and the text-align to center.
  document.body.style = 'background: #362d26; text-align: center;';
  /**
  The return statement holds the navigation bar with all buttons as also the message box and the dialogue
  box with all the functions above.
  **/
  return (
    <>
      <nav className="layoutNav">
		<button className="layoutButton" onClick={e => GetEvents(e)}>Events</button>
		<button className="layoutButton" onClick={e => GetBookings(e)}>Bookings</button>
		<Link to="/Register"><button className="layoutButton">Register</button></Link>
		<button className="layoutButton" onClick={e => AccountHandler(e)}>Account</button>
		<button className="layoutButton" style={{backgroundColor: loggedIn ? "green" : "#262b2f"}} onClick={e => handleClickToOpen(e)}>Log In</button>
		<button className="layoutButton" onClick={e => LogOutHandler(e)}>Log Out</button>
	  </nav>
	  <p className="layoutText" style={{display:(window.location.pathname === "/") ? "block" : "none"}}>
			Welcome on our event booking page! <br />
			Get started with browsing through the events<br />
			or create your account!
	  </p>
	  <Dialog open={open} onClose={e => handleToClose(e)}>
        <DialogTitle>{"Please enter your Account information!"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <span>Account: </span> 
			<input name="accountNameLog" type="text" value= {accountNameLog} onChange={e => setAccountNameLog(e.target.value)}/><br />
			<span>Password: </span> 
			<input name="accountPasswordLog" type="password" value= {accountPasswordLog} onChange={e => setAccountPasswordLog(e.target.value)}/>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
		  <Button type="submit" onClick={e => LogInHandler(e)} color="primary" autoFocus>
            Submit
          </Button>
          <Button onClick={e => handleToClose(e)} 
                  color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
	  <Dialog open={logInError} onClose={e => handleErrorToClose(e)}>
        <DialogTitle>{"Login failed!"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <span>The entered account and password doesn't fit. Please try it again! </span> 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
		  <Button onClick={e => handleErrorToClose(e)} 
                  color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    <Outlet />
    </>
  )
};

export default Layout;

