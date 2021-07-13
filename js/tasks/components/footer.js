'use strict';
import Components from "./components.js";

export default class Footer extends Components {
  constructor({ element, arr }){
    super({element})
    this._arrTasks = arr

    this.on('click', '[data-element="buttonClear"]', () => {
      this.emit('clickClear')
    })

    this.on('click', '[data-element="buttonAll"]', () => {
      this.emit('clickAll')
    })

    this.on('click', '[data-element="buttonActive"]', () => {
      this.emit('clickActive')
    })

    this.on('click', '[data-element="buttonCompleted"]', () => {
      this.emit('clickCompleted')
    })


    
  }
  
    
  
}
 