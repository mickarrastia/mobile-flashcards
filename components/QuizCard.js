import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import TextButton from './TextButton'
import {red, green, white, purple} from '../utils/colors'

class QuizCard extends Component {

  render() {
    const { deck, questionIdx, showAnswer, flip, mark } = this.props
    const card = deck.questions[questionIdx]
    return (
      <View style={styles.center}>
        <Text style={styles.cardText}>{showAnswer ? card.answer : card.question}</Text>
        <TextButton
          onPress={flip}
          style={{marginTop: 20, marginBottom: 50, fontSize: 18}}
        >{showAnswer ? 'Question' : 'Answer'}</TextButton>

        <TouchableOpacity
          style={styles.button}
          onPress={() => mark('correct')}
        >
          <Text style={styles.buttonText}>Correct</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, {backgroundColor: red}]}
          onPress={() => mark('incorrect')}
        >
          <Text style={styles.buttonText}>Incorrect</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cardText: {
    fontSize: 25,
    color: purple,
    marginLeft: 15,
    marginRight: 15
  },
  button: {
    width: 150,
    height: 50,
    backgroundColor: green,
    borderRadius: 16,
    padding: 15,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: white,
    fontSize: 16
  }
})

export default QuizCard
