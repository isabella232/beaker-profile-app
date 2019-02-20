import {LitElement, html} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import {profiles} from './tmp-beaker.js'
import profileMainCSS from '../css/profile-main.css.js'
import '/vendor/beaker-app-stdlib/js/com/app-header.js'
import './com/profile-cover-photo.js'
import './com/profile-info.js'
import './com/profile-content-nav.js'
import './com/profile-social-metrics.js'
import './com/profile-actions.js'
import './com/profile-feed.js'

class Profile extends LitElement {
  static get properties () {
    return {
      currentUser: {type: 'Object'},
      viewingUser: {type: 'Object'}
    }
  }

  constructor () {
    super()
    this.currentUser = null
    this.viewingUser = null
    this.load()
  }

  get locationUserUrl () {
    var domain = window.location.pathname.slice(1)
    if (domain) {
      return `dat://${domain}`
    }
    return false
  }

  async load () {
    this.currentUser = await profiles.getCurrentUser()

    var url = this.locationUserUrl
    if (!url) {
      console.log('Redirecting to current user\'s profile')
      let domain = (new URL(this.currentUser.url)).hostname
      window.history.replaceState({}, null, `/${domain}`)
    } else {
      this.viewingUser = await profiles.get(url)
      console.log('user', this.user)
    }
  }

  render() {
    if (!this.viewingUser) return this.renderLoading()
    var userDomain = (new URL(this.viewingUser.url)).hostname
    return html`
      <link rel="stylesheet" href="/vendor/beaker-app-stdlib/css/fontawesome.css">
      <beaker-app-header
        profile-pic-src="${this.currentUser.url}/thumb"
        fontawesome-src="/vendor/beaker-app-stdlib/css/fontawesome.css"
      ></beaker-app-header>
      <header>
        <section class="cover-photo">
          <div>
            <profile-cover-photo src="${this.viewingUser.url}/cover"></profile-cover-photo>
          </div>
        </section>
        <section class="toolbar">
          <div>
            <a class="avatar" href="dat://profile/${userDomain}">
              <img src="${this.viewingUser.url}/thumb">
            </a>
            <profile-social-metrics></profile-social-metrics>
            <div class="spacer"></div>
            <profile-actions></profile-actions>
          </div>
        </section>
      </header>
      <main>
        <div>
          <nav>
            <profile-info .user=${this.viewingUser}></profile-info>
            <profile-content-nav></profile-content-nav>
          </nav>
          <article>
            <profile-feed></profile-feed>
          </article>
        </div>
      </main>
    `
  }

  renderLoading () {
    return html`
      <div>todo</div>
    `
  }
}
Profile.styles = profileMainCSS

customElements.define('profile-main', Profile)
