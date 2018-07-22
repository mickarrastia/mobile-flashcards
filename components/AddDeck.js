import React, { Component } from 'react'
import { KeyboardAvoidingView, TouchableOpacity, Text, TextInput, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import { saveDeck } from '../utils/api'
import { addDeck } from '../actions'
import { purple, white } from '../utils/colors'

function SubmitBtn ({ onPress }) {
  return (
    <TouchableOpacity
      style={styles.submitBtn}
      onPress={onPress}>
      <Text style={styles.submitBtnText}>Create Deck</Text>
    </TouchableOpacity>
  )
}

function generateUID () {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

class AddDeck extends Component {
  state = {
    deckTitle: ''
  }

  toDeck = (id, title) => {
    this.props.navigation.navigate('Deck', {deckId: id, deckName: title})
  }

  submit = () => {
    const {deckTitle} = this.state
    const title = deckTitle

    if(!deckTitle.trim()) {
      alert('You need to enter a title')
      return
    }

    const deckId = generateUID()
    const newDeck = {
      title: deckTitle.trim(),
      questions: []
    }

    this.props.dispatch(addDeck(deckId, newDeck))

    this.setState(() => ({deckTitle: ''}))

    this.toDeck(deckId, title)

    saveDeck(deckId, newDeck)
  }

  render() {
    const { deckTitle } = this.state
    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <Text style={styles.question}>What is the title of your new deck?</Text>
        <TextInput
          value={deckTitle}
          style={styles.input}
          onChangeText={(deckTitle) => this.setState({deckTitle})}
        />
        <SubmitBtn onPress={this.submit} />
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  question: {
    fontSize: 30,
    marginLeft: 20,
    marginRight: 20,
    color: purple
  },
  input: {
    width: 250,
    height: 44,
    padding: 8,
    borderWidth: 1,
    borderColor: purple,
    margin: 20
  },
  submitBtn: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
    marginBottom: 60
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center'
  }
})

export default connect()(AddDeck)
