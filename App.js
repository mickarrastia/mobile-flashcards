import React from 'react'
import { View, StatusBar } from 'react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { createStackNavigator } from 'react-navigation'
import reducer from './reducers'
import DeckList from './components/DeckList'
import Deck from './components/Deck'
import { purple, white } from './utils/colors'
import { Constants } from 'expo'

function UdaciStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Stack = createStackNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      title: 'Flashcard Decks'
    }
  },
  Deck: {
    screen: Deck,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      }
    }
  }
})

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{ flex: 1 }}>
          <UdaciStatusBar backgroundColor={purple} barStyle="light-content" />
          <Stack />
        </View>
      </Provider>
    )
  }
}
