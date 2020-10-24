import React, { useState, useEffect } from "react";
import { Button, FormControl, InputLabel, Input, IconButton } from "@material-ui/core";
import Message from "./Message";
import "./App.css";
import db from "./firebase";
import firebase from "firebase";
import FlipMove from "react-flip-move";
import SendIcon from "@material-ui/icons/Send";

function App() {
	const [input, setInput] = useState("");
	const [messages, setMessages] = useState([]);
	const [username, setUsername] = useState("");

	// useState = variable in REACT
	// useEffect = run code on a condition in REACT

	useEffect(() => {
		//LISTENER: listening any chnages and iterate
		db.collection("messages")
			.orderBy("timestamp", "desc")
			.onSnapshot((snapshot) => {
				setMessages(snapshot.docs.map((doc) => ({ id: doc.id, message: doc.data() })));
			}); // This will detect Any changes on db
	}, []);

	useEffect(() => {
		// run code here.
		// if its black inside [], this code runs ONCE when the app component loads.
		// const name = prompt("Please enter your name");
		setUsername(prompt("Please enter your name"));
	}, []); // condition here..

	const sendMessage = (event) => {
		// all the logic to send a message goes here
		event.preventDefault();

		db.collection("messages").add({
			message: input,
			username: username,
			timestamp: firebase.firestore.FieldValue.serverTimestamp(),
		});
		setInput("");
	};

	return (
		<div className="App">
			<img src="https://facebookbrand.com/wp-content/uploads/2020/10/Logo_Messenger_NewBlurple-399x399-1.png?w=100&h=100" />
			<h1>Let's say hi! 🚀 </h1>
			<h2>Welcome {username}</h2>

			<form className="app__form">
				<FormControl className="app__formControl">
					<Input
						className="app__input"
						placeholder="Enter a message..."
						value={input}
						onChange={(event) => setInput(event.target.value)}
					/>

					<IconButton
						className="app__iconButton"
						disabled={!input}
						variant="contained"
						color="primary"
						type="submit"
						onClick={sendMessage}
					>
						<SendIcon />
					</IconButton>
				</FormControl>
			</form>

			<FlipMove>
				{messages.map(({ id, message }) => (
					// Don't need to re-render all entire messages if component got key.
					<Message key={id} username={username} message={message} />
				))}
			</FlipMove>
		</div>
	);
}

export default App;
