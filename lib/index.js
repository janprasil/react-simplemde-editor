'use strict';

exports.__esModule = true;
exports.default = undefined;

var _getOwnPropertyDescriptor = require('babel-runtime/core-js/object/get-own-property-descriptor');

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _desc, _value, _class;

var _idGenerator = require('./services/idGenerator');

var _idGenerator2 = _interopRequireDefault(_idGenerator);

var _noop = require('./utils/noop');

var _noop2 = _interopRequireDefault(_noop);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _coreDecorators = require('core-decorators');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

var SimpleMDEEditor = (_class = function (_Component) {
  (0, _inherits3.default)(SimpleMDEEditor, _Component);

  function SimpleMDEEditor() {
    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, SimpleMDEEditor);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
      keyChange: false
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

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
    if (!process.env.IS_BROWSER) return;
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
}(_react.Component), (_applyDecoratedDescriptor(_class.prototype, 'eventWrapper', [_coreDecorators.autobind], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'eventWrapper'), _class.prototype)), _class);
exports.default = SimpleMDEEditor;
module.exports = exports['default'];