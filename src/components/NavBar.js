class NavBar extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: "open" })
  }

  static get styles() {
    return `
      .nav {
        width: 90%;
        max-width: 90rem;
        height: 4.375rem;
        margin-inline: auto;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: fixed;
        inset: 0;
        z-index: 1000;
      }

      .nav__bg {
        position: fixed;
        left: 0;
        width: 100%;
        height: 4.375rem;
        z-index: -1; 
        transition: background-color .3s ease-in-out;
      }

      .nav__scroll .nav__bg {
        background-color: var(--almost-white);
      }

      .nav__img {
        margin: 0;
      }
    
      .nav__hamburger {
        width: 1.875rem;
        height: 50%;
        background: url("assets/icon-menu.svg") no-repeat center;
        cursor: pointer;
        z-index: 100;
        transition: background .3s ease-in-out;
      }
    
      .nav__hamburger--open {
        background: url("assets/icon-close-menu.svg") no-repeat center;
      }
    
      .nav__overlay {
        background-color: #000000a7;
        position: fixed;
        inset: 0;
        opacity: 0;
        pointer-events: none;
        transition: opacity .3s  ease-in-out;
      }
    
      .nav__overlay--show {
        opacity: 1;
        pointer-events: unset;
      }
    
      .nav__menu {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        background-color: #fff;
        width: 65%;
        max-width: 25rem;
        padding: 4.375rem 0;
        list-style: none;
        overflow: auto;
        margin: 0;
      }
     
      .nav__item {
        color: var(--medium-gray);
        width: 80%;
        margin-inline: auto;
        cursor: pointer;
        padding-block: .80rem;
      }

      .nav__item:has(.nav__parent) {
        padding: 0;
      }

      .nav__inner {
        padding: 0;
        margin-left: 1.5rem;
        display: grid;
        overflow: hidden;
        height: 0;
        transition: height .4s ease-in-out;
      }
    
      .nav__dropdown {
        margin-block: .75rem;
      }

      .nav__illustration {
        width: 1rem;
        height: 1rem;
      }

      .nav__parent {
        border: none;
        background: none;
        font-family: inherit;
        color: var(--medium-gray);
        font-size: 1rem;
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-block: .80rem;
        cursor: pointer;
        padding-left: 0;
      }

      figure {
        margin: 0;
      }

      .nav__link {
        text-decoration: none;
        color: var(--medium-gray);
        display: flex;
        gap: 1rem;
      }

      .nav__login {
        text-align: center;
        margin-top: 2.25rem;
      }

      .nav__login a,
      .nav__sign a {
        text-decoration: none;
        color: var(--medium-gray);
      }
    
      .nav__sign {
        text-align: center;
        margin: 1.25rem 1.5rem 0;
        padding: .75rem 1rem;
        border: .063rem solid var(--almost-black);
        border-radius: .875rem;
      }

      .nav__inner--show {
        opacity: 1;
        pointer-events: unset;
      }

      .nav__arrow--rotate {
        transform: rotate(180deg);
        transition: transform .3s ease-in-out;
      }

      @media screen and (width >= 56.25rem) {
        .nav {
          width: 93.5%;
          gap: 4rem;
          overflow: visible;
          padding-top: .938rem;
        }

        .nav__bg {
          top: 0;
          height: 5.75rem;
        }
  
        .nav__hamburger {
          display: none;
        }
    
        .nav__overlay {
          position: unset;
          background-color: transparent;
          opacity: 1;
          pointer-events: unset;
          flex: 1;
        }
    
        .nav__menu {
          position: unset;
          width: 100%;
          max-width: unset;
          background-color: unset;
          padding: 0;
          overflow: unset;
          display: flex;
          align-items: center;
          gap: 2.25rem;
        }
    
        .nav__item {
          width: max-content;
          margin: 0;
          padding: 0;
          position: relative;
        }
    
        .nav__parent {
          gap: .40rem;
        }

        .nav__inner {
          list-style: none;
          position: absolute;
          left: 0;
          width: max-content;
          height: auto;
          padding: .75rem 1.65rem;
          background-color: #fff;
          z-index: 100;
          border-radius: .625rem;
          box-shadow: 0 0 .625rem 0 rgba(0, 0, 0, .5);
          opacity: 0;
          transition: opacity .3s;
          pointer-events: none;
          display: block;
        }

        .nav__inner--first {
          margin-left: -5.25rem; 
        }

        .nav__inner--second {
          margin-left: 0rem; 
        }

        .nav__illustration {
          width: 1rem;
          height: 1rem;
        }

        .nav__inner--show {
          opacity: 1;
          pointer-events: unset;
        }
      
        .nav__login {
          margin-top: 0;
          margin-left: auto;
        }
  
        .nav__sign {
          margin-inline: 0;
          padding: .75rem 1.25rem;
          margin-top: 0;
        }

        .nav__login a:hover,
        .nav__sign a:hover,
        .nav__parent:hover,
        .nav__link:hover {
          color: var(--almost-black);
        }
      }
    `
  }

  connectedCallback() {
    this.render()
    this.menuHamburger()
    this.changeBackgroundOnScroll()
  }

  menuHamburger() {
    const hamburgerIcon = this.shadowRoot.querySelector(".nav__hamburger")
    const navOverlay = this.shadowRoot.querySelector(".nav__overlay")
    let currentDropdown = null

    hamburgerIcon.addEventListener("click", () => {
      hamburgerIcon.classList.toggle("nav__hamburger--open")
      navOverlay.classList.toggle("nav__overlay--show")
      closeDropdown(currentDropdown)
      currentDropdown = null
    })

    navOverlay.addEventListener("click", e => {
      e.preventDefault()
      const currentElement = e.target
      if (window.innerWidth > 900) {
        if (isActive(currentElement, "nav__parent")) {
          const subMenu = currentElement.nextElementSibling
          const arrowIcon = currentElement.querySelector(".nav__arrow")
          if (!isActive(subMenu, "nav__inner--show")) {
            closeDropdown(currentDropdown)
            subMenu.classList.add("nav__inner--show")
            arrowIcon.classList.add("nav__arrow--rotate")
            currentDropdown = subMenu
          } else {
            subMenu.classList.remove("nav__inner--show")
            arrowIcon.classList.remove("nav__arrow--rotate")
            currentDropdown = null
          }
        }
      }

      if (window.innerWidth < 900) {
        if (isActive(currentElement, "nav__parent")) {
          const subMenu = currentElement.nextElementSibling
          const arrowIcon = currentElement.querySelector(".nav__arrow")
          const height = subMenu.clientHeight === 0 ? subMenu.scrollHeight : 0
          subMenu.style.height = `${height}px`
          if (!isActive(subMenu, "nav__inner--show")) {
            arrowIcon.classList.toggle("nav__arrow--rotate")
          }
        }
      }
    })

    function isActive(element, string) {
      return element.classList.value.includes(string)
    }

    function closeDropdown(currentDropdown) {
      if (currentDropdown !== null && isActive(currentDropdown, "nav__inner--show")) {
        currentDropdown.classList.remove("nav__inner--show")
        const parentButton = currentDropdown.previousElementSibling
        const arrowIcon = parentButton.querySelector(".nav__arrow")
        arrowIcon.classList.remove("nav__arrow--rotate")
      }
    }

    window.addEventListener("resize", () => {
      closeDropdown(currentDropdown)
      if (window.innerWidth < 900) {
        const navInners = document.querySelectorAll(".nav__inner")
        navInners.forEach(navInner => {
          navInner.style.height = ""
        })
      }
    })
  }

  changeBackgroundOnScroll() {
    window.addEventListener("scroll", () => {
      const navElement = this.shadowRoot.querySelector("nav")

      if (window.scrollY > 15) {
        navElement.classList.add("nav__scroll")
      } else {
        navElement.classList.remove("nav__scroll")
      }
    })
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>${NavBar.styles}</style>
      <nav class="nav">
        <div class="nav__bg"></div>
        <a href="#">
          <figure class="nav__img">
            <img src="assets/logo.svg">
          </figure>
        </a>

        <div class="nav__hamburger"></div>

        <div class="nav__overlay">
          <ul class="nav__menu">

            <li class="nav__item">

              <button class="nav__parent" checked>
                Features
                <figure>
                  <img src="assets/icon-arrow-down.svg" class="nav__arrow">            
                </figure>
              </button>

              <ul class="nav__inner nav__inner--first">

                <li class="nav__dropdown">
                  <a href="#" class="nav__link">
                    <figure>
                      <img src="assets/icon-todo.svg" class="nav__illustration">
                    </figure>
                    Todo List
                  </a>
                </li>

                <li class="nav__dropdown">
                  <a href="#" class="nav__link">
                    <figure>
                      <img src="assets/icon-calendar.svg" class="nav__illustration">
                    </figure>
                    Calendar
                  </a>
                </li>

                <li class="nav__dropdown">
                  <a href="#" class="nav__link">
                    <figure>
                      <img src="assets/icon-reminders.svg" class="nav__illustration">
                    </figure>
                    Reminders
                  </a>
                </li>

                <li class="nav__dropdown">
                  <a href="#" class="nav__link">
                    <figure>
                      <img src="assets/icon-planning.svg" class="nav__illustration">
                    </figure>
                    Planning
                  </a>
                </li>

              </ul>

            </li>

            <li class="nav__item">

              <button class="nav__parent">
                Company
                <figure>
                  <img src="assets/icon-arrow-down.svg" class="nav__arrow">            
                </figure>
              </button>

              <ul class="nav__inner nav__inner--second">

                <li class="nav__dropdown">
                  <a href="#" class="nav__link">History</a>
                </li>

                <li class="nav__dropdown">
                  <a href="#" class="nav__link">Our Team</a>
                </li>

                <li class="nav__dropdown">
                  <a href="#" class="nav__link">Blog</a>
                </li>

              </ul>

            </li>

            <li class="nav__item">
              <a href="#" class="nav__link">Careers</a>
            </li>

            <li class="nav__item">
              <a href="#" class="nav__link">About</a>
            </li>

            <li class="nav__login">
              <a href="#">Login</a>
            </li>

            <li class="nav__sign">
              <a href="#">Register</a>
            </li>

          </ul>
        </div>
      </nav>
    `
  }
}

customElements.define("nav-bar", NavBar)
