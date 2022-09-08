## Budgeteer
A little web app for tacking your income and expenses. Visualize your money as a series of $/time vectors and determine how much money is entering or leaving your account at any given moment. 

This application is constructed mostly of flexboxes.

Use the ADD INCOME button to add an income, the ADD EXPENSE button to add an expense, a table should be visible at all other times.

## Technical Achievements
- **Single Page App**: The entire app works seamlessly on a single page. This involves a lot of document.getElementById() and document.createElement() calls. I did my best to make the homescreen transition cleanly to the actual application, as well. This was particularly challenging with the background I'm using (from [Haikei](https://app.haikei.app/)), so I had to create an entire app-wrapper element and placed the pages in there.


- **Form Functionality**: There were several challenges to getting this form to work the way I wanted it to. First, I had some trouble getting the correct values out of the select element. Then, I had issues making sure that user inputs were actually valid. I only wanted the form to be submitted if the user had filled in all of the fields and their "amount" input was numeric. I eventually stumbled upon the function isNaN to help me check whether or not an amount could be converted to money.

- **Table Functionality**: I had an unreasonable amount of trouble getting the "Click to Delete" button on the table working properly. First, I needed a system to give each dataPoint a unique identifier. I ended up doing this by just calling Date.now() to get the number of milliseconds since Jan 1, 1970. Then I had trouble actually filtering the id that I wanted to delete from the appData when the POST was received. This just ended up being a semantic error, but it took far longer that I wanted to solve.

### Design/Evaluation Achievements
- **Color Scheme**: This app uses a black and gold color scheme. I originally thought I would go with some purpley, blue, space-type colors so that it would look like the app was in some sort of nebula (inspired by the name Budgeteer— a combination of Budget and Rocketeer becuase the user gets to see their wallets skyrocket... or crash and burn I suppose) but I ended up switching to this other aesthetic because it reminded me of those fancy credit cards that you get for being tremendously rich.

I found it diffucult to make this color scheme appear well at first because I was going with really contrasting colors (black and white, some yellow, bright greens and reds), but I was able to clean it up by switching almost all whites to a "cream" color.

- **Formatter**: There's a formatter object for displaying money correctly! I'm using it in the table to display the amounts correctly.

- **Colors**: Since my app is really just a bunch of numbers, I thought it was a little too difficult to decipher what they each meant. I have colored all incomes green and expenses red. It's not perfect, but I think it's much easier to read than it was before.