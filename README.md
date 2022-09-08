Reagan Brunelle
https://a2-rmbrunelle.glitch.me/

## Music Playlist Creator
Summary: Music Playlist Creator. My project is a pretend music playlist. The user can add songs with specific name, artist, duration, and album, and see the playlist length in minutes on the right after each song. This way the user can know at what point in the playlist a song will play.

Special Instructions: You must enter a number in the "Duration of song" field for it to work properly. It will round down to nearest integer.
- note that I tried to get a reset button working but couldn't get it compatible with my laylist length derived field. To check how it works with the reset button activated, uncomment const reset in scripts.js and uncomment the "if undefined" and its closed brace a few lines below in addToPlaylist

some CSS Details to note:
- Used an html form for gathering song info and a table to display the results instantly - italized form values, highlighted labels
- Derrived field - the playlist length is tallied after each song is added. This way the user can see at which point in the playlsit that a certain song will play.
- Flexbox - in the header with 2 band pictures and my title
- CSS class for values in playlist length column - blue and underlined
- CSS id for form values and first row of results - bold and colored
- Google font - Merriweather
- Various other colors are used with css element selectors
- Styling and scripting are done in external sheets
- No default fonts are used
- submit and reset buttons are used

## Technical Achievements
- **Tech Achievement 1**:  My results table automatically updates from the server when a new song is submitted. I need this my editing the appending the innerHTML of the results table directly with the data collected by the server. This is called whenever the submit button is pressed, which provides instantanious results from the server to the client. 

Why this was challenging: it was difficult to append data to the results table and keep the header at the same time. This is because the method I used appends data and overrides what is in the table, thus forgetting about the header. I fixed this by recreating the header outside of the for each loop every time a new song is added.

### Design/Evaluation Achievements
- **Design Achievement 1**: Shane Stevens think-aloud (we reviewed each others)
- Last name: Stevens
- Task: Make a 5 songs playlist
- Problems: He pointed out that it would be easier to enter data if I automatically clear input fields when clicking on a form box. He also sugguested that I use a reset button for the playlist.
- I was suprised that he liked my fonts and pictures. I felt they could've been risky choices.
- I would specify that song duration needs to be in minutes and ideally I should handle seconds as well. I also did implement the clear input fields feature and a reset button.

- **Design Achievement 2**: Y. Zhu think-aloud (we reviewed each others)
= Last name: Zhu
- Task: make a 5 song playlist of a total of 22 minutes long
- Problems: When he first looked at my page, I did not have much styling, so I made it look much better. 
- He thought it was easy to understand how to use
- I could've used an actual color scheme as opposed to random colors I chose