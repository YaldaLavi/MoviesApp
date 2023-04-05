

 type MovieDetail = {
    id : number,
    numberOfRates: number,
    comments: string[],
    rate: number,
  };

  type MovieInfo = {
    id : number,
    poster_path: string,
    title: string,
    name: string,
    first_air_date: string,
    release_date: string,
    media_type: string,
    vote_average: string,
    comments: string[],
    rate: number,
  };

 
 export type { MovieInfo, MovieDetail };
 