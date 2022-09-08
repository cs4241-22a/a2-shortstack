
## Counter

This is a simple webpage for keeping track of numbers. A user can add or subtract numbers through the submit form, which adds a number and timestamp to the server's memory. The server keeps track of the running total. Additionally, a user can remove an index, removing the submission and timestamp from the server's memory, and subtracting the entry from the total.
A CSS Flexbox was used to block out the webpage.
The submit button will add any number in the left text box to the server's memory and total
The remove button will remove any index in the right text box from the server's memory.
## Technical Achievements

- **Tech Achievement 1**: The website displays the entire server memory every time the webpage is updated, thus keeping all of the information on the same page.

### Design/Evaluation Achievements

- **Design Achievement 1**: I had two students review the user interface. The task I set for them was to ineteract with the Counter, and try adding and subtracting a bunch of different types of numbers.

- The First study was with David Mahany. This user did not have any issues interacting with the interface, and was able to add and remove numbers without issue.
I was surprised by the fact that they were impressed by how well the website worked with Darkreader, as well as without it. I had not initially considered how Darkreader might have affected the user experience.
An issue that was discovered during the study was that by overloading the floating point maximum, the webpage can return NAN as a total, as opposed to Infinity as intended. This is something I would work to fix based on the feedback.

- The second study was with Slater Campbell. This user also had few issues navigating the interface, though seemed to struggle with removing entries.
I was surprised that they were interested about the display of Infinity, and the suggestion that it might be better to display it as the symbol rather than the string.
Something I would change based on their feedback would be to have the forms automatically clear the prompt when selected.
