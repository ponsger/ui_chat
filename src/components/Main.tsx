import { useChat } from '../hooks/useChat';
import Card from './Card';
import Chat from './Chat';
import Sidebar from './Sidebar';
import { Fragment, useState, useEffect } from 'react';


function Main() {

  const {state, dispatch} = useChat();

  const { alpha, tau, theme, addTau } = state;

  const [isShowingMenu, setIsShowingMenu] = useState(true);
  const [testConnection, setTestConnection] = useState(false);

  const [NDCChosedButton, setNDCChosedButton] = useState(false);
  const [PLChosedButton, setPLChosedButton] = useState(false);


  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const value = params.get("id");

    if (value) {
      setTestConnection(true);
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", state.theme);
  }, [state.theme]);


  const toggleTheme = () => {
    dispatch({ type: "SET_THEME", payload: { theme: state.theme === "light" ? "dark" : "light" } });
  };

  return (
    <Fragment>
      <div className="d-flex vh-100">
        <Sidebar isOpen={isShowingMenu} toggleTheme={toggleTheme} setIsOpen={setIsShowingMenu} testConnection={testConnection} />

        {/* Main content */}
        <main style={{ minWidth: 0 }} className={`w-100 p-4 ${theme === "light" ? "bg-light text-dark" : "bg-dark text-light"}`}>

          <div className="d-flex flex-column gap-3 mb-5 justify-content-center">
            <Card title="Domain - audience α" theme={theme}>
              Talking about Programming Languages and EDC, which one do you want to talk about? This will help the model to adapt its vocabulary and style to better suit your needs and preferences. Please select the topic you want to talk about, and the model will adjust its responses accordingly.
              <hr className={`bg-${theme === "light" ? "dark" : "light"} border-2 border-top`} />
              <div className="mb-3">
                <label htmlFor="topicRelated" className="form-label"><b> Please specify the topic you want to talk about: </b></label>
                <br />
                <label htmlFor="option1" className={NDCChosedButton ? "btn btn-primary mx-2" : "btn btn-outline-primary mx-2"} onClick={() => { dispatch({ type: "SET_TOPIC_RELATED", payload: { topicRelated: "NDC" } }); setNDCChosedButton(true); setPLChosedButton(false); }}>NDC</label>
                <label htmlFor="option2" className={PLChosedButton ? "btn btn-primary mx-2" : "btn btn-outline-primary mx-2"} onClick={() => { dispatch({ type: "SET_TOPIC_RELATED", payload: { topicRelated: "PL" } }); setPLChosedButton(true); setNDCChosedButton(false); }}>Programming Languages</label>
                <input type='radio' className="btn-check" name="options" id="option1" value="NDC" onChange={(e) => dispatch({ type: "SET_TOPIC_RELATED", payload: { topicRelated: e.target.value } })} />
                <input type='radio' className="btn-check" name="options" id="option2" autoComplete="off" value="PL" onChange={(e) => dispatch({ type: "SET_TOPIC_RELATED", payload: { topicRelated: e.target.value } })} />
              </div>
            </Card>
            <div className='d-flex flex-column flex-lg-row gap-3'>
              <div className="flex-grow-1">
                <Card title="Set your configuration" theme={theme}>
                  <label htmlFor="range4" className="form-label">What kind of level of vocabulary do you want the model uses?</label>
                  <input type="range" className="form-range" min="1" max="3" step="1" value={alpha} id="range4" onChange={(e) => dispatch({ type: "SET_ALPHA", payload: { alpha: parseInt(e.target.value) } })} />

                  <div className="d-flex justify-content-between">
                    <label htmlFor="range5" className="form-label">Beginner</label>
                    <label htmlFor="range5" className="form-label">Intermediate</label>
                    <label htmlFor="range5" className="form-label">Advanced</label>
                  </div>
                </Card>
              </div>
              {addTau &&
                <div className="flex-grow-1">
                  <Card title="How much strict vocabulary you want the model be with you?" theme={theme}>
                    <label htmlFor="range1" className="form-label">What kind of level of vocabulary do you want the model uses?</label>
                    <input type="range" className="form-range" min="0" max="10" step="1" value={tau} id="range1" onChange={(e) => dispatch({ type: "SET_TAU", payload: { tau: parseInt(e.target.value) } })} />
                    <div className="d-flex justify-content-between">
                      <label htmlFor="range5" className="form-label">Light</label>
                      <output htmlFor="range5" id="rangeValue" aria-hidden="true">{tau}</output>
                      <label htmlFor="range5" className="form-label">Strict</label>
                    </div>
                  </Card>
                </div>
              }
            </div>
          </div>

          <div className="mt-4" style={{ backgroundColor: theme === "light" ? "rgba(var(--bs-light-rgb), var(--bs-bg-opacity)) " : "rgba(var(--bs-dark-rgb), var(--bs-bg-opacity))" }}>
            <Chat />
          </div>

        </main>
      </div>
    </Fragment>
  );
}

export default Main;
