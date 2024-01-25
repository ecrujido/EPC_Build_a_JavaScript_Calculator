import React from 'https://esm.sh/react@18.2.0';
import ReactDOM from 'https://esm.sh/react-dom@18.2.0';

const calcData = [
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
    React.createElement("span", { id: "display", className: "input" }, input)));

};

const Key = ({ keyData: { id, value }, handleInput }) => {
  return(
    React.createElement("button", { id: id, onClick: () => handleInput(value) },
    value));

};

const Keyboard = ({ handleInput }) => {
  return(
    React.createElement("div", { className: "keys" },
    calcData.map((key) =>
    React.createElement(Key, { key: key.id, keyData: key, handleInput: handleInput }))));

};


const App = () => {

  const [input, setInput] = React.useState('0');
  const [output, setOutput] = React.useState('');
  const [calculator, setCalculator] = React.useState('');

  const handleSubmit = () => {
    const total = eval(calculator);
    setInput(total);
    setOutput(`${total} = ${total}`);
    setCalculator(`${total}`);
  };

  const handleClear = () => {
    setInput('0');
    setCalculator('');
  };

  const handleNum = value => {
    if (!calculator.length) {
      setInput(`${value}`);
      setCalculator(`${value}`);
    } else {
      if (value === 0 && (calculator === '0' || input === '0')) {
        setCalculator(`${calculator}`);
      } else {
        const lastChat = calculator.charAt(calculator.length - 1);
        const isLast = lastChat === '*' || mathSymbols.includes(lastChat);

        setInput(isLast ? `${value}` : `${input}${value}`);
        setCalculator(`${calculator}${value}`);
      }}
  };

  const dotOperator = () => {
    const lastChat = calculator.charAt(calculator.length - 1);
    if (!calculator.length) {
      setInput('0.');
      setCalculator('0.');
    } else
    {
      if (lastChat === '*' || mathSymbols.includes(lastChat)) {
        setInput('0.');
        setCalculator(`${calculator} 0.`);
      } else {
        setInput(
        lastChat === '.' || input.includes('.') ? `${input}` : `${input}.`);

        const formattedValue = lastChat === '.' || input.includes('.') ? `${calculator}` : `${calculator}.`;
        setCalculator(formattedValue);
      }
    }
  };


  const handleOperator = value => {
    if (calculator.length) {
      setInput(`${value}`);
      const beforeLastChat = calculator.charAt(calculator.length - 2);

      const beforeLastChatOp = mathSymbols.includes(beforeLastChat) || beforeLastChat === '*';

      const lastChat = calculator.charAt(calculator.length - 1);

      const lastChatIsOp = mathSymbols.includes(lastChat) || lastChat === '*';

      const validOp = value === 'x' ? '*' : value;
      if (
      lastChatIsOp && value !== '-' || beforeLastChatOp && lastChatIsOp)
      {
        if (beforeLastChatOp) {
          const updateValue = `${calculator.substring(0,
          calculator.length - 2)}${value}`;
          setCalculator(updateValue);} else {
          setCalculator(`${calculator.substring(0, calculator.length - 1)}${validOp}`);}
      } else {
        setCalculator(`${calculator}${validOp}`);
      }
    }};


  const handleInput = value => {
    const number = numbers.find(num => num === value);
    const operator = mathSymbols.find(op => op === value);

    switch (value) {
      case '=':
        handleSubmit();
        break;
      case 'AC':
        handleClear();
        break;
      case number:
        handleNum(value);
        break;
      case '.':
        dotOperator();
        break;
      case operator:
        handleOperator(value);
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
      { handleInput: handleInput 
    }))));
};

ReactDOM.render(React.createElement(App, null), document.getElementById('app'));