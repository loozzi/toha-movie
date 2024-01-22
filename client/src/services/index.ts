import apiRoute from './api.route'
import tokenApi from './token.api'
import authApi from './auth.api'
import categoryApi from './category.api'
import countryApi from './country.api'

export default {
  route: apiRoute,
  token: tokenApi,
  auth: authApi,
  category: categoryApi,
  country: countryApi
}
