Assignment 2 - Short Stack: Basic Two-tier Web Application using HTML/CSS/JS and Node.js  
===
## [Simple Baseball Batting Average Tracker](http://a2-axbolduc.glitch.me)

- This application tracks the batting average for a baseball player for each game that they play. You can add a game with the add game form and also modify or delete the game by clicking on the row in the table and modifying the data with the modify form. Layout was mainly done using flexbox to center and align all of the elements on the page.

## Technical Achievements
### Single Page Application
- The app implements the single page application design having the results table and the form on the same page. Also having the table update in real time upon form submission without needing a page reload.

### Design/Evaluation Achievements
- **Design/UX Testing**: 
    - Task: 
        1. Add a new game for today's date, with 2 hits and 3 at bats.
        2. Modify the newly added game to have 1 hit instead of 2
        3. Delete the game with game ID 0
        4. Delete the game that you added previously

    - Testers:
        - Metcalf:
            - **Problems**: You can add decimals into the hits and at bats input forms. 
            - **Surprises**: User wanted a clear button to clear out the entire form.
            - **Changes to make**: Add the clear form button.
        - Brunelle:
            - **Problems**: When an error occured no message appeared to inform the user. Site simply does nothing.
            - **Surprises**: Did not like the styling of the form. Wanted better formatting
            - **Changes to make**: Update the styling of the form to be more clean. Increase error reporting.
