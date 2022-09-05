## Game Statistics

I created a webpage that is used to save game stats. It has a form that takes in game name, character name, number of kills, number of assists, and number of deaths. It then computes additional derived field called KDA, which is computed by using this formula: (kills+assists)/deaths. After submit button is pressed all of the values are added to the table, which already has some data in it. If reset button is pressed, it clears all of the fields. Data that is already in the table can also be edited or deleted by using edit and delete buttons.

I used flexbox to properly layout major elements on the webpage. Specifically, I used flex-direction:column and flex-wrap:wrap.

Fonts used: https://fonts.google.com/specimen/Black+Ops+One/tester , https://fonts.google.com/specimen/Nova+Square/tester 

Instructions (I don't think you will need them):
1. Fill out all of the required fields on the form before pressing Submit.
2. Use the Reset button to clear all of the field values.
3. Press Edit button to edit selected data set in the form window.
4. Press Delete button to delete selected data set from the table.

## Technical Achievements
- **Tech Achievement 1**:

Created a single-page app that both provides a form for users to submit data and always shows the current state of the server-side data.
The server accesses data through get, post, delete, and patch.
It contains 4 buttons: Submit, Reset, Edit, and Delete.

### Design/Evaluation Achievements
- **Design Achievement 1**: 

Both users were asked to test all buttons and provide feedback after interacting with a webpage for some time.

1. Last name: Santopadre
2. Problems: He had no problems with my design and could easily add/delete/edit game stats.
3. Comments: I unintentionally added the wrong CS:GO logo. It should only say 'GO'. But I decided not to change it to make all CS:GO players mad.
4. Any changes: I would only change the icon based on his feedback.

1. Last name: Winston
2. Problems: He also had no problems with my design and could easily add/delete/edit game stats.
3. Comments: No surprising comments, but some helpful feedback to add dropdowns for games and characters.
4. Any changes: Maybe add dropdowns for games, but still leave an option for the user to enter the game name manually. Adding dropdown for the character might not be a good idea since League of Legends, for example, has more than 140 characters.