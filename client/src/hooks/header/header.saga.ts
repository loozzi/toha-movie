import { all, call, put, takeLatest } from 'redux-saga/effects'
import { headerActions } from './header.slice'
import api from '~/services'
import { IResponse } from '~/models/IResponse'
import { PaginationResponse } from '~/models/pagination'
import { Category, Country } from '~/models/entity'

function* fetchCategories() {
  const categories: Category[] = localStorage.getItem('categories')
    ? JSON.parse(localStorage.getItem('categories')!)
    : []
  if (categories.length > 0) {
    yield put(headerActions.fetchCategorySuccess(categories))
  } else {
    const resp: IResponse<PaginationResponse<Category>> = yield call(api.category.all, { limit: 50, page: 1 })

    if (resp.status === 200) {
      yield put(headerActions.fetchCategorySuccess(resp.elements!.items))
      localStorage.setItem('categories', JSON.stringify(resp.elements!.items))
    } else {
      yield put(headerActions.fetchCategoryFailed())
    }
  }
}

function* fetchCountries() {
  const countries: Country[] = localStorage.getItem('countries') ? JSON.parse(localStorage.getItem('countries')!) : []
  if (countries.length > 0) {
    yield put(headerActions.fetchCountrySuccess(countries))
  } else {
    const resp: IResponse<PaginationResponse<Country>> = yield call(api.country.all, { limit: 50, page: 1 })
    if (resp.status === 200) {
      yield put(headerActions.fetchCountrySuccess(resp.elements!.items))
      localStorage.setItem('countries', JSON.stringify(resp.elements!.items))
    } else {
      yield put(headerActions.fetchCountryFailed())
    }
  }
}

function* fetchHeader() {
  yield all([call(fetchCategories), call(fetchCountries)])
}

export default function* headerSaga() {
  yield takeLatest(headerActions.fetchHeader.type, fetchHeader)
}
