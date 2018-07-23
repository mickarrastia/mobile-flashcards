import React from 'react'
import { View, StatusBar } from 'react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation'
import reducer from './reducers'
import DeckList from './components/DeckList'
import AddDeck from './components/AddDeck'
import Deck from './components/Deck'
import AddCard from './components/AddCard'
import Quiz from './components/Quiz'
import { purple, white } from './utils/colors'
import { Constants } from 'expo'
import { setLocalNotification } from './utils/helpers'

function UdaciStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tabs = createBottomTabNavigator(
  {
    DeckList: {
      screen: DeckList,
      navigationOptions: {
        tabBarLabel: 'DECKS'
      }
    },
    AddDeck: {
      screen: AddDeck,
      navigationOptions: {
        tabBarLabel: 'NEW DECK'
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: purple,
      labelStyle: {
        fontSize: 20,
        paddingBottom: 10
      }
    }
  }
)

const Stack = createStackNavigator(
  {
    Home: {
      screen: Tabs,
      navigationOptions: {
        title: 'Revise!',
        headerBackTitle: null
      }
    },
    Deck: {
      screen: Deck
    },
    AddCard: {
      screen: AddCard
    },
    Quiz: {
      screen: Quiz
    }
  },
  {
    initialRouteName: 'Home',
    navigationOptions: {
      headerTintColor: purple,
      headerTitleStyle: {
        fontSize: 22
      }
    },
    cardStyle: {
      backgroundColor: white
    }
  }
)

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification()
  }

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
