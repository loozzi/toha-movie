import { Rate } from 'antd'
import { useAppDispatch, useAppSelector } from '~/app/hook'
import { selectIsAuthenticated } from '~/hooks/auth/auth.slice'
import { movieActions } from '~/hooks/movie/movie.slice'
import { RateRequest } from '~/models/rate'

interface RateCompProps {
  value: number | undefined
  movie_id: number
}

const RateComp = (props: RateCompProps) => {
  const { value, movie_id } = props

  const onRateChange = (value: number) => {
    const payload: RateRequest = {
      movie_id: movie_id,
      score: value * 2
    }
    dispatch(movieActions.rateMovie(payload))
    console.log(payload)
  }

  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const dispatch = useAppDispatch()

  return <Rate onChange={onRateChange} allowHalf disabled={!isAuthenticated} value={Math.round((value ?? 0) * 2) / 2} />
}

export default RateComp
