## Qui Nguyen (qnnguyen | 621772228)

**Glitch link:** https://a2-quinguyen-dev.glitch.me

## Minamilist Todo Application

This project is a basic SPA that handles form entry and deletion. It uses pure HTML, CSS, and JS. In order to use this page, click on the **add form** button on the top right. Here, you must include the **priority**, **type**, **title**, and **description** in order for the submit button to work. You do NOT need to set a **deadline** for the submission to work. If you do not set a deadline, then the server will automatically determine a date dependent on **priority** and **creation time**. The latter is created on server side using the JS Date() function. Once you submit with the correct information, all the server-side information will populate the screen. I decided not to have it preload as, 1) the application still meets all requirements without it, and 2) I have been busy with MQP and such. To delete something, just press the delete button on the right side of the form entry.

My CSS is organized by usage in the HTML. For example, I have my wrappers and page containers under **INITIAL PAGE FORMATTING AND SETUP**. This pattern is seen throughout the rest of the file.

## Technical Achievements

#### Create a SPA

The application is SPA because it takes in user data and displays (real-time) the information that the server holds on the same page. The modal that pops up for the form entry is still in the same .html and is not a separate file.

## Design Achievements

#### User-Testing 1

The first peer that tested my application was Michael O'Connor. Overall, they said they enjoyed the application design and its functionality. The only real issues that they had with it was that it did not load on startup and the CSS shifted when things changed in the table (again, not too important at the moment to implement). One comment that surprised me was that they said they liked the overall design. This only surprised me because not many people enjoy the minamalist design scheme. For changes, I would have it load on startup and have the CSS not shift around.

---

#### User-Testing 2

My other peer for review is Mary Barsoum. She said my site is adorable and that it is easy to use and clean. The only thing that she said could be improved on is figuring out how to rank the task based on priority. Other than that, her comments are similar to what Michael said above.

---

#### Custom Achievement 1 - CSS Styling and Cohesion

One of the more challenging things that I spent my time on was creating a layout that was easily changable, reusable, and allowed different types of styling with the same design. I first started by wrapping the entire webpage in a **wrapper** class that constrained the page to a max width and height. That wrapper was around a **container** that then defined the display types and different padding. I mainly use this wrapper/container workflow as it allows me to easily modify the hierachy of styles. If I want to change the size of the page, I can modify the overall wrapper. For flow and content, I can modify the container. Though it seems redundant, this flow allowed me to easily make quick changes to the entire document and containerized different styles (one class didn't handle size AND flow).

Another design feature that I spent a lot of time on was the modal form popup. This was challenging as I have used React Native before to do similar behavior; however, because of the limited nature of JS, HTML, and CSS, I could not push it to its potential. I was able to accomplish this feature by changing the visibility of a given class and have its position be absolute to the page. 
