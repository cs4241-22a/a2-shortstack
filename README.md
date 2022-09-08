# QuickList
QuickList is a grocery list tool that lets the user input an item, the quantity of the item, and the brand (optional). When the user clicks submit,
the server stores the new list item as well as derives the units before sending it back to the client to display. The default unit is "Ct", but if 
the user lists meat items ("Chicken", "Pork", "Beef") the units will be "Lb", "Eggs" or "Ice cream" results in "Carton", or "Peanut butter"/"Jam"/"Jelly" 
results in "Jar" as the unit. Additionally, if the quantity is 2+, there will be an "s" on the end of the units (i.e. "Cartons"). Users can also 
specify the name of an item they wish to remove from the list by typing in the item name into the delete box and clicking the delete button. 

The project uses flexbox CSS rules to align the four columns (unordered lists) that make up the results. 

Glitch Link: https://a2-abbyhyde.glitch.me

## Technical Achievements
- **Tech Achievement 1**: The webpage is a single webpage that handles both the data input and display. When the user clicks the submit button, the
 server handles the data, including determining the derived field, and sends it back to the page to render. 

## Design/Evaluation Achievement - User Experience Testing
### User 1: Yasmine Aoua
Problems with the design: The derived fields are case-sensitive ("Eggs" results in "Cartons" but not "eggs"). I had to verbally tell her to change 
eggs to Eggs so that the derived units would appear. I also mentioned that brand wasn't a required field so she told me it should be indicated when 
the user is filling out the form. 
Comments: She liked the simple interface and said it was easy to use. 
What to Change: I agree that having the derived units be case sensitive was annoying so I'd definitely fix that. 

### User 2: Edward Clifford
Problems with the design: He said it would be better if the user could press the enter button to submit a new item or delete an existing item when using the 
form because it's a bit clunky to have to press the button with a mouse. 
Comments: Liked the interface a lot, very straightforward. Also thought the derived units was cool. 
What to Change: Since pressing enter is a common way to submit a form (so users don't have to switch back and forth from the mouse and keyboard), 
I would implement that. 
