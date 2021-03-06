import './instructions.html';
import '../footer.js';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

Template.instructions.events({
    'click .js-about-link, click .js-certs-link'(event) { // eslint-disable-line no-unused-vars
        if (Meteor.user()) {
            return true;
        }
        alert('Please create an account and/or login first.'); // eslint-disable-line no-alert
        return false;
    },
});
