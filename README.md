Assignment 2 - Short Stack: Basic Two-tier Web Application using HTML/CSS/JS and Node.js  
===

Frank McShan
http://a2-fmcshan.glitch.me

## To Do List Generator
My web application is a to do list generator that lets users input a task, a creation date, and whether or not the task is a priority. After submitting, users can view all of their to dos in a convenient table. A new derived field called "due date" is created based off the priority field inputted by the user. The CSS positioning technique used within the application was a flexbox.

## Technical Achievements
- **Tech Achievement 1**: Using a combination of submit and delete requests, a user is able to submit new to-do items to the server, and then the server sends the updated data back (with the new derived field added) to the client. The client then uses this data to render the table that conveniently displays all of the app's data to the end user. Additionally, the user can click the delete button on the row of the table they'd like to delete, which sends a delete request to the server. The server removes the data field from the app's data and then sends the updated data back to the client, which then renders the table to display the updated data list to the user. This application lives on a single page, utilizes a form for users to submit data to the server, and always shows the current state of the server-side via a table.

### Design/Evaluation Achievements
- **Design Achievement 1**: 

Student 1
1. Last Name: Gora
2. The user found the due date aspect of my application to be a little confusing because you can set the creation date in advance but the due date will still stay due in 1 day or 2 days.
3. Their comments on the unintuitiveness of the due date aspect of my application were a little surprising because I thought it made sense before I had them test it.
4. Based off of their feedback, I would change my application so that either the user can't enter a date in the future (ie. to avoid due date/creation date mismatch), or I would amplify the functionality of the due date feature to calculcate the due date based off of the creation date (ie. display due date as 2 days from creation date).

Student 2
1. Last Name: Sunray
2. The user liked the design of my application. The only thing they had a problem with was the buttons, as it was not super clear to them that they were in fact buttons.
3. I was surprised that the user found the buttons to be problematic. It didn't even cross my mind that button hovering is so important.
4. Based off of their feedback, I would change my application to make the buttons look more like buttons. I would add rounded corners to the buttons and add hover effects as well. Finally, I would implement the changes I arrived at from interviewing the first student.
