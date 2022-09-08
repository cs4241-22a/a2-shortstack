Cole Ouellette
http://a2-kfchaos.glitch.me

## Assignment Tracker v01

This project was designed with WPI students in mind. It is a one-stop shop where a user can go online and keep track of every course and assignment that they have underway at any given time. As it is a single-page application, the only page is index.html and it does indeed validate. The application is comprised of two HTML forms, two table elements to display the appropriate information, and a title header. The entire application is styled with the Oswald Google Font family and uses Element, ID, and Class selectors to style individual elements which can all be found in the _style.css_ document . To help structure the webpage, the forms are contained within flexboxes to maintain a more user-friendly experience on a variety of device sizes.

As for the server functionalities, the user is able to create, delete, and view persistent data that will reside in the server's memory, even through a page refresh. When thinking about how a student would use this application, it made sense to me that every assignment created within the tracker would not yet be completed so I felt it made sense to create leftmost 'completed' boolean field in the table that the server automatically inserts to every item. When the student completes their assignment, they simply have to check it off the list and it will automatically be marked as completed and erased from the database. To compute the amount of remaining class days, the application records the course's term, the number of weekly meetings, and today's date to derive about how many classes the user can look forward to.

## Technical Achievements

- **Tech Achievement 1**: Using a combination of HTML tables and JavaScript, I was able to successfully create a single-page application where users may create and keep track of new Courses as well as Assignments. When the user submits a new assignment, they will see it populate into the bottom table display with all the information that was provided. Additionally, the New Course form operates similarly but all populates the course title into the Assignment Form dropdown for selection and computes the approximate number of classes remaining in the term as a result of the inputs provided.

### Design/Evaluation Achievements

- **Design Achievement 1**: Design Test

    1. *Provide the last name of each student you conduct the evaluation with.*
    - Subject 1: Wood
    2. *What problems did the user have with your design?*
    - The subject approached the website blindly, only told to "use the website as [she] felt natural." When it came to adding a course, she had no troubles entering correct data and submitting to the database. However, in the fullscreen environment she was totally unaware that there was even a second half to the page accessed by scrolling down.
    3. *What comments did they make that surprised you?*
    - She felt as though the checkbox where the user can clear a assignment from their list was not clear enough
    4. *What would you change about the interface based on their feedback?*
    - I would tweak the UI to make it more evident that there is more at the bottom of the page either through a more apparent custom scrollbar or by hanging a little bit of the Assignment Form on the bottom of the original view so that it's clear there's more there. 

    1. *Provide the last name of each student you conduct the evaluation with.*
    - Subject 1: Price
    2. *What problems did the user have with your design?*
    - Like the first subject, this subject also went in with little instruction as to how the application works but found the second half of the page with no problems. However, he too didn't understand that the leftmost checkbox in each row of the assignment table was meant for clearing the entry
    3. *What comments did they make that surprised you?*
    - The fact that the second user made a comment about the lack of clarity on a feature that I thought made sense caught me off guard.
    4. *What would you change about the interface based on their feedback?*
    - The subject said that the checkbox as a means of clearing an assignment from the list looked more like some sort of "bullet point" preceeding each entry. While I thought the checkbox made sense for what is essentially a todo list, I would try out restyling the boxes or perhaps converting the element into an image to explain its purpose more clearly.