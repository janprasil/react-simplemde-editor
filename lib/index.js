'use strict';

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var React = require('react');
var generateId = require('./services/idGenerator');
var NOOP = require('./utils/noop');

module.exports = React.createClass({
  displayName: 'exports',


  getInitialState: function getInitialState() {
    return {
      keyChange: false
    };
  },

  getDefaultProps: function getDefaultProps() {
    return {
      onChange: NOOP,
      options: {}
    };
  },

  componentWillMount: function componentWillMount() {
    var id = this.props.id;
    if (id) {
      this.id = id;
    } else {
      this.id = generateId();
    }
  },

  componentDidMount: function componentDidMount() {
    this.createEditor();
    this.addEvents();
    this.addExtraKeys();
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (!this.state.keyChange && nextProps.value !== this.simplemde.value()) {
      this.simplemde.value(nextProps.value);
    }

    this.setState({
      keyChange: false
    });
  },

  componentWillUnmount: function componentWillUnmount() {
    this.removeEvents();
  },

  createEditor: function createEditor() {
    var SimpleMDE = require('simplemde');
    var initialOptions = {
      element: document.getElementById(this.id),
      initialValue: this.props.value
    };

    var allOptions = (0, _assign2.default)({}, initialOptions, this.props.options);
    this.simplemde = new SimpleMDE(allOptions);
  },

  eventWrapper: function eventWrapper() {
    this.setState({
      keyChange: true
    });
    this.props.onChange(this.simplemde.value());
  },

  removeEvents: function removeEvents() {
    this.editorEl.removeEventListener('keyup', this.eventWrapper);
    this.editorToolbarEl && this.editorToolbarEl.removeEventListener('click', this.eventWrapper);
  },

  addEvents: function addEvents() {
    var wrapperId = this.id + '-wrapper';
    var wrapperEl = document.getElementById('' + wrapperId);

    this.editorEl = wrapperEl.getElementsByClassName('CodeMirror')[0];
    this.editorToolbarEl = wrapperEl.getElementsByClassName('editor-toolbar')[0];

    this.editorEl.addEventListener('keyup', this.eventWrapper);
    this.editorToolbarEl && this.editorToolbarEl.addEventListener('click', this.eventWrapper);
  },

  addExtraKeys: function addExtraKeys() {
    // https://codemirror.net/doc/manual.html#option_extraKeys
    if (this.props.extraKeys) {
      this.simplemde.codemirror.setOption('extraKeys', this.props.extraKeys);
    }
  },

  render: function render() {
    var textarea = React.createElement('textarea', { id: this.id });
    return React.createElement('div', { id: this.id + '-wrapper', className: this.props.className }, textarea);
  }
});