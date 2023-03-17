USE eventapp;

INSERT INTO `customers`(first_name, last_name, birth_date, age, credit_card, email_address,  street_name, house_number, city, country, favorite_events, favorite_city, account_name, account_password)
VALUES ('Paul', 'Mayer', '1989-5-14',(DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(),'1989-5-14')), '%Y'))+0,'1234 5678 9102', 'testmail1@test.xy','endless street','1a','Munich','Germany','music','Munich','p-may','test_password'),
		 ('Maria', 'Curtis', '1995-9-21',(DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(),'1995-9-21')), '%Y'))+0,'1234 5678 9103', 'testmail2@test.xy', 'endless street','2a','Dresden','Germany','art','Dresden','mcur95','test_password2'),
		 ('Tom', 'Smith', '1974-3-01',(DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(),'1974-3-01')), '%Y'))+0,'1234 5678 9104', 'testmail3@test.xy', 'endless street','3a','Chemnitz','Germany','sports','Hamburg','smitht','test_password3');


INSERT INTO `bookings`(customer_ID, event_ID, booking_price, number_of_tickets, booking_status)
VALUES (1, 1, (SELECT ticket_price FROM `events` WHERE events.event_ID = 1)*2, 2, 'accepted'),
		 (1, 5, (SELECT ticket_price FROM `events` WHERE events.event_ID = 5)*1, 1, 'requested'),
		 (2, 12, (SELECT ticket_price FROM `events` WHERE events.event_ID = 12)*2, 2, 'accepted'),
		 (3, 4, (SELECT ticket_price FROM `events` WHERE events.event_ID = 4)*2, 2, 'canceled'),
		 (3, 9, (SELECT ticket_price FROM `events` WHERE events.event_ID = 9)*4, 4, 'accepted');	 
