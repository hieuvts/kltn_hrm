import dummyjson from "dummy-json";

export default function CreateDummyDepartment(quantity) {
    const template = `
    {"department":[
        {{#repeat ${quantity}}}
        {
          "name": "Department {{int 1 100}}",
          "amount": {{int 1 100}},
          "manager": "{{firstName}}"
        }
        {{/repeat}}
      ]}
    `;
const result = dummyjson.parse(template); // Returns a string
const finalRes = JSON.parse(result);
return finalRes.department;
}
