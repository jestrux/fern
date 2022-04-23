const React = require("react");
const ComponentPage = require("../../components/ComponentPage");
const mediaSectionSchema = require("./MediaSection/schema");

function Hero({ value, onClose }) {
  return (
    <ComponentPage
      title="Hero"
      onClose={onClose}
      schema={mediaSectionSchema}
      data={value}
    />
  );
}

module.exports = Hero;
