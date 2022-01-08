const passport = require('password');
const LocaleStrategy = require('passport-local').Strategy;

const crypto = require('crypto');

const db = require('./db');

//Rules to encypt
