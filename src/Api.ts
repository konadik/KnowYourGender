const BASE_URL = 'http://192.168.0.33:8080';

export type Sex = 'Female' | 'Male';
export type Answer = 'A' | 'B' | 'C';

interface AnswerEntity {
  questionId: string;
  answer: Answer;
  unsure: boolean;
}

export interface AnswersEntity {
  id: string;
  deviceId: string;
  questionnaireId: string;
  sex: Sex;
  answers: AnswerEntity[];
}

export const postAnswers = async (
  answers: AnswersEntity,
): Promise<AnswersEntity> => {
  const response = await fetch(`${BASE_URL}/questionnaires/answers`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(answers),
  });

  return (await response.json()) as AnswersEntity;
};

export interface QuestionEntity {
  id: string;
  question: string;
  answerA: string;
  answerB: string;
  answerC: string;
}

export interface QuestionnaireEntity {
  id: string;
  avatar: string;
  name: string;
  description: string;
  lastModifiedAt: string;
  sexQuestion: string;
  answerUnsure: string;
  questions: QuestionEntity[];
}

export const getQuestionnaires = async (): Promise<QuestionnaireEntity[]> => {
  const response = await fetch(`${BASE_URL}/questionnaires`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  });

  return (await response.json()) as QuestionnaireEntity[];
};

export interface BrainSexScale {
  min: number;
  max: number;
  description: string;
}

export interface Result {
  score: number;
  brainSexScale: BrainSexScale;
  totalCountOfQuestions: number;
  countOfAnsweredQuestions: number;
}

export const getQuestionnairesResults = async (
  questionnaireId: string,
): Promise<Result[]> => {
  const response = await fetch(
    `${BASE_URL}/questionnaires/results/${questionnaireId}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    },
  );

  return (await response.json()) as Result[];
};

export interface GenderToAnswerWeights {
  answerAWeight: number;
  answerBWeight: number;
  answerCWeight: number;
  answerUnsureWeight: number;
  sex: Sex;
}

export const getGenderToAnswerWeights = async (): Promise<
  GenderToAnswerWeights[]
> => {
  const response = await fetch(
    `${BASE_URL}/questionnaires/gender-to-answer-weights`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    },
  );

  return (await response.json()) as GenderToAnswerWeights[];
};

export const getBrainSexScales = async (): Promise<BrainSexScale[]> => {
  const response = await fetch(`${BASE_URL}/questionnaires/brain-sex-scales`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  });

  return (await response.json()) as BrainSexScale[];
};

export const getAnswersByQuestionnaireIdAndDeviceId = async (
  questionnaireId: string,
  deviceId: string,
): Promise<AnswersEntity> => {
  const response = await fetch(
    `${BASE_URL}/questionnaires/answers/${questionnaireId}/${deviceId}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    },
  );

  return (await response.json()) as AnswersEntity;
};

export const getAnswersResultsByAnswersId = async (
  answersId: string,
): Promise<Result> => {
  const response = await fetch(
    `${BASE_URL}/questionnaires/answers/results/${answersId}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    },
  );

  return (await response.json()) as Result;
};
