# Quideo: CS 1371 Learning Bank

Quideo is the next-generation learning bank for CS 1371 students. It features integrated video and question banks, as well as intelligent serving of resources.

Quideo is the project that aims to implement this ideal. We want students to find it:

* Effective
* Useful
* Intuitive

## Toolsets

Quideo is build on React 16.0.1. This makes building, testing, and deployment simple. This also means `node.js` is a required tool.

## Building

To build a development build, simply open up a terminal to the base folder, and type:

> `npm start run`

This will start a development server on port 3000 (the default), and will automatically run the webpage in your browser of choice.

Making changes to the source will automatically restart the development server.

## Testing

To run a production build, simply open up a terminal at the base folder, and type:

> `npm start build`

This will create a new folder called `build` in the base directory. To test the app, simply open `build/index.html` to see the results.

## Deployment

Deployment to production will ideally be handled via an automated system that will automatically build, test, and upload necessary files.
