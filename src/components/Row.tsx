import axios from "@/lib/axios";

export default function Row({ fetchUrl }: { fetchUrl: string }) {
  async function fetchData() {
    const request = await axios.get(fetchUrl);
    console.log(request);
  }

  fetchData();
  return <div>Row</div>;
}
