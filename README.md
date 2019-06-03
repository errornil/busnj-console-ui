# BusNJ Console UI

[![Build Status](https://ci.chuhlomin.com/api/badges/chuhlomin/busnj-console-ui/status.svg)](https://ci.chuhlomin.com/chuhlomin/busnj-console-ui)

### Project setup on a local machine

#### Quickstart

```
make install
make run
```

#### Prerequisites
1. Node v. 8.11.3 or later version 
2. `npm` to manage `node_modules` dependencies.
3. Git

#### Getting Started
1. Clone this repository to your computer:
   * using ssh key: `git clone git@github.com:chuhlomin/busnj-console-ui.git`
   * using https: `git clone https://github.com/chuhlomin/busnj-console-ui.git`

2. Open terminal from inside the root folder where you cloned the project to install all the dependecies:
   * `npm install`

#### Starting the app in development mode:
`npm start`

Works "best" behind [busnj-console](https://github.com/chuhlomin/busnj-console) server.
Follow server instructions, then open [http://localhost:6001](http://localhost:6001).

#### Production build
`npm run build`. It will create `dist` folder.

#### Tests
* to run tests: `npm test`
