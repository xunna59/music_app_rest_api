const request = require('supertest');
const app = require('../server');
const UserModel = require('../src/models/userModel');
const userModel = new UserModel();



describe('User Registration and Login', () => {
    let registeredUserEmail = 'dummy@example.com';
    let registeredUserPassword = 'password123';


    beforeAll(async () => {

        // Cleanup existing user before tests

        await userModel.deleteUserByEmail(registeredUserEmail);

    });



    it('should register successfully with valid credentials', async () => {
        const response = await request(app)
            .post('/auth/register')
            .send({
                username: 'testuser',
                email: registeredUserEmail,
                password: registeredUserPassword,
                dob: '2000-01-01',
                gender: 'Other'
            });

        expect(response.statusCode).toBe(201);
        expect(response.body.message).toBe('User created successfully');
        expect(response.body.user).toHaveProperty('id');
    });

    it('should login successfully with valid credentials', async () => {
        const response = await request(app)
            .post('/auth/login')
            .send({
                email: registeredUserEmail,
                password: registeredUserPassword,
            });

        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Login successful');
        expect(response.body).toHaveProperty('token');
    });

    it('should return 400 with invalid credentials', async () => {
        const response = await request(app)
            .post('/auth/login')
            .send({
                email: registeredUserEmail,
                password: 'wrongpassword',
            });

        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBe('Invalid login credentials');
    });

    it('should return 400 with missing credentials', async () => {
        const response = await request(app)
            .post('/auth/login')
            .send({
                email: '',
                password: '',
            });

        expect(response.statusCode).toBe(400);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe('Email is required.');
    });
});