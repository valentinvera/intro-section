class HeroMain extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: "open" })
  }

  static get styles() {
    return `
      .main__flex {
        display: flex;
        flex-direction: column;
        padding-top: 5rem;
      }
    
      .main__article {
        text-align: center;
      }
    
      .main__title {
        color: var(--almost-black);
        font-size: 2.20rem;
        margin-bottom: -.009rem;
      }
    
      .main__paragraph {
        color: var(--medium-gray);
        line-height: 1.5;
        width: 89%;
        margin-inline: auto;
        margin-bottom: 1.5rem;
      }
    
      .main__cta {
        background-color: var(--almost-black);
        color: var(--almost-white);
        display: inline-block;
        padding: .938rem 1.25rem;
        border-radius: 1rem;
        text-decoration: none;
        font-weight: 700;
      }
    
      .main__img {
        width: 100%;
      }
    
      .main__brands {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1.25rem;
        margin-block: 4rem 7rem;
      }
    
      .main__brand {
        width: 19%;
      }

      @media (width >= 56.25rem) {
        .container {
          width: 76%;
          max-width: 90rem;
        }
        
        .main__flex {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          grid-template-areas:
            ". img";
          margin-inline: auto;
          gap: 8rem;
          padding-top: 8rem;
        }
    
        .main__picture {
          max-height: 31.25rem;
          grid-area: img;
          max-width: 25rem;
        }
    
        .main__img {
          height: 100%;
        }
    
        .main__article {
          text-align: left;
        }
    
        .main__brands {
          gap: 1.5rem;
          justify-content: unset;
          margin-top: 5rem;
        }
    
        .main__title {
          font-size: 4.61rem;
          margin-bottom: 3rem;
        }
    
        .main__paragraph {
          font-size: 1.125rem;
          margin-left: 0;
          margin-bottom: 3rem;
        }

        .main__cta:hover {
          color: var(--almost-black);
          background-color: var(--almost-white);
          border: 1px solid var(--almost-black);
        }
      }
    `
  }

  connectedCallback() {
    this.render()
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>${HeroMain.styles}</style>
      <section class="main__flex container">

        <picture class="main__picture">

          <source srcset="assets/image-hero-desktop.png" class="main__img" media="(min-width: 900px)">

          <img src="assets/image-hero-mobile.png" class="main__img" alt="Man using a notebook">

        </picture>

        <article class="main__article">

          <div class="main__texts">
            <h1 class="main__title"> Make remote work</h1>
            <p class="main__paragraph"> Get your team in sync, no matter your location. Streamline processes, 
              create team rituals, and watch productivity soar.
            </p>
            <a href="#" class="main__cta">Learn more</a>
          </div>

          <div class="main__brands">
            <img src="assets/client-databiz.svg" class="main__brand" alt="Logo of databiz">
            <img src="assets/client-audiophile.svg" class="main__brand" alt="Logo of audiophile">
            <img src="assets/client-meet.svg" class="main__brand" alt="Logo of meet">
            <img src="assets/client-maker.svg" class="main__brand" alt="Logo of maker">
          </div>

        </article>

      </section>
    `
  }
}

customElements.define("hero-main", HeroMain)
