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
-- Tester last name: Zhu
He did find that my server does the order of to do list with specific order. He thought probably it would be better if I could make it ordering as somehow like alphabetic, ungency etc. Actually I did not change to exactly what he said. Instead, I organized them with classifier.

- User-Testing 2
--- Tester last name: Zhang
She thought my overall color is great, and the design is what she likes. She thought it would be better to distinct clear and delete since I originally have clear stuff as delete button which did confuse users. Obviously I changed it :)

- Custom Achievement 1 - CSS Styling and Cohesion
One of the more challenging things that I spent my time on was creating a layout that was easily changable, reusable, and allowed different types of styling with the same design. I first started by wrapping the entire webpage in a wrapper class that constrained the page to a max width and height. That wrapper was around a container that then defined the display types and different padding. I mainly use this wrapper/container workflow as it allows me to easily modify the hierachy of styles. If I want to change the size of the page, I can modify the overall wrapper. For flow and content, I can modify the container. Though it seems redundant, this flow allowed me to easily make quick changes to the entire document and containerized different styles (one class didn't handle size AND flow).

Another design feature that I spent a lot of time on was the modal form popup. This was challenging as I have used React Native before to do similar behavior; however, because of the limited nature of JS, HTML, and CSS, I could not push it to its potential. I was able to accomplish this feature by changing the visibility of a given class and have its position be absolute to the page.
