## Shopping List Creator
- **Summary**: My project allows the user to create a shopping list that will calculate how much their shopping spree will be. The values they input will be sent to the server, saved in appdata, and returned/updated to the client for a single-page app. Be sure to fill in the quantity and price tab with numbers (decimals are fine as well), otherwise you will not be able to properly find out the total price. 
- **CSS positioning techniques**: I used a CSS flexbox to center my project and make it look more refined. The .container class allowed me to move everything at once and it looked good already, so I did not create a .item class for individual sections. All fonts are linked from google fonts and Id, Element, and Class selectors are all used to reference different parts of the web page.


## Technical Achievements
- **Tech Achievement 1**: Using a combination of javascript and HTML, I was able to create a single page app. Whenever the user inputs data and presses the submit button, there is code in the javascript that will send the Client's POST to the server, which will update the appdata on the server. From there, there will be a promise that will call a GET that will get the appdata from the server and update the HTML on the screen (when submitting will only retrieve the new data), without needing to open a new page. In order to do this, I created an id inside the table in the HTML that would insert the data into a specific point of the table. Whenever the webpage is reloaded, a GET fetch is called that will retrieve any current data in appdata, and re-input the data into the table. When data is deleted, the client will send a POST to the server that will have the server filter through the current appdata and only keep any data that does not share the same shopping item name. Once the POST returns, there will be a promise that will call a GET fetch that will remove all the contents of the HTML table and re-input the appdata into the table.

### Design/Evaluation Achievements
- **Design Achievement 1**: 
    - Chlebowski:
        - They had no problems with the design except for a problem where after submitting the text would stay in the submission boxes. 
        - There weren't any comments that surprised me. If i had to say anything about their comments, I would say that it confirmed what I had thought about my web page. The website was simple to use, and had a clean layout so nothing is confusing.
        - Based on their feedback, I would change how after you submit an item, the text from the previous submit doesn't go away. I would change it so that it would reset the submit field every time.
    - Gregg:
        - Person had no problems with the design. They thought it was fine and did not have anything that needed to be fixed.
        - There were not any comments that surprised me. They said that the table worked similar to theirs which was pretty cool to hear, and also that the CSS design of the table looked really good. They also liked the specific fonts and the use of different fonts. 
        - I wouldn't change anything about my design from this feedback. Since the person likes it I would not want to risk making any changes that could make it worse since they liked everything about the web page.
