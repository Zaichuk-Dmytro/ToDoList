'use strict';

import Components from "./components/components.js";
import MainInput from "./components/main-input.js";
import Items from "./components/items.js";
import Footer from "./components/footer.js";

export default class TasksPage extends Components{
  constructor({element}){
    super({element})
    this._arrTasks = JSON.parse(localStorage.getItem('todos') || '[]'),

    this._count = this._arrTasks.length ? Math.max(...this._arrTasks.map(task => task.id )) : 0
    this._lengthActive = document.querySelector('.menuFooter__infoAmountTask')
    this._initMainInput()
    this._initTaskItems()
    this._initFooter()
    this._getLengthActive()
    this.taskItems._show(this._arrTasks)
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

    this.taskItems.subscribe('saveEditTask', (dataArr) => {
      if(dataArr.value) {
        this._arrTasks.map(task => {
          if(task.id == dataArr.id) {
            task.value = dataArr.value
          }
          
        })
      } else {
        this._arrTasks = this._arrTasks.filter(task => task.id != dataArr.id)
      }
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
      this.taskItems._status('ALL')
      this._removeClassActive()
      document.querySelector('.buttonAll').classList.add('active')

      this.taskItems._render()

    })

    this.footer.subscribe('clickActive', () => {
      this.taskItems._status('ACTIVE')
      this._removeClassActive()
      document.querySelector('.buttonActive').classList.add('active')
      this.taskItems._render()
    })

    this.footer.subscribe('clickCompleted', () => {
      this.taskItems._status('COMPLETED')
      this._removeClassActive()
      document.querySelector('.buttonCompleted').classList.add('active')
      this.taskItems._render()
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

  _removeClassActive() {
      [...document.querySelectorAll('.filterBtn')].map(task => task.classList.remove('active'))
    }
  _getToDoId(){
    return ++this._count
  }
}