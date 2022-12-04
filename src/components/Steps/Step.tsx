interface Props {
  title: string;
  description?: string;
  image?: string;
  place: string;
  time: string;
}
export function Step({ title, time, place }: Props) {
  return (
    <div className="p-4 flex relative group">
      <div>
        <div className="bg-fuchsia-100 text-fuchsia-600 font-semibold text-xs rounded-lg p-1 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 mr-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {time}
        </div>
        <div className="w-1 h-full bg-fuchsia-100 absolute left-[50px] group-last:hidden" />
      </div>
      <div className="ml-4 border-gray-200 border-b border-dashed group-last:border-0 pb-8 w-full">
        <h2 className="text-fuchsia-600 text-xl leading-none mb-2">{title}</h2>
        <p className="text-gray-400 text-sm leading-none flex items-center mb-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 mr-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
            />
          </svg>
          {place}
        </p>
        <div className="relative rounded-lg w-full h-[200px] overflow-hidden">
          <div className="absolute" />
          <img src="https://scontent.fltx1-1.fna.fbcdn.net/v/t39.30808-6/259036830_265782372246788_5845530142606591163_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=8bfeb9&_nc_eui2=AeF1gXUjg25DhaSqb8gRlZH3JMSF-2tczT8kxIX7a1zNP_I5yWt7t_UoCqlOJKw5W3UnHQvGObm3RKDcvTWOfyvP&_nc_ohc=hkWdT17iE-sAX9YJXrM&_nc_ht=scontent.fltx1-1.fna&oh=00_AfDLq67OslGoOBfw1XV6ZSFmiPWHBYvgOlodC6a_34zPdA&oe=638C0B14" />
        </div>
      </div>
    </div>
  );
}
