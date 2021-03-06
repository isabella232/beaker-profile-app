import {LitElement, html} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import {toNiceDomain} from '/vendor/beaker-app-stdlib/js/strings.js'
import profileInfoCSS from '../../css/com/profile-info.css.js'

class ProfileInfo extends LitElement {
  static get properties () {
    return {
      user: {type: Object}
    }
  }

  constructor () {
    super()
    this.user = null
  }

  render () {
    if (!this.user) {
      return html`<div></div>`
    }
    var domain = (new URL(this.user.url)).hostname
    return html`
      <link rel="stylesheet" href="/vendor/beaker-app-stdlib/css/fontawesome.css">
      <h1 class="title"><a href="dat://profile/${domain}">${this.user.title}</a></h1>
      <div class="domain"><a href="dat://profile/${domain}">${toNiceDomain(this.user.url)}</a></div>
      <div class="link"><a href="${this.user.url}" target="_blank"><span class="fas fa-external-link-alt"></span> Visit Website</a></div>
      <div class="description">${this.user.description}</div>
    `
  }

}
ProfileInfo.styles = profileInfoCSS
customElements.define('profile-info', ProfileInfo)