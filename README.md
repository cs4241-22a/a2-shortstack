Liliana Foucault
https://a2-lbfoucault.glitch.me/

## Get 2 Know You
This page acts a brief intro to others in a group together. Any user can navigate to the page and enter their information in the input forms and click submit to store and display it. Users may also delete rows of entries.

## Technical Achievements
- **CSS**: The font used is "DM Sans" from Google Fonts. For ".container", I defined a flexbox display with space-between to place the input form and data table into different columns. I also added borders on the table for visual separation. The other rules include spacing and colors. I used a class selector for ".container" and ".del", id selector for "#dataTable", and element selectors for the other items on the page.
- **One page app**: I included a data table on the same page as the input form to display the entries submitted. When a user clicks "submit" or "remove" on a row, the data is the table is also updated.

## Notes
- I was unable to get the DELETE method functioning, but each "remove" button is labeled by row index and the onclick is sepecified per each.
- POST and GET methods work as expected and the page updates