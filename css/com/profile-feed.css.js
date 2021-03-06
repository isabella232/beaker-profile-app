import {css} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'

const cssStr = css`
:host {
  display: block;
  border: 1px solid #ddd;
}

beaker-feed-post {
  border-bottom: 1px solid #ddd;
}

beaker-feed-post:last-of-type {
  border-bottom: 0;
}

.empty {
  background: #fff;
  padding: 24px;
  text-align: center;
  color: var(--color-text--muted);
}
`
export default cssStr