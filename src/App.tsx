import { MouseEvent } from 'react';
import Button from './components/Button/Button';
import Input from './components/Input/Input';

function App() {
  // const [counter, setCounter] = useState<number>(0);

  const addCounter = (e: MouseEvent) => {
    console.log(e);
    // MouseEvent импортируем из реакта
    // MouseEvent - синтетическое событие, и вся типизация этих событий лежит напрямую в реакт
    // все события в реакте являются синтетическими( тоесть не настоящими событиями, которые мы видим в работе в рамках DOM)
    // все события импортируем из реакта
    // console.log(e);
  };
  return (
    <>
      <Button onClick={addCounter} className="btn" appearence="small">
        Кнопка
      </Button>
      <Button onClick={addCounter} className="btn-smth" appearence="big">
        Кнопка
      </Button>
      <Input
        placeholder="email"
        type="email"
        className="test-input"
        isValid={false}
      />
    </>
  );
}

export default App;
