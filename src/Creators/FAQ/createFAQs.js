const { selection, Color, Text, SceneNode } = require("scenegraph");
const commands = require("commands");
const { insertNode, createText, createIcon, getGroupChildByName, createCircle, createBorder, placeInParent, parseMarkdownText, resizeIcon } = require("../../utils");
const icons = require("../../data/icons");

function createFAQItem({
    title = "Don't like meetings?",
    description = "Invite your entire team, so anyone can submit requests and track their progress.",
    theme,
}){
    const border = {
        color: theme.color,
        thickness: 1.5,
        opacity: 0.15,
    };
    const borderNode = createBorder({
        width: theme.faqs.width + 50,
        color: border.color || color,
        thickness: border.thickness || 1.5,
    });
    borderNode.opacity = border.opacity || 0.1;
    insertNode(borderNode);

    const iconName = theme.faqs.expandIcon.type == "plus" ? "add" : "chevron-down";
    const iconNode = createIcon(icons[iconName], { 
        fill: theme.color,
        opacity: 0.45,
        size: 18 
    });
    insertNode(iconNode);

    const descriptionNode = createText(description, {
        name: "description",
        fill: theme.color,
        fontSize: 20,
        lineSpacing: 38,
        width: theme.faqs.width + 50,
        opacity: 0.9, // 0.8,
    });
    
    insertNode(descriptionNode);

    const titleNode = createText(title, {
        name: "title",
        fill: theme.color,
        lineSpacing: 40,
        width: theme.faqs.width,
        fontSize: 28, // 32
        fontStyle: "Medium", // Light
    });
    
    insertNode(titleNode);

    selection.items = [titleNode, descriptionNode];
    commands.group();
    let textNode = selection.items[0];
    textNode.layout = {
        type: SceneNode.LAYOUT_STACK,
        stack: {
            orientation: SceneNode.STACK_VERTICAL,
            spacings: 16
        }
    }
    textNode.name = "text";
    
    selection.items = [iconNode, textNode];
    commands.alignTop();
    commands.alignLeft();
    iconNode.moveInParentCoordinates(theme.faqs.width + (50 - 18), 6);
    commands.group();
    
    const faqItem = selection.items[0];
    faqItem.name = "content";

    selection.items = [faqItem, borderNode];
    commands.alignLeft();
    commands.group();

    const faqItemWithBorder = selection.items[0];
    faqItemWithBorder.layout = {
        type: SceneNode.LAYOUT_STACK,
        stack: {
            orientation: SceneNode.STACK_VERTICAL,
            spacings: 36
        }
    }

    return faqItemWithBorder;
}

function createFAQs({
    // faqs,
    ...props
} = {}) {
    const faqs = [
        {
            title: "How do I know when I need damage protection vs liability insurance?",
            description: "Host damage protection covers you if your place or belongings ever get damaged by a guest during a stay. Host liability insurance applies in the rare event that a guest gets hurt during a stay or Experience."
        },
        {
            title: "I need to get reimbursed for damage. How do I do it?",
            description: "If a guest has damaged your place or belongings, visit our Resolution Center to submit a reimbursement request. If a guest has been injured, complete the _liability insurance intake form_.",
        },
        {
            title: "How long does it take to get reimbursed for damage?",
            description: "We always resolve damage reimbursement requests as quickly as possible. It typically takes two weeks from the time you file a request for your payment to be issued."
        },
        {
            title: "Can I host with someone else?",
            description: "If you want to host with one other person, make sure their name is mentioned on your experience listing so that guests know who they'll be with. They'll also need to have an *active* and *verified* profile."
        },
        {
            title: "Do I need a business license?",
            description: "Depending on activities involved, certain experiences may require a business license. Make sure to check local laws in your area to determine which licenses may be required for your experience, especially if there is food, alcohol, or transportation involved. _Learn more_."
        },
    ];

    let expandedItems = [];
    if(props.faqs.expandedQuestions)
        expandedItems = props.faqs.expandedQuestions.split(",").map(q => q).filter(q => q != undefined);

    const faqItems = [...faqs];

    try {
        const faqItemNode = createFAQItem({
            ...props,
            ...faqItems[0]
        });
        const faqItemNodes = [faqItemNode];
        selection.items = [faqItemNode];

        for (let i = 0; i < faqItems.length; i++) {
            commands.duplicate();
            const newItem = selection.items[0];
            selection.items = [faqItemNode];
            faqItemNodes.push(newItem);

            const isOpen = faqItems[i].open || expandedItems.includes((i + 1).toString());

            getGroupChildByName(newItem, "content", content => {
                getGroupChildByName(content, "text/title", titleNode => {
                    titleNode.text = faqItems[i].title;
                });

                getGroupChildByName(content, "text/description", descriptionNode => {
                    if(isOpen) {
                        const {styleRanges, text: formattedText} = parseMarkdownText(faqItems[i].description);
                        descriptionNode.text = formattedText;

                        if(styleRanges)
                            descriptionNode.styleRanges = styleRanges;
                    }
                    else
                        descriptionNode.removeFromParent();
                });

                if(isOpen) {
                    getGroupChildByName(content, "icon", icon => {
                        const iconName = props.theme.faqs.expandIcon.type == "plus" ? "remove" : "chevron-up";
                        icon.pathData = icons[iconName];
                        resizeIcon(icon, 18);

                        // if(icon.localBounds.x > 0)
                        //     icon.moveInParentCoordinates(-icon.localBounds.x, 0);
                    });
                }
            });
        }

        selection.items = faqItemNodes;
        commands.group();

        faqItemNode.removeFromParent();

        let faqContent = selection.items[0];
        faqContent.layout = {
            type: SceneNode.LAYOUT_STACK,
            stack: {
                orientation: SceneNode.STACK_VERTICAL,
                spacings: 36
            }
        }

        return faqContent;
    } catch (error) {
        console.log("Error creating faqs: ", error);
    }
}

module.exports = createFAQs;