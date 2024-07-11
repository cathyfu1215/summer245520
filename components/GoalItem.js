import React from 'react'
import { Text } from 'react-native'

function GoalItem(props) {
  return (
    <Text>{props.item.text}</Text>
  )
}

export default GoalItem
