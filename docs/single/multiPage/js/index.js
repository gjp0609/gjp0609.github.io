"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var useState = React.useState;
function Main() {
  var _useState = useState([{
      url: '',
      urlVisit: '',
      flex: 3,
      iframeKey: 0
    }, {
      url: '',
      urlVisit: '',
      flex: 3,
      iframeKey: 0
    }]),
    _useState2 = _slicedToArray(_useState, 2),
    tabs = _useState2[0],
    setTabs = _useState2[1];
  function changeUrl(index, url) {
    var tabsNew = tabs.slice();
    tabsNew[index].url = url;
    setTabs(tabsNew);
  }
  function visitOrRefresh(index) {
    var tabsNew = tabs.slice();
    tabsNew[index].urlVisit = tabsNew[index].url;
    tabsNew[index].iframeKey++;
    setTabs(tabsNew);
  }
  function clear(index) {
    var tabsNew = tabs.slice();
    tabsNew[index].url = '';
    setTabs(tabsNew);
  }
  function close(index) {
    var tabsNew = tabs.slice();
    tabsNew.splice(index, 1);
    setTabs(tabsNew);
  }
  function add() {
    var tabsNew = tabs.slice();
    tabsNew.push({
      url: '',
      urlVisit: '',
      flex: 3,
      iframeKey: 0
    });
    setTabs(tabsNew);
  }
  function changeFlex(index) {
    var tabsNew = tabs.slice();
    tabsNew[index].flex += 1;
    setTabs(tabsNew);
  }
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: 'tabs'
  }, tabs.map(function (tab, index) {
    return /*#__PURE__*/React.createElement(Tab, {
      key: index,
      index: index,
      tab: tab,
      onChange: function onChange(url) {
        return changeUrl(index, url);
      },
      onVisit: function onVisit() {
        return visitOrRefresh(index);
      },
      onRefresh: function onRefresh() {
        return visitOrRefresh(index);
      },
      onClear: function onClear() {
        return clear(index);
      },
      onClose: function onClose() {
        return close(index);
      },
      onChangeFlex: function onChangeFlex() {
        return changeFlex(index);
      }
    });
  })), /*#__PURE__*/React.createElement("div", {
    className: 'add',
    onClick: function onClick() {
      return add();
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: 'gg-add'
  })));
}
function Tab(props) {
  return /*#__PURE__*/React.createElement("div", {
    className: 'tab',
    style: {
      flex: props.tab.flex
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: 'navigator'
  }, /*#__PURE__*/React.createElement("div", {
    className: 'icons',
    onClick: function onClick() {
      return props.onChangeFlex();
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: 'gg-arrows-shrink-h'
  })), /*#__PURE__*/React.createElement("div", {
    className: 'icons',
    onClick: function onClick() {
      return props.onRefresh();
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: 'gg-redo'
  })), /*#__PURE__*/React.createElement("input", {
    className: 'url',
    value: props.tab.url,
    onChange: function onChange(e) {
      return props.onChange(e.target.value);
    },
    onKeyPress: function onKeyPress(e) {
      if (e.key === 'Enter') {
        props.onVisit();
      }
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: 'icons',
    onClick: function onClick() {
      return props.onClear();
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: 'gg-backspace'
  })), /*#__PURE__*/React.createElement("div", {
    className: 'icons',
    onClick: function onClick() {
      return props.onClose();
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: 'gg-close'
  }))), /*#__PURE__*/React.createElement("div", {
    className: 'page'
  }, /*#__PURE__*/React.createElement("iframe", {
    key: props.tab.iframeKey,
    src: props.tab.urlVisit
  })));
}
ReactDOM.createRoot(document.querySelector('#app')).render( /*#__PURE__*/React.createElement(React.StrictMode, null, /*#__PURE__*/React.createElement(Main, null)));