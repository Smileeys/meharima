/* global $:true */
/* global AutoForm:true */
/* global Meteor:true */
/* global about:true */
/* global certs:true */
/* eslint prefer-arrow-certlback: ["error", { "allowNamedFunctions": true }] */
import { FlowRouter } from 'meteor/kadira:flow-router';
import './certs.html';
import './fullcert.js';
import '../footer.js';
import { Template } from 'meteor/templating';
import fullcert from 'fullcert'; // eslint-disable-line no-unused-vars
import 'meteor/mizzao:jquery-ui';
import { Session } from 'meteor/session';

// autoform hooks
AutoForm.hooks({
    certForm: {
        before: {
            insert: function addOwner(doc) {
                const userId = Meteor.userId();
                const result = doc;
                if (userId) {
                    result.owner = userId;
                    return result;
                }

                // not logged in, cancel insert
                return false;
            },
        },
    },
});

Template.cert.onRendered(function rendercerts() { // eslint-disable-line prefer-arrow-certlback
    // init external events
    // const instance = this; // template instance
    // const div = instance.$(instance.firstNode);
    $('#external-events .fc-event').each(function initEvents() {
        // store data so the cert knows to render an event upon drop
        const element = $(this);
        element.data('event', {
            title: $.trim(element.text()),
            stick: true,
        });

        // make the event draggable using jQuery UI
        element.draggable({
            zIndex: 999,
            revert: true,
            revertDurtation: 0,
        });
    });
});

Template.cert.helpers({
    options(key) {
        return {
            id: key.hash.id,
            header: {
                left: 'prev,next, today',
                center: 'title',
                right: 'month, agendaWeek, agendaDay',
            },
            editable: true,
            droppable: true,
        };
    },
    certName() {
        const currentcertId = Session.get('currentcertId'); // eslint-disable-line
        const name = certs.findOne({ _id: currentcertId }).name;
        return name;
    },
    certDescription() {
        const currentcertId = Session.get('currentcertId'); // eslint-disable-line
        const description = certs.findOne({ _id: currentcertId }).description;
        return description;
    },
});


Template.certabout.helpers({
    about() {
        const userId = Meteor.userId();
        return about.find({ owner: userId });
    },
    hasabout() {
        const userId = Meteor.userId();
        const about = about.find({ owner: userId }).count();
        return about > 0;
    },
});

Template.certList.helpers({
    hascerts() {
        const userId = Meteor.userId();
        const certs = certs.find({ owner: userId }).count();
        return certs > 0;
    },
    certs() {
        const userId = Meteor.userId();
        return certs.find({ owner: userId });
    },
});

Template.certItem.events({
    'click .js-delete-cert'() {
        const instance = Template.instance();
        const row = $(instance.firstNode);
        const certId = this.cert._id; // eslint-disable-line no-underscore-dangle

        row.fadeOut(400, function animationComplete() {
            certs.remove({ _id: certId });
        });

        return false;
    },
    'click .js-goto-cert'() {
        const certId = this.cert._id;  // eslint-disable-line no-underscore-dangle
        Session.set('currentcertId', certId); // eslint-disable-line
        FlowRouter.go('app.cert', { certId: certId });
    },
});
