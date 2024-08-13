import "./App.css";
import { useEffect, useState } from "react";
import { FaCaretRight } from "react-icons/fa";
import { Card, CardBody } from "@nextui-org/react";

function App() {
  const [message, setMessage] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/post/93004")
      .then(res => res.json())
      .then(data => {
        setMessage(data.posts[0].messageOp);
        setData(data.posts);
        console.log(data.post);
      })
      .catch(error => {
        console.error("Error:", error);
      });
  }, []);

  const textH = (item) => {
    // remove patterns from >>00000
    const res1 = item.replace(/>>\d{5}/g, "");
    // change $ to 'dolares'
    const res2 = res1.replace(/\$/g, 'dolares');
    const dataText = new SpeechSynthesisUtterance(res2);
    window.speechSynthesis.speak(dataText);
  };

  const readAllMessages = () => {
    const allMessages = data.map(item => item.message).join(" ");
    textH(allMessages);
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center pt-10">
        <h1 className="text-white text-6xl mb-5">Post de los Negritos</h1>
        <button 
          onClick={readAllMessages}
          className="bg-blue-500 text-white p-2 rounded-lg mb-4"
        >
          Leer Todos los Mensajes
        </button>
        <Card className="w-1/2 bg-[#18181B] my-4">
          <CardBody className="text-white bg-[#a83030]">
            <div className="flex justify-between">
              <p>{message}</p>
              <div 
                onClick={() => textH(message)} 
                className="flex justify-center items-center self-start bg-white text-black p-4 rounded-lg mx-5"
              >
                <FaCaretRight />
              </div>
            </div>
          </CardBody>
        </Card>
        {data.map((item, index) => (
          <Card key={index} className="w-1/2 bg-[#18181B] my-4">
            <CardBody className="text-white bg-[#18181B]">
              <div className="flex justify-between">
                <p>{item.message}</p>
                <div 
                  onClick={() => textH(item.message)} 
                  className="flex justify-center items-center self-start bg-white text-black p-4 rounded-lg mx-5"
                >
                  <FaCaretRight />
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </>
  );
}

export default App;

