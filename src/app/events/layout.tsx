import { EventsNavCalendarList } from "#/components/EventsNavCalendarList";
import { Header } from "#/components/Header";
import { Nav } from "#/components/Nav";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <section>
      <Header />
      <Nav />
      <EventsNavCalendarList />
      {children}
    </section>
  );
}
