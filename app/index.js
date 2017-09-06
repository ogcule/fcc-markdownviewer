class MarkDownViewer extends React.Component {
  render(){
    <section>I am fred</section>;
  };
}

class BrowserViewer extends React.Component {
  render(){
     <section>I am Two</section>;
  }
}
class MarkDownContainer extends React.Component{
  render(){
    return (
     <header>My markdown viewer</header>
     <main>
        <BrowserViewer />
     </main>

      );

  }
}
ReactDOM.render(
  <MarkDownContainer />,
  document.getElementById('root')
);
