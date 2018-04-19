import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const EventsDB = new Mongo.Collection("events");
export const BidsDB = new Mongo.Collection("bids");
export const TicketsDB = new Mongo.Collection("tickets");


if (Meteor.isServer) {
    // This code only runs on the server

    Meteor.publish('myTickets', function () {
        return TicketsDB.find({ owner: this.userId });
    });

    Meteor.publish('allEvents', function eventsPublication() {
        return EventsDB.find();
    });

    Meteor.publish('allTickets', function eventsPublication() {
        return TicketsDB.find();
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
            throw new Meteor.Error("You must login first.");
        }

        if (date < new Date()) {
            throw new Meteor.Error("Check the event date.");
        }

        EventsDB.insert({
            name,
            venue,
            date,
            imgSrc
        });
    },'tickets.giveOne'(tktId) {
        check(tktId, String);

        if (!this.userId) {
            throw new Meteor.Error("You must login first.");
        }
            return TicketsDB.findOne({ _id: tktId });
    },
    'events.remove'(eventId) {
        check(eventId, String);

        if (!this.userId) {
            throw new Meteor.Error("You must login first.");
        }
        EventsDB.remove(eventId);
    },
    'tickets.add'(section, incs, buyNow, minPrice, date, evtId, evtName) {
        check(section, String);
        check(incs, Number);
        check(buyNow, Number);
        check(minPrice, Number);
        check(date, Date);
        check(evtId, String);
        check(evtName, String);

        // Make sure the user is logged in
        if (!this.userId) {
            throw new Meteor.Error("You must login first.");
        }

        let evt = EventsDB.findOne({ _id: evtId });

        if (date < new Date()) {
            throw new Meteor.Error("Check the due date.");
        }

        if (date > evt.date) {
            throw new Meteor.Error("Deadline can't be after the event's date.");
        }

        if (buyNow < minPrice) {
            throw new Meteor.Error("The base price can't be higher than the Buy-Now price.");
        }

        let newTkt = {
            event: evtId,
            description: section,
            increments: incs,
            bids: 0,
            currentBid: minPrice,
            minPrice: minPrice,
            buyNow: buyNow,
            dueDate: date,
            owner: this.userId,
            available: true,
            evtName: evtName,
            bidder: ""
        }

        TicketsDB.insert(newTkt);
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

        let ticket = TicketsDB.findOne({ _id: idTkt });

        //Validate bid value 
        if (!ticket.available) {
            throw new Meteor.Error('Ticket is no longer available.');
        }

        if (value <= ticket.currentBid) {
            throw new Meteor.Error('Bid must be higher than current one.');
        }

        if (value - ticket.currentBid < ticket.increments) {
            throw new Meteor.Error('Minimum increase is ' + ticket.increments);
        }

        if (value >= ticket.buyNow) {
            ticket.available = false;
        }

        ticket.currentBid = value;
        ticket.bids += 1;

        TicketsDB.update(idTkt, {
            $set: {
                available: ticket.available,
                currentBid: ticket.currentBid,
                bids: ticket.bids,
                bidder: this.userId
            }
        });

        BidsDB.insert({
            idTkt,
            owner,
            value,
            final: !ticket.available,
            bidder: this.userId,
            evtId
        });

    }
});