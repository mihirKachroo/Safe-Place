import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as firebaseHelper from 'firebase-functions-helper';
import * as express from 'express';
import * as bodyParser from "body-parser";
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();
const app = express();
const main = express();
const SafePlaceCollection = 'SafePlace';
main.use('/api/v1', app);
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({ extended: false }));
// webApi is your functions name, and you will pass main as 
// a parameter
export const webApi = functions.https.onRequest(main);


// Add new SafePlace
app.post('/SafePlace', async (req, res) => {
    try {
        const SafePlace: SafePlace = {
            Address: req.body['Address'],
            Name: req.body['Name'],
            geo: req.body['geo'],
            numOfPeople: req.body['numOfPeople'],
            squareMeters: req.body['squareMeters']
        }
const newDoc = await firebaseHelper.firestore
            .createNewDocument(db, SafePlaceCollection, SafePlace);
        res.status(201).send(`Created a new SafePlace: ${newDoc.id}`);
    } catch (error) {
        res.status(400).send(`SafePlace should only contains Address, Name, geo, numOfPeople, and squareMeters!!`)
    }        
})
// Update new SafePlace
app.patch('/SafePlace/:SafePlaceId', async (req, res) => {
    const updatedDoc = await firebaseHelper.firestore
        .updateDocument(db, SafePlacesCollection, req.params.SafePlaceId, req.body);
    res.status(204).send(`Update a new SafePlace: ${updatedDoc}`);
})
// View a SafePlace
app.get('/SafePlaces/:SafePlaceId', (req, res) => {
    firebaseHelper.firestore
        .getDocument(db, SafePlacesCollection, req.params.SafePlaceId)
        .then(doc => res.status(200).send(doc))
        .catch(error => res.status(400).send(`Cannot get SafePlace: ${error}`));
})

// Delete a SafePlace 
app.delete('/SafePlaces/:SafePlaceId', async (req, res) => {
    const deletedSafePlace = await firebaseHelper.firestore
        .deleteDocument(db, SafePlacesCollection, req.params.SafePlaceId);
    res.status(204).send(`SafePlace is deleted: ${deletedSafePlace}`);
})