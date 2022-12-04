import { ItemCalendar } from "./Item";

const calendar = [
  "2022-11-30",
  "2022-12-01",
  "2022-12-02",
  "2022-12-03",
  "2022-12-04",
  "2022-12-05",
  "2022-12-06",
  "2022-12-07",
  "2022-12-08",
  "2022-12-09",
  "2022-12-10",
  "2022-12-11",
  "2022-12-12",
  "2022-12-13",
  "2022-12-14",
  "2022-12-15",
  "2022-12-16",
];

export function Calendar() {
  const today = new Date().toLocaleDateString("es", {
    timeZone: "America/Bogota",
  });

  console.log({ today });

  return (
    <div className="bg-fuchsia-900 w-full flex md:justify-center overflow-x-scroll overflow-y-hidden whitespace-nowrap">
      {calendar.map((item) => {
        const currentDay = new Date(item).toLocaleDateString("es", {
          timeZone: "America/Bogota",
        });
        // console.log({ item, currentDay });
        const isActive = false;

        return (
          <ItemCalendar day={new Date(item)} isActive={isActive} key={item} />
        );
      })}
    </div>
  );
}
