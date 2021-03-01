const jsonString = `
    {
        "list": [
        {
            "name": "Petr",
            "age": "20",
            "prof": "mechanic"
        },
        {
            "name": "Vova",
            "age": "60",
            "prof": "pilot"
        }
        ]
    }`;

const data = JSON.parse(jsonString);

const list = data.list;

list.forEach(element => {
    element.age = Number(element.age);
});

console.log(list);