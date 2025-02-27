// Змінити title файлу
titleForm.addEventListener('submit', function (event) {
    // Зупинка стандартної події відправки форми
    event.preventDefault();

    // Ваш JavaScript-код для обробки форми тут
    saveTitle.addEventListener('click', function () {
        document.title = newTitle.value;
    })
});

// 1.4143 1.3809
// Розмір та розташування sheet і textarea
let sheet = document.getElementById('sheet');
let sheetSize = sheet.getBoundingClientRect();
let sheetHeight = sheetSize.width * 1.4143
let sheetWidth = sheetSize.width;
sheet.style.height = sheetHeight + "px";

main.style.height = sheetSize.width * 1.4143 + 80 + "px"
let IsInputClick = false;
// Додавання тексту в sheet
document.addEventListener('keydown', function (event) {
    var newElement;
    let br;
    if (IsInputClick === false) {
        if (event.key.length === 1 && !event.ctrlKey) {

            newElement = document.createElement('span');
            if (event.key === ' ' || event.code === 'Space') {
                event.preventDefault();
                newElement.innerHTML = '&nbsp;';
            } else {
                newElement.textContent = event.key;
            }
            sheet.insertBefore(newElement, sheet.children[curentCaret + 1]);

        }
        if (event.key === 'Backspace' && !event.ctrlKey) {
            if (sheet.children[0] && sheet.children[0] != caretID) {
                if (selectionStartIndex != -1) {
                    for (let i = selectionEndIndex; i > selectionStartIndex - 1; i--) {
                        sheet.removeChild(allChildren[i]);
                        newElement = allChildren[selectionStartIndex - 1]
                    }
                    selectionStartIndex = -1;
                } else {
                    sheet.removeChild(allChildren[curentCaret]);
                    newElement = allChildren[curentCaret - 1]
                }
            }
        }
        if (event.key === 'Enter') {
            newElement = document.createElement('span');
            newElement.innerHTML = '<br>';
            sheet.insertBefore(newElement, sheet.children[curentCaret + 1]);
        }
        if (!event.ctrlKey && event.key !== 'Control') {
            setCaret(newElement);
        }
    }

    // if (event.key.length === 1 || event.key === 'Enter' || event.key === 'Backspace' || event.key === ' ' || event.code === 'Space' && event.key !== 'Control') {

})

// document.addEventListener('keydown', function (event) {
//     if (!event.key && event.key !== 'Control') {
//         setCaret(caretID);
//     }
// })

// // Додати обробник події для Ctrl + V (вставка)
document.addEventListener('paste', function (event) {
    event.preventDefault();
    pasteFromClipboard();
});
// Додати обробник події для Ctrl + C (копіювання)
document.addEventListener('copy', function (event) {
    event.preventDefault();
    copyToClipboard();
});
// Додати обробник події для Ctrl + X (вирізання)
document.addEventListener('cut', function (event) {
    event.preventDefault();
    cutToClipboard();
});

// Функція для вставки тексту
function pasteFromClipboard() {
    // Отримуємо текст з буферу обміну
    navigator.clipboard.readText().then(function (pastedText) {
        // Отримуємо елемент div за його ідентифікатором
        var sheetDiv = document.getElementById("sheet");
        for (let i = pastedText.length - 1; i >= 0; i--) {
            newElement = document.createElement('span');
            newElement.innerHTML = pastedText[i];
            sheetDiv.insertBefore(newElement, sheet.children[curentCaret + 1]);
        }
    })
}
// Функція для копіювання тексту
function copyToClipboard() {
    // Отримання виділеного тексту
    var selection = window.getSelection();
    var selectedText = selection.toString();
    // Копіювання виділеного тексту в буфер обміну
    if (selectedText) {
        navigator.clipboard.writeText(selectedText).then(function (pastedText) { });
    }
}
// Функція для вирізання тексту
function cutToClipboard() {
    // Отримання виділеного тексту
    var selection = window.getSelection();
    var selectedText = selection.toString();
    // Копіювання виділеного тексту в буфер обміну
    if (selectedText) {
        navigator.clipboard.writeText(selectedText).then(function (pastedText) { });
    }
    if (selectionStartIndex != -1) {
        for (let i = selectionEndIndex; i > selectionStartIndex - 1; i--) {
            sheet.removeChild(sheet.children[i]);
            newElement = document.getElementById('caretID');
        }
    }
    selection = "";
    selectedText = "";
    selectionStartIndex = -1;
    selectionEndIndex = -1;
}

// Перший та сотаній індекс виділеного тексту
let selectionStartIndex = -1;
let selectionEndIndex = -1;
// Всі діти sheet
var allChildren = sheet.children;
var selection = window.getSelection();

// Отримати виділений текст
function getSelectedElementsInDiv() {
    // var specificDiv = document.getElementById('sheet'); // Замініть 'yourSpecificDivId' на реальний ID вашого div
    if (selection.rangeCount > 0) {
        var range = selection.getRangeAt(0);

        // Перевірити, чи виділені елементи входять в конкретний div
        var isSelectionInDiv = sheet.contains(range.startContainer) && sheet.contains(range.endContainer);

        if (isSelectionInDiv) {
            let selectionStartElement = range.startContainer.nodeType === 3 ? range.startContainer.parentElement : range.startContainer;
            let selectionEndElement = range.endContainer.nodeType === 3 ? range.endContainer.parentElement : range.endContainer;

            selectionStartIndex = Array.from(allChildren).indexOf(selectionStartElement);
            selectionEndIndex = Array.from(allChildren).indexOf(selectionEndElement);
            if (selectionEndIndex < selectionStartIndex) {
                [selectionStartIndex, selectionEndIndex] = [selectionEndIndex, selectionStartIndex];
            }

            // console.log("Перший елемент:", selectionStartIndex);
            // console.log("Останній елемент:", selectionEndIndex);
        }
    } else {
        // Якщо виділення відсутнє
        // selectionStartIndex = -1;
        // selectionEndIndex = -1;
    }
}

let fontFont;
let fontFont1 = Number;
let fontSizeArr = [];
let fontFamilyArr = [];
let boldArr = [];
let italicArr = [];
let underlineArr = [];
let lineThroughArr = [];
let subArr = [];
let superArr = [];
let arrForStyleArr = [fontSizeArr, fontFamilyArr];
let selectedTextStyleArr = ['fontSize', 'fontFamily'];
let toggleClassListArr = [boldArr, italicArr, underlineArr, lineThroughArr, subArr, superArr];
let isToggleClassList = ['bold', 'italic', 'underline', 'lineThrough', 'subButton', 'superButton'];

function getSelectedTextStyle() {
    if (selection.rangeCount > 0) {
        console.log('selection.rangeCount > 0')
        for (let i = selectionStartIndex; i <= selectionEndIndex; i++) {
            let computedStyle = window.getComputedStyle(sheet.children[i]);
            // Вкладений цикл для проходження по всіх стилях у selectedTextStyleArr
            for (let j = 0; j < selectedTextStyleArr.length; j++) {
                let styleName = selectedTextStyleArr[j];

                // Додаємо значення кожного стилю до відповідного масиву
                arrForStyleArr[j].push(computedStyle[styleName]);
            }
            // Вкладений цикл для проходження по всіх стилях у selectedTextStyleArr
            for (let h = 0; h < isToggleClassList.length; h++) {
                if (sheet.children[i].classList.contains(isToggleClassList[h]) || sheet.classList.contains(isToggleClassList[h])) {
                    // Додаємо значення кожного стилю до відповідного масиву
                    toggleClassListArr[h].push(true);
                } else {
                    toggleClassListArr[h].push(false);
                }
            }
        }
        // console.log(boldArr);
        // console.log(fontSizeArr);
        // console.log(fontFamilyArr);
    } else {
        // Якщо виділення відсутнє
        // selectionStartIndex = -1;
        // selectionEndIndex = -1;
    }

    if (fontSizeArr.every(value => value === fontSizeArr[0])) {
        inputSize.value = fontSizeArr[0];
        console.log("a", fontSizeArr[0], fontSizeArr)
        //                                   ERROR
        fontFont = fontSizeArr[0].replace("px", ' ');
        fontFont1 = Number(fontFont) * 0.7;
    } else { inputSize.value = "";
        console.log("b", fontSizeArr[0], fontSizeArr)}

    if (fontFamilyArr.every(value => value === fontFamilyArr[0])) {
        searchFont.value = fontFamilyArr[0];
    } else { searchFont.value = ""; }

    for (let i = 0; i < toggleClassListArr.length - 1; i++) {
        if (toggleClassListArr[i].every(value => value === toggleClassListArr[i][0] && toggleClassListArr[i][0] === true)) {
            document.getElementById(isToggleClassList[i]).classList.add('isUsed')
            console.log(toggleClassListArr[i][0]);
        }
        else {
            document.getElementById(isToggleClassList[i]).classList.remove('isUsed')
        }
    }



    // // Очистіть масиви після використання

    for (let i = 0; i < arrForStyleArr.length; i++) {
        for (let j = arrForStyleArr[i].length; j > 0; j--) {
            arrForStyleArr[i].pop();
        }
        // arrForStyleArr[i] = [];
        for (let h = toggleClassListArr[i].length; h > 0; h--) {
            toggleClassListArr[i].pop();

        }
    }

}



// очистити startIndex та EndIndex
document.addEventListener('click', function (event) {
    console.log("Tatg name is", event.target.tagName)

    if (event.target.tagName === 'INPUT') {
        console.log("input is clicked", "IsInputClick =", IsInputClick)
        IsInputClick = true;
    }
    else {
        IsInputClick = false;
    }

    if (selection == "" && IsInputClick === false) {
        selectionStartIndex = -1;
        selectionEndIndex = -1;
    }

    // Зміна тексту в полі вводу розміру шрифта
    // if (inputSize.value === "") {
    //     inputSize.value = presentSize + "px";
    // } else {
    //     inputSize.value = numbersOnly + "px";
    // }

    // Зміна тексту в полі вводу розміру відступу
    if (inputBound.value === "") {
        inputBound.value = presentPaddingSize + "px";
    } else {
        inputBound.value = paddingNumbersOnly + "px";
    }
})

// Викликати функцію при виділенні тексту
document.addEventListener('selectionchange', getSelectedElementsInDiv);
document.addEventListener('mouseup', (event) => {
    if (sheet.children[0] && sheet.children[0] != caretID && sheet.contains(event.target)) {
        getSelectedTextStyle();
    }
});

// Застосування стилів для виділеного тексту
function applySelectedTextStyle(style, value, isToggle) {
    if (isToggle) {
        for (let i = selectionStartIndex; i < selectionEndIndex + 1; i++) {
            allChildren[i].classList.toggle(style);
        }
        for (let i = 0; i < toggleClassListArr.length; i++) {
            // document.getElementById(isToggleClassList[i]).classList.add('isUsed');
            // document.getElementById(style).classList.add('isUsed');
        }
    } else {
        for (let i = selectionStartIndex; i < selectionEndIndex + 1; i++) {
            allChildren[i].style[style] = value;
        }

    }
}



// Список з усіма кольрами з кнопок
let allColorFromButton = [];
document.querySelectorAll('#colorDropdownMenu .grid button').forEach(el => {
    allColorFromButton.push(el.textContent);
})
let colorCounter = 0;
// Застосування кольорів для виділеного тексту
function applySelectedTextColor(style, value, isUserColor, selection) {
    let newColor;
    if (isUserColor) {
        newColor = `.newColor${colorCounter}{ ${style}: ${value};}`;
        console.log(newColor);
    } else {
        newColor = `.${value}{ ${style}: ${value};}`;
    }

    // Отримання перший аркуш стилів на сторінці
    var styleSheet = document.styleSheets[0];
    // Додавання нового правила стилів до аркуша
    styleSheet.insertRule(newColor, styleSheet.cssRules.length);
    if (selection) {
        if (isUserColor) {
            for (let i = selectionStartIndex; i < selectionEndIndex + 1; i++) {
                if (allChildren[i].classList.contains(`newColor${colorCounter - 1}`)) {
                    allChildren[i].classList.remove(`newColor${colorCounter - 1}`);
                }
                allChildren[i].classList.add(`newColor${colorCounter}`);
            }
        } else {
            for (let i = selectionStartIndex; i < selectionEndIndex + 1; i++) {
                if (allChildren[i].classList.contains(`newColor${colorCounter - 1}`)) {
                    allChildren[i].classList.remove(`newColor${colorCounter - 1}`);
                }
                allChildren[i].classList.add(value);
            }
        }
    } else {
        if (isUserColor) {
            for (let i = 0; i < allChildren.length; i++) {
                if (allChildren[i].classList.contains(`newColor${colorCounter - 1}`)) {
                    allChildren[i].classList.remove(`newColor${colorCounter - 1}`);
                }
                allChildren[i].classList.add(`newColor${colorCounter}`);
            }
        } else {
            for (let i = 0; i < allChildren.length; i++) {
                for (let j = 0; j < array.length; j++) {
                    if (allChildren[i].classList.contains(allColorFromButton[j])) {
                        allChildren[i].classList.remove(`newColor${colorCounter - 1}`);
                    }
                }
                allChildren[i].classList.add(value);
            }
        }

    }

    colorCounter++;
}

// Встановити каретку
let curentCaret = -1;
function setCaret(lastElement) {
    var clickedElement;
    if (lastElement) {
        clickedElement = lastElement;
        console.log(" ");
    }
    // else if(lastElement === 'inputSize'){ clickedElement = false}
    else {
        clickedElement = sheet.lastElementChild;
        console.log("  ");
    }

    // Перевірка, чи клікнуто на елемент span
    if (clickedElement.tagName === 'SPAN') {
        // Отримання індексу елемента
        curentCaret = Array.from(allChildren).indexOf(clickedElement);
        if (document.getElementById('caretID')) {
            sheet.removeChild(caretID)
        }
        let caret = document.createElement('span');
        caret.textContent = "|"
        caret.id = 'caretID'
        sheet.insertBefore(caret, sheet.children[curentCaret + 1])
        // console.log("Індекс елемента:", curentCaret);
    } else {
        if (document.getElementById('caretID')) {
            sheet.removeChild(caretID)
        }
        let caret = document.createElement('span');
        caret.textContent = "|"
        caret.id = 'caretID'
        sheet.appendChild(caret)
    }
}
sheet.addEventListener('click', function (event) {
    if (sheet.children.length != 0) {
        if (event.target.tagName === 'SPAN') {
            setCaret(event.target);
        } else {
            setCaret(sheet.children[sheet.children.length - 1])
        }
    } else {
        setCaret(event.target);
    }

});

// insertAfter
function insertAfter(newNode, existingNode) {
    existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
}



// Сховати dropdownMenu при кліці на документ
// const dropdownArr = [
//     'fontDropdown',
//     'sizeText',
//     'colorDropdown',
//     'bgColorDropdown',
//     'registerDropdown',
//     'boundDropdown',
//     'orientationDropdown',
//     'ratioDropdown']
// const dropdownContainerArr = [
//     'fontDropdownMenu',
//     'sizeDropdownMenu',
//     'colorDropdownMenu',
//     'bgColorDropdownMenu',
//     'registerDropdownMenu',
//     'boundDropdownMenu',
//     'orientationDropdownMenu',
//     'ratioDropdownMenu']
document.addEventListener('click', function (event) {
    if (!fontDropdown.contains(event.target)) {
        fontDropdownMenu.classList.remove('show');
    }
    if (!sizeText.contains(event.target)) {
        sizeDropdownMenu.classList.remove('show');
    }
    if (!colorDropdown.contains(event.target)) {
        colorDropdownMenu.classList.remove('show');
    }
    if (!bgColorDropdown.contains(event.target)) {
        bgColorDropdownMenu.classList.remove('show');
    }
    if (!registerDropdown.contains(event.target)) {
        registerDropdownMenu.classList.remove('show');
    }
    if (!boundDropdown.contains(event.target)) {
        boundDropdownMenu.classList.remove('show');
    }
    if (!orientationDropdown.contains(event.target)) {
        orientationDropdownMenu.classList.remove('show');
    }
    if (!ratioDropdown.contains(event.target)) {
        ratioDropdownMenu.classList.remove('show');
    }
    let allButtonDropdown = document.querySelectorAll('.dropdown-toggle')
    allButtonDropdown.forEach((el) => {
        el.classList.remove('show');
    })
    // for (let i = 0; i < dropdownArr.length; i++) {
    //     const dropdown = `#${dropdownArr[i]}`;
    //     const dropdownMenu = `#${dropdownArr[i]}`;
    //     console.log(dropdown);
    //     if (!dropdown.contains(event.target)) {
    //         dropdownMenu.classList.remove('show');
    //     }
    // }
})
// Показати dropdownMenu при кліці на поле пошуку шрифта
searchFont.addEventListener('click', function () {
    fontDropdownMenu.classList.add('show');
    fontDropdownMenu.style = "position: absolute; inset: 0px 0px auto auto; margin: 0px; transform: translate(0px, 33px);"
})
inputSize.addEventListener('click', function () {
    sizeDropdownMenu.classList.add('show');
    sizeDropdownMenu.style = "position: absolute; inset: 0px 0px auto auto; margin: 0px; transform: translate(0px, 33px);"
})



// Змінити шрифт тексту
let fonts = ["Arial",
    "Calibri",
    "Comic Sans MS",
    "Courier New",
    "Georgia",
    "Helvetica",
    "Palatino",
    "Tahoma",
    "Times New Roman",
    "Verdana",
    "Futura",
    "Garamond",
    "Gill Sans",
    "Impact",
    "Lobster",
    "Lucida Console",
    "Monaco",
    "Open Sans",
    "Roboto",
    "Source Sans Pro",
    "Trebuchet MS",
    "Ubuntu",
    "Varela Round",
    "Webdings",
    "Yanone Kaffeesatz",
    "Zilla Slab",
    "Century Gothic",
    "Didot",
    "Elephant",
    "Franklin Gothic Medium"];
let presentFont = "Calibri";
for (let i = 0; i < fonts.length; i++) {
    let font = document.createElement('li');
    font.classList.add('dropdown-item')
    font.id = `font${i}`;
    font.innerHTML = fonts[i];
    font.style.fontFamily = fonts[i];
    fontDropdownMenu.appendChild(font);

    // Змінити шрифт тексту

    font.addEventListener('click', function () {
        if (selectionStartIndex !== -1) {
            presentFont = fonts[i];
            applySelectedTextStyle("fontFamily", presentFont, false);
        }
        // else {
        //     sheet.style.fontFamily = fonts[i];
        //     searchFont.value = fonts[i];
        //     searchFont.style.fontFamily = fonts[i];
        //     presentFont = fonts[i];
        // }
    })
}

// Пошук шрифта
searchFont.value = "Calibri";
searchFont.style.fontFamily = "Calibri"
sheet.style.fontFamily = "Calibri";

searchFont.oninput = function () {
    let val = this.value.trim();
    let elasticItems = document.querySelectorAll('#fontDropdownMenu li');
    if (val != '') {
        elasticItems.forEach(function (elem) {
            if (elem.innerText.search(val) == -1) {
                elem.classList.add('hidden');
            }
            else {
                elem.classList.remove('hidden');
            }
        });
    }
    else {
        elasticItems.forEach(function (elem) {
            elem.classList.remove('hidden');
        });
    }
}


// Змінити розмір тексту
let sizes = [12, 14, 16, 18, 20, 22, 24, 26, 28, 36, 48, 72]
let presentSize = 14;
for (let i = 0; i < sizes.length; i++) {

    let size = document.createElement('li');
    size.id = `size${i}`;
    size.classList.add('dropdown-item')
    size.innerHTML = sizes[i] + 'px';
    sizeDropdownMenu.appendChild(size);

    // Змінити Розмір тексту
    size.addEventListener('click', function () {
        if (selectionStartIndex != -1) {
            presentSize = sizes[i];
            applySelectedTextStyle('fontSize', presentSize + "px", false)
        }
        // else {
        //     sheet.style.fontSize = sizes[i] + "px";
        //     inputSize.value = sizes[i];
        //     presentSize = sizes[i];
        // }
    })
}
// Ввід розміра тексту
inputSize.value = "16px";
sheet.style.fontSize = 16 + 'px';
var numbersOnly = inputSize.value.replace(/\D/g, '');
let presentInputSize = 16;
inputSize.oninput = () => {
    presentInputSize = numbersOnly;
    numbersOnly = inputSize.value.replace(/\D/g, '');
    // sheet.style.fontSize = numbersOnly + "px";
    applySelectedTextStyle('fontSize', numbersOnly + "px", false)
}

// Жирний текст
bold.addEventListener('click', function () {
    if (selectionStartIndex != -1) { applySelectedTextStyle('bold', '', true) }
    else { sheet.classList.toggle('bold'); }
})
// Текст курсивом
italic.addEventListener('click', function () {
    if (selectionStartIndex != -1) { applySelectedTextStyle('italic', '', true) }
    else { sheet.classList.toggle('italic'); }
})
// Підкреслений текст
underline.addEventListener('click', function () {
    if (selectionStartIndex != -1) { applySelectedTextStyle('underline', '', true) }
    else { sheet.classList.toggle('underline'); }
})
// Закреслений текст
lineThrough.addEventListener('click', function () {
    if (selectionStartIndex != -1) { applySelectedTextStyle('lineThrough', '', true) }
    else { sheet.classList.toggle('lineThrough'); }
})
// Збільшити шрифт
increaseSize.addEventListener('click', function () {
    if (selectionStartIndex != -1) { applySelectedTextStyle('fontSize', presentSize + 2 + "px", false) }
    else { sheet.style.fontSize = presentSize + 2 + "px"; }
    presentSize += 2
})
// Зменшити шрифт
decreaseSize.addEventListener('click', function () {
    if (selectionStartIndex != -1) { applySelectedTextStyle('fontSize', presentSize - 2 + "px", false) }
    else { sheet.style.fontSize = presentSize - 2 + "px"; }
    presentSize -= 2
})
// Вставити текст
puste.addEventListener('click', function (event) {
    pasteFromClipboard(event);
});
// Скопіювати текст
copy.addEventListener('click', function (event) {
    copyToClipboard();
});
// Вирізати текст
cut.addEventListener('click', function (event) {
    cutToClipboard();
});
// Тукст внизу рядка                        EROR
subButton.addEventListener('click', function () {
    if (selectionStartIndex != -1) {
        applySelectedTextStyle('subButton', '', true);
        applySelectedTextStyle('fontSize', fontFont1 + "px", false);
    }
    // else {
    //     sheet.classList.toggle('sub');
    //     applySelectedTextStyle('fontSize', fontFont1 + "px", false);
    // }
})
// Текст вверху рядка                        EROR
superButton.addEventListener('click', function () {
    if (selectionStartIndex != -1) {
        applySelectedTextStyle('superButton', '', true);
        applySelectedTextStyle('fontSize', fontFont1 + "px", false);
    }
    // else {
    //     sheet.classList.toggle('super');
    //     applySelectedTextStyle('fontSize', fontFont1 + "px", false);
    // }
})
// Змінити колір фон тексту
document.querySelectorAll('#bgColorDropdownMenu .grid button').forEach(el => {
    el.addEventListener('click', function (event) {
        if (selectionStartIndex != -1) {
            applySelectedTextColor('background-color', event.target.textContent, false, true);
        } else {
            applySelectedTextColor('background-color', event.target.textContent, false, false);
        }
    })
})
// Змінити колір фону тексту на вибраний користувачем колір
bgTextColor.addEventListener('input', function () {
    if (selectionStartIndex != -1) {
        applySelectedTextColor('background-color', bgTextColor.value, true, true);
    } else {
        applySelectedTextColor('background-color', bgTextColor.value, true, false);
    }

});
// Змінити колір тексту
document.querySelectorAll('#colorDropdownMenu .grid button').forEach(el => {
    el.addEventListener('click', function (event) {
        if (selectionStartIndex != -1) {
            applySelectedTextColor('color', event.target.textContent, false, true);
        } else {
            applySelectedTextColor('color', event.target.textContent, false, false);
        }

    })
})
// Змінити колір тексту на вибраний користувачем колір
textColor.addEventListener('input', function () {
    if (selectionStartIndex != -1) {
        applySelectedTextColor('color', textColor.value, true, true);
    } else {
        applySelectedTextColor('color', textColor.value, true, false);
    }
});

// УСІ З ВЕЛИКОЇ
uperRegister.addEventListener('click', function () {
    if (selectionStartIndex != -1) {
        for (let i = selectionStartIndex; i < selectionEndIndex + 1; i++) {
            allChildren[i].textContent = allChildren[i].textContent.toUpperCase();
        }
    } else {
        sheet.textContent = sheet.textContent.toUpperCase();
    }
})
// усі з малої
loverRegister.addEventListener('click', function () {
    if (selectionStartIndex != -1) {
        for (let i = selectionStartIndex; i < selectionEndIndex + 1; i++) {
            allChildren[i].textContent = allChildren[i].textContent.toLowerCase();
        }
    } else {
        sheet.textContent = sheet.textContent.toLowerCase();
    }
})
// Як у реченнях
sentenceRegister.addEventListener('click', function () {
    if (selectionStartIndex != -1) {
        for (let i = selectionStartIndex; i < selectionEndIndex; i++) {
            let currentElement = allChildren[i];
            let currentText = currentElement.textContent;

            if (currentText === "." && allChildren[i + 1] && allChildren[i + 1].textContent === "\xa0") {
                let nextElement = allChildren[i + 2];
                nextElement.textContent = nextElement.textContent.toUpperCase();
            }
        }
    } else {
        for (let i = 0; i < allChildren.length; i++) {
            let currentElement = allChildren[i];
            let currentText = currentElement.textContent;

            if (currentText === "." && allChildren[i + 1] && allChildren[i + 1].textContent === "\xa0") {
                let nextElement = allChildren[i + 2];
                nextElement.textContent = nextElement.textContent.toUpperCase();
            }
        }
    }

})
// зМІНТИ рЕГІСТИР
changeRegister.addEventListener('click', function () {
    if (selectionStartIndex != -1) {
        for (let i = selectionStartIndex; i < selectionEndIndex + 1; i++) {
            if (allChildren[i].textContent === allChildren[i].textContent.toUpperCase()) {
                allChildren[i].textContent = allChildren[i].textContent.toLowerCase();
            } else {
                allChildren[i].textContent = allChildren[i].textContent.toUpperCase();
            }
        }
    } else {
        for (let i = 0; i < allChildren.length; i++) {
            if (allChildren[i].textContent === allChildren[i].textContent.toUpperCase()) {
                allChildren[i].textContent = allChildren[i].textContent.toLowerCase();
            } else {
                allChildren[i].textContent = allChildren[i].textContent.toUpperCase();
            }
        }
    }
})

// Очистити всі стилі
clearStyle.addEventListener('click', function () {
    if (selectionStartIndex != -1) { clearAllStyle(true); }
    else { clearAllStyle(false); }
    // presentSize -= 2
})

function clearAllStyle(selection) {
    if (selection) {
        for (let i = selectionStartIndex; i < selectionEndIndex + 1; i++) {
            allChildren[i].classList = "";
            allChildren[i].style.fontSize = 16 + "px";
            allChildren[i].style.fontFamily = 'Calibri';
        }
    } else {
        for (let i = 0; i < allChildren.length + 1; i++) {
            sheet.classList.remove(isToggleClassList[j]);
            sheet.style.fontSize = 16 + "px";
            sheet.style.fontFamily = 'Calibri';
        }
    }

}

// Змінити поля
var paddingNumbersOnly = inputSize.value.replace(/\D/g, '');
let presentPaddingSize = 40;
sheet.style.padding = presentPaddingSize + "px";
// Ввести розмір полів
inputBound.addEventListener('input', function () {
    paddingNumbersOnly = inputBound.value.replace(/\D/g, '');
    presentPaddingSize = paddingNumbersOnly;
    sheet.style.padding = paddingNumbersOnly + "px";

})
// Очистити розмір полів 
clearBound.addEventListener('click', function () {
    sheet.style.padding = 0;
})
// Встановити стандартний розмір полів
standartBound.addEventListener('click', function () {
    sheet.style.padding = 40 + "px";
})
// Встановити більший розмір полів
greateBound.addEventListener('click', function () {
    sheet.style.padding = 100 + "px";
})


// Змінити орієнтацію
// Книжковааа оріжнтація
bookOrientation.addEventListener('click', function () {
    sheet.style.width = sheetWidth + "px";
    sheet.style.height = sheetHeight + "px";
})
// Альбомна орієнтація
landscapeOrientation.addEventListener('click', function () {
    sheet.style.width = sheetHeight + "px";
    sheet.style.height = sheetWidth + "px";
})

// Змінити відношення сторін
smallerRatio.addEventListener('click', function () {
    changeRatio(50, 1.4141);
})
standardRatio.addEventListener('click', function () {
    changeRatio(60, 1.4143);
})
greateRatio.addEventListener('click', function () {
    changeRatio(70, 1.4189);
})

function changeRatio(width, ratio) {
    sheet.style.width = width + "%";
    sheetSize = sheet.getBoundingClientRect();
    sheet.style.height = sheetSize.width * ratio + "px";
    main.style.height = sheetSize.width * ratio + 80 + "px"
}


// let allInput = document.getElementsByTagName('input')
// allInput.forEach(function (el){
//     el.addEventListener('click', ()=>{
//         sheet.removeChild(curentCaret)
//
//     })
// })

