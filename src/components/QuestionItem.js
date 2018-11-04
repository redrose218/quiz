import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

class QuestionItem extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentDidMount() {
  }

  render() {
    return (
      <View style={styles.container}>
      </View>
    );
  }
};

export default QuestionItem;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20
  },
});
