import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'

import styles from './styles'

const SampleContainer = ({ children }) =>
  <View style={styles.sampleContainer}>
    { children }
  </View>

SampleContainer.propTypes = {
  children: PropTypes.any,
}

export default SampleContainer
