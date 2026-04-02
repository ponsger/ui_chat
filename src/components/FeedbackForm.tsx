import { useEffect, useState, useRef, useMemo } from "react";
import type { Dispatch, SetStateAction, SubmitEvent } from "react";
import { useChat } from "../hooks/useChat";
import { Modal } from "bootstrap";
import { connection } from "../data/connection";
import type { IChatMessage, ErrorData } from "../types";

interface FeedbackFormProps {
  messages: IChatMessage[];
  value: number;
  setAttemps: Dispatch<SetStateAction<number>>;
  error: ErrorData[];
}

const FeedbackForm = ({ messages, value, setAttemps, error }: FeedbackFormProps) => {

  const modalRef = useRef<HTMLDivElement | null>(null);
  const modalInstance = useRef<Modal | null>(null);

  const { state } = useChat();
  const { consent, is18OrOlder, topicRelated } = state;

  const [expertise, setExpertise] = useState("");
  const [doforLiving, setDoforLiving] = useState("");
  const [student, setStudent] = useState("");
  const [question1, setQuestion1] = useState("");
  const [question2, setQuestion2] = useState("");
  const [question3, setQuestion3] = useState("");
  const [question4, setQuestion4] = useState("");
  const [question5, setQuestion5] = useState("");

  const MAX_ATTEMPS = 3;

  useEffect(() => {
    if (modalRef.current) {
      modalInstance.current = new Modal(modalRef.current, {
        backdrop: "static",
        keyboard: true,
      });
    }
  }, []);

  useEffect(() => {
    if (value >= MAX_ATTEMPS && modalInstance.current) {
      modalInstance.current.show();
    }
    localStorage.setItem("attemps", value.toString());
  }, [value]);

  const isStudent = useMemo(() => {
    return doforLiving === "Undergraduate Student";
  }, [doforLiving]);

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    // # Add to backend consent and is18OrOlder

    const feedbackData = {
      consent: consent, 
      is18OrOlder: is18OrOlder,
      messages: messages ?? [],
      error: error && error.hasOwnProperty('hasError') ? error : { hasError: false, message: "" },
      expertise: expertise ?? "",
      doforLiving: doforLiving ?? "",
      student: student ?? "",
      isStudent: Boolean(isStudent),
      question1: question1 ?? "",
      question2: question2 ?? "",
      question3: question3 ?? "",
      question4: question4 ?? "",
      question5: question5 ?? "",
      topicRelated: topicRelated ?? ""
    };

    const endpoint = connection.url + "feedback";

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(feedbackData),
    })
    const data = await response.json();
    if (response.ok) {
      console.log("Feedback submitted successfully:", data);
    } else {
      console.error("Error submitting feedback:", data);
    }

    // Cerrar el modal después de enviar
    if (modalInstance.current) {
      modalInstance.current.hide();
    }

    localStorage.removeItem("attemps");
    setAttemps(0);
  };

  return (
    <div className="modal fade" ref={modalRef} tabIndex={-1}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <div>
              <h5 className="modal-title">
                LLM Output Evaluation Survey Instructions:{" "}
              </h5>
              <h6 className="modal-subtitle mb-2 text-muted">
                Please review the model's response and select the option that
                best describes your assessment for each category.
              </h6>
            </div>
          </div>
          <div className="modal-body">
            <form onSubmit={(e) => handleSubmit(e)}>

              <div className="mb-3">
                {
                  topicRelated === "PL" ? (
                    <label htmlFor="expertise" className="form-label">
                      What is your level of expertise in programming and software
                      development?
                    </label>
                  ) : topicRelated === "NDC" ? (
                    <label htmlFor="expertise" className="form-label">
                      What is your level of expertise in law and/or EDC (Electronic Discovery and Compliance)?
                    </label>
                  ) : (<></>)
                }
                <select
                  className="form-select"
                  id="expertise"
                  value={expertise}
                  onChange={(e) => setExpertise(e.target.value)}
                >
                  <option value="">Select an option</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Expert">Expert</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">
                  What is your current professional or academic status?
                </label>
                <div className="form-check">
                  <select className="form-select" id="doforLiving" value={doforLiving} onChange={(e) => setDoforLiving(e.target.value)}>
                    <option value="">Select an option</option>
                    <option value="Professional / Practitioner">Professional / Practitioner (e.g., Lawyer, Software Engineer, Consultant).</option>
                    <option value="Undergraduate Student">Undergraduate Student (Years 1–3).</option>
                    <option value="Postgraduate Student">Postgraduate Student</option>
                    <option value="Researcher / PhD Candidate">Researcher / PhD Candidate.</option>
                  </select>
                </div>

              </div>

              {isStudent && (
                <div className="mb-3">
                  <label htmlFor="student" className="form-label">
                    Please specify your current year of study in your academic program:
                  </label>
                  <select className="form-select mb-2" id="student" value={student} onChange={(e) => setStudent(e.target.value)}>
                    <option value="">Select an option</option>
                    <option value="Year 1">Year 1</option>
                    <option value="Year 2">Year 2</option>
                    <option value="Year 3">Year 3+</option>
                  </select>
                </div>
              )}

              <div className="mb-3">
                <label htmlFor="question1" className="form-label">
                  How strictly did the model remain within the boundaries of the
                  requested programming topic?
                </label>
                <select
                  className="form-select"
                  id="question1"
                  value={question1}
                  onChange={(e) => setQuestion1(e.target.value)}
                >
                  <option value="">Select an option</option>
                  <option value="1">
                    1 – Irrelevant / Completely drifted from the topic.
                  </option>
                  <option value="2">
                    2 – Mostly irrelevant / Significant tangential information.
                  </option>
                  <option value="3">
                    3 – Neutral / Met the topic requirements partially.
                  </option>
                  <option value="4">
                    4 – Mostly focused / Stayed on topic with minor deviations.
                  </option>
                  <option value="5">
                    5 – Perfectly focused / Fully addressed the specific topic.
                  </option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="question2" className="form-label">
                  To what extent did the model successfully implement the
                  'target vocabulary' or specific style requested (vs. using its
                  default generic language)?
                </label>
                <select
                  className="form-select"
                  id="question2"
                  value={question2}
                  onChange={(e) => setQuestion2(e.target.value)}
                >
                  <option value="">Select an option</option>
                  <option value="1">
                    1 – No shift detected / Used standard default language.
                  </option>
                  <option value="2">
                    2 – Minimal or inconsistent shift in vocabulary.
                  </option>
                  <option value="3">
                    3 – Perceptible shift, but felt forced or "unnatural."
                  </option>
                  <option value="4">
                    4 – Clear and consistent shift throughout most of the
                    response.
                  </option>
                  <option value="5">
                    5 – Successful and seamless implementation of the target
                    vocabulary.
                  </option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">
                  Did the model generate 'invented' technical terms,
                  non-existent libraries, or syntactically invalid code?
                </label>
                <select
                  className="form-select"
                  id="question3"
                  value={question3}
                  onChange={(e) => setQuestion3(e.target.value)}
                >
                  <option value="">Select an option</option>
                  <option value="0"> 0 – I do not know / I am not sure.</option>
                  <option value="1">
                    {" "}
                    1 – Severe hallucination (Major libraries/logic are entirely
                    fictitious).
                  </option>
                  <option value="2">
                    {" "}
                    2 – Multiple technical hallucinations detected.
                  </option>
                  <option value="3">
                    {" "}
                    3 – Minor hallucinations (e.g., one non-existent parameter
                    in a real function).
                  </option>
                  <option value="4">
                    {" "}
                    4 – Near perfect (Minor phrasing issues, but technically
                    sound).
                  </option>
                  <option value="5">
                    {" "}
                    5 – Total integrity (All technical content is real and
                    functional).
                  </option>
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="question4" className="form-label">
                  Did the use of the target vocabulary negatively impact the
                  clarity or accuracy of the technical explanation?
                </label>
                <select
                  className="form-select"
                  id="question4"
                  value={question4}
                  onChange={(e) => setQuestion4(e.target.value)}
                >
                  <option value="">Select an option</option>
                  <option value="1">
                    {" "}
                    1 – High impact: The vocabulary made the explanation
                    confusing or incorrect.
                  </option>
                  <option value="2">
                    {" "}
                    2 – Noticeable negative impact on technical quality.
                  </option>
                  <option value="3"> 3 – Neutral impact.</option>
                  <option value="4">
                    {" "}
                    4 – Minimal impact; the technical explanation remained
                    clear.
                  </option>
                  <option value="5">
                    {" "}
                    5 – No impact; the model balanced style and technical
                    accuracy perfectly.
                  </option>
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="question5" className="form-label">
                  If you detected a hallucination (invented code, fake library,
                  or false technical claim), please specify it here:
                </label>
                <textarea
                  className="form-control"
                  id="question5"
                  rows={3}
                  value={question5}
                  onChange={(e) => setQuestion5(e.target.value)}
                ></textarea>
              </div>



              <button type="submit" className="btn btn-primary">
                {" "}
                Submit{" "}
              </button>

            </form>
          </div>
        </div>
      </div >
    </div >
  );
};

export default FeedbackForm;
