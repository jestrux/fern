const React = require("react");
const ComponentPage = require("../../../components/ComponentPage");
const mediaSectionPresets = require("./presets");
const mediaSectionSchema = require("./schema");
const webflowMediaSection = require("./webflowMediaSection");

function MediaSection({ value, onClose }) {
  return (
    <ComponentPage
      title="MediaSection"
      onClose={onClose}
      schema={mediaSectionSchema}
      data={value}
      webflow={webflowMediaSection}
      presets={mediaSectionPresets}
    />
  );
}

module.exports = MediaSection;
