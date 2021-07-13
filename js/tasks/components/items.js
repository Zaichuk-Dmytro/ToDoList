'use strict';
import Components from "./components.js";

export default class Items extends Components {
  constructor({element}){
    super({element})
    this._arrTasks = []

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
  
  
  _render(){
    // this._getLengthActive()
    this._showHiddenElement()
    this._showButtonClear()
    this._element.innerHTML = `
    ${this._arrTasks.map(task => `
      <li class="todosList__item ${ task.selected ? 'selected' : ''}" id="${task.id}" ">
        <div class="todosList__input"></div>
        <div class="todosList__item__task">${task.value}</div>
        <div class="todos__buttonClear"><div>
      </li>`).join('')}`
    
    
    
  }
}