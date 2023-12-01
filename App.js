import React, { useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

export default function App() {
  const buttonWidth = Dimensions.get('window').width / 4 - 20;
  const [showedText, setShowedText] = useState('');
  const [currentNum, setCurrentNum] = useState('');
  const [lastNum, setLastNum] = useState('');
  const [operator, setOperator] = useState(null);

  const handleOperacion = (operacion) => {
    let num;
    switch (operacion) {
      case '=':
        if (lastNum && operator) {
          let result = eval(`${lastNum}${operator}${currentNum}`);
          result = parseFloat(result.toFixed(10));
          const resultString = result.toString().substring(0, 10);
          setCurrentNum(resultString);
          setShowedText(resultString);
          setLastNum(resultString);
          setOperator(null);
        }
        break;
      case 'C':
        setCurrentNum('');
        setLastNum('');
        setOperator(null);
        setShowedText('');
        break;
      case '/':
      case '*':
      case '-':
      case '+':
        if (currentNum !== '') {
          if (lastNum && operator) {
            handleOperacion('=');
          }
          setLastNum(currentNum);
          setOperator(operacion);
          setCurrentNum('');
          setShowedText('');
        }
        break;
      case ',':
        if (!currentNum.includes('.')) {
          setCurrentNum(currentNum + '.');
          setShowedText(showedText + '.');
        }
        break;
      case '!':
        if (currentNum) {
          num = parseFloat(currentNum);
          let factorial = 1;
          for (let i = 1; i <= num; i++) {
            factorial *= i;
          }
          const factorialString = factorial.toString().substring(0, 10);
          setCurrentNum(factorialString);
          setShowedText(factorialString);
        }
        break;
      case '\u221A':
        if (currentNum) {
          num = parseFloat(currentNum);
          if (num >= 0) {
            const result = Math.sqrt(num);
            const resultString = result.toString().substring(0, 10);
            setCurrentNum(resultString);
            setShowedText(resultString);
          } else {
            setShowedText('Error');
          }
        }
        break;
      case '\u03C0':
        const piString = Math.PI.toString().substring(0, 10);
        setCurrentNum(piString);
        setShowedText(piString);
        break;
      default:
        if (/^[0-9.]+$/.test(operacion)) {
          if (currentNum === '0' || operator) {
            setCurrentNum(operacion);
            setShowedText(operacion);
          } else {
            setCurrentNum(currentNum + operacion);
            setShowedText(showedText + operacion);
          }
        } else if (
          ['sin', 'cos', 'tan', 'deg', 'ln', 'log', 'rad', '1/X'].includes(
            operacion
          )
        ) {
          if (currentNum) {
            num = parseFloat(currentNum);
            switch (operacion) {
              case 'sin':
                setCurrentNum(Math.sin(num).toString());
                setShowedText(Math.sin(num).toString().substring(0, 10));
                break;
              case 'cos':
                setCurrentNum(Math.cos(num).toString());
                setShowedText(Math.cos(num).toString().substring(0, 10));
                break;
              case 'tan':
                setCurrentNum(Math.tan(num).toString());
                setShowedText(Math.tan(num).toString().substring(0, 10));
                break;
              case 'deg':
                setCurrentNum(((num * 180) / Math.PI).toString());
                setShowedText(
                  ((num * 180) / Math.PI).toString().substring(0, 10)
                );
                break;
              case 'ln':
                setCurrentNum(Math.log(num).toString());
                setShowedText(Math.log(num).toString().substring(0, 10));
                break;
              case 'log':
                setCurrentNum(Math.log10(num).toString());
                setShowedText(Math.log10(num).toString().substring(0, 10));
                break;
              case 'rad':
                setCurrentNum(((num * Math.PI) / 180).toString());
                setShowedText(
                  ((num * Math.PI) / 180).toString().substring(0, 10)
                );
                break;
              case '1/X':
                setCurrentNum((1 / num).toString());
                setShowedText((1 / num).toString().substring(0, 10));
                break;
              default:
                break;
            }
          }
        }
        break;
    }
  };

  const buttonOrder = [
    ['sin', 'cos', 'tan', 'deg'],
    ['ln', 'log', '\u03C0', 'rad'],
    ['1/X', '!', '\u221A', '/'],
    ['7', '8', '9', '*'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['C', '0', ',', '='],
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calculadora</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.input}>{showedText || '0'}</Text>
      </View>
      <View style={styles.buttonContainer}>
        {buttonOrder.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.buttonRow}>
            {row.map((buttonValue, buttonIndex) => (
              <TouchableOpacity
                key={buttonIndex}
                style={[
                  styles.button,
                  /^[0-9]+$/.test(buttonValue) ? styles.numberButton : null,
                  { width: buttonWidth, height: buttonWidth },
                  buttonValue === '=' ? styles.equalsButton : null,
                ]}
                onPress={() => handleOperacion(buttonValue)}>
                <Text style={styles.buttonText}>{buttonValue}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: 80,
  },
  title: {
    fontSize: 45,
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    height: 70,
    width: Dimensions.get('window').width - 40,
    borderRadius: 4,
    borderWidth: 1,
  },
  input: {
    fontSize: 50,
    textAlign: 'right',
    flex: 1,
  },
  buttonContainer: {
    marginTop: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  button: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    textAlignVertical: 'center',
    backgroundColor: 'gray',
    margin: 5,
  },
  numberButton: {
    backgroundColor: 'blue',
  },
  equalsButton: {
    backgroundColor: 'gray',
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
