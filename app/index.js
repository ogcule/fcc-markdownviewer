let React = require('react');
let ReactDOM = require('react-dom');
let PropTypes = require('prop-types');
require('./index.min.css');
class MarkdownViewer extends React.Component{
  render(){
    return(
      <div>
        <header>Markdown Viewer</header>
          <MarkDownInputForm />
      </div>
      )
  }
}
class MarkDownInputForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
    this._handleChange = this._handleChange.bind(this);
    this._handleClick = this._handleClick.bind(this);
    this._clearClick = this._clearClick.bind(this);
  }
  _clearClick(e){
    e.preventDefault();
    this.setState({value:""});
  }
  _handleChange(event) {
    this.setState({value: event.target.value})
  }
  _handleClick(e) {
    e.preventDefault();
    this.setState({value:
    `Heading
=======

Sub-heading
-----------

### Another deeper heading

Paragraphs are separated
by a blank line.

Leave 2 spaces at the end of a line to do a
line break

Text attributes *italic*, **bold**,
${"`monospace`"}, ~~strikethrough~~ .

Shopping list:

  * apples
  * oranges
  * pears

Numbered list:

  1. apples
  2. oranges
  3. pears

The rain---not the reign---in
Spain.

 *[Herman Fassett](https://freecodecamp.com/hermanfassett)*`  })
  }
  render(){
    return (
      <div>
     <article>
      <section>
        <form className="markdown-form">
          <label for='markdown-text'>Text using Markdown syntax</label>
          <div className="btn-container">
            <button onClick={this._handleClick}>Example text</button>
            <button onClick={this._clearClick}>Clear text</button>
          </div>
          <textarea id='markdown-text' value={this.state.value} onChange={this._handleChange} placeholder="Enter your Markdown here:" type="text"></textarea>
        </form>
      </section>
      <BrowserViewer textarea={this.state.value}/>
       </article>
       </div>);
  };
}

class BrowserViewer extends React.Component {
  createMarkup() {
  let markUp = marked(this.props.textarea, {sanitize: true});
  return {__html: markUp};
}
  render(){
    return(
      <section>
        <div className="markdown-output">
          <p>Text viewed in browser</p>
          <div className="output-text" dangerouslySetInnerHTML={this.createMarkup()}>
        </div>
        </div>
      </section>
    );
  }
}
ReactDOM.render(
  <MarkdownViewer />,
  document.getElementById('root')
);
