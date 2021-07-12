'use strict';
import Components from "./components.js";

export default class Footer extends Components {
  constructor({ element, arr }){
    super({element})
    this._arrTasks = arr

    this.on('click', '[data-element="buttonClear"]', () => {
      this.emit('clickClear')
    })




    
  }
  
    
  
}
 