Assignment 2 - Short Stack: Basic Two-tier Web Application using HTML/CSS/JS and Node.js  
===

Due: September 8th, by 11:59 AM.

This assignment aims to introduce you to creating a prototype two-tiered web application. 
Your application will include the use of HTML, CSS, JavaScript, and Node.js functionality, with active communication between the client and the server over the life of a user session.

Baseline Requirements
---

There is a large range of application areas and possibilities that meet these baseline requirements. 
Try to make your application do something useful! A todo list, storing / retrieving high scores for a very simple game... have a little fun with it.

Your application is required to implement the following functionalities:

- a `Server` which not only serves files, but also maintains a tabular dataset with 3 or more fields related to your application
- a `Results` functionality which shows the entire dataset residing in the server's memory
- a `Form/Entry` functionality which allows a user to add, modify, or delete data items residing in the server's memory
- a `Server Logic` which, upon receiving new or modified "incoming" data, includes and uses a function that adds at least one additional derived field to this incoming data before integrating it with the existing dataset
- the `Derived field` for a new row of data must be computed based on fields already existing in the row. 
For example, a `todo` dataset with `task`, `priority`, and `creation_date` may generate a new field `deadline` by looking at `creation_date` and `priority`

Your application is required to demonstrate the use of the following concepts:

HTML:
- One or more [HTML Forms](https://developer.mozilla.org/en-US/docs/Learn/HTML/Forms), with any combination of form tags appropriate for the user input portion of the application
- A results page displaying all data currently available on the server. You will most likely use a `<table>` tag for this, but `<ul>` or `<ol>` could also work and might be simpler to work with. Alternatively, you can create a single-page app (see Technical Acheivements) but this is not a requirement.
- All pages should [validate](https://validator.w3.org)
- If your app contains multple pages, they should all be accessible from the homepage (index.html)

CSS:
- CSS styling of the primary visual elements in the application
- Various CSS Selector functionality must be demonstrated:
    - Element selectors
    - ID selectors
    - Class selectors
- CSS positioning and styling of the primary visual elements in the application:
    - Use of either a CSS grid or flexbox for layout
    - Rules defining fonts for all text used; no default fonts! Be sure to use a web safe font or a font from a web service like [Google Fonts](http://fonts.google.com/)

- CSS defined in a maintainable, readable form, in external stylesheets 

JavaScript:
- At minimum, a small amount of front-end JavaScript to get / fetch data from the server; a sample is provided in this repository.

Node.js:
- An HTTP Server that delivers all necessary files and data for the application, and also creates the required `Derived Fields` in your data. 
A starting point is provided in this repository.

Deliverables
---

Do the following to complete this assignment and acheive a base grade of 85%:

1. Fork the starting project code (make sure to fork the 2022 repo!). This repo contains some starter code that may be used or discarded as needed.
2. Implement your project with the above requirements.
3. Test your project to make sure that when someone goes to your main page, it displays correctly.
4. Deploy your project to Glitch, and fill in the appropriate fields in your package.json file.
5. Ensure that your project has the proper naming scheme `a2-yourGithubUsername` so we can find it.
6. Modify the README to the specifications below, and delete all of the instructions originally found in this README.
7. Create and submit a Pull Request to the original repo. Label the pull request as follows: a2-gitusername-firstname-lastname

Acheivements
---

Below are suggested technical and design achievements. You can use these to help boost your grade up to an A and customize the assignment to your personal interests. These are recommended acheivements, but feel free to create/implement your own... just make sure you thoroughly describe what you did in your README and why it was challenging. ALL ACHIEVEMENTS MUST BE DESCRIBED IN YOUR README IN ORDER TO GET CREDIT FOR THEM.

*Technical*
- (10 points) Create a single-page app that both provides a form for users to submit data and always shows the current state of the server-side data. To put it another way, when the user submits data, the server should respond sending back the updated data (including the derived field calculated on the server) and the client should then update its data display.

*Design/UX*
- (5 points per person, with a max of 10 points) Test your user interface with other students in the class. Define a specific task for them to complete (ideally something short that takes <10 minutes), and then use the [think-aloud protocol](https://en.wikipedia.org/wiki/Think_aloud_protocol) to obtain feedback on your design (talk-aloud is also find). Important considerations when designing your study:

1. Make sure you start the study by clearly stating the task that you expect your user to accomplish.
2. You shouldn't provide any verbal instructions on how to use your interface / accomplish the task you give them. Make sure that your interface is clear enough that users can figure it out without any instruction, or provide text instructions from within the interface itself. 
3. If users get stuck to the point where they give up, you can then provde instruction so that the study can continue, but make sure to discuss this in your README. You won't lose any points for this... all feedback is good feedback!

You'll need to use sometype of collaborative software that will enable you both to see the test subject's screen and listen to their voice as they describe their thoughts. After completing each study, briefly (one to two sentences for each question) address the following in your README:

1. Provide the last name of each student you conduct the evaluation with.
2. What problems did the user have with your design?
3. What comments did they make that surprised you?
4. What would you change about the interface based on their feedback?

*You do not need to actually make changes based on their feedback*. This acheivement is designed to help gain experience testing user interfaces. If you run two user studies, you should answer two sets of questions. 

Sample Readme (delete the above when you're ready to submit, and modify the below so with your links and descriptions)
---

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

