import React, { useState } from 'react';
interface ReviewUploadProps {
  serverURL: string;
}
const ReviewUpoad: React.FC<ReviewUploadProps> = ({ serverURL }) => {
  const [text, setText] = useState('');
  const [response, setResponse] = useState('');

  const handlePost = async () => {
    try {
      const res = await fetch(serverURL + '/process_text', {
        method: 'POST',
        body: JSON.stringify({ review: text }),
        // body: JSON.stringify({ text }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.error(error);
    }
  };
  const dataKeys: string[] = Object.keys(response);
  const dataValues: string[] = Object.values(response);

  // Extract keys and values

  return (
    <div className='reviewPost'>
      <textarea
        style={{ width: '70%', height: '200px', resize: 'vertical' }}
        value={text}
        onChange={(e) => setText(e.target.value)}
        className='reviewInputArea'
        placeholder='Write your review here...'
      />
      <button
        style={{ width: '70%' }}
        onClick={handlePost}
        className='ml-3 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded mt-1 reviewPostButton'
      >
        POST
      </button>
      {response && (
        <div className='displayReviewAnalysis mt-4'>
          <table style={{ width: '100%' }}>
            <thead>
              <tr>
                <th>Aspect</th>
                <th>Sentiment</th>
              </tr>
            </thead>
            <tbody>
              {dataKeys.map((key, index) => (
                <tr key={index}>
                  <td>{key}</td>
                  <td>{dataValues[index]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ReviewUpoad;
