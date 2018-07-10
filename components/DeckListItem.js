import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { white } from '../utils/colors'

class DeckListItem extends Component {
  render() {
    const { title, cardCount } = this.props
    return (
      <View style={styles.item}>
        <Text>{title}</Text>
        <Text style={{marginTop: 10}}>{cardCount}</Text>
      </View>
    )
  }
}

function mapStateToProps(decks, props) {
  const { id } = props
  return {
    title: decks[id].title,
    cardCount: decks[id].questions.length
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: white,
    borderRadius: 16,
    padding: 15,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    justifyContent: 'center',
    alignItems: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    },
  }
})

export default connect(mapStateToProps)(DeckListItem)