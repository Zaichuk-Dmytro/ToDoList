'use strict';
import Components from "./components.js";

export default class Items extends Components {
  constructor({element}){
    super({element})
    this._arrTasks = []

    this._statusFiltred = 'ALL';
    
    this.buttonClear = document.querySelector('.buttonClear')
    this.countActiveTask = document.querySelector('.menuFooter__infoAmountTask')
    this.keyboardIcon = document.querySelector('.addToDo__label');
    this.todosFooter = document.querySelector('.todosFooter');

    this.on('click', '.todosList__input', (event) => {
      let dataEventId = event.target.closest('.todosList__item').getAttribute('id')
      this.emit('clickTaskInput', dataEventId)
    })
    this.on('click', '.todos__buttonClear', (event) => {
      let dataEventId = event.target.closest('.todosList__item').getAttribute('id')
      this.emit('clickButClear', dataEventId)
    })
  }

  _show(arrTasks){
    this._arrTasks = arrTasks;
    this._render()
  }

  _showButtonClear() {
    let selected = this._arrTasks.find(task => task.selected)
    if(selected) {
      this.buttonClear.style.visibility = 'visible'
    } else {
      this.buttonClear.style.visibility = 'hidden'
    }
  }

  _showHiddenElement() {
    if(this._arrTasks.length > 0) {
      this.keyboardIcon.style.visibility = 'visible'
      this.todosFooter.style.display = 'block';   
    } else {
      this.keyboardIcon.style.visibility = 'hidden'
      this.todosFooter.style.display = 'none';  
    }
  }

  _status(dataStatus) {
    this._statusFiltred = dataStatus || 'ALL'
    if (this._statusFiltred == 'ACTIVE') {
     return this._cloneArrTasks = this._arrTasks.filter(task => task.selected == false)
      console.log(this._cloneArrTasks)
    } else if (this._statusFiltred == 'COMPLETED') {
     return this._cloneArrTasks = this._arrTasks.filter(task => task.selected == true)
    } else {
     return this._cloneArrTasks = this._arrTasks;
    }
    
  }
  
  _render(){
    this._status(this._statusFiltred)
    this._showHiddenElement()
    this._showButtonClear()
    this._element.innerHTML = `
    ${this._cloneArrTasks.map(task => `
      <li class="todosList__item ${ task.selected ? 'selected' : ''}" id="${task.id}" ">
        <div class="todosList__input"></div>
        <div class="todosList__item__task">${task.value}</div>
        <div class="todos__buttonClear"><div>
      </li>`).join('')}`
    
    
    
  }
}