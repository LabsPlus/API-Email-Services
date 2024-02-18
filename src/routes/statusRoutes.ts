import { Request, Response, Router } from 'express';
import { EmailService } from '../services/emailService';
import UserService from '../services/userService';
import LoginService from '../services/loginService';

const statusRouter = Router();
const emailService = new EmailService();

/**
 * @swagger
 *  api/status:
 *  get:
 *      summary: Check status of the email service
 *      responses:
 *          200:
 *              description: OK
 *          500:
 *              description: Error checking email service status
 *      description: Check if the email service is working
*/
statusRouter.get('/status', async (req: Request, res: Response) => {
  try {

    const emailStatus = await emailService.checkEmailServiceStatus();


    res.status(200).json({ status: 'OK', emailService: emailStatus});
  } catch (error) {
    console.error('Error checking email service status:', error);
    res.status(500).json({ status: 'Error', message: 'Error checking email service status.' });
  }
});

export default statusRouter;