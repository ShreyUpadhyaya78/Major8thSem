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
        body: JSON.stringify({ text }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      setResponse(JSON.stringify(data));
    } catch (error) {
      console.error(error);
    }
  };

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
      <div>{response}</div>
    </div>
  );
};

export default ReviewUpoad;
