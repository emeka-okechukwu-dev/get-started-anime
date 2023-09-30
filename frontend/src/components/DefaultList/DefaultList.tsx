import Grid from '@mui/material/Grid'
import React, { useEffect, useState } from 'react'
import { movieList } from './MyAnimeList'

interface MovieItem {
  id: number
  title: string
  backdrop: string
  url: string
}

const Movie: React.FC<{ movie: MovieItem }> = ({ movie }) => {
  const [img, setImg] = useState<HTMLImageElement | null>(null)

  useEffect(() => {
    if (movie.backdrop) {
      const image = new Image()
      image.src = movie.backdrop
      image.onload = () => {
        setTimeout(() => {
          setImg(image)
        }, 300)
      }
      return () => {
        // When the component unmounts
        image.onload = null
      }
    }
  }, [movie.backdrop])

  return (
    <Grid item xs={12} sm={6} md={3}>
      <div className='movie'>
        {!img ? (
          <>
            <div className='movie__img--skeleton'></div>
            <div className='skeleton movie__title--skeleton'></div>
          </>
        ) : (
          <>
            <a href={movie.url} target='_blank' rel='noopener noreferrer'>
              <figure className='movie__img--wrapper'>
                <img className='movie__img' src={img.src} alt='' />
              </figure>
            </a>
            <div style={{ color: 'white' }} className='movie__title'>
              <a
                style={{ color: 'white' }}
                href={movie.url}
                target='_blank'
                rel='noopener noreferrer'
                className='movie__title--link'
              >
                {movie.title}
              </a>
            </div>
          </>
        )}
      </div>
    </Grid>
  )
}

const DefaultList: React.FC = () => {
  return (
    <div>
      <div id='movies__body'>
        <main id='movies__main'>
          <section>
            <div className='movies__container'>
              <div className='row'>
                <div className='movies__header'>
                  <h2 className='section__title movies__header--title'>
                    Emeka's Favs
                  </h2>
                </div>
                <Grid container spacing={3}>
                  {movieList.map((movie) => (
                    <Movie movie={movie} key={movie.id} />
                  ))}
                </Grid>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

export default DefaultList
