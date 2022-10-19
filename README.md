## Budgeteer

By Joe Dobbelaar: https://a4-r2pen2.glitch.me/

I switched my server over to express and created a React app for my client.
I found using react much easier as I didn't just have one big scripts file.
Everything could be contained within it's relevant component.

The only hinderance was getting the server to actually SERVE the application. I had to switch over to express to do this, but I find express much easier to work with than writing the server on my own anyway. I was running into issues where my client and server were on different ports, so fetch() didn't work as intended. I was able to fix this by making a BUILD of my react app and sending that to the client with express.