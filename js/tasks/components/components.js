'use strict';

export default class Components {
  constructor({element}) {
    this._element = element
    this._callbackMap = {}
    
  }

  on(eventName, selector, callback) {
    this._element.addEventListener(eventName, (event) => {
      let delegaterTarget = event.target.closest(selector);
      if(!delegaterTarget) {
        return;
      }
      callback(event)
    })
  }

  emit(eventName, data) {
    if(!this._callbackMap[eventName]) {
      return
    }
    this._callbackMap[eventName].forEach(ell => ell(data))
  }

  subscribe(eventName, callback) {
    if (!this._callbackMap[eventName]) {
      this._callbackMap[eventName] = [];
    }
    this._callbackMap[eventName].push(callback);
  }

}