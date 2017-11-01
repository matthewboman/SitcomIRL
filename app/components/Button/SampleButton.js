import React from 'react'
import PropTypes from 'prop-types';
import { Text, TouchableOpacity, View } from 'react-native'

import styles from './styles'

const SampleButton = ({ text, onPress }) => (
  <TouchableOpacity style={styles.container} onPress={onPress}>
    <View style={styles.wrapper}>
      <Text style={styles.text}>{text}</Text>
    </View>
  </TouchableOpacity>
)

SampleButton.propTypes = {
  text: PropTypes.string,
  onPress: PropTypes.func,
}

export default SampleButton
