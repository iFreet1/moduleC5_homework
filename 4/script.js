// Находим элементы с которыми будем работать

const btnLoadImages = document.querySelector('.load-images');
const inputWidth = document.querySelector('.input-width');
const inputHeight = document.querySelector('.input-height');
const blockImages = document.querySelector('.block-images');
const spanError = document.querySelector('.span-error');

// Функция проверки введенного числа

function checkNumberInterval(value1, value2) {
    if ((value1 >= 100 && value1 <= 300) && (value2 >= 100 && value2 <= 300)) {
        spanError.innerHTML = "";
        return true;
    } else {
        spanError.innerHTML = "Одно из чисел вне диапазона от 100 до 300";
        return false;
    }
}

function getImages(url, width, height) {
    url = `${url}/${width}/${height}`;

    fetch(url)
        .then((response) => {
            console.log(response);
            const image = `<div class="block-photo">
                                <img src="${response.url}" width="${width}" height="${height}">
                            </div>`;
            blockImages.innerHTML = image;

            return response;
        })
        .catch((error) => {
            console.log("error:", error);
        });
}

btnLoadImages.addEventListener('click', () => {
    if (checkNumberInterval(inputWidth.value, inputHeight.value)) {
        getImages(`https://picsum.photos`, inputWidth.value, inputHeight.value);
    }
});