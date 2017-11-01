import React, { Component } from 'react'
import { StatusBar, View } from 'react-native'
import { Audio } from 'expo'

import { Container, SampleContainer } from '../components/Container'
import { LargeRecordButton, SampleButton } from '../components/Button'

const SAMPLES = [
  { name: 'applause', uri: require('../samples/applause.mp3')},
  { name: 'aww', uri: require('../samples/aww.mp3') },
  { name: 'grunt', uri: require('../samples/grunt.mp3') },
  { name: 'laugh', uri: require('../samples/laugh.mp3') },
  { name: 'air horn', uri: require('../samples/air_horn.mp3') },
  { name: 'slow clap', uri: require('../samples/slow_clap.mp3') },
  { name: 'transition', uri: require('../samples/transition.mp3') },
  { name: 'boo', uri: require('../samples/boo.mp3') },
  { name: 'crickets', uri: require('../samples/crickets.mp3') },
  { name: 'womp womp', uri: require('../samples/womp_womp.mp3') },
  { name: 'rim shot', uri: require('../samples/rimshot.mp3') },
  { name: 'ohhh', uri: require('../samples/ohhh.mp3') },
  { name: 'gasp', uri: require('../samples/gasp.mp3') },
  { name: 'dolphin', uri: require('../samples/dolphin.mp3') },
]

export default class Home extends Component {

  componentDidMount = () => {
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
    })
  }

  playSample = async (uri) => {
    const { soundObject, status } = await Expo.Audio.Sound.create(
      uri,
      { shouldPlay: true }
    )
  }

  renderSamples = () => SAMPLES.map((sample, i) => (
    <SampleButton
      key={i}
      text={sample.name}
      onPress={() => this.playSample(sample.uri)} />
  ))

  render = () =>
    <Container>
      <StatusBar />
      <SampleContainer>
        { this.renderSamples() }
        <LargeRecordButton />
      </SampleContainer>
    </Container>
}
