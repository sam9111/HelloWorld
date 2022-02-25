export default function Card(props) {
  const { articles } = props;

  return (
    <div className=" space-y-6 ">
      {articles.map((article) => (
        <div className="rounded-2xl  bg-black shadow-black shadow">
          {article.media && (
            <img
              className=" p-2 mx-auto rounded-2xl"
              src={article.media}
              alt=""
            ></img>
          )}
          <div className="px-6 py-4">
            <div className="flex space-x-2">
              <h1 className="font-medium text-xl mb-2 text-white">
                {article.title}
              </h1>

              <a className="text-gray-500 text-base h-6" href={article.link}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>
            <h2 className="text-sm mb-2 text-gray-500">
              {article.published_date}
            </h2>
            <p className="text-base mb-2 text-white  p-1  ">
              #{article.topics}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
