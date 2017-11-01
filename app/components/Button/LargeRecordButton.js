import React, { Component } from 'react'
import { Image, TouchableOpacity, View } from 'react-native'
import Expo, { Asset, Audio, FileSystem, Permissions } from 'expo'

import styles from './styles'

export default class RecordButton extends Component {
  constructor(props) {
    super(props)
    this.recording = null
    this.sound = null
    this.state = {
      haveRecordingPermissions: false,
      isRecording: false,
      isPlaying: false,
    }
  }

  componentDidMount = () => {
    this.askForPermissions()
  }

  askForPermissions = async () => {
    const response = await Permissions.askAsync(Permissions.AUDIO_RECORDING)
    this.setState({
      haveRecordingPermissions: response.status === 'granted',
    })
  }

  startStopRecording = () => {
    this.state.isRecording ? this.stopRecording() : this.startRecording()
  }

  startRecording = async () => {
    this.setState({ isRecording: true, isPlaying: false })
    if (this.sound !== null) {
      await this.sound.unloadAsync()
      this.sound.setOnPlaybackStatusUpdate(null)
      this.sound = null
    }
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
    })

    if (this.recording !== null) {
      this.recording.setOnRecordingStatusUpdate(null)
      this.recording = null
    }

    const recording = new Audio.Recording()
    await recording.prepareToRecordAsync(this.recordingSettings)
    this.recording = recording
    await this.recording.startAsync()
  }

  stopRecording = async () => {
    this.setState({ isRecording: false })
    try {
      await this.recording.stopAndUnloadAsync()
    } catch (error) { }

    const info = await FileSystem.getInfoAsync(this.recording.getURI())
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      playsInSilentLockedModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
    })
    const { sound, status } = await this.recording.createNewLoadedSound({
      isLooping: true,
      isMuted: false,
      volume: 1.0
    })
    this.sound = sound
  }

  playSample = () => {
    if (this.sound != null) {
      if (this.state.isPlaying) {
        this.sound.pauseAsync()
        this.setState({ isPlaying: false })
      } else {
        this.sound.playAsync()
        this.setState({ isPlaying: true })
      }
    }
  }

  stopSample = () => {
    if (this.sound != null) {
      this.sound.stopAsync()
      this.setState({ isPlaying: false })
    }
  }

  render = () =>
    <View style={styles.largeWrapper}>
      <TouchableOpacity onPress={this.startStopRecording} >
        <View style={styles.record}>
          <Image
            resizeMode="contain"
            style={styles.icon}
            source={ this.state.isRecording
              ? require('./assets/record_red.png')
              : require('./assets/record_black.png')
            } />
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={this.playSample}>
        <View style={styles.play}>
          <Image
            resizeMode="contain"
            style={styles.icon}
            source={ this.state.isPlaying
              ? require('./assets/pause.png')
              : require('./assets/play.png')
            } />
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={this.stopSample}>
        <View style={styles.stop}>
          <Image
            resizeMode="contain"
            style={styles.icon}
            source={require('./assets/stop.png')} />
        </View>
      </TouchableOpacity>
    </View>
}
