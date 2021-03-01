// Находим элементы с которыми будем работать

const btnLoadImages = document.querySelector('.load-images');
const inputPage = document.querySelector('.input-page');
const inputLimit = document.querySelector('.input-limit');
const blockImages = document.querySelector('.block-images');
const spanError = document.querySelector('.span-error');

// Функция проверки введенного числа

function checkNumberInterval(pageNumber, limit) {
    let resultPageNumber = true; 
    let resultLimit = true;

    // Проверяем выходит ли за пределы номер страницы
    if (pageNumber < 1 || pageNumber > 10) {
        resultPageNumber = false;
    }

    // Проверяем выходит ли за пределы лимит
    if (limit < 1 || limit > 10) {
        resultLimit = false;
    } 

    if (!resultPageNumber && !resultLimit) {
        spanError.innerHTML = "Номер страницы и лимит вне диапазона от 1 до 10";
    } else if (!resultPageNumber) {
        spanError.innerHTML = "Номер страницы вне диапазона от 1 до 10";
    } else if (!resultLimit) {
        spanError.innerHTML = "Лимит вне диапазона от 1 до 10";
    } else {
        spanError.innerHTML = "";
    }

    return resultPageNumber && resultLimit;
}

function showImages(data) {
    let images = "";
    let localStorageData = [];

    if (data) {
        data.forEach(element => {
            const item = {
                download_url: element.download_url
            }

            localStorageData.push(item);

            images += 
                `<div>
                    <img src="${element.download_url}" width="300" height="300">
                </div>`;   
        });

        console.log(localStorageData);
        const ff = JSON.stringify(localStorageData);
        console.log(ff);

        localStorage.setItem('lastImages', JSON.stringify(localStorageData));
    }

    blockImages.innerHTML = images;
}

function getImages(url, pageNumber, limit) {
    url += `/list?page=${pageNumber}&limit=${limit}`;

    fetch(url)
        .then(response => response.json())
        .then(response => showImages(response)) 
        .catch((error) => {
            console.log("error:", error);
        });
}

btnLoadImages.addEventListener('click', () => {
    if (checkNumberInterval(inputPage.value, inputLimit.value)) {
        getImages(`https://picsum.photos/v2`, inputPage.value, inputLimit.value);
    }
});

showImages(JSON.parse(localStorage.getItem('lastImages')));