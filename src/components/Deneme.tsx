export default function Deneme() {


  const onClick = (lang) => {
    window.location.search = `?language=${lang}`
  };

  return (
    <div>
      <button onClick={() => onClick("en")}>en</button>
      <button onClick={() => onClick("tr")}>tr</button>
    </div>
  );
}
