from rest_framework_simplejwt.authentication import JWTAuthentication

class JWTCookieAuthentication(JWTAuthentication):
    def authenticate(self, request):
        # First try to get token from cookies
        access_token = request.COOKIES.get('access_token')
        
        # If no cookie token, try the Authorization header
        if not access_token:
            header = self.get_header(request)
            if header:
                raw_token = self.get_raw_token(header)
                if raw_token:
                    access_token = raw_token.decode()
        
        # If still no token, return None (unauthenticated)
        if not access_token:
            return None
        
        # Validate the token and get user
        validated_token = self.get_validated_token(access_token)
        
        try:
            user = self.get_user(validated_token)
        except:
            return None
    
        return (user, validated_token)