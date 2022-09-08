# Kawane Moene's Guest Book

In this website I created a guest book with NodeJS. Instead of retrieving data when the user submits a entry, it pulls data from the server every few seconds. To make sure it stays sync between multiple clients. It have a very short time out so the server state updates very fast. I used css flexbox for the css layout. There are two main fields, one additional field, and two derived fields. Two main fields are name and message, additional field is the date, and two derived fields are message id and word count. 

## Technical Achievements
- **One page app**: 
This app only uses one page for everything including add, edit, view, and delete.
You can use the entire app without a single refresh.

### Design/Evaluation Achievements
- **User Test**: 
User1:
* Li
* Pretty smooth
* make buttons larger, make server status more visiable
* I'll make buttons bigger

User2:
* Chen
* It looks way too WPI
* Use table to show the data instead of ul
* I might use table instead