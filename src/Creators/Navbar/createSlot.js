const { selection, SceneNode, Rectangle, Color } = require("scenegraph");
const commands = require("commands");
const { placeInParent, insertNode, getPadding } = require("../../utils");
const navMenuComponent = require("./components/menu");
const navLogoComponent = require("./components/logo");
const navDpComponent = require("./components/dp");
const navSearchInputComponent = require("./components/searchInput");
const navButtonsComponent = require("./components/buttons");
const createSocialMediaIcons = require("../SocialMediaIcons/createIcons");

function createNavSlot(props, components = {}) {
  props.iconOpacity = props.inActiveOpacity;
  const {
    leftLogoImage,
    middleLogoImage,
    leftLogoSearchQuery,
    middleLogoSearchQuery,
    dpImage,
    dpSearchQuery,
  } = props;

  const componentMap = {
    logo: () => navLogoComponent({
      image: props.alignment == "center" ? middleLogoImage : leftLogoImage,
      searchQuery: props.alignment == "center" ? middleLogoSearchQuery : leftLogoSearchQuery,
    }),
    menu: navMenuComponent,
    dp: () => navDpComponent({
      image: dpImage,
      searchQuery: dpSearchQuery
    }),
    socials: (props, icons) => createSocialMediaIcons({
      ...props.theme, 
      ...props.theme.socials,
      icons
    }),
    search: navSearchInputComponent,
    buttons: (props, buttons) => navButtonsComponent({
      ...props,
      ...props.theme.buttons,
      themeColor: props.theme.buttons.themeColor,
    }, buttons),
  };

  try {
    const { width, height, container, alignment = "left" } = props;

    let slot;

    const slotBg = new Rectangle();
    slotBg.resize(width / 2, height);
    insertNode(slotBg);

    const componentsAvailable = components && Object.keys(components).length;
    const validComponents = !componentsAvailable
      ? null
      : Object.fromEntries(
          Object.entries(components).filter(
            ([key, value]) => value && componentMap[key]
          )
        );

    if (validComponents && Object.keys(validComponents).length) {
      const placeholder = new Rectangle();
      placeholder.resize(1, height);
      insertNode(placeholder);
      placeholder.name = "Placeholder";

      const content = Object.entries(validComponents)
        .reverse()
        .map(([component, data]) => componentMap[component](props, data));

      selection.items = [slotBg, placeholder, ...content];
      commands.alignVerticalCenter();

      // if(alignment == "left")
      //     commands.alignLeft();
      // else
      //     commands.alignRight();

      selection.items = [...content, placeholder];
      commands.bringToFront();
      commands.group();

      const slotContent = selection.items[0];
      if (slotContent.children.length > 1) {
        slotContent.layout = {
          type: SceneNode.LAYOUT_STACK,
          stack: {
            orientation: SceneNode.STACK_HORIZONTAL,
            spacings: 24,
          },
        };
      }
      slotContent.name = "FernNavSlotContent";

      selection.items = [slotBg, slotContent];
      commands.group();

      slot = selection.items[0];

      slot.layout = {
        type: SceneNode.LAYOUT_PADDING,
        padding: {
          background: slot,
          values: getPadding(0, 0, 0, 30),
        },
      };
    } else {
      const placeholder = new Rectangle();
      placeholder.name = "Placeholder";
      placeholder.resize(1, height);
      insertNode(placeholder);
      selection.items = [placeholder];
      commands.group();
      const slotContent = selection.items[0];
      slotContent.name = "FernNavSlotContent";

      selection.items = [slotBg, slotContent];
      commands.group();

      slot = selection.items[0];
      slot.layout = {
        type: SceneNode.LAYOUT_PADDING,
        padding: {
          background: placeholder,
          values: getPadding(0, 0, 0, 30),
        },
      };
    }

    const { x, y } = container.topLeftInParent;
    const slotPlacement = { x, y };

    if (alignment == "right")
      slotPlacement.x =
        container.localBounds.width - slot.localBounds.width + x;
    // else if (alignment == "center")
    //   slotPlacement.x =
    //     container.localBounds.width / 2 - slot.localBounds.width / 2 + x;

    placeInParent(slot, slotPlacement);

    return slot;
  } catch (error) {
    console.log("Error creating slot: ", error);
  }
}

module.exports = createNavSlot;
