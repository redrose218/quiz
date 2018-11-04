import React from 'react';
import { Picker, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

class QuestionItem extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      answer: ''
    };
  }

  componentDidMount() {
  }

  onSelect(answer) {
    this.setState({ answer });
    this.props.onPress(answer);
  }

  render() {
    const { answer } = this.state;
    const { data: { category, type, difficulty, question, correct_answer, incorrect_answers }, onPress, style } = this.props;
    const answers = [correct_answer, ...incorrect_answers].sort();
    return (
      <View style={[styles.container, style]}>
        <Text>{'- ' + question}</Text>
        <View style={styles.answerContainer}>
          <Picker
            selectedValue={answer}
            style={{ flex: 2, width: 200 }}
            onValueChange={(value, index) => this.onSelect(value)}>
            <Picker.Item label={'Select answer'} value={''} />
            {answers.map(item => <Picker.Item key={item} label={item} value={item} />)}
          </Picker>
        </View>
      </View>
    );
  }
};

export default QuestionItem;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  answerContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
});
