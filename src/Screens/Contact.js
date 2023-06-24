import React, { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState("");
  console.log(form);

  const handlerclick = () => {
    setForm("/");
  };

  return (
    <div className="form" style={{ marginTop: "100px" }}>
      <form>
        <h1>
          {" "}
          <span>En un click contactez nous !</span>
        </h1>
        <div>
          <input
            className="input1"
            placeholder="Name"
            type="text"
            name="name"
          />
          <label className="label1" for="name">
            <span></span>
          </label>
        </div>
        <div>
          <input
            className="input2"
            placeholder="Email"
            type="text"
            name="email"
          />
          <label className="label2" for="email">
            <span></span>
          </label>
        </div>
        <div>
          <input
            className="input3"
            type="text"
            name="phone"
            placeholder="Phone"
          />
          <label className="label3" for="phone">
            <span></span>
          </label>
        </div>
        <div>
          <textarea
            className="input4"
            placeholder="your message.."
            name="message"
          ></textarea>
        </div>
        <div>
          <input className="input5" type="checkbox" name="checkbox" />
          <label className="label5">Send copy to my-email</label>
        </div>
        <div>
          <div>
            <div></div>
            <button className="btn-11" onClick={handlerclick}>
              Send Email
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
