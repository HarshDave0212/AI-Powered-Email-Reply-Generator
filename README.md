# AI-Powered-Email-Reply-Generator
A React.js web application paired with a Chrome extension that helps users generate AI-based email replies with customizable tones directly inside Gmail.
# What is this?
This project has two parts:

Web app – A React website where you type your email and choose the tone (like formal or casual). It then creates a reply for you using AI.

Chrome extension – A small tool you add to your Chrome browser. When you write emails in Gmail, it adds a button that suggests AI-written replies based on your selected tone. This saves you time and effort.

# How it works
You enter the email text and pick the tone you want.

The app sends this to a backend server that uses AI to create a reply.

In Gmail, the Chrome extension shows a button inside the compose box.

Clicking the button fetches and inserts a smart reply for you automatically.

# What technologies are used?
React – for the web app interface

Spring Boot – for the backend API that talks to AI

Chrome Extension – to add AI suggestions inside Gmail

Material-UI – for clean and simple design

# How to run it
Web app
Go to the web-app folder.

Run npm install to get the needed packages.

Run npm start to open the app on your computer at http://localhost:5173.

Backend
Go to the backend folder.

Run the Spring Boot app with mvn spring-boot:run (if using Maven) or ./gradlew bootRun (if using Gradle).

The backend server runs at http://localhost:8080.

Chrome Extension
Open Chrome and visit chrome://extensions/.

Turn on Developer mode.

Click Load unpacked and select the chrome-extension folder.

Open Gmail and compose an email. You will see a new button for AI suggestions.

# Project layout

email-writer-assistant/
├── email-writer-sb/      # Spring Boot backend

├── email-writer-react/   # React web app

├── email-writer-ext/     # Chrome extension files

└── README.md             # This file

# How to improve
Add more tone choices.

Make the extension button look nicer.

Support other email services besides Gmail.

# Author
Harsh Dave



