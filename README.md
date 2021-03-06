## Setting up this React frontend

This will be much simpler than setting up the backend. You will need to have node and npm set up (https://www.npmjs.com/get-npm) on your machine first. You can see what versions you have by running:
```
node -v
```
```
npm -v
```

Then, navigate to the directory you created for the backend (or if you're doing this first, create a directory that will hold both the backend and frontend folders).

Within that directory, fork and clone this repo. Once it's been cloned, CD into that folder and run:
```
npm install
```
which will install all of the necessary packages. Make sure your backend server is running first (see the repo here: https://github.com/alexiscait142/remesh_backend) then run:
```
npm start
```
to start the server and navigate to http://localhost:3000 in your browser. You should see titles of conversations as well as a search bar.

You can type terms into the search bar and it will filter the conversations as you type.
You can also click on a conversation title to see all of its messages, and all the thoughts on those messages. If you scroll to the bottom of the conversation's messages, you can add a message. You can also click the "add thought" button to add a thought to that given message (at the moment, you will have to refresh the page to see the thought you added). You can also add a new conversation with the button at the bottom. See these required fields:


Messages and thoughts require whatever you want them to say (foreign key association is done behind the scenes).
Conversations only require the title.

A test can be found in the App.test.js file. You can run the rest by running `npm test` in the command line.

Packages used were those included in the create-react-app bootstrapper (https://reactjs.org/docs/create-a-new-react-app.html).
