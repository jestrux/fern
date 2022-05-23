const buttonPresets = {
    "rounded-search": {
        props: {"icon":"search","text":"Find houses ","theme":{"iconPlacement":"left","size":"sm","color":"black","shadow":false,"style":"fill","roundness":"full"},"name":"FernButton","editorSection":"Content","type":"Button"},
        height: 35,
        fullWidth: true,
    },
    "flat-play": {
        props: {"icon":"play","text":"Watch intro video","theme":{"iconPlacement":"left","size":"sm","color":"#f44663","shadow":false,"style":"outline","roundness":"none"},"name":"FernButton","editorSection":"Content","type":"Button"},
        height: 35,
        fullWidth: true,
    },
    "link": {
        props: {"icon":"chevron-right","text":"Learn more","theme":{"iconPlacement":"right","size":"sm","color":"#007bff","shadow":false,"style":"flat","roundness":"none"},"name":"FernButton","editorSection":"Content","type":"Button"},
        height: 40
    },
    "shadow-send": {
        props: {"icon":"send","text":"Send","theme":{"iconPlacement":"right","size":"xs","color":"white","shadow":true,"style":"fill","roundness":"md"},"name":"FernButton","editorSection":"Content","type":"Button"},
        height: 60
    },
    "fab": {
        props: {"icon":"add","text":"","theme":{"iconPlacement":"right","size":"lg","color":"#ffc107","shadow":true,"style":"fill","roundness":"full"},"name":"FernButton","editorSection":"Content","type":"Button"},
        height: 55
    },
    "outline-chevy": {
        props: {"icon":"chevron-right","text":"","theme":{"iconPlacement":"right","size":"lg","color":"black","shadow":true,"style":"outline","roundness":"full"},"name":"FernButton","editorSection":"Content","type":"Button"},
        height: 40
    },
}

module.exports = buttonPresets;