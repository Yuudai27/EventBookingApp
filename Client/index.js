import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Layout from './Layout';
import Register from './Register';
import Account from './Account';
import AccountEdit from './AccountEdit';
import Bookings from './Bookings';
import Event from './Event';
import EditBooking from './EditBooking';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";
/**
The index component creates the router system for this application.
It sets the Layout- page as entry point and includes the additional pages.
**/
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<BrowserRouter>
	<Routes>
	<Route path="/" element={<Layout />}>
		<Route path ="App" element={<App />} />
		<Route path="Bookings" element={<Bookings />} />
		<Route path="Event" element={<Event />} />
		<Route path="Register" element={<Register />} />
		<Route path="Account" element={<Account />} />
		<Route path="AccountEdit" element={<AccountEdit />} />
		<Route path="EditBooking" element={<EditBooking />} />
	</Route>
	</Routes>
	</BrowserRouter>);

reportWebVitals();


