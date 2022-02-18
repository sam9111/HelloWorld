export default function World(props) {
  const { labels } = props;
  console.log(labels);
  return (
    <div className="">
      {labels &&
        labels.map((item) => {
          return (
            <div>
              <p>{item.country}</p>
            </div>
          );
        })}
    </div>
  );
}
