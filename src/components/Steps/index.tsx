import data from "../../data/30-01-2022.json";
import { Step } from "./Step";

export function Steps() {
  return (
    <>
      {data.data.map((item) => (
        <Step
          key={item.title}
          title={item.title}
          place={item.place}
          time={item.time}
        />
      ))}
    </>
  );
}
