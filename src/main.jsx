// shims, in case they aren't present in the current environment
require("./utils/reactShim");

const React = require("react");
const ReactDOM = require("react-dom");

const App = require("./App");
const PanelController = require("./PanelController");

const helloPanel = new PanelController(App);

module.exports = {
    panels: {
        show: helloPanel
    }
};