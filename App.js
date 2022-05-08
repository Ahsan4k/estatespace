import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  Modal,
  TextInput,
  Button,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {scale} from 'react-native-size-matters';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const App = () => {
  const [data, setData] = React.useState([]);
  const [loading, isLoading] = React.useState(false);
  const [count, setCount] = React.useState('');
  const [page, setPage] = React.useState('');
  const [modalVisible, isModalVisible] = React.useState(false);

  const someFunc = async () => {
    if (page === '' || count === '') {
      Alert.alert('Sorry', 'Please enter a number', [{text: 'OK'}]);
    } else {
      try {
        isLoading(true);
        const response = await fetch(
          `https://my.api.mockaroo.com/users.json?page=${page}&count=${count}&key=930279b0`,
          {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          },
        );
        const result = await response.json();
        console.log('result', result);
        if (response) {
          setData(result.entries);
        }
      } catch (err) {
        Alert.alert(`${err.name}`, `${err.message}`, [{text: 'OK'}]);
      }
      isModalVisible(false);
      isLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.load}>
        <ActivityIndicator color={'blue'} size={'large'} />
      </View>
    );
  }

  return (
    <View style={styles.background}>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modal}>
          <View style={styles.inner}>
            <Text
              onPress={() => isModalVisible(false)}
              style={{alignSelf: 'flex-end', marginRight: width * 0.04}}>
              Close
            </Text>
            <Text>Input Count</Text>
            <TextInput
              style={styles.ti}
              onChangeText={text => setCount(text)}
              keyboardType="number-pad"
            />
            <Text>Input Page</Text>
            <TextInput
              style={styles.ti}
              onChangeText={text => setPage(text)}
              keyboardType="number-pad"
            />
            <View style={{marginTop: height * 0.01}}>
              <Button title="Submit" onPress={someFunc} />
            </View>
          </View>
        </View>
      </Modal>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{marginTop: height * 0.01}}>
          <Button title="Find Entries" onPress={() => isModalVisible(true)} />
        </View>
        {data.map((item, index) => (
          <View style={styles.iterate} key={index}>
            <Text>
              {item.name.firstName} {item.name.lastName}
            </Text>
            <Text>{item.email}</Text>
            <Text>{item.gender}</Text>
            <Text>{item.role}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  background: {
    width: width,
    height: height,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  modal: {
    width: width,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ti: {
    backgroundColor: 'white',
    width: width * 0.8,
    height: height * 0.05,
    borderWidth: scale(1),
    color: 'black',
  },
  inner: {
    backgroundColor: 'lightgrey',
    width: width * 0.9,
    height: height * 0.25,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: scale(1),
  },
  load: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iterate: {
    width: width * 0.9,
    height: height * 0.2,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: height * 0.02,
    backgroundColor: 'lightgrey',
  },
});
