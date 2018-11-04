import React from 'react';
import { Button, FlatList, Text, View } from 'react-native';
import { connect } from 'react-redux';
import TimerMachine from 'react-timer-machine'
import { getQuestions } from '@actions/api';
import { setQuestions } from '@actions/global';
import { QuestionItem } from '@components';
import Utils from '@src/utils';
import styles from './styles';

class HomeScreen extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      data: [],
      answers: {},
      score: null,
      timeElapsed: 0,
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
    const { data, answers, score, timeElapsed, testing } = this.state;
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
                <Text style={styles.score}>{`Time Ellapsed: ${timeElapsed}s`}</Text>
              </View>
              :
              <View style={styles.scoreContainer}>
                <Text style={styles.score}>Welcome!</Text>
              </View>
          }
        </View>
        <Button
          title={testing ? 'Complete' : (score || score == 0) ? 'Play Again' : 'Start Quiz'}
          onPress={() => testing ? this.onStop() : this.onStart()}
        />
        <TimerMachine
          timeStart={1000}
          started={testing}
          countdown={false}
          interval={1000}
          formatTimer={(time, ms) => {
            if(__DEV__) console.log(time, ms);
            this.setState({ timeElapsed: ms / 1000 });
          }}
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
