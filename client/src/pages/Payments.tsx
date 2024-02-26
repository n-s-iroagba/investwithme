import React from 'react';
// import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';

const TextWithCopy: React.FC = () => {
  // const [text, setText] = useState<string>('abcd'); // State to store the fetched text

  // Function to fetch text from the backend
  // const fetchTextFromBackend = async () => {
  //   try {
  //     const response = await fetch('your-backend-url');
  //     const data = await response.text();
  //     setText(data);
  //   } catch (error) {
  //     console.error('Error fetching text:', error);
  //   }
  // };

  // useEffect(() => {
  //   fetchTextFromBackend(); // Fetch text when component mounts
  // }, []);

  // Function to handle copy button click
  // const handleCopyClick = () => {
  //   navigator.clipboard.writeText(text); // Copy text to clipboard
  // };

  return (
    <div>
      {/* <p>{text}</p> */}
      {/* <OverlayTrigger
        placement="bottom"
        overlay={<Tooltip id="copy-tooltip">Copy Text</Tooltip>}
      >
        <Button variant="light" onClick={handleCopyClick}>
         aaaa
        </Button>
      </OverlayTrigger> */}
    </div>
  );
};

export default TextWithCopy;
