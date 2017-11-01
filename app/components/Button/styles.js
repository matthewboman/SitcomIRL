import EStyleSheet from 'react-native-extended-stylesheet'

const styles = EStyleSheet.create({
  container: {
    alignItems: 'center',
    margin: 5,
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 50,
    borderWidth: 1,
    borderRadius: 25,
    backgroundColor: '#fff',
  },
  largeWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 210,
    height: 50,
    borderWidth: 1,
    borderRadius: 25,
    marginTop: 10,
    backgroundColor: '#fff',
  },
  text: {
    color: '#000',
    fontSize: 16,
    fontWeight: '400',
  },
  icon: {
    width: 30,
  },
  record: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 50,
    borderRightWidth: 1,
  },
  play: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 50,
  },
  stop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 50,
    borderLeftWidth: 1,
  },
})

export default styles
