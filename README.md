## Tobias Mack

http://a2-tobias-mack.glitch.me


## WPI Todo List
You can add and delete tasks that you want / need to do. You can input a due date, so that you have a countdown to better your time management.

## Technical Achievements
- **single-page-application**: 
Using a combination of server side and local js script, I achieved to basically build a single page application, because all the data is directly visualised at the user side.
Thus we have a 'results' functionality.
This is accomplished by the countdown, which is updated each second.
This was challenging because the html code is generated via JS, which makes it more difficult to track how the html is structured.
To position the countdown correctly, I had to add preceeding zeroes so that it doesnt change the width each second.

- **server side logic**: 
The "SORT" button orders the data at server side and updates the view. This is accomplished by simply inserting the data correctly, thus keeping the database ordered.

- **derived field**
Adding a field for the ordering lets you compare the data more efficient, instead of comparing the date and time.

- **validation**
Empty field not possible by disabling the add button.

### Design/Evaluation Achievements
- **css positioning**: 
To center the tasks and make them appear like a table I used display: block; text-align: center; To then have the tasks in one line i added display: flex;
justify-content: center; to the individual task.

- **Evaluation**
Tasks to complete: add 3 todos with different times and dates. then delete some and sort them.
1. roommate 1 (strauss)
2. Problems: sort button can only sort in one direction
3. What comments did they make that surprised you? date time picker is good to use
4. What would you change about the interface based on their feedback? Make the sort button sort both directions.
----
1. roommate 2 (henkel)
2. Problems: not optimized for smaller devices.
3. What comments did they make that surprised you? --
4. What would you change about the interface based on their feedback? change the order of the buttons/input and make them more responsive

- **Design**
To make the appearance look like a WPI site, I added the official red color: #AC2B37, and worked only with the official grey white and black.
In addition I included a WPI logo. The font is the Jetbrains Mono.
