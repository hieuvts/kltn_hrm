import dummyjson from "dummy-json";

export default function CreateDummyEmployees(quantity) {
  const template = `
  {"users":[
    {{#repeat ${quantity}}}
    {
      "name": "{{firstName}}",
      "gender": "{{random 'Male' 'Female' 'Other'}}",
      "email": "{{email}}",
      "address": "{{int 1 100}} {{street}}, {{city}}",
      "phoneNumber": "{{phone "+84 xxx xxx xxx"}}",
      "registrationDate": "{{date '2021' '2025'}}",
      "age": "{{int 18 65}}"
    }
    {{/repeat}}
  ]}
`;
  const result = dummyjson.parse(template); // Returns a string
  const finalRes = JSON.parse(result);
  return finalRes.users;
}
