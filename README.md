Dillon McCarthy
GitHub Username: dmccarthy11
https://a2-dmccarthy11.glitch.me/

This project demonstrates the ability to develop a two-tiered web application with client-server communication.  The project implements HTML, JavaScript, CSS, and Node.js functionality to create an application to track your music playlists online and store them on the server.

## Banana Music+

### Baseline Requirements
The web application allows a user to add and remove songs to a playlist.
General Notes:
- The add/remove form does work, but a refresh is required by clicking "Show Playlist"
- The remove button will remove all instances of an entry to the playlist matching both song and artist name.  This is case sensitive and the exact strings must match, so be sure there is no "space" character after when adding or removing or you will not have the desired outcome
- Server Logic: the derived field that the server makes is the text field for the album in the table.  A user enters the album name and the server concatenates the previous form values to compute the the full string with album name, song and artist

HTML:
- HTML form for data entry
- Results page using table
- Single page

CSS:
- External styling sheet of all elements
- CSS Selectors:
    - Element selectors - body, header, table, p, etc
    - ID selectors - #showPlaylist, #add, #remove
    - Class selector - .form
- Google font "Roboto" used
- CSS grid layout

### Technical Achievements
- **Tech Achievement 1**: The entire application is contained within a single page.  There is a form for a user to add data to the server and remove data to the server, and when this is submitted, the server responds with the updated data.  Once the user updates by clicking the "Show Playlist" button, the screen in changed with the updated server data

### Design/Evaluation Achievements
- **Design Achievement 1**: User interface testing

Student: Cindy Trac
Task: Add a song to your playlist, remove a song from your playlist, and find the three songs already added to your playlist.
Platform: Zoom

Feedback:
- Problems: 
    - Cindy was confused that you had to refresh the playlist to show the added/removed songs because the button is labeled "Show Playlist"
    - No success/failure message was given after clicking add/remove song.  If the user attempted to remove a song that was not in the playlist nothing happened and a failure message was not given
    - Can add duplicates to a playlist
    - A song can be added without all of the fields completed
- A surprising comment was that she observed how the text stayed in the form after using the button. This is something I had not considered during the design process
- If I were to change this in the future, I would:
    - Add a feedback message above the playlist saying "Song added", "Song removed", or "Song not in playlist"
    - I would try to automatically have the playlist refresh when making changes to the data
    - I would have the playlist load the server data on page startup rather than having to initially click show playlist
    - I would mandate all fields are filled out for the form before allowing the user to send data to the server