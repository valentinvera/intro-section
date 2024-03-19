import "./NavBar.js"
import "./HeroMain.js"

class IntroSection extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: "open" })
  }

  connectedCallback() {
    this.render()
  }

  render() {
    this.shadowRoot.innerHTML = `
      <header>
        <nav-bar></nav-bar>
      </header>
      <main>
        <hero-main></hero-main>
      </main>
    `
  }
}

customElements.define("intro-section", IntroSection)
