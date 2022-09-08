# Assignment 2 - Short Stack: Basic Two-tier Web Application using HTML/CSS/JS and Node.js

Due: September 8th, by 11:59 AM.

## Activity Logger Project

Nicholas Li
https://a2-livingwell088.glitch.me/

<br>I wanted to create an application that can be used to log in activities done throughout one's everyday.
<br>It would sort of be like the opposite of a calendar since you should log in your hours after the activity has been done as opposed to a calendar, where you would schedule ahead of time.

My application has:
<br>- A "Server" that serves file and keeps track of tabular data in "appdata" with 6 fields ("activity", "date", "time_starteded", "time_ended", "description", and "duration")
<br>- A "Results" in the form of a table that shows the data on the table from appdata of the server
<br>- A "Form/Entry" that allows users to add and delete data
<br>- A "Derived Field" that calculates the duration of the activity that was logged from the starting time and ending time

I used one HTML form that includes different type like ("text" for a textbox, "select" for a dropdown select box, "date", and "time")
I did not use a results page since I put both the form and the results on the same page with the results table underneath the form.
I made sure that the pages validate using the link given

I used a grid for the positioning of my form.
I used a custom font from google fonts "PlayfairDisplay" and "PlayfairDisplay-BoldItalics" instead of the normal font
CSS is all in the style.css
I made sure to use CSS selection for element selectors, ID selectors and Class Selectors.

- Element selectors: (body - color, image and font, center everything), (table, th, td, tr - border, width, color, font and margins), label, h1 (color and font size), form inputs (font)
- ID Selectors: (#activity, #date, #time_started, #time_ended, #description - The different inputs to the form, font style and size and color)
- Class Selector: (A grid container class used to format the html forms and inputs using the css grid)

I used some Javascript to get and fetch the data from the server and rebuild the table for the results.

In Node.js server, I have a function that calculates a derived field called "Duration" from the inputted starting and ending time.

One thing that I could not accomplish is the deletion of one single entry. Everytime that any delete button is pressed, the data would revert back to the original data inside of appdata instead of deleting only that one activty and it would not save any data back to the server.

Instructions to use application:
Input in the information to your activity and it should add into the result table along with the starting data in appdata.

## Technical Achievements

- **Tech Achievement 1**:
  I have put the app on one page with the form on the top of the page and on the same page, the results table that would update anytime a new log is submitted or a log would be deleted.

### Design/Evaluation Achievements

- **Design Achievement 1**:

UI Review 1:

Last Name: Bondah

Problem: Delete button is not working. No message to remind you that you did not fill out all field.
Surprising Comment: He liked the photo(very descriptive) and the idea behind the app.
Change: I would implement the delete to work properly. I would make all inputs to be required so that the derived field would not print out undefined.
