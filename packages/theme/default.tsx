import { WidgetNames } from "../types";
import SelectWidget from "./SelectWidget";

export default {
  widgets: {
    [WidgetNames.SelectWidget]: SelectWidget,
    [WidgetNames.TextWidget]: SelectWidget,
    [WidgetNames.NumberWidget]: SelectWidget,
  },
};
