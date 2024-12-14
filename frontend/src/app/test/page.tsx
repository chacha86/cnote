export default async function FetchHello() {

    const res = await fetch('http://localhost:3000/api/hello', {});

    const json = await res.json();
    console.log(json);

    return <button>Call API</button>;
}