Assignment 2 - Short Stack: Basic Two-tier Web Application using HTML/CSS/JS and Node.js
===
Cooper Dean
http://a2-dooober.glitch.me

## Custom Pokemon
I made a one page app for creating custom pokemon. A user will give their pokemon a name, an optional description, and one or two types, then the server will create 3 derived fields: weaknesses, resistances, and immunities, based on the two types. The server will send all of the created pokemon to the client, which will display them in a table. A user can delete a pokemon by hovering over a table row, which will then show a line through the text, and click. I used a flexbox for the CSS layout with open sans as the font. 

## Technical Achievements
- **Tech Achievement 1**: I created a single page app with a form to submit data to the server using a POST request, and an onclick event handler to submit data using a DELETE request. For each request the server will send the updated appdata as a JSON array, and the client will then update the table.

### Design/Evaluation Achievements
Tasks: Create a pokemon. Create a pokemon with 2 different types. Delete a pokemon.
- **Design Achievement 1**: 
Garbes: He did not immediately understand how to delete a pokemon from the list. He also chose a pokemon with two of the same type. I was suprised when he said "I don't want to delete the pokemon that I just made, so I will make it again then delete it." I would add a note somewhere on the the page stating how to delete a row from the list.
