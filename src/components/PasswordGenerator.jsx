import { useCallback, useEffect, useRef, useState } from "react";

const PasswordGenerator = () => {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [Password, setPassword] = useState("");
  const inputRef = useRef(null);

  const Generatorpassword = useCallback(() => {
    var pass = "";
    var str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvxyz";
    if (charAllowed) str += "!@#$%^&*()_+|?></";
    if (numberAllowed) str += "0123456789";

    for (var i = 1; i < length; i++) {
      const char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  useEffect(() => {
    console.log("beforeGenerator");
    Generatorpassword();
    console.log("afterGenerator");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [length, numberAllowed, charAllowed]);
  function copyToClipboard() {
    window.navigator.clipboard.writeText(Password);
    alert(`Password copied to clipboard------> ${Password}`);
    inputRef.current.select();
  }
  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 flex flex-col text-orange-500 gap-[10px]">
      <h1 className=" text-center">Password Generator</h1>
      <div className=" flex">
        <input
          type="text"
          placeholder="Password"
          value={Password}
          className="outline-none w-full py-1 px-3"
          readOnly
          ref={inputRef}
        />
        <button
          className="outline-none bg-blue-700 text-white px-3 py-0.5"
          onClick={copyToClipboard}
        >
          copy
        </button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className=" flex gap-1 mr-2">
          <input
            type="range"
            value={length}
            className=" cursor-pointer"
            min={8}
            max={20}
            onChange={(e) => setLength(e.target.value)}
          />
          <label htmlFor="length">Length:{length}</label>
        </div>
        <div className=" flex items-center  bg-red-600">
          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            onChange={() => {
              setNumberAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="character">Number</label>
        </div>
        <div className=" flex items-center">
          <input
            type="checkbox"
            defaultChecked={charAllowed}
            onChange={() => {
              setCharAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="character">character</label>
        </div>
      </div>
    </div>
  );
};

export default PasswordGenerator;
