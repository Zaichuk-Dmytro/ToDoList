'use strict';

import Components from "./components.js";

export default class MainInput extends Components {
  constructor({element}) {
    super({element})
    
    this.on('keydown', '[data-element="toDoInput"]', (event) => {
      if (event.code == 'Enter') {
        this.emit('addTask', event.target.value)
        event.target.value = '';
      }
    })
    
    this.on('click', '[data-element="toDo__label"]', (event) => {
      this.emit('selectedAll')
    })
  }

  

  
}