import { useParams } from 'react-router'

const WatchMoviePage = () => {
  const { slug } = useParams()
  console.log(slug)

  return <div>watch</div>
}

export default WatchMoviePage
