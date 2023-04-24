# Context

Martha is a system administrator for a chain of retirement communities. Her software lists all residents information such as their name, date of birth, and which community they belong to. She has asked us to implement a search form that has inputs that shows relevant results according to the filters chosen. She also wants the ability to bookmark filters that are chosen in the URL. For example, when `http://localhost:3000?gender=male` is loaded, the gender filter is pre-selected and displays relevant community residents upon page load.

# How to proceed

You'll collaborate with the interviewer on how to implement the requested features. The interviewer is the only one that can type, run the code, and demo the developing product.

# How to run the application

```shell
$ npm start # this installs everthing for you as well
```
# API

You are provided an API with the following interface to complete your requirements.

## GET /residents

```typescript
interface Resident {
  id: string;
  image_url: string;
  gender: 'male' | 'female';
  dob: string;
  first_name: string;
  last_name: string;
  community_id: string;
  room_id: string;
}

type FindResidentsResponseBody = Resident[]
```
