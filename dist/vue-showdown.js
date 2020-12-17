/*!
 * vue-showdown - Use showdown as a vue component
 *
 * @version v3.0.0
 * @link https://vue-showdown.js.org
 * @license MIT
 * @copyright 2018-2020 meteorlxy
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('showdown'), require('vue')) :
  typeof define === 'function' && define.amd ? define(['exports', 'showdown', 'vue'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.VueShowdown = {}, global.showdown, global.Vue));
}(this, (function (exports, showdown, vue) { 'use strict';

  function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
      Object.keys(e).forEach(function (k) {
        if (k !== 'default') {
          var d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: function () {
              return e[k];
            }
          });
        }
      });
    }
    n['default'] = e;
    return Object.freeze(n);
  }

  var showdown__namespace = /*#__PURE__*/_interopNamespace(showdown);

  /**
   * The VueShowdown component
   *
   * @example
   * ```html
   * <template>
   *  <VueShowdown markdown="# Hello, world" />
   * </template>
   *
   * <script>
   * import { defineComponent } from 'vue';
   * import { VueShowdown } from 'vue-showdown';
   *
   * export default defineComponent({
   *   components: {
   *     VueShowdown,
   *   },
   * });
   * </script>
   * ```
   *
   * @public
   */
  const VueShowdown = vue.defineComponent({
      name: 'VueShowdown',
      props: {
          /**
           * Raw markdown content
           */
          markdown: {
              type: String,
              required: false,
              default: null,
          },
          /**
           * HTML tag of the markdown wrapper
           */
          tag: {
              type: String,
              required: false,
              default: 'div',
          },
          /**
           * Showdown flavor
           *
           * @see https://github.com/showdownjs/showdown#flavors
           */
          flavor: {
              type: String,
              required: false,
              default: null,
          },
          /**
           * Showdown options
           *
           * @see https://github.com/showdownjs/showdown#valid-options
           */
          options: {
              type: Object,
              required: false,
              default: () => ({}),
          },
          /**
           * Showdown extensions
           *
           * @see https://github.com/showdownjs/showdown#extensions
           */
          extensions: {
              type: Array,
              required: false,
              default: null,
          },
          /**
           * Treat the HTML string as Vue template. Require full build of Vue (runtime + complier)
           */
          vueTemplate: {
              type: Boolean,
              required: false,
              default: false,
          },
      },
      setup(props, { slots }) {
          // the showdown converter instance ref
          const converter = vue.computed(() => {
              const instance = new showdown.Converter({
                  extensions: props.extensions || undefined,
              });
              if (props.flavor !== null) {
                  instance.setFlavor(props.flavor);
              }
              Object.entries(props.options).forEach(([key, value]) => {
                  instance.setOption(key, value);
              });
              return instance;
          });
          // the raw markdown string
          const inputMarkdown = vue.computed(() => {
              var _a;
              // from props
              if (props.markdown !== null) {
                  return props.markdown;
              }
              // from default slot
              const slot = (_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots)[0];
              if ((slot === null || slot === void 0 ? void 0 : slot.type) === vue.Text) {
                  return slot.children;
              }
              // fall back to empty string
              return '';
          });
          // the parsed HTML string
          const outputHtml = vue.computed(() => converter.value.makeHtml(inputMarkdown.value));
          return () => props.vueTemplate
              ? vue.h({
                  template: `<${props.tag}>${outputHtml.value}</${props.tag}>`,
              })
              : vue.h(props.tag, {
                  innerHTML: outputHtml.value,
              });
      },
  });

  /**
   * The VueShowdown plugin
   *
   * @example
   * ```ts
   * import { createApp } from 'vue';
   * import { VueShowdownPlugin } from 'vue-showdown';
   *
   * const app = createApp();
   * app.use(VueShowdownPlugin);
   * ```
   *
   * @public
   */
  const VueShowdownPlugin = {
      install(app, { flavor = null, options = {} } = {}) {
          // set default flavor
          if (flavor !== null) {
              showdown.setFlavor(flavor);
          }
          // set default options (override flavor)
          Object.entries(options).forEach(([key, value]) => {
              showdown.setOption(key, value);
          });
          // register vue-showdown component globally
          app.component('VueShowdown', VueShowdown);
      },
  };

  if (typeof window !== 'undefined') {
      window.VueShowdownPlugin = VueShowdownPlugin;
      window.VueShowdown = VueShowdown;
  }

  exports.showdown = showdown__namespace;
  exports.VueShowdown = VueShowdown;
  exports.VueShowdownPlugin = VueShowdownPlugin;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
