Assignment 2 - Short Stack: Basic Two-tier Web Application using HTML/CSS/JS and Node.js  
===

## Todo List
https://a2-jmetcalf01.glitch.me/  
My project is a todo list website that has a list of tasks, along with their creation date, due date, and priority. The priority is automatically calculated based on the current time and the due date. If the due date has already passed, it is marked as late. Otherwise, if it's in 2 days or less, it's high, 7 days or less, medium, and anything further is low priority.

I used a flexbox for positioning as columns.

Instructions:
To add a TODO, write a task and put in a due date (make sure it has a date AND time), and then click submit, or cancel to clear.
To modify a TODO, click on the edit button and then alter data in the form, and then click submit, or cancel to clear.
To delete a TODO, click on the delete button in the row.

## Technical Achievements
- **Tech Achievement 1**: Using a combination of GET, POST, PATCH, and DELETE, I implemented a single-page app. Users can interact with the website through the form, which allows users to add new data (POST) and modify existing data by clicking on the edit button in the relevant row (PATCH). Users can also delete data by clicking on the delete button in the relevant row (DELETE). The server responds to all of these by sending the current data, which the frontend displays in the table.

### Design/Evaluation Achievements
- **Design Achievement 1**: 

I asked both users to try using out the website, and specifically to add tasks, modify existing ones, and delete tasks. Additionally, I asked them to make sure that everything worked as they expected while doing so.

  - Bolduc:
    - He had several issues with the design, mostly relating to small quality of life features. Specifically, pressing enter should submit within the form.
    - One comment that he made that surprised me was that he wasn't sure that the delete button in each row was clickable.
    - I would change (and did) two things: one, making the submit button respond to enter, and two, change the buttons so when hovered over, the cursor changes to the hand.
  - Someone else: // TODO
    - Here

    UI test with someone else  
    Create and submit a Pull Request to the original repo. Label the pull request as follows: a2-gitusername-firstname-lastname
