import React, { Component } from 'react'
import { KeyboardAvoidingView, TouchableOpacity, Text, TextInput, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { addCard } from '../actions'
import { saveCard } from '../utils/api'
import { purple, white } from '../utils/colors'

function SubmitBtn ({ onPress }) {
  return (
    <TouchableOpacity
      style={styles.submitBtn}
      onPress={onPress}>
      <Text style={styles.submitBtnText}>SUBMIT</Text>
    </TouchableOpacity>
  )
}

class AddCard extends Component {
  state = {
    question: '',
    answer: ''
  }

  static navigationOptions = {
    title: 'Add Card'
  }

  submit = () => {
    const { deckId } = this.props
    const { question, answer } = this.state

    if(!question.trim() || !answer.trim()) {
      alert('You need to enter both question and answer')
      return
    }

    this.props.dispatch(addCard(deckId, question, answer))

    this.setState(() => ({question: '', answer: ''}))

    saveCard(deckId, question, answer)
  }

  render() {
    const { question, answer } = this.state

    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <Text style={styles.label}>Question</Text>
        <TextInput
          value={question}
          style={styles.input}
          onChangeText={(question) => this.setState({question})}
          autoFocus={true}
        />
        <Text style={styles.label}>Answer</Text>
        <TextInput
          value={answer}
          style={styles.input}
          onChangeText={(answer) => this.setState({answer})}
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
    alignItems: 'center',
    margin: 40
  },
  label: {
    fontSize: 18,
    alignSelf: 'flex-start',
    color: purple
  },
  input: {
    width: 250,
    height: 44,
    padding: 8,
    borderWidth: 1,
    borderColor: purple,
    marginBottom: 15
  },
  submitBtn: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
    marginBottom: 100
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center'
  }
})

function mapStateToProps (state, { navigation }) {
  const { deckId } = navigation.state.params

  return {
    deckId
  }
}

export default connect(mapStateToProps)(AddCard)
