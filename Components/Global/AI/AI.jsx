import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { ASK_AI_CHAT } from "../../../Context/constants";
import {
  BsSendFill,
  FaUserAlt,
  BsRobot,
  FaRegCopy,
} from "../../ReactICON/index";

const AI = () => {
  const notifySuccess = (msg) => toast.success(msg, { duration: 2000 });
  const notifyError = (msg) => toast.error(msg, { duration: 2000 });

  const [chatArray, setChatArray] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [loader, setLoader] = useState(false);
  const [errorMsg, setErrorMsg] = useState();

  useEffect(() => {
    const AI_ASK_HISTORY =
      JSON.parse(localStorage.getItem("AI_ASK_HISTORY")) || [];
    setChatArray(AI_ASK_HISTORY);
  }, []);

  const CALLING_AI = async () => {
    try {
      setLoader(true);
      const response = await ASK_AI_CHAT(prompt);
      if (response) {
        const newChatEntry = {
          prompt,
          message: response,
          timestamp: new Date().toISOString(),
        };
        const updatedChatArray = [...chatArray, newChatEntry];
        setChatArray(updatedChatArray);
        localStorage.setItem(
          "AI_ASK_HISTORY",
          JSON.stringify(updatedChatArray)
        );
        setPrompt("");
      }
      setLoader(false);
    } catch (error) {
      setLoader(false);
      setErrorMsg(error.message);
      notifyError(error.message);
      console.log(error);
    }
  };

  const copyResponse = (text) => {
    navigator.clipboard.writeText(text);
    notifySuccess("Copied successfully");
  };

  return (
    <div className="container-fluid">
      <div className="page-titles">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="javascript:void(0)">ASK</a>
          </li>
          <li className="breadcrumb-item active">
            <a href="javascript:void(0)">ERES AI</a>
          </li>
        </ol>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div>
                  <div className="d-flex align-items-center">
                    <h4 className="card-title d-sm-none d-block">Ask AI</h4>
                  </div>
                  <div className="msg-card-body-container">
                    <div
                      className="msg_card_body dz-scroll"
                      id="DZ_W_Contacts_Body3"
                    >
                      {chatArray?.map((chat, index) => (
                        <div key={index}>
                          <div className="d-flex justify-content-start mb-4">
                            <FaUserAlt className="icon" />{" "}
                            <div className="msg_cotainer mx-2">
                              <pre
                                style={{
                                  whiteSpace: "pre-wrap",
                                  wordWrap: "break-word",
                                }}
                              >
                                {chat?.prompt}
                              </pre>
                              <small>⏰ {chat?.timestamp} </small>
                              <FaRegCopy
                                onClick={() => copyResponse(chat?.prompt)}
                              />
                            </div>
                          </div>
                          <div className="d-flex justify-content-start mb-4">
                            <BsRobot className="icon" />{" "}
                            <pre
                              style={{
                                whiteSpace: "pre-wrap",
                                wordWrap: "break-word",
                              }}
                            >
                              {chat?.message}
                            </pre>
                            <FaRegCopy
                              onClick={() => copyResponse(chat?.message)}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <textarea
                    id="email-compose-editor"
                    className="textarea_editor form-control bg-transparent"
                    rows={2}
                    placeholder="Enter prompt ..."
                    onChange={(e) => setPrompt(e.target.value)}
                    value={prompt}
                  />
                  <div className="text-start mt-4 mb-3">
                    {loader ? (
                      <button
                        className="btn btn-primary btn-sl-sm"
                        type="button"
                      >
                        <div className="custom-loader"></div>
                      </button>
                    ) : (
                      <button
                        onClick={CALLING_AI}
                        className="btn btn-primary btn-sl-sm"
                        type="button"
                        disabled={!prompt}
                      >
                        <BsSendFill /> Ask AI
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AI;
