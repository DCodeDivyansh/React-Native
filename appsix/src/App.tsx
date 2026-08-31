
import React, {useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageSourcePropType,
  Pressable
} from 'react-native';
import ReactNativeHapticFeedback from "react-native-haptic-feedback";

import DiceOne from '../assets/One.png'
import DiceTwo from '../assets/Two.png'
import DiceThree from '../assets/Three.png'
import DiceFour from '../assets/Four.png'
import DiceFive from '../assets/Five.png'
import DiceSix from '../assets/Six.png'

type DiceProps = PropsWithChildren<{
  imageUrl: ImageSourcePropType
}>

const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false
};

const Dice = ({imageUrl}: DiceProps):JSX.Element => {
  return (
    <View>
      <Image style={styles.diceImage} source={imageUrl} />
    </View>
  )
}

function App(): JSX.Element {
  const [diceImage, setDiceImage] = useState<ImageSourcePropType>(DiceOne)
  const [bgColor, setBgColor] = useState('#FFF2F2');

  const CheatDice = () => {
    let randomNumber;

    if (Math.random() < 0.5) {
      randomNumber = 6; // 50% chance
    } else {
      randomNumber = Math.floor(Math.random() * 5) + 1; // 1-5
    }

    updateDice(randomNumber);
  };

  const updateDice = (randomNumber: number) => {
  switch (randomNumber) {
    case 1:
      setDiceImage(DiceOne);
      break;
    case 2:
      setDiceImage(DiceTwo);
      break;
    case 3:
      setDiceImage(DiceThree);
      break;
    case 4:
      setDiceImage(DiceFour);
      break;
    case 5:
      setDiceImage(DiceFive);
      break;
    case 6:
      setDiceImage(DiceSix);
      break;
    default:
      setDiceImage(DiceOne);
  }
  if (randomNumber === 6) {
    setBgColor('#ea0707'); // Change background color for 6
  } else {
    setBgColor('#FFF2F2'); // Default background color
  }

  ReactNativeHapticFeedback.trigger("impactLight", options);
  };

  const rollDiceOnTap = () => {
  const randomNumber = Math.floor(Math.random() * 6) + 1;
  updateDice(randomNumber);
  };

  return (
    <View style={[  styles.container, {backgroundColor: bgColor}]}>
      <Pressable
      onPress={rollDiceOnTap}
      >
      <Dice imageUrl={diceImage} />
      </Pressable>
      <Pressable
      onPress={rollDiceOnTap}
      >
        <Text
        style={styles.rollDiceBtnText}
        >
        Roll the dice
        </Text>
      </Pressable>


      <Pressable
      onPress={CheatDice}
      >
        <Text
        style={styles.CheatBtnText}
        >
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF2F2',
  },
  diceContainer: {
    margin: 12,
  },
  diceImage: {
    width: 200,
    height: 200,
  },
  rollDiceBtnText: {
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: '#E5E0FF',
    fontSize: 16,
    color: '#8EA7E9',
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  CheatBtnText: {
    position: 'absolute',
    top: -260,
    left: 40,
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
    // borderWidth: 2,
    height: 50,
    width: 50,
    // borderRadius: 8,
    borderColor: '#E5E0FF',
    fontSize: 16,
    color: '#8EA7E9',
    fontWeight: '700',
    textTransform: 'uppercase',
  },
});

export default App;