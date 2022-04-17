const React = require("react");
const Creators = require("../../../Creators");
const Toggle = require("../../../components/Toggle");
const ButtonGroup = require("../../../components/ButtonGroup");
const NavbarLinks = require("./Links");
const PageTitle = require("../../../components/ComponentPage");
const ComponentFieldEditor = require("../../../components/ComponentFieldEditor");

function reducer(state, action) {
  switch (action.type) {
    case "setValue":
      return { ...state, isRunning: true };
    default:
      throw new Error();
  }
}

function Navbar({ value, onClose }) {
  const [state, dispatch] = useReducer(reducer, value);
  const theme = state.theme;

  function updateField(field, newValue) {
    Creators.Navbar({ ...value, [field]: newValue });
  }

  function handleSetLinks(links, newActiveLink) {
    setLinks(links);

    const newProps = { ...value, links };

    if (newActiveLink) newProps.activeLink = newActiveLink;

    Creators.Navbar(newProps);
  }

  return (
    <div style={{ margin: "0.5rem -12px" }}>
      <PageTitle title="Navbar" onClose={onClose} />

      {/* <ComponentFieldEditor
        title="Shadow"
        toggleValue={state.shadow}
        onToggle={newValue => updateField("shadow", newValue)}
      /> */}

      {/* <ComponentFieldEditor
        title="Border"
        toggleValue={state.border}
        onToggle={newValue => updateField("border", newValue)}
      /> */}

      <NavbarLinks
        links={state.links}
        activeLink={state.activeLink}
        onChange={handleSetLinks}
        onChangeActiveLink={activeLink =>
          Creators.Navbar({ ...value, activeLink })
        }
      />
    </div>
  );
}

module.exports = Navbar;
