const container = document.getElementById('container');

function addItem(event) {
    const item = document.createElement('div');
    item.className = 'item';
    item.innerHTML = container.children.length + 1;
    container.appendChild(item);
}

function removeItems(event) {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}

function changeFlexDirectionProperty(event) {
    const value = event.currentTarget.value;
    console.log(`flex-direction is set to ${value}`);
    container.style.flexDirection = value;
}

function changeJustifyContentProperty(event) {
    const value = event.currentTarget.value;
    console.log(`justify-content is set to ${value}`);
    container.style.justifyContent = value;
}

function changeAlignItemsProperty(event) {
    const value = event.currentTarget.value;
    console.log(`align-items is set to ${value}`);
    container.style.alignItems = value;
}

document.getElementById('add-item-btn').addEventListener('click', addItem);
document.getElementById('remove-items-btn').addEventListener('click', removeItems);
document.getElementById('flex-direction-select').addEventListener('change', changeFlexDirectionProperty);
document.getElementById('justify-content-select').addEventListener('change', changeJustifyContentProperty);
document.getElementById('align-items-select').addEventListener('change', changeAlignItemsProperty);
