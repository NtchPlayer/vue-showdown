(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('showdown')) :
  typeof define === 'function' && define.amd ? define(['showdown'], factory) :
  (global.VueShowdown = factory(global.showdown));
}(this, (function (showdown) { 'use strict';

  showdown = showdown && showdown.hasOwnProperty('default') ? showdown['default'] : showdown;

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  }

  var VueShowdownComponent = {
    name: 'VueShowdown',
    props: {
      /**
       * Raw markdown content
       */
      markdown: {
        type: String,
        required: false,
        default: null
      },

      /**
       * HTML tag of the markdown wrapper
       */
      tag: {
        type: String,
        required: false,
        default: 'div'
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
        validator: function validator(flavor) {
          return [null, 'original', 'vanilla', 'github'].includes(flavor);
        }
      },

      /**
       * Showdown options
       *
       * @see https://github.com/showdownjs/showdown#valid-options
       *
       * @property {boolean} omitExtraWLInCodeBlocks
       * @property {boolean} noHeaderId
       * @property {boolean} customizedHeaderId
       * @property {boolean} ghCompatibleHeaderId
       * @property {boolean} prefixHeaderId
       * @property {boolean} rawPrefixHeaderId
       * @property {boolean} rawHeaderId
       * @property {boolean} parseImgDimensions
       * @property {number} headerLevelStart
       * @property {boolean} simplifiedAutoLink
       * @property {boolean} excludeTrailingPunctuationFromURLs
       * @property {boolean} literalMidWordUnderscores
       * @property {boolean} literalMidWordAsterisks
       * @property {boolean} strikethrough
       * @property {boolean} tables
       * @property {boolean} tablesHeaderId
       * @property {boolean} ghCodeBlocks
       * @property {boolean} tasklists
       * @property {boolean} smoothLivePreview
       * @property {boolean} smartIndentationFix
       * @property {boolean} disableForced4SpacesIndentedSublists
       * @property {boolean} simpleLineBreaks
       * @property {boolean} requireSpaceBeforeHeadingText
       * @property {boolean} ghMentions
       * @property {String} ghMentionsLink
       * @property {boolean} encodeEmails
       * @property {boolean} openLinksInNewWindow
       * @property {boolean} backslashEscapesHTMLTags
       * @property {boolean} emoji
       * @property {boolean} underline
       * @property {boolean} completeHTMLDocument
       * @property {boolean} metadata
       * @property {boolean} splitAdjacentBlockquotes
       */
      options: {
        type: Object,
        required: false,
        default: function _default() {
          return {};
        }
      },

      /**
       * Showdown extensions
       *
       * @see https://github.com/showdownjs/showdown#extensions
       */
      extensions: {
        type: [Object, Array],
        required: false,
        default: null
      }
    },
    computed: {
      converter: function converter() {
        // converter instance of showdown
        var converter = new showdown.Converter({
          extensions: this.extensions || undefined
        }); // set flavor of this instance

        if (this.flavor !== null) {
          converter.setFlavor(this.flavor);
        } // set options of this instance (override flavor)


        var _arr = Object.entries(this.options);

        for (var _i = 0; _i < _arr.length; _i++) {
          var _arr$_i = _slicedToArray(_arr[_i], 2),
              key = _arr$_i[0],
              value = _arr$_i[1];

          converter.setOption(key, value);
        }

        return converter;
      },
      inputMarkdown: function inputMarkdown() {
        return this.markdown === null ? this.$slots.default[0].text : this.markdown;
      },
      outputHtml: function outputHtml() {
        return this.converter ? this.converter.makeHtml(this.inputMarkdown) : '';
      }
    },
    render: function render(h) {
      return h(this.tag, {
        domProps: {
          innerHTML: this.outputHtml
        }
      });
    }
  };

  var VueShowdown = {
    install: function install(Vue) {
      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref$flavor = _ref.flavor,
          flavor = _ref$flavor === void 0 ? null : _ref$flavor,
          _ref$options = _ref.options,
          options = _ref$options === void 0 ? {} : _ref$options;

      // set default flavor
      if (flavor !== null) {
        showdown.setFlavor(flavor);
      } // set default options (override flavor)


      var _arr = Object.entries(options);

      for (var _i = 0; _i < _arr.length; _i++) {
        var _arr$_i = _slicedToArray(_arr[_i], 2),
            key = _arr$_i[0],
            value = _arr$_i[1];

        showdown.setOption(key, value);
      } // register vue-showdown component globally


      Vue.component('VueShowdown', VueShowdownComponent);
    },
    // export
    VueShowdown: VueShowdownComponent,
    showdown: showdown
  };

  if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(VueShowdown);
  }

  return VueShowdown;

})));
