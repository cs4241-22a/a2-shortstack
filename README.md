Assignment 2 - Short Stack: Basic Two-tier Web Application using HTML/CSS/JS and Node.js  
===

Cindy Trac [https://a2-cindytrac.glitch.me/](https://a2-cindytrac.glitch.me/)

## BOOKish NOOK - A Book Logger
With the BOOKish NOOK, you can log the books you read! 

- You can personalize your library by entering your name.
- You can add books with the `Form/Entry` functionality. 
- From the information provided by the user, the Server Logic ` will generate a new entry into the library. 
- For the `Derived field`, BOOKish NOOK will calculate how long you spent reading a book from the start and complete dates. 


*HTML*
  - Single page application
  - HTML form functionality for data entry
  - Table to display results

*CSS*
  - External sheet for style of all elements
  - `Element electors` include body, table, p, div, label, and more. 
  - `ID selectors` include add, remove, and more. 
  - `Class selectors` include .form.
  - `Flexbox` layout used. 
  - No default fonts, used Google Font "IM Fell DW Pica"
  
*Javascript*
  - get and fetch data from the server
  - "go to top" button to take user back to top of page

*Node.js*
  - HTTP Server that delivers all necessary files and data for the application
  - creates the required `Derived Fields` in your data

## Technical Achievements
- **Single-Page App**: I created a single page application that validates. The functionality of which is described above in further detail. It provides a form for users to submit data and always shows the current state of the server-side data
 

### Design/Evaluation Achievements
- **User Interface Testing**: I tested my user interface with other students in the class. The task were to label your library and add a book to the library.
  - `TESTER #1: Luu`   
    - Problems:
      - "Your Library" isn't too visible with the scroll. 
      - Make buttons bigger.
      - Delete function didn't work. 
    - Surprises/Delights
      - Tester thought it was a cute touch to be able to change the name of the library. 
      - Really liked color scheme. Adding book was easy.
      - Tester found app straightforward and intuitative.
    - Changes:
      - I would move the "Your Library" heading up and make the buttons bigger. 

  - `TESTER #2: Pham`
    - Problems:
      - Overall, tester would have preferred to scroll less. However, there was minimal scrolling, so not too much of a problem.
      - Tester would create drop down for the delete book option so users don't have to type exact name and author.
      - Delete function didn't work.
    - Surprises/Delights
      - Tester thought it was a cute touch to be able to change the name of the library. 
      - Really liked UI and color scheme. Adding book was easy.
    - Changes:
      - I would create drop down for the delete book option.
  
