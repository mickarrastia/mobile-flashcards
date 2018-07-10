import React from 'react'
import { View, StatusBar } from 'react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import DeckList from './components/DeckList'
import { purple, lightGray } from './utils/colors'
import { Constants } from 'expo'

function UdaciStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{ flex: 1, backgroundColor: lightGray }}>
          <UdaciStatusBar backgroundColor={purple} barStyle="light-content" />
          <DeckList />
        </View>
      </Provider>
    )
  }
}
