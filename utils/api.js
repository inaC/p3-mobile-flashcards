import { AsyncStorage } from 'react-native';
import DECKS_STORAGE_KEY from './_flashCardSettings';

export const saveDeckTitle = ({ title }) => (
  AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({ [title]: { title, questions: [] } }))
);

export const getDecks = () => (
  AsyncStorage.getItem(DECKS_STORAGE_KEY).then(results => JSON.parse(results))
);

export const getDeckTitles = () => (
  getDecks().then(results => Object.keys(results || {}))
);

export const getDeck = ({ title }) => (
  getDecks().then(results => results[title])
);

export const addCardToDeck = ({ title, card }) => (
  getDeck({ title }).then((result) => {
    result.questions.push(card);
    AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({ [title]: result }));
  })
);

export const flushItem = () => AsyncStorage.removeItem(DECKS_STORAGE_KEY);
