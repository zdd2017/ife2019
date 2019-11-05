import san from 'san'

const MyApp = san.defineComponent({
    template: `
        <div>
            <p>Hello World!</p>
        </div>
    `
});

let myApp = new MyApp({
});
myApp.attach(document.body);