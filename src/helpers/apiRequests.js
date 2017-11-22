export default function() {
  const API_URL =  "http://localhost:3000/api/v1"

  return {
    fetchEmployees: () => {
      return fetch(`${API_URL}/companies/1/employees`)
        .then(res => res.json())
    }
  }
}
