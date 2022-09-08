## Disclaimer
I unfortunately was not able to get this project fully working :( However, I did complete the server, HTML, and CSS as well ass added in comments in what I know I needed to add into the scripts.js file to hopefully make it functional. I attempted to go "above and beyond" on the HTML/CSS to hopefully show some extra desgin achievements.

Link: https://a2-meganletendre7.glitch.me

## To Do List Maker
I have created a web application that allows users to make to do lists and organize them. The user can add an item to the list and specify:
(1) what a task is
(2) what type of task it is (school, work, or personal)

The date created is also taken into account. The longer a to-do task is on the list without being completed, the higher the priority is (denoted as low, medium, and high). This is intended to be the derived field.


I used a CSS grid for layout.

Instructions:
(1) The user can input their name at the top.
(2) The user can type in their task.
(3) The user selects the correlating task type.
(4) When the user submits the task, it shows up in the table below.
(5) The longer the task is on the to do list, the higher the priority level is.
(6) When as task is complete, a user can check it off and a line goes through the writing.

## Technical Achievements
- **Technical Achievement 1**: I attempted to set up the application to be a single-page app. However, I was not able to complete development.

### Design/Evaluation Achievements
- **Design Achievement 1**: I asked the users to describe how they thought the application would work and step me through their process.
User 1: 
(1) Thomas
(2) He liked that he could organize his different tasks. However, he did not like that the "personal" category was the same color as the "Add Task" button.
(3) I was suprised that he found the same colors (question 3) to be confusing as I did not think it would make much of a difference.
(4) I would change the color of the "personal" category to eliminate any potential confusion.

User 2:
(1) McNamara
(2) She really liked the layout/overall design. Mentioned she really liked the header/greeting. But, she mentioned that the headers for the "making the to do lsit tasks" and the actual lsit were a bit easy to miss.
(3) I was suprised that she found the headers to be easy to miss but now that I look at it I can understand it.
(4) I would maybe make the fonts of the headers a bit bolder or larger. Maybe add a box around "addint an item" to group those items together a bit more.

- **Design Achievement 2**: I used :root to create variables in my CSS file. I found this to make styling a lot easier as I did not have to type in hex codes all over.

- **Design Achievement 3**: I used "rem" as opposed to "px". This makes it so my sizing is relative based on the root font size. It allows to quickly scale sizing from changing one value. Also increases accessbility for users if they would like the webpage/fonts to appear larger.

- **Design Achievement 4**: I created my own "bubbles" as opposed to checkboxes/radio buttons. I had to create the unchecked and checked version and develop the switch so they would change when selected.
