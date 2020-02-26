import faker from 'faker';

faker.seed(781);

export const makeFake = (idx) => {
  return {
    "id": 11523 + idx,
    "rank": idx,
    "name": faker.name.findName(),
    "githubId": faker.internet.email(),
    "totalScore": 0,
    "locationName": faker.address.city(),
    "taskResults": [],
    "isActive": faker.random.boolean()
  };
};

const data = [...new Array(500)].map((_, idx) => makeFake(idx));

export default {
  "data": data
}