import Row from "@/components/Row";
import { requests } from "@/lib/request";

export default function Home() {
  return (
    <main>
      <h1 className="text-center text-3xl">トップページ</h1>
      <Row fetchUrl={requests.fetchActionMovies}></Row>
    </main>
  );
}
