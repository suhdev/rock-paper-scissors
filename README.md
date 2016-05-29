#Rock Paper Scissors 

##How to use this code
1. To run local server use the following commands [the installation steps are only required if there is a need to recompile the code]. Internally, the script will run python -m SimpleHTTPServer on the "dist" directory.  
```bash 
    $ cd application-dir
    [application-dir]$ npm install 
    [application-dir]$ jspm install 
    [application-dir]$ npm start  
```
This will start a local server listening on the port 8000. [http://localhost:8000] 
2. To execute unit tests and test coverage. The command internally runs jest --coverage followed by jest to run the unit tests  
```bash
    $ cd application-dir
    [application-dir]$ npm test 
```

##Folder Structure
1. dist: contains the final distributable code including all CSS, JavaScript, images, and HTML files.  
    * css: stylesheets 
    * scripts: JavaScript files. 
    * img: image assets
    * index.html: the final HTML file. 
2. src: contains the source code files written in TypeScript. 
    * controllers: contains controller ReactJS components. Each of these components has its own action space, state space, and reducer in the application.  
    * ui: stateless components that serve as the building blocks of the application. 
    * services: components that deal with third-party APIs, business logic, etc. 
    * contants.tsx: includes global constants used across the different components of the application. 
    * main.tsx: a file that serves as the entry point of the application and mainly responsible for bootstrapping the application.
3. \__tests__: contains all unit tests [written in ES6], the tests use Facebook's "jest" testing framework.  
4. typings: TypeScript type definionts, includes: jquery, immutable, react, ands strikejs. 
5. gulpfile.js: Task definitions for gulp task runner. 
6. config.rb: "compass" configuration file
7. tsconfig.json: TypeScript configurations file. Currently set to export ES6-complaint JavaScript code using ES6 modules. 
8. config.js: JSPM configuration file. JSPM is a package manager utility with great support for compiling and packaging JavaScript code that uses ES6. The package manager uses Babel to compile ES6 code.
9. package.json: npm configuration file. 

##JavaScript Dependencies
1. ReactJS
2. Immutable [this is mainly used to improve performance through immutability as it makes easier to test for state changes within the application without performing deep comparisons].
3. StrikeJS [a library that serves as a general purpose ReactJS application framework, it follows similar architecture to the one followed by Redux, however it adds features like dependecy injection, integer-based action types, service middlewares, etc]. The source code can be found on [https://www.npmjs.com/package/strikejs]. 

##JavaScript Development Dependencies 
1. Typescript 1.8
2. JSPM: a JavaScript package manager with great support for ES6 and integration with Babel. Internally uses SystemJS to manage code dependencies. 
3. jest: Facebook unit-testing framework with great support for ES6 unit tests as well as great support on testing ReactJS applications.   


##Conventions 
1. CSS 
    * ID selectors should be capitalised and must match the component name.  
    * Class selectors should be lowercase and hyphenated [for multi-word selectors]. 
    * Partials file names should be lowercase with no hyphenation. 
    * SASS Mixins and functions should follow similar naming strategy as with ID selectors, i.e. capitalised. 
    * Framework styles i.e. [general purpose component styles] should be namespaced with [of-] which stands for oasis framework https://github.com/suhdev/oasis-framework. 
2. JavaScript [TypeScript] 
    * File names should match component names. Except with controller components as the component name must be appended with "Ctrl". 
    * Controller components are contained in their own folders. Each controller component folder should contain: 
        * Actions.ts: includes definitions of the actions that can happen within that controller. 
        * Reducer.ts: includes a single Reducer function that receives the current state of the controller component, and the action that has been dispatched by the application store. The reducer function returns the new state.
        * StateAndProps.ts: includes definitions for the the controller components states and props as interfaces [mainly to help with code completion, and static type checking]. The file also includes two constants, the [STATE_KEY] which is a string defining the key used in the application state, the other is the initial state of the controller component [this helps with ensuring that the application is bootstrapped at specific state].
        * [.tsx] file: this file includes the ReactJS component definition of the controller component. 
      Note: if the controller relies on some components that are specific to this controller, these components are created within the folder of the specific controller to keep things clean.    
    * UI components should be stateless, and in case they need to have state, it should be for the sake of style changes rather than actual application states. 
    * Method names should be in camel case. 