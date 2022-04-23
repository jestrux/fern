const React = require("react");
const { DEFAULT_COLORS } = require("../constants");
const { editDom } = require("../utils");
const colorDialog = require("../utils/CustomDialogs/Color");

const ColorList = ({
  colors = DEFAULT_COLORS,
  centerColors = false,
  selectedColor,
  small = true,
  choiceSize,
  spacing = 4,
  showCustomPicker = true,
  showTransparent,
  onChange,
}) => {
  if (colors && colors.length){
    if(showTransparent)
      colors = ["transparent", ...colors];

    if(!colors.includes(selectedColor))
      colors = [...colors, selectedColor];
  }

  function handleCustomColorChanged(color) {
    if (!color) return;
    console.log("Custom color selected: ", color);

    setTimeout(() => {
      editDom(() => onChange(color), false);
    }, 300);
  }

  let customColorIconSize = choiceSize;
  if (!choiceSize) customColorIconSize = small ? 12 : 14;
  customColorIconSize += 4;

  return (
    <div
      className={`flex flex-wrap items-center ${
        centerColors && "justify-center"
      }`}
      style={{ margin: `-${spacing}px` }}
    >
      {showCustomPicker && (
        <div
          title="Pick asset colour"
          className="flex center-center cursor-pointer rounded-full ml-2 mr-1"
          style={{ width: customColorIconSize, height: customColorIconSize }}
          onClick={() => colorDialog(handleCustomColorChanged)}
        >
          <svg height={customColorIconSize} viewBox="0 0 24 24">
            <path
              fill="#888"
              d="M12,2C6.49,2,2,6.49,2,12s4.49,10,10,10c1.38,0,2.5-1.12,2.5-2.5c0-0.61-0.23-1.2-0.64-1.67c-0.08-0.1-0.13-0.21-0.13-0.33 c0-0.28,0.22-0.5,0.5-0.5H16c3.31,0,6-2.69,6-6C22,6.04,17.51,2,12,2z M17.5,13c-0.83,0-1.5-0.67-1.5-1.5c0-0.83,0.67-1.5,1.5-1.5 s1.5,0.67,1.5,1.5C19,12.33,18.33,13,17.5,13z M14.5,9C13.67,9,13,8.33,13,7.5C13,6.67,13.67,6,14.5,6S16,6.67,16,7.5 C16,8.33,15.33,9,14.5,9z M5,11.5C5,10.67,5.67,10,6.5,10S8,10.67,8,11.5C8,12.33,7.33,13,6.5,13S5,12.33,5,11.5z M11,7.5 C11,8.33,10.33,9,9.5,9S8,8.33,8,7.5C8,6.67,8.67,6,9.5,6S11,6.67,11,7.5z"
            />
          </svg>
        </div>
      )}

      {colors.map((color, index) => {
        const selected = selectedColor == color;
        let size = choiceSize + "px";
        if (!choiceSize) size = small ? "12px" : "14px";
        const unselectedBgColor = color == "white" ? "#EEE" : "transparent";

        return (
          <div title={color} key={index} style={{ padding: spacing + "px" }}>
            <div
              className={`cursor-pointer rounded-full ${small ? "border" : "border-2"}`}
              style={{
                padding: "2px",
                borderColor: color == "transparent" ? selected ? "#bbb" : "#e7e7e7" : color,
                backgroundColor: selected ? unselectedBgColor : color,
              }}
              onClick={() => onChange(color)}
            >
              <div
                className="rounded-full overflow-hidden"
                style={{
                  width: size,
                  height: size,
                  backgroundColor: color,
                  borderColor: selected ? "white" : "transparent",
                }}
              >
                { color == "transparent" && ( 
                  <img className="bg-white w-full h-full object-cover" src="images/transparency.jpg" alt="" />
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

module.exports = ColorList;
