Assignment 2
---

Gabriel Buonomano / "Feathercrown" on github
http://a2-Feathercrown.glitch.me

## DoGrid
The form to add new tasks is at the bottom. Simply fill it out and press submit!
I used CSS Grid to position everything, and implemented some simple server-side processing.
I really should have written the frontend code a bit differently, but I didn't have time to refactor. It's very easy to break as-is; it really should keep track of the data outside of the DOM and update the DOM to match, not move things around in the DOM, but oh well.
I attempted to add drag-and-drop functionality, but that... did not work too well. The beta version of it is commented out so you can see it. A data-driven approach is almost surely needed to implement that in the best way.

## Technical Achievements
- **Single-Page Application**: I was able to fit both my form and display on the same page. This allowed me to create a SPA where the client sends the information to the server, which processes and stores it, and sends a response back that is immediately rendered.

### Design/Evaluation Achievements
- **User Testing**: I ran out of time for this one, unfortunately.
