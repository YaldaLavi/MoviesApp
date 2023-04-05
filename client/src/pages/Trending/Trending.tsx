import axios from "axios";
import "./Trending.css";
import { useEffect, useState } from "react";
import SingleContent from "../../component/SingleContent/SingleContent";
// import SingleContent from "../../components/SingleContent/SingleContent";
// import CustomPagination from "../../components/Pagination/CustomPagination";

const Trending = () => {
  const [content, setContent] = useState([]);

  const fetchTrending = async () => {
    const { data } = await axios.get(
      `http://localhost:3001/api/trending/list`
    );
    setContent(data.results);
  };

  useEffect(() => {
    // window.scroll(0, 0);
    fetchTrending();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <span className="pageTitle">Trending Today</span>
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

export default Trending;
