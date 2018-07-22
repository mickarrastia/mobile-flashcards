import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { red } from '../utils/colors'

export default function TextButton ({ children, onPress, style = {} }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={[styles.text, style]}>{children}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    color: red
  }
})
