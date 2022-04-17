const React = require("react");
const { camelCaseToSentenceCase } = require("../utils");
const ComponentFieldEditor = require("./ComponentFieldEditor");
const Toggle = require("./Toggle");

function schemaToFields(schema, data) {
  const fields = [];

  Object.entries(schema).forEach(([label, props]) => {
    if (typeof props == "string") props = { type: props };

    props.__id = label;
    props.label = ["undefined", null].includes(typeof props.label)
      ? label
      : props.label;

    // if(data) props.value = data;
    props.value = data ? data[label] : props.defaultValue;

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

  return fields;
}

function ComponentFieldSection({ field, data, rootLevel = false, onChange }) {
  function handleChange(key, newValue) {
    const updatedProps = typeof key == "string" ? { [key]: newValue } : key;
    console.log("Section field updated: ", updatedProps);
    
    onChange(field.__id, {
      ...data,
      ...updatedProps,
    });
  }

  function handleToggle(newValue) {
    const newProps = !newValue
      ? null
      : schemaToFields(field.children, data).reduce((agg, child) => {
          return { ...agg, [child.__id]: child.defaultValue || true };
        }, {});

    onChange({
      ...data,
      [field.__id]: newProps
    });
  }

  const children = !data ? [] : schemaToFields(field.children, data);

  return (
    <div className={rootLevel ? "border-t border-b mb-2 mt-2 -mx-12px" : data && "mb-1"}>
      <div
        className={`flex items-center justify-between
        ${rootLevel ? "mt-3 mb-1 px-12px" : `-mx-12px px-12px py-2 border-t ${data && 'bg-black26'}`}
      `}
      >
        <label
          className={`text-sm tracking-widest ${rootLevel && "text-blue"}`}
        >
          {field.label.toUpperCase()}
        </label>

        {field.optional && <Toggle checked={data} onChange={handleToggle} />}
      </div>

      {data && (
        <div className={`${rootLevel ? "px-12px" : "-mx-12px"}`}>
          <div className={rootLevel ? "" : "px-12px"}>
            {children.map((field, index) => {
              if (field.type == "section")
                return (
                  <ComponentFieldSection
                    key={index}
                    field={field}
                    data={data[field.__id]}
                    onChange={handleChange}
                  />
                );
              else if (field.type == "group")
                return (
                  <ComponentFieldGroup
                    key={index}
                    field={field}
                    data={data}
                    onChange={handleChange}
                  />
                );

              return (
                <div className="mb-2" key={index}>
                  <ComponentFieldEditor
                    field={{ ...field, __data: data }}
                    onChange={handleChange}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function ComponentFieldGroup({ field, data, onChange }) {
  function handleToggle(newValue) {
    const newProps = field.children.reduce((agg, child) => {
      const childTypeIsText =
        !child.type || !child.type.length || child.type.toLowerCase() == "text";
      const offValue = child.offValue || childTypeIsText ? "" : null;

      return {
        ...agg,
        [child.__id]: !newValue ? offValue : child.defaultValue || true,
      };
    }, {});
    onChange(newProps);
  }

  const checked = field.children.every(child => child.value);

  return (
    <div className="mb-2">
      <div className="flex items-center justify-between">
        <label className="mt-2 text-md">
          {camelCaseToSentenceCase(field.label)}
        </label>

        {field.optional && <Toggle checked={checked} onChange={handleToggle} />}
      </div>

      {checked &&
        field.children.map((child, index) => (
          <ComponentFieldEditor
            key={index}
            field={{ ...child, __data: data }}
            onChange={onChange}
          />
        ))}
    </div>
  );
}

function ComponentFields({ schema, data, onChange }) {
  const fields = schemaToFields(schema, data);

  return (
    <div>
      {fields.map((field, index) => {
        if (field.type == "section")
          return (
            <ComponentFieldSection
              key={index}
              rootLevel
              field={field}
              data={data[field.__id]}
              onChange={onChange}
            />
          );
        else if (field.type == "group")
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
              field={{ ...field, __data: data }}
              onChange={onChange}
            />
          </div>
        );
      })}
    </div>
  );
}

module.exports = ComponentFields;
