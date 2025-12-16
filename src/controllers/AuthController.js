import AuthService from '../services/AuthService.js';

class AuthController {
    #authService;

    constructor(authService = AuthService) {
        this.#authService = authService;
        this.register = this.register.bind(this);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }

    async register(req, res, next) {
        try {
            const { name, email, password, role } = req.body;
            const user = await this.#authService.register({ name, email, password, role });
            res.status(201).json({
                id: user._id,
                email: user.email,
                name: user.name
            });
        } catch (err) {
            next(err);
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const { user, accessToken } = await this.#authService.login({ email, password });
            const cookieOption = {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: 'strict',
                maxAge: 1000 * 60 * 60,
            }
            res.cookie('accessToken', accessToken, cookieOption);
            res.json({
                user: {
                    id: user._id,
                    email: user.email,
                    name: user.name,
                    role: user.role
                }
            });
        } catch (err) {
            next(err);
        }
    }

    async logout(req, res, next) {
        try {
            if (!req.user) return res.status(401).end();
            await this.#authService.logout(req.user.id);
            res.clearCookie('accessToken');
            res.status(200).json({
                message: 'Logged out'
            });
        } catch (err) {
            next(err);
        }
    }
}

export default new AuthController();