// /* global Meals:true *//* global Calendars:true *//* global SimpleSchema:true */// Meals = new Mongo.Collection('meals');// Calendars = new Mongo.Collection('calendars');// calendar schema//Calendars.attachSchema(new SimpleSchema({ name: {type: String, max: 20, label: 'Calendar Name',},description: { type: String,label: 'Calendar Description',max: 1000,autoform: {rows: 4, },},owner: { type: String,optional: true,autoform: {omit: true, },},}));///

import { Mongo } from 'meteor/mongo';



/* global About:true */
/* global Certificates:true */
/* global SimpleSchema:true */

About = new Mongo.Collection('about');
Certificates = new Mongo.Collection('certificates');



// certificates schema
Certificates.attachSchema(new SimpleSchema({
    name: {
        type: String,
        max: 20,
        label: 'Certificate Name',
    },
    description: {
        type: String,
        label: 'Certificate Description',
        max: 1000,
        autoform: {
            rows: 4,
        },
    },
    owner: {
        type: String,
        optional: true,
        autoform: {
            omit: true,
        },
    },
}));

// about schema
About.attachSchema(new SimpleSchema({
    name: {
        type: String,
        max: 20,
        label: 'Info',
    },
    description: {
        type: String,
        label: 'Other Description',
        max: 1000,
        autoform: {
            rows: 4,
        },
    },
    owner: {
        type: String,
        optional: true,
        autoform: {
            omit: true,
        },
    },
}));
