/** @ngInject */
export function AuthenticationApiFactory ($http, $base64, API_BASE, Session, Notifications) {
  var service = {
    login: login
  }

  return service

  function login (userLogin, password) {
    return $http.get(API_BASE + '/api/auth?requester_type=ui', {
      headers: {
        'Authorization': 'Basic ' + $base64.encode([userLogin, password].join(':')),
        'X-Auth-Token': undefined,
        'X-Miq-Group': undefined
      }
    }).then(loginSuccess, loginFailure)

    function loginSuccess (response) {
      Session.setAuthToken(response.data.auth_token)
    }

    function loginFailure (response) {
      Session.destroy()
      Notifications.message('danger', '', __('Incorrect username or password.'), false)

      return response
    }
  }
}
