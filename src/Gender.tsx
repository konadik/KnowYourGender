import * as React from 'react';
import {Text, View} from 'native-base';
import {QuestionnaireIdProp} from './types';

export const Gender: React.FC<QuestionnaireIdProp> = ({questionnaireId}) => {

  return (
    <View style={{flex: 1}}>
      <Text>gender: {questionnaireId}</Text>
    </View>
  );
};
