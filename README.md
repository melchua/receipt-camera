# Paperless Receipt: IOS Camera/Web App
### An App to Make Employee Expense Reports Easier!

Paperless is a mobile application that let employees scan and send business expense receipts directly to their admin department. The app uses Google Vision and some backend logic to auto-magically parse out the important receipt information such as total and date. This information is easily accessed by both employees and admins from an easy to use web-interface. 

**Related links: **
- Web Server
- Express Server


## Motivation
This project was birthed from a final project idea our team had at the Lighthouse Labs bootcamp in June 2018. As fairly new web developers, we wanted to tackle some new technologies that were not taught during our bootcamp. As web developers, we were far removed from mobile apps, so we decided to learn React Native and Google Vision's API in the span of 3 days to create this app. 

Through this we learned teamwork, as well as how to work in an Agile / Kanban style methodology to complete a functioning application in the span of 8 days. 


## Screenshots
Include logo/demo screenshot etc.

Tech/framework used
Ex. -

## Built with

**IOS**

- React Native
- Node.js

**Front-end Web Server**

- React JS
- Webpack(Babel)
- Express/Node.JS
- SASS/CSS

**Back-end Server**

- Postgresql/Knex
- Express/Node.JS


## Installation

### IOS App

Fork and Clone

``` 
> git clone git@github.com:[yourusername]/receipt-camera.git 
> npm install

```

Configure

``` 
# Create a .env file in your project's root directory

.env

LOCALURL=http://[your ip address on your local network]:8080

```

Run

```
npm start
```

### Front-end Server

Fork and Clone

```
> git clone git@github.com:[yourusername]/receipt-reader-web.git
> npm install
```


### Back-end Server

Fork and Clone
```
> git clone git@github.com:[yourusername]/server-receipt.git
> npm install
```

Setup Database (you must have PSQL installed and setup)

```
# Create a PSQL database called "final"

# Migrate and seed data
> knex migrate:latest
> knex seed:run

```


## API Reference
Depending on the size of the project, if it is small and simple enough the reference docs can be added to the README. For medium size to larger projects it is important to at least provide a link to where the API reference docs live.


## How to use?
If people like your project they’ll want to learn how they can use it. To do so include step by step guide to use your project.


## Team

| Bill | Mel | Sam | Stephen |
|------|-----|-----|---------|
| img  | img | img | img     |

