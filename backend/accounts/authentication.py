from rest_framework_simplejwt.authentication import JWTAuthentication

class JWTCookieAuthentication(JWTAuthentication):
    def authenticate(self, request):
        # First, try to get token from cookies
        access_token = request.COOKIES.get('access_token')
        if access_token:
            validated_token = self.get_validated_token(access_token)
            try:
                user = self.get_user(validated_token)
            except Exception:
                return None
            return (user, validated_token)
        # Otherwise, fall back to default header behavior (Bearer token)
        return super().authenticate(request)