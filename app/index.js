let React = require('react');
let ReactDOM = require('react-dom');
let PropTypes = require('prop-types');
let marked = require('marked');
require('./index.min.css'); //using atom to convert SCSS to css, this generates the index.min.css file




let exampleText = 'Heading\n=======\n\nSub-heading\n-----------\n \n### Another deeper heading\n \nParagraphs are separated\nby a blank line.\n\nLeave 2 spaces at the end of a line to do a  \nline break\n\nText attributes *italic*, **bold**, \n`monospace`, ~~strikethrough~~ .\n\nShopping list:\n\n  * apples\n  * oranges\n  * pears\n\nNumbered list:\n\n  1. apples\n  2. oranges\n  3. pears\n\nThe rain---not the reign---in\nSpain.\n\n *[Herman Fassett](https://freecodecamp.com/hermanfassett)*';


function SelectDisplayType(props){
  const displays= ["Markdown", "Browser", "Dual View"];
  const activeBtnStyle = {
    backgroundColor: "#C64212",
    color: "#ffffff"
  }
  return (
    <ul className="display-list">
      {displays.map((display) =>{
        return(
          <li
            key={display}>
            <button className="btn-select-display"
              style={display === props.selectedDisplay ? activeBtnStyle : null}
              onClick={props.updateDisplay.bind(null,display)}
              >{display}</button>
          </li>)
      })}
    </ul>
  )
}
class App extends React.Component{
  constructor(props){
  super(props);
  this.state = {
    selectedDisplay: "Dual View"
  }
  this.updateDisplay = this.updateDisplay.bind(this);
  }
  updateDisplay(display) {
    this.setState( () => {
      return {
        selectedDisplay: display
      }
    });
  }
  render(){
    return(
      <div className="container">
        <Header
          selectedDisplay={this.state.selectedDisplay}
          updateDisplay={this.updateDisplay}
        />
        <FilteredView
          selectedDisplay={this.state.selectedDisplay}
        />
        <Footer />
      </div>
    )
  }
}
function Header(props){
  return(
    <header>
     <h1>Markdown Viewer</h1>
       <SelectDisplayType
         selectedDisplay={props.selectedDisplay}
         updateDisplay={props.updateDisplay}
       />
     </header>
  )
}
function Footer(){
  return(
    <footer>Brought to you by
      <a
        href="http://olivercule.com"
        target="_blank"
        > Oliver Cule<img
          src="http://res.cloudinary.com/deyh3ywme/image/upload/v1505078888/oc-final_yerb3t.png"/>
        </a>
      </footer>
  )
}
class FilteredView extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      markdownText: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.buttonClickClear = this.buttonClickClear.bind(this);
    this.buttonClickExample =   this.buttonClickExample.bind(this);
  }
  handleChange(event) {
    this.setState({markdownText: event.target.value})
  }
  buttonClickClear(event){
    event.preventDefault();
    this.setState({markdownText: ""})
  }
  buttonClickExample(event) {
    event.preventDefault();
    this.setState({markdownText: exampleText})
  }
render(){
  return(
    <article>
    {this.props.selectedDisplay === "Browser" || <MarkDownInputForm
      buttonClickExample={this.buttonClickExample}
      buttonClickClear={this.buttonClickClear}
      selectedDisplay={this.props.selectedDisplay}
      markdownText={this.state.markdownText}
      onChange={this.handleChange}/>}
    {this.props.selectedDisplay === "Markdown"  || <BrowserViewer
      selectedDisplay={this.props.selectedDisplay}
      textarea={this.state.markdownText}/>}
  </article>
  )
}
}
function Clear(props) {
  return (
    <button
     style= {!props.markdownText ? {visibility: "hidden"} : null}
     className="btn-clear"
     onClick={props.buttonClickClear.bind(this)}
      ></button>
  )
}
function Example(props){
  return(
    <button
      className="btn-example"
      onClick={props.buttonClickExample.bind(this)}></button>)
}
class MarkDownInputForm extends React.Component {
  render(){
    return (
      <section style={this.props.selectedDisplay === "Markdown" ? {maxWidth: "100%" , flex: "1 1 100%"} : null}>
        <form className="markdown-form">
          <div className="markdown-header">
          <Example buttonClickExample={this.props.buttonClickExample}/>
          <label htmlFor='markdown-text'>Markdown</label>
          <Clear markdownText={this.props.markdownText}
                 buttonClickClear={this.props.buttonClickClear}/>
          </div>
          <textarea
            id='markdown-text'
            value={this.props.markdownText}
            onChange={this.props.onChange}
            placeholder="Enter your Markdown here:"
            type="text">

            </textarea>
        </form>
      </section>
     )
  };
}

class BrowserViewer extends React.Component {
  createMarkup(value) {
  let markUp = marked(value, {sanitize: true});
  return {__html: markUp};
}
  render(){
    return(
      <section style={this.props.selectedDisplay === "Browser" ? {maxWidth: "100%", flex: "1 1 100%"} : null}>
        <div className="markdown-output">
          <div className="header">Browser view</div>
          <div className="output-text" dangerouslySetInnerHTML={this.createMarkup(this.props.textarea)}>
        </div>
        </div>
      </section>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
