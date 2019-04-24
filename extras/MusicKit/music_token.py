import datetime
import jwt
import ecdsa

secret = open('AuthKey_KJK37S567D.p8').read().strip()
teamID = 'VL775684N5'
keyID = 'KJK37S567D'
cipher = 'ES256'

current_time = datetime.datetime.now()
expired_time = current_time + datetime.timedelta(hours=24)

headers = {
    'alg': cipher,
    'kid': keyID,
}
payload = {
    'iss': teamID,
    'iat': int(current_time.strftime("%s")),
    'exp': int(expired_time.strftime("%s")),

}

if __name__ == '__main__':
    '''Create an Authentication Token'''
    token = jwt.encode(payload, secret, algorithm=cipher, headers=headers)
    print('----TOKEN----')
    print(token)
#    print('\n----CURL----')
#    print(f'curl -v -H "Authorization: Bearer {token}" "https://api.music.apple.com/v1/catalog/us/artists/36954" ')
