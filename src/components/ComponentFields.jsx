const React = require("react");
const ComponentFieldEditor = require("./ComponentFieldEditor");
const Toggle = require("./Toggle");

function ComponentFieldGroup({ field, data, onChange }) {
  function handleToggle(newValue) {
    const newProps = field.children.reduce((agg, child) => {
      const childTypeIsText =
        !child.type || !child.type.length || child.type.toLowerCase() == "text";
      const offValue = child.offValue || childTypeIsText ? "" : null;

      agg[child.__id] = !newValue ? offValue : child.defaultValue || true;

      return agg;
    }, {});
    onChange(newProps);
  }

  const checked = field.children.every(child => child.value);

  return (
    <div className="mb-2">
      <div className="flex items-center justify-between">
        <label className="mt-2 text-md">
          {field.label.charAt(0).toUpperCase()}
          {field.label.substring(1)}
        </label>

        {field.optional && <Toggle checked={checked} onChange={handleToggle} />}
      </div>

      {checked &&
        field.children.map((child, index) => (
          <ComponentFieldEditor
            key={index}
            field={{...child, __data: data}}
            onChange={onChange}
          />
        ))}
    </div>
  );
}

function ComponentFields({ schema, data, onChange }) {
  const fields = [];

  Object.entries(schema).forEach(([label, props]) => {
    if (typeof props == "string") props = { type: props };

    props.__id = label;
    props.label = ["undefined", null].includes(typeof props.label)
      ? label
      : props.label;
    props.value = data[label];

    if (!props.group) fields.push(props);
    else {
      const groupIndex = fields.findIndex(group => group.label == props.group);

      if (groupIndex != -1) fields[groupIndex].children.push(props);
      else {
        const group = {
          type: "group",
          label: props.group,
          optional: props.optional == "group",
          children: [props],
        };

        fields.push(group);
      }
    }
  });

  return (
    <div>
      {fields.map((field, index) => {
        if (field.type == "group")
          return (
            <ComponentFieldGroup
              key={index}
              field={field}
              data={data}
              onChange={onChange}
            />
          );

        return (
          <div className="mb-2" key={index}>
            <ComponentFieldEditor
              field={{...field, __data: data}}
              onChange={onChange}
            />
          </div>
        );
      })}
    </div>
  );
}

module.exports = ComponentFields;
