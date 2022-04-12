/**
 * Description:
 *                  The Envelope Router handles all routes related to creating, retrieving,
 *                  updating, and deleting the budgeting that are the core functionality of this site.
 * 
 * Created:         04/11/2022
 * Author:          Evan Wallace
 * 
 *                          Task Order
 *                          
 *  Task 01:    Retrieve envelope information or return 404     Line:  32
 *  Task 02:    Validate data (for post route)                  Line:  44
 *  Task 02_A:  If data is invalid type or not present          Line:  48
 *  Task 02_B:  If data is a blank string                       Line:  49
 *  Task 02_C:  If data includes script marker                  Line:  50
 *  Task 02_D:  If category already exsists                     Line:  51
 *  Task 02_E:  Default move to next set of instructions        Line:  52
 *  Task 03:    Get all envelopes                               Line:  54
 *  Task 04:    Get envelope by ID                              Line:  55
 *  Task 05:    Create an envelope                              Line:  56
 *  Task 06:    Update envelope by ID                           Line:  61
 *  Task 07:    Delete envelope                                 Line:  66
 *  Task 08:    Make a deposit or withdraw                      Line:  71
 *  Task 09:    Make a transfer                                 Line:  76
 * */
const express = require('express');
const envelopeRouter = express.Router();
const db = require('./db');

module.exports = envelopeRouter;

envelopeRouter.param('ID', (req, res, next, id) => {
    id = Number(id)
    if (typeof id !== 'number') { res.status(404).send(); }
    else {
        const envelope = req.user.getEnvelopeByID(id);
        if (!envelope) { res.status(404).send(); }
        if (envelope) {
            req.envelope = envelope;
            next();
        }
    }
})
function validateData(req, res, next) {
    let category    = req.body.category;
    let deposit     = req.body.deposit;
    let flag        = false;
    if (typeof req.body.category !== 'string' || typeof req.body.deposit !== 'number') { res.sendStatus(400); flag = true;}
    if (req.body.category.length === 0)                                                { res.sendStatus(400); flag = true;}
    if (req.body.category.match(/(<script>)/i))                                        { res.sendStatus(400); flag = true;}
    if (req.user.getEnvelopeByCategory(req.body.category))                             { res.status(409).send("Category already exsists: ${req.body.category}"); flag = true;}
    if (!flag)                                                                         { next(); }
}
envelopeRouter.get('/', (req, res, next) => { res.send(req.user.envelopes.slice(0)); })
envelopeRouter.get('/:ID', (req, res, next) => { res.send(req.envelope); })
envelopeRouter.post('/', validateData, (req, res, next) => {
    let newEnvelope = req.user.createEnvelope(req.body.category, req.body.deposit);
    if (newEnvelope) { res.status(201).send(newEnvelope); }
    if (!newEnvelope){ res.sendStatus(400);}
})
envelopeRouter.put('/:ID', (req, res, next) => {
    const updated = req.user.updateEnvelope(req.envelope.id, req.body.type, req.body.info);
    if (updated) { res.status(201).send(updated); }
    if(!updated) { res.status(400).send();}
})
envelopeRouter.delete('/:ID', (req, res, send) => {
    const deleted = req.user.deleteEnvelope(req.envelope.id);
    if (deleted) { res.status(204).send(); }
    if(!deleted) { res.status(400).send(); }
})
envelopeRouter.put('/:ID/deposit', (req, res, next) => {
    const deposited = req.user.updateAmount(req.envelope.id, req.body.amount);
    if (deposited) { res.status(201).send(req.envelope); }
    if(!deposited) { res.status(404).send();}
}) 
envelopeRouter.post('/:ID/sendto/:targetID', (req, res, next) => {
    const transferred = req.user.transfer(req.envelope.id, req.params.targetID, req.body.amount);
    if (transferred) { res.status(201).send(); }
    if(!transferred) { res.status(400).send(); }
})
