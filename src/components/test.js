import React, { Component } from 'react';

class OpenAIComponent extends Component {
  constructor() {
    super();
    this.state = {
      prompt: '',
      output: '',
    };
  }

  API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

  async getCompletion(prompt) {
    const response = await fetch(`https://api.openai.com/v1/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.API_KEY}`,
      },
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt: prompt,
        max_tokens: 20,
      }),
    });

    const data = await response.json();
    return data.choices[0].text;
  }

  handlePromptChange = (event) => {
    this.setState({ prompt: event.target.value });
  };

  handleGenerateClick = async () => {
    if (!this.state.prompt) {
      window.alert("Please enter a prompt");
      return;
    }

    const response = await this.getCompletion(this.state.prompt);
    this.setState({ output: response });
  };

  render() {
    return (
      <div>
        <h1>TEST GPT API</h1>
        <input
          type="text"
          value={this.state.prompt}
          onChange={this.handlePromptChange}
        />
        <button onClick={this.handleGenerateClick}>enviar</button>
        <div>
          <h2>Output:</h2>
          <p>{this.state.output}</p>
        </div>
      </div>
    );
  }
}

export default OpenAIComponent;