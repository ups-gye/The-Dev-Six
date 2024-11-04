package ec.edu.ups.est.security;

import jakarta.annotation.Priority;
import jakarta.interceptor.AroundInvoke;
import jakarta.interceptor.Interceptor;
import jakarta.interceptor.InvocationContext;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.HttpHeaders;

@Interceptor
@Secured
@Priority(Interceptor.Priority.APPLICATION)
public class SecurityInterceptor{

    @Context
    private HttpHeaders httpHeaders;

    @AroundInvoke
    public Object checkPermissions(InvocationContext context) throws Exception {
        String role = httpHeaders.getHeaderString("ROL");

        if ("ADMIN".equals(role)) {
            return context.proceed();
        } else {
            throw new SecurityException("Usuario no autorizado");
        }
    }
}