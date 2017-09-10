/* global customElements */
/**
 * Base template from https://www.polymer-project.org/blog/2017-08-23-hands-on-30-preview
 */
import { Element as PolymerElement }
  from '../node_modules/@polymer/polymer/polymer-element.js';

/**
 * `<%= elementName %>`
 * <%= elementDescription %>
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */

export class <%= className %> extends PolymerElement {
  // Define a string template instead of a `<template>` element.
  static get template() {
    return `<div>This is my [[name]] custom element.</div>`;
  }

  constructor() {
    super();
    this.name = '<%= elementName %>';
  }

  // properties, observers, etc. are identical to 2.x
  static get properties() {
    return {
      name: {
        Type: String
      }
    };
  }
}

customElements.define('<%= elementName %>', <%= className %>);
