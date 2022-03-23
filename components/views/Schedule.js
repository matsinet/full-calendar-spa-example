import html from "html-literal";

export default () => html`
  <section id="schedule">
    <form id="schedule-form" method="POST" action="">
      <h2>Create an Appointment</h2>
      <div>
        <input type="text" name="customer" id="customer" />
      </div>
      <div>
        <input id="start" name="start" type="datetime-local">
      </div>
      <div>
        <input id="end" name="end" type="datetime-local">
      </div>

      <input type="submit" name="submit" value="Schedule" />
    </form>
  </section>
`;
