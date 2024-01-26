import React from 'https://esm.sh/react@18.2.0';
import ReactDOM from 'https://esm.sh/react-dom@18.2.0';


const calculatorElement = [
  { id: 'clear', value: 'AC' },
  { id: 'divide', value: '/' },
  { id: 'multiply', value: 'x' },
  { id: 'seven', value: 7 },
  { id: 'eight', value: 8 },
  { id: 'nine', value: 9 },
  { id: 'subtract', value: '-' },
  { id: 'four', value: 4 },
  { id: 'five', value: 5 },
  { id: 'six', value: 6 },
  { id: 'add', value: '+' },
  { id: 'one', value: 1 },
  { id: 'two', value: 2 },
  { id: 'three', value: 3 },
  { id: 'equals', value: '=' },
  { id: 'zero', value: 0 },
  { id: 'decimal', value: '.' }
];


const mathSymbols = ['AC', '/', 'x', '+', '-', '='];

const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const Display = ({ input, output }) => {
  return(
    React.createElement("div", { className: "output" },
    React.createElement("span", { className: "result" }, output),
    React.createElement("hr", { className: "hrules" }),
    React.createElement("span", { id: "display", className: "input" }, input),
    React.createElement("footer", { className: "footer" }, "Javascript Calculator " + String.fromCharCode(169) +  " 2024")
    ));
};


const Key = ({ keyData: { id, value }, evaluateInput }) => {
  return(
    React.createElement("button", { id: id, onClick: () => evaluateInput(value) },
    value));
};


const Keyboard = ({ evaluateInput }) => {
  return(
    React.createElement("div", { className: "keys" },
    calculatorElement.map((key) =>
    React.createElement(Key, { key: key.id, keyData: key, evaluateInput: evaluateInput }))));
};


const App = () => {
  const [input, setInput] = React.useState('0');
  const [output, setOutput] = React.useState('');
  const [calculator, setCalculator] = React.useState('');


  const submitNumber = () => {
    try {
      const total = eval(calculator);
      setInput(total);
      setOutput(`${total} = ${total}`);
      setCalculator(`${total}`);
    } catch (error) {
        alert('Error evaluating expression:', error);
    }
  };
  

  const clearInput = () => {
    setInput('0');
    setCalculator('');
  };


  const validateNumericInput = (value) => {
    if (!calculator.length) {
      setInput(`${value}`);
      setCalculator(`${value}`);
    } else {
      const lastChar = calculator.charAt(calculator.length - 1);
      const isLastOperator = lastChar === '*' || mathSymbols.includes(lastChar);
      const isValueZero = value === 0 && (calculator === '0' || input === '0');
  
      if (isValueZero) {
        setCalculator(`${calculator}`);
      } else {
        const newInput = isLastOperator ? `${value}` : `${input}${value}`;
        setInput(newInput);
  
        const newCalculator = `${calculator}${value}`;
        setCalculator(newCalculator);
      }
    }
  };
  

  const dotOperator = () => {
    const lastChar = calculator.charAt(calculator.length - 1);
  
    if (!calculator.length) {
      setInput('0.');
      setCalculator('0.');
    } else {
      if (lastChar === '*' || mathSymbols.includes(lastChar)) {
        setInput('0.');
        setCalculator(`${calculator} 0.`);
      } else {
        const newInput = lastChar === '.' || input.includes('.') ? `${input}` : `${input}.`;
        setInput(newInput);
  
        const formattedValue = lastChar === '.' || input.includes('.') ? `${calculator}` : `${calculator}.`;
        setCalculator(formattedValue);
      }
    }
  };
  

  const mathOperation = (value) => {
    if (calculator.length === 0) {
      setInput(`${value}`);
      return;
    }
  
    const beforeLastChar = calculator.charAt(calculator.length - 2);
    const beforeLastCharOp = mathSymbols.includes(beforeLastChar) || beforeLastChar === '*';
  
    const lastChar = calculator.charAt(calculator.length - 1);
    const lastCharIsOp = mathSymbols.includes(lastChar) || lastChar === '*';
    const validOp = value === 'x' ? '*' : value;
  
    if ((lastCharIsOp && value !== '-') || (beforeLastCharOp && lastCharIsOp)) {
      const updateValue = beforeLastCharOp
        ? `${calculator.substring(0, calculator.length - 2)}${value}`
        : `${calculator.substring(0, calculator.length - 1)}${validOp}`;
  
      setCalculator(updateValue);
    } else {
      setCalculator(`${calculator}${validOp}`);
    }
  };
  

  const evaluateInput = value => {
    
    const number = numbers.find(num => num === value);
    const operator = mathSymbols.find(op => op === value);

    switch (value) {
      case '=':
        submitNumber();
        break;
      case 'AC':
        clearInput();
        break;
      case number:
        validateNumericInput(value);
        break;
      case '.':
        dotOperator();
        break;
      case operator:
        mathOperation(value);
        break;
      default:
        break;
      }
  };

 
  const handleOutput = () => {setOutput(calculator);};

  React.useEffect(() => {handleOutput();}, [calculator]);
  return(
    React.createElement("div", { className: "container" }, 
    React.createElement("div", { className: "calculator" },
    React.createElement(Display, {
      input: input, 
      output: output 
    }),
    React.createElement(Keyboard,
      { evaluateInput: evaluateInput 
    }))));
};


ReactDOM.render(React.createElement(App, null), document.getElementById('app'));