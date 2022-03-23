import { Header, Nav, Main, Footer } from "./components";
import * as store from "./store";
import Navigo from "navigo";
import { capitalize } from "lodash";
import dotenv from "dotenv";

import axios from "axios";

dotenv.config();

const router = new Navigo("/");

function render(st) {
  document.querySelector("#root").innerHTML = `
    ${Header(st)}
    ${Nav(store.Links)}
    ${Main(st)}
    ${Footer()}
  `;

  router.updatePageLinks();

  addEventListeners(st);
}

function addEventListeners(st) {
  // add menu toggle to bars icon in nav bar
  document
    .querySelector(".fa-bars")
    .addEventListener("click", () =>
      document.querySelector("nav > ul").classList.toggle("hidden--mobile")
    );

  if (st.view === "Schedule") {
    document.querySelector("form").addEventListener("submit", event => {
      event.preventDefault();

      const inputList = event.target.elements;

      const requestData = {
        customer: inputList.customer.value,
        start: new Date(inputList.start.value).toJSON(),
        end: new Date(inputList.end.value).toJSON(),
      };

      axios
        .post(`${process.env.API_URL}/appointments`, requestData)
        .then(response => {
          // Push the new pizza onto the Pizza state pizzas attribute, so it can be displayed in the pizza list
          store.Appointments.appointments.push(response.data);
          router.navigate("/appointments");
        })
        .catch(error => {
          console.log("It puked", error);
        });
    });
  }

  if (st.view === "Appointments") {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth',
      events: st.appointments || []
    });
    calendar.render();
  }
}

//  ADD ROUTER HOOKS HERE ...
router.hooks({
  before: (done, params) => {
    const page = params && params.data && params.data.page ? capitalize(params.data.page) : "Home";

    if (page === "Home") {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=st.%20louis&appid=${process.env.OPEN_WEATHER_MAP_API_KEY}`
        )
        .then((response) => {
          store.Home.weather = {};
          store.Home.weather.city = response.data.name;
          store.Home.weather.temp = response.data.main.temp;
          store.Home.weather.feelsLike = response.data.main.feels_like;
          store.Home.weather.description = response.data.weather[0].main;
          done();
        })
        .catch((err) => console.log(err));
    } else if (page === "Appointments") {
      axios
        .get(`${process.env.API_URL}/appointments`)
        .then((response) => {
          const events = response.data.map(event => {
            return {
              id: event._id,
              title: event.customer,
              start: new Date(event.start),
              end: new Date(event.end)
            };
          });
          store.Appointments.appointments = events;
          console.log('matsinet-store.Appointments.appointments:', store.Appointments.appointments);
          done();
        })
        .catch((error) => {
          console.log("It puked", error);
        });
    } else {
      done();
    }
  }
});

router
  .on({
    "/": () => render(store.Home),
    ":page": (params) => {
      let page = capitalize(params.data.page);
      render(store[page]);
    },
  })
  .resolve();
