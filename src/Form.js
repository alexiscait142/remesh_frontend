import React, { Component } from "react";

class Form extends Component {
  state = {
    text: "",
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.props.conversation) {
      this.props.postMessage(
        this.state.text,
        parseInt(this.props.conversation)
      );
    } else if (this.props.message) {
      this.props.postThought(this.state.text, parseInt(this.props.message));
    } else {
      this.props.postConversation(this.state.text);
    }
  };

  render() {
    return (
      <form>
        <textarea
          placeholder={this.props.postConversation ? "enter title" : null}
          name="text"
          onChange={this.handleChange}
        ></textarea>
        <input type="submit" onClick={this.handleSubmit}></input>
      </form>
    );
  }
}

export default Form;
