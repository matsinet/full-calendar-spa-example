import html from "html-literal";

const defaultStartDate = new Date();
const defaultEndDate = new Date();
defaultEndDate.setHours(defaultStartDate.getHours() + 1);

export default () => html`
  <section id="schedule">
    <form id="schedule-form" method="POST" action="">
      <h2>Create an Appointment</h2>
      <div>
        <input type="text" name="customer" id="customer" placeholder="Appointment Title" />
      </div>
      <div>
        <input id="start" name="start" type="datetime-local" value="${defaultStartDate.toJSON().substring(0,16)}">
      </div>
      <div>
        <input id="end" name="end" type="datetime-local" value="${defaultEndDate.toJSON().substring(0,16)}">
      </div>

      <input type="submit" name="submit" value="Schedule" />
    </form>
  </section>
`;
