const { selection } = require("scenegraph");

const React = require("react");
const Creators = require("../Creators");
const { editDom, tagNode, openUrl } = require("../utils");
const ComponentFields = require("./ComponentFields");
const SectionTitles = require("./SectionTitles");

const ComponentPage = function ({ title, onClose, schema, data, webflow, presets: Presets, children }) {
  const section = data.editorSection || "Content";
  const { theme, ...content } = schema || {theme: {}, content: {}};

  const setSection = (editorSection) => {
    editDom(() => {
      try {
        tagNode(selection.items[0], { ...data, editorSection });
      } catch (error) {
        console.log("Error saving editor section: ", error);
      }
    });
  }
  
  function updateField(field, newValue) {
    const updatedProps = typeof field == "string" ? { [field]: newValue } : field;
    if(section == "Styles")
      Creators[title]({ 
        ...data,
        theme: {
          ...data.theme,
          ...updatedProps
      }});
    else
      Creators[title]({ ...data, ...updatedProps });
  }

  function handleExportToWebflow(){
    const webflowData = webflow(data);
    const clipboard = require("clipboard");
    clipboard.copyText(JSON.stringify(webflowData));
    openUrl("https://jestrux.github.io/webflow-copy");
  }

  function copyProps(){
    const clipboard = require("clipboard");
    clipboard.copyText(JSON.stringify(data));
  }

  return (
    <div style={{ margin: "0 -12px"}}>
      <div className="bg-white">
        <div className="flex items-center px-1 py-2">
          <span className="cursor-pointer opacity-65" onClick={onClose}>
            <svg height="16" viewBox="0 0 24 24" width="24">
              <path
                fill="black"
                d="M11.67 3.87L9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z"
              />
            </svg>
          </span>

          <h2 className="px-0 text-md ml-1">{title}</h2>

          <div className="ml-auto flex items-center">
            <button className="mr-2s" uxp-quiet="true"
                onClick={copyProps}
              >
              Copy
            </button>

            { webflow && 
              <button className="" uxp-quiet="true"
                onClick={handleExportToWebflow}
              >
                Export
              </button>
            }
          </div>
        </div>

        <SectionTitles currentSection={section} onChange={setSection} />
      </div>

      <div className="px-3">
        {section != "Presets" && schema && (
          <div className="mt-3">
            <ComponentFields
              schema={section == "Styles" ? theme.children : content}
              data={section == "Styles" ? data.theme : data}
              onChange={updateField}
            />
          </div>
        )}

        {section == "Presets" && Presets && <div className="-mx-12px"> <Presets /> </div> }

        {children}
      </div>
    </div>
  );
};

module.exports = ComponentPage;
