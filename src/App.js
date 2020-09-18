import React, { Component } from "react";
import "./App.css";
import Form from "./Form";

class App extends Component {
  state = {
    conversations: [],
    conversationID: 0,
    showForm: false,
    messages: [],
    showMessages: false,
    findMessages: [],
    messageID: 0,
    thoughts: [],
    showThoughts: false,
    findThoughts: [],
    searchTerm: "",
  };

  componentDidMount() {
    fetch("http://localhost:8000/conversations")
      .then((response) => response.json())
      .then((conversations) => this.setState({ conversations }));
    fetch("http://localhost:8000/messages")
      .then((response) => response.json())
      .then((messages) => this.setState({ messages }));
    fetch("http://localhost:8000/thoughts")
      .then((response) => response.json())
      .then((thoughts) => this.setState({ thoughts }));
  }

  addConversation = (title) => {
    fetch("http://localhost:8000/conversations/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: title }),
    })
      .then((response) => response.json())
      .then((conversation) => {
        this.setState({
          conversations: [...this.state.conversations, conversation],
        });
      });
  };

  addMessage = (text, conversation) => {
    fetch("http://localhost:8000/messages/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: text, conversation: conversation }),
    })
      .then((response) => response.json())
      .then((message) => {
        this.setState({
          messages: [...this.state.messages, message],
          findMessages: [...this.state.findMessages, message],
        });
      });
  };

  addThought = (text, message) => {
    fetch("http://localhost:8000/thoughts/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: text, message: message }),
    })
      .then((response) => response.json())
      .then((thought) => {
        this.setState({
          thoughts: [...this.state.thoughts, thought],
        });
      });
  };

  handleClick = (e) => {
    if (e.target.className === "convo") {
      const findMessages = this.state.messages.filter((message) => {
        return message["conversation"] === parseInt(e.target.value);
      });
      this.setState({
        conversationID: parseInt(e.target.value),
        showMessages: true,
        findMessages: findMessages,
      });
    } else if (e.target.className === "add-message") {
      this.setState({
        showForm: true,
      });
    } else if (e.target.className === "message-button") {
      this.setState({
        showThoughts: true,
        messageID: parseInt(e.target.value),
        showForm: true,
      });
    } else if (e.target.className === "add-conversation") {
      this.setState({
        showForm: true,
      });
    }
  };

  searchConversations = () => {
    return this.state.conversations.filter((convo) => {
      return convo["title"]
        .toLowerCase()
        .includes(this.state.searchTerm.toLowerCase());
    });
  };

  showConversations = () => {
    if (this.state.conversations) {
      return this.searchConversations().map((conversation) => {
        return (
          <button
            name="convo"
            onClick={this.handleClick}
            value={conversation.id}
          >
            {conversation.title}
          </button>
        );
      });
    }
  };

  showMessages = () => {
    return this.state.findMessages.map((message) => {
      return (
        <div className="one-message">
          <p>{message["text"]}</p>
          <p>Date/Time created: {message["date_time_created"]}</p>
          <p>Thoughts:</p>
          {message["thoughts"].map((thought) => {
            return (
              <p className="message-thought">
                {thought["text"]}, {thought["date_time_created"]}
              </p>
            );
          })}
          <button
            onClick={this.handleClick}
            className="message-button"
            value={message["id"]}
          >
            Add Thought
          </button>
          {this.state.showForm ? (
            <Form
              message={this.state.messageID}
              postThought={this.addThought}
            />
          ) : null}
        </div>
      );
    });
  };

  handleChange = (e) => {
    this.setState({
      searchTerm: e.target.value,
    });
  };

  render() {
    return (
      <div className="App">
        <input
          className="searchbar"
          placeholder="search conversations.."
          onChange={this.handleChange}
        ></input>
        {this.showConversations()}
        <div className="messages-div">
          {this.state.showMessages ? this.showMessages() : null}
          {this.state.showMessages ? (
            <button onClick={this.handleClick} className="add-message">
              Add Message
            </button>
          ) : null}
          {this.state.showForm ? (
            <Form
              conversation={this.state.conversationID}
              postMessage={this.addMessage}
            />
          ) : null}
        </div>
        <button name="add-conversation" onClick={this.handleClick} className="add-conversation">
          Add conversation
        </button>
        {this.state.showForm ? (
          <Form postConversation={this.addConversation} />
        ) : null}
      </div>
    );
  }
}

export default App;
