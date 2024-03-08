import './App.css';
import { useState } from 'react'; // Import useState hook
import Navbar from './components/navbar/Navbar'; // Import Navbar component
import CsvUpload from './components/csvupload/CsvUpload';
import ReviewUpload from './components/reviewupload/ReviewUpload';

function App() {
  // const [serverURL, setServerURL] = useState(''); // Declare serverURL state variable
  const serverURL = 'https://46e5-34-91-108-16.ngrok-free.app';
  const [activeButton, setActiveButton] = useState(''); // Declare activeButton state variable

  // const handleURLChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setServerURL(event.target.value); // Update serverURL state variable
  // };

  const handleButtonClick = (button: string) => {
    setActiveButton(button); // Update activeButton state variable
  };

  return (
    <>
      <Navbar />
      {/* <form className='inputURLForm'>
        <input
          type='text'
          placeholder='Put the server URL here'
          className='inputURL'
          value={serverURL} // Bind input value to serverURL state variable
          onChange={handleURLChange} // Call handleURLChange when input value changes
        />
      </form> */}
      <div className='flex justify-center mt-4'>
        <button
          className={`${
            activeButton === 'csv' ? 'bg-blue-400' : 'bg-gray-300'
          } rounded-md mr-0 px-4 py-2 hover:bg-blue-400 cursor-pointer csvUploadBtn`}
          onClick={() => handleButtonClick('csv')}
          disabled={activeButton === 'csv'}
        >
          CSV
        </button>
        <button
          className={`${
            activeButton === 'review' ? 'bg-blue-400' : 'bg-gray-300'
          } rounded-md ml-0 px-4 py-2 hover:bg-blue-400 cursor-pointer reviewUploadBtn`}
          onClick={() => handleButtonClick('review')}
          disabled={activeButton === 'review'}
        >
          Review
        </button>
      </div>
      {activeButton === 'csv' && <CsvUpload serverURL={serverURL} />}{' '}
      {/* Show CsvUpload if activeButton is 'csv' */}
      {activeButton === 'review' && <ReviewUpload serverURL={serverURL} />}{' '}
      {/* Show ReviewUpload if activeButton is 'review' */}
    </>
  );
}

export default App;
