let comp_prop = "l";
let two = "";

function renderTest(props = {}) {
    return `
    <p>component</p>    <p>${props.comp_prop !== undefined ? props.comp_prop : comp_prop}</p>    <p>${props.two !== undefined ? props.two : two}</p>
    `;
}
const Test = renderTest;
let wow = "string state thin";
let count = 0;
let onClick = "increase_count";
function increase_count() {
count += 1
render();
}
window.increase_count = increase_count;

function renderApp(props = {}) {
    return `
    <h1>Titleee</h1><p>${props.wow !== undefined ? props.wow : wow}</p><p>Count: ${props.count !== undefined ? props.count : count}</p><button onclick="increase_count()">Click me</button>${Test({comp_prop:"This is a prop",two:"This is another prop"})}
    `;
}

function render() {
    const app = document.getElementById('app');
    app.innerHTML = renderApp();
}

document.addEventListener('DOMContentLoaded', () => {
    render();
});
