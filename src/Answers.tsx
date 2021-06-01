import * as React from 'react';
import {Body, Card, CardItem, Text, View} from 'native-base';
import {QuestionnaireIdProp} from './types';
import {useMutation, useQuery} from 'react-query';
import {getUniqueId} from 'react-native-device-info';
import {
  getAnswersByQuestionnaireIdAndDeviceId, postAnswers,
  QuestionnaireEntity, Sex,
} from './Api';
import {Image} from "react-native";

export const Answers: React.FC<QuestionnaireIdProp> = ({questionnaireId}) => {
  const {data: questionnaire} = useQuery<
    QuestionnaireEntity[],
    unknown,
    QuestionnaireEntity,
    string
  >('questionnaires', {
    select: data => data.find(({id}) => id === questionnaireId)!,
  });
  const {
    isLoading,
    isError,
    data: answers,
  } = useQuery(
    questionnaireId || '',
    () =>
      getAnswersByQuestionnaireIdAndDeviceId(questionnaireId!, getUniqueId()),
    {enabled: !!questionnaireId},
  );

  const { mutate} = useMutation((sex: Sex) => postAnswers() )

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>{questionnaire?.sexQuestion}</Text>
      </View>
      <View style={{flex: 2, flexDirection: 'row'}}>
        <Card style={{flex: 1, marginTop: 'auto', marginBottom: 'auto'}}>
          <CardItem>
            <Body style={{flex: 1, alignItems: 'center'}}>
              <Image
                source={{
                  uri: 'https://icons-for-free.com/iconfiles/png/512/business+costume+male+man+office+user+icon-1320196264882354682.png',
                }}
                style={{height: 100, width: 100, flex: 1}}
              />
              <Text>Male</Text>
            </Body>
          </CardItem>
        </Card>
        <Card style={{flex: 1, marginTop: 'auto', marginBottom: 'auto'}}>
          <CardItem>
            <Body style={{flex: 1, alignItems: 'center'}}>
              <Image
                source={{
                  uri: 'https://icons-for-free.com/iconfiles/png/512/female+person+user+woman+young+icon-1320196266256009072.png',
                }}
                style={{height: 100, width: 100, flex: 1}}
              />
              <Text>Female</Text>
            </Body>
          </CardItem>
        </Card>
      </View>
    </View>
  );
};
