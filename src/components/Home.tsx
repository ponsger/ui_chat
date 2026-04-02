import { useChat } from "../hooks/useChat";

export default function Home() {

    const {state, dispatch} = useChat();

    const {is18OrOlder} = state;

    const setIs18OrOlder = (value: boolean) => {
        localStorage.setItem("is18OrOlder", value.toString());
        dispatch({ type: "SET_IS_18_OR_OLDER", payload: { is18OrOlder: value } });
    }

    const setConsent = (value: boolean) => {
        localStorage.setItem("consent", value.toString());
        dispatch({ type: "SET_CONSENT", payload: { consent: value } });
    }

  return (
    <div>
        <h1 className="text-center mt-5">Welcome to the <b>Daalpha Project</b> Research Study</h1>
        <p className="text-center mt-3">Please read the following information carefully before proceeding.</p>
        <div className="container mt-4">
            <div className="card p-4">
                <h2>Participant Information Sheet</h2>
                <p>You are being invited to take part in a research project regarding evaluating AI specialized usability. Before you decide whether to participate, it is important for you to understand why the research is being done and what it will involve.</p>
                <p><strong>Investigator:</strong> ANORVE PONS, GERMAN : german.s.anorve-pons@durham.ac.uk</p>
                <p><strong>Supervisor:</strong> BENCOMO, NELLY : nelly.bencomo@durham.ac.uk</p>
                <h3>1. What is the purpose of the study?</h3>
                <p>The aim of this study is to test the effectiveness of <b>daalpha</b> in a real-world setting. The results will contribute to my PhD dissertation.</p>
                <h3>2. Do I have to take part?</h3>
                <p>No. Participation is entirely voluntary. If you decide to take part, you are still free to withdraw at any time and without giving a reason by simply closing this browser tab.</p>
                <h3>3. What will happen to my data?</h3>
                <ul>
                    <li><strong>Anonymity:</strong> We do not collect names, IP addresses, or any personally identifiable information. Your interactions with the model will be completely anonymous.</li>
                    <li><strong>Storage:</strong> Data will be stored securely on Durham University managed systems (OneDrive/SharePoint) and will be destroyed upon completion of the project.</li>
                    <li><strong>Usage:</strong> Aggregated data will be used solely for academic purposes and model analysis.</li>
                </ul>
                <h3>Consent Form</h3>
                <p>By checking the box below and clicking "Start", you confirm that:</p>
                <ul>
                    <li>I have read and understood the information above for this study.</li>
                    <li>I have had the opportunity to consider the information and contact the researcher if I had any questions.</li>
                    <li>I understand that my participation is voluntary and that I am free to withdraw at any time by closing this window.</li>
                    <li>I agree to my anonymous data being used for the purposes of this research.</li>
                </ul>
                <div className="form-check mt-3">
                    <input className="form-check-input" type="checkbox" id="consentCheck" onChange={(e) => setIs18OrOlder(e.target.checked)} />
                    <label className="form-check-label" htmlFor="consentCheck">
                        <i>I confirm that I am 18 years of age or older and I voluntarily agree to participate under these terms.</i>
                    </label>
                </div>
                <button className="btn btn-primary mt-3" onClick={() => setConsent(true)} disabled={!is18OrOlder}>
                    Start Test
                </button>
            </div>
        </div>
    </div>
  )
}
