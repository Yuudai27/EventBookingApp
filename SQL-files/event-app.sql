
CREATE DATABASE EventApp; 
USE EventApp;


CREATE TABLE IF NOT EXISTS `customers` (
  `customer_ID` INT AUTO_INCREMENT, 
  `first_name` VARCHAR(100) NOT NULL,
  `last_name` VARCHAR(100) NOT NULL,
  `birth_date` DATE NOT NULL,
  `age` INT NOT NULL,
  `credit_card` VARCHAR(100) NOT NULL,
  `email_address` VARCHAR(100) NOT NULL,
  `street_name` VARCHAR(100) NOT NULL,
  `house_number` VARCHAR(100) NOT NULL,
  `city` VARCHAR(100) NOT NULL,
  `country` VARCHAR(100) NOT NULL,
  `favorite_events` ENUM('music','sports','art','theatre','opera','no preference') DEFAULT 'no preference',
  `favorite_city` VARCHAR(100) NOT NULL,
  `account_name` VARCHAR(100) NOT NULL,
  `account_password` VARCHAR(100) NOT NULL,
  PRIMARY KEY (customer_ID)
) ENGINE=InnoDB DEFAULT CHARSET=LATIN1;


CREATE TABLE IF NOT EXISTS `events` (
  `event_ID` INT AUTO_INCREMENT, 
  `event_name` VARCHAR(100) DEFAULT NULL,
  `organizer` VARCHAR(100) DEFAULT NULL,
  `event_venue` VARCHAR(100) DEFAULT NULL,
  `venue_street_name` VARCHAR(100) DEFAULT NULL,
  `venue_house_number` VARCHAR(100) DEFAULT NULL,
  `venue_city` VARCHAR(100) DEFAULT NULL,
  `venue_country` VARCHAR(100) DEFAULT NULL,
  `event_genre` ENUM('music','sports','art','theatre','opera') NOT NULL,
  `event_date` DATE NOT NULL,
  `number_of_seats` INT NOT NULL,
  `ticket_price` DOUBLE(5,2) NOT NULL,
  `event_description` LONGTEXT DEFAULT NULL,
  PRIMARY KEY (event_ID)
) ENGINE=InnoDB DEFAULT CHARSET=LATIN1;


CREATE TABLE IF NOT EXISTS bookings (
  `booking_ID` INT AUTO_INCREMENT,
  `customer_ID` INT NOT NULL, 
  `event_ID` INT NOT NULL, 
  `booking_price` DOUBLE(6,2) NOT NULL, 
  `number_of_tickets` INT NOT NULL, 
  `booking_status` ENUM('requested','accepted','canceled','declined') DEFAULT 'requested',
  PRIMARY KEY (booking_ID),
  FOREIGN KEY (customer_ID) REFERENCES `customers`(customer_ID),
  FOREIGN KEY (event_ID) REFERENCES `events`(event_ID)
)ENGINE=InnoDB DEFAULT CHARSET=LATIN1;
