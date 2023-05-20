import express, { Request, Response } from 'express';
import bodyParser from "body-parser"
import { Client } from 'onesignal-node';

// Initialize the Express app
const app = express();
const port = 5000;

// create application/json parser
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })


const oneSignalClient = new Client(process.env.ONE_SIGNAL_APP_ID as string, process.env.ONE_SIGNAL_API_KEY as string)

// Handle POST request to send a push notification
app.post('/notifications', urlencodedParser, async (req: Request, res: Response) => {
  try {
    // Retrieve the notification data from the request body
    const { title, content } = req.body;

    // Create the notification payload
    const notification = {
      headings: { en: title },
      contents: { en: content },
      included_segments: ['All']
    };

    // Send the notification using the OneSignal client
    const response = await oneSignalClient.createNotification(notification);

    // Return the response
    res.status(200).json(response.body);
  } catch (error) {
    console.error('Error sending notification:', error);
    res.status(500).json({ error: 'Failed to send notification' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
