const React = require("react");
const Creators = require("../../Creators");
const Toggle = require("../../components/Toggle");
const ButtonGroup = require("../../components/ButtonGroup");
const IconList = require("../../components/IconPicker/IconList");

function Input({ value, onClose }) {
  const [inputValue, setInputValue] = React.useState(
    value ? value.inputValue : ""
  );
  const [placeholder, setPlaceholder] = React.useState(
    value ? value.placeholder : ""
  );
  const [label, setLabel] = React.useState(value ? value.label : "");
  const shadow = value ? value.shadow : false;
  const roundness = value ? value.roundness : "xs";
  const icon = value ? value.icon : null;

  function handleSetShadow(shadow) {
    Creators.Input({ ...value, shadow });
  }

  function handleSetRoundness(roundness) {
    Creators.Input({ ...value, roundness });
  }

  function handleSetLabel(label) {
    label = label ? "Email Address" : label;
    Creators.Input({ ...value, label });
  }

  function handleSetIcon(icon) {
    if (icon == true) icon = "search";
    Creators.Input({ ...value, icon });
  }

  return (
    <div style={{ margin: "0.5rem -12px" }}>
      <div className="flex items-center px-1">
        <span className="cursor-pointer opacity-65" onClick={onClose}>
          <svg height="16" viewBox="0 0 24 24" width="24">
            <path
              fill="#333"
              d="M11.67 3.87L9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z"
            />
          </svg>
        </span>

        <h2 className="px-0 text-md ml-1">Input</h2>
      </div>

      <div className="px-3">
        <div className="pt-2 mt-3">
          <div className="flex items-center justify-between">
            <label className="text-md">Icon</label>

            <Toggle checked={icon} onChange={handleSetIcon} />
          </div>

          {icon && (
            <div
              className="-mx-12px p-2 mt-1 bg-white overflow-y-auto"
              style={{ maxHeight: "140px" }}
            >
              <IconList
                iconNames={[
                  "search",
                  "account-circle",
                  "account-box",
                  "mail",
                  "phone",
                  "lock",
                  "date",
                  "location",
                  "time",
                  "attachment",
                  "link",
                  "notes",
                  "work",
                  "seat",
                ]}
                onChange={handleSetIcon}
              />
            </div>
          )}
        </div>

        <div className="mt-1">
          <div className="flex items-center justify-between mt-3">
            <label className="text-md">Label</label>
            <Toggle checked={label} onChange={handleSetLabel} />
          </div>

          {label && (
            <div className={`-mx-12px px-12px py-2 mt-1 bg-white border-b`}>
              <div className="flex flex-col items-start">
                <form
                  className="w-full"
                  onSubmit={e => {
                    e.preventDefault();
                    Creators.Input({ ...value, label });
                  }}
                >
                  <input
                    className="m-0 w-full"
                    type="text"
                    value={label}
                    onChange={e => setLabel(e.target.value)}
                  />
                </form>
              </div>
            </div>
          )}
        </div>

        <div className="pt-2 mt-3 flex flex-col items-start">
          <label className="mb-1 text-md">Value</label>

          <form
            className="w-full"
            onSubmit={e => {
              e.preventDefault();
              Creators.Input({ ...value, inputValue });
            }}
          >
            <input
              className="m-0 w-full"
              type="text"
              placeholder="Enter input value here..."
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
            />
          </form>
        </div>

        <div className="pt-2 mt-3 flex flex-col items-start">
          <label className="mb-1 text-md">Placeholder</label>

          <form
            className="w-full"
            onSubmit={e => {
              e.preventDefault();
              Creators.Input({ ...value, placeholder });
            }}
          >
            <input
              className="m-0 w-full"
              type="text"
              placeholder="Enter input placeholder here..."
              value={placeholder}
              onChange={e => setPlaceholder(e.target.value)}
            />
          </form>
        </div>

        <div className="flex items-center justify-between mt-3 pt-2">
          <label className="text-md">Shadow</label>

          <Toggle checked={shadow} onChange={handleSetShadow} />
        </div>

        <div className="pt-1 mt-3 flex flex-col items-start">
          <label className="mb-1 text-md">Rounded Corners</label>

          <ButtonGroup
            value={roundness}
            choices={["none", "sm", "md", "lg", "full"]}
            onChange={handleSetRoundness}
          />
        </div>
      </div>
    </div>
  );
}

module.exports = Input;
