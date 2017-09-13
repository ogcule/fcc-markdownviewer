let React = require('react');
let ReactDOM = require('react-dom');
let PropTypes = require('prop-types');
let marked = require('marked');
require('./index.min.css'); //using atom to convert SCSS to css, this generates the index.min.css file

class Nav extends React.Component{
  render(){
    return(
    <nav>
        <h1>Markdown Viewer</h1>
        <div>
          <button onClick="">Markdown</button>
          <button>Editor</button>
          <button>dual</button>
        </div>
    </nav>
    )
  }
}
class MarkdownViewer extends React.Component{
  render(){
    return(
      <div>
        <Nav />
        <div className="main-container">
          <MarkDownInputForm />
          <footer>Coded by
            <a
              href="http://olivercule.com"
              target="_blank"
              >Oliver Cule<img
                src="http://res.cloudinary.com/deyh3ywme/image/upload/v1505078888/oc-final_yerb3t.png"/>
              </a>
            </footer>
          </div>
      </div>
      )
  }
}
class MarkDownInputForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markdownText: ''
    };
    this._handleChange = this._handleChange.bind(this);
    this._handleClick = this._handleClick.bind(this);
    this._clearClick = this._clearClick.bind(this);
  }
  _clearClick(event){
    event.preventDefault();
    this.setState({markdownText:""});
  }
  _handleChange(event) {
    this.setState({markdownText: event.target.value})
  }
  _handleClick(event) {
    event.preventDefault();
    this.setState({markdownText:
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
          <label htmlFor='markdown-text'>Text using Markdown syntax</label>
          <div className="btn-container">
            <button onClick={this._handleClick}>Example text</button>
            <button onClick={this._clearClick}>Clear text</button>
          </div>
          <textarea
            id='markdown-text'
            value={this.state.markdownText}
            onChange={this._handleChange}
            placeholder="Enter your Markdown here:"
            type="text">
            </textarea>
        </form>
      </section>
      <section /*className="display-none"*/>
        <BrowserViewer textarea={this.state.markdownText}/>
      </section>
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
        <div className="markdown-output">
          <p>Text viewed in browser</p>
          <div className="output-text" dangerouslySetInnerHTML={this.createMarkup()}>
        </div>
        </div>
    );
  }
}
ReactDOM.render(
  <MarkdownViewer />,
  document.getElementById('root')
);
