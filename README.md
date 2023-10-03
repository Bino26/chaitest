# Node testing with Mocha, Chai, and Puppeteer

This is the starter repository for an exercise on how to do automated testing.

Fork the repository and clone your fork. Then create a branch called assignment where you
will do your work. When you have finished your work, push the assignment branch
to your repository and create a pull request. When you turn in your assignment,
include a link to your pull request.

This package contains code for a crude front end that makes AJAX calls to the back end.
You can bring up the front end by switching to the directory created by the clone, running

```
npm install
npm run dev
```

and then by going to
localhost:3000 in your browser. The AJAX calls
(1) add an entry to an array of people, where each entry must have
a name and an age; (2) retrieve the array of people, and (3) retrieve a specific
entry for the array of people. To add an entry, the front end sends a post request
to the URI /api/v1/people where
the body of the request is a json document containing the name (a string), and the
age (a number). Both are required, and the age must be non-negative, or a JSON
document with an error message is returned with a 400 result code.
If the entry is created, a JSON document with a
message
saying that "A person entry was added" is returned, along with the index of the
entry just added. To retrieve the array, the
front end does a get request to the URI /api/v1/people, and a JSON document containing
the array is returned. To retrieve a single entry, the front end does a get request to
/api/v1/people/:id , where the :id is the index of the entry to be retrieved. A JSON
document with the entry is returned, unless the index is out of range, in which case
an error message and a 404 result code is returned.

The application does not work at present because the routes for each of these operations
have not been implemented. Implementing them is part of the exercise.

As usual, you need to do an npm install of the packages in the package.json.
This assignment uses some new packages that are used in testing, and these
are installed as dev dependencies:

mocha  
chai  
chai-http  
puppeteer

First, implement the routes for adding a new people entry, retrieving the list of
people entries, and retrieving a single person entry. People entries are stored in
the people array, which starts out empty. They are not persisted. There is no
file i/o or database access in this exercise.

You have to add a line

```
module.exports =  { app, server }
```

To the bottom of your app.js, because each of the test files require these values.

You have to configure puppeteer, which depends on Chrome.
Puppeteer is a headless browser that invokes Chrome. You have to have Chrome installed for Puppeteer to work. To configure Puppeteer,
you need to create a .env file, and you put in it a value like the following:

```
PUPPETEER_EXECUTABLE_PATH="C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"
```

This example is for Windows -- I don't know what it is for the Mac.
Next, look at the test line in the scripts section of your package.json file.
It says:

```
"test": "mocha tests/*.js --exit",
```

This script command invokes mocha, which is one standard framework for JavaScript tests.
Now run npm test from the terminal. It should run a series of tests.
The tests themselves are in
tests/test.js and tests/puppeteer.js. Have a look at those files
You will see that most of the
tests are not implemented -- there is just an invocation of done() (the callback) --
or in the case of the puppeteer tests, there are empty functions.
There are test examples in each
of the files, which show how to do chai and puppeteer testing. Your next task is to complete the
tests -- functions in the files that begin with "it".

The tests.js file tests the back end, by sending REST requests to it.
For example

```
 chai.request(app).post('/api/v1/people');
```

causes a post request to be sent to the app for the URI specified. You can
also do get/put/patch/delete. The send
method specifies the body to be sent (if any), and the end method retrieves the
resulting req and res. In this file, chai is configured to use the "should"
syntax for assertions. So,

```
res.should.have.status(400);
```

means that the result should have result code 400.
And

```
res.body.should.be.eql({ error: 'Please enter a name.' });
```

says that the body of the result should equal the JSON object described.

When you have completed the tests in test.js and verified that they work,
proceed to puppeteer.js.
For these tests, you write code to interact with the browser automatically.
You can fill out fields and press buttons.
You can then check the contents of the HTML document returned. Fields and buttons
are specified using CSS selectors. There are a lot of async calls, and a sleep
function has been provided so that the test waits a little bit for the page
to update.

One tip about mocha test files. Mocha will often complain and throw strange
errors if you do not end JavaScript statements with a semicolon.

When all the tests in test.js and puppeteer.js are completed and working, push your
work to github, create the pull request, and submit your work.
