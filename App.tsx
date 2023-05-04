import 'react-native';
import { Game } from './src/compoments/Game';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App ():JSX.Element {
  return (
    <GestureHandlerRootView style={{flex:1}}>
      <Game/>
    </GestureHandlerRootView>
  )
}

