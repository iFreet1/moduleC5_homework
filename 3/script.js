// Находим элементы с которыми будем работать

const btnLoadImages = document.querySelector('.load-images');
const inputField = document.querySelector('.input-data');
const blockImages = document.querySelector('.block-images');
const spanError = document.querySelector('.span-error');

// Функция проверки введенного числа

function checkNumberInterval(value) {
    if (value > 1 && value <= 10) {
        spanError.innerHTML = "";
        return true;
    } else {
        spanError.innerHTML = "Число вне диапазона от 1 до 10";
        return false;
    }
}

// Функция получения изображений с сервера

function getImages(url, callback) {
    let xhr = new XMLHttpRequest();

    xhr.open('GET', url, true);
    xhr.onload = function() {
        if (xhr.status != 200) {
            console.log("Ответ сервера:", xhr.status);
        } else {
            const response = JSON.parse(xhr.response);

            if (callback) { 
                callback(response);
            }
        }
    }

    xhr.onerror = function() {
        console.log(`Ошибка! (${xhr.status})`);
    }

    xhr.send();
}

// Функция отображения изображений

function showImages(imagesData) {
    let images = '';

    imagesData.forEach(element => {
        images += `
            <div class="block-photo">
                <img src="${element.download_url}" width="200" height="200">
            </div>`;
    });

    blockImages.innerHTML = images;
}

btnLoadImages.addEventListener('click', () => {
    if (checkNumberInterval(inputField.value)) {
        getImages(`https://picsum.photos/v2/list?limit=${inputField.value}`, showImages);
    }
});