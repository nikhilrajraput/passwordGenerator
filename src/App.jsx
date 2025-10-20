import { useCallback, useEffect, useState } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [count, setCount] = useState(0)
  const [charAllowed, setCharAllowed] = useState(false)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [pass, setpass] = useState("");

  const passwordGenerator = useCallback(()=>{
    let pass= "";
    let str= "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let number= "0123456789";
    let spchar="{}!@#$%^&*()<>|\[],`~"

    if (numberAllowed){
      str+=number;
    } 
    if (charAllowed) {
      str+=spchar
    }
    let newPass="";

    for (let index = 0; index < length; index++) {
    const randomIndex = Math.floor(Math.random() * str.length);
      newPass += str[randomIndex];
      
    }
    setpass(newPass);

  },[length,charAllowed,numberAllowed])

  useEffect(()=>{
    passwordGenerator()
  },[passwordGenerator])


   const copyToClipboard = () => {
    navigator.clipboard.writeText(pass);
    alert("Password copied to clipboard!");
  };

  return (
    <>

       <div className="flex flex-col min-w-100% items-center justify-center min-h-screen bg-gray-800 text-white gap-6"
       >
      <h1 className="text-3xl font-bold text-indigo-400">🔐 Password Generator</h1>

      <div className="bg-gray-800 p-6 rounded-2xl shadow-lg w-96 flex flex-col gap-4">
        {/* Password Display */}
        <div className="flex">
          <input
            type="text"
            value={pass}
            readOnly
            className="flex-grow bg-gray-700 text-white px-3 py-2 rounded-l-lg outline-none"
          />
          <button
            onClick={copyToClipboard}
            className="bg-black text-white px-4 py-2 rounded-r-lg font-semibold"
            style={{"backgroundColor":"black"}}
            >

            Copy
          </button>
        </div>

        {/* Length Slider */}
        <div className="flex items-center justify-between">
          <label className="text-lg">Length: {length}</label>
          <input
            type="range"
            min={8}
            max={20}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-40 accent-indigo-500"
          />
        </div>

        {/* Options */}
        <div className="flex justify-between">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={numberAllowed}
              onChange={() => setNumberAllowed(!numberAllowed)}
            />
            Numbers
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={charAllowed}
              onChange={() => setCharAllowed(!charAllowed)}
            />
            Special Chars
          </label>
        </div>

        {/* Generate Button */}
        <button
          onClick={passwordGenerator}
          className="bg-black-600 py-2 rounded-lg font-semibold mt-2"
          style={{"backgroundColor":"black"}}
        >
          Generate Password
        </button>
      </div>
    </div>
    </>
  )
}

export default App
