import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native'
import { connect } from 'react-redux'
import {white, purple, gray} from '../utils/colors'

class Deck extends Component {
  static navigationOptions = ({ navigation }) => {
    const { deckName } = navigation.state.params
    return {
      title: deckName
    }
  }

  state = {
    opacity: new Animated.Value(0),
    flex: new Animated.Value(0)
  }

  componentDidMount() {
    const { opacity } = this.state
    Animated.timing(opacity, {toValue: 1, duration: 1500}).start()
  }

  render() {
    const { deckId } = this.props
    const { title, questions } = this.props.deck
    const { opacity } = this.state

    return (
      <Animated.View style={[styles.deck, { opacity }]}>
        <Text style={styles.deckTitle}>{title}</Text>
        <Text style={styles.cardCount}>{questions.length} {questions.length === 1 ? `card` : `cards`}</Text>
        <TouchableOpacity
          style={[styles.button, {marginTop: 50}]}
          onPress={() => this.props.navigation.navigate('AddCard', {deckId: deckId})}
        >
          <Text style={styles.buttonText}>Add Card</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, {backgroundColor: purple}]}
          onPress={() => (questions.length === 0 ? alert('Add some cards!') : this.props.navigation.navigate('Quiz', {deckId: deckId}))}
        >
          <Text style={[styles.buttonText, {color: white}]}>Quiz</Text>
        </TouchableOpacity>
      </Animated.View>
    )
  }
}

function mapStateToProps (state, { navigation }) {
  const { deckId } = navigation.state.params

  return {
    deckId,
    deck: state[deckId],
  }
}

const styles = StyleSheet.create({
  deck: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  deckTitle: {
    fontSize: 30,
    color: purple
  },
  cardCount: {
    marginTop: 10,
    fontSize: 25,
    color: gray
  },
  button: {
    width: 150,
    height: 50,
    backgroundColor: white,
    borderRadius: 16,
    borderColor: purple,
    borderWidth: 1,
    padding: 15,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 16,
    color: purple
  }
})

function mapStateToProps (state, { navigation }) {
  const { deckId } = navigation.state.params

  return {
    deckId,
    deck: state[deckId],
  }
}

export default connect(mapStateToProps)(Deck)
