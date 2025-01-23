let a = ''; 
let b = ''; 
let sign = ''; 
let finish  = false;

const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const action = ['-', '+', 'X', '/'];

// экран 
const out = document.querySelector('#display');

function clearAll () {
    a = ''; // first number and result
    b = ''; // second number 
    sign = ''; // знак
    finish = false;
    out.value = 0; 
}

document.querySelector('.ac').onclick = clearAll;

document.querySelector('.buttons').onclick = (event) => {
    // нажата не кнопка
    if(!event.target.classList.contains('btn')) return;
    
    // нажата кнопка clearAll ac
    if(event.target.classList.contains('ac')) return;

    // получаю нажатую кнопку
    const key = event.target.textContent;

    // если нажата клавиша 0-9 или .
    if (digit.includes(key)) {
        if (b ==='' && sign === '') {
            a += key;
            out.value = a; // Обновляем значение в поле ввода
        }
        else if (a!=='' && b!=='' && finish) {
            b = key;
            finish = false;
            out.value = b; // Обновляем значение в поле ввода
        }
        else {
            b += key;
            out.value = b; // Обновляем значение в поле ввода
        }
        console.table(a, b , sign);
        return;
    }

    // если нажата клавиша + - / *
    if (action.includes(key)) {
        sign = key;
        out.value = sign; // Отображаем знак операции в поле ввода
        console.table(a, b , sign);
        return;
    }

    // нажата =
    if (key === '=') {
        if (b ==='') b = a;
        switch (sign) {
            case "+":
                a = (+a) + (+b);
                break;
            case "-":
                a = a - b;
                break;
            case "X":
                a = a * b;
                break;
            case "/":
                if (b === '0') {
                    out.value = 'Ошибка'; // Показываем ошибку при делении на 0
                    a = '';
                    b = '';
                    sign = '';
                    return;
                }
                a = a / b;
                break;
        }
        finish = true;
        out.value = a; // Показываем результат
        console.table(a, b , sign);
    }

    // нажата клавиша del (удалить 1 символ)
    if (event.target.classList.contains('del')) {
        if (finish) { // если операция вычисления выполнена, сбрасываем все значения переменных
            a = '';
            b = '';
            sign = '';
            finish = false;
            out.value = 0;
        } else if (b !== '') {
            b = b.slice(0, -1); // удаление последнего символа из второго числа
            out.value = b;
        } else if (sign !== '') {
            sign = ''; // удаление знака операции
            out.value = a;
        } else if (a !== '') {
            a = a.slice(0, -1); // удаление последнего символа из первого числа
            out.value = a;
        }
        console.table(a, b , sign);
    }
}
