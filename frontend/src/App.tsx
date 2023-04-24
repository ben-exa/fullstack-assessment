import React from 'react';
import './App.css'

interface ResidentPayload {
  id: string;
  image_url: string;
  gender: 'male' | 'female';
  dob: string;
  first_name: string;
  last_name: string;
  community_id: string;
  room_id: string;
}

const ResidentRow: React.FC<{ resident: ResidentPayload }> = ({resident}) => {
  return (
    <tr>
      <td>{resident.first_name}</td> 
      <td>{resident.last_name}</td>
      <td>{resident.gender}</td>
      <td>{resident.dob}</td>
      <td>{resident.community_id}</td>
      <td>{resident.room_id}</td>
    </tr>
  );
}

function App() {
  const [residents, setResidents] = React.useState<ResidentPayload[]>([])

  const handleSearchResidents = (e: React.FormEvent) => {
    e.preventDefault();
    fetch('http://localhost:3000/residents')
      .then(response => response.json())
      .then((data: { data: ResidentPayload[]}) => {
        setResidents(data.data)
      })
  };

  return (
    <div className="App">
      <h1>Search all community residents</h1>
      <form onSubmit={handleSearchResidents}>
        <label>
          Resident's Name
          <input type="text" placeholder="Resident's Name" />
        </label>
        <label>
          Gender
          <select>
            <option value="" selected></option>
            <option value="male">male</option>
            <option value="female">female</option>
          </select>
        </label>
        <button onClick={handleSearchResidents}>Search</button>
      </form>
      {residents.length > 0 && 
      ( <><h1>{residents.length} Results:</h1>
      <table>
        <thead>
          <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Gender</th>
          <th>Date of Birth</th>
          <th>Community ID</th>
          <th>Room ID</th>
          </tr>
        </thead>
        <tbody>
      {
        residents.map((resident) => <ResidentRow resident={resident} key={resident.id} />)
      }
      </tbody>
      </table>
      </>)}
    </div>
  )
}

export default App
