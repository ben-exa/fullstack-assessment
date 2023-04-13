# Assessment
This assessment is meant to measure your competence in 

* developing a React application 
* interfacing with a live API
* navigating unclear requirements

You are not graded on completing 100% of the objectives but rather your choice of implementation, communicating intent, and a reasonable throughput of completing requirements.

# How to run the application

```shell
$ npm start # this installs everthing for you as well
```

# Requirements
You are tasked with building out the frontend of a system that manages an assisted living facility's electronic health records. The requirements are as follows. You are not provided designs so just make the UI legible.

## 1) List Residents Page

Display all resident's information (frontend)
  * full name
  * picture
  * age in years
  * gender
  * room id

## 2) Pick one of the following requirements
  * Pagination
    * Extend GET /residents endpoint to accept pagination query parameters such as page & count which will return a maximum count size for that page. Modify the frontend to interface with these new parameters.
  * Search query parameters
    * Extend GET /residents endpoint to accept search query parameters that'll filter residents based on certain row attributes such as gender or first_name. Modify the frontend to interface with these new parameters.


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
  facility_id: string;
  room_id: string;
}

type FindResidentsResponseBody = Resident[]
```
