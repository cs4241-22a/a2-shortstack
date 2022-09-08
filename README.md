## Birthday Tracker (a2-bensakac-WPI)
https://a2-bensakac-wpi.glitch.me/

A simple application to keep track your friends birthdays, including a gift idea. The app will calculate how many days until each person's birthday so you know when you have to get their gift by. CSS Flexbox was utilized in the layout of the application. Instructions for use are included within the app. 

## Technical Achievements
- **Tech Achievement 1:  Single-page app**: In order to create a single page app I created a function called `renderTable` that utilized a GET request to get the current data from the server and create a table with all the stored information. This function is called everytime a button is clicked or the page reloads.
- **Tech Achievement 2: Calculated field is day dependent**: Even though it is exceedingly rare that this will occur on Glitch, I included server logic to update the calculated field if the current day is not the same day as the submission timestamp. Every time a GET request is recieved on the server, it executes the function `updateDaysUntil(appdata)` before returning the appdata in the body of the request. Therefore, the calculated field will always be accurate regardless of what day it is being viewed on. 

### Design/Evaluation Achievements
- **Design Achievement 1: Fully responsive design**: Using three media queries to modify the styling at different viewport widths, I designed a fully responsive layout which can be easily used on mobile or desktop. 
