# Documentation
**Technical assignment front-end engineer**

**Author: Laszlo Szalai**

## How To Run
In a command prompt:
```bash
npm i
npm i json-server -g
json-server db/db.json
```
```bash
npm start
```
(You'll need to open another command prompt to run the last line.)

*AFTER FIRST REVIEW*

## Directions
This is the documentation for my code refactoring. The original documentation starts at the title "User's Manual" below.

## Applying reviewers' suggestions

**Reuse code, don't repeat**

The moveTo function handles both left and right movement.

**Rethinking the "statuses"**

Articles in the database have a status variable and an index. The index shows their vertical position in the column. That is to maintain persistence after page refresh, to avoid user confusion. When a ticket is moved or added, we need to know what is the last index in the column and increment it. Once a ticket is moved or deleted, an index will be missing but it only matters to be "sorted by" index, a cleanup doesn't seem necessary. 

**Store**

Redux vs Dva: dva works well with umi and it was initially included.
The "users" and "articles" state variables are managed globally, using the "dva" package to create a store and reducers.
These variables are needed in both pages: Dashboard and Articles.
The store performs the corresponding side effects to load data through APIs.

Articles will consume the store data, but if the article is opened from a shared link, the empty store will cause the APIs to be called.
In case of add, we need the whole kanban structure, to know what will be the index of the new article. The kanban structure is loaded already because we are on dashboard. 
In case of view, we need the data of the very article. It is likely that the dashboard page was loaded before, and we already have the kanban structure, so we select the article with the given id. We do this instead of calling getArticle/id. So a getArticles Api call is only needed if this is a shared link.

In Dashboard, loadArticles() holds the code for  populating the kanban, so it can be called both  initially and after moveTo, delete or edit.

**Form**
For the form in Articles, I used the Form component from Ant Design.
- It doesn't need state variables because Form controls its values by useForm.
- Extra features are: counter and autoSize for textarea.
- "antd" has been already included in the create-react-app package collection.
I still have a "type" state variable, to display an "icon" for the article type. 
For initialValues to work, the Form needs to be created when the values are already loaded. At cancel, form.resetFields() is called.

**Validation**
- I perform a validation to reject too short Titles and to demand all fields to be filled in.
- Validates when "add" or "edit" is performed. 

**Composable Components**

To make it slightly more composable, I extracted the content of Ticket to TicketContent. Then I was able to write a separate test for the latter. 
Renaming ArticleComponent to ArticleContent aims to follow a naming pattern and to avoid using the word "component" redundantly. 

**Packages**

Packages that I installed are, one to copy to clipboard as suggested by a code reviewer, and one provides useStateIfMounted, for states that change after Api calls or setTimeouts.

**Test** 
I only added a few simple tests, so this is just a beginning, far from being complete. They can be run by:
```bash
npm test
```

**Lint**

Eslint runs for all javascript and css files.
```bash
npm test lint 
```

## "User's Manual"
You work for a Travel Magazine and this Kanban will help you manage the tasks of the team.
A reporter creates a ticket for the assignee. Then the assignee takes this task and fulfills it by writing the article. 
The tickets are articles that can come to existence as an idea in the Todo column.
Once the assignee starts writing, he/she should move it to the In Progress column.
If it's ready to be published, it should be moved to the Completed column.
Hover on the ticket to see the moving arrows.
Click on a ticket to open it in a new page where you see more details and you can edit or delete it.

## Development
**Packages**

The collection of packages that get installed from package.json are based on what the create-umi package uses. This gave me a good scaffolding to start the project, because it includes webpack, routing, the Link component, history object, and the 404 page. 

**Fake api**

I installed the json-server package globally. The utils/myRequest.js file uses umi-request's "request" function for api calls. The services.js file defines all api call functions, and I import the ones I need into each react component.

**Hooks**

I use useState for all state variables. Due to the small size of the project, store and reducers were not necessary.
Another hook is useEffect. I frequently use it to intercept changes to props or state and take some action. Most often this replaces the old school componentWillReceiveProps life cycle function.

**Dashboard**

In Dashboard/index.js the following is executed :

Initially we get the users and the articles from the server.
Users are the employees who can be chosen as reporter and/or assignee.

There is a useEffect dependent on articles. The function within is also called initially when there are no articles, so I make sure that there are, and only then I call loadData. In this way I can have a loadData function to call also later to refresh all columns. This function uses the articles state variable, which needs to be loaded already.

The getStatuses api call just tells us which article ID belongs to which column. Each column is represented by an array of id's, and the three columns are wrapped in an enclosing array. After receiving this structure, we match it with the articles array, and we get "data", which is similar to statuses but it contains articles instead of id's. I also save the statuses as state, to be used when tickets are moved. 

The Ticket component represents an article.
It receives the id as key, to make sure react can handle to render such changes like moving a ticket. 

**Article**

The ArticleComponent is reused for these cases:
- Add
- View
- Edit

To show the add article window, ArticleComponent is wrapped into the AddArticle component to be displayed inside a PopupModal. This has {action: "add"}, so some buttons have texts and functions specific to the 'Add' process.
For an existing article, the Article/index.js page is used, containing the ArticleComponent. It has id and {action: "view"} and it calls getStatuses first, which is needed when an article is deleted.

For sharing a link to the ticket, there is a Copy Link button on the Article page.

**Choices**

The move arrows that the Tickets have on the Dashboard, were a quick alternative to a drag/drop solution, but it can also provide a good user experience by the simple and reliable behaviour.

The add article form is not exactly a magnified Ticket from the dashboard page, but it is not very different from it. In this way it is close to a what-you-see-is-what-you-get display, but still has labels to guide the user while filling in.

The ValueInput reusable component can help to encapsulate an inner state that updates the parent component only when enter or blur occurs. So we get a fully controlled input, it displays a state, but the state only reaches the form when typing is completed.

In css I used the grid layout for ticket columns, which is better than a flex layout, in setting the gap size and equal columns width, making the app responsive.

**Future tasks**

A real project would require additional work, which I haven't dealt with, to reduce the amount of time invested:
Tests, form validation, input sanitization, timestamps, success messages, spinner while loading, more customisation, login etc.
