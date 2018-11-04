import React from 'react';
import { Button, FlatList, Image, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { getQuestions } from '@actions/api';
import { setQuestions } from '@actions/global';
import { QuestionItem } from '@components';
import Constants from '@src/constants';
import Utils from '@src/utils';
import styles from './styles';

class HomeScreen extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      data: [],
      answers: {},
      score: null,
      testing: false
    };
  }

  componentDidMount() {
    this.refreshData();
  }

  componentWillUnmount() {
  }

  refreshData() {
    getQuestions({ amount: 10 })
      .then(({ response_code, results }) => {
        this.setState({ data: results });
      })
      .catch(error => {
        Utils.toast(error);
      });
  }

  onStart() {
    this.setState({ answers: {}, testing: true });
  }

  onStop() {
    const { data, answers } = this.state;
    let count = 0;
    data.forEach((item, index) => {
      if (item.correct_answer === answers[index]) {
        count += 1;
      }
    });
    this.setState({
      testing: false,
      score: 5 * count / data.length
    });
    this.refreshData();
  }

  render() {
    const { data, answers, score, testing } = this.state;
    return (
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          {testing ?
            <FlatList
              keyExtractor={(item, index) => index.toString()}
              data={data}
              renderItem={({ item, index }) =>
                <QuestionItem
                  data={item}
                  onPress={answer => this.setState({ answers: { ...answers, [index]: answer } })}
                  style={{ backgroundColor: index % 2 ? 'white' : '#eee' }}
                />
              }
            />
            :
            (score || score == 0) ?
              <View style={styles.scoreContainer}>
                <Text style={styles.score}>{`Total Score: ${score}`}</Text>
              </View>
              :
              null
          }
        </View>
        <Button
          title={testing ? 'Complete' : 'Start Quiz'}
          onPress={() => testing ? this.onStop() : this.onStart()}
        />
      </View>
    );
  }
};

function mapStateToProps(state) {
  const { questions } = state.global;
  return {
    questions
  };
}

const mapDispatchToProps = dispatch => ({
  setQuestions: data => dispatch(setQuestions(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
