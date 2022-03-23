/* eslint-disable prettier/prettier */
import html from "html-literal";
import * as views from "./views";

export default (st) => html`
  ${views[st.view](st)}
`;
