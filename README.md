# Movie Ranker
A single-page application for ranking and tracking watched movies. https://a2-tjcoppola.glitch.me

Using the "Add Movie" form will add a movie to the server and display that movie at the bottom of the page. Using the Delete Movie form will remove a movie from the server and from the movies displayed on the page. 

A grid layout was used for the "Movies" section and a flex layout was used for the forms, the rank key, the grid cells, and the general page layout.

When submitting a movie, two fields are created:
- date_watched: The current day, month, and year a which the entry was submitted
- years_between (derived field): Takes the difference of the date watched and the movie release year. It represents the number of years it took for the user to watch the movie after it was released.

## Technical Achievements
- **Single-page app**: When data is submitted to the server, the server automatically responds and displays the results of the submission to the bottom of the page.

## Design/Evaluation Achievements
- **UI testing**: 
  1. Pabón
  2. They wished they could sort the movies by rank, date watched, or release date. 
  3. They thought I should put a box around the rank key numbers/boxes or underline the Rank Key header. They thought the correct movie should be removed from the entries even if the title was typed in with incorrect upper or lower case letters.
  4. I would make it so you can sort the movies based on different attributes via a dropdown selection box. I would make it so movies could be filtered by rank if the box representing that rank in the rank key was pressed. I would also include an edit function so movie entries can be adjusted.
