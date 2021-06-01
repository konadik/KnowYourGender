import {Text, View} from 'native-base';
import * as React from 'react';
import {QuestionnaireIdProp} from './types';

export const Results: React.FC<QuestionnaireIdProp> = ({questionnaireId}) => {
  return (
    <View style={{flex: 1}}>
      <Text>questionnaire: {questionnaireId}</Text>
    </View>
  );
};
