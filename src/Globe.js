export default function Globe(props) {
  const { countries } = props;
  return (
    <div className="">
      {props.countries &&
        Object.keys(countries).map((country) => {
          return (
            <div>
              <p>{country}</p>
            </div>
          );
        })}
    </div>
  );
}
