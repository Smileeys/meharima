/* global AutoForm:true */
/* global Meteor:true */
/* global about:true */
/* global $:true */
/* eslint prefer-arrow-callback: ["error", { "allowNamedFunctions": true }] */

import './about.html';
import '../footer.js';
import { Template } from 'meteor/templating';


// autoform hooks
AutoForm.hooks({
    aboutForm: {
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

// aboutList helpers
Template.aboutList.helpers({
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

Template.aboutItem.events({
    'click .js-delete-about'() {
        const instance = Template.instance();
        const row = $(instance.firstNode);
        const aboutId = this.about._id; // eslint-disable-line no-underscore-dangle

        row.fadeOut(400, function animationComplete() {
            about.remove({ _id: aboutId });
        });

        return false;
    },
});
