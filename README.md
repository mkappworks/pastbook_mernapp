# React Frontend for a Image Gallery App

A client side react web app for a simple image gallery with authenticated login. It consists of a React.js webapp (this repository)

---

## Requirements

For development, you will only need Node.js and a node global package, npm, installed in your environement.

### Node

- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
  Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v8.11.3

    $ npm --version
    6.1.0

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g

---

## Install

    $ git clone https://github.com/mkappworks/pastbook_mernapp.git
    $ cd pastbook_mernapp
    $ npm install

## Running the project in dev mode

    $ npm run dev

## Running the project

    $ npm run start

## Simple build for production

    $ npm run build

## Environment Variables

Add a .env file in the root directory and set the following environment variables:

    $ REACT_APP_BACKEND_URL : url of the backend server

    $ REACT_APP_PASSWORD_PASSPHRASE : password passphrase used to encrypt register or login password from the client side when forwarding it to the server. It should be identical to the one used in the server side

## Project Structure

The folder structure of this app is explained below:

| Name               | Description                                              |
| ------------------ | -------------------------------------------------------- |
| **node_modules**   | Contains all npm dependencies                            |
| **src**            | Contains source code that will be compiled               |
| **src/components** | Contains all the UI elements                             |
| **src/helper**     | Contains all the service and local util helper functions |
| **src/pages**      | Contain pages corresponding to all the Routes in App.js  |
| **src/store**      | Contains the redux store and related slices              |
| **package.json**   | Contains npm dependencies as well as [build scripts]     |