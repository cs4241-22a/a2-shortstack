Assignment 2 - Short Stack: Basic Two-tier Web Application using HTML/CSS/JS and Node.js  
===

Below are suggested technical and design achievements. You can use these to help boost your grade up to an A and customize the assignment to your personal interests. These are recommended acheivements, but feel free to create/implement your own... just make sure you thoroughly describe what you did in your README and why it was challenging. ALL ACHIEVEMENTS MUST BE DESCRIBED IN YOUR README IN ORDER TO GET CREDIT FOR THEM.

*Technical*
- (10 points) Create a single-page app that both provides a form for users to submit data and always shows the current state of the server-side data. To put it another way, when the user submits data, the server should respond sending back the updated data (including the derived field calculated on the server) and the client should then update its data display.

*Design/UX*
- (5 points per person, with a max of 10 points) Test your user interface with other students in the class. Define a specific task for them to complete (ideally something short that takes <10 minutes), and then use the [think-aloud protocol](https://en.wikipedia.org/wiki/Think_aloud_protocol) to obtain feedback on your design (talk-aloud is also find). Important considerations when designing your study:

1. Make sure you start the study by clearly stating the task that you expect your user to accomplish.
2. You shouldn't provide any verbal instructions on how to use your interface / accomplish the task you give them. Make sure that your interface is clear enough that users can figure it out without any instruction, or provide text instructions from within the interface itself. 
3. If users get stuck to the point where they give up, you can then provde instruction so that the study can continue, but make sure to discuss this in your README. You won't lose any points for this... all feedback is good feedback!

You'll need to use sometype of collaborative software that will enable you both to see the test subject's screen and listen to their voice as they describe their thoughts. After completing each study, briefly (one to two sentences for each question) address the following in your README:

1. Provide the last name of each student you conduct the evaluation with.
2. What problems did the user have with your design?
3. What comments did they make that surprised you?
4. What would you change about the interface based on their feedback?

*You do not need to actually make changes based on their feedback*. This acheivement is designed to help gain experience testing user interfaces. If you run two user studies, you should answer two sets of questions. 

---

Weekly Schedule App - Anarchy Edition
https://a2-gregklimov.glitch.me/

This is a weekly schedule planner tool that lets anyone add/delete events. I used a CSS grid to position the major elements.
In case things start or get too messy, each section (calendar, table view, etc) can be minimized. The Delete all events option is in the bottom right of the app

## Technical Achievements
- **Tech Achievement 1**: The events shown in the calendar/table are automatically pulled from the server when the page is loaded and when events are added/deleted. I did this by giving the server the option to send the data to the client. This also involved adding new /command POST statements. 

### Design/Evaluation Achievements
- **Design Achievement 1**: User Tests
1. Provide the last name of each student you conduct the evaluation with.
    Ortega-Shue
    Dagett
    
2. What problems did the user have with your design?
    The add event form elements are fairly small and not centered
    The day checkboxes were at one point preceded by the word "Days: ", so the day labels did not fully coincide with the days
    Events don't have to specify days on which they occur
    Events can have negative durations    
    
3. What comments did they make that surprised you?
    They were able to insert html elements into the app by naming events as </td> {payload} </td>. 
    They were also able to enter absurdly long strings of text into various fields. This crashed the site somewhat
    
4. What would you change about the interface based on their feedback?
    I would fix the input validation and format the entered values as strings of finite length
    I would fix the few UI flaws that were brought up
