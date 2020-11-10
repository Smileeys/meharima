/* global accountsUIBootstrap3:true */

import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Import to load these templates
import '../../ui/layouts/app-body.js';
import '../../ui/pages/home.js';
import '../../ui/pages/navbar.js';
import '../../ui/pages/app-not-found.js';
import '../../ui/pages/about/about.js';
import '../../ui/pages/certificates/certificates.js';
import '../../ui/pages/instructions/instructions.js';

// root route
FlowRouter.route('/', {
    name: 'app.home',
    action() {
        BlazeLayout.render('app_body', { top: 'navbar', main: 'home' });
    },
});

// the app_notFound template is used for unknown routes and missing lists
FlowRouter.notFound = {
    action() {
        BlazeLayout.render('app_body', { top: 'navbar', main: 'app_notFound' });
    },
};

// the route to show all the about create by a user
FlowRouter.route('/about', {
    name: 'app.about',
    action() {
        if (Meteor.user()) {
            BlazeLayout.render('app_body', { top: 'navbar', main: 'about' });
            return;
        }
        alert('Please create an account and/or login first.'); // eslint-disable-line no-alert
        FlowRouter.go('app.home');
    },
});

// the route to show all the certificates created by a user
FlowRouter.route('/certificates', {
    name: 'app.certificates',
    action() {
        if (Meteor.user()) {
            BlazeLayout.render('app_body', { top: 'navbar', main: 'certificates' });
            return;
        }
        alert('Please create an account and/or login first.'); // eslint-disable-line no-alert
        FlowRouter.go('app.home');
    },
});

// the route for each certificates
FlowRouter.route('/certificate/:certId', {
    name: 'app.certificate',
    action() {
        if (Meteor.user()) {
            BlazeLayout.render('app_body', { top: 'navbar', main: 'certificate' });
            return;
        }
        alert('Please create an account and/or login first.'); // eslint-disable-line no-alert
        FlowRouter.go('app.home');
    },
});

// the route for instructions
FlowRouter.route('/instructions', {
    name: 'app.instructions',
    action() {
        BlazeLayout.render('app_body', { top: 'navbar', main: 'instructions' });
    },
});

// logout certlback
accountsUIBootstrap3.logoutcertlback = function onLogout() {
    FlowRouter.go('app.home');
};
