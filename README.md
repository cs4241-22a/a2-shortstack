## Do It!
a2-siddharthapradhan.glitch.me
- Do It! is a simple ToDo application. 
- Adding a task is simple, add a non-empty task name, select a deadline (optional) and select a category.
- To Edit press the edit button in the task list
- To Delete press the delete botton in the task list

- app data is {"task":"Task Name",   "dueDate": "When the task is due", "taskType":"Work or personal"} <br>
self generated: {"taskID" : "Unique ID for a task", "taskCreationTime": "Based on when the request was made", "taskUrgency": "How urgent the Task is, based on (dueDate - taskCreationDate)"}

- taskUrgency is the derived field and has values ranging from 0 to 3.

- Although all the information is sent from the server to client (including derived field), they are not directly displayed as it would not make sense.
Instead, they are used in more creative ways, for example task_urgency is represented as the color of due date, taskCategory is used 
as the background color for the taskName.

- Selectors such as element, id and class selectors were used to style the elements. Multiple layouts were used to create a complex layout.
For example: grids (of different setup), flex (flex-direction: row) and flex (flex-direction: column)

- I used Share Tech Mono as the font for the primary text in my site, using monospace as a backup.

## Technical Achievements
- **Tech Achievement 1**: Using a combination of grid and flex (both flex-direction: row and column) displays, I made a single-page app (flex mainly to stack/queue and grid for more precise alignments). The page displays app data of server from launch, and updates it accordingly to user input (after getting response from server)

### Design/Evaluation Achievements
- **Design Achievement Person 1**: 
1. Shane Stevens
2. Claimed he did not have any issues with the design, and thought it was cool.
3. I was suprised he liked the color combination, even though there is a vast contrast.
4. Nothing apparently (lol)
- **Design Achievement Person 2**: 
1. Chen Hao
2. Website did not have a title, and the color combination looks a bit off.
3. He would prefer a seperation of categories/ filter ability in the list. Although easy to implement, I thought it was slightly out of the scope for this assignment.
4. Adding a filtering ability to the todo-list and title to website
