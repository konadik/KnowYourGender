import * as React from 'react';
import {
  Button,
  Container,
  Content,
  Footer,
  FooterTab,
  Icon,
  Spinner,
  Text,
  View,
} from 'native-base';
import {Route, useHistory, useLocation} from 'react-router-native';
import {Questionnaire} from './Questionnaire';
import {useQuery} from 'react-query';
import * as api from './Api';
import {Gender} from './Gender';
import {Results} from './Results';
import {Answers} from './Answers';

export const Root: React.FC = () => {
  const [currentQuestionnaireId, setCurrentQuestionnaireId] =
    React.useState<string | null>(null);
  const location = useLocation();
  const history = useHistory();

  const {isLoading: loadingBrainSexScales, isError: errorBrainSexScales} =
    useQuery('brain-sex-scales', api.getBrainSexScales);
  const {
    isLoading: loadingGenderToAnswerWeights,
    isError: errorGenderToAnswerWeights,
  } = useQuery('gender-to-answer-weights', api.getGenderToAnswerWeights);
  const {isLoading: loadingQuestionnaires, isError: errorQuestionnaires} =
    useQuery('questionnaires', api.getQuestionnaires);

  const isLoadingAny =
    loadingBrainSexScales ||
    loadingGenderToAnswerWeights ||
    loadingQuestionnaires;
  const isErrorAny =
    errorBrainSexScales || errorGenderToAnswerWeights || errorQuestionnaires;
  const isAllReady = !isLoadingAny && !isErrorAny;

  console.log(currentQuestionnaireId);
  return (
    <Container>
      {isLoadingAny && (
        <View
          style={{flex: 1, justifyContent: 'center', alignContent: 'center'}}>
          <Spinner />
        </View>
      )}
      {isErrorAny && (
        <View
          style={{flex: 1, alignContent: 'center', justifyContent: 'center'}}>
          <Text style={{fontSize: 40, fontWeight: 'bold'}}>
            Error loading a few things. Reload app :/
          </Text>
        </View>
      )}
      {isAllReady && (
        <>
          <Content contentContainerStyle={{flexGrow: 1}}>
            <Route exact path="/">
              <Questionnaire
                onChangeQuestionnaireId={id => setCurrentQuestionnaireId(id)}
                questionnaireId={currentQuestionnaireId}
              />
            </Route>
            <Route exact path="/gender">
              <Gender questionnaireId={currentQuestionnaireId} />
            </Route>
            <Route exact path="/answers">
              <Answers questionnaireId={currentQuestionnaireId} />
            </Route>
            <Route exact path="/results">
              <Results questionnaireId={currentQuestionnaireId} />
            </Route>
          </Content>
          {location.pathname !== '/' && (
            <Footer>
              <FooterTab>
                <Button vertical onPress={() => history.push('/')}>
                  {/*<Icon name={'venus-mars'} />*/}
                  <Text>List</Text>
                </Button>
              </FooterTab>
              <FooterTab>
                <Button vertical onPress={() => history.push('/gender')}>
                  {/*<Icon name={'venus-mars'} />*/}
                  <Text>Gender</Text>
                </Button>
              </FooterTab>
              <FooterTab>
                <Button vertical onPress={() => history.push('/answers')}>
                  {/*<Icon name={'question'} />*/}
                  <Text>Answers</Text>
                </Button>
              </FooterTab>
              <FooterTab>
                <Button vertical onPress={() => history.push('/results')}>
                  {/*<Icon name={'home'} />*/}
                  <Text>Results</Text>
                </Button>
              </FooterTab>
            </Footer>
          )}
        </>
      )}
    </Container>
  );
};
