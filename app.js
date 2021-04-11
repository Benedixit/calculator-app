class Calculator {

    constructor(displayElement, result) {
        this.displayElement = displayElement
        this.result = result
        this.clear_all()
    }

}


//this class method update the display
Calculator.prototype.updateDisplay = function() {
    this.displayElement.innerText = this.display
}

Calculator.prototype.deleteValue = function() {
    this.display = this.display.slice(0, -1)
}

//this class method handles the number keys
Calculator.prototype.handleNumber = function(number) {



    this.display = this.display.toString() + number.toString()


    if (this.result.innerText != '' && this.display[this.display.length - 1] == number) {
        this.display = this.display.charAt(this.display.length - 1)
        this.result.innerText = ''
    }

    if (this.display[this.display.length - 1] == '.' && this.display[this.display.length - 2] == '.') {
        this.display = this.display.slice(0, -1)
    }


    //conditional to ensure that if '.' is pressed, 0 precedes the decimal point

    if (this.display[0] == '.') {
        this.display = 0 + '.'
    }




    let operators = ['+', '-', 'X', '(', '÷']
    operators.forEach(operator => {
        if (this.display[this.display.length - 1] == '.' && this.display[this.display.length - 2] == operator) {
            this.display = this.display.slice(0, this.display.length - 1) + '0' + this.display.charAt(this.display.length - 1)
        }
    });

    //conditional to ensure that when decimal button is pressed and the preceding value is ")",
    //the multiply value and zero is included before the decimal value
    if (this.display[this.display.length - 1] == '.' && this.display[this.display.length - 2] == ')') {
        this.display = this.display.slice(0, this.display.length - 1) + 'X' + '0' + this.display.charAt(this.display.length - 1)
    }



    /*since eval() cannot perform a mathematical operation such as (x+y)z
    this condition helps to convert such operations into (x+y)*z which mean the same as the above mathematical operation
    */

    if (this.display[this.display.length - 1] == number && this.display[this.display.length - 2] == ')') {
        this.display = this.display.slice(0, this.display.length - 1) + 'X' + this.display.charAt(this.display.length - 1)
        this.updateDisplay()
    }

    this.updateDisplay()
}



//this class method handles the operator keys
Calculator.prototype.handleOperator = function(operator) {

    this.operator = operator
    this.display = this.display.toString() + operator


    //this conditional ensures that an operator doesnt follow another
    if (this.display[this.display.length - 1] == 'X' && this.display[this.display.length - 2] == '+' ||
        this.display[this.display.length - 1] == '+' && this.display[this.display.length - 2] == 'X' ||
        this.display[this.display.length - 1] == 'X' && this.display[this.display.length - 2] == '-' ||
        this.display[this.display.length - 1] == '-' && this.display[this.display.length - 2] == 'X' ||
        this.display[this.display.length - 1] == '÷' && this.display[this.display.length - 2] == '+' ||
        this.display[this.display.length - 1] == '+' && this.display[this.display.length - 2] == '÷' ||
        this.display[this.display.length - 1] == '-' && this.display[this.display.length - 2] == '+' ||
        this.display[this.display.length - 1] == '+' && this.display[this.display.length - 2] == '-' ||
        this.display[this.display.length - 1] == 'X' && this.display[this.display.length - 2] == '÷' ||
        this.display[this.display.length - 1] == '÷' && this.display[this.display.length - 2] == 'X' ||
        this.display[this.display.length - 1] == operator && this.display[this.display.length - 2] == operator) {
        this.display = this.display.slice(0, this.display.length - 2) + this.display.substring(this.display.length - 1)
        this.updateDisplay()
        return this.display
    }



    let numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '%']
        //loop to ensure that 'X' precedes ( when a number is before '('
    numbers.forEach(number => {
        if (this.display[this.display.length - 1] == '(' && this.display[this.display.length - 2] == number) {
            this.display = this.display.slice(0, this.display.length - 1) + 'X' + this.display.charAt(this.display.length - 1)


            this.updateDisplay()


        }


    });

    if (this.display[this.display.length - 1] == operator && this.result.innerText != '') {
        this.display = this.result.innerText + operator
        this.result.innerText = ''
    }
    /*this conditional ensures that a mathematical operation like (x+y)(a+b) translates to (x+y)*(a+b)
    since the eval() function cannot handle the former
    */
    if (this.display[this.display.length - 1] == '(' && this.display[this.display.length - 2] == ')') {
        this.display = this.display.slice(0, this.display.length - 1) + 'X' + this.display.charAt(this.display.length - 1)
        this.updateDisplay()
    }

    //conditional to ensure that ')' doesnt follow up with '(' and ')' doesn't precede '%'
    if (!this.display.includes('(') && this.display[this.display.length - 1] == ')' ||
        this.display[this.display.length - 1] == '%' && this.display[this.display.length - 2] == ')') {
        this.display = this.display.slice(0, -1)
    }




    if (this.display[0] == operator && this.display[0] != '(' && this.display[0] != ')') {
        this.display = 0 + operator
    }



    if (this.display[0] == ')') {
        this.display = '('
    }

    let operators = ['+', 'X', '-', '÷']
    operators.forEach(operator => {
        if (this.display[this.display.length - 2] == operator && this.display[this.display.length - 1] == ')' ||
            this.display[this.display.length - 2] == '(' && this.display[this.display.length - 1] == ')' ||
            // !this.display.includes(operator) && this.display[this.display.length - 1] == ')' ||
            this.display[this.display.length - 2] == '(' && this.display[this.display.length - 1] == 'operator' ||
            this.display[this.display.length - 2] == operator && this.display[this.display.length - 1] == '%') {
            this.display = this.display.slice(0, -1)
            this.updateDisplay()
        }



    });

    this.updateDisplay()



}



//this class method handles the equals button
Calculator.prototype.evaluate = function() {

    //since eval() cannot handle a value l%, it convert it to 1*(1/100)


    //since eval() cannot handle 'aXb' and 'a÷b'... this conditional converts them to 'a*b' and 'a/b' respectively
    if (this.display.includes('X') || this.display.includes('÷') || this.display.includes('%')) {

        this.result.innerText = eval(this.display.replaceAll('X', '*').replaceAll('÷', '/').replaceAll('%', '*(0.01)'));

    }


    if (!this.display.includes('X') && !this.display.includes('÷') && !this.display.includes('%')) {

        this.result.innerText = eval(this.display)
        console.log(this.result.innerText)


    }



    this.updateDisplay()

}



//this class method handles the clear button
Calculator.prototype.clear_all = function() {
    this.display = ''
    this.operator = undefined


}


//Declare all the variable relating to the operator keys, number keys, display and result
const numberButtons = document.querySelectorAll('.num')
const operatorButtons = document.querySelectorAll('.operator')
const displayElement = document.querySelector(".display")
const result = document.querySelector('.result')
const equalButton = document.querySelector('.equal')
const clearButton = document.querySelector('.clear')
const deleteButton = document.querySelector('.delete')

const calculate = new Calculator(displayElement, result)


//onclick function when a number is pressed
for (let i = 0; i < numberButtons.length; i++) {
    numberButtons[i].addEventListener('click', () => {
        let numberButton = numberButtons[i].innerText
        calculate.handleNumber(numberButton)
    });
}

//onclick function when the '=' button is pressed
equalButton.addEventListener('click', button => {
    calculate.evaluate()
    calculate.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculate.deleteValue()
    calculate.updateDisplay()
})

//onclick function when the CE button is pressed
clearButton.addEventListener('click', () => {
    calculate.clear_all()
    calculate.display = 0
    calculate.updateDisplay()
})


//onclick function when an operator is pressed
for (let i = 0; i < operatorButtons.length; i++) {
    operatorButtons[i].addEventListener('click', () => {
        let operatorButton = operatorButtons[i].innerText
        calculate.handleOperator(operatorButton)

    })
};