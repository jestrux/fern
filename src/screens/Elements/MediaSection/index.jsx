const React = require("react");
const ComponentPage = require("../../../components/ComponentPage");
const mediaSectionSchema = require("./schema");

function MediaSection({ value, onClose }) {
  return (
    <ComponentPage
      title="MediaSection"
      onClose={onClose}
      schema={mediaSectionSchema}
      data={value}
    />
  );
}

module.exports = MediaSection;
