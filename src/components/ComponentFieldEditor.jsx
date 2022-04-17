const React = require("react");
const ButtonGroup = require("./ButtonGroup");
const ColorList = require("./ColorList");
const IconList = require("./IconPicker/IconList");
const Toggle = require("./Toggle");

const ComponentFieldEditor = function ({ field = {}, onChange }) {
  const {
    __id,
    __data,
    optional,
    label,
    type,
    choices,
    defaultValue,
    offValue,
    min,
    max,
    value,
  } = {
    ...(field ? field : {}),
  };

  function handleToggle(newValue) {
    const fieldTypeIsText =
      !type || !type.length || type.toLowerCase() == "text";
    const derivedOffValue = offValue || fieldTypeIsText ? "" : null;

    handleChange(!newValue ? derivedOffValue : defaultValue || true);
    onChange(newProps);
  }

  const [tempValue, setTempValue] = React.useState(value);

  function handleChange(newValue) {
    if (min != undefined) {
      let minValue = min;
      if (typeof min == "function") minValue = min(__data);
      if (newValue < minValue) newValue = minValue;
    }
    if (max != undefined) {
      let maxValue = max;
      if (typeof max == "function") maxValue = max(__data);
      if (newValue > maxValue) newValue = maxValue;
    }

    onChange(__id, newValue);
  }

  return (
    <div className="ComponentFieldEditor">
      {label && label.length && (
        <div className="flex items-center justify-between">
          <label className="mt-2 text-md" style={{ marginBottom: "0.1rem" }}>
            {label.charAt(0).toUpperCase()}
            {label.substring(1)}
          </label>

          {type == "boolean" && (
            <Toggle checked={value} onChange={handleChange} />
          )}
          {optional == true && (
            <Toggle checked={value} onChange={handleToggle} />
          )}
        </div>
      )}

      {(!optional || value) && (
        <React.Fragment>
          {type == "radio" && (
            <ButtonGroup
              value={value}
              choices={choices}
              onChange={handleChange}
            />
          )}

          {type == "color" && (
            <ColorList
              small={true}
              colors={choices}
              selectedColor={value}
              onChange={handleChange}
            />
          )}

          {type == "icon" && (
            <div
              className="-mx-12px p-2 mt-1 bg-white overflow-y-auto"
              style={{ maxHeight: "140px" }}
            >
              <IconList onChange={handleChange} />
            </div>
          )}

          {!["boolean", "color", "icon", "radio"].includes(type) && (
            <form
              className="w-full"
              onSubmit={e => {
                e.preventDefault();
                handleChange(tempValue);
              }}
            >
              <input
                className="m-0 w-full"
                type={type}
                value={tempValue}
                uxp-quiet="true"
                onChange={e => setTempValue(e.target.value)}
              />
            </form>
          )}
        </React.Fragment>
      )}
    </div>
  );
};

module.exports = ComponentFieldEditor;
