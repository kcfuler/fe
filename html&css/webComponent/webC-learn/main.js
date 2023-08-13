import './style.css'

class MyElement extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = '<p>My Element</p>'
  }
}

customElements.define('my-element', MyElement)
