## Assignment 2 - Short Stack

[Glitch Link](https://a2-dtavana.glitch.me)

In this assignment, I decided to create an application that stores the results and scores of a player in a game. The 3 fields that are able to be set as inputs include:

- **Player Name** (string)
- **Player Score** (number)
- **Win Result** (boolean)

The derived field is **Player Total Score in Wins** (number) which is calculated by summing **Player Score** where the **Win Result** is **true** and grouping by **Player Name**.

In order to modify a row, enter your input into the form and click the yellow "Modify" cell.
In order to delete a row, simply click the red "Delete" cell.

Lastly, a **flexbox** is used for document layout.

## Technical Achievements

- **Single Page App**: My submission contains the submit form as well as the results table all on the same page. The table is updated on form submission.
- **REST API Standards**: Server back-end features several different endpoints
  - **/currentdata (GET)**: Returns the score dataset stored in memory
  - **/ (POST)**: Submits a new score entry
  - **/ (PUT)**: Updates a specific score entry
  - **/ (DELETE)**: Delete a specific score entry
