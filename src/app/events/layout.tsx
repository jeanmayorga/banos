import { EventsCalendar } from "#/components/EventsCalendar";
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
      <EventsCalendar />
      {children}
    </section>
  );
}
