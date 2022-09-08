Assignment 2 - Short Stack: Basic Two-tier Web Application using HTML/CSS/JS and Node.js  
===

## Samara's To Do List
### Author: Samara Holmes
### Glitch Link: https://glitch.com/~a2-holmes1000
This project makes use of front-end JavaScript capabilities to get/fetch data from the server. It is a To Do list that allows you to enter a task, an estimation of how long it will take you (points), and a due date. You can add a task to the list and from there you can edit, delete, or complete a task. Completed tasks will be sent to a different table and can be viewed by pressing the "View Completed Tasks" button.  
This assignment includes all the baseline requirements including
a server with server logic, form entry functionality, results (updated to do list), and a derived field.  
For the design, the project also meets all expectations including CSS positioning/styling of primary elements, various CSS selector functionality, and use of an external stylesheet that is easily maintainable.  
The positioning I used for the tables is flexbox. I created two tables and edited the <td> and <tr> CSS styles. I also selected the buttons and added curved edges, shadows, and color to them. Lastly, I made the <h1>, <p>, and <body> elements responsive to the page size. 

## Technical Achievements
- **Single Page App**: both provides a form for users to submit data and always shows the current state of the server-side data.
- **Derived Field**: A derived field that estimates the completion date of a task based on the points entered for a task and the current date.
- **Mutiple Buttons**: Has a add task, delete, and complete button with functionality. Complete, removes the task from the to-do list and adds it to the completed task list. The View Completed Tasks button, shows a separate table and then gives you another button to allow you to hide the elements.

### Design/Evaluation Achievements
- **Various CSS Selectors**: Used various CSS selectors to ensure that each element in the table is able to be given the correct CSS styles.
- **CSS positioning with flexbox**: Used flexbox to position both to-do lists, the tasks list and the completed task list.
- **Google Fonts**: I used Anek Telugu as the font for the primary copy text in my site. Plus Jakarta Sans was used for the h1 attribute
- **Two User Studies**:   

**Task for users:** To create 3 tasks on the to-do list, then view the tasks, delete one, and complete one. Then to view completed tasks.  

***User Study 1***
1. Last Name: Pham
2. What problems did the user have with your design?
- The user did not have any problems in general with navigating the application.
3. What comments did they make that surprised you?
- The user picked a date that already passed, and they suggested that I add in sorting of some kind to organize the tasks.
4. What would you change about the interface based on their feedback?
- It would be good to make the starting date, the current date. It would also be good to improve upon the sorting system, which there currently is none.

***User Study 2***
1. Last Name: Kassoy (Student at UMASS)
2. What problems did the user have with your design?  
- The user did not have any problems with my design except minor confusion with the date input. The user also got confused with buttons such as "refresh" and "edit" since I hadn't implemented functionality yet.
3. What comments did they make that surprised you?  
-  The user said that it would be a useful application for students, however, to make it better features such as sorting to see what tasks need to be prioritized. The user also said that it would be good to have a "completed task celebration". The user also suggested adding in reminders to the to-do list for if a task hasn't been completed, but the due date is coming up.
4. What would you change about the interface based on their feedback?  
- The user thought my table formatting was pretty hard to read but I also hadn't done proper CSS styling yet. To improve, I would do the CSS styling.