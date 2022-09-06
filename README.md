---

Weekly Schedule App - Anarchy Edition
https://a2-gregklimov.glitch.me/

This is a weekly schedule planner tool that lets anyone add/delete events. I used a CSS grid to position the major elements.
In case things start or get too messy, each section (calendar, table view, etc) can be minimized. The Delete all events option is in the bottom right of the app

## Technical Achievements
- **Tech Achievement 1**: The events shown in the calendar/table are automatically pulled from the server when the page is loaded and when events are added/deleted. I did this by giving the server the option to send the data to the client. This also involved adding new /command POST statements. 

### Design/Evaluation Achievements
- **Design Achievement 1**: 2 user tests.
User Test 1
1. Provide the last name of each student you conduct the evaluation with.
    Ortega-Shue
2. What problems did the user have with your design?
    The day checkboxes were at one point preceded by the word "Days: ", so the day labels did not fully coincide with the days (I changed this)
    Events don't have to specify days on which they occur
    Events can have negative durations    
3. What comments did they make that surprised you?
    They were able to insert html elements into the app by naming events as </td> {payload} </td>. 
    They were also able to enter absurdly long strings of text into various fields. This crashed the site somewhat
4. What would you change about the interface based on their feedback?
    I would fix the input validation and format the entered values as strings of finite length

User Test 1
1. Provide the last name of each student you conduct the evaluation with.
    Dagett
2. What problems did the user have with your design? 
    The add event form elements are fairly small and not centered
    Events can have negative durations
3. What comments did they make that surprised you?
    They were also able to enter visually weird strings (corrupted text for example)
    They noticed the AI-generated background image
4. What would you change about the interface based on their feedback?
    I would fix the input validation and format the entered values
    I would fix the few UI flaws that were brought up
