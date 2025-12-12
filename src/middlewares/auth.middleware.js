import JWTService from '../services/JWTService.js';
import AuthService from '../services/AuthService.js';

class AuthMiddleware {
    #jwtService;
    #authService;

    constructor(jwtService = JWTService, authService = AuthService) {
        this.#jwtService = jwtService;
        this.#authService = authService;
        this.authenticate = this.authenticate.bind(this);
    }

    async authenticate(req, res, next) {
        try {
            const header = req.headers.authorization;
            if (!header || !header.startsWith('Bearer ')) return res.status(401).json({ message: 'Unauthorized' });
            const token = header.split(' ')[1];
            const payload = this.#jwtService.verifyAccess(token);
            const user = await this.#authService.getUserById(payload.sub);
            if (!user) return res.status(401).json({ message: 'Unauthorized' });
            req.user = { id: user._id.toString(), role: user.role };
            next();
        } catch (err) {
            return res.status(401).json({ message: 'Invalid or expired token' });
        }
    }
}

export default new AuthMiddleware();