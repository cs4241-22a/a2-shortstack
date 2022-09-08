Assignment 2 - Short Stack: Basic Two-tier Web Application using HTML/CSS/JS and Node.js  
===

[a2-edwardclifford.glitch.me](a2-edwardclifford.glitch.me)

## Movie Watchlist
This site provides and easy to way to build out a movie and TV watchlist. The site features 2 components. The first is the running list. This data is stored on the server and fetched everytime the page refreshes or the list is updated by the client. The second component is a movie search bar that allows the user to lookup movies and tv shows by their name. The user can then add the desired title to their list. These components are arranged using the CSS flexbox properties.

### How to Use:
- Click on the "+ New Movie" button to expand the search function.
- Enter a desired movie or TV show title into the search box and hit enter (or click search)
- A list of titles matching the search query will appear below the search bar. To add one of these movies to the watch list, click the blue "+" to the right of the title.
- The title will now appear above in the watchlist. To remove it from this list, click the red "-" button to the right of the title. To change the order of the list, use the arrow buttons to the right of the "-" button.
- Check out the IMDB page for the title by clicking the name in your watchlist.
- The search feature can be minimized by clicking on the "+ New Movie" button again.
- Hover over the *great* descriptor before the search bar for an easter egg :)

## Requirements:
- **Server**: Serves client files, maintains dataset of current movie list. Columns: `Title`, `Year`, `imdbDB`, `Type`, `Poster`, `URL`.
- **Results**: Current movie list always displayed on top of page.
- **Form**: User can search for movies using a text input which is submitted to the server on enter or button press.
- **Server Logic**: Server can take `add` or `remove` commands from the client to create new or remove entries from the dataset. Server checks if the unique entry already exists before adding or subtracting from the dataset.
- **Derived field**: The IMDB url is derived from the imdbID field. The url is resolved by the client, but derived on the server and stored in the dataset.

### HTML:
- Form tag: <input> - used to collect search information.
- Results rendered as single page app
- Pages validate
- Single page

### CSS:
- All elements of page styled
- Selectors used: element, id, class
- CSS flexbox layout used for primary components
- All text styled using google fonts and custom colorscheme
- All CSS defined in `style.css` external stylesheet

### Javascript:
- All page rendering done in `scripts.js`
- Data fetching done in `scripts.js`

### Node.js:
- HTTP server delivers client page, maintains dataset and creates derived field
- Fetches movie information from external movie database

## Technical Achievements
- **Tech Achievement 1**: This is a single page web app that always displays the current state of the internal data (current watchlist) on the server. This is done with a REST API to GET the current list, and to POST add or remove commands for specific titles. These API calls are controlled by the "+" and "-" buttons next to the titles. Sending an add or remove request returns the updated movie list and the client list is updated accordingly. Additionally, the search function uses a term provided by the user and fetches a movie list from ombapi, a movie database.
- **Single Page App**: The webpage updates are all done through js and do not require a reload to display the current dataset. When the client updates the server dataset through an add or remove, the server responds with an updated watchlist, which is rendered on the page by modifying the DOM. This was challenging in pure JS since DOM modification and creating elements is not intuitive or easy. By looping over each entry in the dataset and building styled elements around the information, I was able to create a good looking list of data.
- **Search Feature**: The movie search feature is done on the serverside after the user submits a query on the client. The query is translated into an API call to ombapi which returns a JSON object with movies related to the search term. These results are passed to the client, where the results list is rendered in a similar manner to the watchlist. This task took debugging on Glitch, since it worked on local build, but not hosted. The solution was to define the version of node Glitch would use, since the fetch library did not work with the version of Node Glitch was using out of the box.

### Design/Evaluation Achievements

#### Evaluation #1
1. Gabe Camacho
2. The user did not encounter issues during the study with the website design
3. They wished the add movie button was more blue
4. This makes sense, since all the add buttons are blue and all the delete buttons are red. Adding movies should be consistently blue

#### Evaluation #2
1. Abby Hyde
2. The user was minorly confused about how to add movies to the list, saying the opening button was not intuative.
3. The user confused the list box with the entry box, saying it looks like a text field
4. In response, I centered the text explaining how to add the first movie, and it no longer looks like a textfield at first glance. 

