Assignment 2 - Short Stack: Basic Two-tier Web Application using HTML/CSS/JS and Node.js  
===

## Grocery Boi
Grocery Boi is a website that allows you to keep track of items you need to purchase the next time you go shopping. 
https://a2shortstack-groceryboi.glitch.me/

I used CSS to automatically center the objects on the screen. There are three text entries side by side centered in the middle, which allow for the intake of the item name, the unit cost, and the cost per unit. 

## Technical Achievements
- **Updating a Server**: Using JavaScript's Post and Get functionality, this website allows you to send data to the server, and display it on the website after submission. After the submit button is clicked, the data is collected from the text boxes and sent to the server.
- **Manual Refresh**: If the server fails to load, or falls behind, a manual reset calls the function to redraw the table that contains the data.
- **Remove Entries**: When data is entered into the table, the JavaScript function assigns it a tag. This allows for easy indexing when attempting to edit or deleting data. I ran into trouble when removing tags, as the tags would reset back to the number of the tag that was deleted. (I.E. 0,1,2,3,4,5) would go to (0,1,2,4,5,3,4,5) if you deleted entry 3 and added two more entries. This would result in overlapping tags, and therefore errors.
- **Tag Indexer**: This would ensure that the same tag is not used twice, and that the tags would be re-assigned every time an entry is deleted. Using the same example as above, if we remove entry 3, (0,1,2,3,4,5) would become (0,1,2,3,4).
- **Edit Entries**: Using the same tag system, entries could be updated by entering data to the top, and hitting update to the row the user wishes to update.
- **Clear Entries**: This resets the server data at the push of a button.
- **Total Price Calculator**: The total price is calculated by multiplying the unit price by the number of units, displaying this data in a new column on the table.

### Design/Evaluation Achievements
- **Multiple Button Classes and Styles**: The buttons used in this project come from four different styles.
- **Remove/Edit Buttons**: Buttons to remove or edit data appear with every data entry inside the table
- **Color Palette**: I utilized a green and yellow palette due to their contrast and to emulate fresh produce
- **JavaScript Alerts**: Alerts are used in both the "How To" and reset functionality. When the user attempts to reset data, they are prompted to confirm their decison to clear the data from the server.
- **Shopping Cart Banner**: Acts as a spacer to divide the title from the text entry. Only used for style.

### UX Achivements/User Testing
-**1**: Tested by A. Gopalan and N. Kuchipudi as well as a friend outside the class.
-**2**: They disliked the green color scheme, and said that the update data functionality was complicated and unintuitive.
-**3**: They really enjoyed the how-to and the manual refresh feature, and found them very useful.
-**4**: I would choose a new color palette and update how one could change data. I instead would have the text that the user wants to edit turn into text boxes, and the "remove" button turn into the new submit button once the user presses the edit button. 
