const { selection, Color, Text, SceneNode } = require("scenegraph");
const commands = require("commands");
const { insertNode, createText, createIcon, getGroupChildByName, createCircle } = require("../../utils");
const icons = require("../../data/icons");

function createCheckListItem({
    title = "Don't like meetings?",
    description = "Invite your entire team, so anyone can submit requests and track their progress.",
    theme,
}){
    const descriptionNode = createText(description, {
        name: "description",
        fill: theme.color,
        opacity: 0.75,
        fontSize: 18,
        lineSpacing: 30,
        width: theme.checklist.width,
    });
    
    insertNode(descriptionNode);

    const titleNode = createText(title, {
        name: "title",
        fill: theme.color,
        fontSize: 22,
        width: theme.checklist.width,
        fontStyle: "Medium",
    });
    
    insertNode(titleNode);

    selection.items = [titleNode, descriptionNode];
    commands.group();
    let textNode = selection.items[0];
    textNode.layout = {
        type: SceneNode.LAYOUT_STACK,
        stack: {
            orientation: SceneNode.STACK_VERTICAL,
            spacings: 8
        }
    }
    textNode.name = "text";

    const circle = createCircle(18, {
        fill: theme.checklist.iconColor || theme.color, // "#435CB0", // color, "#000", 
        opacity: theme.checklist.bgOpacity || 0.28
    });
    const icon = createIcon(icons["check-circle"], { 
        fill: theme.checklist.iconColor || theme.color, // "#435CB0", // color, "#333", 
        size: 18 
    });
    insertNode(circle);
    insertNode(icon);

    selection.items = [icon, circle];
    
    commands.alignHorizontalCenter();
    commands.alignVerticalCenter();
    commands.group();
    const iconNode = selection.items[0];
    
    selection.items = [iconNode, textNode];
    commands.alignTop();
    textNode.moveInParentCoordinates(0, 2);
    commands.group();
    
    const checklistItem = selection.items[0];
    checklistItem.layout = {
        type: SceneNode.LAYOUT_STACK,
        stack: {
            orientation: SceneNode.STACK_HORIZONTAL,
            spacings: 20
        }
    }

    return checklistItem;
}

function createChecklist({
    // checklist,
    ...props
} = {}) {
    const checklist = [
        {
            title: "Details, polish and speed",
            description: "Most requests are delivered in a day. The keen level of detail and polish we pack in will make you blush."
            // description: "Requests are delivered in a day, the level of detail will make you blush."
        },
        {
            title: "Completely async",
            description: "Don't like meetings? We don't either; so much so that we've outlawed them completely.",
            // description: "Don't like meetings? We don't either; so we outlawed them.",
        },
        {
            title: "Invite unlimited team members",
            description: "We realise that sometimes it takes a village, so bring on your entire team, so they can all contribute ideas and influence."
            // description: "We realise that sometimes it takes a village, bring your entire team."
        },
        {
            title: "Follow progress with ease",
            description: "Manage your design board using Trello. View active, queued and completed tasks with ease."
            // description: "Manage your design board using Trello, and easily adjust the direction."
        },
    ];

    const checklistItems = [...checklist];
    checklistItems.reverse();

    try {
        const checklistItemNode = createCheckListItem({
            ...props,
            ...checklistItems[0]
        });
        const checklistItemNodes = [checklistItemNode];
        selection.items = [checklistItemNode];

        for (let i = 1; i < checklistItems.length; i++) {
            commands.duplicate();
            const newItem = selection.items[0];
            selection.items = [newItem];
            checklistItemNodes.push(newItem);

            getGroupChildByName(newItem, "text", text => {
                getGroupChildByName(text, "title", titleNode => {
                    titleNode.text = checklistItems[i].title;
                });
                getGroupChildByName(text, "description", descriptionNode => {
                    descriptionNode.text = checklistItems[i].description;
                });
            });

        }

        selection.items = checklistItemNodes;
        commands.group();
        let checklistContent = selection.items[0];
        checklistContent.layout = {
            type: SceneNode.LAYOUT_STACK,
            stack: {
                orientation: SceneNode.STACK_VERTICAL,
                spacings: 34
            }
        }

        return checklistContent;
    } catch (error) {
        console.log("Error creating checklist: ", error);
    }
}

module.exports = createChecklist;