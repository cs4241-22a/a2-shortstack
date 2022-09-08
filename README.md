# Assignment 1 for CS4241   

Summary
---
You can play rock paper scissors with the computer in this page. You can add/delete new users, modify current username and switch to an existing player. Each game, you will have 5 moves and the game result will be recorded under the current player dataset. A derived field "winrate" will also be calculated by the program. Have fun!  


Baseline Requirements
---
- a `Server`: Starting with a default table with only one row, but can be modified freely
- a `Results`: A mini game is intergraded
- a `Form/Entry`: Allowing for Adding, Deleting, Modifing and Selecting
- a `Server Logic`: Functioning client and server comminucaiton
- the `Derived field`: winrate for the game


## Technical Achievements
- **Tech Achievement**: This a single-page app. The user has control of the user modification (adding new user, delete existing user, modify current username, switch to an existing user). The only problem is that the content won't show automatically when it reloads. There is a "Refresh" button to compensate that flaw.

FYI: 
1. The page needs to be reload everytime user restarts a game. Once loads, user need to click the "refresh" button to view the data. But after that, all other actions such as Adding, deleting, name changing and user switching will update the data display. After restarting or first time entering the page, a click on "refresh" button is needed to view the data.
2. The default user is always the first one in the table. The table will never be empty and user is not allowed to delete the very last user.
3. After user deletes the current player, the user needs to either switch to an existing user or simply click the "refresh" to let the program auto-assign a player to the user.
4. Not surprisingly, all records of the game will go to the current player. However, if the current user is empty and the game starts, all records will not be saved. So plz specify a player before the game starts.
5. From the playtesting, people find it annoying to have keep switching to a new added player when the game restarts. you can get around that but only keeping one user in the table. (And sorry for that inconvinieneve. I should definitely make the program lock on the current active user somehow, but I am running out of time for this submission)


### Design/Evaluation Achievements
- **Design Achievement**:   
Tester 1:
1. Li
2. The user found the "refresh" button confusing and it's annoying that they have to select a player everytime they restart the game.
3. "I have never lost so many RPS games in a row, this program knows all my moves."
4. If I had more time, I will definitely have the program keeps track of the current active user instead of having user switching it every game.

Test 2:
1. Chen
2. The user played 5 rounds and then realized that no records were saved since the current user was never been set, unsurprisingly, the tester called this program a hot pile of garbage.
3. "My winrate is already higher than your grades in this class."
4. Again, the current player and "refresh" button caused a lot of confusion for new user, the page needs to update the displayed data even after it reloads itself.
