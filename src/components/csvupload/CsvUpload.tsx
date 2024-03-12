import { useState } from 'react';
import config from '../../data/config';
export default function CsvUpload(serverURL: any) {
  const [file, setFile] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [array, setArray] = useState([]);
  const [analyzedResult, setAnalyzedResult] = useState<any>(null);
  const positivePath =
    config.serverURL+config.positiveBar;
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
  const handleAnalyze = async () => {
    if (file) {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('csv_file', file);

      try {
        const response = await fetch(config.serverURL + '/process_csv', {
          method: 'POST',
          body: formData,
        });
        const data = await response.json();
        setAnalyzedResult(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

const [selectedOption, setSelectedOption] = useState('');

const handleSelectChange = (event:any) => {
  setSelectedOption(event.target.value);
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
      <div className='analyze-button-section'>
        <button
          onClick={handleAnalyze}
          className='ml-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mt-4 mb-4'
        >
          ANALYZE
        </button>
        <div className='analyze-button-section'>
        {isLoading && <div className='loader'>Loading...</div>}
        </div>
      </div>

      {analyzedResult && (
        <div>
          <h2>Analyzed Result:</h2>
          <pre>{JSON.stringify(analyzedResult, null, 2)}</pre>
        </div>
      )}
      {analyzedResult && (
        <div className='charts-display-section'>
          <div className='bar-and-word'>
            <div className='bar-chart-select-section'>
              <select
                value={selectedOption}
                onChange={handleSelectChange}
                className='bar-select'
              >
                <option value=''>Select Bar Chart</option>
                <option value='positiveBar'>Positive Bar Chart</option>
                <option value='negativeBar'>Negative Bar Chart</option>
                <option value='neutralBar'>Neutral Bar Chart</option>
              </select>
              {selectedOption === 'positiveBar' && (
                <div>
                  <img
                    src={config.serverURL + config.positiveBar}
                    alt='Positive Bar Chart'
                    className='bar-chart-img'
                  />
                </div>
              )}
              {selectedOption === 'negativeBar' && (
                <div>
                  <img
                    src={config.serverURL + config.negativeBar}
                    alt='Negative Bar Chart'
                    className='bar-chart-img'
                  />
                </div>
              )}
              {selectedOption === 'neutralBar' && (
                <div>
                  <img
                    src={config.serverURL + config.neutralBar}
                    alt='Neutral Bar Chart'
                    className='bar-chart-img'
                  />
                </div>
              )}
            </div>
            <div className='word-cloud-select-section'>
              <select
                value={selectedOption}
                onChange={handleSelectChange}
                className='word-cloud-select'
              >
                <option value=''>Select Word Cloud</option>
                <option value='positiveWordCloud'>Positive Word Cloud</option>
                <option value='negativeWordCloud'>Negative Word Cloud</option>
                <option value='neutralWordCloud'>Neutral Word Cloud</option>
              </select>
              {selectedOption === 'positiveWordCloud' && (
                <div>
                  <img
                    src={config.serverURL + config.positiveWordCloud}
                    alt='Positive Word Cloud'
                    className='word-cloud-img'
                  />
                </div>
              )}
              {selectedOption === 'negativeWordCloud' && (
                <div>
                  <img
                    src={config.serverURL + config.negativeBar}
                    alt='Negative Word Cloud'
                    className='word-cloud-img'
                  />
                </div>
              )}
              {selectedOption === 'neutralWordCloud' && (
                <div>
                  <img
                    src={config.serverURL + config.neutralWordCloud}
                    alt='Neutral Word Cloud'
                    className='word-cloud-img'
                  />
                </div>
              )}
            </div>
          </div>
          <div className='pie-chart'>
            <img
              src={config.serverURL + config.pieChart}
              alt='Pie Chart'
              className='pie-chart-img'
            />
          </div>
        </div>
       )}
      {/* <div className='percentTable'>
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
      </div> */}
    </div>
  );
}
