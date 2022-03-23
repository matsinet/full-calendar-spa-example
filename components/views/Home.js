import html from "html-literal";

const kelvinToFahrenheit = (kelvinTemp) =>
  Math.round((kelvinTemp - 273.15) * (9 / 5) + 32);

export default (st) => html`
  <section id="jumbotron">
    <h2>SavvyCoders JavaScript Fullstack Bootcamp</h2>
    <a href="" onClick="alert('Hello! You clicked the Button!')"
      >"Call to Action Button"</a
    >
  </section>
  <h3>
    Temperature in ${st.weather.city} is
    ${kelvinToFahrenheit(st.weather.temp)}F. It feels like
    ${kelvinToFahrenheit(st.weather.feelsLike)}F.
  </h3>
`;
