import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

class Quiz extends Component {

  state = {
    questionIndex: 0,
    correct: 0,
    incorrect: 0,
    viewAnswer: false,
    viewResult: false
  }

  render() {
    const { deck } = this.props
    const totalQuestions = deck.questions.length
    const { questionIndex } = this.state

    return(
      <View>
        <Text>{questionIndex+1}/{totalQuestions}</Text>
        {questionIndex < totalQuestions ?
          <Text>{deck.questions[questionIndex].question}</Text> :
          <View>
            <Text>Correct: {this.state.correct}</Text>
            <Text>Incorrect: {this.state.incorrect}</Text>
          </View>
        }
      </View>
    )
  }
}

function mapStateToProps (state, { navigation }) {
  const { deckId } = navigation.state.params

  return {
    deckId,
    deck: state[deckId]
  }
}

export default connect(mapStateToProps)(Quiz)
