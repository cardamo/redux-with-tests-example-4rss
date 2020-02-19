import session from './session';
import students from './students';

export const state = {authenticated: true};

const delay = (millis) => {
  return new Promise((resolve) => {
    setTimeout(resolve, millis, millis)
  })
};

export const fetchSession = () => {
  return delay(300).then(() => {
    if (!state.authenticated) {
      throw new Error('Not Authenticated');
    }

    return session.data;
  })
};

export const fetchStudents = session => {
  if (!session.githubId) {
    throw new Error("pretending that session is actually required");
  }
  return delay(900).then(() => students.data)
};