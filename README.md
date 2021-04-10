# online-complier
An online complier and editor for programming languages.

### Supported Languages

* Javascript
* C++
* Haskell
* JSON (editor only)
* CSS (editor only)
* HTML (editor only)
* Markdown (editor only)

<br>

### System Requirements
<hr>

- #### Docker (version 20.10.5) (_TODO:_ Test other versions)
- #### docker-compose (version 1.28.0 or higher)

<br>

### Running
<hr>

```
docker-compose up
```
<br>

### Testing(End-2-End)
<hr>

```
docker-compose --profile test up --abort-on-container-exit
```
<br>

## About the implementation

- ### React
  The front-end of the app is a simple [react-bootstrap](https://react-bootstrap.github.io/) layout with a [react-codeMirror](https://uiwjs.github.io/react-codemirror/) editor. <br>
  The app was created using [create-react-app](https://create-react-app.dev/docs/getting-started/).

- ### Express
  On the back-end, there is a single _"view"_ express api that executes the requested code __(POST)__ or informs the current supported language modes for the editor/compiler __(GET)__.

- ### Docker
  The whole app is shipped with docker in two containers (__client__ and __api__). <br>
  The client container is based on a simple [node image](https://hub.docker.com/_/node). <br>
  The api container is based on a [node image](https://hub.docker.com/_/node), but, additionally, installs the needed compilers and interpreters. <br>
  Both containers are composed in [docker-compose.yml](https://github.com/PedroASA/online-complier/blob/main/docker-compose.yml), so that they run simultaneously and can communicate with each other. 

- ### Testing
  * #### Jest
    Since the front-end was created with __cra__. __Jest__ was used for unit testing it. <br> 
    The unit test files are simple scripts that assert that the basic functionalities of each component work as expected. <br>
    They are run via ` npm test `.
    
  * #### Cypress
    As suggested in the [cra documentation](https://create-react-app.dev/docs/running-tests), __Cypress__ was used for end-to-end testing. <br>
    The __Cypress__ tests serve to ensure that whole app works as expected, i.e, the api (_so far untested_) works fine and the client and server side are well connected. <br>
    Since the tests require a full working app, they must be executed in a docker enviroment. For this, a test container was setup in [docker-compose.yml](https://github.com/PedroASA/online-complier/blob/main/docker-compose.yml). <br> 
    This container is based on a [cypress image](https://hub.docker.com/r/cypress/included) and has the _'test'_ profile so that it is only executed when requested.
    It is run via ` docker-compose --profile test up --abort-on-container-exit `.

- ### CI
  To continuosly integrate the app, two actions are executed on push and on pull-request to the main branch. <br>
  The [first](https://github.com/PedroASA/online-complier/blob/main/.github/workflows/node.js.yml) runs the front-end unit tests on a node enviroment. <br>
  The [second](https://github.com/PedroASA/online-complier/blob/main/.github/workflows/docker-test.yml) runs the end-to-end tests on docker enviroment. 

