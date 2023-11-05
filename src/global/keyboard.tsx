import {useState, useEffect} from 'react';
import {Keyboard} from 'react-native';

const useKeyboard = () => {
  const padding = 30;
  const [bottomPadding, setBottomPadding] = useState(padding);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardWillShow',
      event => setBottomPadding(event.endCoordinates.height - padding),
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardWillHide',
      () => setBottomPadding(padding),
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return {bottomPadding};
};

export default useKeyboard;
