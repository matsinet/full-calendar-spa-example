import html from "html-literal";

export default (st) => html`
${st.appointments ? `<div class="calendar-container">
    <div id="calendar"></div>
  </div>` : ""
}
${st.event ? `<div class="appointment-container">
    <h3>${st.event.title}</h3>
    <div>
      <em>Start: </em><span>${st.event.start.toLocaleString()}</span>
    </div>
    <div>
      <em>End: </em><span>${st.event.end.toLocaleString()}</span>
    </div>
  </div>` : ""
}
`;
