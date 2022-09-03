Assignment 2 - Short Stack: Basic Two-tier Web Application using HTML/CSS/JS and Node.js
===

Miles Gregg: https://a2-milesgregg.glitch.me/

### Reminders Web Application Summary

The Reminders web application allows you to fill out a form of information for each reminder you want to keep track of. Once you fill out the form reminder you can press the create button to submit data to the server to keep track of all reminders. You can then delete a specific reminder based off of the row in the table.

### Reminders Web Application Layout

- **HTML**: 
    - Utilizing the HTML forms tag I was able to make a very nice looking form input with a variety of tags for user input which include:
        - `<label>`
        - `<input>`
        - `<button>`
    - The `<table>` tag allowed me to display all six fields of information on the webpage in a clean formfactor. To make headers, rows, and data within the table I utilized each respecivilty with the following tags:
        - `<th>`
        - `<tr>`
        - `<td>`
    - Everything is layed out on a singular webpage for easier user experience (UI/UX)
- **CSS**:
    - Styled entire webpage using various id, element, and class selectors to change the layout and design of the webpage. These include colors, border radius, font sizes, and more. 
    - Applied Google fonts Sora font to body tag and set proper font size for webpage.
    - Used CSS grid to splitup page into header row and another row with form input and table.  
- **JavaScript**:
    - When handling specific elements on the webpage I had to use Javascript to manage the entire webpage. Using this it would create and delete elements on the webpage. 
- **Node.JS**:
    - Used Node.JS on server-side to handle incoming and outgoing data and files for the reminders pplication. This also handles the Derived field for new rows of data that come into the dataset. 

## Technical Achievements
- **Technical Achievement 1**: 
    - When deveopling web reminders application everything was made on a single-page. Whenever the user of the webpage performed an action (create or delete) the tables would update and the inputs would clear. This would use the built-in functions specifically `'GET'` and `'POST'` to handle these actions. This made it useful because you don't need a change of page or reload.
    - When searching through the table to see which row to delete I used a binary search algoirthm to make the runtime in the worst case O(log n). This overall made the webpage more efficent and had to do less operations.

## Design/Evaluation Achievements
- **Design Achievement 1**:
    -  
