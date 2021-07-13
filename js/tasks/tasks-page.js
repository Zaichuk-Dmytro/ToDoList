'use strict';

import Components from "./components/components.js";
import MainInput from "./components/main-input.js";
import Items from "./components/items.js";
import Footer from "./components/footer.js";

export default class TasksPage extends Components{
  constructor({element}){
    super({element})
    this._arrTasks = [],

    this._count = 0;
    this._lengthActive = document.querySelector('.menuFooter__infoAmountTask')
    this._initMainInput()
    this._initTaskItems()
    this._initFooter()
    
    
  }

  _initMainInput() {
    this.input = new MainInput({
      element: document.querySelector('[data-element="addToDo"]')
    })

    this.input.subscribe('addTask', (eventData) => {
      if (!eventData) {
        return
      }
      this._arrTasks.push({
        id: this._getToDoId(),
        value: eventData,
        selected: false,
      });
      this._getLengthActive()
      this.taskItems._show(this._arrTasks)
    })

    this.input.subscribe('selectedAll', () => {
      let selected = document.querySelectorAll('.todosList__item.selected'),
        allSelected = selected.length == this._arrTasks.length

      this._arrTasks.map((tasks) => {
        tasks.selected = !allSelected
      })
      this._getLengthActive()
      this.taskItems._render()
    })
    
  }
  
  _initTaskItems() {
    this.taskItems = new Items ({
       element:  document.querySelector('[data-component="todosList"]'),
    })

    this.taskItems.subscribe('clickTaskInput', (dataEventId) => {
     this._arrTasks.find(task => {
      if(task.id == dataEventId){
        task.selected = !task.selected
      }
     })
     this._getLengthActive()
     this.taskItems._render()
    })

    this.taskItems.subscribe('clickButClear', (dataEventId) => {
      this._arrTasks = this._arrTasks.filter(task => task.id != dataEventId)
      this._getLengthActive()
      this.taskItems._show(this._arrTasks)
    })
  }

  _initFooter() {
    this.footer = new Footer({
      element: document.querySelector('[data-component="todosFooter"]'),
      arr: this._arrTasks
    })

    this.footer.subscribe('clickClear', () => {
     this._arrTasks = this._arrTasks.filter(task => !task.selected )
     this.taskItems._show(this._arrTasks)
    })

    this.footer.subscribe('clickAll', () => {
     
    })

    this.footer.subscribe('clickActive', () => {
      
    })

    this.footer.subscribe('clickCompleted', () => {
      
    })
  }

  _getLengthActive() {
    this._length =  this._arrTasks.filter(task => task.selected == false).length
    if (this._length == '1') {
      this._lengthActive.innerHTML = `${this._length} item left`
    } else {
      this._lengthActive.innerHTML = `${this._length} items left`
    }
  }

  _getToDoId(){
    return this._count++
  }
}