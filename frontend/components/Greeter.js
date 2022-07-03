import { useState } from "react";

export default function Greeter({
  fetchedGreeting,
  fetchGreeting,
  setGreeting,
}) {
  const [greetingInput, setGreetingInput] = useState("");
  const [loading, setLoading] = useState("");

  async function _setGreetingHandler() {
    setLoading(true);
    await setGreeting(greetingInput);
    setGreetingInput("");
    setLoading(false);
  }

  return (
    <div class="">
      <div class="flex m-2">
        <button
          onClick={fetchGreeting}
          class="w-1/6 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded"
        >
          Fetch Greeting
        </button>
        <label class="w-5/6 px-10 border-2">{fetchedGreeting}</label>
      </div>

      <div class="flex m-2">
        <button
          onClick={() => _setGreetingHandler()}
          class="w-1/6 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded "
        >
          Set Greeting
        </button>
        <input
          onChange={(e) => setGreetingInput(e.target.value)}
          value={greetingInput}
          placeholder="Greeting placeholder"
          class="w-5/6 px-10 border-2"
        ></input>
      </div>
    </div>
  );
}
