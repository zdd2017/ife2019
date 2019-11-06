import san from 'san'
import './style.css'

const MyApp = san.defineComponent({
    template: `
        <div>
            <p class="hello">Hello World!</p>
        </div>
    `
});

let myApp = new MyApp({
});
myApp.attach(document.body);