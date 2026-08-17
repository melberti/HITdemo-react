import EventsFilter from "../features/event/EventsFilter";
import EventsGrid from "../features/event/EventsGrid";

var threeDays = 3;
var fourDays = 4;
var fiveDays = 5;
var tenDays = 10;
var twelveDays = 12;

var fakeData = [
  {
    id: 1,
    title: "Special Event title",
    description: "Description of special event",
    date: new Date(Date.now() + threeDays * 24 * 60 * 60 * 1000),
    time: "7:00 pm",
    image: "imageTBD",
    category: "A capella",
    venue: "Venue TBD",
    webUrl: "urlTbd",
    cost: 0,
  },

  {
    id: 2,
    title: "Another Event title",
    description: "Description of another event",
    date: new Date(Date.now() + fiveDays * 24 * 60 * 60 * 1000),
    time: "5:00 pm",
    image: "imageTBD",
    category: "Big Band",
    venue: "Venue TBD",
    webUrl: "urlTbd",
    cost: 0,
  },

  {
    id: 3,
    title: "Future Event title",
    description: "Description of future event",
    date: new Date(Date.now() + tenDays * 24 * 60 * 60 * 1000),
    time: "7:30 pm",
    image: "imageTBD",
    category: "Celtic",
    venue: "Venue TBD",
    webUrl: "urlTbd",
    cost: 0,
  },

  {
    id: 4,
    title: "Incredible Event title",
    description: "Description of incredible event",
    date: new Date(Date.now() + twelveDays * 24 * 60 * 60 * 1000),
    time: "8:00 pm",
    image: "imageTBD",
    category: "Acoustic",
    venue: "Venue TBD",
    webUrl: "urlTbd",
    cost: 0,
  },
];

function Home() {
  return (
    <>
<EventsFilter />
      <EventsGrid events={fakeData} />
    </>
  );
}

export default Home;
