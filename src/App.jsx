import "./App.css";
import { useEffect, useState } from "react";
import { FaCaretRight } from "react-icons/fa";
import { Card, CardBody } from "@nextui-org/react";


function App() {
  const [message, setMessage] = useState([])
const [data, setData] = useState([])

  useEffect(() => {
    const Api = async () => {
      try {
        const res = await fetch("https://8chan.moe/arepa/res/83493.json");
        const data = await res.json();
        setMessage(data.message)
        setData(data.posts)
        console.log(data);
      } catch (error) {
        console.error("Error", error);
      }
    };
    Api();
  }, []);

const textH = (item) => {
  // remove patterns from >>00000
  const res1 = item.replace(/>>\d{5}/g, "")
  // change but from $ to 'dollars'
  const res2 = res1.replace(/\$/g, 'dolares');
 const dataText = new SpeechSynthesisUtterance(res2)
 window.speechSynthesis.speak(dataText)
}

  return (
    <>
      <div className="flex flex-col justify-center items-center pt-10">
        <h1 className="text-white text-6xl mb-5">Post de los Negritos</h1>
        <Card className="w-1/2 bg-[#18181B] my-4">
            <CardBody className="text-white bg-[#a83030]">
            <div className="flex justify-between">
            <p>{message}</p>
              <div onClick={()=> (textH(message))} className="flex justify-center items-center self-start bg-white text-black p-4  rounded-lg mx-5">
                <FaCaretRight/>
              </div>
            </div>
            </CardBody>
          </Card>
        {data.map((item, index) => (
          <Card key={index} className="w-1/2 bg-[#18181B] my-4">
            <CardBody className="text-white bg-[#18181B]">
            <div className="flex justify-between">
            <p>{item.message}</p>
              <div onClick={()=> (textH(item.message))} className="flex justify-center items-center self-start bg-white text-black p-4  rounded-lg mx-5">
                <FaCaretRight/>
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
