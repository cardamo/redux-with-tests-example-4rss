import faker from 'faker';

faker.seed(781);

const data = [...new Array(400)].map((_, idx) => {
  return {
    "id": 11523 + idx,
    "rank": idx,
    "name": faker.name.findName(),
    "githubId": faker.internet.email(),
    "totalScore": 0,
    "locationName": faker.address.city(),
    "taskResults": [],
    "isActive": faker.random.boolean(0.2)
  };
});

console.log(data);

export default {
  "data": data
}