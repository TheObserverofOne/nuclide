Object.defineProperty(exports, '__esModule', {
  value: true
});

/*
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _nuclideArcanistRpcLibUtils2;

function _nuclideArcanistRpcLibUtils() {
  return _nuclideArcanistRpcLibUtils2 = require('../../nuclide-arcanist-rpc/lib/utils');
}

var _nuclideUiLibAtomTextEditor2;

function _nuclideUiLibAtomTextEditor() {
  return _nuclideUiLibAtomTextEditor2 = require('../../nuclide-ui/lib/AtomTextEditor');
}

var _nuclideUiLibAtomInput2;

function _nuclideUiLibAtomInput() {
  return _nuclideUiLibAtomInput2 = require('../../nuclide-ui/lib/AtomInput');
}

var _classnames2;

function _classnames() {
  return _classnames2 = _interopRequireDefault(require('classnames'));
}

var _constants2;

function _constants() {
  return _constants2 = require('./constants');
}

var _reactForAtom2;

function _reactForAtom() {
  return _reactForAtom2 = require('react-for-atom');
}

var _nuclideUiLibButton2;

function _nuclideUiLibButton() {
  return _nuclideUiLibButton2 = require('../../nuclide-ui/lib/Button');
}

var _nuclideUiLibToolbar2;

function _nuclideUiLibToolbar() {
  return _nuclideUiLibToolbar2 = require('../../nuclide-ui/lib/Toolbar');
}

var _nuclideUiLibToolbarLeft2;

function _nuclideUiLibToolbarLeft() {
  return _nuclideUiLibToolbarLeft2 = require('../../nuclide-ui/lib/ToolbarLeft');
}

var _nuclideUiLibToolbarRight2;

function _nuclideUiLibToolbarRight() {
  return _nuclideUiLibToolbarRight2 = require('../../nuclide-ui/lib/ToolbarRight');
}

var _atom2;

function _atom() {
  return _atom2 = require('atom');
}

var _commonsNodeUniversalDisposable2;

function _commonsNodeUniversalDisposable() {
  return _commonsNodeUniversalDisposable2 = _interopRequireDefault(require('../../commons-node/UniversalDisposable'));
}

var DiffRevisionView = (function (_React$Component) {
  _inherits(DiffRevisionView, _React$Component);

  function DiffRevisionView() {
    _classCallCheck(this, DiffRevisionView);

    _get(Object.getPrototypeOf(DiffRevisionView.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(DiffRevisionView, [{
    key: 'render',
    value: function render() {
      var commitMessage = this.props.commitMessage;

      var commitTitle = commitMessage.split(/\n/)[0];
      var revision = (0, (_nuclideArcanistRpcLibUtils2 || _nuclideArcanistRpcLibUtils()).getPhabricatorRevisionFromCommitMessage)(commitMessage);

      return revision == null ? (_reactForAtom2 || _reactForAtom()).React.createElement('span', null) : (_reactForAtom2 || _reactForAtom()).React.createElement(
        'a',
        { href: revision.url, title: commitTitle },
        revision.name
      );
    }
  }]);

  return DiffRevisionView;
})((_reactForAtom2 || _reactForAtom()).React.Component);

var DiffPublishView = (function (_React$Component2) {
  _inherits(DiffPublishView, _React$Component2);

  function DiffPublishView(props) {
    _classCallCheck(this, DiffPublishView);

    _get(Object.getPrototypeOf(DiffPublishView.prototype), 'constructor', this).call(this, props);
    this._onClickBack = this._onClickBack.bind(this);
    this.__onClickPublish = this.__onClickPublish.bind(this);
    this.state = {
      hasLintError: false
    };
  }

  _createClass(DiffPublishView, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._textBuffer = new (_atom2 || _atom()).TextBuffer();
      this._subscriptions = new (_atom2 || _atom()).CompositeDisposable();

      this._subscriptions.add(new (_commonsNodeUniversalDisposable2 || _commonsNodeUniversalDisposable()).default(this.props.diffModel.getPublishUpdates().subscribe(this._onPublishUpdate.bind(this))));
      this.__populatePublishText();
    }
  }, {
    key: '_onPublishUpdate',
    value: function _onPublishUpdate(message) {
      var level = message.level;
      var text = message.text;

      // If its a error log with lint we show the lint excuse input
      if (level === 'error' && text.includes('Usage Exception: Lint')) {
        this.setState({ hasLintError: true });
      }
      this._textBuffer.append(text);
      var updatesEditor = this.refs.publishUpdates;
      if (updatesEditor != null) {
        updatesEditor.getElement().scrollToBottom();
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (this.props.message !== prevProps.message || this.props.publishModeState !== prevProps.publishModeState) {
        this.__populatePublishText();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this._subscriptions.dispose();
      // Save the latest edited publish message for layout switches.
      var message = this.__getPublishMessage();
      var diffModel = this.props.diffModel;

      // Let the component unmount before propagating the final message change to the model,
      // So the subsequent change event avoids re-rendering this component.
      process.nextTick(function () {
        diffModel.setPublishMessage(message);
      });
    }
  }, {
    key: '__populatePublishText',
    value: function __populatePublishText() {
      var messageEditor = this.refs.message;
      if (messageEditor != null) {
        messageEditor.getTextBuffer().setText(this.props.message || '');
      }
    }
  }, {
    key: '__onClickPublish',
    value: function __onClickPublish() {
      this._textBuffer.setText('');
      this.setState({ hasLintError: false });
      var lintExcuse = undefined;
      if (this.refs.excuse != null) {
        lintExcuse = this.refs.excuse.getText();
      }
      this.props.diffModel.publishDiff(this.__getPublishMessage() || '', lintExcuse);
    }
  }, {
    key: '__getPublishMessage',
    value: function __getPublishMessage() {
      var messageEditor = this.refs.message;
      if (messageEditor != null) {
        return messageEditor.getTextBuffer().getText();
      } else {
        return this.props.message;
      }
    }
  }, {
    key: '__getStatusEditor',
    value: function __getStatusEditor() {
      var _this = this;

      var publishModeState = this.props.publishModeState;

      var isBusy = undefined;
      var statusEditor = undefined;

      var getStreamStatusEditor = function getStreamStatusEditor() {
        return (_reactForAtom2 || _reactForAtom()).React.createElement((_nuclideUiLibAtomTextEditor2 || _nuclideUiLibAtomTextEditor()).AtomTextEditor, {
          ref: 'publishUpdates',
          textBuffer: _this._textBuffer,
          readOnly: true,
          syncTextContents: false,
          gutterHidden: true
        });
      };

      var getPublishMessageEditor = function getPublishMessageEditor() {
        return (_reactForAtom2 || _reactForAtom()).React.createElement((_nuclideUiLibAtomTextEditor2 || _nuclideUiLibAtomTextEditor()).AtomTextEditor, {
          ref: 'message',
          readOnly: isBusy,
          syncTextContents: false,
          gutterHidden: true
        });
      };

      switch (publishModeState) {
        case (_constants2 || _constants()).PublishModeState.READY:
          isBusy = false;
          statusEditor = getPublishMessageEditor();
          break;
        case (_constants2 || _constants()).PublishModeState.LOADING_PUBLISH_MESSAGE:
          isBusy = true;
          statusEditor = getPublishMessageEditor();
          break;
        case (_constants2 || _constants()).PublishModeState.AWAITING_PUBLISH:
          isBusy = true;
          statusEditor = getStreamStatusEditor();
          break;
        case (_constants2 || _constants()).PublishModeState.PUBLISH_ERROR:
          isBusy = false;
          statusEditor = getStreamStatusEditor();
          break;
        default:
          throw new Error('Invalid publish mode!');
      }

      return statusEditor;
    }
  }, {
    key: '__getExcuseInput',
    value: function __getExcuseInput() {
      if (this.state.hasLintError === true) {
        return (_reactForAtom2 || _reactForAtom()).React.createElement((_nuclideUiLibAtomInput2 || _nuclideUiLibAtomInput()).AtomInput, {
          className: 'nuclide-diff-view-lint-excuse',
          placeholderText: 'Lint excuse',
          ref: 'excuse',
          size: 'lg'
        });
      }

      return null;
    }
  }, {
    key: '_getToolbar',
    value: function _getToolbar() {
      var _props = this.props;
      var publishModeState = _props.publishModeState;
      var publishMode = _props.publishMode;
      var headCommitMessage = _props.headCommitMessage;

      var revisionView = undefined;
      if (headCommitMessage != null) {
        revisionView = (_reactForAtom2 || _reactForAtom()).React.createElement(DiffRevisionView, { commitMessage: headCommitMessage });
      }
      var isBusy = undefined;
      var publishMessage = undefined;
      switch (publishModeState) {
        case (_constants2 || _constants()).PublishModeState.READY:
          isBusy = false;
          if (publishMode === (_constants2 || _constants()).PublishMode.CREATE) {
            publishMessage = 'Publish Phabricator Revision';
          } else {
            publishMessage = 'Update Phabricator Revision';
          }
          break;
        case (_constants2 || _constants()).PublishModeState.LOADING_PUBLISH_MESSAGE:
          isBusy = true;
          publishMessage = 'Loading...';
          break;
        case (_constants2 || _constants()).PublishModeState.AWAITING_PUBLISH:
          isBusy = true;
          publishMessage = 'Publishing...';
          break;
        case (_constants2 || _constants()).PublishModeState.PUBLISH_ERROR:
          isBusy = false;
          publishMessage = 'Fixed? - Retry Publishing';
          break;
        default:
          throw new Error('Invalid publish mode!');
      }

      var publishButton = (_reactForAtom2 || _reactForAtom()).React.createElement(
        (_nuclideUiLibButton2 || _nuclideUiLibButton()).Button,
        {
          className: (0, (_classnames2 || _classnames()).default)({ 'btn-progress': isBusy }),
          size: (_nuclideUiLibButton2 || _nuclideUiLibButton()).ButtonSizes.SMALL,
          buttonType: (_nuclideUiLibButton2 || _nuclideUiLibButton()).ButtonTypes.SUCCESS,
          onClick: this.__onClickPublish,
          disabled: isBusy },
        publishMessage
      );

      return (_reactForAtom2 || _reactForAtom()).React.createElement(
        'div',
        { className: 'publish-toolbar-wrapper' },
        (_reactForAtom2 || _reactForAtom()).React.createElement(
          (_nuclideUiLibToolbar2 || _nuclideUiLibToolbar()).Toolbar,
          { location: 'bottom' },
          (_reactForAtom2 || _reactForAtom()).React.createElement(
            (_nuclideUiLibToolbarLeft2 || _nuclideUiLibToolbarLeft()).ToolbarLeft,
            { className: 'nuclide-diff-view-publish-toolbar-left' },
            revisionView,
            this.__getExcuseInput()
          ),
          (_reactForAtom2 || _reactForAtom()).React.createElement(
            (_nuclideUiLibToolbarRight2 || _nuclideUiLibToolbarRight()).ToolbarRight,
            null,
            (_reactForAtom2 || _reactForAtom()).React.createElement(
              (_nuclideUiLibButton2 || _nuclideUiLibButton()).Button,
              {
                size: (_nuclideUiLibButton2 || _nuclideUiLibButton()).ButtonSizes.SMALL,
                onClick: this._onClickBack },
              'Back'
            ),
            publishButton
          )
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      return (_reactForAtom2 || _reactForAtom()).React.createElement(
        'div',
        { className: 'nuclide-diff-mode' },
        (_reactForAtom2 || _reactForAtom()).React.createElement(
          'div',
          { className: 'message-editor-wrapper' },
          this.__getStatusEditor()
        ),
        this._getToolbar()
      );
    }
  }, {
    key: '_onClickBack',
    value: function _onClickBack() {
      this.props.diffModel.setViewMode((_constants2 || _constants()).DiffMode.BROWSE_MODE);
    }
  }]);

  return DiffPublishView;
})((_reactForAtom2 || _reactForAtom()).React.Component);

exports.default = DiffPublishView;
module.exports = exports.default;