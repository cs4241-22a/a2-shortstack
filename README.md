## Qui Nguyen (qnnguyen | 621772228)

**Glitch link:** https://a2-quinguyen-dev.glitch.me

## Minamilist Todo Application

This project is a basic SPA that handles form entry and deletion. It uses pure HTML, CSS, and JS. In order to use this page, click on the **add form** button on the top right. Here, you must include the **priority**, **type**, **title**, and **description** in order for the submit button to work. You do NOT need to set a **deadline** for the submission to work. If you do not set a deadline, then the server will automatically determine a date dependent on **priority** and **creation time**. The latter is created on server side using the JS Date() function. Once you submit with the correct information, all the server-side information will populate the screen. I decided not to have it preload as, 1) the application still meets all requirements without it, and 2) I have been busy with MQP and such. To delete something, just press the delete button on the right side of the form entry.

My CSS is organized by usage in the HTML. For example, I have my wrappers and page containers under **INITIAL PAGE FORMATTING AND SETUP**. This pattern is seen throughout the rest of the file.

## Technical Achievements

#### Create a CPA

The application is CPA because it takes in user data and displays (real-time) the information that the server holds. The modal that pops up for the form entry is still in the same .html and is not a separate file.

## Design Achievements

#### User-Testing 1

The first peer that tested my application was Michael O'Connor. Overall, they said they enjoyed the application design and its functionality. The only real issues that they had with it was that it did not load on startup and the CSS shifted when things changed in the table (again, not too important at the moment to implement). One comment that surprised me was that they said they liked the overall design. This only surprised me because not many people enjoy the minamalist design scheme. For changes, I would have it load on startup and have the CSS not shift around.

---

#### User-Testing 2



---
