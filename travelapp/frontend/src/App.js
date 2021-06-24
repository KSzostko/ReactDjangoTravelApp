import { useEffect } from 'react';
import axios from 'axios';
import { Button } from 'antd';

function App() {
  useEffect(() => {
    async function testFetch() {
      await axios
        .get('http://localhost:8000/api/hotels/')
        .then(({ data }) => {
          console.log(data);
        })
        .catch(({ message }) => {
          console.error(message);
        });
    }

    testFetch();
  });

  return (
    <div>
      <Button>Hello world</Button>
    </div>
  );
}

export default App;
