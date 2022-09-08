Assignment 2 - Short Stack: Basic Two-tier Web Application using HTML/CSS/JS and Node.js  
===
Sizhe Li
https://a2-beatrimo.glitch.me
Acheivements
---



## WGN - Share your Game Review !

This app is a website for sharing user reviews of any video game played.
Users can manually enter relevant information to enter a game review, 
and the system will generate corresponding recommendations based on the player's score.
Players can browse existing reviews directly by clicking on "see reviews" in the center of the screen. 
Users can also delete their own published reviews.

I use a lot of CSS positioning techniques, including but not limited to: padding, 
margin, margin-left/right/top/bottom, display:flex,align-itms,height,weight,justify-content, text-align,
  vertical-align.
## Technical Achievements
- **Tech Achievement 1**: 
I created a single-page app that both provides a form for users to submit data 
and always shows the current state of the server-side data. 
Once the user decides to submit or delete the reviews, the website will automatically refresh the status of the form.
### Design/Evaluation Achievements
- **Design Achievement 1**: 

Oliver Chen:
The design is very eye-catching and the operation is smooth, but the experience when filling in the score is not very good: the system does not directly remind the user to only enter numbers, which causes the user to try to enter letters many times during the test; lack of the edit function, others are very good.
In the future, there will be an opportunity to complete the edit function.
Zihang Chen:
The UI is very attractive, the basic functions are there, and the review (data) entered after the page is refreshed still exists. However, the user successfully enters a score greater than 100 (out of range) and the form will return an illegal input prompt. I would consider alerting the user via a popup window in the future when it detects that the user is trying to enter a number outside the range, and preventing this "offending" data from being uploaded to the service.
