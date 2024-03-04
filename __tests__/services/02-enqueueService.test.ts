import EnqueueService from '../../src/services/enqueueService';

describe('EnqueueService', () => {
    let enqueueService: EnqueueService;

    beforeAll(() => {
        enqueueService = new EnqueueService();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should enqueue an email successfully', async () => {
        const email = {
            from: 'test@example.com',
            to: 'recipient@example.com',
            subject: 'Test Subject',
            text: 'Test Email',
            apiKey: 'valid-api-key',
            attachments: [],
        };

        const expectedResult = 'Email enqueued with success';
        const spyEnqueueEmail = jest.spyOn(enqueueService, 'enqueueEmail').mockResolvedValueOnce(expectedResult);

        const result = await enqueueService.enqueueEmail(email);
        expect(spyEnqueueEmail).toHaveBeenCalledWith(email);
        expect(result).toBe(expectedResult);
    });

    it('should consume email queue successfully', async () => {
        const expectedResponse = ['Email sent with success'];
        const spyConsumeEmailQueue = jest.spyOn(enqueueService, 'consumeEmailQueue').mockResolvedValueOnce(expectedResponse);

        const result = await enqueueService.consumeEmailQueue();
        expect(spyConsumeEmailQueue).toHaveBeenCalled();
        expect(result).toEqual(expectedResponse);
    });

    afterAll(async () => {
        await enqueueService.closeConnection();
    });
});
