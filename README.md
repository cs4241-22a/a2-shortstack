Assignment 2 - Short Stack: Basic Two-tier Web Application using HTML/CSS/JS and Node.js  
===

## Message Board
_Message Board_ is a web app that lets users post messages with whatever color they choose. They can post messages and
delete any other messages on the server.

By Cameron Jacobson

Link to site: https://a2-cjacobson.glitch.me/

## Technical Achievements
- **Database**: Uses a nedb database to store messages in the server
- **Results**: Uses a `GET` request at the beginning of every page load to get all previous messages
- **Form/entry**: A form is used to submit new messages with a message and color to the database.
  - There is a 🗑 button next to each message that sends a `DELETE` request to the server for that message.
- **Server Logic**: The server updates the date of the received data to log exactly when the server wrote the message
to the database.
  - When messages are sent to the client, they are automatically sorted in the server by the date they were posted.
- **Derived Field**: The time is updated when the data is written **(does this count?)**
- **Clientside Javascript**: Javascript on the client is used for several things
  - Automatically adjust the css height of the messages element to ensure it fits between the top and bottom bar.
  - Clears the input text box after a message has been submitted
  - Automatically calls `GET` on the server when the webpage is loaded.
  - After getting messages from the server, javascript on the site renders the data to message boxes with css styling
    - The color of these elements are set dynamically based on the received color value

## Design/Evaluation Achievements
### HTML
- **HTML Form**: An **HTML Form** is used to accept a user submitted message with a color.
- **Results page**: there is a feed of messages that displays all user messages on the server so far.
- **Validation** Pages validate 👍 -> https://validator.w3.org/nu/?doc=https%3A%2F%2Fa2-cjacobson.glitch.me%2F

### CSS
- **Element Selectors**: Element selectors are used to fix the height of the page, remove margins, and add entry 
animations for most elements.
- **ID Selectors**: ID selectors are used for referencing individual sections in the webpage.
- **Class selectors**: Several classes are used to style messages and organize site content
- **Google Font**: _Roboto_ was taken from Google Fonts and used for all text content on the site.
