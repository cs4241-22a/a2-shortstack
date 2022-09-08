## Todo list
My project is a simple todo list. There are three input fields, the task(String), due date(4 digit number of month followed by day), 
and priority(high, medium or low). To make a new entry, fill out all three fields and hit submit. An entry appears in the table below,
which shows all the results. Urgent, the fourth derived field in the table, is labeled with 1 if the priority is high and the date 
is the soonest. Otherwise it is labeled 0. To remove the top entry, press the remove button on top of the table.
I used flexbox as my CSS positioning technique. In the body, I use flex-direction: column and align-items: center to align
the form entry, remove button and todo list vertically in the center. I also use it to format the table so that the entries
are stacked on top of each other and spaced evenly.
I had element selectors for body and button, id selectors for the table #todoList, and class selectors for the form of class
formItems. For fonts, I used Roboto from Google Fonts.

## Technical Achievements
- **Tech Achievement 1**: 
I have a single-page app as all of the information is on one page. The top of the page is the form for users to submit data,
and the todo list on the bottom shows all of the data in the server. It updates accordingly whenever an element is 
added or removed. The client sends a command to modify the dataset in some way, it is modified in the server, and then the 
information is sent back to the client in the form of the todo list.

### Design/Evaluation Achievements
- **Design Achievement 1**: 
The first user I tested my design with's last name is Panneton. Some problems they had were that the date format is confusing,
as it is an unusual way to enter the date and it may not be compatable with different date formats across countries. 
They also were confused about how the remove button works at first, as it only removes the top entry. Something that
surprised me was that they liked the clean design, and mentioned that it was accessible. I had not thought as much
about accessibility. From their feedback, I would change the inputted date format to be more intuitive and universal.
