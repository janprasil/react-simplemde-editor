'use strict';

exports.__esModule = true;
exports.default = undefined;

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _idGenerator = require('./services/idGenerator');

var _idGenerator2 = _interopRequireDefault(_idGenerator);

var _noop = require('./utils/noop');

var _noop2 = _interopRequireDefault(_noop);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SimpleMDEEditor = function (_Component) {
  (0, _inherits3.default)(SimpleMDEEditor, _Component);

  function SimpleMDEEditor() {
    (0, _classCallCheck3.default)(this, SimpleMDEEditor);
    return (0, _possibleConstructorReturn3.default)(this, _Component.apply(this, arguments));
  }

  SimpleMDEEditor.prototype.getInitialState = function getInitialState() {
    return {
      keyChange: false
    };
  };

  SimpleMDEEditor.prototype.getDefaultProps = function getDefaultProps() {
    return {
      onChange: _noop2.default,
      options: {}
    };
  };

  SimpleMDEEditor.prototype.componentWillMount = function componentWillMount() {
    var id = this.props.id;
    if (id) {
      this.id = id;
    } else {
      this.id = (0, _idGenerator2.default)();
    }
  };

  SimpleMDEEditor.prototype.componentDidMount = function componentDidMount() {
    this.createEditor();
    this.addEvents();
    this.addExtraKeys();
  };

  SimpleMDEEditor.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (!this.state.keyChange && nextProps.value !== this.simplemde.value()) {
      this.simplemde.value(nextProps.value);
    }

    this.setState({
      keyChange: false
    });
  };

  SimpleMDEEditor.prototype.componentWillUnmount = function componentWillUnmount() {
    this.removeEvents();
  };

  SimpleMDEEditor.prototype.createEditor = function createEditor() {
    var SimpleMDE = require('simplemde');
    var initialOptions = {
      element: document.getElementById(this.id),
      initialValue: this.props.value
    };

    var allOptions = (0, _assign2.default)({}, initialOptions, this.props.options);
    this.simplemde = new SimpleMDE(allOptions);
  };

  SimpleMDEEditor.prototype.eventWrapper = function eventWrapper() {
    this.setState({
      keyChange: true
    });
    this.props.onChange(this.simplemde.value());
  };

  SimpleMDEEditor.prototype.removeEvents = function removeEvents() {
    this.editorEl.removeEventListener('keyup', this.eventWrapper);
    this.editorToolbarEl && this.editorToolbarEl.removeEventListener('click', this.eventWrapper);
  };

  SimpleMDEEditor.prototype.addEvents = function addEvents() {
    var wrapperId = this.id + '-wrapper';
    var wrapperEl = document.getElementById('' + wrapperId);

    this.editorEl = wrapperEl.getElementsByClassName('CodeMirror')[0];
    this.editorToolbarEl = wrapperEl.getElementsByClassName('editor-toolbar')[0];

    this.editorEl.addEventListener('keyup', this.eventWrapper);
    this.editorToolbarEl && this.editorToolbarEl.addEventListener('click', this.eventWrapper);
  };

  SimpleMDEEditor.prototype.addExtraKeys = function addExtraKeys() {
    // https://codemirror.net/doc/manual.html#option_extraKeys
    if (this.props.extraKeys) {
      this.simplemde.codemirror.setOption('extraKeys', this.props.extraKeys);
    }
  };

  SimpleMDEEditor.prototype.render = function render() {
    return _react2.default.createElement(
      'div',
      { id: this.id + '-wrapper', className: this.props.className },
      _react2.default.createElement('textarea', { id: this.id })
    );
  };

  return SimpleMDEEditor;
}(_react.Component);

exports.default = SimpleMDEEditor;
module.exports = exports['default'];