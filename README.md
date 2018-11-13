# Car Search Form Filter

a simple form with binding feature used for searching for cars

## Architecture
- frontend: React.js
    - its pretty useful to utilize the states and the component lifecycle that React provides in order to update the information of the fields in this example
        - used a stateful component ( CarsFormFilter ) to fetch the data and handle user's input using the local state of the component and wrap other stateless components
        - used two stateless components to output the HTML needed for the select and input fields

- Backend: Node.js, express
    - a very lightweight setup for a microservice such as serving data for the car brands and filtering their models
        - [GET] /api/car/brands
            - fetches all available car brands
        - [GET] /api/car/models
            - fetches all available car models
        - [GET] /api/car/models/{brand_id}  
            - fetches all models for a specific brand


## Low-Level Data Flow Explanation for Frontend 
**page load**
1. initial state includes empty 'models' and 'brands' data
2. component checks if local state doesnt have brands data
    - if it doesnt, it fetches them from /api/car/brands
    - if it does, noop ( future proof, this will serve its purpose flawlessly if server side rendering was introduced, and its better to have such checks and not presume that they are empty and blindly fetch data )
3. component checks if local state doesn't have models data
    - same as 2 but for models
4. component has all car brands and models loaded into state
5. state change triggers the component to re-render
6. component renders with new the data in the new state 

**user interaction**
- user selects a brand
    1. change of brand id in the state triggers lifecycle hook ComponentDidUpdate
    2. store the selected brand id in the local state of the component
    3. ComponentDidUpdate checks for a change in brand_id
    4. an API call to /api/car/models/{brand_id} is triggered
    5. once the promise is satisfied, the local state is updated with those models
    6. this triggers the component to re-render cause of a state update ( models were updated )
    7. new models will be relected into its select dropdown box that will be rendered using the stateless component SelectField

- user selects "all brands"
    1. change of brand id in the state triggers lifecycle hook ComponentDidUpdate
    2. store the selected brand id ( empty string ) in the local state of the component 
    3. ComponentDidUpdate checks for a change in brand_id
    4. an API call to /api/car/models is triggered ( cause we have no brand id, the user selected the empty option )
    5. once the promise is satisfied, the local state is updated with those models
    6. this triggers the component to re-render cause of a state update ( models were updated )
    7. new models will be relected into its select dropdown box that will be rendered using the stateless component SelectField

## Testability
Made sure to split the concerns and the functionalities of each area of the system so that each unit can be tested by itself
- reusable form fields components ( TextField and SelectField )
- API service layer that can be reusable by other components


## Usage
- Backend:
    - run 'npm start' inside the 'api' directory
- Frontend:
    - run 'npm install' first to install the dependencies
    - run 'npm start' inside the 'code' directory
