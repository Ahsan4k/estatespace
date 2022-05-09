import {StyleSheet, Text, View, Dimensions} from 'react-native';
import React from 'react';
import {scale, ScaledSheet} from 'react-native-size-matters';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Param = props => {
  const item = props.route.params;

  return (
    <View style={styles.background}>
      <View style={styles.inner}>
        <Text style={styles.text}>Email: {item.email}</Text>
        <Text style={styles.text}>Gender: {item.gender}</Text>
        <Text style={styles.text}>Role: {item.role}</Text>
      </View>
    </View>
  );
};

export default Param;

const styles = ScaledSheet.create({
  background: {
    width: width,
    height: height,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inner: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: '20@s',
    fontWeight: 'bold',
  },
});
