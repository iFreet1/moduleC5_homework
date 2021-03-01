console.log('xmlDOM');
const h1 = document.getElementById("h1_text");

h1.innerHTML = "123";


const parser = new DOMParser();

const XMLstring = `
    <list>
    <student>
        <name lang="en">
        <first>Ivan</first>
        <second>Ivanov</second>
        </name>
        <age>35</age>
        <prof>teacher</prof>
    </student>
    <student>
        <name lang="ru">
        <first>Петр</first>
        <second>Петров</second>
        </name>
        <age>58</age>
        <prof>driver</prof>
    </student>
    </list>`;

const xmlDOM = parser.parseFromString(XMLstring, 'text/xml');

// Получаем список студентов
const studentNodes = xmlDOM.querySelectorAll('student');

const list = [];

studentNodes.forEach(element => {
    const data = {
        name: `${element.querySelector('name').querySelector('first').textContent} ${element.querySelector('name').querySelector('second').textContent}`,
        age: Number(element.querySelector('age').textContent),
        prof: element.querySelector('prof').textContent,
        lang: element.querySelector('name').getAttribute('lang')
    }

    list.push(data);
});

console.log({list});
