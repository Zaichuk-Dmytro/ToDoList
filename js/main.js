'use strict';
 import TasksPage from "./tasks/tasks-page.js";


 let tasksPage = new TasksPage({
   element: document.querySelector('[data-component="todosList"]'),
 })