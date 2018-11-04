import React from 'react';
import { Image, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { getQuestions } from '@actions/api';
import { setQuestions } from '@actions/global';
import Constants from '@src/constants';
import Utils from '@src/utils';
import styles from './styles';

class HomeScreen extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      questions: []
    };
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    const { } = this.state;
    return (
      <View style={styles.container}>
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
