import React, { useState, useEffect } from "react";
import { Button, FormControl, InputLabel, Input } from "@material-ui/core";
import Message from "./Message";
import "./App.css";

function App() {
	const [input, setInput] = useState("");
	const [messages, setMessages] = useState([]);
	const [username, setUsername] = useState("");

	// useState = variable in REACT
	// useEffect = run code on a condition in REACT

	useEffect(() => {
		// run code here.
		// if its black inside [], this code runs ONCE when the app component loads.
		// const name = prompt("Please enter your name");
		setUsername(prompt("Please enter your name"));
	}, []); // condition here..

	const sendMessage = (event) => {
		// all the logic to send a message goes here
		event.preventDefault();
		setMessages([...messages, input]);
		setInput("");
	};

	return (
		<div className="App">
			<h1>Hello 🚀 </h1>
			<h2>Welcome {username}</h2>

			<form>
				<FormControl>
					<InputLabel>Enter a message...</InputLabel>
					<Input value={input} onChange={(event) => setInput(event.target.value)} />
					<Button disabled={!input} variant="contained" color="primary" type="submit" onClick={sendMessage}>
						Send Message
					</Button>
				</FormControl>
			</form>

			{messages.map((message) => (
				<Message text={message} />
			))}
		</div>
	);
}

export default App;
