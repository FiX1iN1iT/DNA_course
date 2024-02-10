// файл script.js
window.onload = function () {

    let a = ''
    let b = ''
    let expressionResult = ''
    let selectedOperation = null

    // окно вывода результата
    outputElement = document.getElementById("result")

    // список объектов кнопок циферблата (id которых начинается с btn_digit_)
    digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]')

    function onDigitButtonClicked(digit) {
        if (!selectedOperation) {
            if ((digit != '.') || (digit == '.' && !a.includes(digit))) {
                a += digit
            }
            outputElement.innerHTML = a
        } else {
            if ((digit != '.') || (digit == '.' && !b.includes(digit))) {
                b += digit
                outputElement.innerHTML = b
            }
        }
    }

    // устанавка колбек-функций на кнопки циферблата по событию нажатия
    digitButtons.forEach(button => {
        button.onclick = function () {
            const digitValue = button.innerHTML
            onDigitButtonClicked(digitValue)
        }
    });

    // установка колбек-функций для кнопок операций
    document.getElementById("btn_op_mult").onclick = function () {
        if (a === '') return
        selectedOperation = 'x'
    }
    document.getElementById("btn_op_plus").onclick = function () {
        if (a === '') return
        selectedOperation = '+'
    }
    document.getElementById("btn_op_minus").onclick = function () {
        if (a === '') return
        selectedOperation = '-'
    }
    document.getElementById("btn_op_div").onclick = function () {
        if (a === '') return
        selectedOperation = '/'
    }

    // кнопка очищения
    document.getElementById("btn_op_clear").onclick = function () {
        a = ''
        b = ''
        selectedOperation = ''
        expressionResult = ''
        outputElement.innerHTML = 0
    }

    // кнопка смены знака
    document.getElementById("btn_op_sign").onclick = function () {
        if (!selectedOperation) {
            if (a == 0) return
            a = -a
            outputElement.innerHTML = a
        } else {
            if (b == 0) return
            b = -b
            outputElement.innerHTML = b
        }
    }

    // кнопка вычисления процента
    document.getElementById("btn_op_percent").onclick = function () {
        if (a === '' || b === '') return;

        const percent = parseFloat(b) / 100;
        b = percent.toString();
        outputElement.innerHTML = b;
    }

    // кнопка стирания введенной цифры назад
    document.getElementById("btn_op_backspace").onclick = function () {
        if (!selectedOperation) {
            if (a === '') return;
            a = a.slice(0, -1);
            outputElement.innerHTML = a;
        } else {
            if (b === '') return;
            b = b.slice(0, -1);
            outputElement.innerHTML = b;
        }
    }

    // кнопка вычисления квадратного корня
    document.getElementById("btn_op_sqrt").onclick = function () {
        if (!selectedOperation) {
            if (a === '') return;

            if (parseFloat(a) < 0) {
                outputElement.innerHTML = "Ошибка";
            } else {
                a = Math.sqrt(parseFloat(a)).toString();
                outputElement.innerHTML = a;
            }
        } else {
            if (b === '') return;

            if (parseFloat(b) < 0) {
                outputElement.innerHTML = "Ошибка";
            } else {
                b = Math.sqrt(parseFloat(b)).toString();
                outputElement.innerHTML = b;
            }
        }
    }

    // кнопка возведения в квадрат
    document.getElementById("btn_op_square").onclick = function () {
        if (!selectedOperation) {
            if (a === '') return;
                a = (parseFloat(a) * parseFloat(a)).toString();
                outputElement.innerHTML = a;
        } else {
            if (b === '') return;
                b = (parseFloat(b) * parseFloat(b)).toString();
                outputElement.innerHTML = b;
        }
    }

    // кнопка вычисления факториала
    document.getElementById("btn_op_fact").onclick = function () {
        if (!selectedOperation) {
            if (a === '') return;
                if ((Number.isInteger(parseFloat(a)) && parseFloat(a) >= 0) === false) {
                    outputElement.innerHTML = "Ошибка";
                    return
                }
                a = factorial(parseFloat(a)).toString();
                outputElement.innerHTML = a;
        } else {
            if (b === '') return;
                if ((Number.isInteger(parseFloat(b)) && parseFloat(b) >= 0) === false) {
                    outputElement.innerHTML = "Ошибка";
                    return
                }
                b = factorial(parseFloat(b)).toString();
                outputElement.innerHTML = b;
        }
    }

    // кнопка добавления трех нулей
    document.getElementById("btn_op_zeros").onclick = function () {
        if (!selectedOperation) {
            if (a == 0) return
            a += "000"
            outputElement.innerHTML = a
        } else {
            if (b == 0) return
            b += "000"
            outputElement.innerHTML = b
        }
    }

    function factorial(n) {
        if (n === 0 || n === 1)
            return 1;
        for (let i = n - 1; i >= 1; i--) {
            n *= i;
        }
        return n;
    }

    // кнопка расчёта результата
    document.getElementById("btn_op_equal").onclick = function () {
        if (a === '' || b === '' || !selectedOperation)
            return

        switch (selectedOperation) {
            case 'x':
                expressionResult = (+a) * (+b)
                break;
            case '+':
                expressionResult = (+a) + (+b)
                break;
            case '-':
                expressionResult = (+a) - (+b)
                break;
            case '/':
                expressionResult = (+a) / (+b)
                break;
        }

        a = expressionResult.toString()
        b = ''
        selectedOperation = null

        outputElement.innerHTML = a
    }
};

function toggleTheme() {
    let body = document.body;
    body.classList.toggle("dark-mode");
}