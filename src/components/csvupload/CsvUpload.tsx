import { log } from 'console';
import { useState } from 'react';
import Pos_Aspect from '../../assets/images/20_Pos_Aspects.jpg';

export default function CsvUpload(serverURL: any) {
  const [file, setFile] = useState();
  const [array, setArray] = useState([]);
  const [analyzedResult, setAnalyzedResult] = useState<any>(null);

  const fileReader = new FileReader();

  const handleOnChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  const csvFileToArray = (string: any) => {
    const csvHeader = string.slice(0, string.indexOf('\n')).split(',');
    const csvRows = string.slice(string.indexOf('\n') + 1).split('\n');

    const array = csvRows.map((i: any) => {
      const values = i.split(',');
      const obj = csvHeader.reduce((object: any, header: any, index: any) => {
        object[header] = values[index];
        return object;
      }, {});
      return obj;
    });

    setArray(array);
  };

  const handleOnSubmit = (e: any) => {
    e.preventDefault();

    if (file) {
      fileReader.onload = function (event: any) {
        const text = event.target.result;
        csvFileToArray(text);
      };

      fileReader.readAsText(file);
    }
  };

  const headerKeys = Object.keys(Object.assign({}, ...array));
  const handleAnalyze = () => {
    if (file) {
      const formData = new FormData();
      formData.append('csv_file', file);

      fetch('https://42a7-34-171-150-7.ngrok-free.app/process_csv', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => setAnalyzedResult(data))
        .catch((error) => console.error(error));
    }
  };
  return (
    <div style={{ textAlign: 'center' }} className='mt-8'>
      <form>
        <input
          type={'file'}
          id={'csvFileInput'}
          accept={'.csv'}
          onChange={handleOnChange}
          className='csvFileInput border-2 border-gray-300 rounded-md p-0'
        />

        <button
          onClick={(e) => {
            handleOnSubmit(e);
          }}
          className='ml-3 bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded'
        >
          IMPORT CSV
        </button>
      </form>
      <br />
      {file && (
        <div className='csvTableDisplay'>
          <table className='mx-auto items-center'>
            <thead>
              <tr key={'header'}>
                {headerKeys.map((key) => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>

            <tbody>
              {array.map((item, index) => (
                <tr key={index}>
                  {Object.values(item).map((val: any, index) => (
                    <td key={index}>{val}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <button
        onClick={handleAnalyze}
        className='ml-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mt-4 mb-4'
      >
        ANALYZE
      </button>

      {/* {analyzedResult && (
        <div>
          <h2>Analyzed Result:</h2>
          <pre>{JSON.stringify(analyzedResult, null, 2)}</pre>
        </div>
      )} */}
      <div className='analyzedData'>
        <div className='percentTable'>
          <table className='dataframe'>
            <thead>
              <tr className='text-right'>
                <th></th>
                <th>Positive</th>
                <th>Neutral</th>
                <th>Negative</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Accessories</th>
                <td>2.50</td>
                <td>2.380952</td>
                <td>8.333333</td>
              </tr>
              <tr>
                <th>Audio/Speaker</th>
                <td>12.50</td>
                <td>7.142857</td>
                <td>0.000000</td>
              </tr>
              <tr>
                <th>BIOS</th>
                <td>7.50</td>
                <td>2.380952</td>
                <td>0.000000</td>
              </tr>
              <tr>
                <th>CPU</th>
                <td>1.25</td>
                <td>2.380952</td>
                <td>0.000000</td>
              </tr>
              <tr>
                <th>Cooling</th>
                <td>6.25</td>
                <td>0.000000</td>
                <td>0.000000</td>
              </tr>
              <tr>
                <th>Customer Support</th>
                <td>3.75</td>
                <td>7.142857</td>
                <td>33.333333</td>
              </tr>
              <tr>
                <th>Graphics</th>
                <td>2.50</td>
                <td>2.380952</td>
                <td>16.666667</td>
              </tr>
              <tr>
                <th>Keyboard / Touchpad</th>
                <td>5.00</td>
                <td>2.380952</td>
                <td>8.333333</td>
              </tr>
              <tr>
                <th>Ports</th>
                <td>1.25</td>
                <td>7.142857</td>
                <td>8.333333</td>
              </tr>
              <tr>
                <th>Power/battery</th>
                <td>3.75</td>
                <td>11.904762</td>
                <td>8.333333</td>
              </tr>
              <tr>
                <th>Price</th>
                <td>2.50</td>
                <td>4.761905</td>
                <td>8.333333</td>
              </tr>
              <tr>
                <th>Productivity</th>
                <td>22.50</td>
                <td>4.761905</td>
                <td>8.333333</td>
              </tr>
              <tr>
                <th>RAM / Memory</th>
                <td>5.00</td>
                <td>9.523810</td>
                <td>0.000000</td>
              </tr>
              <tr>
                <th>Screen</th>
                <td>7.50</td>
                <td>4.761905</td>
                <td>0.000000</td>
              </tr>
              <tr>
                <th>Security</th>
                <td>2.50</td>
                <td>7.142857</td>
                <td>0.000000</td>
              </tr>
              <tr>
                <th>Shipping / Packaging</th>
                <td>3.75</td>
                <td>4.761905</td>
                <td>0.000000</td>
              </tr>
              <tr>
                <th>Software</th>
                <td>7.50</td>
                <td>2.380952</td>
                <td>0.000000</td>
              </tr>
              <tr>
                <th>Webcam / Video Streaming</th>
                <td>2.50</td>
                <td>16.666667</td>
                <td>0.000000</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className='imageSection'>
          <img src={Pos_Aspect} alt="Positive Aspects" />
        </div>
      </div>
    </div>
  );
}
