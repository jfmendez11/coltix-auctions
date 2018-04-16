import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const EventsDB = new Mongo.Collection("events");
export const BidsDB = new Mongo.Collection("bids");


if (Meteor.isServer) {
    // This code only runs on the server

    Meteor.publish('myTickets', function () {
        let pipeline = [{
            $unwind: {
                path: '$tickets',
                includeArrayIndex: 'suffix'
            }
        }, {
            $project: {
                _id: {
                    $concat: ['$_id',
                        '_',
                        {
                            $substr: ['$suffix', 0, -1]
                        }
                    ]
                },
                evtName: '$name',
                evtVenue: '$venue',
                evtDate: '$date',
                tkt: '$tickets',
            }
        }, {
            $match: { "tkt.owner": this.userId }
        }]
        ReactiveAggregate(this, EventsDB, pipeline);
    });

    Meteor.publish('allEvents', function eventsPublication() {
        return EventsDB.find();
    });

    Meteor.publish('oneEvt', function oneEvtPublication(evtId) {
        return EventsDB.find({ _id: evtId });
    });

    Meteor.publish('allBids', function bidsPublication() {
        return BidsDB.find({ bidder: this.userId });
    });

}

Meteor.methods({
    'events.insert'(name, venue, date, imgSrc) {
        check(name, String);
        check(venue, String);
        check(date, Date);
        check(imgSrc, String);

        // Make sure the user is logged in
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        EventsDB.insert({
            name,
            venue,
            date,
            imgSrc,
            tickets: [],
        });
    },
    'events.remove'(eventId) {
        check(eventId, String);
        EventsDB.remove(eventId);
    },
    'tickets.add'(section, incs, buyNow, minPrice, date, evtId) {
        check(section, String);
        check(incs, Number);
        check(buyNow, Number);
        check(minPrice, Number);
        check(date, Date);
        check(evtId, String);

        // Make sure the user is logged in
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        let ticketList = EventsDB.findOne({ _id: evtId }).tickets;
        let newId = evtId + "-" + ticketList.length;
        let newTkt = {
            id: newId,
            description: section,
            increments: incs,
            bids: 0,
            currentBid: 0,
            minPrice: minPrice,
            buyNow: buyNow,
            dueDate: date,
            owner: this.userId,
            available: true
        }

        ticketList.push(newTkt);
        EventsDB.update(evtId, {
            $set: { tickets: ticketList }
        });
    },
    'bid.add'(owner, idTkt, value, evtId) {
        check(owner, String);
        check(idTkt, String);
        check(value, Number);

        // Make sure the user is logged in
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        if (this.userId == owner) {
            throw new Meteor.Error("Can't bid on your own ticket.");
        }

        let ticketList = EventsDB.findOne({ _id: evtId }).tickets;
        let ticket;
        let tktIndex = 0;

        for (let i = 0; i < ticketList.length; i++) {
            if (ticketList[i].id === idTkt) {
                ticket = ticketList[i];
                tktIndex = i;
                break;
            }
        }

        //Validate bid value 
        if (value <= ticket.currentBid) {
            throw new Meteor.Error('Bid must be higher than current one.');
        }
        if (value - ticket.currentBid < ticket.increments) {
            throw new Meteor.Error('Minimum increase is ' + ticket.increments);
        }
        else {
            if (value > ticket.buyNow) {
                ticket.available = false;
            }

            ticket.currentBid = value;
            ticket.bids += 1;
            ticketList[tktIndex] = ticket;
            EventsDB.update(evtId, {
                $set: { tickets: ticketList }
            });

            BidsDB.insert({
                idTkt,
                owner,
                value,
                final: !ticket.available,
                bidder: this.userId,
            });
        }
    }
});