Assignment 2 - Short Stack: Basic Two-tier Web Application using HTML/CSS/JS and Node.js  
===

Due: September 8th, by 11:59 AM.
live site: https://a2--apricieuxv.glitch.me

Acheivements
---

Below are suggested technical and design achievements. You can use these to help boost your grade up to an A and customize the assignment to your personal interests. These are recommended acheivements, but feel free to create/implement your own... just make sure you thoroughly describe what you did in your README and why it was challenging. ALL ACHIEVEMENTS MUST BE DESCRIBED IN YOUR README IN ORDER TO GET CREDIT FOR THEM.

*Technical*
- Single-page app that both provides a form for users to submit to do list and always shows the stuffs right below the input form.

*Design/UX*
- User-Testing 1
 Tester last name: Zhu
Overall, they said they enjoyed the application design and its functionality. The only real issues that they had with it was that it did not load on startup and the CSS shifted when things changed in the table (again, not too important at the moment to implement). One comment that surprised me was that they said they liked the overall design. This only surprised me because not many people enjoy the minamalist design scheme. For changes, I would have it load on startup and have the CSS not shift around.

- User-Testing 2
My other peer for review is Mary Barsoum. She said my site is adorable and that it is easy to use and clean. The only thing that she said could be improved on is figuring out how to rank the task based on priority. Other than that, her comments are similar to what Michael said above.

- Custom Achievement 1 - CSS Styling and Cohesion
One of the more challenging things that I spent my time on was creating a layout that was easily changable, reusable, and allowed different types of styling with the same design. I first started by wrapping the entire webpage in a wrapper class that constrained the page to a max width and height. That wrapper was around a container that then defined the display types and different padding. I mainly use this wrapper/container workflow as it allows me to easily modify the hierachy of styles. If I want to change the size of the page, I can modify the overall wrapper. For flow and content, I can modify the container. Though it seems redundant, this flow allowed me to easily make quick changes to the entire document and containerized different styles (one class didn't handle size AND flow).

Another design feature that I spent a lot of time on was the modal form popup. This was challenging as I have used React Native before to do similar behavior; however, because of the limited nature of JS, HTML, and CSS, I could not push it to its potential. I was able to accomplish this feature by changing the visibility of a given class and have its position be absolute to the page.


You'll need to use sometype of collaborative software that will enable you both to see the test subject's screen and listen to their voice as they describe their thoughts. After completing each study, briefly (one to two sentences for each question) address the following in your README:

1. Provide the last name of each student you conduct the evaluation with.
2. What problems did the user have with your design?
3. What comments did they make that surprised you?
4. What would you change about the interface based on their feedback?

*You do not need to actually make changes based on their feedback*. This acheivement is designed to help gain experience testing user interfaces. If you run two user studies, you should answer two sets of questions. 
