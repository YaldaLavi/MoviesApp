import axios from "axios";
import { useEffect, useState } from "react";
import SingleContent from "../../component/SingleContent/SingleContent";

const Series = () => {

  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);



  const fetchSeries = async () => {
    const { data } = await axios.get(
      `http://localhost:3001/api/tv/list/${page}`
    );
    setContent(data.results);
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchSeries();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <span className="pageTitle">Series</span>
      <div className="trending">
        {content &&
          content.map((c:any) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
            />
          ))}
      </div>
    </div>
  );
};

export default Series;