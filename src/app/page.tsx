import Row from "@/components/Row";
import { requests } from "@/lib/request";

export default function Home() {
  return (
    <main>
      <Row
        title="Netflix Originals"
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow={true}
      />
      <Row
        title="Trending"
        fetchUrl={requests.fetchTrending}
        isLargeRow={false}
      />
      <Row
        title="Top Rated"
        fetchUrl={requests.fetchTopRated}
        isLargeRow={false}
      />
      <Row
        title="Action Movies"
        fetchUrl={requests.fetchActionMovies}
        isLargeRow={false}
      />
      <Row
        title="News Movies"
        fetchUrl={requests.fetchNewsMovies}
        isLargeRow={false}
      />
      <Row
        title="Kids Movies"
        fetchUrl={requests.fetchKidsMovies}
        isLargeRow={false}
      />
      <Row
        title="Romance Movies"
        fetchUrl={requests.fetchRomanceMovies}
        isLargeRow={false}
      />
      <Row
        title="Documentaries"
        fetchUrl={requests.fetchDocumentMovies}
        isLargeRow={false}
      />
    </main>
  );
}
