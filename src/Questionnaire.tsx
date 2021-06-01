import * as React from 'react';
import {
  Body,
  Button,
  H1,
  Icon,
  Left,
  List,
  ListItem,
  Right,
  Spinner,
  Text,
  Thumbnail,
  View,
} from 'native-base';
import {useQuery} from 'react-query';
import {QuestionnaireEntity} from './Api';
import {useHistory} from 'react-router-native';
import {QuestionnaireIdOnChangeProp, QuestionnaireIdProp} from './types';

export const Questionnaire: React.FC<
  QuestionnaireIdProp & QuestionnaireIdOnChangeProp
> = ({questionnaireId, onChangeQuestionnaireId}) => {
  const history = useHistory();

  const {
    isLoading: loadingQuestionnaires,
    data: questionnaires,
    isError: errorQuestionnaires,
  } = useQuery<QuestionnaireEntity[]>('questionnaires');
  const questionnaireIsNotEmpty = (questionnaires?.length || -1) > 0;
  const questionnaireIsEmpty = (questionnaires?.length || -1) === 0;

  return (
    <View style={{flex: 1}}>
      <H1 style={{marginLeft: 8}}>Pick Questionnaire</H1>
      {loadingQuestionnaires && (
        <View
          style={{flex: 1, justifyContent: 'center', alignContent: 'center'}}>
          <Spinner />
        </View>
      )}
      {errorQuestionnaires && (
        <View
          style={{flex: 1, alignContent: 'center', justifyContent: 'center'}}>
          <Text style={{fontSize: 40, fontWeight: 'bold'}}>
            Error loading questionnaires. Reload app :/
          </Text>
        </View>
      )}
      {questionnaireIsNotEmpty && (
        <List>
          {questionnaires?.map(questionnaire => {
            const isSelected = questionnaire.id === questionnaireId;
            console.log(questionnaire);

            return (
              <ListItem
                key={questionnaire.id}
                avatar
                selected={isSelected}
                onPress={() => {
                  onChangeQuestionnaireId(questionnaire.id);
                  history.push('/answers');
                }}>
                <Left>
                  <Thumbnail source={{uri: questionnaire.avatar}} />
                </Left>
                <Body>
                  <Text>{questionnaire.name}</Text>
                  <Text note>{questionnaire.description}</Text>
                </Body>
                <Right>
                  <Text note>{questionnaire.lastModifiedAt}</Text>
                </Right>
              </ListItem>
            );
          })}
          <ListItem last>
            <Right>
              <Text>Count: {questionnaires?.length}</Text>
            </Right>
          </ListItem>
        </List>
      )}
      {questionnaireIsEmpty && (
        <View
          style={{flex: 1, alignContent: 'center', justifyContent: 'center'}}>
          <Text style={{fontSize: 40, fontWeight: 'bold'}}>
            No questionnaire available at the moment.
          </Text>
        </View>
      )}
    </View>
  );
};
